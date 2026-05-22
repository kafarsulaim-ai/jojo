const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 4173);
const ADMIN_KEY = process.env.ADMIN_KEY || "";
const ALLOW_LEGACY_ADMIN_KEY = process.env.ALLOW_LEGACY_ADMIN_KEY === "1";
const ADMIN_COOKIE = "jojo_admin_session";
const ADMIN_LOGOUT_COOKIE = "jojo_admin_logged_out";
const ADMIN_SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;
const ADMIN_BOOTSTRAP_NAME = process.env.ADMIN_BOOTSTRAP_NAME || "管理员";
const ADMIN_BOOTSTRAP_LOGIN = process.env.ADMIN_BOOTSTRAP_LOGIN || "admin@jojo.cn";
const ADMIN_BOOTSTRAP_PASSWORD = process.env.ADMIN_BOOTSTRAP_PASSWORD || crypto.randomBytes(12).toString("base64url");
const ADMIN_BOOTSTRAP_PASSWORD_SOURCE = process.env.ADMIN_BOOTSTRAP_PASSWORD ? "env" : "generated";
const APP_ROOT = __dirname;
const PUBLIC_DIR = path.join(APP_ROOT, "public");
const DATA_DIR = path.join(APP_ROOT, "data");
const RESULTS_FILE = path.join(DATA_DIR, "results.jsonl");
const TEAMS_FILE = path.join(DATA_DIR, "teams.json");
const PASSKEY_FILE = path.join(DATA_DIR, "passkeys.json");
const WECHAT_ACCOUNTS_FILE = path.join(DATA_DIR, "wechat_accounts.json");
const ADMIN_TEACHER_ACTIVITY_FILE = path.join(DATA_DIR, "admin_teacher_activity.json");
const EVENTS_FILE = path.join(DATA_DIR, "events.jsonl");
const ADMIN_ACCOUNTS_FILE = path.join(DATA_DIR, "admin_accounts.json");
const ADMIN_INVITES_FILE = path.join(DATA_DIR, "admin_invites.json");
const ADMIN_SESSIONS_FILE = path.join(DATA_DIR, "admin_sessions.json");
const SITE_SETTINGS_FILE = path.join(DATA_DIR, "site_settings.json");
const CONTENT_DIR = path.join(APP_ROOT, "content");
const LOCAL_QUESTION_MD = path.join(CONTENT_DIR, "main_questions.md");
const LEGACY_QUESTION_MD = path.resolve(APP_ROOT, "../../docs/enneagram_kb/28_九型人格地图270题母题库_v2.md");
const QUESTION_MD = process.env.QUESTION_BANK_MD || (fs.existsSync(LOCAL_QUESTION_MD) ? LOCAL_QUESTION_MD : LEGACY_QUESTION_MD);
const SUBTYPE_FILE = path.join(CONTENT_DIR, "subtype_questions.json");
const RP_NAME = "jojo测九型";
const PASSKEY_CHALLENGES = new Map();
const WECHAT_STATES = new Map();
const ADMIN_WECHAT_BIND_STATES = new Map();
const USER_COOKIE = "jojo_user_session";
const USER_SESSION_TTL_MS = 365 * 24 * 60 * 60 * 1000;
const WECHAT_APPID = process.env.WECHAT_APPID || "";
const WECHAT_SECRET = process.env.WECHAT_SECRET || "";
const WECHAT_AUTH_TYPE = (process.env.WECHAT_AUTH_TYPE || "official").toLowerCase() === "website" ? "website" : "official";
const WECHAT_AUTH_MODE = (process.env.WECHAT_AUTH_MODE || "").toLowerCase();
const WECHAT_AUTH_BASE_URL = (process.env.WECHAT_AUTH_BASE_URL || "").replace(/\/+$/, "");
const WECHAT_CLOUDRUN_LOGIN_URL = (process.env.WECHAT_CLOUDRUN_LOGIN_URL || "").replace(/\/+$/, "");
const WECHAT_CLOUDRUN_CALLBACK_URL = (process.env.WECHAT_CLOUDRUN_CALLBACK_URL || "").replace(/\/+$/, "");
const WECHAT_CLOUDRUN_APPID = process.env.WECHAT_CLOUDRUN_APPID || process.env.WECHAT_APPID || "";
const WECHAT_CLOUDRUN_ENVID = process.env.WECHAT_CLOUDRUN_ENVID || "";
const WECHAT_CLOUDRUN_SERVICE = process.env.WECHAT_CLOUDRUN_SERVICE || "express-ul3g";
const WECHAT_RELAY_SECRET = process.env.WECHAT_RELAY_SECRET || "";
const WECHAT_RELAY_TTL_MS = Number(process.env.WECHAT_RELAY_TTL_MS || 5 * 60 * 1000);
const WECHAT_COOKIE_DOMAIN = process.env.WECHAT_COOKIE_DOMAIN || "";
const WECHAT_ALLOWED_REDIRECT_HOSTS = (process.env.WECHAT_ALLOWED_REDIRECT_HOSTS || "")
  .split(",")
  .map((item) => item.trim().toLowerCase())
  .filter(Boolean);
const DEFAULT_SITE_SETTINGS = {
  group_chat_qr_image_url: "",
  group_chat_qr_caption: "扫码加入群聊",
  updated_at: ""
};
const MAX_IMAGE_SOURCE_LENGTH = 1_900_000;

const SHARE_NAMES = {
  1: { name: "人间校准仪", line: "不是我想管，是我真的看不得事情歪在那里。" },
  2: { name: "爱意外卖员", line: "我嘴上说顺手，其实也想有人记得我喜欢什么。" },
  3: { name: "人生项目经理", line: "我不是卷，我只是停下来就会怀疑自己有没有价值。" },
  4: { name: "情绪收藏家", line: "别人只是经历了一件事，我已经在心里给它配完BGM。" },
  5: { name: "信息囤积者", line: "我不是冷淡，我只是还没整理好怎么参与这个世界。" },
  6: { name: "安全预案师", line: "你们看到的是我想太多，我看到的是Plan B还不够多。" },
  7: { name: "快乐逃生员", line: "只要还有下一个计划，我就还能假装没事。" },
  8: { name: "人间防护罩", line: "我看起来不好惹，只是因为我不想重要的人再受伤。" },
  9: { name: "氛围修复师", line: "我不是没想法，我只是太会先让大家舒服。" }
};

const ELEMENT_SUMMARY = {
  1: "你对标准、原则和瑕疵很敏感，容易想把事情校准到更可靠的状态。",
  2: "你很容易看见具体的人和关系里的需要，也会在被需要时感到连接。",
  3: "你擅长把投入变成成果，也容易用反馈和表现确认自己的价值。",
  4: "你在意真实、独特和内在意义，希望重要的人看见你更深的部分。",
  5: "你需要理解结构、确认边界和管理能量，再决定如何投入世界。",
  6: "你会自然扫描风险、验证可信依据，也很重视稳定可靠的支持。",
  7: "你容易看见新的可能性，并用计划、变化和期待感带自己往前走。",
  8: "你重视主动权、边界和保护，会在关键时刻承担压力、划清界限。",
  9: "你对关系里的平和感很敏感，习惯先降低紧张，再慢慢确认立场。"
};

const TRIADS = {
  heart: { name: "心区", elements: [2, 3, 4], line: "关系、价值感和被看见的方式。" },
  head: { name: "脑区", elements: [5, 6, 7], line: "信息、安全感和未来可能性的处理方式。" },
  gut: { name: "腹区", elements: [8, 9, 1], line: "边界、行动力和本能判断的启动方式。" }
};

const WORK_STYLE = {
  1: "适合承担标准、流程、质量和纠偏任务，但要留意别把所有不完美都扛到自己身上。",
  2: "适合关系维护、客户照顾和支持协作，但要留意需求表达和边界清晰度。",
  3: "适合目标推进、资源整合和结果交付，但要留意不要只用表现衡量自己。",
  4: "适合内容、审美、洞察和差异化表达，但要留意情绪波动对稳定输出的影响。",
  5: "适合研究、系统分析和复杂问题拆解，但要留意过度退回信息准备区。",
  6: "适合风控、预案、验证和团队稳定，但要留意反复确认造成的消耗。",
  7: "适合创新、机会探索和调动气氛，但要留意计划过多导致收束不足。",
  8: "适合决断、谈判、保护边界和扛压力，但要留意表达强度对他人的压迫感。",
  9: "适合整合分歧、稳定协作和缓和冲突，但要留意真实立场被延后太久。"
};

const RELATION_STYLE = {
  1: "关系中你可能重视可靠、坦诚和共同标准。亲近的人如果长期随意或失约，你会更容易紧绷。",
  2: "关系中你可能很会照顾细节，也容易从对方是否回应、是否需要你来感受连接。",
  3: "关系中你可能倾向用行动、成果和承担来表达在意，也会在不被认可时感到落差。",
  4: "关系中你可能很在意真实感和被准确理解。表面的热闹不一定能替代深层的看见。",
  5: "关系中你可能需要清晰边界和足够空间。靠近之前，先确认自己是否有能量参与。",
  6: "关系中你可能重视可靠、承诺和可验证的安全感。信任建立后，你会很愿意一起扛事。",
  7: "关系中你可能带来轻松、可能性和新鲜感，但遇到沉重议题时会本能寻找出口。",
  8: "关系中你可能用保护、直接和承担表达在意。表达强度高时，对方可能先感到压力。",
  9: "关系中你可能很会照顾气氛与和谐，但真实偏好如果一直延后，会慢慢变成疲惫。"
};

const PRESSURE_STYLE = {
  1: "压力下容易进入纠错和自责模式，越想负责，越可能把松弛看成危险。",
  2: "压力下容易更用力照顾别人，或用付出来确认自己是否重要。",
  3: "压力下容易把自己推进更高效率，也更容易用结果证明价值。",
  4: "压力下容易反复确认自己是否被理解，情绪和缺失感会被放大。",
  5: "压力下容易退回信息准备区，先减少打扰，再决定是否参与。",
  6: "压力下容易反复验证、预演风险，或在信任与怀疑之间来回摆动。",
  7: "压力下容易切换计划、寻找新鲜出口，避免停在沉重或无聊里。",
  8: "压力下容易提高控制感和表达强度，先守住边界，再处理感受。",
  9: "压力下容易先缓和局面、推迟立场，久了会出现钝感或低能量。"
};

const TEACHER_PROMPTS = {
  1: "追问：最近一次强烈想纠正别人或自己的场景里，真正担心失控的是什么？",
  2: "追问：当对方不需要你或没有回应时，内在最先出现的是委屈、愤怒还是空落？",
  3: "追问：如果结果不被看见，仍愿意投入的部分是什么？不能停下来的部分又是什么？",
  4: "追问：被误解时更想证明独特，还是更想有人准确看见你的真实感受？",
  5: "追问：什么时候会觉得别人靠太近、信息太多或能量被拿走？",
  6: "追问：你通常信任一个人或方案，需要经过哪些验证？验证不完会怎样？",
  7: "追问：当必须停在一个无聊或沉重的局面里时，你最想逃离的感受是什么？",
  8: "追问：你在什么时候会立刻进入防御或控制？那个强硬背后保护的是什么？",
  9: "追问：你最常把自己的想法推迟到什么时候？推迟之后关系真的更舒服了吗？"
};

const USER_ANALYSIS = {
  1: {
    strength: "你比较容易发现问题、校准标准，也愿意把事情推向更可靠的状态。",
    watch: "当压力上来时，可能会对自己或别人过度挑剔，容易把松弛理解成不负责。",
    next: "可以练习区分“需要立刻纠正的事”和“允许慢慢变好的事”。"
  },
  2: {
    strength: "你容易看见别人的需要，也能用具体行动让关系变暖。",
    watch: "如果长期只照顾别人，可能会把自己的需求放到很后面，甚至用被需要确认价值。",
    next: "可以练习直接说出需要，而不是只等别人从付出里读懂你。"
  },
  3: {
    strength: "你擅长把目标推进成结果，也能快速抓住外界期待和评价标准。",
    watch: "如果太依赖表现，休息、失败或不被看见时容易怀疑自己。",
    next: "可以练习把“我做成了什么”和“我本身是谁”分开看。"
  },
  4: {
    strength: "你对真实感、独特性和情绪细节很敏锐，容易捕捉别人忽略的内在层次。",
    watch: "情绪强的时候，可能会反复确认自己是否被理解，也容易放大缺失感。",
    next: "可以练习把感受表达出来，同时给现实行动留一个小入口。"
  },
  5: {
    strength: "你擅长观察、分析和建立理解框架，面对复杂信息时比较能沉得住气。",
    watch: "能量紧张时，可能会退回准备区，不太愿意被打扰或立刻参与。",
    next: "可以练习在还没完全准备好时，也先做一个小范围表达。"
  },
  6: {
    strength: "你善于发现风险、验证依据，也能为团队提供稳定和预案。",
    watch: "不确定感太高时，可能会反复确认，或者在信任与怀疑之间来回摆动。",
    next: "可以练习给验证设置边界：哪些信息足够支持下一步行动。"
  },
  7: {
    strength: "你容易看见可能性，能带来选择、活力和新的路径。",
    watch: "遇到沉重或无聊的局面时，可能会急着切换计划，导致深入和收尾不足。",
    next: "可以练习选一个最重要的计划，把它推进到真正落地。"
  },
  8: {
    strength: "你重视边界、主动权和保护重要的人，关键时刻能扛事。",
    watch: "表达强度高时，别人可能先感到压力，而不一定看见你背后的保护意图。",
    next: "可以练习在保持立场的同时，把真实担心说得更清楚。"
  },
  9: {
    strength: "你擅长缓和冲突、看见多方立场，也能让关系和气氛稳定下来。",
    watch: "为了维持平和，可能会延后表达自己，久了以后反而变成疲惫或钝感。",
    next: "可以练习更早说出一个小小的偏好，不必等到完全确定。"
  }
};

const MAIN_SELECTION = {
  main90: { perElement: 10, quotas: { direct: 5, reverse: 3, scenario: 2 }, minDefense: 1 },
  main180: { perElement: 20, quotas: { direct: 10, reverse: 6, scenario: 4 }, minDefense: 2 },
  main270: { perElement: 20, quotas: { direct: 10, reverse: 6, scenario: 4 }, minDefense: 2 }
};

const DEFENSE_DIMENSION = "防御机制";
const STATE_DIMENSIONS = new Set();
const ANSWER_SCALE = [
  { value: 1, label: "否" },
  { value: 3, label: "不确定" },
  { value: 5, label: "是" }
];
const MAIN_MODES = new Set(["main90", "main180", "main270"]);
const SUBTYPE_MODES = new Set(["subtype_adult", "subtype_child", "team_subtype"]);
const TEAM_MAIN_REUSE_WINDOW_MS = 10 * 24 * 60 * 60 * 1000;
const MODE_LABELS = {
  main90: "个人主型测试90题",
  main180: "个人主型测试180题（270题母库抽取）",
  main270: "个人主型测试180题（270题母库抽取）",
  subtype_adult: "个人副型测试",
  subtype_child: "少儿副型测试",
  team_subtype: "团队副型测试60题（匿名）"
};

const SUBTYPE_LABELS = {
  social: { name: "社群型", full: "社群型", line: "注意力更容易放在群体位置、社群归属、关系网络、贡献和被认可上。" },
  one_to_one: { name: "一对一型", full: "一对一 / 亲密型", line: "注意力更容易被强连接、吸引力、深度对象和强烈体验牵动。" },
  self_preservation: { name: "自保型", full: "自保型", line: "注意力更容易回到身体、资源、边界、计划和稳定基本盘上。" }
};

const ENCOURAGEMENT_LIBRARY = {
  main90: [
    { at: 10, title: "jojo收到第一小袋真实", body: "别卷答案，像你就行。" },
    { at: 20, title: "不是考试，是给自己开地图", body: "不用答得漂亮，真实才有用。" },
    { at: 30, title: "你已经有点会玩了", body: "犹豫也算线索，jojo不扣分。" },
    { at: 40, title: "人设管理先下班", body: "这一刻按最近真实的自己来。" },
    { at: 50, title: "中场补一口能量", body: "松一下肩膀，继续往前一点点。" },
    { at: 60, title: "大脑小剧场已记录", body: "不用解释，先选完再说。" },
    { at: 70, title: "迷茫中前行，也算前行", body: "嘿，已经很稳了。" },
    { at: 80, title: "最后一小段", body: "别突然变认真，第一反应收尾。" }
  ],
  main180: [
    { at: 10, title: "先拿下一小袋", body: "专业深测不用赶，先把第一反应放上来。" },
    { at: 20, title: "热身完成", body: "这不是要你完美一致，而是看稳定和波动。" },
    { at: 30, title: "开始进入状态", body: "拿不准的时候，选更接近日常的那个。" },
    { at: 40, title: "慢慢来，很稳", body: "深测的价值在细节，不在速度。" },
    { at: 50, title: "补给一下", body: "松松肩膀，答案不用写成人设简历。" },
    { at: 60, title: "这一段已收好", body: "jojo在记生活证据，你继续按真实生活选。" },
    { at: 70, title: "进入细节区", body: "有些题相似，是为了看不同场景里的你。" },
    { at: 80, title: "马上过半", body: "不用证明自己稳定，人本来会有不同面。" },
    { at: 90, title: "90题节点", body: "如果是90题，到这里就能出图；深测继续把边界补细。" },
    { at: 100, title: "已经过百", body: "你不是在被审问，是在给地图加清晰度。" },
    { at: 110, title: "继续补细节", body: "不用强行喜欢每个答案，诚实比好看重要。" },
    { at: 120, title: "已经很能打了", body: "后面是在校准细节，不用追求完美。" },
    { at: 130, title: "深水区也很稳", body: "如果开始累，可以慢一点，系统已自动保存。" },
    { at: 140, title: "细节正在合拢", body: "同一个你，在不同场景里可能有不同反应。" },
    { at: 150, title: "走完一大半", body: "继续保持第一反应，别把自己答成说明书。" },
    { at: 160, title: "最后两组", body: "把剩下的题当作收尾，不用突然变认真。" },
    { at: 170, title: "马上生成地图", body: "最后一小段，真实一点就很够了。" }
  ],
  subtype_adult: [
    { at: 10, title: "注意力入口已收一段", body: "副型看的是注意力最常先去哪里。" },
    { at: 20, title: "三种入口正在排序", body: "别急着选形象，选最近半年更常见的反应。" }
  ],
  subtype_child: [
    { at: 10, title: "先看孩子的需要", body: "这不是给孩子贴标签，是帮大人多一个理解入口。" },
    { at: 20, title: "再靠近一点", body: "想一想最近三个月，而不是某一次特别事件。" }
  ],
  team_subtype: [
    { at: 10, title: "匿名样本已进入", body: "团队副型只看群体，不追溯个人。" },
    { at: 20, title: "入口开始成形", body: "按真实工作状态选就好。" },
    { at: 30, title: "走完一半", body: "你提供的是团队画像的一块拼图。" },
    { at: 40, title: "继续保持真实", body: "不用替团队答，答你自己最近稳定的状态。" },
    { at: 50, title: "最后一组", body: "收尾就好，匿名汇总会保护个人明细。" }
  ]
};

function ensureDataFiles() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(RESULTS_FILE)) fs.writeFileSync(RESULTS_FILE, "", "utf8");
  if (!fs.existsSync(TEAMS_FILE)) fs.writeFileSync(TEAMS_FILE, "[]", "utf8");
  if (!fs.existsSync(PASSKEY_FILE)) fs.writeFileSync(PASSKEY_FILE, "[]", "utf8");
  if (!fs.existsSync(WECHAT_ACCOUNTS_FILE)) fs.writeFileSync(WECHAT_ACCOUNTS_FILE, "[]", "utf8");
  if (!fs.existsSync(ADMIN_TEACHER_ACTIVITY_FILE)) fs.writeFileSync(ADMIN_TEACHER_ACTIVITY_FILE, "[]", "utf8");
  if (!fs.existsSync(SITE_SETTINGS_FILE)) fs.writeFileSync(SITE_SETTINGS_FILE, JSON.stringify(DEFAULT_SITE_SETTINGS, null, 2), "utf8");
  if (!fs.existsSync(EVENTS_FILE)) fs.writeFileSync(EVENTS_FILE, "", "utf8");
  if (!fs.existsSync(ADMIN_ACCOUNTS_FILE)) fs.writeFileSync(ADMIN_ACCOUNTS_FILE, "[]", "utf8");
  if (!fs.existsSync(ADMIN_INVITES_FILE)) fs.writeFileSync(ADMIN_INVITES_FILE, "[]", "utf8");
  if (!fs.existsSync(ADMIN_SESSIONS_FILE)) fs.writeFileSync(ADMIN_SESSIONS_FILE, "[]", "utf8");
}

function readSiteSettings() {
  ensureDataFiles();
  try {
    const parsed = JSON.parse(fs.readFileSync(SITE_SETTINGS_FILE, "utf8"));
    return { ...DEFAULT_SITE_SETTINGS, ...(parsed && typeof parsed === "object" ? parsed : {}) };
  } catch {
    return { ...DEFAULT_SITE_SETTINGS };
  }
}

function writeSiteSettings(settings) {
  ensureDataFiles();
  fs.writeFileSync(SITE_SETTINGS_FILE, JSON.stringify({
    ...DEFAULT_SITE_SETTINGS,
    ...settings,
    updated_at: settings?.updated_at || new Date().toISOString()
  }, null, 2), "utf8");
}

function publicSiteSettings(settings = readSiteSettings()) {
  return {
    group_chat_qr_image_url: settings.group_chat_qr_image_url || "",
    group_chat_qr_caption: settings.group_chat_qr_caption || DEFAULT_SITE_SETTINGS.group_chat_qr_caption,
    updated_at: settings.updated_at || ""
  };
}

function cleanImageSource(value) {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed.startsWith("data:image/")) {
    if (trimmed.length > MAX_IMAGE_SOURCE_LENGTH) {
      const err = new Error("图片过大，请压缩后再上传");
      err.status = 413;
      throw err;
    }
    return trimmed;
  }
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed.slice(0, 500);
  return "";
}

function updateSiteSettings(payload, actor = null) {
  const current = readSiteSettings();
  if (Object.prototype.hasOwnProperty.call(payload || {}, "group_chat_qr_image_url")) {
    current.group_chat_qr_image_url = cleanImageSource(payload.group_chat_qr_image_url);
  }
  if (Object.prototype.hasOwnProperty.call(payload || {}, "group_chat_qr_caption")) {
    current.group_chat_qr_caption = cleanText(payload.group_chat_qr_caption, 40) || DEFAULT_SITE_SETTINGS.group_chat_qr_caption;
  }
  current.updated_at = new Date().toISOString();
  current.updated_by = actor?.id || "";
  writeSiteSettings(current);
  return current;
}

function parseQuestions() {
  const text = fs.readFileSync(QUESTION_MD, "utf8");
  const rows = [];
  const re = /^\| (E([1-9])-\d{2}) \| ([1-9]) \| (正向|反向|情境) \| ([^|]+) \| (.*?) \| (正向|反向|情境) \|$/gm;
  let match;
  while ((match = re.exec(text))) {
    rows.push({
      id: match[1],
      element: Number(match[3]),
      form: mapForm(match[4]),
      form_label: match[4],
      dimension: match[5].trim(),
      text: match[6].trim(),
      score_rule: mapForm(match[7])
    });
  }
  if (rows.length !== 270) throw new Error(`Expected 270 questions, got ${rows.length}`);
  return rows;
}

function mapForm(label) {
  if (label === "正向") return "direct";
  if (label === "反向") return "reverse";
  if (label === "情境") return "scenario";
  return label;
}

function shuffle(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function softenOrder(questions) {
  const pool = [...questions];
  const ordered = [];
  let safety = 0;
  while (pool.length && safety < 10000) {
    safety += 1;
    const lastTwo = ordered.slice(-2).map((q) => q.element);
    const reverseRun = ordered.slice(-3).every((q) => q && q.form === "reverse");
    let idx = pool.findIndex((q) => {
      const sameElementRun = lastTwo.length === 2 && lastTwo[0] === q.element && lastTwo[1] === q.element;
      const reverseWouldRun = reverseRun && q.form === "reverse";
      return !sameElementRun && !reverseWouldRun;
    });
    if (idx < 0) idx = 0;
    ordered.push(pool.splice(idx, 1)[0]);
  }
  return ordered;
}

function normalizeMode(mode) {
  if (MAIN_MODES.has(mode) || SUBTYPE_MODES.has(mode)) return mode;
  return "main90";
}

function makeEncouragements(total, mode = "main90") {
  const library = ENCOURAGEMENT_LIBRARY[mode] || (total > 90 ? ENCOURAGEMENT_LIBRARY.main180 : ENCOURAGEMENT_LIBRARY.main90);
  const fixed = new Map(library.map((item) => [item.at, item]));
  const fallback = [
    "这一组是在补细节，不是审判，继续往前就好。",
    "答案不用装得很稳定，人的层次本来就丰富。",
    "如果你开始有点累，先松一下肩膀，再按第一反应选。",
    "jojo在旁边记着呢，你只负责真实一点。",
    "这一段是在把模糊的地方慢慢说清楚。"
  ];
  const cards = [];
  for (let at = 10; at < total; at += 10) {
    const item = fixed.get(at) || {
      at,
      title: `第 ${at / 10} 组完成`,
      body: fallback[(at / 10 - 1) % fallback.length]
    };
    cards.push({ at, title: item.title, body: item.body });
  }
  return cards;
}

function selectMainQuestions(mode) {
  const config = MAIN_SELECTION[mode] || MAIN_SELECTION.main90;
  const selected = [];
  for (let element = 1; element <= 9; element += 1) {
    const pool = QUESTION_BANK.filter((q) => q.element === element);
    const chosen = [];
    for (const [form, count] of Object.entries(config.quotas)) {
      chosen.push(...shuffle(pool.filter((q) => q.form === form)).slice(0, count));
    }
    ensureDefenseCoverage(chosen, pool, config.minDefense);
    selected.push(...chosen.slice(0, config.perElement));
  }
  return selected;
}

function ensureDefenseCoverage(chosen, pool, minDefense) {
  let defenseCount = chosen.filter((q) => q.dimension === DEFENSE_DIMENSION).length;
  if (defenseCount >= minDefense) return;
  const chosenIds = new Set(chosen.map((q) => q.id));
  const candidates = shuffle(pool.filter((q) => q.dimension === DEFENSE_DIMENSION && !chosenIds.has(q.id)));
  for (const candidate of candidates) {
    if (defenseCount >= minDefense) break;
    const replaceIndex = chosen.findIndex((q) => q.form === candidate.form && q.dimension !== DEFENSE_DIMENSION);
    const fallbackIndex = chosen.findIndex((q) => q.dimension !== DEFENSE_DIMENSION);
    const idx = replaceIndex >= 0 ? replaceIndex : fallbackIndex;
    if (idx < 0) break;
    chosen[idx] = candidate;
    defenseCount += 1;
  }
}

function makeSession(options = {}) {
  const team = options.team_code ? publicTeamByCode(options.team_code) : null;
  let mode = normalizeMode(options.mode);
  if (team?.test_kind === "subtype") mode = "team_subtype";
  if (!team && mode === "team_subtype") mode = "subtype_adult";
  if (team && team.test_kind !== "subtype") mode = "main90";
  if (team && team.test_kind !== "subtype" && !MAIN_MODES.has(mode)) mode = "main90";
  if (SUBTYPE_MODES.has(mode)) return makeSubtypeSession(mode, { team });

  const selected = selectMainQuestions(mode);
  const ordered = softenOrder(shuffle(selected));
  return {
    session_id: `S${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    mode,
    mode_label: MODE_LABELS[mode],
    answer_scale: ANSWER_SCALE,
    question_count: ordered.length,
    encouragements: makeEncouragements(ordered.length, mode),
    team,
    questions: ordered.map((q, index) => ({
      order: index + 1,
      id: q.id,
      text: q.text
    }))
  };
}

function makeSubtypeSession(mode, options = {}) {
  const bank = SUBTYPE_BANKS[mode];
  if (!bank) throw new Error(`Unknown subtype mode: ${mode}`);
  const selected = selectSubtypeQuestions(mode, bank.questions);
  const ordered = shuffle(selected);
  return {
    session_id: `S${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    mode,
    mode_label: MODE_LABELS[mode],
    answer_scale: ANSWER_SCALE,
    subtype_title: bank.title,
    subtype_description: bank.description,
    columns: bank.columns,
    question_count: ordered.length,
    encouragements: makeEncouragements(ordered.length, mode),
    team: options.team || null,
    questions: ordered.map((q, index) => ({
      order: index + 1,
      id: q.id,
      text: q.text
    }))
  };
}

function selectSubtypeQuestions(mode, questions) {
  if (mode !== "subtype_child" || questions.length <= 30) return questions;
  const columns = Object.keys(SUBTYPE_LABELS);
  return columns.flatMap((column) => shuffle(questions.filter((q) => q.column === column)).slice(0, 10));
}

function scoreAnswer(question, raw) {
  if (question.score_rule === "reverse") return 6 - raw;
  return raw;
}

function bucket(scored) {
  if (scored >= 4) return "yes";
  if (scored === 3) return "uncertain";
  return "no";
}

function average(nums) {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

function stddev(nums) {
  if (!nums.length) return 0;
  const avg = average(nums);
  return Math.sqrt(average(nums.map((n) => (n - avg) ** 2)));
}

function percentile(value, max) {
  return max ? Math.round((value / max) * 1000) / 10 : 0;
}

function computeResult(payload, req = null) {
  const mode = normalizeMode(payload.mode);
  if (SUBTYPE_MODES.has(mode)) return computeSubtypeResult(payload, mode, req);

  const bank = new Map(QUESTION_BANK.map((q) => [q.id, q]));
  const answers = Array.isArray(payload.answers) ? payload.answers : [];
  const detailed = [];
  const rawValues = [];
  const byElement = {};
  const allElements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (const element of allElements) {
    byElement[element] = {
      element,
      type_values: [],
      state_values: [],
      defense_values: [],
      raw_values: [],
      direct_values: [],
      reverse_values: [],
      scenario_values: [],
      yes: 0,
      uncertain: 0,
      no: 0
    };
  }

  for (const ans of answers) {
    const q = bank.get(ans.question_id);
    const raw = Number(ans.answer);
    if (!q || !Number.isInteger(raw) || raw < 1 || raw > 5) continue;
    const scored = scoreAnswer(q, raw);
    const isState = STATE_DIMENSIONS.has(q.dimension);
    const target = byElement[q.element];
    rawValues.push(raw);
    target.raw_values.push(raw);
    if (isState) target.state_values.push(scored);
    else target.type_values.push(scored);
    if (q.dimension === DEFENSE_DIMENSION) target.defense_values.push(scored);
    if (q.form === "direct") target.direct_values.push(scored);
    if (q.form === "reverse") target.reverse_values.push(scored);
    if (q.form === "scenario") target.scenario_values.push(scored);
    target[bucket(scored)] += 1;
    detailed.push({
      question_id: q.id,
      element: q.element,
      form: q.form,
      dimension: q.dimension,
      raw_answer: raw,
      scored_value: scored
    });
  }
  validateMainSubmission(mode, detailed);

  const scores = {};
  for (const element of allElements) {
    const item = byElement[element];
    const typeAverage = average(item.type_values);
    const stateAverage = average(item.state_values);
    scores[element] = {
      element,
      type_score: Math.round(typeAverage * 100) / 100,
      type_percent: percentile(typeAverage, 5),
      state_score: Math.round(stateAverage * 100) / 100,
      defense_score: Math.round(average(item.defense_values) * 100) / 100,
      yes: item.yes,
      uncertain: item.uncertain,
      no: item.no,
      question_count: item.type_values.length + item.state_values.length,
      direct_average: Math.round(average(item.direct_values) * 100) / 100,
      reverse_average: Math.round(average(item.reverse_values) * 100) / 100,
      scenario_average: Math.round(average(item.scenario_values) * 100) / 100
    };
  }

  const ranked = Object.values(scores).sort((a, b) => b.type_score - a.type_score);
  const top = ranked.slice(0, 3);
  const low = [...ranked].reverse().slice(0, 2);
  const quality_flags = qualityFlags(rawValues, byElement, scores, top);
  const primary = top[0]?.element || 9;
  const code = makeVerificationCode();
  const share = SHARE_NAMES[primary] || SHARE_NAMES[9];
  const report = buildMainReport(top, low, scores, quality_flags);
  const account = accountForSubmission(payload);
  const wechat = req ? wechatForSubmission(req) : null;
  const result = {
    session_id: payload.session_id || `S${Date.now().toString(36).toUpperCase()}`,
    test_mode: mode,
    mode_label: MODE_LABELS[mode],
    verification_code: code,
    created_at: new Date().toISOString(),
    started_at: payload.started_at || null,
    finished_at: payload.finished_at || new Date().toISOString(),
    user: {
      nickname: cleanText(payload.user?.nickname, 50) || cleanText(wechat?.nickname || "", 50),
      contact: cleanText(payload.user?.contact, 80),
      source: cleanText(payload.user?.source, 40)
    },
    device_hash: hashDeviceToken(payload.device_token),
    account,
    wechat,
    scores,
    top_types: top,
    low_types: low,
    quality_flags,
    report,
    share: {
      primary_type: primary,
      title: share.name,
      line: share.line,
      summary: ELEMENT_SUMMARY[primary]
    },
    answers: detailed,
    question_ids: detailed.map((d) => d.question_id),
    team: teamForSubmission(payload, mode)
  };
  return result;
}

function computeSubtypeResult(payload, mode, req = null) {
  const bank = SUBTYPE_BANKS[mode];
  const questions = new Map(bank.questions.map((q) => [q.id, q]));
  const answers = Array.isArray(payload.answers) ? payload.answers : [];
  const byColumn = {};
  for (const column of Object.keys(bank.columns)) {
    byColumn[column] = { key: column, raw_values: [], raw_total: 0, percent: 0, count: 0 };
  }
  const detailed = [];
  const rawValues = [];

  for (const ans of answers) {
    const q = questions.get(ans.question_id);
    const raw = Number(ans.answer);
    if (!q || !Number.isInteger(raw) || raw < 1 || raw > 5) continue;
    const target = byColumn[q.column];
    rawValues.push(raw);
    target.raw_values.push(raw);
    target.raw_total += raw;
    target.count += 1;
    detailed.push({
      question_id: q.id,
      column: q.column,
      raw_answer: raw
    });
  }
  validateSubtypeSubmission(mode, detailed, bank);

  for (const item of Object.values(byColumn)) {
    const min = item.count || 0;
    const max = item.count * 5;
    item.percent = max > min ? Math.round(((item.raw_total - min) / (max - min)) * 1000) / 10 : 0;
    item.raw_average = Math.round(average(item.raw_values) * 100) / 100;
    item.label = SUBTYPE_LABELS[item.key]?.full || bank.columns[item.key];
  }

  const ranked = Object.values(byColumn).sort((a, b) => b.percent - a.percent);
  const primary = ranked[0] || byColumn.social;
  const secondary = ranked[1] || null;
  const gap = secondary ? primary.percent - secondary.percent : 100;
  const confidence = gap >= 25 ? "clear" : gap >= 12.5 ? "leaning" : "mixed";
  const label = SUBTYPE_LABELS[primary.key] || SUBTYPE_LABELS.social;
  const code = makeVerificationCode();
  const account = accountForSubmission(payload);
  const wechat = req ? wechatForSubmission(req) : null;
  return {
    session_id: payload.session_id || `S${Date.now().toString(36).toUpperCase()}`,
    test_mode: mode,
    mode_label: MODE_LABELS[mode],
    verification_code: code,
    created_at: new Date().toISOString(),
    started_at: payload.started_at || null,
    finished_at: payload.finished_at || new Date().toISOString(),
    user: {
      nickname: cleanText(payload.user?.nickname, 50) || cleanText(wechat?.nickname || "", 50),
      contact: cleanText(payload.user?.contact, 80),
      source: cleanText(payload.user?.source, 40)
    },
    device_hash: hashDeviceToken(payload.device_token),
    account,
    wechat,
    subtype_scores: byColumn,
    subtype_ranked: ranked,
    subtype_confidence: confidence,
    quality_flags: subtypeQualityFlags(rawValues, ranked),
    report: buildSubtypeReport(ranked, confidence, mode),
    share: {
      primary_type: primary.key,
      title: label.name,
      line: label.line,
      summary: subtypeSummary(primary, secondary, confidence)
    },
    answers: detailed,
    question_ids: detailed.map((d) => d.question_id),
    team: teamForSubmission(payload, mode)
  };
}

function validateMainSubmission(mode, detailed) {
  const required = mode === "main90" ? 90 : 180;
  validateSubmissionCompleteness(detailed, required, "main");
  const counts = new Map();
  for (const item of detailed) {
    counts.set(item.element, (counts.get(item.element) || 0) + 1);
  }
  for (let element = 1; element <= 9; element += 1) {
    if ((counts.get(element) || 0) < required / 9) {
      const err = new Error("answers_incomplete");
      err.status = 400;
      throw err;
    }
  }
}

function validateSubtypeSubmission(mode, detailed, bank) {
  const required = mode === "team_subtype" ? 60 : 30;
  validateSubmissionCompleteness(detailed, required, "subtype");
}

function validateSubmissionCompleteness(detailed, required, kind) {
  const unique = new Set(detailed.map((item) => item.question_id));
  if (detailed.length !== required || unique.size !== required) {
    const err = new Error(kind === "main" ? "主型题目未完成" : "副型题目未完成");
    err.status = 400;
    throw err;
  }
}

function cleanText(value, max) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function cleanDeviceToken(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 80);
}

function hashDeviceToken(value) {
  const cleaned = cleanDeviceToken(value);
  if (!cleaned) return "";
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

function cleanAccountToken(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[^A-Za-z0-9_-]/g, "").slice(0, 120);
}

function hashAccountToken(value) {
  const cleaned = cleanAccountToken(value);
  if (!cleaned) return "";
  return crypto.createHash("sha256").update(cleaned).digest("hex");
}

function randomB64(bytes = 32) {
  return toBase64Url(crypto.randomBytes(bytes));
}

function toBase64Url(buffer) {
  return Buffer.from(buffer).toString("base64url");
}

function fromBase64Url(value) {
  return Buffer.from(String(value || ""), "base64url");
}

function makeVerificationCode() {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let body = "";
  for (let i = 0; i < 6; i += 1) {
    body += alphabet[crypto.randomInt(alphabet.length)];
  }
  return `M${body}`;
}

function buildMainReport(top, low, scores, qualityFlags) {
  const primary = top[0]?.element || 9;
  const secondary = top[1]?.element || null;
  const third = top[2]?.element || null;
  const wing = deriveWing(primary, scores);
  const triads = Object.entries(TRIADS).map(([key, triad]) => {
    const strongest = triad.elements
      .map((element) => scores[element])
      .filter(Boolean)
      .sort((a, b) => b.type_score - a.type_score)[0];
    return {
      key,
      name: triad.name,
      line: triad.line,
      element: strongest?.element || triad.elements[0],
      percent: Math.round(strongest?.type_percent || 0)
    };
  });
  const teacherPrompts = [primary, secondary, third]
    .filter(Boolean)
    .map((element) => TEACHER_PROMPTS[element])
    .filter(Boolean);
  const lowText = low.map((item) => `${item.element}号`).join(" / ");
  const topText = top.map((item) => `${item.element}号`).join(" / ");
  const wingText = wing?.label || "侧翼待复核";
  const sceneText = `关系：${RELATION_STYLE[primary]} 职场：${WORK_STYLE[primary]} 压力：${PRESSURE_STYLE[primary]}`;
  return {
    version: "1.3",
    title: `${primary}号 · ${wingText} · ${topText}`,
    focus: `主型先看 ${primary}号，侧翼先看 ${wingText}。本次前三元素为 ${topText}，更适合按“主型 + 侧翼 + 证据 + 场景”来读。`,
    summary_cards: [
      { label: "主型", value: `${primary}号`, text: ELEMENT_SUMMARY[primary] },
      { label: "侧翼", value: wingText, text: wing?.text || "侧翼用于解释主型在日常中的偏好方向。" },
      { label: "稳定性", value: qualityFlags.length ? "需复核" : "可参考", text: qualityFlags.length ? "存在作答质量提示，建议老师再看访谈。" : "当前结果可先作为探索地图。" }
    ],
    sections: [
      { label: "主型画像", text: `${USER_ANALYSIS[primary]?.strength || ELEMENT_SUMMARY[primary]} 这次更像是 ${primary}号 的主调，不急着定死，先当作观察入口。` },
      { label: "侧翼特征", text: wing?.text || "侧翼用于描述主型在日常中更常被调用的辅助方向。" },
      { label: "前三证据", text: `${topText} 是本次最值得优先复核的三项，适合和真实场景一起看。` },
      { label: "关系与职场", text: sceneText },
      { label: "防御机制", text: `${PRESSURE_STYLE[primary]} 这也是为什么同一个主型，在压力下会更像另一面。` },
      { label: "下一步探索", text: `${USER_ANALYSIS[primary]?.next || "建议结合真实场景继续观察。"} 另外，把最近半年最稳定的三类场景记下来，会更好校准。` }
    ],
    user_analysis: [
      { label: "你最像什么", text: `${primary}号是当前主线，侧翼 ${wingText} 让它有了更具体的生活味道。` },
      { label: "你最有力的地方", text: USER_ANALYSIS[primary]?.strength || ELEMENT_SUMMARY[primary] },
      { label: "容易卡住", text: USER_ANALYSIS[primary]?.watch || "当状态紧张时，可能会更依赖熟悉的应对方式。" },
      { label: "场景提醒", text: sceneText }
    ],
    triads,
    work_style: WORK_STYLE[primary],
    low_focus: lowText ? `低位元素为 ${lowText}，更适合当作老师访谈中的补充线索，不直接等同于能力不足。` : "",
    teacher_prompts: teacherPrompts.slice(0, 3),
    caution: qualityFlags.length
      ? "本次存在作答质量提示，适合先看方向，再结合访谈和真实生活复核。"
      : "本次结果是探索地图，不是最终标签。"
  };
}

function deriveWing(primary, scores) {
  const left = primary === 1 ? 9 : primary - 1;
  const right = primary === 9 ? 1 : primary + 1;
  const leftScore = scores[left]?.type_score ?? -1;
  const rightScore = scores[right]?.type_score ?? -1;
  if (leftScore < 0 && rightScore < 0) return null;
  const best = rightScore > leftScore ? right : left;
  return {
    value: best,
    label: `${best}号侧翼`,
    text: `${primary}号通常会更靠近 ${best}号 这一侧。当前结果里，${best}号的存在感更高，适合作为主型的辅助解释。`
  };
}

function buildSubtypeReport(ranked, confidence, mode) {
  const top = ranked[0];
  const second = ranked[1];
  const topLabel = SUBTYPE_LABELS[top?.key] || SUBTYPE_LABELS.social;
  const secondLabel = SUBTYPE_LABELS[second?.key] || null;
  if (mode === "subtype_child") return buildChildSubtypeReport(topLabel, secondLabel, confidence);
  const isDual = confidence === "mixed" && secondLabel;
  return {
    version: "1.2",
    title: isDual ? `${topLabel.name} / ${secondLabel.name} 双倾向` : `${topLabel.name} 倾向`,
    focus: isDual
      ? `副型更像 ${topLabel.name} 与 ${secondLabel.name} 的并行排序，建议优先看第一副型和第二副型的组合作用。`
      : `当前更偏 ${topLabel.full}，可把它当作主型在生活里的优先入口。`,
    summary_cards: [
      { label: "第一副型", value: topLabel.name, text: topLabel.line },
      { label: "第二副型", value: secondLabel ? secondLabel.name : "待观察", text: secondLabel ? secondLabel.line : "第二副型需要结合主型和场景继续观察。" },
      { label: "判断方式", value: "排序", text: "副型不是单一标签，而是高到低的注意力排序。" }
    ],
    sections: [
      { label: "副型排序", text: isDual ? `当前前两项是 ${topLabel.name} / ${secondLabel.name}，这两个入口要一起看。` : `当前主入口是 ${topLabel.name}，可优先观察它在日常中的重复性。` },
      { label: "第一副型特征", text: topLabel.line },
      { label: "第二副型特征", text: secondLabel ? secondLabel.line : "第二副型暂时没有足够差距，先别急着定。" },
      { label: "综合作用", text: isDual ? `这两个入口会一起影响你在关系、资源和压力里的反应节奏。` : `这个入口会主要影响你如何处理关系、资源和压力。` },
      { label: "下一步观察", text: "回看最近半年里最稳定的选择：你更常先找人、先找深度连接，还是先稳住资源和节奏。" }
    ],
    user_analysis: [
      { label: "副型排序", text: isDual ? `${topLabel.name} / ${secondLabel.name}` : topLabel.name },
      { label: "第一副型", text: topLabel.line },
      { label: "第二副型", text: secondLabel ? secondLabel.line : "第二副型暂时不够清晰。" },
      { label: "使用方式", text: "把副型当成主型的生活接口，不要单独定论。" },
      { label: "下一步观察", text: "回看最近半年里最稳定的选择：你更常先找人、先找深度连接，还是先稳住资源和节奏。" }
    ],
    teacher_prompts: [
      "副型需要按排序看，不要只追一个单一标签。",
      "优先核对第一副型和第二副型在真实场景里的组合动作。",
      "如果两项接近，先保留双倾向，再看近期行为证据。"
    ],
    caution: "副型结果用于补充主型解读精度，不替代主型判断。"
  };
}

function buildChildSubtypeReport(topLabel, secondLabel, confidence) {
  const isDual = confidence === "mixed" && secondLabel;
  return {
    version: "1.2-child",
    title: isDual ? `${topLabel.name} / ${secondLabel.name} 双倾向观察` : `${topLabel.name}少儿倾向观察`,
    focus: isDual
      ? `孩子在 ${topLabel.name} 与 ${secondLabel.name} 两个入口上都较明显，建议结合年龄、学校环境和家庭互动继续观察。`
      : `本次更支持孩子偏向 ${topLabel.full} 入口。少儿结果更受发展阶段和环境影响，适合用于亲子沟通，不用于固定标签。`,
    summary_cards: [
      { label: "第一副型", value: topLabel.name, text: topLabel.line },
      { label: "家庭观察", value: isDual ? "双倾向" : "单倾向", text: "少儿副型优先用于亲子理解，不用于固定定义。" },
      { label: "使用建议", value: "沟通", text: "重点看最近三个月的家庭互动和学校环境变化。" }
    ],
    sections: [
      { label: "孩子的注意力入口", text: topLabel.line },
      { label: "家庭互动", text: "当孩子状态不稳时，先观察TA是在找归属感、重要连接，还是稳定节奏和身体安全感。" },
      { label: "亲子沟通", text: "比起纠正表现，更适合先翻译需求：TA此刻需要被看见、被靠近，还是需要边界和休息。" },
      { label: "教育提醒", text: "少儿结果只能作为阶段性观察，不建议把某个副型当作孩子长期不变的性格标签。" }
    ],
    user_analysis: [
      { label: "孩子的注意力入口", text: topLabel.line },
      { label: "家长可以怎么看", text: "先把结果当作理解孩子需求的线索：TA可能更在意归属、重要关系，或稳定节奏与边界。" },
      { label: "亲子沟通提醒", text: "当孩子出现退缩、黏人、争取关注或节奏变慢时，先观察背后的安全感、被理解感和自主空间需求。" }
    ],
    teacher_prompts: [
      "少儿副型不用于给孩子定型，必须结合年龄、家庭节奏和学校环境复核。",
      "请追问家长最近三个月的具体场景：同伴关系、学习压力、作息变化和亲子冲突。",
      "给家长的建议要落在沟通、边界、情绪承接和学习节奏上，不做能力或品格判断。"
    ],
    caution: "少儿副型结果仅用于亲子理解和教育沟通参考，不构成心理诊断或固定人格标签。"
  };
}

function qualityFlags(rawValues, byElement, scores, top) {
  const flags = [];
  if (!rawValues.length) return ["empty_answer_risk"];
  const counts = countValues(rawValues);
  const n = rawValues.length;
  const maxSame = Math.max(...Object.values(counts));
  if (maxSame / n >= 0.8) flags.push("straight_line_risk");
  if ((counts[3] || 0) / n > 0.45) flags.push("uncertainty_risk");
  if ((counts[3] || 0) / n >= 0.35 && (counts[3] || 0) / n <= 0.45) flags.push("moderate_uncertainty_risk");
  if ((counts[5] || 0) / n > 0.55) flags.push("over_agree_risk");
  if (((counts[4] || 0) + (counts[5] || 0)) / n >= 0.7 && (counts[5] || 0) / n <= 0.55) flags.push("soft_agree_risk");
  if ((counts[1] || 0) / n > 0.55) flags.push("over_deny_risk");
  if (stddev(rawValues) < 0.65) flags.push("low_variance_risk");
  for (const element of Object.keys(byElement)) {
    const item = byElement[element];
    if (item.direct_values.length && item.reverse_values.length) {
      const diff = Math.abs(average(item.direct_values) - average(item.reverse_values));
      if (diff > 1.5) {
        flags.push(`reverse_consistency_risk_${element}`);
      }
    }
    if (item.direct_values.length && item.scenario_values.length) {
      if (average(item.direct_values) - average(item.scenario_values) > 1.2) {
        flags.push(`scenario_mismatch_risk_${element}`);
      }
    }
  }
  const s = (e) => scores[e]?.type_score || 0;
  if ([1, 2, 3, 6].every((e) => s(e) >= 4.2) && [4, 7, 9].filter((e) => s(e) <= 2.8).length >= 2) {
    flags.push("virtue_bias_risk");
  }
  if ([1, 3, 6, 8].every((e) => s(e) >= 4.0)) flags.push("competence_persona_risk");
  if (s(2) >= 4.0 && s(9) >= 4.0 && (s(8) <= 2.8 || s(4) <= 2.8)) flags.push("prosocial_persona_risk");
  const reverseRaw = [];
  for (const item of Object.values(byElement)) {
    for (const raw of item.raw_values) reverseRaw.push(raw);
  }
  if (top.length >= 3 && top[0].type_score - top[2].type_score < 0.25) flags.push("close_top_three_risk");
  return [...new Set(flags)];
}

function countValues(values) {
  const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (const value of values) counts[value] = (counts[value] || 0) + 1;
  return counts;
}

function subtypeQualityFlags(rawValues, ranked) {
  const flags = [];
  if (!rawValues.length) return ["empty_answer_risk"];
  const counts = countValues(rawValues);
  if ((counts[3] || 0) / rawValues.length > 0.45) flags.push("uncertainty_risk");
  if (stddev(rawValues) < 0.65) flags.push("low_variance_risk");
  if (ranked.length >= 2 && ranked[0].percent - ranked[1].percent < 12.5) flags.push("close_subtype_risk");
  return flags;
}

function subtypeSummary(primary, secondary, confidence) {
  const label = SUBTYPE_LABELS[primary.key] || SUBTYPE_LABELS.social;
  if (confidence === "mixed" && secondary) {
    const second = SUBTYPE_LABELS[secondary.key] || {};
    return `你的副型结果更像双倾向：${label.full}与${second.full || secondary.label}接近，建议结合主型和真实场景复核。`;
  }
  if (confidence === "leaning") {
    return `你的副型更偏向${label.full}，但第二倾向也有存在感，适合把它当作优先观察方向。`;
  }
  return `你的副型倾向较集中，更偏向${label.full}。`;
}

function buildCombinedReport(main, subtype) {
  const primary = Number(main.share?.primary_type || main.top_types?.[0]?.element || 9);
  const topTypes = (main.top_types || []).map((item) => `${item.element}号`).join(" / ");
  const topSubtype = subtype.subtype_ranked?.[0] || null;
  const secondSubtype = subtype.subtype_ranked?.[1] || null;
  const subtypeLabel = SUBTYPE_LABELS[topSubtype?.key] || SUBTYPE_LABELS.social;
  const secondLabel = SUBTYPE_LABELS[secondSubtype?.key] || null;
  const mixedSubtype = subtype.subtype_confidence === "mixed" && secondLabel;
  const flags = [...(main.quality_flags || []), ...(subtype.quality_flags || [])];
  const subtypeText = mixedSubtype
    ? `${subtypeLabel.name} / ${secondLabel.name}双倾向`
    : `${subtypeLabel.name}倾向`;
  const wing = deriveWing(primary, main.scores || {});
  return {
    version: "1.3",
    title: `${primary}号主调 · ${subtypeText}`,
    focus: `主型看 ${primary}号 和 ${wing?.label || "侧翼待复核"}，副型看 ${subtypeText}。主型解释核心动机，副型解释这个动机最常进入生活的入口。`,
    main_code: main.verification_code,
    subtype_code: subtype.verification_code,
    summary_cards: [
      { label: "主型", value: `${primary}号`, text: main.share?.title || `${primary}号` },
      { label: "侧翼", value: wing?.label || "待复核", text: wing?.text || "先把它当作辅助方向。" },
      { label: "副型", value: subtypeText, text: subtype.share?.summary || subtypeLabel.line }
    ],
    sections: [
      { label: "主型概览", text: `${USER_ANALYSIS[primary]?.strength || ELEMENT_SUMMARY[primary]} 这部分负责解释你真正想守住什么。` },
      { label: "侧翼特征", text: wing?.text || "侧翼用于解释主型在日常中的偏好方向。" },
      { label: "副型排序", text: mixedSubtype ? `前两项是 ${subtypeLabel.name} / ${secondLabel.name}，建议一起看。` : `副型当前更偏 ${subtypeLabel.name}。` },
      { label: "关系与职场", text: `关系：${RELATION_STYLE[primary]} 职场：${WORK_STYLE[primary]}` },
      { label: "压力姿势", text: `${PRESSURE_STYLE[primary]} 副型会进一步影响你先稳哪一块。` },
      { label: "下一步探索", text: `${USER_ANALYSIS[primary]?.next || "建议结合真实场景继续观察。"}` }
    ],
    user_analysis: [
      { label: "主型", text: `${primary}号是主线。` },
      { label: "侧翼", text: wing?.text || "侧翼待复核。" },
      { label: "副型", text: mixedSubtype ? `${subtypeLabel.name} / ${secondLabel.name}` : subtypeLabel.name },
      { label: "使用方式", text: "这是一份合并观察，不是三份报告简单相加。" }
    ],
    teacher_prompts: [
      `先核对${primary}号是否真的是核心动机，而不是近期状态、角色要求或理想形象。`,
      mixedSubtype
        ? `再核对${subtypeLabel.name} / ${secondLabel.name} 是否是长期稳定入口，而不是短期状态。`
        : `再核对${subtypeLabel.name} 是否是长期稳定入口，而不是短期状态。`,
      "老师可以先按主型、侧翼、副型三层一起问，不要拆成互相打架的三套结论。"
    ],
    caution: flags.length
      ? "综合报告存在作答质量提示，不建议直接定型；更适合作为老师访谈和后续复核的提纲。"
      : "综合报告仍是一张地图，不是最终标签；建议结合真实事件、长期习惯和老师访谈校准。"
  };
}

function subtypeScene(key) {
  return {
    social: "团队归属、群体评价、组织位置和共同目标中",
    one_to_one: "亲密关系、重要对象、竞争吸引和强烈体验中",
    self_preservation: "身体状态、时间精力、金钱资源和安全边界中"
  }[key] || "真实生活场景中";
}

function teamForSubmission(payload, mode) {
  const code = cleanTeamCode(payload.team_code);
  if (!code) return null;
  const team = findTeamByCode(code);
  if (!team || !isTeamActive(team)) return null;
  const kind = normalizeTeamKind(team.test_kind);
  if (kind === "subtype") {
    if (!SUBTYPE_MODES.has(mode)) return null;
  } else if (!MAIN_MODES.has(mode)) {
    return null;
  }
  return {
    ...publicTeam(team),
    joined_at: new Date().toISOString()
  };
}

function authenticatedUserResults(req, reqUrl, options = {}) {
  const account = findAccountByToken(reqUrl.searchParams.get("account_token"));
  const wechat = findWechatAccountByRequest(req);
  const accountItems = account ? accountResults(account) : [];
  const wechatItems = wechat ? wechatAccountResults(wechat) : [];
  const deviceResults = options.includeDevice
    ? readOwnedDeviceResults(req, reqUrl, account, wechat)
    : [];
  return {
    account,
    wechat,
    deviceResults,
    results: uniqueHistoryItems([...accountItems, ...wechatItems, ...deviceResults])
  };
}

function readOwnedDeviceResults(req, reqUrl, account = null, wechat = null) {
  const hash = hashDeviceToken(reqUrl.searchParams.get("device"));
  if (!hash) return [];
  const candidates = readResults().filter((result) => result.device_hash === hash);
  return candidates.filter((result) =>
    (account && result.account?.id === account.id) ||
    (wechat && result.wechat?.id === wechat.id)
  );
}

function recentReusableMainResult(req, reqUrl, teamCode) {
  const team = findTeamByCode(teamCode);
  if (!team || normalizeTeamKind(team.test_kind) !== "main" || !isTeamActive(team)) return null;
  const auth = authenticatedUserResults(req, reqUrl);
  if (!auth.account && !auth.wechat) return null;
  const cutoff = Date.now() - TEAM_MAIN_REUSE_WINDOW_MS;
  return auth.results
    .filter((result) => {
      if (!MAIN_MODES.has(result.test_mode || "main90") || !result.scores) return false;
      if (result.team?.code === team.code) return false;
      const createdAt = Date.parse(result.created_at || 0);
      return createdAt && createdAt >= cutoff;
    })
    .sort((a, b) => Date.parse(b.created_at || 0) - Date.parse(a.created_at || 0))[0] || null;
}

function publicReusableMainResult(result, team) {
  if (!result || !team) return null;
  return {
    source_code: result.verification_code,
    created_at: result.created_at,
    test_mode: result.test_mode || "main90",
    mode_label: result.mode_label || MODE_LABELS[result.test_mode || "main90"],
    title: result.share?.title || "",
    primary_type: result.share?.primary_type || null,
    team: publicTeam(team)
  };
}

function cloneMainResultForTeam(source, team, req, reqUrl, payload = {}) {
  if (!source || !team || normalizeTeamKind(team.test_kind) !== "main" || !isTeamActive(team)) {
    const err = new Error("team_not_available");
    err.status = 400;
    throw err;
  }
  const auth = authenticatedUserResults(req, reqUrl);
  const allowed = auth.results.some((item) => item.verification_code === source.verification_code);
  if (!allowed) {
    const err = new Error("result_not_owned");
    err.status = 403;
    throw err;
  }
  const cutoff = Date.now() - TEAM_MAIN_REUSE_WINDOW_MS;
  if (!MAIN_MODES.has(source.test_mode || "main90") || !source.scores || Date.parse(source.created_at || 0) < cutoff) {
    const err = new Error("result_not_reusable");
    err.status = 400;
    throw err;
  }
  const existing = readResults().find((result) =>
    result.team?.code === team.code &&
    result.reused_from?.verification_code === source.verification_code
  );
  if (existing) return existing;
  const now = new Date().toISOString();
  const cloned = {
    ...source,
    session_id: `R${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    verification_code: makeVerificationCode(),
    created_at: now,
    finished_at: now,
    user: {
      ...source.user,
      nickname: cleanText(payload.user?.nickname, 50) || source.user?.nickname || "",
      contact: cleanText(payload.user?.contact, 80) || source.user?.contact || "",
      source: `team_reuse:${team.code}`
    },
    device_hash: hashDeviceToken(reqUrl.searchParams.get("device") || payload.device_token) || source.device_hash || "",
    account: auth.account ? accountForSubmission({ account_token: reqUrl.searchParams.get("account_token") || payload.account_token }) : source.account || null,
    wechat: auth.wechat ? publicWechatAccount(auth.wechat) : source.wechat || null,
    team: teamForSubmission({ team_code: team.code }, source.test_mode || "main90"),
    reused_from: {
      verification_code: source.verification_code,
      created_at: source.created_at,
      test_mode: source.test_mode || "main90"
    }
  };
  appendResult(cloned);
  return cloned;
}

function appendResult(result) {
  ensureDataFiles();
  fs.appendFileSync(RESULTS_FILE, `${JSON.stringify(result)}\n`, "utf8");
}

function readResults() {
  ensureDataFiles();
  return fs.readFileSync(RESULTS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try { return JSON.parse(line); } catch { return null; }
    })
    .filter(Boolean)
    .reverse();
}

function cleanEventName(value) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/[^a-zA-Z0-9_.:-]/g, "").slice(0, 60);
}

function sanitizeEventProperties(value, depth = 0) {
  if (depth > 2) return null;
  if (value == null) return null;
  if (typeof value === "string") return cleanText(value, 160);
  if (typeof value === "number") return Number.isFinite(value) ? value : null;
  if (typeof value === "boolean") return value;
  if (Array.isArray(value)) {
    return value.slice(0, 12).map((item) => sanitizeEventProperties(item, depth + 1));
  }
  if (typeof value === "object") {
    const out = {};
    for (const [key, item] of Object.entries(value).slice(0, 24)) {
      const cleanKey = cleanText(key, 40).replace(/[^\w.-]/g, "");
      if (!cleanKey) continue;
      out[cleanKey] = sanitizeEventProperties(item, depth + 1);
    }
    return out;
  }
  return null;
}

function appendEvent(payload) {
  ensureDataFiles();
  const event = cleanEventName(payload.event);
  if (!event) {
    const err = new Error("missing_event");
    err.status = 400;
    throw err;
  }
  const record = {
    event,
    created_at: new Date().toISOString(),
    client_ts: cleanText(payload.client_ts || "", 40),
    path: cleanText(payload.path || "", 160),
    mode: cleanText(payload.mode || "", 40),
    session_id: cleanText(payload.session_id || "", 80),
    analytics_session_hash: hashDeviceToken(payload.analytics_session),
    device_hash: hashDeviceToken(payload.device_token),
    team_code: cleanTeamCode(payload.team_code || ""),
    properties: sanitizeEventProperties(payload.properties || {})
  };
  fs.appendFileSync(EVENTS_FILE, `${JSON.stringify(record)}\n`, "utf8");
  return { ok: true };
}

function readEvents() {
  ensureDataFiles();
  return fs.readFileSync(EVENTS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => {
      try { return JSON.parse(line); } catch { return null; }
    })
    .filter(Boolean)
    .reverse();
}

function eventSummary() {
  const events = readEvents();
  const byEvent = {};
  const byMode = {};
  for (const item of events) {
    byEvent[item.event] = (byEvent[item.event] || 0) + 1;
    const mode = item.mode || "unknown";
    byMode[mode] = byMode[mode] || {};
    byMode[mode][item.event] = (byMode[mode][item.event] || 0) + 1;
  }
  return {
    total: events.length,
    by_event: byEvent,
    by_mode: byMode,
    recent: events.slice(0, 200)
  };
}

function readTeams() {
  ensureDataFiles();
  try {
    const parsed = JSON.parse(fs.readFileSync(TEAMS_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeTeams(teams) {
  ensureDataFiles();
  fs.writeFileSync(TEAMS_FILE, JSON.stringify(teams, null, 2), "utf8");
}

function readPasskeyAccounts() {
  ensureDataFiles();
  try {
    const parsed = JSON.parse(fs.readFileSync(PASSKEY_FILE, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writePasskeyAccounts(accounts) {
  ensureDataFiles();
  fs.writeFileSync(PASSKEY_FILE, JSON.stringify(accounts, null, 2), "utf8");
}

function readWechatAccounts() {
  ensureDataFiles();
  return readJsonArray(WECHAT_ACCOUNTS_FILE);
}

function writeWechatAccounts(accounts) {
  writeJsonArray(WECHAT_ACCOUNTS_FILE, accounts);
}

function readJsonArray(filePath) {
  try {
    const parsed = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeJsonArray(filePath, value) {
  ensureDataFiles();
  fs.writeFileSync(filePath, JSON.stringify(Array.isArray(value) ? value : [], null, 2), "utf8");
}

function readAdminAccounts() {
  ensureDataFiles();
  return readJsonArray(ADMIN_ACCOUNTS_FILE);
}

function writeAdminAccounts(accounts) {
  writeJsonArray(ADMIN_ACCOUNTS_FILE, accounts);
}

function readAdminInvites() {
  ensureDataFiles();
  return readJsonArray(ADMIN_INVITES_FILE);
}

function writeAdminInvites(invites) {
  writeJsonArray(ADMIN_INVITES_FILE, invites);
}

function readAdminSessions() {
  ensureDataFiles();
  return readJsonArray(ADMIN_SESSIONS_FILE);
}

function writeAdminSessions(sessions) {
  writeJsonArray(ADMIN_SESSIONS_FILE, sessions);
}

function readAdminTeacherActivity() {
  ensureDataFiles();
  return readJsonArray(ADMIN_TEACHER_ACTIVITY_FILE);
}

function writeAdminTeacherActivity(items) {
  writeJsonArray(ADMIN_TEACHER_ACTIVITY_FILE, items);
}

function appendAdminTeacherActivity(item) {
  const next = [...readAdminTeacherActivity(), item].slice(-5000);
  writeAdminTeacherActivity(next);
}

function normalizeLoginId(value) {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase().replace(/\s+/g, "");
}

function normalizeAdminRole(value) {
  return value === "super_admin" ? "super_admin" : "teacher";
}

function makeInviteCode() {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "INV-";
  for (let i = 0; i < 8; i += 1) code += alphabet[crypto.randomInt(alphabet.length)];
  return code;
}

function makeAdminId() {
  return `A${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
}

function hashAdminPassword(password, salt = crypto.randomBytes(16).toString("base64url")) {
  const clean = typeof password === "string" ? password : "";
  const hash = crypto.scryptSync(clean, salt, 64).toString("base64url");
  return { salt, hash };
}

function passwordRecord(password, salt) {
  return hashAdminPassword(password, salt);
}

function passwordMatches(password, record) {
  if (!record?.password_salt || !record?.password_hash) return false;
  try {
    const derived = crypto.scryptSync(String(password || ""), record.password_salt, 64);
    const expected = Buffer.from(record.password_hash, "base64url");
    return expected.length === derived.length && crypto.timingSafeEqual(expected, derived);
  } catch {
    return false;
  }
}

function hashAdminSession(token) {
  return crypto.createHash("sha256").update(String(token || "")).digest("hex");
}

function parseCookies(header = "") {
  return String(header)
    .split(";")
    .map((item) => item.trim())
    .filter(Boolean)
    .reduce((acc, item) => {
      const index = item.indexOf("=");
      if (index < 0) return acc;
      const key = item.slice(0, index).trim();
      const value = item.slice(index + 1).trim();
      if (key) acc[key] = decodeURIComponent(value);
      return acc;
    }, {});
}

function buildAdminCookie(token, req) {
  const secure = String(req.headers["x-forwarded-proto"] || "").includes("https");
  const parts = [
    `${ADMIN_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${Math.floor(ADMIN_SESSION_TTL_MS / 1000)}`
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function clearAdminCookie(req) {
  const secure = String(req.headers["x-forwarded-proto"] || "").includes("https");
  const parts = [
    `${ADMIN_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0"
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function buildAdminLogoutCookie(req) {
  const secure = String(req.headers["x-forwarded-proto"] || "").includes("https");
  const parts = [
    `${ADMIN_LOGOUT_COOKIE}=1`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${Math.floor(ADMIN_SESSION_TTL_MS / 1000)}`
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function clearAdminLogoutCookie(req) {
  const secure = String(req.headers["x-forwarded-proto"] || "").includes("https");
  const parts = [
    `${ADMIN_LOGOUT_COOKIE}=`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=0"
  ];
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function cleanAdminText(value, max = 80) {
  return cleanText(value, max).replace(/\s+/g, " ");
}

function createAdminAccountRecord({
  login_id,
  name,
  password,
  role = "teacher",
  created_by = "system",
  invite_code = "",
  status = "active",
  wechat_id = "",
  wechat_nickname = "",
  wechat_avatar_url = "",
  avatar_url = "",
  bio = ""
}) {
  const login = normalizeLoginId(login_id);
  const displayName = cleanAdminText(name, 60) || "老师";
  const secret = String(password || "");
  if (!login) {
    const err = new Error("登录账号不能为空");
    err.status = 400;
    throw err;
  }
  if (secret.length < 6) {
    const err = new Error("密码至少需要6位");
    err.status = 400;
    throw err;
  }
  const now = new Date().toISOString();
  const { salt, hash } = passwordRecord(secret);
  return {
    id: makeAdminId(),
    login_id: login,
    name: displayName,
    role: normalizeAdminRole(role),
    status,
    password_salt: salt,
    password_hash: hash,
    invite_code: invite_code || "",
    created_by,
    created_at: now,
    updated_at: now,
    last_login_at: null,
    note: "",
    wechat_id: cleanText(wechat_id, 120),
    wechat_nickname: cleanAdminText(wechat_nickname, 80),
    wechat_avatar_url: cleanImageSource(wechat_avatar_url),
    avatar_url: cleanImageSource(avatar_url),
    bio: cleanAdminText(bio, 160)
  };
}

function ensureAdminBootstrapAccount() {
  const accounts = readAdminAccounts();
  if (accounts.length) return;
  const account = createAdminAccountRecord({
    login_id: ADMIN_BOOTSTRAP_LOGIN,
    name: ADMIN_BOOTSTRAP_NAME,
    password: ADMIN_BOOTSTRAP_PASSWORD,
    role: "super_admin",
    created_by: "system",
    invite_code: "bootstrap",
    status: "active"
  });
  accounts.push(account);
  writeAdminAccounts(accounts);
  if (ADMIN_BOOTSTRAP_PASSWORD_SOURCE === "generated") {
    console.warn(`Initial admin created. Login: ${ADMIN_BOOTSTRAP_LOGIN} Password: ${ADMIN_BOOTSTRAP_PASSWORD}`);
  }
}

function publicAdminAccount(account) {
  if (!account) return null;
  return {
    id: account.id,
    login_id: account.login_id,
    name: account.name,
    role: account.role,
    status: account.status,
    note: account.note || "",
    avatar_url: account.avatar_url || account.wechat_avatar_url || "",
    bio: account.bio || "",
    wechat_bound: Boolean(account.wechat_id),
    wechat_nickname: account.wechat_nickname || "",
    created_at: account.created_at,
    updated_at: account.updated_at,
    last_login_at: account.last_login_at,
    invite_code: account.invite_code || "",
    created_by: account.created_by || ""
  };
}

function publicAdminInvite(invite) {
  if (!invite) return null;
  return {
    code: invite.code,
    role: invite.role,
    note: invite.note || "",
    status: invite.status,
    created_at: invite.created_at,
    expires_at: invite.expires_at,
    max_uses: invite.max_uses,
    use_count: invite.use_count || 0,
    created_by: invite.created_by || "",
    used_by: invite.used_by || "",
    used_at: invite.used_at || "",
    join_url: `/admin.html?invite=${encodeURIComponent(invite.code)}`
  };
}

function adminInviteExpired(invite) {
  return Boolean(invite?.expires_at && Date.now() > Date.parse(invite.expires_at));
}

function findAdminAccountById(id) {
  return readAdminAccounts().find((account) => account.id === id) || null;
}

function findAdminAccountByLogin(loginId) {
  const login = normalizeLoginId(loginId);
  if (!login) return null;
  return readAdminAccounts().find((account) => normalizeLoginId(account.login_id) === login) || null;
}

function findAdminAccountByWechatId(wechatId) {
  const id = cleanText(wechatId || "", 120);
  if (!id) return null;
  return readAdminAccounts().find((account) => cleanText(account.wechat_id || "", 120) === id) || null;
}

function getAdminSessionToken(req) {
  const cookies = parseCookies(req.headers.cookie || "");
  return cookies[ADMIN_COOKIE] || "";
}

function readAdminAccess(req, reqUrl) {
  const token = getAdminSessionToken(req);
  if (token) {
    const tokenHash = hashAdminSession(token);
    const sessions = readAdminSessions();
    const session = sessions.find((item) => item.token_hash === tokenHash && Date.parse(item.expires_at) > Date.now());
    if (session) {
      const account = findAdminAccountById(session.account_id);
      if (account && account.status !== "disabled") {
        session.last_seen_at = new Date().toISOString();
        writeAdminSessions(sessions);
        return account;
      }
    }
  }
  if (ALLOW_LEGACY_ADMIN_KEY && ADMIN_KEY && reqUrl?.searchParams?.get("key") === ADMIN_KEY && isLocalRequest(req)) {
    return {
      id: "legacy-admin-key",
      login_id: "legacy",
      name: "Legacy Admin",
      role: "super_admin",
      status: "active"
    };
  }
  return null;
}

function isLocalRequest(req) {
  const remote = String(req.socket?.remoteAddress || "");
  const host = getRequestHost(req).split(":")[0].toLowerCase();
  const localRemote = ["127.0.0.1", "::1", "::ffff:127.0.0.1"].includes(remote);
  const localHost = host === "localhost" || host === "127.0.0.1";
  return localRemote && localHost;
}

function requireAdmin(req, reqUrl, roles = null) {
  const account = readAdminAccess(req, reqUrl);
  if (!account) {
    const err = new Error("unauthorized");
    err.status = 401;
    throw err;
  }
  if (Array.isArray(roles) && roles.length && !roles.includes(account.role)) {
    const err = new Error("forbidden");
    err.status = 403;
    throw err;
  }
  return account;
}

function createAdminSession(account, req) {
  const token = randomB64(32);
  const sessions = readAdminSessions().filter((item) => Date.parse(item.expires_at) > Date.now());
  sessions.push({
    token_hash: hashAdminSession(token),
    account_id: account.id,
    created_at: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + ADMIN_SESSION_TTL_MS).toISOString()
  });
  writeAdminSessions(sessions);
  return {
    token,
    cookie: [buildAdminCookie(token, req), clearAdminLogoutCookie(req)]
  };
}

function updateAdminAccountRecord(id, payload = {}) {
  const accounts = readAdminAccounts();
  const target = accounts.find((item) => item.id === id);
  if (!target) {
    const err = new Error("老师不存在");
    err.status = 404;
    throw err;
  }
  if (payload.name != null) target.name = cleanAdminText(payload.name, 60) || target.name;
  if (payload.avatar_url != null) target.avatar_url = cleanImageSource(payload.avatar_url) || target.avatar_url || "";
  if (payload.bio != null) target.bio = cleanAdminText(payload.bio, 160);
  if (payload.note != null) target.note = cleanAdminText(payload.note, 140);
  target.updated_at = new Date().toISOString();
  writeAdminAccounts(accounts);
  return target;
}

function bindAdminAccountWechat(account, req) {
  const wechat = findWechatAccountByRequest(req);
  if (!wechat) {
    const err = new Error("wechat_not_authorized");
    err.status = 401;
    throw err;
  }
  const linked = findAdminAccountByWechatId(wechat.id);
  if (linked && linked.id !== account.id) {
    const err = new Error("这个微信已绑定其他老师账号");
    err.status = 409;
    throw err;
  }
  const accounts = readAdminAccounts();
  const target = accounts.find((item) => item.id === account.id);
  if (!target) {
    const err = new Error("老师不存在");
    err.status = 404;
    throw err;
  }
  target.wechat_id = wechat.id;
  target.wechat_nickname = wechat.nickname || "";
  target.wechat_avatar_url = wechat.avatar_url || "";
  target.avatar_url = target.avatar_url || wechat.avatar_url || "";
  target.updated_at = new Date().toISOString();
  writeAdminAccounts(accounts);
  return target;
}

function createAdminWechatBindState(account) {
  const state = randomB64(18);
  ADMIN_WECHAT_BIND_STATES.set(state, {
    account_id: account.id,
    created_at: Date.now(),
    expires_at: Date.now() + 10 * 60 * 1000
  });
  return state;
}

function consumeAdminWechatBindState(state) {
  const key = cleanText(state || "", 120);
  const record = ADMIN_WECHAT_BIND_STATES.get(key);
  ADMIN_WECHAT_BIND_STATES.delete(key);
  if (!record || record.expires_at < Date.now()) return null;
  return record;
}

function finishAdminWechatBindFromState(req, state) {
  const record = consumeAdminWechatBindState(state);
  if (!record) {
    const err = new Error("绑定已过期，请重新点击绑定");
    err.status = 400;
    throw err;
  }
  const account = findAdminAccountById(record.account_id);
  if (!account || account.status === "disabled") {
    const err = new Error("管理员账号不可用");
    err.status = 404;
    throw err;
  }
  return bindAdminAccountWechat(account, req);
}

function revokeAdminSession(req) {
  const token = getAdminSessionToken(req);
  if (!token) return false;
  const tokenHash = hashAdminSession(token);
  const sessions = readAdminSessions().filter((item) => item.token_hash !== tokenHash);
  writeAdminSessions(sessions);
  return true;
}

function publicAdminPermissions(account) {
  return {
    can_manage_teachers: account?.role === "super_admin",
    can_manage_users: account?.role === "super_admin",
    can_create_invites: account?.role === "super_admin",
    can_view_results: account?.role === "super_admin",
    can_diagnose: Boolean(account)
  };
}

function publicAdminSelfAccount(account) {
  const item = publicAdminAccount(account);
  if (!item) return null;
  if (item.role !== "super_admin") delete item.invite_code;
  return item;
}

function publicTeacherActivity(item) {
  if (!item) return null;
  return {
    id: item.id,
    teacher_id: item.teacher_id,
    action: item.action,
    verification_code: item.verification_code || "",
    user_nickname: item.user_nickname || "",
    test_mode: item.test_mode || "",
    test_time: item.test_time || "",
    viewed_at: item.viewed_at || "",
    diagnosed_at: item.diagnosed_at || "",
    created_at: item.created_at || "",
    diagnosis_nickname: item.diagnosis_nickname || ""
  };
}

function buildTeacherDashboard(account) {
  const activities = readAdminTeacherActivity().filter((item) => item.teacher_id === account.id);
  const views = activities.filter((item) => item.action === "view").sort((a, b) => Date.parse(b.created_at || 0) - Date.parse(a.created_at || 0));
  const diagnoses = activities.filter((item) => item.action === "diagnose").sort((a, b) => Date.parse(b.created_at || 0) - Date.parse(a.created_at || 0));
  const diagnosisKeys = new Set();
  for (const item of diagnoses) {
    diagnosisKeys.add([item.verification_code || "", item.user_nickname || "", item.test_mode || ""].join("|").toLowerCase());
  }
  const uniquePeople = new Set();
  for (const item of diagnoses) {
    uniquePeople.add([item.verification_code || "", item.user_nickname || "", item.test_time || ""].join("|").toLowerCase());
  }
  return {
    profile: publicAdminSelfAccount(account),
    stats: {
      view_count: views.length,
      diagnosis_count: diagnoses.length,
      diagnosed_people_count: uniquePeople.size,
      diagnosis_item_count: diagnosisKeys.size
    },
    recent_views: views.slice(0, 8).map(publicTeacherActivity),
    recent_diagnoses: diagnoses.slice(0, 8).map(publicTeacherActivity)
  };
}

function logTeacherActivity(account, item) {
  if (!account || !item?.action) return null;
  const record = {
    id: `AT${Date.now().toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    teacher_id: account.id,
    teacher_name: account.name || "",
    action: cleanText(item.action, 20),
    verification_code: cleanText(item.verification_code || "", 12).toUpperCase(),
    user_nickname: cleanText(item.user_nickname || "", 50),
    test_mode: cleanText(item.test_mode || "", 40),
    test_time: cleanText(item.test_time || "", 40),
    viewed_at: item.viewed_at || "",
    diagnosed_at: item.diagnosed_at || "",
    diagnosis_nickname: cleanText(item.diagnosis_nickname || "", 50),
    created_at: new Date().toISOString()
  };
  appendAdminTeacherActivity(record);
  return record;
}

function listAdminTeachers() {
  const invites = readAdminInvites();
  const inviteCounts = new Map();
  for (const invite of invites) {
    if (!invite?.created_by) continue;
    inviteCounts.set(invite.created_by, (inviteCounts.get(invite.created_by) || 0) + 1);
  }
  return readAdminAccounts()
    .map((account) => ({
      ...publicAdminAccount(account),
      invite_count: inviteCounts.get(account.id) || 0
    }))
    .sort((a, b) => {
      if (a.role !== b.role) return a.role === "super_admin" ? -1 : 1;
      return Date.parse(b.updated_at || b.created_at || 0) - Date.parse(a.updated_at || a.created_at || 0);
    });
}

function listAdminInvites() {
  return readAdminInvites()
    .map(publicAdminInvite)
    .sort((a, b) => Date.parse(b.created_at || 0) - Date.parse(a.created_at || 0));
}

function createAdminInvite(payload, creator) {
  const role = normalizeAdminRole(payload.role);
  if (role !== "teacher") {
    const err = new Error("目前只支持邀请老师");
    err.status = 400;
    throw err;
  }
  const note = cleanAdminText(payload.note, 80);
  const expiresInDays = Math.max(1, Math.min(60, Number(payload.expires_in_days || 30)));
  const invite = {
    code: makeInviteCode(),
    role,
    note,
    status: "active",
    created_at: new Date().toISOString(),
    created_by: creator.id,
    expires_at: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString(),
    max_uses: Math.max(1, Number(payload.max_uses || 1)),
    use_count: 0,
    used_by: "",
    used_at: ""
  };
  const invites = readAdminInvites();
  invites.push(invite);
  writeAdminInvites(invites);
  return invite;
}

function findAdminInvite(code) {
  const cleaned = cleanText(code || "", 40).toUpperCase();
  if (!cleaned) return null;
  return readAdminInvites().find((invite) => invite.code === cleaned) || null;
}

function consumeAdminInvite(code, accountId) {
  const invites = readAdminInvites();
  const invite = invites.find((item) => item.code === cleanText(code || "", 40).toUpperCase());
  if (!invite) {
    const err = new Error("邀请码不存在");
    err.status = 404;
    throw err;
  }
  if (invite.status !== "active" || adminInviteExpired(invite) || invite.use_count >= invite.max_uses) {
    const err = new Error("邀请码已失效");
    err.status = 400;
    throw err;
  }
  invite.use_count += 1;
  invite.used_by = accountId;
  invite.used_at = new Date().toISOString();
  if (invite.use_count >= invite.max_uses) invite.status = "used";
  writeAdminInvites(invites);
  return invite;
}

function registerAdminFromInvite(payload, req) {
  const inviteCode = cleanText(payload.invite_code || "", 40).toUpperCase();
  const invite = findAdminInvite(inviteCode);
  if (!invite) {
    const err = new Error("邀请码不存在");
    err.status = 404;
    throw err;
  }
  if (invite.status !== "active" || adminInviteExpired(invite) || invite.use_count >= invite.max_uses) {
    const err = new Error("邀请码已失效");
    err.status = 400;
    throw err;
  }
  const loginId = normalizeLoginId(payload.login_id);
  const name = cleanAdminText(payload.name, 60);
  const password = String(payload.password || "");
  if (!loginId || !name || password.length < 6) {
    const err = new Error("请填写完整的账号、姓名和密码");
    err.status = 400;
    throw err;
  }
  if (findAdminAccountByLogin(loginId)) {
    const err = new Error("这个登录账号已被使用");
    err.status = 409;
    throw err;
  }
  const wechat = req ? findWechatAccountByRequest(req) : null;
  if (!wechat) {
    const err = new Error("wechat_not_authorized");
    err.status = 401;
    throw err;
  }
  const wechatId = wechat?.id || "";
  const account = createAdminAccountRecord({
    login_id: loginId,
    name,
    password,
    role: invite.role,
    created_by: invite.created_by,
    invite_code: invite.code,
    status: "active",
    wechat_id: wechatId,
    wechat_nickname: wechat?.nickname || "",
    wechat_avatar_url: wechat?.avatar_url || "",
    avatar_url: wechat?.avatar_url || "",
    bio: cleanAdminText(payload.bio || "", 160)
  });
  const accounts = readAdminAccounts();
  accounts.push(account);
  writeAdminAccounts(accounts);
  consumeAdminInvite(invite.code, account.id);
  return account;
}

function loginAdminByWechat(req, payload = {}) {
  const wechat = findWechatAccountByRequest(req);
  if (!wechat) {
    const err = new Error("wechat_not_authorized");
    err.status = 401;
    throw err;
  }
  const existing = findAdminAccountByWechatId(wechat.id);
  if (existing && existing.status !== "disabled") {
    existing.last_login_at = new Date().toISOString();
    existing.updated_at = new Date().toISOString();
    const accounts = readAdminAccounts().map((item) => (item.id === existing.id ? existing : item));
    writeAdminAccounts(accounts);
    return existing;
  }
  const inviteCode = cleanText(payload.invite_code || "", 40).toUpperCase();
  if (!inviteCode) {
    const err = new Error("请先输入邀请码");
    err.status = 400;
    throw err;
  }
  const invite = findAdminInvite(inviteCode);
  if (!invite) {
    const err = new Error("邀请码不存在");
    err.status = 404;
    throw err;
  }
  if (invite.status !== "active" || adminInviteExpired(invite) || invite.use_count >= invite.max_uses) {
    const err = new Error("邀请码已失效");
    err.status = 400;
    throw err;
  }
  const loginId = normalizeLoginId(payload.login_id) || normalizeLoginId(`wx-${wechat.id.slice(0, 10)}@jojo.local`);
  const name = cleanAdminText(payload.name || wechat.nickname || "老师", 60);
  const password = String(payload.password || randomB64(10));
  if (findAdminAccountByLogin(loginId)) {
    const err = new Error("这个登录账号已被使用");
    err.status = 409;
    throw err;
  }
  const account = createAdminAccountRecord({
    login_id: loginId,
    name,
    password,
    role: invite.role,
    created_by: invite.created_by,
    invite_code: invite.code,
    status: "active",
    wechat_id: wechat.id,
    wechat_nickname: wechat.nickname,
    wechat_avatar_url: wechat.avatar_url,
    avatar_url: wechat.avatar_url,
    bio: cleanAdminText(payload.bio || "", 160)
  });
  const accounts = readAdminAccounts();
  accounts.push(account);
  writeAdminAccounts(accounts);
  consumeAdminInvite(invite.code, account.id);
  return account;
}

function loginAdminAccount(payload) {
  const loginId = normalizeLoginId(payload.login_id);
  const password = String(payload.password || "");
  if (!loginId || !password) {
    const err = new Error("请输入登录账号和密码");
    err.status = 400;
    throw err;
  }
  const account = findAdminAccountByLogin(loginId);
  if (!account || account.status === "disabled" || !passwordMatches(password, account)) {
    const err = new Error("账号或密码不正确");
    err.status = 401;
    throw err;
  }
  account.last_login_at = new Date().toISOString();
  account.updated_at = new Date().toISOString();
  const accounts = readAdminAccounts().map((item) => (item.id === account.id ? account : item));
  writeAdminAccounts(accounts);
  return account;
}

function adminUserHash(kind, value) {
  return `${kind}_${crypto.createHash("sha256").update(String(value || "")).digest("hex").slice(0, 18)}`;
}

function adminUserIdentityForResult(result) {
  const wechatId = cleanText(result.wechat?.id || "", 80);
  if (wechatId) {
    return {
      id: `wechat_${wechatId}`,
      kind: "wechat",
      account_id: wechatId,
      name: cleanAdminText(result.wechat?.nickname || result.user?.nickname || "", 60) || "微信用户",
      contact: cleanAdminText(result.user?.contact || "", 80)
    };
  }
  const accountId = cleanText(result.account?.id || "", 80);
  if (accountId) {
    return {
      id: `account_${accountId}`,
      kind: "account",
      account_id: accountId,
      name: cleanAdminText(result.account?.name || result.user?.nickname || "", 60) || "注册用户",
      contact: cleanAdminText(result.user?.contact || "", 80)
    };
  }
  const contact = cleanAdminText(result.user?.contact || "", 80);
  if (contact) {
    return {
      id: adminUserHash("contact", contact.toLowerCase()),
      kind: "contact",
      account_id: "",
      name: cleanAdminText(result.user?.nickname || "", 60) || contact,
      contact
    };
  }
  const nickname = cleanAdminText(result.user?.nickname || "", 60);
  if (nickname) {
    return {
      id: adminUserHash("nickname", nickname.toLowerCase()),
      kind: "nickname",
      account_id: "",
      name: nickname,
      contact: ""
    };
  }
  const fallback = cleanText(result.verification_code || result.session_id || randomB64(12), 80);
  return {
    id: adminUserHash("anonymous", fallback),
    kind: "anonymous",
    account_id: "",
    name: "未留信息用户",
    contact: ""
  };
}

function publicAdminDashboardActivity(result, action = "view") {
  return {
    action,
    verification_code: result.verification_code || "",
    user_nickname: result.user?.nickname || "",
    test_mode: result.test_mode || "",
    test_time: result.created_at || "",
    viewed_at: action === "view" ? new Date().toISOString() : "",
    diagnosed_at: action === "diagnose" ? new Date().toISOString() : ""
  };
}

function normalizeMatchText(value) {
  return String(value || "").trim().toLowerCase().replace(/\s+/g, "");
}

function resultMatchesDiagnosisNickname(result, nickname) {
  const input = normalizeMatchText(nickname);
  if (!input) return false;
  const candidates = [
    result.user?.nickname,
    result.user?.contact,
    result.wechat?.nickname,
    result.account?.name
  ].map(normalizeMatchText).filter(Boolean);
  return candidates.some((item) => item === input);
}

function makeAdminUserGroup(identity, account = null) {
  return {
    id: identity.id,
    identity_kind: identity.kind,
    account_id: identity.account_id || account?.id || "",
    name: identity.name || account?.name || "测试用户",
    contact: identity.contact || "",
    created_at: account?.created_at || "",
    updated_at: account?.updated_at || "",
    credential_count: account?.credentials?.length || 0,
    result_count: 0,
    last_result_at: "",
    last_result_code: "",
    last_result_mode: "",
    last_result_title: "",
    account,
    results: [],
    search_text: ""
  };
}

function buildAdminUserGroups() {
  const accounts = new Map(readPasskeyAccounts().map((account) => [account.id, account]));
  const groups = new Map();
  for (const result of readResults()) {
    const identity = adminUserIdentityForResult(result);
    const account = identity.account_id ? accounts.get(identity.account_id) || null : null;
    let group = groups.get(identity.id);
    if (!group) {
      group = makeAdminUserGroup(identity, account);
      groups.set(identity.id, group);
    }
    if (!group.name || group.name === "未留信息用户") group.name = identity.name || group.name;
    if (!group.contact && identity.contact) group.contact = identity.contact;
    if (account) {
      group.account = account;
      group.credential_count = account.credentials?.length || 0;
      group.created_at = account.created_at || group.created_at;
      group.updated_at = account.updated_at || group.updated_at;
    }
    group.results.push(result);
    group.result_count += 1;
    if (!group.created_at || Date.parse(result.created_at || 0) < Date.parse(group.created_at || 0)) group.created_at = result.created_at || group.created_at;
    if (!group.updated_at || Date.parse(result.created_at || 0) > Date.parse(group.updated_at || 0)) group.updated_at = result.created_at || group.updated_at;
    if (!group.last_result_at || Date.parse(result.created_at || 0) > Date.parse(group.last_result_at || 0)) {
      group.last_result_at = result.created_at || "";
      group.last_result_code = result.verification_code || "";
      group.last_result_mode = result.test_mode || "";
      group.last_result_title = result.share?.title || "";
    }
  }
  for (const account of accounts.values()) {
    const id = `account_${account.id}`;
    if (groups.has(id)) continue;
    groups.set(id, makeAdminUserGroup({
      id,
      kind: "account",
      account_id: account.id,
      name: account.name || "注册用户",
      contact: ""
    }, account));
  }
  for (const group of groups.values()) {
    group.results.sort((a, b) => Date.parse(b.created_at || 0) - Date.parse(a.created_at || 0));
    group.search_text = [
      group.id,
      group.account_id,
      group.name,
      group.contact,
      group.last_result_code,
      group.last_result_title,
      group.results.map((result) => result.verification_code).join(" "),
      group.results.map((result) => result.user?.nickname).filter(Boolean).join(" "),
      group.results.map((result) => result.user?.contact).filter(Boolean).join(" "),
      group.results.map((result) => result.wechat?.nickname).filter(Boolean).join(" "),
      group.results.map((result) => result.team?.name).filter(Boolean).join(" "),
      group.results.map((result) => result.team?.code).filter(Boolean).join(" ")
    ].filter(Boolean).join(" ").toLowerCase();
  }
  return [...groups.values()];
}

function listAdminUsers(keyword = "") {
  const search = cleanText(keyword || "", 60).toLowerCase();
  return buildAdminUserGroups()
    .filter((item) => !search || item.search_text.includes(search))
    .sort((a, b) => Date.parse(b.last_result_at || b.updated_at || b.created_at || 0) - Date.parse(a.last_result_at || a.updated_at || a.created_at || 0));
}

function findAdminUserDetails(id) {
  const group = buildAdminUserGroups().find((item) => item.id === cleanText(id || "", 100));
  if (!group) return null;
  return {
    user: {
      id: group.id,
      account_id: group.account_id,
      identity_kind: group.identity_kind,
      name: group.name || "测试用户",
      contact: group.contact || "",
      created_at: group.created_at,
      updated_at: group.updated_at,
      credential_count: group.credential_count || 0,
      result_count: group.result_count || 0
    },
    results: group.results.slice(0, 30).map(publicHistoryItem),
    detail_results: group.results.slice(0, 30)
  };
}

function updateAdminTeacher(id, payload, actor) {
  const accounts = readAdminAccounts();
  const target = accounts.find((item) => item.id === id);
  if (!target) {
    const err = new Error("老师不存在");
    err.status = 404;
    throw err;
  }
  if (payload.role != null) {
    if (actor.role !== "super_admin") {
      const err = new Error("没有权限");
      err.status = 403;
      throw err;
    }
    const nextRole = payload.role === "super_admin" ? "super_admin" : "teacher";
    if (target.role === "super_admin" && nextRole !== "super_admin") {
      const remainingAdmins = accounts.filter((item) =>
        item.id !== target.id &&
        item.role === "super_admin" &&
        item.status !== "disabled"
      ).length;
      if (remainingAdmins < 1) {
        const err = new Error("至少保留一个管理员");
        err.status = 400;
        throw err;
      }
    }
    target.role = nextRole;
  }
  if (payload.name != null) target.name = cleanAdminText(payload.name, 60) || target.name;
  if (payload.status != null) target.status = payload.status === "disabled" ? "disabled" : "active";
  if (payload.password) {
    const { salt, hash } = passwordRecord(String(payload.password));
    target.password_salt = salt;
    target.password_hash = hash;
  }
  if (payload.note != null) target.note = cleanAdminText(payload.note, 140);
  target.updated_at = new Date().toISOString();
  writeAdminAccounts(accounts);
  return target;
}

function removeAdminTeacher(id, actor) {
  const accounts = readAdminAccounts();
  const index = accounts.findIndex((item) => item.id === id);
  if (index < 0) {
    const err = new Error("老师不存在");
    err.status = 404;
    throw err;
  }
  const target = accounts[index];
  if (target.role === "super_admin") {
    const err = new Error("不能移除超级管理员");
    err.status = 403;
    throw err;
  }
  if (actor.id === target.id) {
    const err = new Error("不能移除自己");
    err.status = 403;
    throw err;
  }
  accounts.splice(index, 1);
  writeAdminAccounts(accounts);
  return target;
}

function findAccountByToken(token) {
  const tokenHash = hashAccountToken(token);
  if (!tokenHash) return null;
  return readPasskeyAccounts().find((account) => (account.token_hashes || []).includes(tokenHash)) || null;
}

function findWechatAccountByRequest(req) {
  const token = parseCookies(req)[USER_COOKIE] || "";
  const tokenHash = hashAccountToken(token);
  if (!tokenHash) return null;
  const account = readWechatAccounts().find((item) => (item.session_hashes || []).includes(tokenHash)) || null;
  if (!account) return null;
  const expiresAt = Date.parse(account.session_expires_at || 0);
  if (expiresAt && expiresAt < Date.now()) return null;
  return account;
}

function accountForSubmission(payload) {
  const account = findAccountByToken(payload.account_token);
  if (!account) return null;
  return { id: account.id, name: account.name || "Passkey用户" };
}

function wechatForSubmission(req) {
  const account = findWechatAccountByRequest(req);
  if (!account) return null;
  return publicWechatAccount(account);
}

function publicAccount(account) {
  if (!account) return null;
  return {
    id: account.id,
    name: account.name || "Passkey用户",
    created_at: account.created_at,
    credential_count: account.credentials?.length || 0
  };
}

function publicWechatAccount(account) {
  if (!account) return null;
  return {
    id: account.id,
    nickname: account.nickname || "微信用户",
    avatar_url: account.avatar_url || "",
    openid: account.openid ? `${account.openid.slice(0, 4)}***${account.openid.slice(-4)}` : "",
    unionid: account.unionid ? `${account.unionid.slice(0, 4)}***${account.unionid.slice(-4)}` : "",
    created_at: account.created_at,
    updated_at: account.updated_at
  };
}

function wechatAuthEnabled() {
  return wechatAuthMode() === "cloudrun" ? Boolean(WECHAT_CLOUDRUN_LOGIN_URL) : Boolean(WECHAT_APPID && WECHAT_SECRET);
}

function wechatAuthMode() {
  if (WECHAT_AUTH_MODE === "cloudrun" || WECHAT_CLOUDRUN_LOGIN_URL) return "cloudrun";
  return WECHAT_AUTH_TYPE;
}

function wechatStartUrl(req) {
  if (wechatAuthMode() === "cloudrun") {
    return WECHAT_CLOUDRUN_LOGIN_URL || `${getRequestOrigin(req)}/wechat-login`;
  }
  return "/auth/wechat/start";
}

function wechatOAuthCallbackUrl(req) {
  const origin = WECHAT_AUTH_BASE_URL || getRequestOrigin(req);
  return `${origin}/auth/wechat/callback`;
}

function wechatCloudrunCallbackUrl(req) {
  return WECHAT_CLOUDRUN_CALLBACK_URL || `${WECHAT_AUTH_BASE_URL || getRequestOrigin(req)}/auth/wechat/cloudrun/callback`;
}

function renderWechatLoginPage(req, opts = {}) {
  const appid = WECHAT_CLOUDRUN_APPID || WECHAT_APPID || "";
  const envid = WECHAT_CLOUDRUN_ENVID || "";
  const serviceName = WECHAT_CLOUDRUN_SERVICE || "express-ul3g";
  const callbackUrl = wechatCloudrunCallbackUrl(req);
  const title = cleanText(opts.title || "微信授权登录", 80) || "微信授权登录";
  const subtitle = cleanText(opts.subtitle || "授权后自动回到测试。", 140);
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  <title>${escapeXml(title)}</title>
  <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  <script src="https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.3.0/cloud.js"></script>
  <script src="https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.3.1/mplogin.min.js"></script>
  <style>
    :root {
      color-scheme: light;
      --bg: #fff8ec;
      --panel: rgba(255, 255, 255, 0.86);
      --text: #13373b;
      --muted: #6d8583;
      --line: rgba(30, 40, 37, 0.08);
      --accent: #0e8f86;
      --shadow: 0 18px 42px rgba(24, 53, 58, 0.10);
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; background: linear-gradient(150deg, #fff2dc 0%, #fffdf8 44%, #e7fffb 100%); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "SF Pro Rounded", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; letter-spacing: 0; }
    body { display: grid; place-items: center; padding: max(20px, env(safe-area-inset-top)) 20px max(20px, env(safe-area-inset-bottom)); }
    .shell {
      width: min(100%, 360px);
      padding: 30px 22px 22px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: var(--panel);
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
      text-align: center;
    }
    .mark {
      width: 118px;
      height: 48px;
      display: grid;
      place-items: center;
      margin: 0 auto 18px;
    }
    .mark img { display: block; width: 100%; height: 100%; object-fit: contain; }
    h1 { margin: 0 0 7px; font-size: 22px; line-height: 1.18; font-weight: 880; }
    p { margin: 0; color: var(--muted); line-height: 1.55; font-size: 13px; }
    .btn {
      margin-top: 20px;
      width: 100%;
      height: 48px;
      border: 0;
      border-radius: 8px;
      background: linear-gradient(135deg, #173238 0%, var(--accent) 68%, #18c6b7 100%);
      color: white;
      font-size: 15px;
      font-weight: 860;
      letter-spacing: 0;
      box-shadow: 0 14px 32px rgba(14, 143, 134, 0.22);
    }
    .btn:disabled { opacity: .7; }
    .status { margin-top: 14px; font-size: 12px; color: var(--muted); min-height: 18px; }
    .error { color: #b44848; }
  </style>
</head>
<body>
  <main class="shell">
    <div class="mark"><img src="/jojo-logo.png" alt="jojo测九型"></div>
    <h1>${escapeXml(title)}</h1>
    <p>${escapeXml(subtitle)}</p>
    <button id="start" class="btn">微信授权登录</button>
    <div id="status" class="status">准备好了。</div>
  </main>
  <script>
    const config = {
      appid: ${JSON.stringify(appid)},
      envid: ${JSON.stringify(envid)},
      serviceName: ${JSON.stringify(serviceName)},
      callbackUrl: ${JSON.stringify(callbackUrl)}
    };
    const qs = new URLSearchParams(location.search);
    const redirect = qs.get("redirect") || "/";
    const device = qs.get("device") || "";
    const status = document.getElementById("status");
    const startBtn = document.getElementById("start");
    const busyKey = "jojo_cloudrun_wechat_busy";
    let running = false;

    function setStatus(text, kind) {
      status.textContent = text;
      status.className = kind === "error" ? "status error" : "status";
    }

    function normalizeResult(value) {
      if (!value) return {};
      if (typeof value === "string") {
        try { return JSON.parse(value); } catch { return { raw: value }; }
      }
      return value.result || value.data || value;
    }

    function postTicket(payload) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = payload.callback_url || config.callbackUrl;
      form.style.display = "none";
      for (const [key, value] of Object.entries({
        ticket: payload.ticket || "",
        redirect: payload.redirect || redirect,
        device,
        source: "cloudrun"
      })) {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value == null ? "" : String(value);
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
    }

    async function runLogin() {
      if (running) return;
      running = true;
      startBtn.disabled = true;
      sessionStorage.setItem(busyKey, "1");
      try {
        setStatus("正在唤起微信授权…");
        const mplogin = typeof window.mplogin === "function"
          ? window.mplogin
          : (window.mplogin?.login || window.login);
        if (!mplogin) throw new Error("mplogin not ready");
        const login = await mplogin({
          scope: "snsapi_userinfo",
          appid: config.appid,
          envid: config.envid,
          noback: true
        });
        const cloud = login?.cloud || window.app || login;
        if (!cloud || typeof cloud.callContainer !== "function") throw new Error("cloud.callContainer unavailable");
        setStatus("正在读取微信身份…");
        const result = await cloud.callContainer({
          path: "/api/wechat/relay",
          method: "POST",
          header: {
            "X-WX-SERVICE": config.serviceName
          },
          data: {
            redirect,
            device,
            return_to: redirect
          }
        });
        const payload = normalizeResult(result);
        if (!payload || !payload.ok || !payload.ticket) {
          throw new Error(payload?.error || payload?.message || "relay failed");
        }
        setStatus("身份已确认，正在返回 JOJO…");
        sessionStorage.removeItem(busyKey);
        postTicket(payload);
      } catch (err) {
        console.error(err);
        setStatus(err && err.message ? "授权失败：" + err.message : "授权失败，请稍后再试。", "error");
        sessionStorage.removeItem(busyKey);
        running = false;
        startBtn.disabled = false;
      }
    }

    startBtn.addEventListener("click", runLogin);
    if (sessionStorage.getItem(busyKey) === "1") {
      setTimeout(runLogin, 60);
    }
  </script>
</body>
</html>`;
}

function wechatRelaySecretReady() {
  return Boolean(WECHAT_RELAY_SECRET);
}

function signWechatRelayPayload(payload) {
  if (!WECHAT_RELAY_SECRET) return "";
  const encoded = toBase64Url(Buffer.from(JSON.stringify(payload), "utf8"));
  const signature = crypto.createHmac("sha256", WECHAT_RELAY_SECRET).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function verifyWechatRelayTicket(ticket) {
  if (!WECHAT_RELAY_SECRET || typeof ticket !== "string") return null;
  const [encoded, signature] = ticket.split(".");
  if (!encoded || !signature) return null;
  const expected = crypto.createHmac("sha256", WECHAT_RELAY_SECRET).update(encoded).digest("base64url");
  const expectedBuf = Buffer.from(expected);
  const signatureBuf = Buffer.from(signature);
  if (expectedBuf.length !== signatureBuf.length) return null;
  if (!crypto.timingSafeEqual(expectedBuf, signatureBuf)) return null;
  try {
    const payload = JSON.parse(fromBase64Url(encoded).toString("utf8"));
    if (!payload || payload.exp <= Date.now() || payload.iat > Date.now() + 60_000) return null;
    if (payload.source !== "cloudrun") return null;
    if (WECHAT_CLOUDRUN_APPID && payload.appid && payload.appid !== WECHAT_CLOUDRUN_APPID) return null;
    if (WECHAT_CLOUDRUN_ENVID && payload.envid && payload.envid !== WECHAT_CLOUDRUN_ENVID) return null;
    return payload;
  } catch {
    return null;
  }
}

function buildWechatRelayTicket(profile, requestInfo) {
  const now = Date.now();
  const ticketId = randomB64(18);
  const payload = {
    ticket_id: ticketId,
    iat: now,
    exp: now + WECHAT_RELAY_TTL_MS,
    source: "cloudrun",
    appid: cleanText(profile.appid || WECHAT_CLOUDRUN_APPID || "", 80),
    envid: cleanText(requestInfo.envid || WECHAT_CLOUDRUN_ENVID || "", 80),
    service: cleanText(requestInfo.service || WECHAT_CLOUDRUN_SERVICE || "", 120),
    openid: cleanText(profile.openid || "", 120),
    unionid: cleanText(profile.unionid || "", 120),
    nickname: cleanText(profile.nickname || "", 80),
    avatar_url: cleanText(profile.avatar_url || "", 500),
    city: cleanText(profile.city || "", 80),
    province: cleanText(profile.province || "", 80),
    country: cleanText(profile.country || "", 80),
    redirect: safeRedirectTarget(requestInfo.req, requestInfo.redirect || "/"),
    device_hash: hashDeviceToken(requestInfo.device || "")
  };
  return signWechatRelayPayload(payload);
}

function wechatAuthConfig(req) {
  return {
    enabled: wechatAuthEnabled(),
    type: wechatAuthMode(),
    login_url: wechatStartUrl(req),
    account: publicWechatAccount(findWechatAccountByRequest(req))
  };
}

function globalAuthStatus(req, reqUrl) {
  const user = {
    wechat: publicWechatAccount(findWechatAccountByRequest(req)),
    account: publicAccount(findAccountByToken(reqUrl.searchParams.get("account_token") || ""))
  };
  const staffAccount = readAdminAccess(req, reqUrl);
  const staff = staffAccount ? {
    account: publicAdminSelfAccount(staffAccount),
    permissions: publicAdminPermissions(staffAccount)
  } : null;
  return {
    logged_in: Boolean(user.wechat || user.account || staff),
    roles: {
      user: Boolean(user.wechat || user.account),
      teacher: staff?.account?.role === "teacher",
      admin: staff?.account?.role === "super_admin"
    },
    user,
    staff
  };
}

function appendQueryParam(target, key, value) {
  const raw = cleanText(target || "", 500) || "/";
  try {
    const url = new URL(raw, "https://jojo.local");
    url.searchParams.set(key, value);
    if (raw.startsWith("http")) return url.href;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    const glue = raw.includes("?") ? "&" : "?";
    return `${raw}${glue}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
}

function safeRedirectTarget(req, value) {
  const fallback = "/";
  const raw = cleanText(value || "", 500);
  if (!raw) return fallback;
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  try {
    const target = new URL(raw);
    const currentHost = getRequestHost(req).split(":")[0].toLowerCase();
    const allowed = new Set([currentHost, ...WECHAT_ALLOWED_REDIRECT_HOSTS]);
    if (allowed.has(target.hostname.toLowerCase())) return target.href;
  } catch {
    return fallback;
  }
  return fallback;
}

function withAuthStatus(target, status) {
  try {
    const url = new URL(target, "https://jojo.local");
    url.searchParams.set("wechat", status);
    if (target.startsWith("http")) return url.href;
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    const glue = target.includes("?") ? "&" : "?";
    return `${target}${glue}wechat=${encodeURIComponent(status)}`;
  }
}

function createWechatState(req, redirectTarget, deviceToken = "") {
  const state = randomB64(24);
  WECHAT_STATES.set(state, {
    redirect: safeRedirectTarget(req, redirectTarget),
    device_hash: hashDeviceToken(deviceToken),
    created_at: Date.now(),
    expires_at: Date.now() + 10 * 60 * 1000
  });
  return state;
}

function consumeWechatState(state) {
  const record = WECHAT_STATES.get(state);
  WECHAT_STATES.delete(state);
  if (!record || record.expires_at < Date.now()) return null;
  return record;
}

function wechatCallbackUrl(req) {
  return wechatOAuthCallbackUrl(req);
}

function startWechatAuth(req, res, reqUrl) {
  if (!wechatAuthEnabled()) return sendJson(res, 501, { error: "wechat_auth_not_configured" });
  const redirectTarget = reqUrl.searchParams.get("redirect") || "/";
  if (wechatAuthMode() === "cloudrun") {
    const loginUrl = new URL(wechatStartUrl(req), getRequestOrigin(req));
    loginUrl.searchParams.set("redirect", safeRedirectTarget(req, redirectTarget));
    loginUrl.searchParams.set("device", reqUrl.searchParams.get("device") || "");
    res.writeHead(302, { Location: loginUrl.href });
    res.end();
    return;
  }
  const state = createWechatState(req, redirectTarget, reqUrl.searchParams.get("device") || "");
  const redirectUri = wechatCallbackUrl(req);
  const authUrl = new URL(WECHAT_AUTH_TYPE === "website"
    ? "https://open.weixin.qq.com/connect/qrconnect"
    : "https://open.weixin.qq.com/connect/oauth2/authorize");
  authUrl.searchParams.set("appid", WECHAT_APPID);
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", WECHAT_AUTH_TYPE === "website" ? "snsapi_login" : "snsapi_userinfo");
  authUrl.searchParams.set("state", state);
  res.writeHead(302, { Location: `${authUrl.href}#wechat_redirect` });
  res.end();
}

async function handleWechatCallback(req, res, reqUrl) {
  const stateRecord = consumeWechatState(reqUrl.searchParams.get("state") || "");
  const returnTo = stateRecord?.redirect || "/";
  const code = cleanText(reqUrl.searchParams.get("code") || "", 160);
  if (!wechatAuthEnabled() || !stateRecord || !code) {
    res.writeHead(302, { Location: withAuthStatus(returnTo, "fail") });
    res.end();
    return;
  }
  try {
    const profile = await fetchWechatProfile(code);
    const account = upsertWechatAccount(profile, stateRecord.device_hash);
    const token = rotateWechatSession(account);
    writeWechatAccount(account);
    res.writeHead(302, {
      "Set-Cookie": userCookieHeader(token, req),
      Location: withAuthStatus(returnTo, "ok")
    });
    res.end();
  } catch (err) {
    console.error("wechat_auth_failed", err);
    res.writeHead(302, { Location: withAuthStatus(returnTo, "fail") });
    res.end();
  }
}

async function handleWechatCloudrunCallback(req, res, reqUrl) {
  const payload = req.method === "GET"
    ? Object.fromEntries(reqUrl.searchParams.entries())
    : await readBody(req);
  const ticket = cleanText(payload.ticket || "", 1200);
  const verified = verifyWechatRelayTicket(ticket);
  if (!verified || !wechatRelaySecretReady()) {
    const fallback = safeRedirectTarget(req, payload.redirect || "/");
    res.writeHead(302, { Location: withAuthStatus(fallback, "fail") });
    res.end();
    return;
  }
  try {
    const returnTo = safeRedirectTarget(req, verified.redirect || payload.redirect || "/");
    const profile = {
      openid: verified.openid,
      unionid: verified.unionid,
      nickname: verified.nickname,
      avatar_url: verified.avatar_url,
      city: verified.city,
      province: verified.province,
      country: verified.country,
      appid: verified.appid,
      auth_type: "cloudrun"
    };
    const account = upsertWechatAccount(profile, verified.device_hash || "");
    const token = rotateWechatSession(account);
    writeWechatAccount(account);
    res.writeHead(302, {
      "Set-Cookie": userCookieHeader(token, req),
      Location: withAuthStatus(returnTo, "ok")
    });
    res.end();
  } catch (err) {
    console.error("wechat_cloudrun_auth_failed", err);
    const fallback = safeRedirectTarget(req, verified?.redirect || payload.redirect || "/");
    res.writeHead(302, { Location: withAuthStatus(fallback, "fail") });
    res.end();
  }
}

async function fetchWechatProfile(code) {
  const tokenUrl = new URL("https://api.weixin.qq.com/sns/oauth2/access_token");
  tokenUrl.searchParams.set("appid", WECHAT_APPID);
  tokenUrl.searchParams.set("secret", WECHAT_SECRET);
  tokenUrl.searchParams.set("code", code);
  tokenUrl.searchParams.set("grant_type", "authorization_code");
  const tokenResponse = await fetch(tokenUrl);
  const tokenData = await tokenResponse.json();
  if (!tokenResponse.ok || tokenData.errcode || !tokenData.access_token || !tokenData.openid) {
    throw new Error(tokenData.errmsg || "wechat_token_failed");
  }
  const userUrl = new URL("https://api.weixin.qq.com/sns/userinfo");
  userUrl.searchParams.set("access_token", tokenData.access_token);
  userUrl.searchParams.set("openid", tokenData.openid);
  userUrl.searchParams.set("lang", "zh_CN");
  const userResponse = await fetch(userUrl);
  const userData = await userResponse.json();
  if (!userResponse.ok || userData.errcode) throw new Error(userData.errmsg || "wechat_userinfo_failed");
  return {
    openid: cleanText(userData.openid || tokenData.openid, 120),
    unionid: cleanText(userData.unionid || tokenData.unionid || "", 120),
    nickname: cleanText(userData.nickname || "", 80),
    avatar_url: cleanText(userData.headimgurl || "", 500),
    city: cleanText(userData.city || "", 80),
    province: cleanText(userData.province || "", 80),
    country: cleanText(userData.country || "", 80),
    appid: WECHAT_APPID,
    auth_type: WECHAT_AUTH_TYPE
  };
}

function wechatAccountId(profile) {
  const raw = profile.unionid || `${profile.appid}:${profile.openid}`;
  return `wx_${crypto.createHash("sha256").update(raw).digest("hex").slice(0, 24)}`;
}

function upsertWechatAccount(profile, deviceHash = "") {
  const accounts = readWechatAccounts();
  const id = wechatAccountId(profile);
  const now = new Date().toISOString();
  const existing = accounts.find((item) => item.id === id || (profile.unionid && item.unionid === profile.unionid) || (item.appid === profile.appid && item.openid === profile.openid));
  const account = existing || {
    id,
    created_at: now,
    session_hashes: [],
    device_hashes: []
  };
  account.id = account.id || id;
  account.openid = profile.openid;
  account.unionid = profile.unionid || account.unionid || "";
  account.nickname = profile.nickname || account.nickname || "微信用户";
  account.avatar_url = profile.avatar_url || account.avatar_url || "";
  account.city = profile.city || "";
  account.province = profile.province || "";
  account.country = profile.country || "";
  account.appid = profile.appid;
  account.auth_type = profile.auth_type;
  account.updated_at = now;
  if (!Array.isArray(account.device_hashes)) account.device_hashes = [];
  if (deviceHash && !account.device_hashes.includes(deviceHash)) account.device_hashes.push(deviceHash);
  if (!existing) accounts.push(account);
  writeWechatAccounts(accounts);
  return account;
}

function writeWechatAccount(account) {
  const accounts = readWechatAccounts();
  const index = accounts.findIndex((item) => item.id === account.id);
  if (index >= 0) accounts[index] = account;
  else accounts.push(account);
  writeWechatAccounts(accounts);
}

function rotateWechatSession(account) {
  const token = randomB64(32);
  account.session_hashes = [hashAccountToken(token), ...(account.session_hashes || [])].slice(0, 8);
  account.session_expires_at = new Date(Date.now() + USER_SESSION_TTL_MS).toISOString();
  account.updated_at = new Date().toISOString();
  return token;
}

function wechatAccountResults(account) {
  if (!account) return [];
  const deviceHashes = new Set(account.device_hashes || []);
  return readResults().filter((result) => result.wechat?.id === account.id || (result.device_hash && deviceHashes.has(result.device_hash)));
}

function getRequestHost(req) {
  return String(req.headers["x-forwarded-host"] || req.headers.host || "localhost").split(",")[0].trim();
}

function getRequestOrigin(req) {
  const proto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim() || (getRequestHost(req).startsWith("localhost") ? "http" : "https");
  return `${proto}://${getRequestHost(req)}`;
}

function getRpId(req) {
  return getRequestHost(req).split(":")[0];
}

function parseCookies(reqOrHeader = "") {
  const header = typeof reqOrHeader === "string"
    ? reqOrHeader
    : String(reqOrHeader?.headers?.cookie || "");
  const cookies = {};
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index < 0) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (!key) continue;
    cookies[key] = decodeURIComponent(value);
  }
  return cookies;
}

function userCookieHeader(token, req, maxAge = Math.floor(USER_SESSION_TTL_MS / 1000)) {
  const pieces = [
    `${USER_COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "HttpOnly",
    "SameSite=Lax"
  ];
  if (WECHAT_COOKIE_DOMAIN) pieces.push(`Domain=${WECHAT_COOKIE_DOMAIN}`);
  if (getRequestOrigin(req).startsWith("https://")) pieces.push("Secure");
  return pieces.join("; ");
}

function originAllowed(req, origin) {
  try {
    const actual = new URL(origin);
    const host = getRequestHost(req).split(":")[0];
    return actual.hostname === host || (host === "localhost" && actual.hostname === "127.0.0.1");
  } catch {
    return false;
  }
}

function createChallenge(type, extra = {}) {
  const challenge = randomB64(32);
  PASSKEY_CHALLENGES.set(challenge, {
    type,
    expires_at: Date.now() + 5 * 60 * 1000,
    ...extra
  });
  return challenge;
}

function consumeChallenge(challenge, type) {
  const record = PASSKEY_CHALLENGES.get(challenge);
  PASSKEY_CHALLENGES.delete(challenge);
  if (!record || record.type !== type || record.expires_at < Date.now()) return null;
  return record;
}

function passkeyRegisterOptions(req, payload) {
  const rpId = getRpId(req);
  const userId = randomB64(16);
  const name = cleanText(payload.name, 40) || "jojo用户";
  const challenge = createChallenge("register", {
    user_id: userId,
    name,
    device_hash: hashDeviceToken(payload.device_token)
  });
  return {
    publicKey: {
      challenge,
      rp: { name: RP_NAME, id: rpId },
      user: { id: userId, name, displayName: name },
      pubKeyCredParams: [{ type: "public-key", alg: -7 }],
      timeout: 60000,
      attestation: "none",
      authenticatorSelection: {
        residentKey: "preferred",
        userVerification: "preferred"
      }
    }
  };
}

function passkeyLoginOptions(req) {
  const accounts = readPasskeyAccounts();
  const allowCredentials = accounts.flatMap((account) => (account.credentials || []).map((credential) => ({
    type: "public-key",
    id: credential.id
  })));
  if (!allowCredentials.length) {
    const err = new Error("当前还没有可用的Passkey记录，请先创建。");
    err.status = 404;
    throw err;
  }
  const challenge = createChallenge("login");
  return {
    publicKey: {
      challenge,
      rpId: getRpId(req),
      allowCredentials,
      userVerification: "preferred",
      timeout: 60000
    }
  };
}

function verifyPasskeyRegistration(req, payload) {
  const credential = payload.credential || {};
  const clientDataJSON = fromBase64Url(credential.response?.clientDataJSON);
  const clientData = JSON.parse(clientDataJSON.toString("utf8"));
  const challenge = consumeChallenge(clientData.challenge, "register");
  if (!challenge || clientData.type !== "webauthn.create" || !originAllowed(req, clientData.origin)) {
    const err = new Error("Passkey创建验证失败");
    err.status = 400;
    throw err;
  }
  const auth = parseAttestationObject(fromBase64Url(credential.response?.attestationObject));
  verifyAuthData(auth.authData, getRpId(req));
  if (!auth.credentialId || !auth.publicKeyCose) {
    const err = new Error("Passkey凭据不完整");
    err.status = 400;
    throw err;
  }
  const accounts = readPasskeyAccounts();
  if (accounts.some((account) => (account.credentials || []).some((item) => item.id === auth.credentialId))) {
    const err = new Error("这个Passkey已经绑定过");
    err.status = 409;
    throw err;
  }
  const account = {
    id: challenge.user_id,
    name: challenge.name,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    device_hashes: challenge.device_hash ? [challenge.device_hash] : [],
    token_hashes: [],
    credentials: [{
      id: auth.credentialId,
      public_key_cose: toBase64Url(auth.publicKeyCose),
      sign_count: auth.signCount,
      created_at: new Date().toISOString()
    }]
  };
  const accountToken = rotateAccountToken(account);
  accounts.push(account);
  writePasskeyAccounts(accounts);
  return {
    ok: true,
    account: publicAccount(account),
    account_token: accountToken,
    results: accountResults(account).slice(0, 50).map(publicHistoryItem)
  };
}

function verifyPasskeyLogin(req, payload) {
  const credential = payload.credential || {};
  const clientDataJSON = fromBase64Url(credential.response?.clientDataJSON);
  const clientData = JSON.parse(clientDataJSON.toString("utf8"));
  if (!consumeChallenge(clientData.challenge, "login") || clientData.type !== "webauthn.get" || !originAllowed(req, clientData.origin)) {
    const err = new Error("Passkey登录验证失败");
    err.status = 400;
    throw err;
  }
  const credentialId = credential.id || toBase64Url(fromBase64Url(credential.rawId));
  const accounts = readPasskeyAccounts();
  const account = accounts.find((item) => (item.credentials || []).some((cred) => cred.id === credentialId));
  const stored = account?.credentials?.find((cred) => cred.id === credentialId);
  if (!account || !stored) {
    const err = new Error("没有找到这个Passkey");
    err.status = 404;
    throw err;
  }
  const authenticatorData = fromBase64Url(credential.response?.authenticatorData);
  const signature = fromBase64Url(credential.response?.signature);
  verifyAuthData(authenticatorData, getRpId(req));
  const signed = Buffer.concat([authenticatorData, crypto.createHash("sha256").update(clientDataJSON).digest()]);
  const publicKey = coseToPublicKey(fromBase64Url(stored.public_key_cose));
  if (!crypto.verify("sha256", signed, publicKey, signature)) {
    const err = new Error("Passkey签名验证失败");
    err.status = 400;
    throw err;
  }
  stored.sign_count = authenticatorData.readUInt32BE(33);
  account.updated_at = new Date().toISOString();
  const deviceHash = hashDeviceToken(payload.device_token);
  if (!Array.isArray(account.device_hashes)) account.device_hashes = [];
  if (deviceHash && !account.device_hashes.includes(deviceHash)) account.device_hashes.push(deviceHash);
  const accountToken = rotateAccountToken(account);
  writePasskeyAccounts(accounts);
  return {
    ok: true,
    account: publicAccount(account),
    account_token: accountToken,
    results: accountResults(account).slice(0, 50).map(publicHistoryItem)
  };
}

function rotateAccountToken(account) {
  const token = randomB64(32);
  account.token_hashes = [hashAccountToken(token), ...(account.token_hashes || [])].slice(0, 5);
  return token;
}

function accountResults(account) {
  const deviceHashes = new Set(account.device_hashes || []);
  return readResults().filter((result) => result.account?.id === account.id || (result.device_hash && deviceHashes.has(result.device_hash)));
}

function parseAttestationObject(buffer) {
  const attestation = cborDecode(buffer);
  const authData = attestation.get("authData");
  if (!Buffer.isBuffer(authData)) throw new Error("Invalid attestation authData");
  const parsed = parseAuthenticatorData(authData);
  return { authData, ...parsed };
}

function parseAuthenticatorData(authData) {
  if (!Buffer.isBuffer(authData) || authData.length < 37) throw new Error("Invalid authenticator data");
  const flags = authData[32];
  const signCount = authData.readUInt32BE(33);
  if (!(flags & 0x01)) throw new Error("User presence missing");
  if (!(flags & 0x40)) return { flags, signCount };
  let offset = 37 + 16;
  const credentialLength = authData.readUInt16BE(offset);
  offset += 2;
  const credentialId = toBase64Url(authData.subarray(offset, offset + credentialLength));
  offset += credentialLength;
  const publicKeyCose = authData.subarray(offset);
  return { flags, signCount, credentialId, publicKeyCose };
}

function verifyAuthData(authData, rpId) {
  const expected = crypto.createHash("sha256").update(rpId).digest();
  if (!crypto.timingSafeEqual(authData.subarray(0, 32), expected)) {
    throw new Error("Passkey RP校验失败");
  }
}

function coseToPublicKey(cose) {
  const key = cborDecode(cose);
  const kty = key.get(1);
  const alg = key.get(3);
  const crv = key.get(-1);
  const x = key.get(-2);
  const y = key.get(-3);
  if (kty !== 2 || alg !== -7 || crv !== 1 || !Buffer.isBuffer(x) || !Buffer.isBuffer(y)) {
    throw new Error("暂只支持ES256 Passkey");
  }
  return crypto.createPublicKey({
    key: { kty: "EC", crv: "P-256", x: toBase64Url(x), y: toBase64Url(y), ext: true },
    format: "jwk"
  });
}

function cborDecode(buffer) {
  const reader = { buffer, offset: 0 };
  return readCborItem(reader);
}

function readCborItem(reader) {
  const first = reader.buffer[reader.offset++];
  const major = first >> 5;
  const additional = first & 0x1f;
  const length = readCborLength(reader, additional);
  if (major === 0) return length;
  if (major === 1) return -1 - length;
  if (major === 2) {
    const value = reader.buffer.subarray(reader.offset, reader.offset + length);
    reader.offset += length;
    return value;
  }
  if (major === 3) {
    const value = reader.buffer.subarray(reader.offset, reader.offset + length).toString("utf8");
    reader.offset += length;
    return value;
  }
  if (major === 4) {
    const arr = [];
    for (let i = 0; i < length; i += 1) arr.push(readCborItem(reader));
    return arr;
  }
  if (major === 5) {
    const map = new Map();
    for (let i = 0; i < length; i += 1) map.set(readCborItem(reader), readCborItem(reader));
    return map;
  }
  if (major === 7) {
    if (additional === 20) return false;
    if (additional === 21) return true;
    if (additional === 22) return null;
  }
  throw new Error(`Unsupported CBOR item: ${major}/${additional}`);
}

function readCborLength(reader, additional) {
  if (additional < 24) return additional;
  if (additional === 24) return reader.buffer[reader.offset++];
  if (additional === 25) {
    const value = reader.buffer.readUInt16BE(reader.offset);
    reader.offset += 2;
    return value;
  }
  if (additional === 26) {
    const value = reader.buffer.readUInt32BE(reader.offset);
    reader.offset += 4;
    return value;
  }
  throw new Error("Unsupported CBOR length");
}

function normalizeTeamName(name) {
  return cleanText(name, 60).replace(/\s+/g, " ");
}

function normalizeTeamKind(kind) {
  return kind === "subtype" ? "subtype" : "main";
}

function cleanTeamCode(code) {
  if (typeof code !== "string") return "";
  return code.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

function makeTeamCode() {
  const alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";
  let code = "";
  for (let i = 0; i < 7; i += 1) code += alphabet[crypto.randomInt(alphabet.length)];
  return code;
}

function createTeam(name, kind = "main") {
  const normalizedName = normalizeTeamName(name);
  const testKind = normalizeTeamKind(kind);
  if (!normalizedName || normalizedName.length < 2) {
    const err = new Error("团队名称至少需要2个字");
    err.status = 400;
    throw err;
  }
  const teams = readTeams();
  const exists = teams.some((team) => team.name.trim().toLowerCase() === normalizedName.toLowerCase());
  if (exists) {
    const err = new Error("团队名称已存在，请换一个名称");
    err.status = 409;
    throw err;
  }
  let code = makeTeamCode();
  while (teams.some((team) => team.code === code)) code = makeTeamCode();
  const now = Date.now();
  const team = {
    id: `T${now.toString(36).toUpperCase()}${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    name: normalizedName,
    code,
    creator_token: crypto.randomBytes(16).toString("hex"),
    test_kind: testKind,
    anonymous: testKind === "subtype",
    created_at: new Date(now).toISOString(),
    expires_at: new Date(now + 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: "active"
  };
  teams.push(team);
  writeTeams(teams);
  return team;
}

function findTeamByCode(code) {
  const cleaned = cleanTeamCode(code);
  return readTeams().find((team) => team.code === cleaned) || null;
}

function isTeamActive(team) {
  return team && team.status === "active" && Date.now() <= Date.parse(team.expires_at);
}

function publicTeam(team) {
  if (!team) return null;
  const testKind = normalizeTeamKind(team.test_kind);
  return {
    name: team.name,
    code: team.code,
    test_kind: testKind,
    anonymous: testKind === "subtype",
    mode_label: testKind === "subtype" ? "团队副型测试（匿名）" : "团队主型测试",
    created_at: team.created_at,
    expires_at: team.expires_at,
    active: isTeamActive(team),
    invite_url: `/t/${team.code}`,
    summary_url: `/team/${team.code}`
  };
}

function publicTeamByCode(code) {
  return publicTeam(findTeamByCode(code));
}

function median(nums) {
  if (!nums.length) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function quantile(nums, q) {
  if (!nums.length) return 0;
  const sorted = [...nums].sort((a, b) => a - b);
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  return sorted[base + 1] == null ? sorted[base] : sorted[base] + rest * (sorted[base + 1] - sorted[base]);
}

function round1(value) {
  return Math.round(value * 10) / 10;
}

function teamSummary(code) {
  const team = findTeamByCode(code);
  if (!team) return null;
  if (normalizeTeamKind(team.test_kind) === "subtype") return teamSubtypeSummary(team);
  const results = readResults()
    .filter((result) => result.team?.code === team.code && MAIN_MODES.has(result.test_mode || "main90") && result.scores)
    .reverse();
  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const stats = {};
  for (const element of elements) {
    const elementScores = results.map((result) => result.scores?.[element]).filter(Boolean);
    const percents = elementScores.map((score) => Number(score.type_percent || 0));
    const yes = results.reduce((sum, result) => sum + Number(result.scores?.[element]?.yes || 0), 0);
    const uncertain = results.reduce((sum, result) => sum + Number(result.scores?.[element]?.uncertain || 0), 0);
    const no = results.reduce((sum, result) => sum + Number(result.scores?.[element]?.no || 0), 0);
    const evidenceRates = elementScores.map((score) => {
      const scoreYes = Number(score.yes || 0);
      const scoreUncertain = Number(score.uncertain || 0);
      const scoreNo = Number(score.no || 0);
      const total = scoreYes + scoreUncertain + scoreNo;
      return {
        yes: total ? scoreYes / total : 0,
        uncertain: total ? scoreUncertain / total : 0,
        no: total ? scoreNo / total : 0
      };
    });
    const sd = stddev(percents);
    const mean = average(percents);
    const med = median(percents);
    const yesRate = average(evidenceRates.map((item) => item.yes));
    const uncertainRate = average(evidenceRates.map((item) => item.uncertain));
    const noRate = average(evidenceRates.map((item) => item.no));
    const disagreement = sd <= 12 ? "低" : sd <= 20 ? "中" : "高";
    const penalty = sd <= 12 ? 0 : sd <= 20 ? 5 : 10;
    const strength = Math.max(0, Math.min(100, round1(mean * 0.45 + med * 0.25 + yesRate * 100 * 0.2 - penalty)));
    stats[element] = {
      element,
      mean: round1(mean),
      median: round1(med),
      sd: round1(sd),
      iqr: round1(quantile(percents, 0.75) - quantile(percents, 0.25)),
      yes,
      uncertain,
      no,
      yes_rate: round1(yesRate * 100),
      uncertain_rate: round1(uncertainRate * 100),
      no_rate: round1(noRate * 100),
      strength,
      disagreement
    };
  }
  const hasTeamConclusion = results.length >= 3;
  const ranked = Object.values(stats).sort((a, b) => b.strength - a.strength);
  const low = [...Object.values(stats)].sort((a, b) => a.strength - b.strength).slice(0, 3);
  const split = Object.values(stats).filter((item) => item.disagreement === "高").sort((a, b) => b.sd - a.sd);
  return {
    kind: "main",
    team: publicTeam(team),
    member_count: results.length,
    sample_note: teamSampleNote(results.length),
    stats,
    dominant_elements: hasTeamConclusion ? ranked.slice(0, 3) : [],
    low_elements: hasTeamConclusion ? low : [],
    split_elements: hasTeamConclusion ? split : [],
    members: []
  };
}

function teamSubtypeSummary(team) {
  const results = readResults()
    .filter((result) => result.team?.code === team.code && SUBTYPE_MODES.has(result.test_mode) && result.subtype_scores)
    .reverse();
  const stats = {};
  for (const key of Object.keys(SUBTYPE_LABELS)) {
    const percents = results.map((result) => Number(result.subtype_scores?.[key]?.percent || 0));
    const sd = stddev(percents);
    stats[key] = {
      key,
      label: SUBTYPE_LABELS[key].name,
      full: SUBTYPE_LABELS[key].full,
      mean: round1(average(percents)),
      median: round1(median(percents)),
      sd: round1(sd),
      iqr: round1(quantile(percents, 0.75) - quantile(percents, 0.25)),
      disagreement: sd <= 10 ? "低" : sd <= 18 ? "中" : "高"
    };
  }
  const hasTeamConclusion = results.length >= 5;
  const ranked = Object.values(stats).sort((a, b) => b.mean - a.mean);
  const split = Object.values(stats).filter((item) => item.disagreement === "高").sort((a, b) => b.sd - a.sd);
  return {
    kind: "subtype",
    anonymous: true,
    team: publicTeam(team),
    member_count: results.length,
    sample_note: teamSubtypeSampleNote(results.length),
    subtype_stats: stats,
    dominant_subtypes: hasTeamConclusion ? ranked.slice(0, 2) : [],
    split_subtypes: hasTeamConclusion ? split : [],
    members: []
  };
}

function teamSampleNote(count) {
  if (count <= 2) return "样本量不足，不建议生成团队结论。";
  if (count <= 4) return "样本量较小，适合作为初步观察。";
  if (count <= 7) return "可以观察团队倾向，但仍建议结合岗位结构复核。";
  return "样本量可用于生成相对稳定的团队总图。";
}

function teamSubtypeSampleNote(count) {
  if (count <= 2) return "样本量不足，不建议生成团队副型结论。";
  if (count <= 4) return "样本量较小，只能观察团队注意力入口的初步方向。";
  if (count <= 7) return "可以观察团队副型倾向，但仍建议结合岗位结构复核。";
  return "样本量可用于生成相对稳定的团队注意力入口分析。";
}

function checkAdmin(req, reqUrl, roles = null) {
  try {
    requireAdmin(req, reqUrl, roles);
    return true;
  } catch {
    return false;
  }
}

function sendJson(res, status, data, headers = {}) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    ...headers
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 5_000_000) {
        req.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        const contentType = String(req.headers["content-type"] || "").toLowerCase();
        if (contentType.includes("application/x-www-form-urlencoded")) {
          resolve(Object.fromEntries(new URLSearchParams(body)));
          return;
        }
        if (contentType.includes("application/json") || !contentType) {
          resolve(body ? JSON.parse(body) : {});
          return;
        }
        resolve({ raw: body });
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function serveStatic(req, res, pathname) {
  let filePath = pathname === "/" ? path.join(PUBLIC_DIR, "index.html") : path.join(PUBLIC_DIR, pathname);
  if (pathname === "/favicon.ico") filePath = path.join(PUBLIC_DIR, "jojo-icon.png");
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    const fallback = path.join(PUBLIC_DIR, "index.html");
    if (!path.extname(pathname) && fs.existsSync(fallback)) {
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-cache, no-store, must-revalidate"
      });
      fs.createReadStream(fallback).pipe(res);
      return;
    }
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  const ext = path.extname(filePath);
  const type = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".m4a": "audio/mp4"
  }[ext] || "application/octet-stream";
  const cacheControl = [".html", ".css", ".js"].includes(ext)
    ? "no-cache, no-store, must-revalidate"
    : "public, max-age=86400";
  res.writeHead(200, { "Content-Type": type, "Cache-Control": cacheControl });
  fs.createReadStream(filePath).pipe(res);
}

function toCsv(results) {
  const header = [
    "created_at", "code", "mode", "team", "team_code", "nickname", "contact", "wechat_nickname", "primary",
    "top_types", "low_types", "subtype_rank", "quality_flags",
    ...[1,2,3,4,5,6,7,8,9].map((n) => `type_${n}`),
    "subtype_social", "subtype_one_to_one", "subtype_self_preservation"
  ];
  const lines = [header.join(",")];
  for (const item of results) {
    const subtypeRank = item.subtype_ranked ? item.subtype_ranked.map((x) => `${x.key}:${x.percent}`).join("|") : "";
    const row = [
      item.created_at,
      item.verification_code,
      item.test_mode || "main90",
      item.team?.name || "",
      item.team?.code || "",
      item.user?.nickname,
      item.user?.contact,
      item.wechat?.nickname,
      item.share?.primary_type,
      item.top_types ? item.top_types.map((x) => x.element).join("|") : "",
      item.low_types ? item.low_types.map((x) => x.element).join("|") : "",
      subtypeRank,
      item.quality_flags ? item.quality_flags.join("|") : "",
      ...[1,2,3,4,5,6,7,8,9].map((n) => item.scores?.[n]?.type_score ?? ""),
      item.subtype_scores?.social?.percent ?? "",
      item.subtype_scores?.one_to_one?.percent ?? "",
      item.subtype_scores?.self_preservation?.percent ?? ""
    ].map(csvCell);
    lines.push(row.join(","));
  }
  return lines.join("\n");
}

function csvCell(value) {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

function filterResults(results, reqUrl) {
  const code = cleanText(reqUrl.searchParams.get("code") || "", 20).toUpperCase();
  const mode = normalizeMode(reqUrl.searchParams.get("mode"));
  const modeRaw = reqUrl.searchParams.get("mode");
  const team = cleanTeamCode(reqUrl.searchParams.get("team") || "");
  const keyword = cleanText(reqUrl.searchParams.get("keyword") || "", 60).toLowerCase();
  return results.filter((item) => {
    if (code && item.verification_code !== code) return false;
    if (modeRaw && (item.test_mode || "main90") !== mode) return false;
    if (team && item.team?.code !== team) return false;
    if (keyword) {
      const haystack = [
        item.user?.nickname,
        item.user?.contact,
        item.user?.source,
        item.team?.name,
        item.verification_code
      ].filter(Boolean).join(" ").toLowerCase();
      if (!haystack.includes(keyword)) return false;
    }
    return true;
  });
}

function qualitySummary(results) {
  const byMode = {};
  const flagCounts = {};
  for (const item of results) {
    const mode = item.test_mode || "main90";
    byMode[mode] = byMode[mode] || {
      mode,
      total: 0,
      flagged: 0,
      avg_answer_count: 0,
      avg_top_gap: 0,
      close_top_count: 0
    };
    const bucket = byMode[mode];
    const flags = item.quality_flags || [];
    bucket.total += 1;
    if (flags.length) bucket.flagged += 1;
    bucket.avg_answer_count += Array.isArray(item.answers) ? item.answers.length : 0;
    const top = item.top_types || [];
    if (top.length >= 2) {
      const gap = Math.abs(Number(top[0].type_percent || 0) - Number(top[1].type_percent || 0));
      bucket.avg_top_gap += gap;
      if (gap <= 5) bucket.close_top_count += 1;
    }
    for (const flag of flags) {
      const key = String(flag).replace(/_[1-9]$/, "");
      flagCounts[key] = (flagCounts[key] || 0) + 1;
    }
  }
  const modes = Object.values(byMode).map((item) => ({
    ...item,
    flagged_rate: item.total ? round1(item.flagged / item.total * 100) : 0,
    close_top_rate: item.total ? round1(item.close_top_count / item.total * 100) : 0,
    avg_answer_count: item.total ? round1(item.avg_answer_count / item.total) : 0,
    avg_top_gap: item.total ? round1(item.avg_top_gap / item.total) : 0
  }));
  const topFlags = Object.entries(flagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([flag, count]) => ({ flag, count }));
  return {
    total: results.length,
    flagged: results.filter((item) => item.quality_flags?.length).length,
    modes,
    top_flags: topFlags
  };
}

function publicHistoryItem(result) {
  return {
    verification_code: result.verification_code,
    created_at: result.created_at,
    test_mode: result.test_mode || "main90",
    mode_label: result.mode_label || MODE_LABELS[result.test_mode || "main90"],
    kind: MAIN_MODES.has(result.test_mode || "main90") ? "main" : SUBTYPE_MODES.has(result.test_mode) ? "subtype" : "other",
    title: result.share?.title || "",
    primary_type: result.share?.primary_type || null,
    team: result.team ? { name: result.team.name, code: result.team.code } : null
  };
}

function findResultByCode(code) {
  const cleaned = cleanText(code || "", 16).toUpperCase();
  if (!cleaned) return null;
  return readResults().find((result) => result.verification_code === cleaned) || null;
}

function combinedReportByCodes(mainCode, subtypeCode) {
  const first = findResultByCode(mainCode);
  const second = findResultByCode(subtypeCode);
  if (!first || !second) {
    const err = new Error("没有找到其中一个编号");
    err.status = 404;
    throw err;
  }
  let main = first;
  let subtype = second;
  if (SUBTYPE_MODES.has(first.test_mode) && MAIN_MODES.has(second.test_mode || "main90")) {
    main = second;
    subtype = first;
  }
  if (!MAIN_MODES.has(main.test_mode || "main90") || !SUBTYPE_MODES.has(subtype.test_mode)) {
    const err = new Error("需要一个主型测试编号和一个副型测试编号");
    err.status = 400;
    throw err;
  }
  if (subtype.test_mode === "team_subtype" || subtype.team?.test_kind === "subtype") {
    const err = new Error("团队副型为匿名汇总，不能生成个人综合报告");
    err.status = 400;
    throw err;
  }
  return {
    main: publicResult(main),
    subtype: publicResult(subtype),
    report: publicReportSummary(buildCombinedReport(main, subtype))
  };
}

function publicReportSummary(report) {
  if (!report) return null;
  return {
    version: report.version || "",
    title: report.title || "",
    focus: report.focus || "",
    summary_cards: Array.isArray(report.summary_cards) ? report.summary_cards.slice(0, 3) : [],
    caution: report.caution || ""
  };
}

function uniqueHistoryItems(results) {
  const seen = new Set();
  const items = [];
  for (const result of results) {
    if (!result?.verification_code || seen.has(result.verification_code)) continue;
    seen.add(result.verification_code);
    items.push(result);
  }
  return items;
}

function sendSvg(res, svg, filename = "team-report.svg") {
  res.writeHead(200, {
    "Content-Type": "image/svg+xml; charset=utf-8",
    "Content-Disposition": `inline; filename="${filename}"`,
    "Content-Length": Buffer.byteLength(svg)
  });
  res.end(svg);
}

function escapeXml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function teamReportSvg(summary) {
  if (summary.kind === "subtype") return teamSubtypeReportSvg(summary);
  const width = 1080;
  const height = 1420;
  const rows = [1,2,3,4,5,6,7,8,9];
  const dominant = summary.dominant_elements.map((item) => `${item.element}号`).join(" / ") || "暂无";
  const low = summary.low_elements.map((item) => `${item.element}号`).join(" / ") || "暂无";
  const split = summary.split_elements.length
    ? summary.split_elements.map((item) => `${item.element}号`).join(" / ")
    : "暂无明显高分化";
  const rowSvg = rows.map((element, index) => {
    const item = summary.stats[element] || {};
    const y = 445 + index * 86;
    const barX = 210;
    const barW = 585;
    const noW = Math.round((item.no_rate || 0) / 100 * barW);
    const uncertainW = Math.round((item.uncertain_rate || 0) / 100 * barW);
    const yesW = Math.max(0, barW - noW - uncertainW);
    const strengthX = 835;
    return `
      <g>
        <text x="86" y="${y + 29}" class="row-label">${element}号</text>
        <rect x="${barX}" y="${y}" width="${barW}" height="32" rx="16" class="track"/>
        <rect x="${barX}" y="${y}" width="${noW}" height="32" rx="16" fill="#f16a78"/>
        <rect x="${barX + noW}" y="${y}" width="${uncertainW}" height="32" fill="#e0be67"/>
        <rect x="${barX + noW + uncertainW}" y="${y}" width="${yesW}" height="32" rx="16" fill="#22b9ae"/>
        <line x1="${barX + barW / 2}" y1="${y - 6}" x2="${barX + barW / 2}" y2="${y + 38}" class="midline"/>
        <text x="${strengthX}" y="${y + 13}" class="metric">强度 ${Math.round(item.strength || 0)}</text>
        <text x="${strengthX}" y="${y + 39}" class="metric-sub">均${Math.round(item.mean || 0)} / ${escapeXml(item.disagreement || "-")}分化</text>
      </g>
    `;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#fff8ed"/>
        <stop offset="0.52" stop-color="#fffdf8"/>
        <stop offset="1" stop-color="#e8fbfb"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" x2="1">
        <stop offset="0" stop-color="#f16a78"/>
        <stop offset="0.52" stop-color="#e0be67"/>
        <stop offset="1" stop-color="#22b9ae"/>
      </linearGradient>
      <style>
        text { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; fill: #142126; letter-spacing: 0; }
        .eyebrow { fill: #147f78; font-size: 24px; font-weight: 850; }
        .title { font-size: 62px; font-weight: 900; }
        .note { fill: #344951; font-size: 25px; font-weight: 560; }
        .pill-text { fill: #344951; font-size: 24px; font-weight: 820; }
        .pill-title { fill: #6f7c80; font-size: 19px; font-weight: 820; }
        .section { fill: #6f7c80; font-size: 23px; font-weight: 850; }
        .row-label { font-size: 26px; font-weight: 880; }
        .metric { font-size: 22px; font-weight: 880; }
        .metric-sub { fill: #6f7c80; font-size: 18px; font-weight: 760; }
        .track { fill: rgba(20,33,38,.08); }
        .midline { stroke: rgba(20,33,38,.38); stroke-width: 3; stroke-linecap: round; }
        .card { fill: rgba(255,255,255,.72); stroke: rgba(20,33,38,.1); }
      </style>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <path d="M740 0 L1080 0 L1080 390 L825 340 Z" fill="#35c7d0" opacity=".12"/>
    <path d="M0 1140 L420 1060 L560 1420 L0 1420 Z" fill="#f16a78" opacity=".10"/>
    <circle cx="886" cy="230" r="138" fill="none" stroke="url(#accent)" stroke-width="5" opacity=".46"/>
    <text x="78" y="102" class="eyebrow">jojo测九型 · 团队报告</text>
    <text x="78" y="178" class="title">${escapeXml(summary.team.name)}</text>
    <text x="78" y="230" class="note">${escapeXml(summary.sample_note)}</text>
    <g>
      <rect x="78" y="285" width="286" height="102" rx="20" class="card"/>
      <text x="108" y="326" class="pill-title">成员样本</text>
      <text x="108" y="365" class="pill-text">${summary.member_count} 人</text>
      <rect x="397" y="285" width="286" height="102" rx="20" class="card"/>
      <text x="427" y="326" class="pill-title">主导元素</text>
      <text x="427" y="365" class="pill-text">${escapeXml(dominant)}</text>
      <rect x="716" y="285" width="286" height="102" rx="20" class="card"/>
      <text x="746" y="326" class="pill-title">分化元素</text>
      <text x="746" y="365" class="pill-text">${escapeXml(split)}</text>
    </g>
    <text x="78" y="420" class="section">1-9号团队证据条：红=否定，黄=不确定，绿=确定，中线=50%</text>
    ${rowSvg}
    <g>
      <rect x="78" y="1248" width="924" height="92" rx="20" class="card"/>
      <text x="108" y="1287" class="pill-title">低位元素</text>
      <text x="108" y="1327" class="pill-text">${escapeXml(low)}</text>
      <text x="670" y="1327" class="metric-sub">生成时间 ${escapeXml(new Date().toISOString().slice(0, 10))}</text>
    </g>
  </svg>`;
}

function teamSubtypeReportSvg(summary) {
  const width = 1080;
  const height = 1120;
  const rows = Object.values(summary.subtype_stats || {});
  const dominant = summary.dominant_subtypes.map((item) => item.label).join(" / ") || "暂无";
  const split = summary.split_subtypes.length
    ? summary.split_subtypes.map((item) => item.label).join(" / ")
    : "暂无明显高分化";
  const rowSvg = rows.map((item, index) => {
    const y = 438 + index * 120;
    const barX = 245;
    const barW = 590;
    const meanW = Math.round((item.mean || 0) / 100 * barW);
    return `
      <g>
        <text x="86" y="${y + 29}" class="row-label">${escapeXml(item.label || item.full || item.key)}</text>
        <rect x="${barX}" y="${y}" width="${barW}" height="32" rx="16" class="track"/>
        <rect x="${barX}" y="${y}" width="${meanW}" height="32" rx="16" fill="url(#accent)"/>
        <line x1="${barX + barW / 2}" y1="${y - 6}" x2="${barX + barW / 2}" y2="${y + 38}" class="midline"/>
        <text x="${barX}" y="${y + 72}" class="metric-sub">中位 ${Math.round(item.median || 0)} · IQR ${Math.round(item.iqr || 0)} · ${escapeXml(item.disagreement || "-")}分化</text>
        <text x="870" y="${y + 29}" class="metric">均${Math.round(item.mean || 0)}</text>
      </g>
    `;
  }).join("");
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0" stop-color="#fff8ed"/>
        <stop offset="0.52" stop-color="#fffdf8"/>
        <stop offset="1" stop-color="#e8fbfb"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" x2="1">
        <stop offset="0" stop-color="#f16a78"/>
        <stop offset="0.52" stop-color="#e0be67"/>
        <stop offset="1" stop-color="#22b9ae"/>
      </linearGradient>
      <style>
        text { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; fill: #142126; letter-spacing: 0; }
        .eyebrow { fill: #147f78; font-size: 24px; font-weight: 850; }
        .title { font-size: 62px; font-weight: 900; }
        .note { fill: #344951; font-size: 25px; font-weight: 560; }
        .pill-text { fill: #344951; font-size: 24px; font-weight: 820; }
        .pill-title { fill: #6f7c80; font-size: 19px; font-weight: 820; }
        .section { fill: #6f7c80; font-size: 23px; font-weight: 850; }
        .row-label { font-size: 26px; font-weight: 880; }
        .metric { font-size: 22px; font-weight: 880; }
        .metric-sub { fill: #6f7c80; font-size: 18px; font-weight: 760; }
        .track { fill: rgba(20,33,38,.08); }
        .midline { stroke: rgba(20,33,38,.38); stroke-width: 3; stroke-linecap: round; }
        .card { fill: rgba(255,255,255,.72); stroke: rgba(20,33,38,.1); }
      </style>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    <path d="M740 0 L1080 0 L1080 330 L820 300 Z" fill="#35c7d0" opacity=".12"/>
    <path d="M0 860 L420 800 L560 1120 L0 1120 Z" fill="#f16a78" opacity=".10"/>
    <circle cx="886" cy="220" r="132" fill="none" stroke="url(#accent)" stroke-width="5" opacity=".46"/>
    <text x="78" y="102" class="eyebrow">jojo测九型 · 团队副型报告（匿名）</text>
    <text x="78" y="178" class="title">${escapeXml(summary.team.name)}</text>
    <text x="78" y="230" class="note">${escapeXml(summary.sample_note)}</text>
    <g>
      <rect x="78" y="285" width="286" height="102" rx="20" class="card"/>
      <text x="108" y="326" class="pill-title">匿名样本</text>
      <text x="108" y="365" class="pill-text">${summary.member_count} 人</text>
      <rect x="397" y="285" width="286" height="102" rx="20" class="card"/>
      <text x="427" y="326" class="pill-title">主导入口</text>
      <text x="427" y="365" class="pill-text">${escapeXml(dominant)}</text>
      <rect x="716" y="285" width="286" height="102" rx="20" class="card"/>
      <text x="746" y="326" class="pill-title">分化入口</text>
      <text x="746" y="365" class="pill-text">${escapeXml(split)}</text>
    </g>
    <text x="78" y="420" class="section">团队副型入口：均值条越长，说明该注意力入口在团队中越常被触发</text>
    ${rowSvg}
    <g>
      <rect x="78" y="860" width="924" height="120" rx="20" class="card"/>
      <text x="108" y="902" class="pill-title">匿名说明</text>
      <text x="108" y="944" class="pill-text">仅展示群体统计，不展示个人成员明细</text>
      <text x="670" y="944" class="metric-sub">生成时间 ${escapeXml(new Date().toISOString().slice(0, 10))}</text>
    </g>
  </svg>`;
}

const QUESTION_BANK = parseQuestions();

const server = http.createServer(async (req, res) => {
  const reqUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  try {
    if (req.method === "GET" && reqUrl.pathname === "/api/session") {
      return sendJson(res, 200, makeSession({
        mode: reqUrl.searchParams.get("mode"),
        team_code: reqUrl.searchParams.get("team")
      }));
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/site-settings") {
      return sendJson(res, 200, { settings: publicSiteSettings() });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/auth/wechat/config") {
      return sendJson(res, 200, wechatAuthConfig(req));
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/auth/me") {
      return sendJson(res, 200, globalAuthStatus(req, reqUrl));
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/auth/wechat/logout") {
      return sendJson(res, 200, { ok: true }, { "Set-Cookie": userCookieHeader("", req, 0) });
    }
    if (req.method === "GET" && reqUrl.pathname === "/auth/wechat/start") {
      const adminInvite = cleanText(reqUrl.searchParams.get("admin_invite") || "", 40).toUpperCase();
      if (adminInvite) {
        const redirect = safeRedirectTarget(req, reqUrl.searchParams.get("redirect") || "/admin.html");
        const next = new URL(redirect, "https://jojo.local");
        next.searchParams.set("invite", adminInvite);
        reqUrl.searchParams.set("redirect", `${next.pathname}${next.search}${next.hash}`);
      }
      return startWechatAuth(req, res, reqUrl);
    }
    if (req.method === "GET" && reqUrl.pathname === "/auth/wechat/callback") {
      return handleWechatCallback(req, res, reqUrl);
    }
    if (reqUrl.pathname === "/auth/wechat/cloudrun/callback" && (req.method === "GET" || req.method === "POST")) {
      return handleWechatCloudrunCallback(req, res, reqUrl);
    }
    if (req.method === "GET" && reqUrl.pathname === "/wechat-login") {
      const html = renderWechatLoginPage(req, {
        title: "微信授权登录",
        subtitle: "授权后自动回到测试。"
      });
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      });
      res.end(html);
      return;
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/event") {
      const payload = await readBody(req);
      return sendJson(res, 200, appendEvent(payload));
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/passkey/register/options") {
      const payload = await readBody(req);
      return sendJson(res, 200, passkeyRegisterOptions(req, payload));
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/passkey/register/verify") {
      const payload = await readBody(req);
      return sendJson(res, 200, verifyPasskeyRegistration(req, payload));
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/passkey/login/options") {
      return sendJson(res, 200, passkeyLoginOptions(req));
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/passkey/login/verify") {
      const payload = await readBody(req);
      return sendJson(res, 200, verifyPasskeyLogin(req, payload));
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/team") {
      const payload = await readBody(req);
      const team = createTeam(payload.name, payload.kind || payload.test_kind);
      return sendJson(res, 200, { team: publicTeam(team), creator_token: team.creator_token });
    }
    if (req.method === "GET" && reqUrl.pathname.startsWith("/api/team/")) {
      const parts = reqUrl.pathname.split("/").filter(Boolean);
      const code = parts[2];
      if (parts[3] === "recent-main") {
        const team = findTeamByCode(code);
        const result = recentReusableMainResult(req, reqUrl, code);
        return sendJson(res, 200, { reusable: publicReusableMainResult(result, team) });
      }
      if (parts[3] === "summary") {
        const summary = teamSummary(code);
        if (!summary) return sendJson(res, 404, { error: "team_not_found" });
        return sendJson(res, 200, summary);
      }
      if (parts[3] === "report.svg") {
        const summary = teamSummary(code);
        if (!summary) return sendJson(res, 404, { error: "team_not_found" });
        return sendSvg(res, teamReportSvg(summary), `enneagram-team-${summary.team.code}.svg`);
      }
      const team = publicTeamByCode(code);
      if (!team) return sendJson(res, 404, { error: "team_not_found" });
      return sendJson(res, 200, { team });
    }
    if (req.method === "POST" && reqUrl.pathname.startsWith("/api/team/")) {
      const parts = reqUrl.pathname.split("/").filter(Boolean);
      const code = parts[2];
      if (parts[3] === "reuse-main") {
        const payload = await readBody(req);
        const team = findTeamByCode(code);
        const source = findResultByCode(payload.source_code);
        const result = cloneMainResultForTeam(source, team, req, reqUrl, payload);
        return sendJson(res, 200, { result: publicResult(result), reused: true });
      }
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/submit") {
      const payload = await readBody(req);
      const result = computeResult(payload, req);
      appendResult(result);
      return sendJson(res, 200, publicResult(result));
    }
    if (req.method === "GET" && reqUrl.pathname.startsWith("/api/result/")) {
      const code = reqUrl.pathname.split("/").pop();
      const item = findResultByCode(code);
      if (!item) return sendJson(res, 404, { error: "not_found" });
      return sendJson(res, 200, publicResult(item));
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/report/combined") {
      return sendJson(res, 200, combinedReportByCodes(
        reqUrl.searchParams.get("main"),
        reqUrl.searchParams.get("subtype")
      ));
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/me/results") {
      const auth = authenticatedUserResults(req, reqUrl);
      if (!auth.account && !auth.wechat) return sendJson(res, 401, { error: "missing_identity" });
      const results = auth.results
        .slice(0, 50)
        .map(publicHistoryItem);
      return sendJson(res, 200, { account: publicAccount(auth.account), wechat: publicWechatAccount(auth.wechat), results });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/auth/me") {
      let account = readAdminAccess(req, reqUrl);
      const adminLoggedOut = parseCookies(req)[ADMIN_LOGOUT_COOKIE] === "1";
      if (!account && !adminLoggedOut) {
        const wechat = findWechatAccountByRequest(req);
        if (wechat) {
          const linked = findAdminAccountByWechatId(wechat.id);
          if (linked && linked.status !== "disabled") {
            linked.last_login_at = new Date().toISOString();
            linked.updated_at = new Date().toISOString();
            const accounts = readAdminAccounts().map((item) => (item.id === linked.id ? linked : item));
            writeAdminAccounts(accounts);
            account = linked;
            const session = createAdminSession(linked, req);
            return sendJson(res, 200, {
              account: publicAdminSelfAccount(linked),
              permissions: publicAdminPermissions(linked)
            }, { "Set-Cookie": session.cookie });
          }
        }
        return sendJson(res, 401, { error: "unauthorized" });
      }
      return sendJson(res, 200, {
        account: publicAdminSelfAccount(account),
        permissions: publicAdminPermissions(account)
      });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/auth/login") {
      const payload = await readBody(req);
      const account = loginAdminAccount(payload);
      const session = createAdminSession(account, req);
      return sendJson(res, 200, {
        account: publicAdminSelfAccount(account),
        permissions: publicAdminPermissions(account)
      }, { "Set-Cookie": session.cookie });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/auth/register") {
      const payload = await readBody(req);
      const account = registerAdminFromInvite(payload, req);
      const session = createAdminSession(account, req);
      return sendJson(res, 200, {
        account: publicAdminSelfAccount(account),
        permissions: publicAdminPermissions(account)
      }, { "Set-Cookie": session.cookie });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/auth/wechat") {
      const payload = await readBody(req);
      const account = loginAdminByWechat(req, payload);
      const session = createAdminSession(account, req);
      return sendJson(res, 200, {
        account: publicAdminSelfAccount(account),
        permissions: publicAdminPermissions(account)
      }, { "Set-Cookie": session.cookie });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/auth/bind-wechat") {
      const account = requireAdmin(req, reqUrl);
      if (!findWechatAccountByRequest(req)) {
        const bindState = createAdminWechatBindState(account);
        return sendJson(res, 401, {
          error: "wechat_not_authorized",
          bind_state: bindState
        });
      }
      const updated = bindAdminAccountWechat(account, req);
      return sendJson(res, 200, {
        account: publicAdminSelfAccount(updated),
        permissions: publicAdminPermissions(updated)
      });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/auth/finish-bind-wechat") {
      const payload = await readBody(req);
      const updated = finishAdminWechatBindFromState(req, payload.bind_state);
      const session = createAdminSession(updated, req);
      return sendJson(res, 200, {
        account: publicAdminSelfAccount(updated),
        permissions: publicAdminPermissions(updated)
      }, { "Set-Cookie": session.cookie });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/auth/logout") {
      revokeAdminSession(req);
      return sendJson(res, 200, { ok: true }, { "Set-Cookie": [clearAdminCookie(req), buildAdminLogoutCookie(req)] });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/dashboard") {
      const account = requireAdmin(req, reqUrl);
      return sendJson(res, 200, buildTeacherDashboard(account));
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/teachers") {
      requireAdmin(req, reqUrl, ["super_admin"]);
      return sendJson(res, 200, { teachers: listAdminTeachers() });
    }
    if (req.method === "PATCH" && reqUrl.pathname.startsWith("/api/admin/teachers/")) {
      const actor = requireAdmin(req, reqUrl, ["super_admin"]);
      const id = reqUrl.pathname.split("/").pop();
      const payload = await readBody(req);
      const teacher = updateAdminTeacher(id, payload, actor);
      return sendJson(res, 200, { teacher: publicAdminAccount(teacher) });
    }
    if (req.method === "DELETE" && reqUrl.pathname.startsWith("/api/admin/teachers/")) {
      const actor = requireAdmin(req, reqUrl, ["super_admin"]);
      const id = reqUrl.pathname.split("/").pop();
      const teacher = removeAdminTeacher(id, actor);
      return sendJson(res, 200, { teacher: publicAdminAccount(teacher) });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/profile") {
      const account = requireAdmin(req, reqUrl);
      const payload = await readBody(req);
      const updated = updateAdminAccountRecord(account.id, payload);
      return sendJson(res, 200, { account: publicAdminSelfAccount(updated) });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/activity/view") {
      const account = requireAdmin(req, reqUrl);
      const payload = await readBody(req);
      const code = cleanText(payload.verification_code || "", 12).toUpperCase();
      if (!code) return sendJson(res, 400, { error: "missing_verification_code" });
      const result = findResultByCode(code);
      if (!result) return sendJson(res, 404, { error: "result_not_found" });
      const record = logTeacherActivity(account, {
        ...publicAdminDashboardActivity(result, "view"),
        action: "view"
      });
      return sendJson(res, 200, { ok: true, record: publicTeacherActivity(record) });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/activity/diagnose") {
      const account = requireAdmin(req, reqUrl);
      const payload = await readBody(req);
      const code = cleanText(payload.verification_code || "", 12).toUpperCase();
      const nickname = cleanAdminText(payload.user_nickname || "", 50);
      if (!code || !nickname) {
        return sendJson(res, 400, { error: "missing_fields" });
      }
      const result = findResultByCode(code);
      if (!result) return sendJson(res, 404, { error: "result_not_found" });
      if (account.role !== "super_admin" && !resultMatchesDiagnosisNickname(result, nickname)) {
        return sendJson(res, 403, { error: "nickname_mismatch" });
      }
      const record = logTeacherActivity(account, {
        ...publicAdminDashboardActivity(result, "diagnose"),
        action: "diagnose",
        diagnosis_nickname: nickname
      });
      return sendJson(res, 200, {
        ok: true,
        record: publicTeacherActivity(record),
        result: publicResult(result)
      });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/invites") {
      requireAdmin(req, reqUrl, ["super_admin"]);
      return sendJson(res, 200, { invites: listAdminInvites() });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/invites") {
      const actor = requireAdmin(req, reqUrl, ["super_admin"]);
      const payload = await readBody(req);
      const invite = createAdminInvite(payload, actor);
      return sendJson(res, 200, { invite: publicAdminInvite(invite) });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/users") {
      requireAdmin(req, reqUrl, ["super_admin"]);
      const users = listAdminUsers(reqUrl.searchParams.get("keyword") || "");
      return sendJson(res, 200, { users: users.map(({ account, results, search_text, ...item }) => item) });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/site-settings") {
      requireAdmin(req, reqUrl, ["super_admin"]);
      return sendJson(res, 200, { settings: publicSiteSettings() });
    }
    if (req.method === "POST" && reqUrl.pathname === "/api/admin/site-settings") {
      const actor = requireAdmin(req, reqUrl, ["super_admin"]);
      const payload = await readBody(req);
      return sendJson(res, 200, { settings: publicSiteSettings(updateSiteSettings(payload, actor)) });
    }
    if (req.method === "GET" && reqUrl.pathname.startsWith("/api/admin/users/")) {
      requireAdmin(req, reqUrl, ["super_admin"]);
      const id = reqUrl.pathname.split("/").pop();
      const detail = findAdminUserDetails(id);
      if (!detail) return sendJson(res, 404, { error: "user_not_found" });
      return sendJson(res, 200, detail);
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/results") {
      if (!checkAdmin(req, reqUrl, ["super_admin"])) return sendJson(res, 401, { error: "unauthorized" });
      const results = filterResults(readResults(), reqUrl);
      return sendJson(res, 200, {
        quality: qualitySummary(results),
        results: results.slice(0, 300)
      });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/teams") {
      if (!checkAdmin(req, reqUrl, ["super_admin"])) return sendJson(res, 401, { error: "unauthorized" });
      const counts = new Map();
      for (const result of readResults()) {
        if (!result.team?.code) continue;
        counts.set(result.team.code, (counts.get(result.team.code) || 0) + 1);
      }
      return sendJson(res, 200, {
        teams: readTeams().map((team) => ({
          ...publicTeam(team),
          member_count: counts.get(team.code) || 0
        })).reverse()
      });
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/events") {
      if (!checkAdmin(req, reqUrl, ["super_admin"])) return sendJson(res, 401, { error: "unauthorized" });
      return sendJson(res, 200, eventSummary());
    }
    if (req.method === "GET" && reqUrl.pathname === "/api/admin/export.csv") {
      if (!checkAdmin(req, reqUrl, ["super_admin"])) return sendJson(res, 401, { error: "unauthorized" });
      const csv = toCsv(filterResults(readResults(), reqUrl).reverse());
      res.writeHead(200, {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": "attachment; filename=\"enneagram-results.csv\""
      });
      return res.end(csv);
    }
    return serveStatic(req, res, decodeURIComponent(reqUrl.pathname));
  } catch (err) {
    const status = Number.isInteger(err.status) ? err.status : 500;
    if (status >= 500) console.error(err);
    return sendJson(res, status, { error: err.message || "server_error" });
  }
});

function publicResult(result) {
  if (result?.team?.test_kind === "subtype" || result?.test_mode === "team_subtype") {
    return publicTeamSubtypeSubmission(result);
  }
  const team = result.team ? {
    name: result.team.name,
    code: result.team.code,
    test_kind: result.team.test_kind,
    anonymous: Boolean(result.team.anonymous),
    mode_label: result.team.mode_label || "",
    expires_at: result.team.expires_at || "",
    active: result.team.active,
    summary_url: result.team.summary_url || (result.team.code ? `/team/${result.team.code}` : "")
  } : null;
  return {
    session_id: result.session_id,
    test_mode: result.test_mode || "main90",
    mode_label: result.mode_label || MODE_LABELS[result.test_mode || "main90"],
    verification_code: result.verification_code,
    created_at: result.created_at,
    scores: result.scores,
    top_types: result.top_types,
    low_types: result.low_types,
    subtype_scores: result.subtype_scores,
    subtype_ranked: result.subtype_ranked,
    subtype_confidence: result.subtype_confidence,
    quality_flags: result.quality_flags,
    report: publicReportSummary(result.report),
    share: result.share,
    account: null,
    wechat: null,
    team,
    reused_from: result.reused_from || null
  };
}

function publicTeamSubtypeSubmission(result) {
  const team = result.team ? {
    name: result.team.name,
    code: result.team.code,
    test_kind: result.team.test_kind || "subtype",
    anonymous: true,
    mode_label: result.team.mode_label || MODE_LABELS.team_subtype,
    expires_at: result.team.expires_at || "",
    active: result.team.active,
    summary_url: result.team.summary_url || (result.team.code ? `/team/${result.team.code}` : "")
  } : null;
  return {
    session_id: result.session_id,
    test_mode: result.test_mode || "team_subtype",
    mode_label: result.mode_label || MODE_LABELS.team_subtype,
    verification_code: result.verification_code,
    created_at: result.created_at,
    quality_flags: result.quality_flags || [],
    report: {
      version: "1.0",
      title: "已计入团队副型汇总",
      focus: "本次为匿名团队副型测试，只进入团队层面的注意力入口统计。",
      summary_cards: [
        { label: "提交状态", value: "已匿名计入", text: "页面不展示个人副型排序。" },
        { label: "团队", value: result.team?.name || "团队", text: "老师端查看团队层面的汇总结果。" },
        { label: "隐私", value: "匿名汇总", text: "不把个人副型明细作为结果页公开。" }
      ],
      caution: "团队副型用于观察群体倾向，不用于评价单个成员。"
    },
    share: {
      primary_type: "team_subtype",
      title: "已计入团队副型汇总",
      line: "这一份只进入团队总图，不展示个人排序。",
      summary: "匿名汇总，保护个人明细。"
    },
    account: null,
    wechat: null,
    team,
    anonymous: true,
    reused_from: result.reused_from || null
  };
}

ensureDataFiles();
ensureAdminBootstrapAccount();
const SUBTYPE_BANKS = JSON.parse(fs.readFileSync(SUBTYPE_FILE, "utf8"));
server.listen(PORT, () => {
  console.log(`jojo测九型 H5 running at http://localhost:${PORT}`);
  if (ADMIN_KEY && !ALLOW_LEGACY_ADMIN_KEY) console.log("Legacy ADMIN_KEY is configured but disabled.");
});
