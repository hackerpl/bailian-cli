#!/usr/bin/env node

/**
 * 百炼 CLI 工具入口
 */

import { Command } from 'commander';
import { registerTtsCommand } from './commands/tts.js';
import { registerImageCommand } from './commands/image.js';

const program = new Command();

program
    .name('bailian')
    .description('阿里云百炼服务 CLI 工具')
    .version('1.0.0')
    .option('--api-key <key>', '百炼 API Key（也可通过环境变量 BAILIAN_API_KEY 设置）')
    .option('--region <region>', 'API 区域：beijing | singapore', 'beijing');

// 注册子命令
registerTtsCommand(program);
registerImageCommand(program);

// 未来可以在这里注册其他子命令
// registerAsrCommand(program);

program.parse();
