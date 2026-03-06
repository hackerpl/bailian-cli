/**
 * TTS 可用音色列表
 */

export interface VoiceInfo {
    name: string;
    description: string;
    gender: string;
}

export function getAvailableVoices(): VoiceInfo[] {
    return [
        { name: 'Cherry', description: '芊悦，阳光积极、亲切自然小姐姐', gender: '女性' },
        { name: 'Serena', description: '苏瑶，温柔小姐姐', gender: '女性' },
        { name: 'Ethan', description: '晨煦，标准普通话，阳光、温暖、活力', gender: '男性' },
        { name: 'Chelsie', description: '千雪，二次元虚拟女友', gender: '女性' },
        { name: 'Momo', description: '茉兔，撒娇搞怪', gender: '女性' },
        { name: 'Vivian', description: '十三，拽拽的、可爱的小暴躁', gender: '女性' },
        { name: 'Moon', description: '月白，率性帅气', gender: '男性' },
        { name: 'Maia', description: '四月，知性与温柔', gender: '女性' },
        { name: 'Kai', description: '凯，耳朵的一场SPA', gender: '男性' },
        { name: 'Bella', description: '萌宝，小萝莉', gender: '女性' },
        { name: 'Eldric Sage', description: '沧明子，沉稳睿智的老者', gender: '男性' },
        { name: 'Mia', description: '乖小妹，温顺乖巧', gender: '女性' },
        { name: 'Mochi', description: '沙小弥，聪明伶俐的小大人', gender: '男性' },
        { name: 'Bellona', description: '燕铮莺，声音洪亮，江湖气息', gender: '女性' },
        { name: 'Vincent', description: '田叔，沙哑烟嗓', gender: '男性' },
        { name: 'Bunny', description: '萌小姬，萌属性爆棚', gender: '女性' },
        { name: 'Neil', description: '阿闻，新闻主持人', gender: '男性' },
        { name: 'Elias', description: '墨讲师，学科严谨性', gender: '女性' },
        { name: 'Arthur', description: '徐大爷，质朴嗓音', gender: '男性' },
        { name: 'Nini', description: '邻家妹妹，甜得酥', gender: '女性' },
        { name: 'Ebona', description: '诡婆婆，低语幽暗', gender: '女性' },
        { name: 'Seren', description: '小婉，助眠舒缓', gender: '女性' },
        { name: 'Pip', description: '顽屁小孩，调皮捣蛋', gender: '男性' },
        { name: 'Stella', description: '少女阿月，迷糊少女音', gender: '女性' },
    ];
}
