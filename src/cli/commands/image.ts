/**
 * Image 子命令定义
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { resolveConfig } from '../../core/config.js';
import { generateImage } from '../../services/image/index.js';

function collectValues(value: string, previous: string[]): string[] {
    previous.push(value);
    return previous;
}

function parseInteger(value: string, label: string): number {
    const parsed = Number.parseInt(value, 10);
    if (Number.isNaN(parsed)) {
        throw new Error(`${label} 必须是整数`);
    }
    return parsed;
}

function assertPositive(value: number, label: string): void {
    if (value <= 0) {
        throw new Error(`${label} 必须大于 0`);
    }
}

export function registerImageCommand(program: Command): void {
    program
        .command('image')
        .description('文生图（Image Generation）')
        .option('-p, --prompt <prompt>', '图片提示词（必填）')
        .option('-i, --image <image>', '输入图片路径/目录/HTTP(S) URL/Data URL，可重复传入，最多展开为 3 张', collectValues, [])
        .option('-m, --model <model>', '模型名称', 'qwen-image-2.0-pro')
        .option('-s, --size <size>', '图片尺寸，例如：1024*1024、1280*720', '1280*1280')
        .option('-n, --max-images <count>', '生成图片数量上限（1-6）', '1')
        .option('-N, --negative-prompt <prompt>', '负向提示词')
        .option('-d, --output-dir <dir>', '自定义图片输出目录')
        .option('--seed <seed>', '随机种子')
        .option('--no-prompt-extend', '关闭提示词智能改写')
        .option('--watermark', '为生成图片添加水印', false)
        .action(async (options) => {
            if (!options.prompt) {
                console.error(chalk.red('错误: 必须提供 -p/--prompt 参数'));
                process.exit(1);
            }

            const spinner = ora('正在生成图片...').start();

            try {
                const globalOpts = program.opts();
                const config = resolveConfig({
                    apiKey: globalOpts.apiKey,
                    region: globalOpts.region,
                });

                const maxImages = parseInteger(options.maxImages, 'max-images');
                const seed = options.seed ? parseInteger(options.seed, 'seed') : undefined;
                assertPositive(maxImages, 'max-images');
                if (seed !== undefined && seed < 0) {
                    throw new Error('seed 不能小于 0');
                }
                if (seed !== undefined && seed > 2147483647) {
                    throw new Error('seed 不能大于 2147483647');
                }

                const result = await generateImage(
                    config,
                    {
                        prompt: options.prompt,
                        images: options.image,
                        model: options.model,
                        size: options.size,
                        n: maxImages,
                        negative_prompt: options.negativePrompt,
                        prompt_extend: options.promptExtend,
                        watermark: options.watermark || undefined,
                        seed,
                    },
                    {
                        outputDir: options.outputDir,
                    },
                );

                spinner.stop();

                if (result.success) {
                    console.log(chalk.green('✅ 图片生成成功！\n'));
                    if (result.request_id) {
                        console.log(chalk.bold('🆔 请求 ID: ') + result.request_id);
                    }

                    console.log(chalk.bold('\n📁 本地文件:'));
                    for (const filePath of result.local_paths || []) {
                        console.log(`   ${chalk.cyan(filePath)}`);
                    }

                    console.log(chalk.bold('\n🔗 原始 URL:'));
                    for (const fileUrl of result.original_urls || []) {
                        console.log(`   ${chalk.dim(fileUrl)}`);
                    }

                    if (result.usage?.image_count !== undefined) {
                        console.log(chalk.bold('\n📊 用量统计:'));
                        console.log(`   图片数量: ${result.usage.image_count}`);
                        if (result.usage.width && result.usage.height) {
                            console.log(`   分辨率: ${result.usage.width}x${result.usage.height}`);
                        }
                    }
                } else {
                    console.log(chalk.red('❌ 图片生成失败\n'));
                    console.log(chalk.red('错误: ') + result.error);
                    process.exit(1);
                }
            } catch (error: any) {
                spinner.fail('图片生成失败');
                console.error(chalk.red('\n错误: ') + error.message);
                process.exit(1);
            }
        });
}
