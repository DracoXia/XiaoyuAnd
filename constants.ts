





// 资源配置
export const DEFAULT_AUDIO_URL = "https://xiaoyuand2026-1252955517.cos.ap-guangzhou.myqcloud.com/ShanCha_Mp3.mp3"; 
export const TRANSITION_AUDIO_URL = "https://xiaoyuand2026-1252955517.cos.ap-guangzhou.myqcloud.com/female-sigh-450446.mp3";
export const POUR_AUDIO_URL = "https://cdn.pixabay.com/audio/2022/03/24/audio_097f7d389a.mp3"; // Pouring water sound

export const TEA_GREEN_COLOR = "#9E9D24";

// --- NEW: Fragrance Box Options (O2O) ---
export const FRAGRANCE_LIST = [
    {
        id: 'camellia',
        name: '山茶 · 见山',
        desc: '温润白茶，清旷山色',
        status: 'owned', // User has this
        color: 'bg-orange-100 text-dopamine-orange',
        gradient: 'from-orange-50 to-amber-50',
        audioUrl: DEFAULT_AUDIO_URL
    },
    {
        id: 'cedar',
        name: '雪松 · 听雪',
        desc: '苍古木韵，沉静定心',
        status: 'locked', // Needs unlock
        color: 'bg-stone-100 text-stone-600',
        gradient: 'from-stone-50 to-gray-50',
        audioUrl: '' // Mock
    },
    {
        id: 'lily',
        name: '百合 · 枕月',
        desc: '幽谷花香，安神助眠',
        status: 'locked',
        color: 'bg-purple-100 text-purple-600',
        gradient: 'from-purple-50 to-indigo-50',
        audioUrl: '' // Mock
    }
];

// --- NEW: Ambiance Tuner Options (Immersion) ---
export const AMBIANCE_MODES = [
    {
        id: 'default',
        label: '本味',
        icon: 'tea', // mapped in component
        audioUrl: DEFAULT_AUDIO_URL, // Base track
        theme: 'warm' // Warm Orange/Yellow
    },
    {
        id: 'rain',
        label: '听雨',
        icon: 'rain',
        // Placeholder to prevent 404s.
        audioUrl: DEFAULT_AUDIO_URL, 
        theme: 'rain' // Cool Blue/Gray
    },
    {
        id: 'wind',
        label: '晚风',
        icon: 'wind',
        // Placeholder to prevent 404s.
        audioUrl: DEFAULT_AUDIO_URL,
        theme: 'wind' // Nature Green/Teal
    }
];

export const TEXT_CONTENT = {
  ritual: {
    main: ["白", "茶", "洗", "心"],
    hint: "倾斜手机，注茶入盏"
  },
  immersion: [
    "庭院无声",
    "暖阳在白瓷杯盏间",
    "打了个盹",
    "", 
    "浮动的茶烟",
    "唤醒了远方的山岚",
    "在清旷的留白里",
    "", 
    "此间坐久",
    "见山色",
    "见清欢"
  ],
  product: {
    entryLabel: "溯源 · 安心",
    modal: {
      title: "安心入座的理由",
      origin: {
        title: "[ 关于这一缕香的由来 ]",
        part1: "摒弃化学香精的矫饰，唯留天然草木研磨后的真味。这一支香，由",
        highlight: "非遗传承人",
        part2: "亲手拣选、炮制，将古老的手艺化作指尖的温度。",
        part3: "每一道工序的严苛与纯净，皆已通过国家标准的安全验证。我们敬畏手艺，亦如我们珍视你的每一口呼吸。"
      },
      ingredients: {
        title: "[ 甄选 · 自然原材 ]",
        list: [
          { name: "白花银针", desc: "毫香蜜韵 · 茶骨" },
          { name: "山茶花", desc: "清雅幽寒 · 去燥" },
          { name: "白兰花", desc: "灵动鲜活 ·提神" },
          { name: "雪松", desc: "沉稳苍古 · 定心" }
        ]
      },
      // New Story Section
      story: {
        title: "制香师说",
        subtitle: "午后暖阳与一杯茶",
        content: [
            "做香之前，我开过茶楼。那几年，日子泡在茶汤里，每年都要去不同的茶山寻茶。",
            "2020年，我彻底迷上了白茶——原生种的菜茶，白花银针，那是一种清雅的、带有淡淡花香的骨气。",
            "这支香的灵感，便来自午后暖阳下的一杯清茶。",
            "我想记录下喝茶的全生命周期：从准备茶具，把桌椅搬到庭院里，认真对待每一片叶子。",
            "闻干茶的毫香，第一泡的鲜活花香，至四五泡后沉稳的草木香……",
            "我将这些时光的味道，都揉进了这支香里。"
        ]
      },
      reminder: {
        title: "[ 温柔提醒 ]",
        text: "见烟起时，请为空间留一道透气的缝隙。在流动的空气里，草木的韵味方能舒展，最是动人。"
      },
      footer: "( 请在通风处使用，并远离易燃物 )"
    }
  }
};

export const MOOD_OPTIONS = [
  { 
      id: 'anxious', 
      label: '有点焦虑', 
      icon: '〰️', 
      style: 'bg-dopamine-purple/10 text-dopamine-purple ring-2 ring-dopamine-purple/20' 
  },
  { 
      id: 'tired', 
      label: '好累呀', 
      icon: '🌫️', 
      style: 'bg-gray-100 text-ink-light ring-2 ring-gray-200' 
  },
  { 
      id: 'confused', 
      label: '乱乱的', 
      icon: '☁️', 
      style: 'bg-dopamine-teal/10 text-dopamine-teal ring-2 ring-dopamine-teal/20' 
  },
  { 
      id: 'sad', 
      label: '想哭', 
      icon: '💧', 
      style: 'bg-dopamine-blue/10 text-dopamine-blue ring-2 ring-dopamine-blue/20' 
  },
  { 
      id: 'calm', 
      label: '发发呆', 
      icon: '🍃', 
      style: 'bg-dopamine-green/10 text-dopamine-green ring-2 ring-dopamine-green/20' 
  },
  { 
      id: 'joy', 
      label: '小确幸', 
      icon: '✨', 
      style: 'bg-dopamine-orange/10 text-dopamine-orange ring-2 ring-dopamine-orange/20' 
  },
];

export const CONTEXT_OPTIONS = ['工作/学业', '感情', '健康/身材', '家庭', '人际关系', '说不清'];

export const AI_PROMPTS = {
  sign: (timeOfDay: string) => `你是白茶之灵。现在是${timeOfDay}。请生成一句不超过 10 个字的禅意短句，引导用户进入冥想。不要解释，直接输出句子。`,
  
  treehole: (mood: string, context: string, text: string) => 
    `Role: 你是“小屿”，一位温柔的心理疗愈师，同时也是山间茶园的小精灵。
     Tone: 治愈、温暖、软萌（使用“呀”、“呢”），但要有心理学支撑，不做无用的假大空安慰。
     User State: 心情[${mood}]，场景[${context}]，具体描述[${text || "无"}]。

     请生成 JSON 格式的回复，包含以下两个部分：

     1. reply (小屿的回信):
        - 运用 **ACT（接纳承诺疗法）** 的技巧：先完全接纳并确认（Validate）用户的情绪（例如：“感到焦虑是很正常的生理反应...”），然后进行温柔的隐喻重构（Metaphor）。
        - 结尾给出一个 **极微小的行动建议**（Micro-action），例如：“现在，试着深吸一口气，或者摸摸身边柔软的东西”。
        - 语气像在哄小朋友，但内容要有力量。
        - 60-80字。

     2. story (远方的回响):
        - 这是一个 **真实的、有颗粒度** 的用户经历。
        - **必须写实**：不要写“后来一切都好了”这种童话。要写“即使生活很难，但在某个瞬间，我被治愈了”。
        - **包含感官细节**：必须包含声音（地铁报站、雨声）、气味（关东煮、洗衣液）或触觉。
        - **情绪曲线**：压抑/崩溃 -> 偶遇微光 -> 平静/接纳。
        - 示例意象：凌晨三点的便利店、加班后看到的月亮、流浪猫的蹭蹭、被淋湿的裤脚。
        - 60-80字。

     3. nickname: 一个带点小情绪但很可爱的昵称（如：正在发芽的土豆、想去海边的路灯）。

     Output JSON Example:
     {
       "reply": "...",
       "story": "...",
       "nickname": "..."
     }
    `
};

export const DASHBOARD_DATA = {
  scenarios: [
    // Vibrant "Dopamine" Colors with gradients for new UI
    { 
        id: 'relax', 
        title: '放松', 
        subtitle: '白茶', 
        iconType: 'leaf', 
        status: 'active', 
        // Using gradient classes for the card background
        gradient: 'from-orange-50 to-amber-50',
        accent: 'text-dopamine-orange',
        shadow: 'shadow-orange-200/50',
        iconBg: 'bg-orange-100'
    },
    { 
        id: 'focus', 
        title: '专注', 
        subtitle: '听松', 
        iconType: 'flame', 
        status: 'locked', 
        gradient: 'from-lime-50 to-green-50',
        accent: 'text-lime-600',
        shadow: 'shadow-lime-200/50',
        iconBg: 'bg-lime-100'
    },
    { 
        id: 'sleep', 
        title: '助眠', 
        subtitle: '野百合', 
        iconType: 'moon', 
        status: 'locked', 
        gradient: 'from-violet-50 to-purple-50',
        accent: 'text-violet-600',
        shadow: 'shadow-violet-200/50',
        iconBg: 'bg-violet-100'
    },
    { 
        id: 'sos', 
        title: '急救', 
        subtitle: '山鬼', 
        iconType: 'snowflake', 
        status: 'locked', 
        gradient: 'from-rose-50 to-pink-50',
        accent: 'text-rose-600',
        shadow: 'shadow-rose-200/50',
        iconBg: 'bg-rose-100'
    },
  ] as const,
  lifestyle: {
    title: "直面情绪 · 宠爱自己",
    subtitle: "关注内心的喜好，在衣食住行中学会自我疗愈。",
    tag: "小屿和生活",
    action: "探索品牌空间",
    slogan: "不开心也没关系呀 🧸\n换件舒服的衣服，吃口甜甜的茶食，\n做回那个被宠爱的小朋友吧 ✨",
    categories: ["衣", "食", "住", "行"]
  }
};

// 10 minutes in milliseconds for immersion time
export const IMMERSION_DURATION = 10 * 60 * 1000;