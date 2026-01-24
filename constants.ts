










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
      icon: '🌧️', 
      style: 'bg-dopamine-purple/10 text-dopamine-purple ring-2 ring-dopamine-purple/20' 
  },
  { 
      id: 'tired', 
      label: '好累呀', 
      icon: '🥱', 
      style: 'bg-gray-100 text-ink-light ring-2 ring-gray-200' 
  },
  { 
      id: 'confused', 
      label: '乱乱的', 
      icon: '🌫️', 
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
      icon: '🌤️', 
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
  validate: (content: string) => 
    `你是一个内容审核助手。判断以下用户分享是否适合展示在疗愈社区的"治愈墙"上。
     
     适合标准 (PASS):
     1. 包含具体场景或画面（如"雨天"、"热茶"）。
     2. 传递平静、温暖或希望。
     3. 即使是痛苦，也有微小的自救动作。

     不适合标准 (REJECT):
     1. 纯粹负能量发泄（如"想死"、"没意思"）。
     2. 无意义灌水。
     3. 攻击性言论。

     用户内容: "${content}"

     请只回答 "PASS" 或 "REJECT"。`
};

// --- PRESET LOCAL REPLIES (Offline Mode) ---
export const PRESET_NICKNAMES = [
    "路过的温暖小熊", "等雨停的蘑菇", "晒太阳的猫", "收集星星的人", "只有七秒记忆的鱼", 
    "森林里的邮递员", "云朵观察员", "喜欢喝茶的兔子", "深夜的守夜人", "修补月亮的人"
];

export const PRESET_REPLIES: Record<string, string[]> = {
    '有点焦虑': [
        "深呼吸，把肩膀沉下来。此刻不需要解决所有问题，只需要照顾好现在的自己。天会亮的，别急。",
        "焦虑是因为你想做得更好。但在变好之前，允许自己先停下来，喝杯热茶吧，你已经很棒了。",
        "就像山里的雾，总会散的。不用急着赶路，小屿陪你坐一会儿，我们只看脚下的这一步。",
        "闭上眼睛，想象把烦恼都装进气球里放飞。世界很大，容得下小小的焦虑，也容得下小小的你。",
        "抱抱你。如果未来太远看不清，那就先照顾好今天的晚饭。一步一步，总会到的。"
    ],
    '好累呀': [
        "辛苦啦，把重担先卸下来吧。今晚的星星是为你亮的，安心睡个好觉，梦里没有KPI。",
        "允许自己像没电的玩具一样倒下。休息不是偷懒，是修复魔法的开始。晚安，我的朋友。",
        "摸摸头。不用时刻都坚强，在小屿这里，你可以做回软绵绵的小朋友，发脾气也没关系。",
        "世界很大，但此刻只有这张床属于你。把自己裹进被子里，做一个暖烘烘的梦吧。",
        "今天的电量已经耗尽啦。明天太阳升起之前，请允许自己什么都不做，就这样发烂渣也没事。"
    ],
    '乱乱的': [
        "心乱的时候，就去洗个热水澡吧。水流会带走嘈杂，只留下干净的自己。重新开始，随时都不晚。",
        "不用急着找答案。有些事情就像泡茶，时间到了，味道自然就出来了。再等等看。",
        "把思绪像整理房间一样，一件件折叠好。今天只做一件开心的事就够了，其他的交给明天。",
        "看不清路的时候，就先停下来看风景。也许转角处，就有惊喜在等你。迷路也是一种探险。",
        "混乱是秩序重建的前奏。深呼吸，听听窗外的风声，世界其实很安静，你的心也是。"
    ],
    '想哭': [
        "想哭就哭出来吧，眼泪是心里的雨。雨停了，天会更蓝的。小屿帮你撑伞。",
        "抱紧你。悲伤不是你的错，是心里的小孩在求救。我会一直陪着你，直到雨过天晴。",
        "给你一个大大的拥抱。如果今天太苦了，就吃一颗糖，或者去见想见的人。你值得被爱。",
        "难过的时候，就躲进小屿的树洞里。这里没有风雨，只有暖暖的茶香和你。",
        "每一滴眼泪都值得被接住。你不孤单，远方还有很多温柔在赶来的路上，请再等一等。"
    ],
    '发发呆': [
        "真好呀，享受这份宁静。就像一片叶子飘落在水面上，随波逐流也是一种方向。",
        "发呆是给灵魂的氧气。看着云慢慢走，时间也变得温柔了起来。此刻，你只属于你自己。",
        "什么都不想，只听听心跳的声音。这一刻的空白，是生活最奢侈的留白。",
        "就像晒着太阳的懒猫，眯起眼睛。世界在忙碌，而你拥有此刻的安宁，这是最棒的超能力。",
        "保持这份松弛感。生活不需要时刻紧绷，发会儿呆，也是在为下一次出发充电。"
    ],
    '小确幸': [
        "哇，接住这份开心！就像口袋里的一颗糖，甜甜的，要记得这种感觉哦。",
        "真为你高兴！这些闪闪发光的瞬间，是平凡日子里最美的星星，照亮了前行的路。",
        "把这份快乐存起来吧。等到阴天的时候，拿出来晒一晒，心里就暖了。",
        "笑容是最好的治愈剂。愿这份好心情像涟漪一样，传给更多的人，也温暖你自己。",
        "这就是生活的小礼物呀。抓住它，告诉自己：我值得拥有这些美好，每一天都值得。"
    ]
};

// V3.2 Healing Medicine Wall Data
export const MOCK_ECHOES = [
    { id: '1', content: "便利店阿姨多给了一颗茶叶蛋，热乎乎的，握在手里很久没舍得吃。", nickname: "想晒太阳的蜗牛", hugs: 128 },
    { id: '2', content: "加班回家看到流浪猫在路灯下伸懒腰，突然觉得不用那么急着赶路。", nickname: "路灯下的影子", hugs: 45 },
    { id: '3', content: "暴雨天点了外卖，小哥全身湿透了还笑着说用餐愉快。给了他打赏，希望他今晚能喝碗热汤。", nickname: "等雨停", hugs: 232 },
    { id: '4', content: "在地铁上忍不住哭了，旁边的小女孩递给我一颗大白兔奶糖，没说话，就塞我手里。糖很甜。", nickname: "大白兔", hugs: 89 },
    { id: '5', content: "决定放下那段感情了。把合照都删了，心空了一块，但也好像轻了一些。风吹过来的时候，感觉到了自由。", nickname: "风之子", hugs: 341 },
    { id: '6', content: "为了改方案熬了三个通宵，看到日出的那一刻，金色的光洒在键盘上，突然觉得一切努力都有了形状。", nickname: "追光者", hugs: 56 },
    { id: '7', content: "周末一个人去看了海，海浪的声音很大，把心里的嘈杂都盖过去了。", nickname: "看海的人", hugs: 12 },
    { id: '8', content: "深夜煮了一碗面，加了荷包蛋。热气腾腾的时候，觉得自己被生活原谅了。", nickname: "深夜食堂", hugs: 99 },
];

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