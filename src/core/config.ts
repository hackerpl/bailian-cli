/**
 * Bailian 配置管理
 */

import type { BailianConfig } from './types.js';

/**
 * 根据区域获取百炼 API 根地址
 */
export function getApiRoot(region: string): string {
    if (region === 'singapore') {
        return 'https://dashscope-intl.aliyuncs.com/api/v1';
    }
    return 'https://dashscope.aliyuncs.com/api/v1';
}

/**
 * 根据区域获取百炼 AIGC 服务基础 URL
 */
export function getBaseUrl(region: string): string {
    return `${getApiRoot(region)}/services/aigc`;
}

/**
 * 从环境变量和命令行参数组合出 BailianConfig
 */
export function resolveConfig(options: {
    apiKey?: string;
    region?: string;
}): BailianConfig {
    const apiKey = options.apiKey || process.env.BAILIAN_API_KEY;

    if (!apiKey) {
        throw new Error(
            '缺少 API Key！请通过以下方式之一提供：\n' +
            '  1. 设置环境变量 BAILIAN_API_KEY\n' +
            '  2. 使用 --api-key 参数'
        );
    }

    const region = (options.region || process.env.BAILIAN_REGION || 'beijing') as 'beijing' | 'singapore';

    return {
        apiKey,
        region,
    };
}
