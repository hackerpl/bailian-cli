# @hackerpl/bailian-cli

阿里云百炼服务命令行工具，支持 TTS（文本转语音）、Image（文生图）等多种 AI 服务。

## ✨ 特性

- 🎙️ **TTS（文本转语音）** — 支持 24 种音色、10 种语言，可自定义语音风格
- 🖼️ **Image（文生图）** — 支持提示词生成图片并自动下载到本地
- 🧩 **可扩展架构** — 模块化设计，轻松接入 ASR 等更多百炼服务
- 🎨 **友好的终端体验** — 彩色输出、加载动画、格式化结果展示

## 📦 安装

### 前置依赖

如果你需要使用 `bailian tts -f mp3` 输出 mp3，必须先在本机安装 `ffmpeg`，因为 CLI 会调用系统里的 `ffmpeg` 可执行文件完成转码。

如果只使用默认的 `wav` 输出，则不需要安装 `ffmpeg`。

### 推荐安装（全局安装）

```bash
npm i -g @hackerpl/bailian-cli
```

### 手动安装（从源码构建）

```bash
# 克隆项目
git clone https://github.com/hackerpl/bailian-cli.git
cd bailian-cli

# 安装依赖
npm install

# 构建
npm run build

# 全局链接（可选，方便直接使用 bailian 命令）
npm link
```

## 🔧 配置

CLI 需要百炼 API Key，支持两种方式提供：

### 方式一：环境变量（推荐）

```bash
# Windows
set BAILIAN_API_KEY=sk-xxxxxxxxxxxxxxxx

# Linux / macOS
export BAILIAN_API_KEY=sk-xxxxxxxxxxxxxxxx
```

### 安装 ffmpeg（仅 mp3 输出需要）

```bash
# macOS
brew install ffmpeg

# Ubuntu / Debian
sudo apt install ffmpeg

# Windows（scoop）
scoop install ffmpeg
```

### 方式二：命令行参数

```bash
bailian --api-key sk-xxxxxxxxxxxxxxxx tts -t "你好"
```

### 可选环境变量

| 环境变量 | 说明 | 默认值 |
|---------|------|--------|
| `BAILIAN_API_KEY` | 百炼 API Key | — |
| `BAILIAN_REGION` | API 区域 (`beijing` / `singapore`) | `beijing` |

## 🚀 使用

### 全局选项

```bash
bailian [全局选项] <命令> [命令选项]
```

| 选项 | 说明 |
|------|------|
| `--api-key <key>` | 百炼 API Key |
| `--region <region>` | API 区域：`beijing` \| `singapore` |
| `-V, --version` | 显示版本号 |
| `-h, --help` | 显示帮助信息 |

---

### `tts` — 文本转语音

将文本合成为语音，支持多种音色与语言。

```bash
bailian tts [选项]
```

#### 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-t, --text <text>` | 要合成的文本，最长 600 字符（**必填**） | — |
| `-v, --voice <voice>` | 音色名称 | `Cherry` |
| `-l, --language <lang>` | 语言类型 | `Chinese` |
| `-i, --instructions <inst>` | 语音风格指令 | — |
| `-o, --output <format>` | 输出格式：`url`（下载到本地）\| `data`（返回 base64） | `url` |
| `-d, --output-dir <dir>` | 自定义音频输出目录（仅 `url` 模式有效） | `~/.bailian-cli/media/` |
| `-f, --audio-format <format>` | 本地音频格式：`wav` \| `mp3`（仅 `url` 模式有效） | `wav` |
| `--optimize` | 优化指令以提升语音表现力 | `false` |
| `--list-voices` | 列出所有可用音色 | — |

#### 示例

```bash
# 基础使用 — 使用默认音色将文本转为语音并下载
bailian tts -t "你好，欢迎使用百炼 TTS 服务"

# 指定音色和语言
bailian tts -t "Hello World" -v "Ethan" -l "English"

# 添加语音风格指令
bailian tts -t "春眠不觉晓" -v "Serena" -i "用温柔缓慢的语调朗读"

# 启用指令优化
bailian tts -t "今天天气真好" -v "Cherry" -i "用开心活泼的语气" --optimize

# 输出为 base64 格式
bailian tts -t "测试" -o data

# 自定义音频输出目录
bailian tts -t "你好世界" -d "D:\audio\output"

# 下载后自动转为 mp3
bailian tts -t "你好世界" -f mp3

# 查看所有可用音色
bailian tts --list-voices
```

> `-f mp3` 依赖本机已安装 `ffmpeg`，CLI 会先下载 wav，再自动转码为 mp3。

#### 支持的语言

| 语言 | 值 |
|------|-----|
| 自动检测 | `Auto` |
| 中文 | `Chinese` |
| 英语 | `English` |
| 日语 | `Japanese` |
| 韩语 | `Korean` |
| 法语 | `French` |
| 德语 | `German` |
| 西班牙语 | `Spanish` |
| 意大利语 | `Italian` |
| 葡萄牙语 | `Portuguese` |
| 俄语 | `Russian` |

#### 可用音色

| 音色 | 描述 | 性别 |
|------|------|------|
| Cherry | 芊悦，阳光积极、亲切自然小姐姐 | 女 |
| Serena | 苏瑶，温柔小姐姐 | 女 |
| Ethan | 晨煦，标准普通话，阳光、温暖、活力 | 男 |
| Chelsie | 千雪，二次元虚拟女友 | 女 |
| Momo | 茉兔，撒娇搞怪 | 女 |
| Vivian | 十三，拽拽的、可爱的小暴躁 | 女 |
| Moon | 月白，率性帅气 | 男 |
| Maia | 四月，知性与温柔 | 女 |
| Kai | 凯，耳朵的一场SPA | 男 |
| Bella | 萌宝，小萝莉 | 女 |
| Eldric Sage | 沧明子，沉稳睿智的老者 | 男 |
| Mia | 乖小妹，温顺乖巧 | 女 |
| Mochi | 沙小弥，聪明伶俐的小大人 | 男 |
| Bellona | 燕铮莺，声音洪亮，江湖气息 | 女 |
| Vincent | 田叔，沙哑烟嗓 | 男 |
| Bunny | 萌小姬，萌属性爆棚 | 女 |
| Neil | 阿闻，新闻主持人 | 男 |
| Elias | 墨讲师，学科严谨性 | 女 |
| Arthur | 徐大爷，质朴嗓音 | 男 |
| Nini | 邻家妹妹，甜得酥 | 女 |
| Ebona | 诡婆婆，低语幽暗 | 女 |
| Seren | 小婉，助眠舒缓 | 女 |
| Pip | 顽屁小孩，调皮捣蛋 | 男 |
| Stella | 少女阿月，迷糊少女音 | 女 |

> 也可使用 `bailian tts --list-voices` 在终端查看。

---

### `image` — 文生图

根据提示词生成图片，并支持附带 1-3 张输入图进行生成或编辑，结果会自动下载到本地。

```bash
bailian image [选项]
```

#### 选项

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `-p, --prompt <prompt>` | 图片提示词（**必填**） | — |
| `-i, --image <image>` | 输入图片路径/目录/HTTP(S) URL/Data URL，可重复传入，最多展开为 3 张 | — |
| `-m, --model <model>` | 模型名称 | `qwen-image-2.0-pro` |
| `-s, --size <size>` | 图片尺寸，例如 `1024*1024`、`1280*720` | `1280*1280` |
| `-n, --max-images <count>` | 生成图片数量上限（1-6） | `1` |
| `-N, --negative-prompt <prompt>` | 负向提示词 | — |
| `-d, --output-dir <dir>` | 自定义图片输出目录 | `~/.bailian-cli/media/` |
| `--seed <seed>` | 随机种子 | — |
| `--no-prompt-extend` | 关闭提示词智能改写 | 默认开启 |
| `--watermark` | 为生成图片添加水印 | `false` |

#### 示例

```bash
# 基础使用
bailian image -p "一只戴着宇航头盔的橘猫，电影海报风格，细节丰富"

# 输入一张本地图进行编辑
bailian image -p "把这只猫改成水彩插画风格" -i "./cat.png"

# 输入多张图进行融合
bailian image -p "图1中的女生穿着图2中的黑色裙子按图3的姿势坐下" -i "./girl.png" -i "./dress.png" -i "./pose.png"

# 传入目录，按文件名顺序展开目录中的图片
bailian image -p "把这组三视图整合成一张角色设定图" -i "./reference-images"

# 指定尺寸和生成数量
bailian image -p "赛博朋克城市夜景，霓虹灯，雨夜，广角镜头" -s "1024*1024" -n 2

# 增加负向提示词
bailian image -p "极简风客厅，原木色，阳光穿过落地窗" -N "低清晰度，模糊，畸形"

# 指定模型、输出目录和种子
bailian image -p "中国山水画风格的雪山与松林" -m "qwen-image-2.0-pro" -d "./output" --seed 42

# 关闭提示词智能改写
bailian image -p "极简海报，一只白色海鸥飞过蓝色海面" --no-prompt-extend
```

#### 当前限制

- 当前仅支持 `qwen-image-2.0` 系列模型
- 输入图片最多 3 张
- `--image` 传入本地目录时，会按文件名顺序展开目录中的直接子图片文件
- 支持输入图片格式：`JPG`、`JPEG`、`PNG`、`BMP`、`TIFF`、`WEBP`、`GIF`
- 单张输入图片大小不能超过 `10MB`
- 输入图片宽高都必须在 `384` 到 `3072` 像素之间
- `oss://` 输入当前不支持，因为 CLI 无法在发送前完成本地格式和像素校验

## 📁 项目结构

```
bailian-cli/
├── package.json
├── tsconfig.json
├── src/
│   ├── cli/                    # CLI 入口与命令
│   │   ├── index.ts            # 主入口
│   │   └── commands/
│   │       ├── image.ts        # Image 子命令
│   │       └── tts.ts          # TTS 子命令
│   ├── services/               # 服务层（按服务拆分）
│   │   ├── image/
│   │   │   └── index.ts        # Image 核心逻辑
│   │   └── tts/
│   │       ├── index.ts        # TTS 核心逻辑
│   │       └── voices.ts       # 音色数据
│   └── core/                   # 共享模块
│       ├── types.ts            # 类型定义
│       └── config.ts           # 配置管理
└── dist/                       # 编译输出
```

## 🔌 扩展新服务

项目采用模块化架构，添加新的百炼服务非常简单：

1. **添加服务逻辑**：在 `src/services/` 下创建新目录（如 `src/services/asr/`）
2. **添加 CLI 命令**：在 `src/cli/commands/` 下创建命令文件（如 `asr.ts`）
3. **注册命令**：在 `src/cli/index.ts` 中引入并注册

```typescript
// src/cli/index.ts
import { registerAsrCommand } from './commands/asr.js';

// ...
registerAsrCommand(program);
```

## 🛠️ 开发

```bash
# 监听模式（自动重新编译）
npm run dev

# 手动构建
npm run build

# 直接运行（开发调试）
node dist/cli/index.js tts -t "测试"
node dist/cli/index.js image -p "一只会发光的水母漂浮在深海"
```

## 📄 License

MIT
