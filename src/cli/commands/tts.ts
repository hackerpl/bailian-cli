/**
 * TTS 子命令定义
 */

import { Command } from 'commander';
import chalk from 'chalk';
import ora from 'ora';
import { resolveConfig } from '../../core/config.js';
import { textToSpeech } from '../../services/tts/index.js';
import { getAvailableVoices } from '../../services/tts/voices.js';
import type { BailianVoice, BailianLanguage } from '../../core/types.js';

/**
 * 注册 tts 子命令
 */
export function registerTtsCommand(program: Command): void {
    program
        .command('tts')
        .description('文本转语音（Text-to-Speech）')
        .option('-t, --text <text>', '要合成的文本（最长 600 字符）')
        .option('-v, --voice <voice>', '音色名称', 'Cherry')
        .option('-l, --language <language>', '语言类型：Auto, Chinese, English, German, Italian, Portuguese, Spanish, Japanese, Korean, French, Russian', 'Chinese')
        .option('-i, --instructions <instructions>', '语言风格指令，例如："用温柔缓慢的语调"')
        .option('-o, --output <format>', '输出格式：url（下载到本地） | data（返回 base64）', 'url')
        .option('-d, --output-dir <dir>', '自定义音频输出目录（仅在 output=url 时有效）')
        .option('-f, --audio-format <format>', '本地音频格式：wav | mp3（仅在 output=url 时有效）', 'wav')
        .option('--optimize', '优化指令以提升语音表现力', false)
        .option('--list-voices', '列出所有可用音色')
        .action(async (options) => {
            // 列出音色
            if (options.listVoices) {
                printVoiceList();
                return;
            }

            // 手动校验 text 参数
            if (!options.text) {
                console.error(chalk.red('错误: 必须提供 -t/--text 参数'));
                process.exit(1);
            }

            if (!['wav', 'mp3'].includes(options.audioFormat)) {
                console.error(chalk.red('错误: --audio-format 仅支持 wav 或 mp3'));
                process.exit(1);
            }

            const spinner = ora('正在合成语音...').start();

            try {
                // 获取全局选项
                const globalOpts = program.opts();

                // 解析配置
                const config = resolveConfig({
                    apiKey: globalOpts.apiKey,
                    region: globalOpts.region,
                });

                // 调用 TTS 服务
                const result = await textToSpeech(
                    config,
                    {
                        text: options.text,
                        voice: options.voice as BailianVoice,
                        language_type: options.language as BailianLanguage,
                        instructions: options.instructions,
                        optimize_instructions: options.optimize || undefined,
                    },
                    options.output,
                    options.outputDir,
                    options.audioFormat,
                );

                spinner.stop();

                if (result.success) {
                    console.log(chalk.green('✅ 语音合成成功！\n'));

                    if (result.local_path) {
                        console.log(chalk.bold('📁 文件路径: ') + chalk.cyan(result.local_path));
                    }
                    if (result.original_url) {
                        console.log(chalk.bold('🔗 原始 URL: ') + chalk.dim(result.original_url));
                    }
                    if (result.audio_id) {
                        console.log(chalk.bold('🆔 音频 ID:  ') + result.audio_id);
                    }
                    if (result.expires_at) {
                        console.log(chalk.bold('⏰ 过期时间: ') + result.expires_at);
                    }
                    if (result.usage) {
                        console.log(chalk.bold('\n📊 用量统计:'));
                        console.log(`   输入 tokens: ${result.usage.input_tokens}`);
                        console.log(`   输出 tokens: ${result.usage.output_tokens}`);
                        console.log(`   字符数: ${result.usage.characters}`);
                    }
                    if (result.audio_base64) {
                        console.log(chalk.bold('\n🔊 Base64 音频数据:'));
                        const preview = result.audio_base64.substring(0, 80);
                        console.log(chalk.dim(`   ${preview}...`));
                        console.log(chalk.dim(`   (共 ${result.audio_base64.length} 字符)`));
                    }
                } else {
                    console.log(chalk.red('❌ 语音合成失败\n'));
                    console.log(chalk.red('错误: ') + result.error);
                    if (result.text_length) {
                        console.log(chalk.yellow(`文本长度: ${result.text_length} / 600`));
                    }
                    process.exit(1);
                }
            } catch (error: any) {
                spinner.fail('语音合成失败');
                console.error(chalk.red('\n错误: ') + error.message);
                process.exit(1);
            }
        });
}

/**
 * 打印可用音色列表
 */
function printVoiceList(): void {
    const voices = getAvailableVoices();

    console.log(chalk.bold('\n🎙️  可用音色列表:\n'));
    console.log(
        chalk.dim('  ') +
        chalk.bold(padEnd('名称', 16)) +
        chalk.bold(padEnd('性别', 6)) +
        chalk.bold('描述')
    );
    console.log(chalk.dim('  ' + '─'.repeat(60)));

    for (const voice of voices) {
        console.log(
            '  ' +
            chalk.cyan(padEnd(voice.name, 16)) +
            chalk.dim(padEnd(voice.gender, 6)) +
            voice.description
        );
    }

    console.log(chalk.dim(`\n  共 ${voices.length} 个音色可用\n`));
}

/**
 * 字符串右填充（支持中文等宽字符）
 */
function padEnd(str: string, len: number): string {
    // 简单计算：每个中文字符占 2 个宽度
    let width = 0;
    for (const ch of str) {
        width += ch.charCodeAt(0) > 127 ? 2 : 1;
    }
    const padding = Math.max(0, len - width);
    return str + ' '.repeat(padding);
}
