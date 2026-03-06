/**
 * Image 服务核心逻辑
 */

import os from 'os';
import fs from 'fs';
import path from 'path';

import type {
    BailianConfig,
    DownloadResult,
    ImageGenerationInput,
    ImageGenerationRequest,
    ImageGenerationResponse,
} from '../../core/types.js';
import { getBaseUrl } from '../../core/config.js';

const generationPointer = '/multimodal-generation/generation';
const supportedModelPrefix = 'qwen-image-2.0';
const maxInputImages = 3;
const maxImageBytes = 10 * 1024 * 1024;
const minImageSide = 384;
const maxImageSide = 3072;
const supportedInputExtensions = new Set([
    '.jpg',
    '.jpeg',
    '.png',
    '.bmp',
    '.tiff',
    '.webp',
    '.gif',
]);

interface ImageMetadata {
    format: string;
    mimeType: string;
    width: number;
    height: number;
    sizeBytes: number;
}

interface PreparedImage {
    requestValue: string;
    metadata: ImageMetadata;
}

function ensureImageDir(customDir?: string): string {
    const imageDir = customDir || path.join(os.homedir(), '.bailian-cli/media');
    if (!fs.existsSync(imageDir)) {
        fs.mkdirSync(imageDir, { recursive: true });
    }
    return imageDir;
}

async function downloadBinary(fileUrl: string): Promise<Buffer> {
    const response = await fetch(fileUrl);
    if (!response.ok) {
        throw new Error(`下载图片失败: ${response.status} ${response.statusText}`);
    }
    return Buffer.from(await response.arrayBuffer());
}

function isHttpUrl(value: string): boolean {
    return /^https?:\/\//i.test(value);
}

function isDataUrl(value: string): boolean {
    return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value);
}

function isOssUrl(value: string): boolean {
    return /^oss:\/\//i.test(value);
}

function isLocalDirectory(value: string): boolean {
    if (isHttpUrl(value) || isDataUrl(value) || isOssUrl(value)) {
        return false;
    }

    try {
        return fs.statSync(path.resolve(value)).isDirectory();
    } catch {
        return false;
    }
}

function isSupportedImagePath(filePath: string): boolean {
    return supportedInputExtensions.has(path.extname(filePath).toLowerCase());
}

function expandDirectoryImages(directoryPath: string): string[] {
    const resolvedDir = path.resolve(directoryPath);
    const entries = fs.readdirSync(resolvedDir, { withFileTypes: true });
    const imageFiles = entries
        .filter((entry) => entry.isFile() && isSupportedImagePath(entry.name))
        .map((entry) => path.join(resolvedDir, entry.name))
        .sort((a, b) => a.localeCompare(b));

    if (imageFiles.length === 0) {
        throw new Error(`目录中没有可用图片文件: ${resolvedDir}`);
    }

    return imageFiles;
}

function getMimeType(format: string): string {
    const normalized = format.toLowerCase();
    if (normalized === 'jpg' || normalized === 'jpeg') {
        return 'image/jpeg';
    }
    if (normalized === 'png') {
        return 'image/png';
    }
    if (normalized === 'bmp') {
        return 'image/bmp';
    }
    if (normalized === 'tiff') {
        return 'image/tiff';
    }
    if (normalized === 'webp') {
        return 'image/webp';
    }
    if (normalized === 'gif') {
        return 'image/gif';
    }
    throw new Error(`不支持的图片格式: ${format}`);
}

function detectImageMetadata(buffer: Buffer): ImageMetadata {
    if (buffer.length < 12) {
        throw new Error('图片内容无效或已损坏');
    }

    if (
        buffer[0] === 0x89 &&
        buffer[1] === 0x50 &&
        buffer[2] === 0x4e &&
        buffer[3] === 0x47
    ) {
        return {
            format: 'png',
            mimeType: 'image/png',
            width: buffer.readUInt32BE(16),
            height: buffer.readUInt32BE(20),
            sizeBytes: buffer.length,
        };
    }

    if (buffer[0] === 0xff && buffer[1] === 0xd8) {
        let offset = 2;
        while (offset < buffer.length) {
            if (buffer[offset] !== 0xff) {
                offset += 1;
                continue;
            }

            const marker = buffer[offset + 1];
            if (marker === undefined) {
                break;
            }

            if (marker === 0xd8 || marker === 0xd9) {
                offset += 2;
                continue;
            }

            const blockLength = buffer.readUInt16BE(offset + 2);
            const isSofMarker =
                marker === 0xc0 || marker === 0xc1 || marker === 0xc2 || marker === 0xc3 ||
                marker === 0xc5 || marker === 0xc6 || marker === 0xc7 || marker === 0xc9 ||
                marker === 0xca || marker === 0xcb || marker === 0xcd || marker === 0xce ||
                marker === 0xcf;

            if (isSofMarker) {
                return {
                    format: 'jpeg',
                    mimeType: 'image/jpeg',
                    height: buffer.readUInt16BE(offset + 5),
                    width: buffer.readUInt16BE(offset + 7),
                    sizeBytes: buffer.length,
                };
            }

            offset += 2 + blockLength;
        }
        throw new Error('无法解析 JPEG 图片尺寸');
    }

    const signature = buffer.toString('ascii', 0, 6);
    if (signature === 'GIF87a' || signature === 'GIF89a') {
        return {
            format: 'gif',
            mimeType: 'image/gif',
            width: buffer.readUInt16LE(6),
            height: buffer.readUInt16LE(8),
            sizeBytes: buffer.length,
        };
    }

    if (buffer.toString('ascii', 0, 2) === 'BM') {
        return {
            format: 'bmp',
            mimeType: 'image/bmp',
            width: Math.abs(buffer.readInt32LE(18)),
            height: Math.abs(buffer.readInt32LE(22)),
            sizeBytes: buffer.length,
        };
    }

    if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') {
        const chunkType = buffer.toString('ascii', 12, 16);
        if (chunkType === 'VP8X') {
            return {
                format: 'webp',
                mimeType: 'image/webp',
                width: 1 + buffer.readUIntLE(24, 3),
                height: 1 + buffer.readUIntLE(27, 3),
                sizeBytes: buffer.length,
            };
        }
        if (chunkType === 'VP8 ') {
            return {
                format: 'webp',
                mimeType: 'image/webp',
                width: buffer.readUInt16LE(26) & 0x3fff,
                height: buffer.readUInt16LE(28) & 0x3fff,
                sizeBytes: buffer.length,
            };
        }
        if (chunkType === 'VP8L') {
            const bits = buffer.readUInt32LE(21);
            return {
                format: 'webp',
                mimeType: 'image/webp',
                width: (bits & 0x3fff) + 1,
                height: ((bits >> 14) & 0x3fff) + 1,
                sizeBytes: buffer.length,
            };
        }
        throw new Error('无法解析 WEBP 图片尺寸');
    }

    const tiffLittleEndian = buffer[0] === 0x49 && buffer[1] === 0x49 && buffer[2] === 0x2a && buffer[3] === 0x00;
    const tiffBigEndian = buffer[0] === 0x4d && buffer[1] === 0x4d && buffer[2] === 0x00 && buffer[3] === 0x2a;
    if (tiffLittleEndian || tiffBigEndian) {
        const littleEndian = tiffLittleEndian;
        const readUInt16 = (offset: number) =>
            littleEndian ? buffer.readUInt16LE(offset) : buffer.readUInt16BE(offset);
        const readUInt32 = (offset: number) =>
            littleEndian ? buffer.readUInt32LE(offset) : buffer.readUInt32BE(offset);

        let ifdOffset = readUInt32(4);
        while (ifdOffset > 0 && ifdOffset + 2 <= buffer.length) {
            const entryCount = readUInt16(ifdOffset);
            let width: number | undefined;
            let height: number | undefined;

            for (let i = 0; i < entryCount; i += 1) {
                const entryOffset = ifdOffset + 2 + i * 12;
                if (entryOffset + 12 > buffer.length) {
                    break;
                }

                const tag = readUInt16(entryOffset);
                const type = readUInt16(entryOffset + 2);
                const count = readUInt32(entryOffset + 4);
                const valueOffset = entryOffset + 8;

                let value: number;
                if (type === 3 && count === 1) {
                    value = readUInt16(valueOffset);
                } else if (type === 4 && count === 1) {
                    value = readUInt32(valueOffset);
                } else {
                    continue;
                }

                if (tag === 256) {
                    width = value;
                }
                if (tag === 257) {
                    height = value;
                }
            }

            if (width && height) {
                return {
                    format: 'tiff',
                    mimeType: 'image/tiff',
                    width,
                    height,
                    sizeBytes: buffer.length,
                };
            }

            const nextOffset = ifdOffset + 2 + entryCount * 12;
            if (nextOffset + 4 > buffer.length) {
                break;
            }
            ifdOffset = readUInt32(nextOffset);
        }

        throw new Error('无法解析 TIFF 图片尺寸');
    }

    throw new Error('不支持的图片格式，仅支持 JPG/JPEG、PNG、BMP、TIFF、WEBP、GIF');
}

function validateImageMetadata(metadata: ImageMetadata, sourceLabel: string): void {
    if (metadata.sizeBytes > maxImageBytes) {
        throw new Error(`${sourceLabel} 大小超过限制，单张图片不能超过 10MB`);
    }

    if (
        metadata.width < minImageSide ||
        metadata.width > maxImageSide ||
        metadata.height < minImageSide ||
        metadata.height > maxImageSide
    ) {
        throw new Error(
            `${sourceLabel} 像素不符合要求，宽高都必须在 ${minImageSide}-${maxImageSide} 像素之间`,
        );
    }
}

async function prepareSingleImageInput(imageInput: string, index: number): Promise<PreparedImage> {
    const sourceLabel = `输入图片 #${index + 1}`;

    if (isOssUrl(imageInput)) {
        throw new Error(`${sourceLabel} 暂不支持 oss:// 输入，因为无法在本地校验格式和像素`);
    }

    if (isDataUrl(imageInput)) {
        const match = imageInput.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
        if (!match) {
            throw new Error(`${sourceLabel} 不是合法的 Data URL`);
        }

        const mimeType = match[1].toLowerCase();
        const buffer = Buffer.from(match[2], 'base64');
        const metadata = detectImageMetadata(buffer);

        if (metadata.mimeType !== mimeType) {
            throw new Error(`${sourceLabel} MIME 类型和实际图片格式不一致`);
        }

        validateImageMetadata(metadata, sourceLabel);

        return {
            requestValue: imageInput,
            metadata,
        };
    }

    if (isHttpUrl(imageInput)) {
        const buffer = await downloadBinary(imageInput);
        const metadata = detectImageMetadata(buffer);
        validateImageMetadata(metadata, sourceLabel);

        return {
            requestValue: imageInput,
            metadata,
        };
    }

    const localPath = path.resolve(imageInput);
    if (!fs.existsSync(localPath)) {
        throw new Error(`${sourceLabel} 文件不存在: ${localPath}`);
    }

    const buffer = fs.readFileSync(localPath);
    const metadata = detectImageMetadata(buffer);
    validateImageMetadata(metadata, sourceLabel);

    return {
        requestValue: `data:${getMimeType(metadata.format)};base64,${buffer.toString('base64')}`,
        metadata,
    };
}

async function prepareImageInputs(images: string[] | undefined): Promise<PreparedImage[]> {
    if (!images || images.length === 0) {
        return [];
    }

    const expandedImages = images.flatMap((image) => {
        if (isLocalDirectory(image)) {
            return expandDirectoryImages(image);
        }
        return [image];
    });

    if (expandedImages.length > maxInputImages) {
        throw new Error(`输入图片数量超出范围，最多支持 ${maxInputImages} 张`);
    }

    return Promise.all(expandedImages.map((image, index) => prepareSingleImageInput(image, index)));
}

function getFileExtension(fileUrl: string): string {
    try {
        const pathname = new URL(fileUrl).pathname;
        const ext = path.extname(pathname);
        return ext || '.png';
    } catch {
        return '.png';
    }
}

async function downloadAndSaveImage(
    fileUrl: string,
    outputDir: string,
    filenamePrefix: string,
    index: number,
): Promise<DownloadResult> {
    const extension = getFileExtension(fileUrl);
    const localPath = path.join(outputDir, `${filenamePrefix}-${index + 1}${extension}`);

    try {
        const buffer = await downloadBinary(fileUrl);
        fs.writeFileSync(localPath, buffer);
        return {
            localPath,
            originalUrl: fileUrl,
        };
    } catch (error: any) {
        if (fs.existsSync(localPath)) {
            fs.unlinkSync(localPath);
        }
        throw new Error(`保存图片失败: ${error.message}`);
    }
}

async function callImageGeneration(
    config: BailianConfig,
    input: ImageGenerationInput,
): Promise<ImageGenerationResponse> {
    const preparedImages = await prepareImageInputs(input.images);
    const apiUrl = `${getBaseUrl(config.region || 'beijing')}${generationPointer}`;
    const requestBody: ImageGenerationRequest = {
        model: input.model || config.image?.defaultModel || 'qwen-image-2.0-pro',
        input: {
            messages: [
                {
                    role: 'user',
                    content: [
                        ...preparedImages.map((image) => ({ image: image.requestValue })),
                        {
                            text: input.prompt,
                        },
                    ],
                },
            ],
        },
        parameters: {
            n: input.n || config.image?.defaultImageCount || 1,
        },
    };

    if (input.size || config.image?.defaultSize) {
        requestBody.parameters.size = input.size || config.image?.defaultSize;
    }

    if (input.negative_prompt) {
        requestBody.parameters.negative_prompt = input.negative_prompt;
    }

    if (input.prompt_extend !== undefined) {
        requestBody.parameters.prompt_extend = input.prompt_extend;
    } else if (config.image?.defaultPromptExtend !== undefined) {
        requestBody.parameters.prompt_extend = config.image.defaultPromptExtend;
    }

    if (input.watermark !== undefined) {
        requestBody.parameters.watermark = input.watermark;
    }

    if (input.seed !== undefined) {
        requestBody.parameters.seed = input.seed;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        let errorText = '';
        try {
            errorText = await response.text();
        } catch {
            errorText = response.statusText;
        }
        throw new Error(
            `百炼 Image API 错误: ${response.status} ${response.statusText} - ${errorText}`,
        );
    }

    const data = (await response.json()) as ImageGenerationResponse;

    if (data.code) {
        throw new Error(`百炼 Image API 返回错误: ${data.code} - ${data.message || '未知错误'}`);
    }

    if (!data.output?.choices?.length) {
        throw new Error('百炼 Image API 返回无效响应：缺少 choices');
    }

    return data;
}

function extractImageUrls(result: ImageGenerationResponse): string[] {
    const urls = new Set<string>();

    for (const choice of result.output.choices || []) {
        for (const content of choice.message?.content || []) {
            if (content.image) {
                urls.add(content.image);
            }
        }
    }

    return [...urls];
}

export async function generateImage(
    config: BailianConfig,
    input: ImageGenerationInput,
    options?: {
        outputDir?: string;
    },
): Promise<{ success: boolean; [key: string]: any }> {
    if (!input.prompt?.trim()) {
        return {
            success: false,
            error: '提示词不能为空',
        };
    }

    const model = input.model || config.image?.defaultModel || 'qwen-image-2.0-pro';
    if (!model.startsWith(supportedModelPrefix)) {
        return {
            success: false,
            error: `当前仅支持 ${supportedModelPrefix} 系列模型，收到: ${model}`,
        };
    }

    if (input.prompt.length > 800) {
        return {
            success: false,
            error: '提示词长度超过限制，最多支持 800 字符',
        };
    }

    if (input.negative_prompt && input.negative_prompt.length > 500) {
        return {
            success: false,
            error: '负向提示词长度超过限制，最多支持 500 字符',
        };
    }

    if ((input.n || 1) < 1 || (input.n || 1) > 6) {
        return {
            success: false,
            error: '图片数量超出范围，支持 1 到 6',
        };
    }

    const result = await callImageGeneration(config, input);
    const imageUrls = extractImageUrls(result);
    if (imageUrls.length === 0) {
        throw new Error('图片生成成功，但响应中没有找到图片 URL');
    }

    const outputDir = ensureImageDir(options?.outputDir);
    const filenamePrefix = `image-${Date.now()}`;
    const downloads = await Promise.all(
        imageUrls.map((imageUrl, index) =>
            downloadAndSaveImage(imageUrl, outputDir, filenamePrefix, index),
        ),
    );

    return {
        success: true,
        request_id: result.request_id,
        local_paths: downloads.map((item) => item.localPath),
        original_urls: downloads.map((item) => item.originalUrl),
        usage: result.usage,
    };
}
