/**
 * Bailian 共享类型定义
 */

// Bailian TTS 支持的音色列表
export type BailianVoice =
    | 'Cherry'      // 芊悦，阳光积极、亲切自然小姐姐（女性）
    | 'Serena'      // 苏瑶，温柔小姐姐（女性）
    | 'Ethan'       // 晨煦，标准普通话，阳光、温暖、活力（男性）
    | 'Chelsie'     // 千雪，二次元虚拟女友（女性）
    | 'Momo'        // 茉兔，撒娇搞怪（女性）
    | 'Vivian'      // 十三，拽拽的、可爱的小暴躁（女性）
    | 'Moon'        // 月白，率性帅气的（男性）
    | 'Maia'        // 四月，知性与温柔（女性）
    | 'Kai'         // 凯，耳朵的一场SPA（男性）
    | 'Bella'       // 萌宝，小萝莉（女性）
    | 'Eldric Sage' // 沧明子，沉稳睿智的老者（男性）
    | 'Mia'         // 乖小妹，温顺乖巧（女性）
    | 'Mochi'       // 沙小弥，聪明伶俐的小大人（男性）
    | 'Bellona'     // 燕铮莺，声音洪亮，江湖气息（女性）
    | 'Vincent'     // 田叔，沙哑烟嗓（男性）
    | 'Bunny'       // 萌小姬，萌属性爆棚（女性）
    | 'Neil'        // 阿闻，新闻主持人（男性）
    | 'Elias'       // 墨讲师，学科严谨性（女性）
    | 'Arthur'      // 徐大爷，质朴嗓音（男性）
    | 'Nini'        // 邻家妹妹，甜得酥（女性）
    | 'Ebona'       // 诡婆婆，低语幽暗（女性）
    | 'Seren'       // 小婉，助眠舒缓（女性）
    | 'Pip'         // 顽屁小孩，调皮捣蛋（男性）
    | 'Stella';     // 少女阿月，迷糊少女音（女性）

// Bailian TTS 支持的语言
export type BailianLanguage =
    | 'Auto'         // 自动检测
    | 'Chinese'      // 中文
    | 'English'      // 英语
    | 'German'       // 德语
    | 'Italian'      // 意大利语
    | 'Portuguese'   // 葡萄牙语
    | 'Spanish'      // 西班牙语
    | 'Japanese'     // 日语
    | 'Korean'       // 韩语
    | 'French'       // 法语
    | 'Russian';     // 俄语

export interface BailianTTSConfig {
    defaultVoice?: BailianVoice;
    defaultLanguage?: BailianLanguage;
}

export interface BailianConfig {
    apiKey: string;
    region?: 'beijing' | 'singapore';
    tts?: BailianTTSConfig;
}

export interface TTSInput {
    text: string;
    voice?: BailianVoice;
    language_type?: BailianLanguage;
    instructions?: string;
    optimize_instructions?: boolean;
    stream?: boolean;
}

export interface TTSRequest {
    model: string;
    input: TTSInput;
}

export interface TTSResponse {
    status_code: number;
    request_id: string;
    code: string;
    message: string;
    output: {
        audio: {
            url: string;
            data: string;
            id: string;
            expires_at: number;
        };
        finish_reason: string;
    };
    usage: {
        input_tokens: number;
        output_tokens: number;
        characters: number;
    };
}

export interface DownloadResult {
    localPath: string;
    originalUrl: string;
}
