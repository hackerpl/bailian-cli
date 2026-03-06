/**
 * TTS 服务核心逻辑
 */

import os from 'os';
import fs from 'fs';
import path from 'path';

import type { BailianConfig, TTSInput, DownloadResult, TTSResponse, TTSRequest } from '../../core/types.js';
import { getBaseUrl } from '../../core/config.js';

const pointer = '/multimodal-generation/generation';

/**
 * 确保音频目录存在
 */
function ensureAudioDir(customDir?: string): string {
    const audioDir = customDir || path.join(os.homedir(), '.bailian-cli/media');
    if (!fs.existsSync(audioDir)) {
        fs.mkdirSync(audioDir, { recursive: true });
    }
    return audioDir;
}

/**
 * 下载音频文件并返回 Buffer
 */
async function downloadAudio(audioUrl: string): Promise<Buffer> {
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
        throw new Error(`下载音频失败: ${audioResponse.statusText}`);
    }
    return Buffer.from(await audioResponse.arrayBuffer());
}

/**
 * 下载音频文件到本地
 */
async function downloadAndSaveAudio(audioUrl: string, outputDir?: string): Promise<DownloadResult> {
    const audioDir = ensureAudioDir(outputDir);
    const timestamp = Date.now();
    const wavPath = path.join(audioDir, `${timestamp}.wav`);

    try {
        const audioBuffer = await downloadAudio(audioUrl);
        fs.writeFileSync(wavPath, audioBuffer);

        return {
            localPath: wavPath,
            originalUrl: audioUrl,
        };
    } catch (error: any) {
        if (fs.existsSync(wavPath)) {
            fs.unlinkSync(wavPath);
        }
        throw new Error(`保存音频失败: ${error.message}`);
    }
}

/**
 * 调用百炼 TTS API
 */
async function callBailianTTS(
    config: BailianConfig,
    input: TTSInput
): Promise<TTSResponse> {
    const apiUrl = getBaseUrl(config.region || 'beijing') + pointer;

    const requestBody: TTSRequest = {
        model: 'qwen3-tts-instruct-flash',
        input: {
            text: input.text,
            voice: input.voice || config.tts?.defaultVoice || 'Cherry',
            language_type: input.language_type || config.tts?.defaultLanguage || 'Chinese',
        }
    };

    if (input.instructions) {
        requestBody.input.instructions = input.instructions;
    }

    if (input.optimize_instructions !== undefined) {
        requestBody.input.optimize_instructions = input.optimize_instructions;
    }

    if (input.stream !== undefined) {
        requestBody.input.stream = input.stream;
    }

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${config.apiKey}`,
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
            `百炼 TTS API 错误: ${response.status} ${response.statusText} - ${errorText}`
        );
    }

    const data = (await response.json()) as any;

    if (data.code && data.code !== '') {
        throw new Error(
            `百炼 TTS API 返回错误: ${data.code} - ${data.message || '未知错误'}`
        );
    }

    if (!data.output || !data.output.audio) {
        throw new Error('百炼 TTS API 返回无效响应：缺少 audio 输出');
    }

    if (!input.stream && !data.output.audio.url && !data.output.audio.data) {
        throw new Error('百炼 TTS API 返回无效响应：缺少 audio url 或 data');
    }

    return data as TTSResponse;
}

/**
 * TTS 服务主函数
 */
export async function textToSpeech(
    config: BailianConfig,
    input: TTSInput,
    outputFormat: 'url' | 'data' = 'url',
    outputDir?: string
): Promise<{ success: boolean;[key: string]: any }> {
    // 验证文本长度
    if (input.text && input.text.length > 600) {
        return {
            success: false,
            error: '文本长度超过限制，最多支持 600 字符',
            text_length: input.text.length,
        };
    }

    // 调用 TTS API
    const result = await callBailianTTS(config, input);

    if (outputFormat === 'url') {
        const { localPath, originalUrl } = await downloadAndSaveAudio(result.output.audio.url, outputDir);

        return {
            success: true,
            original_url: originalUrl,
            local_path: localPath,
            audio_id: result.output.audio.id,
            expires_at: new Date(result.output.audio.expires_at * 1000).toISOString(),
            usage: result.usage,
        };
    } else {
        return {
            success: true,
            audio_base64: result.output.audio.data,
            audio_id: result.output.audio.id,
            expires_at: new Date(result.output.audio.expires_at * 1000).toISOString(),
            usage: result.usage,
        };
    }
}
