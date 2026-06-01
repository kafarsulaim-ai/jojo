const TYPE_NAMES = {
  1: "标准校准者",
  2: "关系支持者",
  3: "目标推进者",
  4: "感受辨识者",
  5: "信息分析者",
  6: "风险预案者",
  7: "可能性探索者",
  8: "边界守护者",
  9: "和谐协调者"
};

const TYPE_RESULT_LINES = {
  1: "重点关注标准、原则和改进空间，常会主动把事情校准到更可靠。",
  2: "重点关注关系里的需要和回应，常会通过支持他人建立连接。",
  3: "重点关注目标、效率和成果反馈，常会把行动推向可见结果。",
  4: "重点关注真实感、独特性和情绪细节，常能捕捉深层感受。",
  5: "重点关注信息、边界和理解框架，常会先看清结构再投入。",
  6: "重点关注安全感、可信度和风险预案，常会提前验证和准备。",
  7: "重点关注可能性、选择感和新鲜出口，常能打开新的方向。",
  8: "重点关注主动权、边界和保护，常在关键时刻直接扛事。",
  9: "重点关注和谐、稳定和冲突降噪，常能把局面先缓下来。"
};

const TYPE_IDENTITY_LINES = {
  1: "把标准放在心里，也把世界一点点调顺。",
  2: "很会捕捉关系里的需要，也容易把连接看得很重。",
  3: "自带推进感，目标一清楚就会开始往前跑。",
  4: "对真实感很敏锐，不太愿意把自己活成模板。",
  5: "先理解，再投入；脑内常有一间安静资料室。",
  6: "会提前看风险，也很在意这件事到底靠不靠谱。",
  7: "总能看到新出口，生活不能只剩一种打开方式。",
  8: "边界感和行动力都很明显，关键时刻会站出来。",
  9: "擅长给现场降噪，也容易先把关系和局面稳住。"
};

const TYPE_PERSONA_NAMES = {
  1: "人间校准仪",
  2: "关系补给站",
  3: "进度推进器",
  4: "真实感捕手",
  5: "信息整理师",
  6: "安全预案官",
  7: "可能性雷达",
  8: "边界守护者",
  9: "气氛降噪师"
};

const TYPE_ANALYSIS = {
  1: {
    focus: "核心在标准、原则和改进感。你会自然看见哪里还能更好，也容易把责任感放在前面。",
    motive: "把事情做对",
    strength: "校准标准，发现漏洞",
    pressure: "不合理会被放大",
    relation: "讲清标准会更安心"
  },
  2: {
    focus: "核心在关系、回应和被需要。你很容易看见别人的需求，也会通过支持建立连接。",
    motive: "确认连接存在",
    strength: "接住情绪，补位支持",
    pressure: "容易先证明自己有用",
    relation: "真诚回应比客套更重要"
  },
  3: {
    focus: "核心在目标、效率和成果反馈。你会把注意力放在可见进展上，也擅长推动局面往前。",
    motive: "把结果做出来",
    strength: "定目标，提速度，拿结果",
    pressure: "容易用忙碌压住感受",
    relation: "看见努力会很补能"
  },
  4: {
    focus: "核心在真实感、独特性和深层感受。你会捕捉细微变化，也在意自己是否被真正理解。",
    motive: "活得真实有意义",
    strength: "识别感受，创造表达",
    pressure: "容易被缺失感牵动",
    relation: "先理解，再建议"
  },
  5: {
    focus: "核心在理解、边界和信息掌控。你倾向先看清结构，再决定投入多少精力。",
    motive: "先弄明白再进入",
    strength: "拆解复杂，建立框架",
    pressure: "容易退回观察位",
    relation: "给空间，比催促有效"
  },
  6: {
    focus: "核心在安全感、可信度和风险预案。你会提前看见不确定，也会为重要事情准备备选方案。",
    motive: "确认这事靠谱",
    strength: "预判风险，稳住系统",
    pressure: "容易进入预案循环",
    relation: "确定感和解释很重要"
  },
  7: {
    focus: "核心在可能性、选择感和新鲜出口。你会主动寻找新的路径，也很怕生活只剩一种答案。",
    motive: "保留更多可能",
    strength: "打开局面，带来活力",
    pressure: "容易快速寻找出口",
    relation: "别把选择感一次锁死"
  },
  8: {
    focus: "核心在边界、主动权和保护。你会在关键时刻扛事，也不太喜欢被绕弯控制。",
    motive: "守住边界和主动权",
    strength: "直接决断，保护弱处",
    pressure: "容易先进入掌控模式",
    relation: "直接坦诚最省力"
  },
  9: {
    focus: "核心在稳定、和谐和冲突降噪。你会自然缓和现场，也容易把自己的需要放到后面。",
    motive: "让关系和局面稳下来",
    strength: "整合差异，降低冲突",
    pressure: "容易先顺着局面走",
    relation: "慢慢问，认真听"
  }
};

const SUBTYPE_IDENTITY_LINES = {
  social: "先看自己在关系网、团队和群体里的位置。",
  one_to_one: "更容易被关键关系、强连接和真实回应点亮。",
  self_preservation: "会优先照顾节奏、资源、身体感和基本盘。"
};

const SUBTYPE_PERSONA_NAMES = {
  social: "关系雷达",
  one_to_one: "连接火花",
  self_preservation: "安定派"
};

const SUBTYPE_PARENT_LINES = {
  social: "孩子会更在意同伴、归属和自己在小集体里的位置。",
  one_to_one: "孩子更容易被一对一的陪伴、回应和专属感点亮。",
  self_preservation: "孩子更需要稳定节奏、熟悉环境和可预期的照顾。"
};

const FLAG_COPY = {
  straight_line_risk: "本次出现连续同类选择，建议老师结合访谈确认是否存在快速作答。",
  uncertainty_risk: "不确定选项偏多，结果适合先看方向，不宜直接定型。",
  moderate_uncertainty_risk: "不确定选项略多，可以把前三型作为重点访谈范围。",
  over_agree_risk: "整体同意偏高，可能混入理想自我或近期状态影响。",
  soft_agree_risk: "整体偏向认同，解读时可多核对反向题和情境题。",
  over_deny_risk: "整体否认偏高，可能存在防御性作答或题意距离感。",
  low_variance_risk: "答案波动较低，建议不要只依据单次结果下结论。",
  close_top_three_risk: "前三型距离很近，适合由老师结合关键场景二次校准。",
  virtue_bias_risk: "结果中可能存在美德化作答，需要区分真实动机和理想形象。",
  competence_persona_risk: "能力与掌控相关元素偏高，建议追问压力下的核心担心。",
  prosocial_persona_risk: "关系友好相关元素偏高，建议核对边界、愤怒和真实需求表达。",
  reverse_consistency_risk: "正向题与反向题存在差异，建议老师优先核对该元素是否被理想形象影响。",
  scenario_mismatch_risk: "直接认同与情境选择存在差异，建议从真实场景里确认该元素。"
};

const MODE_COPY = {
  main90: {
    eyebrow: "选择测试入口",
    line: "先选地图。",
    button: "开始测试",
    testBadge: "主型快测",
    testTitle: "按第一反应选",
    testHint: "按最近真实反应选"
  },
  main180: {
    eyebrow: "专业深测入口",
    line: "深一点。",
    button: "开始测试",
    testBadge: "主型深测",
    testTitle: "慢一点也没关系",
    testHint: "慢一点也没关系"
  },
  main270: {
    eyebrow: "专业深测入口",
    line: "深一点。",
    button: "开始测试",
    testBadge: "主型深测",
    testTitle: "慢一点也没关系",
    testHint: "慢一点也没关系"
  },
  subtype_adult: {
    eyebrow: "副型补充入口",
    line: "补一张入口图。",
    button: "开始测试",
    testBadge: "个人副型",
    testTitle: "看注意力入口",
    testHint: "看第一、第二副型排序"
  },
  subtype_child: {
    eyebrow: "亲子观察入口",
    line: "给孩子看入口。",
    button: "开始测试",
    testBadge: "少儿副型",
    testTitle: "按近三个月状态选",
    testHint: "按近三个月状态选"
  },
  team_subtype: {
    eyebrow: "匿名团队副型测试",
    line: "匿名汇总。",
    button: "开始测试",
    testBadge: "团队副型",
    testTitle: "匿名提交",
    testHint: "只看团队整体，不看个人明细"
  }
};

const SUBTYPE_NAMES = {
  social: "社群型",
  one_to_one: "一对一型",
  self_preservation: "自保型"
};

const SUBTYPE_SHORT_NAMES = {
  social: "社群",
  one_to_one: "一对一",
  self_preservation: "自保"
};

const TEN_DAYS_MS = 10 * 24 * 60 * 60 * 1000;

const RESULT_TRANSLATIONS = {
  1: {
    friend: "你以为我在挑刺，其实我在帮世界恢复出厂设置。",
    work: "我适合把标准、流程和风险点捋清楚。",
    pressure: "压力一来，先盯住不合理的地方。",
    near: "讲清标准",
    avoid: "别糊弄",
    charge: "把事情做对"
  },
  2: {
    friend: "你以为我太会照顾人，其实我在确认我们有没有真的连上。",
    work: "我擅长看见谁需要支持，把关系温度接住。",
    pressure: "压力一来，容易先证明自己有用。",
    near: "真诚回应",
    avoid: "只索取不回应",
    charge: "被需要也被珍惜"
  },
  3: {
    friend: "你以为我在卷，其实我在把人生进度条往前推。",
    work: "目标和节奏一清楚，我会自动进入推进模式。",
    pressure: "压力一来，先想快点做出成果。",
    near: "说清目标",
    avoid: "空谈不落地",
    charge: "看见我的努力"
  },
  4: {
    friend: "你以为我想太多，其实我在给感受做高清修复。",
    work: "我擅长捕捉细节、审美和事情的意义感。",
    pressure: "压力一来，更怕真实感被糊掉。",
    near: "允许真实",
    avoid: "敷衍我的感受",
    charge: "被理解而不是被修理"
  },
  5: {
    friend: "你以为我冷，其实我在后台加载世界说明书。",
    work: "给我空间和资料，我能把复杂问题拆清楚。",
    pressure: "压力一来，先退回观察位省电。",
    near: "给足空间",
    avoid: "突然情绪轰炸",
    charge: "安静研究到想明白"
  },
  6: {
    friend: "你以为我想太多，其实我在提前装安全气囊。",
    work: "我会预判风险、准备备选方案。",
    pressure: "压力一来，容易进入预案宇宙。",
    near: "给确定感",
    avoid: "临时变卦不解释",
    charge: "有人一起扛风险"
  },
  7: {
    friend: "你以为我在玩，其实我在给生活开新地图。",
    work: "我擅长带来可能性、创意和气氛。",
    pressure: "压力一来，先找出口和新鲜感。",
    near: "保留可能性",
    avoid: "把我困在无聊里",
    charge: "有趣、有路、有下一站"
  },
  8: {
    friend: "你以为我太强势，其实我在确认谁别被欺负。",
    work: "关键时刻我会撑边界、做决断。",
    pressure: "压力一来，保护和掌控会先上线。",
    near: "直接坦诚",
    avoid: "绕弯和暗控",
    charge: "并肩作战，别让我一个人扛"
  },
  9: {
    friend: "你以为我没意见，其实我在给现场降噪。",
    work: "我擅长缓和气氛、整合差异。",
    pressure: "压力一来，先想稳住和平。",
    near: "慢慢问我真想法",
    avoid: "逼我立刻表态",
    charge: "舒服的节奏和被认真听见"
  }
};

const LATEST_MAIN_KEY = "enneagramLatestMainCode";
const LATEST_SUBTYPE_KEY = "enneagramLatestSubtypeCode";
const PENDING_MAIN_KEY = "enneagramPendingMainCode";
const SOUND_KEY = "jojoSoundEnabled";
const DRAFT_KEY = "jojoDraftSession";
const ANALYTICS_SESSION_KEY = "jojoAnalyticsSession";
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;
const REWARD_SOUND_COUNT = 18;
const ANSWER_OPTIONS = [
  { value: 1, label: "否" },
  { value: 3, label: "不确定" },
  { value: 5, label: "是" }
];

const GROUP_LINES = [
  "轻轻开始，先别把自己审太严",
  "第一反应先上车，分析等会儿再来",
  "不用答成满分人格，像你就行",
  "有点犹豫很正常，人又不是直线",
  "中场补口气，jojo给你递水",
  "别卷答案，真实比漂亮更值钱",
  "不想答了也懂，再往前一点点",
  "这不是高考，是给自己开地图",
  "你的大脑小剧场，jojo正在记笔记",
  "快到下一站了，别突然人设管理",
  "慢一点也算前进，系统都给你存着",
  "收尾别硬撑，按最近的自己来"
];

const RESULT_FEEDBACK_COPY = {
  fit: "收到。这个“挺像”，会帮助jojo继续校准。",
  unsure: "收到。拿不准也很正常，可以带着编号找老师复核。",
  helpful: "收到。先把它当作亲子观察入口，慢慢看就好。",
  review: "收到。少儿结果更建议结合年龄、家庭互动和老师复核。"
};

const SHARE_ASSET_CACHE = new Map();

const INFO_PAGES = {
  method: {
    route: "/method",
    eyebrow: "方法说明",
    title: "jojo如何生成这张地图",
    lead: "我们把测试结果当作一张可复核的地图：先看长期动机，再看状态、场景和作答质量。",
    cards: [
      { title: "主型不是标签", body: "主型用于观察一个人长期反复出现的核心关注点，不用于判断好坏、能力或命运。" },
      { title: "先看证据，再看解释", body: "系统会同时保留1-9号分数、是/不确定/否分布、前三接近程度和质量标记，方便老师复核。" },
      { title: "网页报告只给基础解读", body: "网页自动生成的是用户可读版本；更细的主型、副型、三元组和职场投射，建议由老师结合访谈完成。" }
    ]
  },
  calibration: {
    route: "/calibration",
    eyebrow: "题库与校准",
    title: "题库怎么降低“看穿题目”的偏差",
    lead: "题库采用正向题、反向题和情境题混合，并从270题母库中抽取专业深测题，减少单一作答习惯带来的误差。",
    cards: [
      { title: "90题与180题", body: "90题适合快速生成主型地图；180题来自270题母库抽取，更适合做老师复核前的深测。" },
      { title: "质量标记", body: "连续同选、不确定过多、全盘认同、过度否认、正反题差异等情况会被标记为需复核。" },
      { title: "持续校准", body: "后台会观察不同版本的完成率、质量标记率、前三接近率和90/180稳定性差异，用真实样本继续调整。" }
    ]
  },
  notice: {
    route: "/notice",
    eyebrow: "非诊断声明",
    title: "这是一张探索地图，不是诊断书",
    lead: "jojo测九型用于自我理解、沟通和咨询参考，不构成心理诊断、医学建议、招聘淘汰、绩效评估或管理决策依据。",
    cards: [
      { title: "不直接定型", body: "所有结果都应该使用“倾向、可能、需要验证”的表达，尤其在前三接近或质量标记出现时。" },
      { title: "状态会影响结果", body: "近期压力、关系事件、工作角色和作答理解都会影响分数，因此建议结合真实场景复核。" },
      { title: "团队数据看群体", body: "团队测试用于观察群体倾向和分化，不用于公开评价某个成员；团队副型默认匿名汇总。" }
    ]
  }
};

const screens = {
  start: document.getElementById("startScreen"),
  test: document.getElementById("testScreen"),
  result: document.getElementById("resultScreen"),
  history: document.getElementById("historyScreen"),
  combined: document.getElementById("combinedScreen"),
  info: document.getElementById("infoScreen"),
  team: document.getElementById("teamScreen")
};

const state = {
  session: null,
  currentIndex: 0,
  answers: {},
  shownMilestones: new Set(),
  user: {},
  startedAt: null,
  pendingAfterModal: null,
  moving: false,
  result: null,
  mode: "main90",
  team: null,
  createdTeam: null,
  currentTeamSummary: null,
  reusableTeamMain: null,
  deviceToken: "",
  accountToken: "",
  account: null,
  adminAccount: null,
  adminPermissions: {},
  emailAuthMode: "login",
  startAuthMode: "login",
  pendingMainCode: "",
  soundEnabled: localStorage.getItem(SOUND_KEY) !== "off",
  audioContext: null,
  audioUnlocked: false,
  mediaSounds: new Map(),
  mediaAudioPrimed: false,
  silentAudio: null,
  silentAudioReady: false,
  rewardPlayedAt: 0,
  lastQuestionIndex: -1,
  navDirection: 1,
  analyticsSession: "",
  generatingTimers: [],
  recoveryMarkerConfirmed: false,
  resultEnteredAt: 0,
  resultDwellCode: "",
  siteSettings: null,
  historyHasResults: false,
  saveNoticeTimer: null,
  saveToastTimer: null
};

const $ = (id) => document.getElementById(id);
const wait = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));
const byId = (id) => document.getElementById(id);

function setMessage(id, text) {
  const element = $(id);
  if (element) element.textContent = text || "";
}

document.addEventListener("DOMContentLoaded", () => {
  installMobileGuards();
  installAudioUnlock();
  preloadMediaSounds();
  state.deviceToken = ensureDeviceToken();
  state.accountToken = localStorage.getItem("enneagramAccountToken") || "";
  const savedAccount = localStorage.getItem("enneagramAccount");
  if (savedAccount) {
    try { state.account = JSON.parse(savedAccount); } catch { state.account = null; }
  }
  $("profileForm").addEventListener("submit", startTest);
  $("modeGrid").addEventListener("click", onModeClick);
  $("teamCreateForm").addEventListener("submit", createTeam);
  $("historyButton").addEventListener("click", openHistory);
  $("groupChatButton").addEventListener("click", openGroupChatModal);
  $("groupChatCloseButton").addEventListener("click", closeGroupChatModal);
  $("historyBackButton").addEventListener("click", () => showScreen("start"));
  $("combinedForm").addEventListener("submit", submitCombinedForm);
  $("combinedBackButton").addEventListener("click", openHistory);
  $("combinedPrintButton").addEventListener("click", () => saveVisibleShareCards("combined"));
  $("emailLoginToggleButton").addEventListener("click", toggleEmailPanel);
  $("emailLogoutButton").addEventListener("click", logoutEmailAccount);
  $("emailAuthForm").addEventListener("submit", submitEmailAuth);
  document.querySelectorAll("[data-email-mode]").forEach((button) => {
    button.addEventListener("click", () => setEmailAuthMode(button.dataset.emailMode || "login"));
  });
  $("startAuthOpenEmailButton").addEventListener("click", openStartAuthEmailForm);
  $("startAuthDirectButton").addEventListener("click", continueStartWithoutAccount);
  $("startAuthDirectInlineButton").addEventListener("click", continueStartWithoutAccount);
  $("startAuthCloseButton").addEventListener("click", closeStartAuthModal);
  $("startAuthForm").addEventListener("submit", submitStartAuth);
  document.querySelectorAll("[data-start-auth-mode]").forEach((button) => {
    button.addEventListener("click", () => setStartAuthMode(button.dataset.startAuthMode || "login"));
  });
  $("lookupForm").addEventListener("submit", lookupResult);
  $("historyList").addEventListener("click", onHistoryClick);
  $("answerGrid").addEventListener("click", onAnswerClick);
  $("backButton").addEventListener("click", goBack);
  $("pauseButton").addEventListener("click", pauseAndReturn);
  $("resumeContinueButton").addEventListener("click", resumeDraft);
  $("resumeDiscardButton").addEventListener("click", discardDraft);
  $("modalContinue").addEventListener("click", closeEncouragement);
  $("markerSkipButton").addEventListener("click", skipRecoveryMarker);
  $("markerResumeButton").addEventListener("click", resumeFromRecoveryMarker);
  $("markerRestartButton").addEventListener("click", restartFromRecoveryMarker);
  $("teamCopyInviteButton").addEventListener("click", copyCreatedTeamInvite);
  $("teamStartTestButton").addEventListener("click", startCreatedTeamTest);
  $("teamReuseConfirmButton").addEventListener("click", confirmReuseTeamMain);
  $("teamReuseRetestButton").addEventListener("click", retestTeamMain);
  $("shareImageCloseButton").addEventListener("click", closeShareImageModal);
  $("soundToggleButton").addEventListener("click", toggleSound);
  byId("copyCodeButton")?.addEventListener("click", copyVerificationCode);
  byId("shareSaveButton")?.addEventListener("click", saveShareCard);
  byId("restartButton")?.addEventListener("click", () => window.location.reload());
  byId("combineFromResultButton")?.addEventListener("click", openCombinedFromResult);
  byId("resultTeamButton")?.addEventListener("click", openResultTeamEntry);
  byId("resultHistoryButton")?.addEventListener("click", openHistory);
  byId("resultGroupChatButton")?.addEventListener("click", openGroupChatModal);
  byId("resultFeedback")?.addEventListener("click", onResultFeedback);
  byId("teamCopyInviteLinkButton")?.addEventListener("click", copyCurrentTeamInvite);
  byId("teamGroupChatButton")?.addEventListener("click", openGroupChatModal);
  byId("teamImageLink")?.addEventListener("click", (event) => {
    if (event.currentTarget?.getAttribute("aria-disabled") === "true") event.preventDefault();
  });
  $("methodButton").addEventListener("click", () => showInfo("method"));
  $("calibrationButton").addEventListener("click", () => showInfo("calibration"));
  $("noticeButton").addEventListener("click", () => showInfo("notice"));
  $("infoBackButton").addEventListener("click", () => {
    window.history.replaceState(null, "", "/");
    showScreen("start");
  });
  window.addEventListener("beforeunload", trackPotentialAbandon);
  window.addEventListener("beforeunload", () => trackResultDwell({ beacon: true }));
  state.analyticsSession = ensureAnalyticsSession();
  updateEmailStatus();
  loadAuthStatus();
  loadSiteSettings();
  loadSiteStats();
  bootFromRoute().then(() => {
    renderResumeCard();
    trackEvent("page_open", { route: window.location.pathname || "/" });
  });
  exposeLocalSoundTester();
});

function installMobileGuards() {
  if (isCoarsePointer() || "ontouchstart" in window) {
    document.documentElement.classList.add("touch-device");
  }
  const preventGestureZoom = (event) => event.preventDefault();
  document.addEventListener("gesturestart", preventGestureZoom, { passive: false });
  document.addEventListener("gesturechange", preventGestureZoom, { passive: false });
  let lastTouchEnd = 0;
  document.addEventListener("touchend", (event) => {
    const target = event.target;
    const editable = target?.closest?.("input, textarea, select, [contenteditable='true']");
    const now = Date.now();
    if (!editable && now - lastTouchEnd < 320) event.preventDefault();
    lastTouchEnd = now;
  }, { passive: false });
}

function installAudioUnlock() {
  const unlock = () => unlockAudio();
  window.addEventListener("pointerdown", unlock, { passive: true });
  window.addEventListener("touchstart", unlock, { passive: true });
}

function unlockAudio() {
  if (!state.soundEnabled) return;
  startSilentAudioBridge();
  primeMediaAudio();
  const ctx = getAudioContext();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  state.audioUnlocked = true;
}

async function bootFromRoute() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  const routeParams = new URLSearchParams(window.location.search);
  if (!parts.length && routeParams.get("start") === "1") {
    const requestedMode = routeParams.get("mode") || "main90";
    const requestedTeam = routeParams.get("team") || "";
    if (MODE_COPY[requestedMode]) setMode(requestedMode);
    if (requestedTeam) {
      $("teamCodeInput").value = requestedTeam.trim().toUpperCase();
      $("joinTeamInput").checked = true;
    }
    window.history.replaceState(null, "", "/");
    state.recoveryMarkerConfirmed = true;
    await beginTest();
    return;
  }
  if (!parts.length && routeParams.get("view") === "history") {
    await openHistory();
    window.history.replaceState(null, "", "/");
    return;
  }
  if (parts[0] === "result" && parts[1]) {
    await loadResultByCode(parts[1]);
    return;
  }
  if (parts[0] === "t" && parts[1]) {
    await loadTeamInvite(parts[1]);
    return;
  }
  if (parts[0] === "team" && parts[1]) {
    await loadTeamSummary(parts[1]);
    return;
  }
  if (parts[0] === "combine") {
    const params = new URLSearchParams(window.location.search);
    const main = params.get("main") || parts[1] || "";
    const subtype = params.get("subtype") || parts[2] || "";
    $("combinedMainInput").value = main.toUpperCase();
    $("combinedSubtypeInput").value = subtype.toUpperCase();
    if (main && subtype) await loadCombinedReport(main, subtype);
  }
  if (parts[0] === "method") showInfo("method", { replace: true });
  if (parts[0] === "calibration") showInfo("calibration", { replace: true });
  if (parts[0] === "notice") showInfo("notice", { replace: true });
}

function showInfo(kind, options = {}) {
  const page = INFO_PAGES[kind] || INFO_PAGES.method;
  $("infoEyebrow").textContent = page.eyebrow;
  $("infoTitle").textContent = page.title;
  $("infoLead").textContent = page.lead;
  $("infoContent").innerHTML = page.cards.map((card) => `
    <article class="info-card">
      <strong>${escapeHtml(card.title)}</strong>
      <p>${escapeHtml(card.body)}</p>
    </article>
  `).join("");
  if (!options.replace) window.history.replaceState(null, "", page.route);
  showScreen("info");
  trackEvent("info_view", { kind });
}

function ensureDeviceToken() {
  const key = "enneagramDeviceToken";
  const existing = localStorage.getItem(key);
  if (existing) return existing;
  const token = window.crypto?.randomUUID
    ? window.crypto.randomUUID().replace(/-/g, "")
    : `D${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`;
  localStorage.setItem(key, token);
  return token;
}

function ensureAnalyticsSession() {
  const existing = localStorage.getItem(ANALYTICS_SESSION_KEY);
  if (existing) return existing;
  const token = window.crypto?.randomUUID
    ? window.crypto.randomUUID().replace(/-/g, "")
    : `A${Date.now().toString(36)}${Math.random().toString(36).slice(2, 14)}`;
  localStorage.setItem(ANALYTICS_SESSION_KEY, token);
  return token;
}

function trackEvent(eventName, properties = {}, options = {}) {
  if (!eventName) return;
  const payload = {
    event: eventName,
    path: window.location.pathname || "/",
    mode: state.mode || "",
    session_id: state.session?.session_id || state.analyticsSession || "",
    analytics_session: state.analyticsSession || ensureAnalyticsSession(),
    device_token: state.deviceToken || ensureDeviceToken(),
    team_code: state.team?.code || "",
    client_ts: new Date().toISOString(),
    properties
  };
  const body = JSON.stringify(payload);
  if (options.beacon && navigator.sendBeacon) {
    navigator.sendBeacon("/api/event", new Blob([body], { type: "application/json" }));
    return;
  }
  fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: Boolean(options.keepalive)
  }).catch(() => {});
}

function currentDraftPayload() {
  if (!state.session?.questions?.length) return null;
  return {
    version: 1,
    session: state.session,
    mode: state.mode,
    team: state.team,
    currentIndex: state.currentIndex,
    answers: state.answers,
    shownMilestones: Array.from(state.shownMilestones || []),
    startedAt: state.startedAt,
    user: state.user,
    updatedAt: new Date().toISOString()
  };
}

function saveDraft() {
  const payload = currentDraftPayload();
  if (!payload) return;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(payload));
}

function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
  $("resumeCard").hidden = true;
}

function getSavedDraft() {
  const raw = localStorage.getItem(DRAFT_KEY);
  if (!raw) return null;
  try {
    const draft = JSON.parse(raw);
    const updatedAt = new Date(draft.updatedAt || 0).getTime();
    const expired = !updatedAt || Date.now() - updatedAt > DRAFT_TTL_MS;
    const valid = draft?.session?.questions?.length && draft.session.session_token && typeof draft.answers === "object";
    if (expired || !valid) {
      localStorage.removeItem(DRAFT_KEY);
      return null;
    }
    return draft;
  } catch {
    localStorage.removeItem(DRAFT_KEY);
    return null;
  }
}

function renderResumeCard() {
  const card = $("resumeCard");
  if (!card) return;
  const draft = getSavedDraft();
  const historyActive = screens.history?.classList.contains("active");
  const answered = Object.keys(draft?.answers || {}).length;
  if (!historyActive || !draft || answered < 1) {
    card.hidden = true;
    return;
  }
  const total = draft.session.questions.length;
  const mode = draft.mode || draft.session.mode || "";
  const label = modeShortLabel(mode, draft.session.mode_label || "测试");
  $("resumeTitle").textContent = `${label} · ${answered}/${total}`;
  $("resumeMeta").textContent = `${relativeTime(draft.updatedAt)}保存 · 第 ${Math.min(total, (draft.currentIndex || 0) + 1)} 题`;
  card.hidden = false;
}

function resumeDraft() {
  const draft = getSavedDraft();
  if (!draft) {
    renderResumeCard();
    return;
  }
  state.session = draft.session;
  state.mode = draft.mode || draft.session.mode || "main90";
  state.team = draft.team || draft.session.team || null;
  state.currentIndex = Math.max(0, Math.min(Number(draft.currentIndex || 0), draft.session.questions.length - 1));
  state.answers = draft.answers || {};
  state.shownMilestones = new Set(draft.shownMilestones || []);
  state.startedAt = draft.startedAt || new Date().toISOString();
  state.user = draft.user || {};
  state.moving = false;
  state.navDirection = 1;
  $("nicknameInput").value = state.user.nickname || "";
  $("contactInput").value = state.user.contact || "";
  $("sourceInput").value = state.user.source || "H5";
  $("modeInput").value = state.mode;
  $("teamCodeInput").value = state.team?.code || "";
  $("resumeCard").hidden = true;
  showScreen("test");
  renderQuestion();
  trackEvent("resume_continue", {
    answered: Object.keys(state.answers).length,
    total: state.session.questions.length
  });
}

function discardDraft() {
  const draft = getSavedDraft();
  localStorage.removeItem(DRAFT_KEY);
  $("resumeCard").hidden = true;
  renderHistory([]);
  trackEvent("resume_discard", {
    draft_mode: draft?.mode || "",
    answered: Object.keys(draft?.answers || {}).length
  });
}

function relativeTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "刚刚";
  const minutes = Math.max(0, Math.round((Date.now() - date.getTime()) / 60000));
  if (minutes < 1) return "刚刚";
  if (minutes < 60) return `${minutes}分钟前`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours}小时前`;
  return `${Math.round(hours / 24)}天前`;
}

function trackPotentialAbandon() {
  if (!state.session?.questions?.length || !screens.test.classList.contains("active")) return;
  const total = state.session.questions.length;
  const answered = Object.keys(state.answers || {}).length;
  if (answered >= total) return;
  saveDraft();
  trackEvent("test_abandon", {
    answered,
    total,
    current_index: state.currentIndex + 1
  }, { beacon: true });
}

function rememberResult(result) {
  if (!result?.verification_code) return;
  if (result.account && state.accountToken && !state.account) saveAccount(result.account, state.accountToken);
  if (isSubtypeResult(result)) {
    localStorage.setItem(LATEST_SUBTYPE_KEY, result.verification_code);
  } else {
    localStorage.setItem(LATEST_MAIN_KEY, result.verification_code);
  }
  const key = "enneagramLocalResults";
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  const item = {
    verification_code: result.verification_code,
    created_at: result.created_at,
    test_mode: result.test_mode,
    mode_label: result.mode_label,
    title: result.share?.title || "",
    primary_type: result.share?.primary_type || null,
    team: result.team ? { name: result.team.name, code: result.team.code } : null
  };
  const next = [item, ...existing.filter((record) => record.verification_code !== item.verification_code)].slice(0, 50);
  localStorage.setItem(key, JSON.stringify(next));
}

function isSubtypeMode(mode) {
  return Boolean(mode?.startsWith("subtype") || mode === "team_subtype");
}

function isSubtypeResult(result) {
  return isSubtypeMode(result?.test_mode);
}

function isPersonalSubtypeResult(result) {
  return Boolean(isSubtypeResult(result) && !isTeamSubtypeResult(result));
}

function isMainResult(result) {
  return Boolean(result && !isSubtypeResult(result));
}

function hasGlobalIdentity() {
  return Boolean(state.deviceToken || state.accountToken || state.account || state.adminAccount);
}

function hasUserIdentity() {
  return Boolean(state.deviceToken || state.accountToken || state.account);
}

function hasStaffIdentity() {
  return Boolean(state.adminAccount);
}

function hasEmailIdentity() {
  return Boolean(state.accountToken && state.account);
}

function hasAnyLoggedInIdentity() {
  return Boolean(hasUserIdentity() || hasStaffIdentity());
}

function hasHistoryIdentity() {
  return Boolean(state.deviceToken || state.accountToken || state.account);
}

async function openHistory() {
  showScreen("history");
  $("resumeCard").hidden = true;
  state.historyHasResults = false;
  $("historyList").innerHTML = `<div class="history-item muted"><span>加载中</span></div>`;
  await ensureGlobalIdentity(1);
  renderResumeCard();
  $("historyList").innerHTML = `<div class="history-item muted"><span>加载中</span></div>`;
  try {
    const params = new URLSearchParams({ device: state.deviceToken });
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/me/results?${params.toString()}`);
    const data = response.ok ? await response.json() : { results: [] };
    if (data.account) saveAccount(data.account, state.accountToken);
    updateEmailStatus();
    const merged = data.results || [];
    const unique = [];
    const seen = new Set();
    for (const item of merged) {
      if (!item.verification_code || seen.has(item.verification_code)) continue;
      seen.add(item.verification_code);
      unique.push(item);
    }
    state.historyHasResults = unique.length > 0;
    renderHistory(unique);
    updateEmailStatus();
  } catch {
    state.historyHasResults = false;
    renderHistory([]);
    renderResumeCard();
    updateEmailStatus();
  }
}

async function loadSiteSettings() {
  try {
    const response = await fetch("/api/site-settings", { credentials: "same-origin" });
    const data = response.ok ? await response.json() : {};
    state.siteSettings = data.settings || {};
  } catch {
    state.siteSettings = {};
  }
}

async function loadSiteStats() {
  const target = byId("homeTestedCount");
  if (!target) return;
  try {
    const response = await fetch("/api/site-stats", { credentials: "same-origin" });
    const data = response.ok ? await response.json() : {};
    const total = Math.max(0, Number(data.stats?.total_tests || 0));
    target.innerHTML = `<strong>${formatCount(total)}</strong><span>人次已测试过</span>`;
  } catch {
    target.innerHTML = `<strong>--</strong><span>人次已测试过</span>`;
  }
}

async function openGroupChatModal() {
  if (!state.siteSettings) await loadSiteSettings();
  const settings = state.siteSettings || {};
  const qr = settings.group_chat_qr_image_url || "";
  $("groupChatTitle").textContent = settings.group_chat_qr_caption || "扫码加入群聊";
  $("groupChatCaption").textContent = qr ? "长按加入" : "管理员上传后显示";
  $("groupChatQr").innerHTML = qr
    ? `<img src="${escapeHtml(qr)}" alt="微信群聊二维码">`
    : `<span>二维码待更新</span>`;
  $("groupChatModal").hidden = false;
}

function closeGroupChatModal() {
  $("groupChatModal").hidden = true;
}

function openResultTeamEntry() {
  const result = state.result || {};
  const teamCode = result.team?.code || state.team?.code || "";
  if (teamCode) {
    loadTeamSummary(teamCode);
    return;
  }
  const latestTeam = getRecentLocalResults({ maxAgeMs: TEN_DAYS_MS })
    .find((item) => item.team?.code);
  if (latestTeam?.team?.code) {
    loadTeamSummary(latestTeam.team.code);
    return;
  }
  showSaveToast("暂无团队结果，先从团队链接完成一次测试");
}

function copyCurrentTeamInvite() {
  const team = state.currentTeamSummary?.team || state.team || null;
  const code = team?.code || "";
  if (!code) {
    showSaveToast("暂无可复制的团队链接");
    return;
  }
  const button = byId("teamCopyInviteLinkButton");
  const inviteUrl = new URL(`/t/${code}`, window.location.origin).href;
  writeClipboardText(inviteUrl).then(() => {
    if (button) button.textContent = "已复制";
    showSaveToast("团队邀请链接已复制");
    window.setTimeout(() => {
      if (button) button.textContent = "复制邀请链接";
    }, 1200);
  }).catch(() => {
    if (button) button.textContent = "请手动复制";
    showSaveToast(inviteUrl);
  });
}

function saveAccount(account, token) {
  if (account) {
    state.account = account;
    localStorage.setItem("enneagramAccount", JSON.stringify(account));
    if (!$("nicknameInput").value.trim() && account.name) $("nicknameInput").value = account.name;
    if (!$("contactInput").value.trim() && account.email) $("contactInput").value = account.email;
  }
  if (token) {
    state.accountToken = token;
    localStorage.setItem("enneagramAccountToken", token);
  }
  updateEmailStatus();
}

function clearSavedAccount() {
  state.account = null;
  state.accountToken = "";
  localStorage.removeItem("enneagramAccount");
  localStorage.removeItem("enneagramAccountToken");
  updateEmailStatus();
}

async function loadAuthStatus() {
  try {
    const params = new URLSearchParams();
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/auth/me${params.toString() ? `?${params.toString()}` : ""}`, { credentials: "same-origin" });
    const data = response.ok ? await response.json() : {};
    if (data.user?.account) state.account = data.user.account;
    else if (state.accountToken || state.account) clearSavedAccount();
    state.adminAccount = data.staff?.account || null;
    state.adminPermissions = data.staff?.permissions || {};
    if (state.account?.name && !$("nicknameInput").value.trim()) $("nicknameInput").value = state.account.name;
    if (state.account?.email && !$("contactInput").value.trim()) $("contactInput").value = state.account.email;
    localStorage.removeItem("jojoWechatAccount");
    updateEmailStatus();
    return Boolean(data.logged_in || hasAnyLoggedInIdentity());
  } catch {
    updateEmailStatus();
    return hasAnyLoggedInIdentity();
  }
}

async function loadAdminStatus() {
  try {
    const response = await fetch("/api/admin/auth/me", { credentials: "same-origin" });
    const data = response.ok ? await response.json() : {};
    state.adminAccount = data.account || null;
    state.adminPermissions = data.permissions || {};
  } catch {
    state.adminAccount = null;
    state.adminPermissions = {};
  }
  updateEmailStatus();
}

async function ensureGlobalIdentity(retries = 2) {
  await loadAuthStatus();
  if (hasAnyLoggedInIdentity()) return true;
  const attempts = Math.max(1, Number(retries || 1));
  for (let index = 0; index < attempts; index += 1) {
    await loadAuthStatus();
    if (hasAnyLoggedInIdentity()) return true;
    if (index < attempts - 1) await wait(160 + index * 120);
  }
  return hasAnyLoggedInIdentity();
}

function updateEmailStatus() {
  const title = $("emailStatusTitle");
  const text = $("emailStatusText");
  if (!title || !text) return;
  if (state.account) {
    title.textContent = state.account.name || state.account.email || "邮箱账号";
    text.textContent = state.account.email ? `${state.account.email} 已登录` : "已登录";
    $("emailLogoutButton").hidden = false;
    $("emailLoginToggleButton").textContent = "账号设置";
    return;
  }
  title.textContent = "本机历史";
  text.textContent = "当前显示这台设备保存的记录。邮箱登录可同步账号记录。";
  $("emailLogoutButton").hidden = true;
  $("emailLoginToggleButton").textContent = "邮箱登录/注册";
}

function setEmailAuthMode(mode = "login") {
  state.emailAuthMode = ["login", "register", "reset"].includes(mode) ? mode : "login";
  document.querySelectorAll("[data-email-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.emailMode === state.emailAuthMode);
  });
  $("emailNameField").hidden = state.emailAuthMode !== "register";
  $("emailStarCodeField").hidden = state.emailAuthMode !== "reset";
  $("emailResetCodeField").hidden = state.emailAuthMode !== "reset";
  $("emailPasswordInput").autocomplete = state.emailAuthMode === "register" ? "new-password" : "current-password";
  $("emailPasswordInput").placeholder = state.emailAuthMode === "reset" ? "新密码，至少6位" : "至少6位";
  $("emailSubmitButton").textContent = {
    login: "邮箱登录",
    register: "注册并绑定",
    reset: "找回密码"
  }[state.emailAuthMode];
  setMessage("emailAuthMessage", "");
}

function toggleEmailPanel() {
  const form = $("emailAuthForm");
  form.hidden = !form.hidden;
  if (!form.hidden) {
    setEmailAuthMode(state.emailAuthMode || "login");
    $("emailInput").value = $("emailInput").value || state.account?.email || $("contactInput").value.trim();
    $("emailNameInput").value = $("emailNameInput").value || $("nicknameInput").value.trim() || state.account?.name || "";
    $("emailInput").focus();
  }
}

function setStartAuthMode(mode = "login") {
  state.startAuthMode = ["login", "register", "reset"].includes(mode) ? mode : "login";
  document.querySelectorAll("[data-start-auth-mode]").forEach((button) => {
    button.classList.toggle("active", button.dataset.startAuthMode === state.startAuthMode);
  });
  $("startAuthNameField").hidden = state.startAuthMode !== "register";
  $("startAuthStarCodeField").hidden = state.startAuthMode !== "reset";
  $("startAuthResetCodeField").hidden = state.startAuthMode !== "reset";
  $("startAuthPasswordInput").autocomplete = state.startAuthMode === "register" ? "new-password" : "current-password";
  $("startAuthPasswordInput").placeholder = state.startAuthMode === "reset" ? "新密码，至少6位" : "至少6位";
  $("startAuthSubmitButton").textContent = {
    login: "邮箱登录",
    register: "注册并进入",
    reset: "找回密码"
  }[state.startAuthMode];
  setMessage("startAuthMessage", "");
}

function showStartAuthModal() {
  $("startAuthChoice").hidden = false;
  $("startAuthForm").hidden = true;
  $("startAuthModal").hidden = false;
  setStartAuthMode("login");
  trackEvent("start_auth_prompt", { mode: state.mode });
  if (!isCoarsePointer()) window.setTimeout(() => $("startAuthOpenEmailButton").focus(), 40);
}

function closeStartAuthModal() {
  $("startAuthModal").hidden = true;
  setMessage("startAuthMessage", "");
  trackEvent("start_auth_cancel", { mode: state.mode });
}

function openStartAuthEmailForm() {
  $("startAuthChoice").hidden = true;
  $("startAuthForm").hidden = false;
  setStartAuthMode(state.startAuthMode || "login");
  $("startAuthEmailInput").value = $("startAuthEmailInput").value || state.account?.email || $("contactInput").value.trim();
  $("startAuthNameInput").value = $("startAuthNameInput").value || $("nicknameInput").value.trim() || state.account?.name || "";
  window.setTimeout(() => $("startAuthEmailInput").focus(), 40);
  trackEvent("start_auth_email_open", { mode: state.mode });
}

async function continueStartWithoutAccount() {
  $("startAuthModal").hidden = true;
  setMessage("startAuthMessage", "");
  trackEvent("start_auth_direct", { mode: state.mode });
  await beginTest();
}

async function submitStartAuth(event) {
  event.preventDefault();
  const button = $("startAuthSubmitButton");
  button.disabled = true;
  try {
    const email = $("startAuthEmailInput").value.trim();
    const password = $("startAuthPasswordInput").value;
    const base = { email, password, device_token: state.deviceToken };
    let endpoint = "/api/auth/email/login";
    let body = base;
    if (state.startAuthMode === "register") {
      endpoint = "/api/auth/email/register";
      body = {
        ...base,
        name: $("startAuthNameInput").value.trim() || $("nicknameInput").value.trim()
      };
    } else if (state.startAuthMode === "reset") {
      if (!$("startAuthResetCodeInput").value.trim()) {
        endpoint = "/api/auth/email/reset/request";
        body = {
          email,
          star_code: $("startAuthStarCodeInput").value.trim()
        };
      } else {
        endpoint = "/api/auth/email/reset/confirm";
        body = {
          ...base,
          reset_code: $("startAuthResetCodeInput").value.trim()
        };
      }
    }
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "操作失败");
    if (state.startAuthMode === "reset" && !data.account_token) {
      setMessage("startAuthMessage", "重置码已发到邮箱，填入后再点一次。");
      $("startAuthResetCodeField").hidden = false;
      $("startAuthResetCodeInput").focus();
      return;
    }
    const completedMode = state.startAuthMode;
    saveAccount(data.account, data.account_token);
    $("startAuthModal").hidden = true;
    setStartAuthMode("login");
    setMessage("startAuthMessage", "");
    trackEvent("start_auth_email_success", { mode: state.mode, auth_mode: completedMode });
    await beginTest();
  } catch (err) {
    setMessage("startAuthMessage", err.message || "操作失败");
  } finally {
    button.disabled = false;
    updateEmailStatus();
  }
}

async function submitEmailAuth(event) {
  event.preventDefault();
  const button = $("emailSubmitButton");
  button.disabled = true;
  try {
    const email = $("emailInput").value.trim();
    const password = $("emailPasswordInput").value;
    const base = { email, password, device_token: state.deviceToken };
    let endpoint = "/api/auth/email/login";
    let body = base;
    if (state.emailAuthMode === "register") {
      endpoint = "/api/auth/email/register";
      body = {
        ...base,
        name: $("emailNameInput").value.trim() || $("nicknameInput").value.trim(),
        star_code: $("lookupCodeInput").value.trim()
      };
    } else if (state.emailAuthMode === "reset") {
      if (!$("emailResetCodeInput").value.trim()) {
        endpoint = "/api/auth/email/reset/request";
        body = {
          email,
          star_code: $("emailStarCodeInput").value.trim()
        };
      } else {
        endpoint = "/api/auth/email/reset/confirm";
        body = {
          ...base,
          reset_code: $("emailResetCodeInput").value.trim()
        };
      }
    }
    const response = await fetch(endpoint, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "操作失败");
    if (state.emailAuthMode === "reset" && !data.account_token) {
      setMessage("emailAuthMessage", "重置码已发到邮箱，填入后再点一次。");
      $("emailResetCodeField").hidden = false;
      $("emailResetCodeInput").focus();
      return;
    }
    saveAccount(data.account, data.account_token);
    setEmailAuthMode("login");
    $("emailAuthForm").hidden = true;
    setMessage("emailAuthMessage", "");
    renderHistory(data.results || []);
    await openHistory();
  } catch (err) {
    setMessage("emailAuthMessage", err.message || "操作失败");
  } finally {
    button.disabled = false;
    updateEmailStatus();
  }
}

function logoutEmailAccount() {
  clearSavedAccount();
  setEmailAuthMode("login");
  $("emailAuthForm").hidden = true;
  openHistory();
}

function transformCreationOptions(publicKey) {
  return {
    ...publicKey,
    challenge: base64UrlToBuffer(publicKey.challenge),
    user: {
      ...publicKey.user,
      id: base64UrlToBuffer(publicKey.user.id)
    },
    excludeCredentials: (publicKey.excludeCredentials || []).map((item) => ({
      ...item,
      id: base64UrlToBuffer(item.id)
    }))
  };
}

function transformRequestOptions(publicKey) {
  return {
    ...publicKey,
    challenge: base64UrlToBuffer(publicKey.challenge),
    allowCredentials: (publicKey.allowCredentials || []).map((item) => ({
      ...item,
      id: base64UrlToBuffer(item.id)
    }))
  };
}

function serializeCredential(credential) {
  return {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    type: credential.type,
    response: {
      clientDataJSON: bufferToBase64Url(credential.response.clientDataJSON),
      attestationObject: bufferToBase64Url(credential.response.attestationObject)
    }
  };
}

function serializeAssertion(credential) {
  return {
    id: credential.id,
    rawId: bufferToBase64Url(credential.rawId),
    type: credential.type,
    response: {
      clientDataJSON: bufferToBase64Url(credential.response.clientDataJSON),
      authenticatorData: bufferToBase64Url(credential.response.authenticatorData),
      signature: bufferToBase64Url(credential.response.signature),
      userHandle: credential.response.userHandle ? bufferToBase64Url(credential.response.userHandle) : ""
    }
  };
}

function base64UrlToBuffer(value) {
  const padded = `${value}${"=".repeat((4 - value.length % 4) % 4)}`.replace(/-/g, "+").replace(/_/g, "/");
  const binary = window.atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

function bufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return window.btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function renderHistory(items) {
  if (!items.length) {
    const draft = getSavedDraft();
    if (draft) {
      $("historyList").innerHTML = "";
      return;
    }
    const hasEmailAccount = Boolean(state.accountToken || state.account);
    $("historyList").innerHTML = hasEmailAccount
      ? `<div class="history-item muted empty-history"><strong>这个邮箱还没有记录</strong><span>完成测试后，账号记录会出现在这里。</span></div>`
      : `<div class="history-item muted empty-history"><strong>这台设备还没有记录</strong><span>未登录时，只显示本机保存的历史测试。</span></div>`;
    return;
  }
  $("historyList").innerHTML = items.map((item) => `
    <button class="history-item" type="button" data-code="${escapeHtml(item.verification_code)}">
      <strong>${escapeHtml(formatDateTime(item.created_at))}</strong>
      <span>${escapeHtml(modeShortLabel(item.test_mode, item.mode_label))}${item.team?.name ? ` · ${escapeHtml(item.team.name)}` : ""}</span>
      <small>查看报告</small>
    </button>
  `).join("");
}

function getRecentLocalResults({ maxAgeMs = TEN_DAYS_MS } = {}) {
  let items = [];
  try {
    items = JSON.parse(localStorage.getItem("enneagramLocalResults") || "[]");
  } catch {
    items = [];
  }
  const cutoff = Date.now() - maxAgeMs;
  return items
    .filter((item) => {
      const created = new Date(item.created_at || 0).getTime();
      return item.verification_code && created && created >= cutoff;
    })
    .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime());
}

function isRecentResult(result, maxAgeMs = TEN_DAYS_MS) {
  const created = new Date(result?.created_at || 0).getTime();
  return Boolean(created && Date.now() - created <= maxAgeMs);
}

function findLatestLocalCode(kind, excludeCode = "") {
  return findLatestLocalCodes(kind, excludeCode)[0] || "";
}

function findLatestLocalCodes(kind, excludeCode = "") {
  const exclude = String(excludeCode || "").toUpperCase();
  const storageKey = kind === "subtype" ? LATEST_SUBTYPE_KEY : LATEST_MAIN_KEY;
  const saved = (localStorage.getItem(storageKey) || "").trim().toUpperCase();
  const recent = getRecentLocalResults({ maxAgeMs: TEN_DAYS_MS });
  const candidates = recent.filter((item) => {
    const code = String(item.verification_code || "").toUpperCase();
    if (!code || code === exclude) return false;
    const mode = item.test_mode || "";
    const subtype = isSubtypeMode(mode);
    const teamSubtype = mode === "team_subtype";
    return kind === "subtype" ? subtype && !teamSubtype && !item.team : !subtype;
  }).map((item) => item.verification_code);
  const ordered = saved && saved !== exclude ? [saved, ...candidates] : candidates;
  return [...new Set(ordered.map((code) => String(code || "").toUpperCase()).filter(Boolean))];
}

async function fetchPublicResultByCode(code) {
  const clean = String(code || "").trim().toUpperCase();
  if (!clean) return null;
  try {
    const response = await fetch(`/api/result/${encodeURIComponent(clean)}`);
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}

async function lookupResult(event) {
  event.preventDefault();
  const code = $("lookupCodeInput").value.trim().toUpperCase();
  if (!code) return;
  await loadResultByCode(code);
}

async function submitCombinedForm(event) {
  event.preventDefault();
  const main = $("combinedMainInput").value.trim().toUpperCase();
  const subtype = $("combinedSubtypeInput").value.trim().toUpperCase();
  if (!main || !subtype) {
    alert("请同时填写主型编号和副型编号。");
    return;
  }
  await loadCombinedReport(main, subtype);
}

function openCombinedFromResult() {
  if (!state.result?.verification_code) return;
  if (isSubtypeResult(state.result) && !state.result.team) {
    const latestMain = localStorage.getItem(LATEST_MAIN_KEY);
    if (latestMain) {
      loadCombinedReport(latestMain, state.result.verification_code);
      return;
    }
    $("combinedSubtypeInput").value = state.result.verification_code;
    $("combinedMainInput").value = "";
    showScreen("history");
    $("combinedMainInput").focus();
    return;
  }
  const latestSubtype = localStorage.getItem(LATEST_SUBTYPE_KEY);
  if (latestSubtype) {
    loadCombinedReport(state.result.verification_code, latestSubtype);
    return;
  }
  $("combinedMainInput").value = state.result.verification_code;
  $("combinedSubtypeInput").value = "";
  showScreen("history");
  $("combinedSubtypeInput").focus();
}

async function loadCombinedReport(main, subtype, options = {}) {
  try {
    const params = new URLSearchParams({ main: main.trim().toUpperCase(), subtype: subtype.trim().toUpperCase() });
    const response = await fetch(`/api/report/combined?${params.toString()}`);
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "combined_failed");
    renderCombinedReport(data);
    window.history.replaceState(null, "", `/combine?${params.toString()}`);
    showScreen("combined");
  } catch (err) {
    if (options.silent) throw err;
    alert(err.message || "综合报告生成失败，请确认一个是主型编号，一个是副型编号。");
  }
}

async function onHistoryClick(event) {
  const button = event.target.closest("[data-code]");
  if (!button) return;
  await loadResultByCode(button.dataset.code);
}

async function loadResultByCode(code) {
  try {
    const response = await fetch(`/api/result/${encodeURIComponent(code.trim().toUpperCase())}`);
    const result = await response.json();
    if (!response.ok) throw new Error("not_found");
    state.result = result;
    rememberResult(result);
    renderResult(result);
    showScreen("result");
  } catch {
    alert("没有找到这个编号，请检查是否输入正确。");
  }
}

function modeShortLabel(mode, fallback = "") {
  return {
    main90: "主型90题",
    main180: "主型180题",
    main270: "主型180题",
    subtype_adult: "个人副型",
    subtype_child: "少儿副型",
    team_subtype: "团队副型"
  }[mode] || fallback || "测试记录";
}

function onModeClick(event) {
  const button = event.target.closest("button[data-mode]");
  if (!button) return;
  const mode = button.dataset.mode;
  trackEvent("mode_select", { selected_mode: mode });
  document.querySelectorAll(".mode-card").forEach((item) => item.classList.toggle("active", item === button));
  if (mode === "team") {
    $("teamCreateForm").hidden = false;
    $("profileForm").hidden = true;
    $("startScreen").classList.remove("team-invite-active");
    $("startEyebrow").textContent = "创建团队测试链接";
    $("startLine").textContent = "起个队名，发给大家。";
    window.setTimeout(() => $("teamCreateForm").scrollIntoView({ block: "nearest", behavior: "smooth" }), 40);
    return;
  }
  $("startScreen").classList.remove("team-invite-active");
  $("teamCreateForm").hidden = true;
  $("profileForm").hidden = false;
  setMode(mode);
}

function setMode(mode) {
  state.mode = MODE_COPY[mode] ? mode : "main90";
  $("modeInput").value = state.mode;
  const copy = MODE_COPY[state.mode];
  $("startEyebrow").textContent = copy.eyebrow;
  $("startLine").textContent = copy.line;
  $("startButton").querySelector("span").textContent = copy.button;
}

async function createTeam(event) {
  event.preventDefault();
  const button = $("createTeamButton");
  const name = $("teamNameInput").value.trim();
  const kind = document.querySelector('input[name="teamKind"]:checked')?.value || "main";
  if (name.length < 2) {
    alert("团队名称至少需要2个字。");
    return;
  }
  button.disabled = true;
  button.querySelector("span").textContent = "正在创建";
  try {
    const response = await fetch("/api/team", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, kind })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "create_team_failed");
    const inviteUrl = new URL(data.team.invite_url, window.location.origin).href;
    const summaryUrl = new URL(data.team.summary_url, window.location.origin).href;
    state.createdTeam = { team: data.team, inviteUrl, summaryUrl };
    $("teamInviteUrlInput").value = inviteUrl;
    $("teamCreatedTitle").textContent = "团队链接已创建";
    $("teamCreatedBody").textContent = `${data.team.name} · ${formatShortDate(data.team.expires_at)}前有效`;
    $("teamCreatedSummaryLink").href = summaryUrl;
    $("teamCopyInviteButton").textContent = "复制邀请链接";
    $("teamStartTestButton").textContent = "我也开始测试";
    $("teamCreatedSummaryLink").textContent = "团队总图";
    $("teamCreatedModal").hidden = false;
  } catch (err) {
    alert(err.message || "团队创建失败，请稍后再试。");
  } finally {
    button.disabled = false;
    button.querySelector("span").textContent = "创建团队链接";
  }
}

function copyCreatedTeamInvite() {
  const inviteUrl = state.createdTeam?.inviteUrl || $("teamInviteUrlInput").value.trim();
  if (!inviteUrl) return;
  writeClipboardText(inviteUrl).then(() => {
    $("teamCopyInviteButton").textContent = "已复制";
  }).catch(() => {
    $("teamCopyInviteButton").textContent = "请手动复制";
    $("teamInviteUrlInput").select();
  });
}

async function startCreatedTeamTest() {
  const created = state.createdTeam;
  if (!created?.team?.code) return;
  $("teamCreatedModal").hidden = true;
  state.team = created.team;
  $("teamCodeInput").value = created.team.code;
  $("joinTeamInput").checked = true;
  $("joinTeamInput").disabled = false;
  if (created.team.test_kind === "subtype") {
    setMode("team_subtype");
  } else {
    setMode("main90");
    await checkRecentMainForTeam(created.team);
    if (state.reusableTeamMain) return;
  }
  await beginTest();
}

document.addEventListener("click", (event) => {
  const copyButton = event.target.closest("[data-copy]");
  if (!copyButton) return;
  writeClipboardText(copyButton.dataset.copy).then(() => {
    copyButton.textContent = "已复制";
  }).catch(() => {
    copyButton.textContent = "请手动复制";
  });
});

function writeClipboardText(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text);
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.remove();
  return ok ? Promise.resolve() : Promise.reject(new Error("copy_failed"));
}

async function loadTeamInvite(code) {
  try {
    const response = await fetch(`/api/team/${encodeURIComponent(code)}`);
    const data = await response.json();
    if (!response.ok) throw new Error("team_not_found");
    state.team = data.team;
    $("teamCodeInput").value = data.team.code;
    $("teamInvite").hidden = false;
    $("teamInviteName").textContent = data.team.name;
    $("startScreen").classList.toggle("team-invite-active", Boolean(data.team.active));
    const isSubtypeTeam = data.team.test_kind === "subtype";
    $("teamInviteMeta").textContent = data.team.active
      ? `${data.team.mode_label || "团队测试"} · ${formatShortDate(data.team.expires_at)}前有效`
      : "链接已过期";
    $("joinTeamInput").checked = data.team.active;
    $("joinTeamInput").disabled = !data.team.active;
    if (isSubtypeTeam && data.team.active) {
      setMode("team_subtype");
      document.querySelectorAll(".mode-card").forEach((item) => {
        item.classList.toggle("active", false);
      });
      $("modeGrid").hidden = true;
      $("startEyebrow").textContent = "匿名团队副型测试";
      $("startLine").textContent = "匿名提交，只看整体。";
      return;
    }
    setMode("main90");
    document.querySelectorAll(".mode-card").forEach((item) => {
      item.classList.toggle("active", false);
    });
    $("modeGrid").hidden = data.team.active;
    $("startEyebrow").textContent = data.team.active ? "团队主型测试" : "团队链接已过期";
    $("startLine").textContent = data.team.active
      ? "完成后进入团队总图。"
      : "可继续个人测试。";
    $("startButton").querySelector("span").textContent = data.team.active ? "开始团队测试" : "开始个人测试";
    if (data.team.active) checkRecentMainForTeam(data.team);
  } catch {
    $("startScreen").classList.remove("team-invite-active");
    $("teamInvite").hidden = false;
    $("teamInviteName").textContent = "团队不存在";
    $("teamInviteMeta").textContent = "请确认邀请链接是否正确。";
    $("joinTeamInput").checked = false;
    $("joinTeamInput").disabled = true;
  }
}

async function checkRecentMainForTeam(team) {
  if (!team?.code || team.test_kind === "subtype") return;
  await ensureGlobalIdentity(1);
  if (!hasAnyLoggedInIdentity()) return;
  try {
    const params = new URLSearchParams({ device: state.deviceToken });
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/team/${encodeURIComponent(team.code)}/recent-main?${params.toString()}`, {
      credentials: "same-origin"
    });
    const data = response.ok ? await response.json() : {};
    if (!data.reusable?.source_code) return;
    state.reusableTeamMain = data.reusable;
    $("teamReuseBody").textContent = `发现一份近10天主型结果，可直接加入「${team.name}」。`;
    $("teamReuseModal").hidden = false;
  } catch {}
}

async function confirmReuseTeamMain() {
  const reusable = state.reusableTeamMain;
  if (!reusable?.source_code || !state.team?.code) return;
  const button = $("teamReuseConfirmButton");
  button.disabled = true;
  button.textContent = "正在计入";
  try {
    const params = new URLSearchParams({ device: state.deviceToken });
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/team/${encodeURIComponent(state.team.code)}/reuse-main?${params.toString()}`, {
      method: "POST",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_code: reusable.source_code,
        device_token: state.deviceToken,
        account_token: state.accountToken,
        user: {
          nickname: $("nicknameInput").value.trim() || state.account?.name || "",
          contact: $("contactInput").value.trim()
        }
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "reuse_failed");
    $("teamReuseModal").hidden = true;
    state.reusableTeamMain = null;
    state.result = data.result;
    rememberResult(state.result);
    renderResult(state.result);
    showScreen("result");
    trackEvent("team_main_reuse_confirm", {
      team_code: state.team.code,
      source_code: reusable.source_code
    });
  } catch (err) {
    alert(err.message || "计入失败，请重新测试。");
  } finally {
    button.disabled = false;
    button.textContent = "直接计入团队";
  }
}

function retestTeamMain() {
  $("teamReuseModal").hidden = true;
  state.reusableTeamMain = null;
  trackEvent("team_main_reuse_skip", { team_code: state.team?.code || "" });
}

async function loadTeamSummary(code) {
  try {
    const response = await fetch(`/api/team/${encodeURIComponent(code)}/summary`);
    const summary = await response.json();
    if (!response.ok) throw new Error("summary_failed");
    renderTeamSummary(summary);
    showScreen("team");
  } catch {
    $("teamSummaryTitle").textContent = "团队总图暂不可用";
    $("teamSummaryNote").textContent = "请确认团队链接是否正确，或稍后再试。";
    showScreen("team");
  }
}

async function startTest(event) {
  event.preventDefault();
  unlockAudio();
  if (shouldPromptDraftResume()) {
    showDraftResumeMarker();
    return;
  }
  await loadAuthStatus();
  if (shouldPromptStartAuth()) {
    showStartAuthModal();
    return;
  }
  await beginTest();
}

function shouldPromptDraftResume() {
  const draft = getSavedDraft();
  if (!draft) return false;
  const draftMode = draft.mode || draft.session?.mode || "";
  const currentMode = $("modeInput").value || state.mode;
  const draftTeamCode = draft.team?.code || draft.session?.team?.code || "";
  const currentTeamCode = $("joinTeamInput").checked ? $("teamCodeInput").value.trim() : "";
  const answered = Object.keys(draft.answers || {}).length;
  return Boolean(answered > 0 && draftMode === currentMode && draftTeamCode === currentTeamCode);
}

function showDraftResumeMarker() {
  const draft = getSavedDraft();
  const total = draft?.session?.questions?.length || 0;
  const answered = Object.keys(draft?.answers || {}).length;
  $("recoveryKicker").hidden = false;
  $("recoveryKicker").textContent = "上次答题";
  $("recoveryTitle").textContent = "继续上次";
  $("recoveryBody").hidden = false;
  $("recoveryBody").textContent = `${answered}/${total} 已保存`;
  $("markerSkipButton").hidden = true;
  $("markerResumeButton").hidden = false;
  $("markerRestartButton").hidden = false;
  $("recoveryModal").dataset.mode = "resume";
  $("recoveryModal").hidden = false;
  trackEvent("draft_resume_prompt", { mode: state.mode, answered, total });
}

function shouldPromptRecoveryMarker() {
  if (state.recoveryMarkerConfirmed) return false;
  if (hasAnyLoggedInIdentity()) return false;
  if (state.mode === "team_subtype" || state.team?.test_kind === "subtype") return false;
  if (state.team?.code && state.team?.active) return false;
  return false;
}

function shouldPromptStartAuth() {
  if (hasEmailIdentity()) return false;
  if (state.mode === "team_subtype" || state.team?.test_kind === "subtype") return false;
  if (state.team?.code && state.team?.active) return false;
  return true;
}

function showRecoveryMarker() {
  const modeLabel = modeShortLabel(state.mode, MODE_COPY[state.mode]?.eyebrow);
  $("recoveryModal").dataset.mode = "login";
  $("recoveryKicker").textContent = `${modeLabel}`;
  $("recoveryTitle").textContent = "选择进入方式";
  $("recoveryBody").hidden = true;
  $("recoveryBody").textContent = "";
  $("markerSkipButton").hidden = false;
  $("markerResumeButton").hidden = true;
  $("markerRestartButton").hidden = true;
  $("recoveryModal").hidden = false;
  trackEvent("recovery_marker_prompt", { mode: state.mode });
  if (!isCoarsePointer()) window.setTimeout(() => $("markerSkipButton").focus(), 40);
}

async function skipRecoveryMarker() {
  state.recoveryMarkerConfirmed = true;
  $("recoveryModal").hidden = true;
  trackEvent("recovery_marker_skipped", { mode: state.mode });
  await beginTest();
}

function resumeFromRecoveryMarker() {
  $("recoveryModal").hidden = true;
  resumeDraft();
}

async function restartFromRecoveryMarker() {
  const draft = getSavedDraft();
  localStorage.removeItem(DRAFT_KEY);
  $("recoveryModal").hidden = true;
  trackEvent("draft_resume_restart", {
    mode: draft?.mode || state.mode,
    answered: Object.keys(draft?.answers || {}).length
  });
  await loadAuthStatus();
  if (shouldPromptStartAuth()) {
    showStartAuthModal();
    return;
  }
  await beginTest();
}

async function beginTest() {
  const button = $("startButton");
  button.disabled = true;
  button.querySelector("span").textContent = "正在准备题目";
  const teamCode = $("joinTeamInput").checked ? $("teamCodeInput").value.trim() : "";
  const params = new URLSearchParams({ mode: $("modeInput").value || state.mode });
  if (teamCode) params.set("team", teamCode);

  try {
    const response = await fetch(`/api/session?${params.toString()}`);
    if (!response.ok) throw new Error("session_failed");
    state.session = await response.json();
    state.mode = state.session.mode || $("modeInput").value || "main90";
    state.team = state.session.team || null;
    state.currentIndex = 0;
    state.answers = {};
    state.shownMilestones = new Set();
    state.startedAt = new Date().toISOString();
    state.user = {
      nickname: $("nicknameInput").value.trim() || state.account?.name || "",
      contact: $("contactInput").value.trim(),
      source: $("sourceInput").value.trim()
    };
    if (state.team) state.user.source = `team:${state.team.code}`;
    showScreen("test");
    renderQuestion();
    saveDraft();
    trackEvent("start_test", {
      mode: state.mode,
      question_count: state.session.questions.length,
      has_team: Boolean(state.team),
      team_kind: state.team?.test_kind || ""
    });
  } catch (err) {
    button.disabled = false;
    button.querySelector("span").textContent = MODE_COPY[state.mode]?.button || "重新开始";
    alert("题目加载失败，请刷新后再试。");
  }
}

function showScreen(name) {
  if (name !== "result") trackResultDwell();
  Object.entries(screens).forEach(([key, element]) => {
    element.classList.toggle("active", key === name);
  });
  $("topProgress").hidden = true;
  window.scrollTo({ top: 0, behavior: "auto" });
  if (name === "result") {
    state.resultEnteredAt = performance.now();
    state.resultDwellCode = state.result?.verification_code || "";
    trackEvent("result_view", {
      result_kind: isSubtypeResult(state.result) ? "subtype" : "main",
      test_mode: state.result?.test_mode || "",
      has_team: Boolean(state.result?.team),
      quality_flag_count: state.result?.quality_flags?.length || 0
    });
  }
}

function trackResultDwell(options = {}) {
  if (!state.resultEnteredAt || !state.resultDwellCode) return;
  const seconds = Math.max(0, Math.round((performance.now() - state.resultEnteredAt) / 100) / 10);
  if (seconds < 1) {
    state.resultEnteredAt = 0;
    state.resultDwellCode = "";
    return;
  }
  trackEvent("result_dwell", {
    seconds,
    result_kind: isSubtypeResult(state.result) ? "subtype" : "main",
    test_mode: state.result?.test_mode || ""
  }, options);
  state.resultEnteredAt = 0;
  state.resultDwellCode = "";
}

function renderQuestion() {
  if (!state.session) return;
  state.moving = false;
  const total = state.session.questions.length;
  const question = state.session.questions[state.currentIndex];
  const answered = Object.keys(state.answers).length;
  const percent = Math.round((answered / total) * 100);
  const group = Math.floor(state.currentIndex / 10) + 1;
  const groupTotal = Math.ceil(total / 10);
  const groupStart = (group - 1) * 10;
  const inGroup = state.currentIndex - groupStart + 1;
  const groupSize = Math.min(10, total - groupStart);
  const groupPercent = Math.round((inGroup / groupSize) * 100);
  const modeCopy = MODE_COPY[state.mode] || MODE_COPY.main90;
  const isTeamMain = Boolean(state.team?.code && state.team?.test_kind !== "subtype");
  const modeBadge = isTeamMain ? "团队主型" : modeCopy.testBadge;
  const modeTitle = isTeamMain ? "计入团队总图" : modeCopy.testTitle;
  const modeHint = isTeamMain ? "完成后自动汇总" : modeCopy.testHint;

  $("testModeBadge").textContent = modeBadge || "jojo测试";
  $("testModeTitle").textContent = modeTitle || "按第一反应选";
  $("testModeHint").textContent = modeHint || "按最近真实反应选";
  $("questionCount").textContent = `本组 ${inGroup}/${groupSize}`;
  $("answeredCount").textContent = `已完成 ${percent}%`;
  $("topProgressText").textContent = "";
  const overallPercent = Math.round((answered / total) * 100);
  $("mainProgressBar").style.width = `${groupPercent}%`;
  $("topProgressBar").style.width = `${overallPercent}%`;
  $("questionText").textContent = question.text;
  $("questionKicker").textContent = state.currentIndex === total - 1 ? "最后一题" : "选更像最近真实反应的一项";
  $("questionGroupLine").textContent = GROUP_LINES[(group - 1) % GROUP_LINES.length];
  $("questionStage").dataset.group = String((group - 1) % 6);
  renderGroupProgress(groupTotal, group, inGroup, groupSize);
  clearSaveNotice();
  animateQuestionPanel();
  $("backButton").disabled = state.currentIndex === 0;
  $("pauseButton").disabled = false;
  updateSoundToggle();

  const selected = state.answers[question.id];
  renderAnswerButtons(selected, false);
}

function clearAnswerButtons(disabled = false) {
  const grid = $("answerGrid");
  grid.classList.add("is-clearing");
  document.querySelectorAll("#answerGrid button").forEach((button) => {
    button.blur();
    button.disabled = disabled;
    button.style.background = "";
    button.style.borderColor = "";
    button.style.boxShadow = "";
    button.style.transform = "";
    button.classList.remove("selected");
    button.setAttribute("aria-pressed", "false");
  });
  window.setTimeout(() => {
    grid.classList.remove("is-clearing");
  }, 120);
}

function renderAnswerButtons(selected, disabled = false) {
  const selectedValue = Number(selected);
  $("answerGrid").classList.remove("is-clearing");
  $("answerGrid").innerHTML = ANSWER_OPTIONS.map((option) => {
    const isSelected = Number(option.value) === selectedValue;
    return [
      `<button type="button" data-value="${option.value}"`,
      isSelected ? ` class="selected"` : "",
      ` aria-pressed="${isSelected ? "true" : "false"}"`,
      disabled ? " disabled" : "",
      `>${option.label}</button>`
    ].join("");
  }).join("");
}

function renderGroupProgress(groupTotal, currentGroup, inGroup, groupSize) {
  const total = Math.max(1, groupTotal);
  const fill = Math.max(0, Math.min(1, inGroup / Math.max(1, groupSize)));
  const maxDots = 10;
  const useCompact = total > maxDots;
  const dots = useCompact ? maxDots : total;
  const currentDot = useCompact
    ? Math.min(dots, Math.max(1, Math.ceil((currentGroup / total) * dots)))
    : currentGroup;
  const steps = Array.from({ length: dots }, (_, index) => {
    const groupNumber = index + 1;
    const status = groupNumber < currentDot ? "complete" : groupNumber === currentDot ? "current" : "upcoming";
    const compactProgress = useCompact
      ? Math.max(0, Math.min(1, ((currentGroup - 1) + fill) / total))
      : fill;
    const style = status === "current" ? ` style="--fill:${Math.round(compactProgress * 100)}%"` : "";
    return `<span class="jo-step ${status}"${style} aria-hidden="true"><span></span></span>`;
  });
  const split = Math.ceil(total / 2);
  const visualSplit = Math.ceil(dots / 2);
  $("groupProgressTop").innerHTML = steps.slice(0, visualSplit).join("");
  $("groupProgressBottom").innerHTML = steps.slice(visualSplit).join("");
  $("groupProgressTop").classList.toggle("compact-groups", useCompact);
  $("groupProgressBottom").classList.toggle("compact-groups", useCompact);
  $("groupProgressTop").setAttribute("aria-label", `共 ${total} 组，已完成 ${Math.max(0, currentGroup - 1)} 组，当前第 ${currentGroup} 组`);
}

function onAnswerClick(event) {
  const button = event.target.closest("button[data-value]");
  if (!button || state.moving) return;
  const question = state.session.questions[state.currentIndex];
  const value = Number(button.dataset.value);
  state.answers[question.id] = value;
  state.moving = true;
  saveDraft();

  $("pauseButton").disabled = true;
  document.querySelectorAll("#answerGrid button").forEach((item) => {
    item.disabled = true;
    item.classList.toggle("selected", item === button);
    item.setAttribute("aria-pressed", item === button ? "true" : "false");
  });

  const answeredPosition = state.currentIndex + 1;
  const encouragement = state.session.encouragements.find((item) => item.at === answeredPosition);
  if (encouragement && !state.shownMilestones.has(encouragement.at)) {
    playCardRewardSound(Math.ceil(encouragement.at / 10));
    state.rewardPlayedAt = encouragement.at;
  } else {
    playAnswerSound(value);
  }
  const next = () => {
    if (state.currentIndex >= state.session.questions.length - 1) {
      submitResult();
      return;
    }
    state.navDirection = 1;
    transitionToQuestion(state.currentIndex + 1);
  };

  if (encouragement && !state.shownMilestones.has(encouragement.at)) {
    state.shownMilestones.add(encouragement.at);
    window.setTimeout(() => {
      clearAnswerButtons(true);
      showEncouragement(encouragement, next);
    }, 80);
  } else {
    window.setTimeout(next, 80);
  }
}

function goBack() {
  if (state.currentIndex <= 0 || state.moving) return;
  state.navDirection = -1;
  transitionToQuestion(state.currentIndex - 1);
}

function transitionToQuestion(nextIndex) {
  const panel = $("questionPanel");
  const grid = $("answerGrid");
  state.moving = true;
  clearAnswerButtons(true);
  grid.classList.add("is-transitioning");
  panel.classList.remove("question-enter-next", "question-enter-prev", "question-leave-next", "question-leave-prev");
  void panel.offsetWidth;
  panel.classList.add(state.navDirection >= 0 ? "question-leave-next" : "question-leave-prev");
  window.setTimeout(() => {
    grid.classList.remove("is-transitioning");
    state.currentIndex = Math.max(0, Math.min(nextIndex, state.session.questions.length - 1));
    renderQuestion();
    saveDraft();
  }, 85);
}

function pauseAndReturn() {
  if (!state.session?.questions?.length) return;
  saveDraft();
  const total = state.session.questions.length;
  const answered = Object.keys(state.answers || {}).length;
  state.moving = false;
  $("startButton").disabled = false;
  $("startButton").querySelector("span").textContent = MODE_COPY[state.mode]?.button || "开始测试";
  showSaveNotice(`已保存 ${answered}/${total} 题，回来还能接着答。`);
  showSaveToast("已保存，回头接着来就行");
  renderResumeCard();
  window.setTimeout(() => showScreen("start"), 220);
  trackEvent("test_pause_save", {
    answered,
    total,
    current_index: state.currentIndex + 1
  });
}

function showSaveNotice(message) {
  const node = $("autosaveText");
  if (!node) return;
  window.clearTimeout(state.saveNoticeTimer);
  node.textContent = message;
  node.classList.add("visible");
  state.saveNoticeTimer = window.setTimeout(() => {
    clearSaveNotice();
  }, 2200);
}

function clearSaveNotice() {
  const node = $("autosaveText");
  if (!node) return;
  node.textContent = "";
  node.classList.remove("visible");
}

function showSaveToast(message) {
  const node = $("saveToast");
  if (!node) return;
  window.clearTimeout(state.saveToastTimer);
  node.textContent = message;
  node.hidden = false;
  requestAnimationFrame(() => node.classList.add("visible"));
  state.saveToastTimer = window.setTimeout(() => {
    node.classList.remove("visible");
    window.setTimeout(() => {
      node.hidden = true;
      node.textContent = "";
    }, 180);
  }, 1800);
}

function showEncouragement(item, onClose) {
  state.pendingAfterModal = onClose;
  const total = state.session?.questions?.length || item.at || 0;
  const done = Math.min(item.at, total);
  const group = Math.ceil(done / 10);
  const percent = total ? Math.round((done / total) * 100) : 0;
  const lines = ["自动保存好了", "真实比标准答案值钱", "不用满分，像你就行", "喝口水也算进度"];
  $("encouragementModal").dataset.tone = String((group - 1) % 5);
  $("modalKicker").textContent = `第 ${group} 组已收好`;
  $("modalTitle").textContent = item.title;
  $("modalBody").textContent = item.body;
  $("modalProgressBar").style.width = `${percent}%`;
  $("modalPercent").textContent = `${percent}%`;
  $("modalMeta").textContent = `${done}/${total} 题 · ${lines[(group - 1) % lines.length]}`;
  $("modalBadge").innerHTML = `<img src="/jojo-icon.svg" alt="">`;
  $("modalContinue").textContent = done >= total ? "看结果" : "继续轻轻答";
  $("encouragementModal").hidden = false;
  if (state.rewardPlayedAt !== item.at) {
    playCardRewardSound(group);
    state.rewardPlayedAt = item.at;
  }
  trackEvent("answer_group_completed", {
    group,
    answered: done,
    total,
    percent
  });
  $("modalContinue").focus();
}

function closeEncouragement() {
  playSoftTap();
  $("encouragementModal").hidden = true;
  const next = state.pendingAfterModal;
  state.pendingAfterModal = null;
  if (typeof next === "function") next();
}

function animateQuestionPanel() {
  const panel = $("questionPanel");
  const direction = state.navDirection >= 0 ? "next" : "prev";
  panel.classList.remove("question-enter-next", "question-enter-prev", "question-leave-next", "question-leave-prev");
  void panel.offsetWidth;
  panel.classList.add(direction === "next" ? "question-enter-next" : "question-enter-prev");
  state.lastQuestionIndex = state.currentIndex;
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  localStorage.setItem(SOUND_KEY, state.soundEnabled ? "on" : "off");
  updateSoundToggle();
  trackEvent("sound_toggle", { enabled: state.soundEnabled });
  if (state.soundEnabled) {
    unlockAudio();
    playCardRewardSound(0, true);
  }
}

function updateSoundToggle() {
  const button = $("soundToggleButton");
  button.textContent = state.soundEnabled ? "音效" : "静音";
  button.setAttribute("aria-pressed", state.soundEnabled ? "true" : "false");
}

function mediaSoundKey(kind, value = "") {
  if (kind === "reward") return `reward-${String(value).padStart(2, "0")}`;
  if (kind === "answer") return `answer-${value}`;
  return kind;
}

function mediaSoundPath(key) {
  return `/sounds/${key}.m4a`;
}

function getMediaAudio(key) {
  if (!key || typeof Audio === "undefined") return null;
  if (state.mediaSounds.has(key)) return state.mediaSounds.get(key);
  const audio = new Audio(mediaSoundPath(key));
  audio.preload = "auto";
  audio.playsInline = true;
  audio.setAttribute("playsinline", "");
  state.mediaSounds.set(key, audio);
  return audio;
}

function preloadMediaSounds() {
  [
    "unlock",
    "soft-tap",
    "milestone",
    ...[1, 3, 5].map((value) => mediaSoundKey("answer", value)),
    ...Array.from({ length: REWARD_SOUND_COUNT }, (_, index) => mediaSoundKey("reward", index + 1))
  ].forEach((key) => {
    const audio = getMediaAudio(key);
    audio?.load?.();
  });
}

function silentWavDataUri() {
  const sampleRate = 8000;
  const seconds = 0.25;
  const samples = Math.floor(sampleRate * seconds);
  const buffer = new ArrayBuffer(44 + samples * 2);
  const view = new DataView(buffer);
  const write = (offset, value) => {
    for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
  };
  write(0, "RIFF");
  view.setUint32(4, 36 + samples * 2, true);
  write(8, "WAVE");
  write(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  write(36, "data");
  view.setUint32(40, samples * 2, true);
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  }
  return `data:audio/wav;base64,${btoa(binary)}`;
}

function startSilentAudioBridge() {
  if (state.silentAudioReady || !state.soundEnabled || typeof Audio === "undefined") return;
  if (!state.silentAudio) {
    const audio = new Audio(silentWavDataUri());
    audio.loop = true;
    audio.preload = "auto";
    audio.playsInline = true;
    audio.setAttribute("playsinline", "");
    audio.volume = 1;
    state.silentAudio = audio;
  }
  const playPromise = state.silentAudio.play();
  if (playPromise?.then) {
    playPromise.then(() => {
      state.silentAudioReady = true;
    }).catch(() => {});
  }
}

function primeMediaAudio() {
  if (state.mediaAudioPrimed || !state.soundEnabled) return;
  const audio = getMediaAudio("unlock");
  if (!audio) return;
  audio.muted = true;
  audio.volume = 0;
  audio.currentTime = 0;
  const playPromise = audio.play();
  if (playPromise?.then) {
    playPromise.then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
      audio.volume = 1;
      state.mediaAudioPrimed = true;
    }).catch(() => {
      audio.muted = false;
      audio.volume = 1;
    });
  }
}

function playMediaSound(key, options = {}, fallback) {
  if (!state.soundEnabled) return false;
  const audio = getMediaAudio(key);
  if (!audio) return false;
  try {
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    audio.volume = Math.max(0, Math.min(1, options.volume ?? 0.82));
    const playPromise = audio.play();
    if (playPromise?.catch) playPromise.catch(() => fallback?.());
    return true;
  } catch {
    fallback?.();
    return false;
  }
}

function getAudioContext() {
  if (!state.soundEnabled) return null;
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  if (!AudioContext) return null;
  if (!state.audioContext) state.audioContext = new AudioContext();
  if (state.audioContext.state === "suspended") state.audioContext.resume().catch(() => {});
  return state.audioContext;
}

function playTone(frequency, duration = 0.07, offset = 0, gainValue = 0.025, type = "triangle", filterFrequency = 3800) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const start = ctx.currentTime + offset;
  const oscillator = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 1.012, start + duration * 0.72);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(filterFrequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.015);
}

function playSweep(from, to, duration = 0.12, offset = 0, gainValue = 0.018, type = "sine") {
  const ctx = getAudioContext();
  if (!ctx) return;
  const start = ctx.currentTime + offset;
  const oscillator = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(from, start);
  oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);
  filter.type = "lowpass";
  filter.frequency.setValueAtTime(4200, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function playNoisePop(offset = 0, duration = 0.045, gainValue = 0.018, filterFrequency = 2600) {
  const ctx = getAudioContext();
  if (!ctx) return;
  const start = ctx.currentTime + offset;
  const length = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) {
    const fade = 1 - (i / length);
    data[i] = (Math.random() * 2 - 1) * fade * fade;
  }
  const source = ctx.createBufferSource();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  filter.type = "bandpass";
  filter.frequency.setValueAtTime(filterFrequency, start);
  filter.Q.setValueAtTime(1.8, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(gainValue, start + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  source.buffer = buffer;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(start);
  source.stop(start + duration + 0.01);
}

function playAnswerSound(value) {
  unlockAudio();
  const played = playMediaSound(
    mediaSoundKey("answer", Math.max(1, Math.min(5, Number(value) || 3))),
    { volume: 0.72 },
    () => playSynthAnswerSound(value)
  );
  if (!played) playSynthAnswerSound(value);
}

function playSynthAnswerSound(value) {
  const tones = { 1: 520, 2: 580, 3: 660, 4: 740, 5: 820 };
  const base = tones[value] || 660;
  playTone(base, 0.062, 0, 0.03, "triangle");
  playTone(base * 1.5, 0.082, 0.032, 0.018, "sine");
}

function playMilestoneSound(subtle = false) {
  unlockAudio();
  const played = playMediaSound(
    "milestone",
    { volume: subtle ? 0.46 : 0.78 },
    () => playSynthMilestoneSound(subtle)
  );
  if (!played) playSynthMilestoneSound(subtle);
}

function playSynthMilestoneSound(subtle = false) {
  playTone(660, 0.075, 0, subtle ? 0.025 : 0.038, "triangle");
  playTone(880, 0.09, 0.052, subtle ? 0.022 : 0.032, "sine");
  playTone(1180, 0.1, 0.118, subtle ? 0.016 : 0.026, "triangle");
}

function playCardRewardSound(group = 1, subtle = false) {
  unlockAudio();
  if (!subtle) navigator.vibrate?.([12, 24, 10]);
  const variant = Math.abs((Number(group) || 1) - 1) % REWARD_SOUND_COUNT;
  const played = playMediaSound(
    mediaSoundKey("reward", variant + 1),
    { volume: subtle ? 0.54 : 0.92 },
    () => playSynthCardRewardSound(group, subtle, variant)
  );
  if (!played) playSynthCardRewardSound(group, subtle, variant);
}

function playSynthCardRewardSound(group = 1, subtle = false, forcedVariant = null) {
  const level = subtle ? 0.72 : 1.18;
  const gain = (value) => value * level;
  const variant = forcedVariant ?? Math.abs((Number(group) || 1) - 1) % REWARD_SOUND_COUNT;
  switch (variant) {
    case 0:
      playNoisePop(0, 0.035, gain(0.012), 1800);
      playTone(660, 0.06, 0.018, gain(0.028), "triangle");
      playTone(880, 0.07, 0.074, gain(0.024), "sine");
      playTone(1320, 0.08, 0.132, gain(0.018), "triangle");
      break;
    case 1:
      playTone(740, 0.055, 0, gain(0.028), "square", 3200);
      playTone(980, 0.06, 0.052, gain(0.024), "triangle");
      playNoisePop(0.112, 0.045, gain(0.018), 3200);
      playTone(1480, 0.08, 0.132, gain(0.018), "sine");
      break;
    case 2:
      playSweep(520, 1040, 0.13, 0, gain(0.024), "sine");
      playTone(1310, 0.07, 0.108, gain(0.018), "triangle");
      playTone(1560, 0.08, 0.155, gain(0.015), "sine");
      break;
    case 3:
      playNoisePop(0, 0.038, gain(0.016), 2400);
      playNoisePop(0.054, 0.038, gain(0.014), 3100);
      playTone(880, 0.07, 0.082, gain(0.022), "triangle");
      playTone(1175, 0.08, 0.145, gain(0.018), "sine");
      break;
    case 4:
      playTone(587, 0.055, 0, gain(0.024), "triangle");
      playTone(784, 0.055, 0.052, gain(0.024), "triangle");
      playTone(988, 0.06, 0.104, gain(0.022), "triangle");
      playTone(1319, 0.1, 0.165, gain(0.019), "sine");
      break;
    case 5:
      playSweep(980, 620, 0.08, 0, gain(0.018), "sine");
      playTone(740, 0.05, 0.072, gain(0.024), "triangle");
      playTone(1110, 0.08, 0.118, gain(0.02), "sine");
      playNoisePop(0.19, 0.04, gain(0.014), 3400);
      break;
    case 6:
      playTone(660, 0.045, 0, gain(0.022), "square", 3000);
      playTone(660, 0.045, 0.058, gain(0.018), "square", 3000);
      playTone(990, 0.07, 0.122, gain(0.022), "triangle");
      playTone(1320, 0.09, 0.184, gain(0.016), "sine");
      break;
    case 7:
      playNoisePop(0, 0.035, gain(0.014), 2800);
      playSweep(700, 1400, 0.09, 0.026, gain(0.022), "triangle");
      playSweep(920, 1840, 0.1, 0.112, gain(0.016), "sine");
      break;
    case 8:
      playTone(523, 0.052, 0, gain(0.02), "triangle");
      playTone(659, 0.052, 0.044, gain(0.022), "triangle");
      playTone(784, 0.052, 0.088, gain(0.024), "triangle");
      playTone(1047, 0.085, 0.15, gain(0.018), "sine");
      break;
    case 9:
      playNoisePop(0, 0.045, gain(0.018), 2200);
      playTone(880, 0.055, 0.03, gain(0.02), "triangle");
      playTone(1175, 0.065, 0.09, gain(0.018), "triangle");
      playSweep(1320, 1760, 0.1, 0.145, gain(0.014), "sine");
      break;
    case 10:
      playSweep(430, 760, 0.075, 0, gain(0.019), "triangle");
      playSweep(580, 1020, 0.075, 0.075, gain(0.019), "triangle");
      playTone(1520, 0.09, 0.156, gain(0.017), "sine");
      break;
    case 11:
      playTone(698, 0.045, 0, gain(0.022), "triangle");
      playNoisePop(0.048, 0.038, gain(0.012), 2600);
      playTone(932, 0.06, 0.075, gain(0.021), "triangle");
      playTone(1397, 0.09, 0.14, gain(0.017), "sine");
      break;
    case 12:
      playTone(622, 0.05, 0, gain(0.022), "triangle");
      playTone(831, 0.052, 0.046, gain(0.024), "triangle");
      playTone(1245, 0.065, 0.094, gain(0.021), "sine");
      playTone(1661, 0.088, 0.15, gain(0.016), "triangle");
      break;
    case 13:
      playNoisePop(0, 0.035, gain(0.014), 3600);
      playTone(988, 0.048, 0.03, gain(0.021), "square", 3600);
      playTone(784, 0.052, 0.086, gain(0.022), "triangle");
      playTone(1175, 0.078, 0.14, gain(0.018), "sine");
      playNoisePop(0.205, 0.035, gain(0.012), 4200);
      break;
    case 14:
      playSweep(540, 920, 0.09, 0, gain(0.019), "triangle");
      playNoisePop(0.07, 0.038, gain(0.014), 3000);
      playTone(1350, 0.075, 0.112, gain(0.019), "sine");
      playSweep(1620, 1210, 0.085, 0.178, gain(0.014), "sine");
      break;
    case 15:
      playTone(587, 0.04, 0, gain(0.02), "triangle");
      playTone(740, 0.044, 0.036, gain(0.021), "triangle");
      playTone(880, 0.048, 0.072, gain(0.022), "triangle");
      playTone(1175, 0.07, 0.118, gain(0.018), "sine");
      playTone(1760, 0.085, 0.172, gain(0.014), "triangle");
      break;
    case 16:
      playSweep(700, 1050, 0.07, 0, gain(0.02), "sine");
      playSweep(820, 1230, 0.07, 0.066, gain(0.019), "triangle");
      playTone(1480, 0.07, 0.13, gain(0.018), "sine");
      playTone(1047, 0.09, 0.19, gain(0.014), "triangle");
      break;
    case 17:
      playNoisePop(0, 0.04, gain(0.016), 2600);
      playTone(1047, 0.046, 0.024, gain(0.021), "triangle");
      playTone(1319, 0.052, 0.072, gain(0.02), "triangle");
      playTone(1568, 0.06, 0.122, gain(0.018), "sine");
      playSweep(1865, 2093, 0.11, 0.18, gain(0.013), "sine");
      break;
    default:
      playSynthMilestoneSound(subtle);
  }
}

function playSoftTap() {
  unlockAudio();
  const played = playMediaSound("soft-tap", { volume: 0.62 }, playSynthSoftTap);
  if (!played) playSynthSoftTap();
}

function playSynthSoftTap() {
  playTone(760, 0.045, 0, 0.022, "triangle");
  playTone(1120, 0.052, 0.026, 0.014, "sine");
}

function isCoarsePointer() {
  return window.matchMedia?.("(pointer: coarse)")?.matches || false;
}

function exposeLocalSoundTester() {
  const localHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
  if (!localHost) return;
  window.jojoTestRewardSound = (group = 1) => playCardRewardSound(group);
}

function showGeneratingState() {
  const overlay = $("generatingOverlay");
  const title = isSubtypeMode(state.mode) ? "jojo正在整理你的注意力入口" : "jojo正在把答案整理成一张地图";
  $("generatingTitle").textContent = title;
  $("generatingStepOne").textContent = isSubtypeMode(state.mode) ? "收好选择" : "收好答案";
  $("generatingStepTwo").textContent = isSubtypeMode(state.mode) ? "整理入口" : "整理线索";
  $("generatingStepThree").textContent = isSubtypeMode(state.mode) ? "生成排序" : "生成主调";
  ["generatingStepOne", "generatingStepTwo", "generatingStepThree"].forEach((id) => $(id).classList.remove("active"));
  overlay.hidden = false;
  state.generatingTimers.forEach((timer) => window.clearTimeout(timer));
  state.generatingTimers = [
    window.setTimeout(() => $("generatingStepOne").classList.add("active"), 80),
    window.setTimeout(() => $("generatingStepTwo").classList.add("active"), 420),
    window.setTimeout(() => $("generatingStepThree").classList.add("active"), 780)
  ];
  playMilestoneSound(true);
  return new Promise((resolve) => window.setTimeout(resolve, 960));
}

function hideGeneratingState() {
  state.generatingTimers.forEach((timer) => window.clearTimeout(timer));
  state.generatingTimers = [];
  $("generatingOverlay").hidden = true;
}

async function submitResult() {
  const total = state.session.questions.length;
  const answers = state.session.questions.map((question) => ({
    question_id: question.id,
    answer: state.answers[question.id]
  }));

  if (answers.some((item) => !item.answer)) {
    alert("还有题目未完成，请返回检查。");
    state.moving = false;
    return;
  }

  $("questionText").textContent = isSubtypeMode(state.mode) ? "正在生成你的副型结果" : "正在生成你的九型地图";
  $("questionKicker").textContent = "请稍候";
  trackEvent("submit_start", {
    mode: state.session.mode || state.mode,
    answer_count: answers.length,
    has_team: Boolean(state.team)
  });
  const minimumWait = showGeneratingState();

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        session_id: state.session.session_id,
        session_token: state.session.session_token,
        mode: state.session.mode || state.mode,
        team_code: state.team?.code || "",
        device_token: state.deviceToken,
        account_token: state.accountToken,
        started_at: state.startedAt,
        finished_at: new Date().toISOString(),
        user: state.user,
        answers
      })
    });
    if (!response.ok) throw new Error("submit_failed");
    const result = await response.json();
    await minimumWait;
    hideGeneratingState();
    state.result = result;
    rememberResult(state.result);
    clearDraft();
    trackEvent("submit_success", {
      mode: state.result.test_mode,
      result_kind: isSubtypeResult(state.result) ? "subtype" : "main",
      has_team: Boolean(state.result.team)
    });
    if (isSubtypeResult(state.result)) {
      state.pendingMainCode = "";
      localStorage.removeItem(PENDING_MAIN_KEY);
    }
    renderResult(state.result);
    showScreen("result");
  } catch (err) {
    await minimumWait;
    hideGeneratingState();
    trackEvent("submit_error", {
      mode: state.session.mode || state.mode,
      message: err.message || "submit_failed"
    });
    alert("结果生成失败，请稍后再试。");
    state.moving = false;
    renderQuestion();
  }
}

function renderResult(result) {
  if (isSubtypeResult(result)) {
    renderSubtypeResult(result);
    return;
  }
  const primary = result.share.primary_type;
  $("resultScreen").dataset.type = primary;
  setShareDeckType(primary);
  renderShareDeck(result);
  resolveRecentResultBundle(result);
}

function renderSubtypeResult(result) {
  if (isTeamSubtypeResult(result)) {
    renderTeamSubtypeSubmission(result);
    return;
  }
  const top = result.subtype_ranked?.[0];
  const topKey = top?.key || "social";
  $("resultScreen").dataset.type = 6;
  setShareDeckType(6);
  renderShareDeck(result);
  resolveRecentResultBundle(result);
}

function isTeamSubtypeResult(result) {
  return Boolean(result?.anonymous || result?.test_mode === "team_subtype" || result?.team?.test_kind === "subtype");
}

function renderTeamSubtypeSubmission(result) {
  $("resultScreen").dataset.type = 6;
  setShareDeckType(6);
  renderAnonymousTeamSubtypeShareDeck(result);
  renderResultUtilities(result);
}

async function resolveRecentResultBundle(result) {
  if (!result || isTeamSubtypeResult(result)) {
    renderResultUtilities(result);
    return;
  }
  const bundle = {
    current: result,
    main: isMainResult(result) ? result : null,
    subtype: isPersonalSubtypeResult(result) ? result : null
  };
  const targetKind = bundle.main ? "subtype" : "main";
  const targetCodes = await resolveLatestCandidateCodes(targetKind, result.verification_code);
  for (const targetCode of targetCodes) {
    const extra = await fetchPublicResultByCode(targetCode);
    if (extra && isRecentResult(extra)) {
      if (targetKind === "subtype" && isPersonalSubtypeResult(extra)) {
        bundle.subtype = extra;
        break;
      }
      if (targetKind === "main" && isMainResult(extra)) {
        bundle.main = extra;
        break;
      }
    }
  }
  if (state.result?.verification_code !== result.verification_code) return;
  renderShareDeck(result, bundle);
}

async function resolveLatestCandidateCodes(kind, excludeCode = "") {
  const localCodes = findLatestLocalCodes(kind, excludeCode);
  if (localCodes.length) return localCodes.slice(0, 5);
  if (!hasHistoryIdentity()) return [];
  try {
    const params = new URLSearchParams({ device: state.deviceToken });
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/me/results?${params.toString()}`, { credentials: "same-origin" });
    const data = response.ok ? await response.json() : {};
    const exclude = String(excludeCode || "").toUpperCase();
    const candidates = (data.results || [])
      .filter((item) => {
        const code = String(item.verification_code || "").toUpperCase();
        if (!code || code === exclude) return false;
        const mode = item.test_mode || "";
        const subtype = isSubtypeMode(mode);
        const teamSubtype = mode === "team_subtype";
        const created = new Date(item.created_at || 0).getTime();
        if (!created || Date.now() - created > TEN_DAYS_MS) return false;
        return kind === "subtype" ? subtype && !teamSubtype && !item.team : !subtype;
      })
      .sort((a, b) => new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime())
      .map((item) => String(item.verification_code || "").toUpperCase());
    return [...new Set(candidates)].slice(0, 5);
  } catch {
    return [];
  }
}

function mainHeroMetaHtml(result) {
  const top = result.top_types || [];
  const topText = top.map((item) => `${item.element}号`).join(" / ") || "待确认";
  const status = result.quality_flags?.length ? "需复核" : "可参考";
  return `
    <span><small>前三</small>${escapeHtml(topText)}</span>
    <span><small>编号</small>${escapeHtml(result.verification_code || "------")}</span>
    <span><small>稳定性</small>${escapeHtml(status)}</span>
  `;
}

function mainShareChipsHtml(result) {
  const primary = result.share?.primary_type || result.top_types?.[0]?.element || "-";
  const topText = (result.top_types || []).map((item) => `${item.element}`).join(" / ") || "-";
  return `
    <span>主调 ${escapeHtml(primary)}号</span>
    <span>前三 ${escapeHtml(topText)}</span>
    <span>ref ${escapeHtml(result.verification_code || "------")}</span>
  `;
}

function subtypeHeroMetaHtml(result) {
  const ranked = result.subtype_ranked || [];
  const top = ranked[0];
  const topName = top ? SUBTYPE_NAMES[top.key] || top.label : "待确认";
  const confidence = {
    clear: "集中",
    leaning: "有方向",
    mixed: "双倾向"
  }[result.subtype_confidence] || "需复核";
  return `
    <span><small>入口</small>${escapeHtml(topName)}</span>
    <span><small>编号</small>${escapeHtml(result.verification_code || "------")}</span>
    <span><small>状态</small>${escapeHtml(confidence)}</span>
  `;
}

function subtypeShareChipsHtml(result) {
  const ranked = result.subtype_ranked || [];
  const topText = ranked.slice(0, 2).map((item) => SUBTYPE_NAMES[item.key] || item.label).join(" / ") || "副型";
  return `
    <span>${escapeHtml(topText)}</span>
    <span>${escapeHtml(result.subtype_confidence === "mixed" ? "双倾向" : "副型入口")}</span>
    <span>ref ${escapeHtml(result.verification_code || "------")}</span>
  `;
}

function mainSnapshotHtml(result) {
  const top = result.top_types || [];
  const primary = top[0];
  const wing = result.report?.summary_cards?.find((item) => item.label === "侧翼");
  const primaryLabel = primary ? `${primary.element}号 ${TYPE_NAMES[primary.element] || ""}` : "待确认";
  const ranked = top.map((item) => `${item.element}号`).join(" / ") || "暂无";
  const evidence = result.quality_flags?.length ? "建议老师复核" : "可进入解读";
  const code = result.verification_code || "------";
  return `
    <div class="snapshot-card hero">
      <span>jojo先读到</span>
      <strong>${escapeHtml(primaryLabel)}</strong>
      <p>${escapeHtml(result.share?.summary || "先把它当作一张地图，而不是一个标签。")}</p>
    </div>
    <div class="snapshot-card">
      <span>侧翼</span>
      <strong>${escapeHtml(wing?.value || "待复核")}</strong>
      <p>${escapeHtml(wing?.text || "主型旁边更常被调用的一侧。")}</p>
    </div>
    <div class="snapshot-card soft">
      <span>给老师</span>
      <strong>${escapeHtml(evidence)}</strong>
      <p>编号 ${escapeHtml(code)} 可回查完整数据。</p>
    </div>
  `;
}

function subtypeSnapshotHtml(result) {
  const ranked = result.subtype_ranked || [];
  const top = ranked[0];
  const second = ranked[1];
  const title = top ? SUBTYPE_NAMES[top.key] || top.label : "副型倾向";
  const pairing = second ? `${title} / ${SUBTYPE_NAMES[second.key] || second.label}` : title;
  const confidence = {
    clear: "倾向较集中",
    leaning: "有明显方向",
    mixed: "双倾向观察"
  }[result.subtype_confidence] || "需要复核";
  return `
    <div class="snapshot-card hero">
      <span>第一副型</span>
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(result.share?.summary || "副型用于补充主型，不单独定论。")}</p>
    </div>
    <div class="snapshot-card">
      <span>第二副型</span>
      <strong>${escapeHtml(pairing)}</strong>
      <p>${escapeHtml(confidence)}，建议结合主型一起看。</p>
    </div>
    <div class="snapshot-card soft">
      <span>给老师</span>
      <strong>${escapeHtml(result.verification_code || "------")}</strong>
      <p>可与主型编号合成综合报告。</p>
    </div>
  `;
}

function topTypeHtml(item, index) {
  const label = TYPE_NAMES[item.element] || `${item.element}号`;
  const rank = ["主调", "次高", "第三"][index] || "参考";
  const score = Math.round(item.type_percent);
  return `
    <div class="top-type-item">
      <span>${rank}</span>
      <div class="top-type-head">
        <strong class="top-type-title"><small>${item.element} 型</small>${label}</strong>
        <strong>${score}%</strong>
      </div>
      <div class="type-bar"><span style="width:${score}%"></span></div>
    </div>
  `;
}

function mainTopTypeHtml(result) {
  const top = result.top_types || [];
  const primary = top[0];
  const secondary = top[1];
  const third = top[2];
  return `
    <div class="top-type-item">
      <span>主型</span>
      <div class="top-type-head">
        <strong class="top-type-title"><small>${primary?.element || "-"} 型</small>${TYPE_NAMES[primary?.element] || "待确认"}</strong>
        <strong>${Math.round(primary?.type_percent || 0)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(primary?.type_percent || 0)}%"></span></div>
    </div>
    <div class="top-type-item">
      <span>第二</span>
      <div class="top-type-head">
        <strong class="top-type-title"><small>${secondary?.element || "-"} 型</small>${TYPE_NAMES[secondary?.element] || "待确认"}</strong>
        <strong>${Math.round(secondary?.type_percent || 0)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(secondary?.type_percent || 0)}%"></span></div>
    </div>
    <div class="top-type-item">
      <span>第三</span>
      <div class="top-type-head">
        <strong class="top-type-title"><small>${third?.element || "-"} 型</small>${TYPE_NAMES[third?.element] || "待确认"}</strong>
        <strong>${Math.round(third?.type_percent || 0)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(third?.type_percent || 0)}%"></span></div>
    </div>
  `;
}

function subtypeTypeHtml(item, index) {
  const rank = ["主倾向", "第二倾向", "第三倾向"][index] || "参考";
  return `
    <div class="top-type-item">
      <span>${rank}</span>
      <div class="top-type-head">
        <strong>${SUBTYPE_NAMES[item.key] || item.label}</strong>
        <strong>${Math.round(item.percent)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(item.percent)}%"></span></div>
    </div>
  `;
}

function subtypeRankHtml(result) {
  const ranked = result.subtype_ranked || [];
  const primary = ranked[0];
  const secondary = ranked[1];
  const third = ranked[2];
  return `
    <div class="top-type-item">
      <span>第一副型</span>
      <div class="top-type-head">
        <strong>${SUBTYPE_NAMES[primary?.key] || primary?.label || "待确认"}</strong>
        <strong>${Math.round(primary?.percent || 0)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(primary?.percent || 0)}%"></span></div>
    </div>
    <div class="top-type-item">
      <span>第二副型</span>
      <div class="top-type-head">
        <strong>${SUBTYPE_NAMES[secondary?.key] || secondary?.label || "待确认"}</strong>
        <strong>${Math.round(secondary?.percent || 0)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(secondary?.percent || 0)}%"></span></div>
    </div>
    <div class="top-type-item">
      <span>第三副型</span>
      <div class="top-type-head">
        <strong>${SUBTYPE_NAMES[third?.key] || third?.label || "待确认"}</strong>
        <strong>${Math.round(third?.percent || 0)}%</strong>
      </div>
      <div class="type-bar"><span style="width:${Math.round(third?.percent || 0)}%"></span></div>
    </div>
  `;
}

function evidenceBarsHtml(scores) {
  if (!scores) return "";
  return `
    <div class="evidence-title">1-9号证据条</div>
    ${[1,2,3,4,5,6,7,8,9].map((element) => {
      const item = scores[element] || {};
      const total = (item.yes || 0) + (item.uncertain || 0) + (item.no || 0) || 1;
      const no = Math.round((item.no || 0) / total * 100);
      const uncertain = Math.round((item.uncertain || 0) / total * 100);
      const yes = Math.max(0, 100 - no - uncertain);
      return `
        <div class="evidence-row">
          <span class="evidence-label">${element}号</span>
          <div class="evidence-track">
            <span class="no" style="width:${no}%"></span>
            <span class="uncertain" style="width:${uncertain}%"></span>
            <span class="yes" style="width:${yes}%"></span>
            <i></i>
          </div>
          <strong>${Math.round(item.type_percent || 0)}%</strong>
        </div>
      `;
    }).join("")}
  `;
}

function subtypeBarsHtml(items = []) {
  return `
    <div class="evidence-title">副型三项分布</div>
    ${items.map((item) => `
      <div class="evidence-row subtype">
        <span class="evidence-label">${SUBTYPE_NAMES[item.key] || item.label}</span>
        <div class="evidence-track single">
          <span class="yes" style="width:${Math.round(item.percent)}%"></span>
          <i></i>
        </div>
        <strong>${Math.round(item.percent)}%</strong>
      </div>
    `).join("")}
  `;
}

function teamSubtypeSnapshotHtml(result) {
  return `
    <div class="snapshot-card hero">
      <span>提交状态</span>
      <strong>已进入匿名汇总</strong>
      <p>团队页只看整体，不看单个人。</p>
    </div>
    <div class="snapshot-card">
      <span>团队</span>
      <strong>${escapeHtml(result.team?.name || "团队")}</strong>
      <p>本次结果会计入团队副型总图。</p>
    </div>
    <div class="snapshot-card soft">
      <span>匿名提交</span>
      <strong>只看整体</strong>
      <p>个人排序不公开。</p>
    </div>
  `;
}

function teamSubtypeTopHtml(result) {
  return `
    <div class="top-type-item">
      <span>匿名提交</span>
      <strong>只看整体</strong>
    </div>
    <div class="top-type-item">
      <span>团队汇总</span>
      <strong>${escapeHtml(result.team?.name || "团队")}</strong>
    </div>
    <div class="top-type-item">
      <span>测试类型</span>
      <strong>团队副型</strong>
    </div>
  `;
}

function resultPanelHtml(report, result) {
  if (!report) return "";
  const cards = (report.summary_cards || []).slice(0, 2).map((item) => `
    <div class="report-summary-card">
      <span>${escapeHtml(item.label)}</span>
      <strong>${escapeHtml(item.value)}</strong>
      <p>${escapeHtml(item.text)}</p>
    </div>
  `).join("");
  const top = result?.top_types?.slice(0, 3).map((item) => `${item.element}号`).join(" / ") || "";
  const subtype = result?.subtype_ranked?.slice(0, 3).map((item) => SUBTYPE_NAMES[item.key] || item.label).join(" / ") || "";
  return `
    <section class="report-block">
      <div class="report-head">
        <span>简要分析</span>
        <strong>${escapeHtml(report.title || "结果参考")}</strong>
      </div>
      <p>${escapeHtml(report.focus || "先看结果分布，再看简要分析。深入解读建议交给老师。")}</p>
      ${cards ? `<div class="report-summary-grid">${cards}</div>` : ""}
      <div class="report-pulse">
        ${top ? `<span>主型 ${escapeHtml(top)}</span>` : ""}
        ${subtype ? `<span>副型 ${escapeHtml(subtype)}</span>` : ""}
        <span>${escapeHtml(report.caution || "更完整的判断建议结合访谈。")}</span>
      </div>
    </section>
  `;
}

function renderCombinedReport(data) {
  const report = data.report || {};
  const main = data.main || {};
  const subtype = data.subtype || {};
  const primary = main.share?.primary_type || main.top_types?.[0]?.element || "-";
  const wing = report.summary_cards?.find((item) => item.label === "侧翼")?.value
    || main.report?.summary_cards?.find((item) => item.label === "侧翼")?.value
    || "侧翼待复核";
  const ranked = subtype.subtype_ranked || [];
  const topSubtype = ranked[0];
  const secondSubtype = ranked[1];
  const subtypeTitle = topSubtype
    ? `${SUBTYPE_NAMES[topSubtype.key] || topSubtype.label}${secondSubtype ? ` / ${SUBTYPE_NAMES[secondSubtype.key] || secondSubtype.label}` : ""}`
    : "副型待确认";
  const mainTop = (main.top_types || []).map((item) => `${item.element}号`).join(" / ") || "暂无";
  const subtypeRank = ranked.map((item) => `${SUBTYPE_NAMES[item.key] || item.label} ${Math.round(item.percent || 0)}%`).join(" / ") || "暂无";
  const codeText = `${main.verification_code || ""} · ${subtype.verification_code || ""}`;
  $("combinedTitle").textContent = report.title || "主型 × 副型";
  $("combinedNote").textContent = "截图结果卡即可转发；更完整的判断交给老师结合访谈校准。";
  $("combinedCodes").textContent = codeText;
  const combinedFocus = report.focus || "主型看核心动机，副型看这个动机最常进入生活的入口。";
  const briefFocus = combinedFocus.split("。").filter(Boolean)[0] || "主型看核心动机，副型看注意力入口";
  const primaryCardTitle = `${primary}号 × ${subtypeTitle}`;
  $("combinedContent").innerHTML = `
    <section class="share-deck combined-share-deck" aria-label="综合结果分享卡">
      <article class="share-card share-card-primary" data-type="${escapeHtml(primary)}">
        <div class="share-watermark" aria-hidden="true">${escapeHtml(String(primary))}</div>
        <div class="share-top">
          <span class="share-brand full-logo"><img src="/jojo-logo.png" alt="jojo测九型"></span>
          <span>01 / 02</span>
        </div>
        <div class="share-body">
          <div class="share-core">
            <p class="share-label">主副型综合</p>
            <h3>${escapeHtml(primaryCardTitle)}</h3>
            <p>${escapeHtml(briefFocus)}。</p>
            <div class="share-chips">
              <span>主调 ${escapeHtml(primary)}号</span>
              <span>${escapeHtml(wing)}</span>
            </div>
          </div>
          <div class="share-mini-map">${mainResultDistributionHtml(main)}</div>
        </div>
        <div class="share-footer">
          <span>前三 ${escapeHtml(mainTop.replace(/号/g, ""))}</span>
          <span class="hidden-code">ref ${escapeHtml(codeText)}</span>
        </div>
      </article>
      <article class="share-card share-card-evidence" data-type="${escapeHtml(primary)}">
        <div class="share-watermark" aria-hidden="true">02</div>
        <div class="share-top">
          <span class="share-brand full-logo"><img src="/jojo-logo.png" alt="jojo测九型"></span>
          <span>02 / 02</span>
        </div>
        <div class="share-core share-card-stack">
          <p class="share-label">副型排序</p>
          <h3>${escapeHtml(subtypeTitle)}</h3>
          <p>副型不是单选标签，更像注意力入口的前后顺序。</p>
          <div class="poster-analysis poster-combined-visual">
            ${subtypePieHtml(ranked)}
          </div>
        </div>
        <div class="share-footer">
          <span>${escapeHtml(subtypeRank)}</span>
          <span class="hidden-code">ref ${escapeHtml(subtype.verification_code || "------")}</span>
        </div>
      </article>
      <article class="share-card share-card-next" data-type="${escapeHtml(primary)}" hidden>
        <div class="share-watermark" aria-hidden="true">go</div>
        <div class="share-top">
          <span class="share-brand full-logo"><img src="/jojo-logo.png" alt="jojo测九型"></span>
          <span>03 / 03</span>
        </div>
        <div class="share-core share-card-stack">
          <p class="share-label">下一步</p>
          <h3>带着编号找老师</h3>
          <p>${escapeHtml(report.caution || "这是一张地图，不是最终标签；建议结合真实事件和老师访谈校准。")}</p>
          <div class="poster-qr-block">${getGroupQrHtml(main)}</div>
        </div>
        <div class="share-footer">
          <span>保存图片 / 老师校准</span>
          <span class="hidden-code">ref ${escapeHtml(codeText)}</span>
        </div>
      </article>
    </section>
  `;
  updateShareCardPagination($("combinedScreen"));
}

function subtypeCalibrationCopy(result) {
  if (result.subtype_confidence === "mixed") {
    return "副型暂不强判，建议结合主型复核。";
  }
  if (result.subtype_confidence === "leaning") {
    return "副型有方向，第二倾向可作为补充观察。";
  }
  return "副型倾向较集中，可补充主型报告。";
}

function setShareDeckType(type) {
  const cards = ["shareCard", "shareEvidenceCard", "shareNextCard"];
  for (const id of cards) {
    const node = $(id);
    if (node) node.dataset.type = type;
  }
}

function renderShareDeck(result, bundle = null) {
  if (!result) return;
  if (isTeamSubtypeResult(result)) {
    renderAnonymousTeamSubtypeShareDeck(result);
    return;
  }
  const deck = normalizeResultBundle(result, bundle);
  const main = deck.main;
  const subtype = deck.subtype;
  const hasSubtype = isPersonalSubtypeResult(subtype);
  const primary = getMainPrimary(main) || 6;
  const cardType = main ? primary : 6;
  const code = result.verification_code || main?.verification_code || subtype?.verification_code || "------";
  const translation = main
    ? (RESULT_TRANSLATIONS[primary] || RESULT_TRANSLATIONS[9])
    : subtypeTranslation(subtype);
  const usage = main ? translation : subtypeUsage(subtype);
  const mainOnly = Boolean(main && !hasSubtype);
  const isSubtypeOnly = Boolean(!main && hasSubtype);

  $("shareDeck")?.classList.remove("team-subtype-share-deck");
  $("shareDeck")?.classList.toggle("main-only-share-deck", mainOnly);
  $("shareDeck")?.classList.toggle("subtype-only-share-deck", isSubtypeOnly);
  $("shareDeck")?.classList.toggle("combined-result-share-deck", Boolean(main && hasSubtype));
  $("shareDeck")?.classList.toggle("child-subtype-share-deck", Boolean(subtype?.test_mode === "subtype_child"));
  setShareDeckType(cardType);
  $("shareNumber").textContent = main ? `${primary}` : "sx";
  $("hiddenCode").textContent = `ref ${code}`;
  $("sharePrimaryKicker").textContent = identityCardKicker(deck);
  $("shareTitle").textContent = identityCardTitle(deck);
  $("shareLine").textContent = identityCardLine(deck, result);
  $("shareChips").innerHTML = identityCardChips(deck, result).map((text) => `<span>${escapeHtml(text)}</span>`).join("");
  $("shareMiniMap").innerHTML = identityVisualHtml(deck);
  $("shareTopTypes").textContent = identityCardFooter(deck, result);

  $("shareEvidenceTitle").textContent = briefAnalysisTitle(deck, result);
  $("shareEvidenceKicker").textContent = "结果重点";
  $("shareEvidenceLine").textContent = briefAnalysisLine(deck, result);
  $("shareEvidenceVisual").innerHTML = briefAnalysisHtml(deck, translation, usage, result);
  $("shareEvidenceFoot").textContent = "带编号深看";
  $("shareEvidenceCode").textContent = `ref ${code}`;

  const showNextCard = shouldShowNextCard(deck, result);
  $("shareEvidenceCard").dataset.type = cardType;
  $("shareNextCard").dataset.type = cardType;
  $("shareNextCard").hidden = !showNextCard;
  if (showNextCard) {
    $("shareNextKicker").textContent = nextCardKicker(deck, result);
    $("shareNextTitle").textContent = nextCardTitle(deck, result);
    $("shareNextLine").textContent = nextCardLine(deck, result);
    $("shareNextQr").innerHTML = nextCardHtml(deck, usage, result);
    $("shareNextFoot").textContent = nextCardFooter(deck, result);
    $("shareNextCode").textContent = `ref ${code}`;
  }
  updateShareCardPagination($("resultScreen"));
  renderResultUtilities(result);
  resetResultFeedback();
}

function resetResultFeedback() {
  const holder = byId("resultFeedback");
  if (!holder) return;
  const result = state.result || {};
  const isTeamResult = Boolean(result?.team?.code || isTeamSubtypeResult(result));
  holder.hidden = isTeamResult;
  if (isTeamResult) return;
  holder.classList.remove("answered");
  const text = holder.querySelector("span");
  const childResult = isChildSubtypeResult(result);
  if (text) text.textContent = childResult ? "这个观察有帮助吗？" : "这个结果像你吗？";
  holder.querySelectorAll("button[data-feedback]").forEach((item, index) => {
    item.disabled = false;
    item.classList.remove("selected");
    if (index === 0) {
      item.dataset.feedback = childResult ? "helpful" : "fit";
      item.textContent = childResult ? "有帮助" : "挺像";
    }
    if (index === 1) {
      item.dataset.feedback = childResult ? "review" : "unsure";
      item.textContent = childResult ? "想复核" : "有点拿不准";
    }
  });
}

function updateShareCardPagination(root = document) {
  const cards = [...root.querySelectorAll(".share-card")].filter((card) => !card.hidden);
  cards.forEach((card, index) => {
    const page = card.querySelector(".share-top > span:last-child");
    if (page) page.textContent = `${String(index + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  });
  const saveButton = root.querySelector("#shareSaveButton, #combinedPrintButton");
  if (saveButton) saveButton.textContent = `保存${cards.length}张图片`;
}

function renderSubtypeShareDeck(result, bundle = null) {
  renderShareDeck(result, bundle || { current: result, subtype: result, main: null });
}

function normalizeResultBundle(result, bundle = null) {
  const normalized = bundle || {};
  return {
    current: normalized.current || result,
    main: normalized.main || (isMainResult(result) ? result : null),
    subtype: normalized.subtype || (isPersonalSubtypeResult(result) ? result : null)
  };
}

function getMainPrimary(main) {
  const value = Number(main?.share?.primary_type || main?.top_types?.[0]?.element || 0);
  return value >= 1 && value <= 9 ? value : null;
}

function getWingNumber(main) {
  const primary = getMainPrimary(main);
  if (!primary) return null;
  const value = main?.report?.summary_cards?.find((item) => item.label === "侧翼")?.value || "";
  const parsed = Number(String(value).match(/(\d+)/)?.[1] || 0);
  if (parsed >= 1 && parsed <= 9) return parsed;
  const left = primary === 1 ? 9 : primary - 1;
  const right = primary === 9 ? 1 : primary + 1;
  const leftScore = Number(main?.scores?.[left]?.type_score ?? -1);
  const rightScore = Number(main?.scores?.[right]?.type_score ?? -1);
  if (leftScore < 0 && rightScore < 0) return null;
  return rightScore > leftScore ? right : left;
}

function getSubtypeTop(subtype) {
  return isPersonalSubtypeResult(subtype) ? subtype.subtype_ranked?.[0] || null : null;
}

function getSubtypeSecond(subtype) {
  return isPersonalSubtypeResult(subtype) ? subtype.subtype_ranked?.[1] || null : null;
}

function mainTypeCode(main) {
  const primary = getMainPrimary(main);
  const wing = getWingNumber(main);
  return primary ? `${primary}${wing ? `w${wing}` : "号"}` : "主型";
}

function mainOnlyTitle(main) {
  const primary = getMainPrimary(main);
  const typeName = primary ? (TYPE_NAMES[primary] || main?.share?.title || `${primary}号`) : "主型结果";
  return primary ? `${mainTypeCode(main)} · ${typeName}` : typeName;
}

function mainPersonaName(main) {
  const primary = getMainPrimary(main);
  return primary ? (TYPE_PERSONA_NAMES[primary] || TYPE_NAMES[primary] || `${primary}号`) : "九型探索者";
}

function subtypePersonaName(subtype) {
  const top = getSubtypeTop(subtype);
  return top ? (SUBTYPE_PERSONA_NAMES[top.key] || SUBTYPE_SHORT_NAMES[top.key] || SUBTYPE_NAMES[top.key] || top.label) : "副型待补";
}

function subtypeTopName(subtype, short = false) {
  const top = getSubtypeTop(subtype);
  if (!top) return short ? "副型待补" : "副型待补";
  return short
    ? (SUBTYPE_SHORT_NAMES[top.key] || SUBTYPE_NAMES[top.key] || top.label)
    : (SUBTYPE_NAMES[top.key] || top.label);
}

function subtypeSecondName(subtype) {
  const second = getSubtypeSecond(subtype);
  return second ? (SUBTYPE_NAMES[second.key] || second.label) : "";
}

function mainIdentitySentence(main) {
  const primary = getMainPrimary(main);
  return primary ? (TYPE_IDENTITY_LINES[primary] || TYPE_RESULT_LINES[primary] || "先把结果当成一张地图。") : "先把结果当成一张地图。";
}

function subtypeIdentitySentence(subtype) {
  const top = getSubtypeTop(subtype);
  if (!top) return "副型可以之后补，本次先看主位。";
  if (isChildSubtypeResult(subtype)) return SUBTYPE_PARENT_LINES[top.key] || "先观察孩子更常进入的注意力入口。";
  return SUBTYPE_IDENTITY_LINES[top.key] || "副型看注意力入口，不是单一标签。";
}

function resultConfidenceLabel(result) {
  if (result?.quality_flags?.length) return "建议复核";
  if (result?.subtype_confidence) {
    return {
      clear: "较集中",
      leaning: "有方向",
      mixed: "双倾向"
    }[result.subtype_confidence] || "可参考";
  }
  return "可参考";
}

function shouldShowNextCard(deck, result) {
  if (deck.main?.team?.code) return false;
  if (isChildSubtypeResult(deck.subtype || result)) return false;
  if (!deck.main && deck.subtype) return false;
  return Boolean(deck.main && deck.subtype);
}

function isChildSubtypeResult(result) {
  return Boolean(result?.test_mode === "subtype_child");
}

function bundleCurrentKind(deck) {
  if (deck.current?.team?.code && isMainResult(deck.current)) return "team_main";
  if (isChildSubtypeResult(deck.current)) return "child_subtype";
  if (isPersonalSubtypeResult(deck.current)) return "subtype";
  if (isMainResult(deck.current)) return "main";
  return "result";
}

function bundleHasRecentMerge(deck, result) {
  if (!deck.main || !deck.subtype) return false;
  const currentCode = result?.verification_code || deck.current?.verification_code || "";
  return Boolean(currentCode && currentCode !== deck.main.verification_code || currentCode && currentCode !== deck.subtype.verification_code);
}

function topTypesText(main, separator = "/") {
  return (main?.top_types || []).slice(0, 3).map((item) => item.element).join(separator) || "-";
}

function subtypePairText(subtype, withPercent = false) {
  const ranked = subtype?.subtype_ranked || [];
  return ranked.slice(0, 2).map((item) => {
    const name = SUBTYPE_NAMES[item.key] || item.label || "副型";
    return withPercent ? `${name}${Math.round(item.percent || 0)}%` : name;
  }).join(" / ") || "副型待补";
}

function identityCardKicker(deck) {
  const kind = bundleCurrentKind(deck);
  if (kind === "team_main") return "我的团队主型提交";
  if (kind === "child_subtype") return "亲子观察卡";
  if (deck.main && deck.subtype) return "我的九型身份卡";
  if (deck.main) return "我的主型身份卡";
  return "我的副型身份卡";
}

function identityCardTitle(deck) {
  const main = deck.main;
  const subtype = deck.subtype;
  if (main && subtype) {
    return `我是 ${mainTypeCode(main)} · ${subtypeTopName(subtype, true)}优先的${mainPersonaName(main)}`;
  }
  if (main?.team?.code) return `我以 ${mainTypeCode(main)} 计入团队总图`;
  if (main) return `我是 ${mainTypeCode(main)} 的${mainPersonaName(main)}`;
  if (isChildSubtypeResult(subtype)) return `${subtypeTopName(subtype)}优先的亲子观察`;
  if (subtype) return `${subtypeTopName(subtype)}优先的${subtypePersonaName(subtype)}`;
  return "结果待确认";
}

function identityCardLine(deck, result) {
  const main = deck.main;
  const subtype = deck.subtype;
  if (main?.team?.code) {
    return "个人主位只在你这里展示；团队页只看汇总分布，不给单个人贴标签。";
  }
  if (main && subtype) {
    const prefix = bundleHasRecentMerge(deck, result) ? "已结合你近10天内的另一份测试。" : "";
    return `${prefix}${mainIdentitySentence(main)} ${subtypeIdentitySentence(subtype)}`;
  }
  if (main) {
    return `${mainIdentitySentence(main)} 这张卡先呈现你的主型和侧翼。`;
  }
  if (isChildSubtypeResult(subtype)) {
    return `${subtypeIdentitySentence(subtype)} 这不是标签，是亲子沟通的观察入口。`;
  }
  return `${subtypeIdentitySentence(subtype)} 这张卡先看副型排序；补上主型后，老师能读得更稳。`;
}

function identityCardChips(deck, result) {
  const main = deck.main;
  const subtype = deck.subtype;
  const chips = [];
  if (main) {
    chips.push(`主型 ${mainTypeCode(main)}`);
    chips.push(`前三 ${topTypesText(main)}`);
    if (main.team?.code) {
      chips.push("已入团队");
      if (main?.quality_flags?.length) chips.push("建议复核");
      return chips.filter(Boolean).slice(0, 4);
    }
  } else {
    chips.push(isChildSubtypeResult(subtype) ? "亲子观察" : "主型可补");
  }
  if (isPersonalSubtypeResult(subtype)) {
    const topSubtype = getSubtypeTop(subtype);
    chips.push(topSubtype ? `${SUBTYPE_SHORT_NAMES[topSubtype.key] || SUBTYPE_NAMES[topSubtype.key] || topSubtype.label}优先` : "副型待确认");
  } else if (main) {
    chips.push("副型可补");
  }
  if (bundleHasRecentMerge(deck, result)) chips.push("近10天合并");
  if (main?.quality_flags?.length || subtype?.quality_flags?.length) chips.push("建议复核");
  return chips.filter(Boolean).slice(0, 4);
}

function identityCardFooter(deck, result) {
  if (deck.main?.team?.code) return `团队提交 · 前三 ${topTypesText(deck.main, " / ")}`;
  if (deck.main && deck.subtype) return `主型 ${topTypesText(deck.main, " / ")} · 副型 ${subtypePairText(deck.subtype, true)}`;
  if (deck.main) return `主位 ${topTypesText(deck.main, " / ")} · ${resultConfidenceLabel(deck.main)}`;
  return `副型 ${subtypePairText(deck.subtype, true)}`;
}

function identityTitle(bundle) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  const primary = getMainPrimary(main);
  const topSubtype = getSubtypeTop(subtype);
  const typeName = primary ? (TYPE_NAMES[primary] || main?.share?.title || `${primary}号`) : "";
  const subtypeName = topSubtype
    ? `${SUBTYPE_SHORT_NAMES[topSubtype.key] || SUBTYPE_NAMES[topSubtype.key] || topSubtype.label}优先`
    : "副型可补";
  if (!primary) {
    return topSubtype ? `${subtypeName} · 副型入口` : "副型入口";
  }
  return topSubtype ? `${mainTypeCode(main)} · ${subtypeName} · ${typeName}` : `${mainTypeCode(main)} · ${typeName}`;
}

function resultOverviewKicker(bundle) {
  if (bundle.main && bundle.subtype) return "结果总览";
  if (bundle.main) return bundle.main?.team?.code ? "团队主型已提交" : "主型结果";
  return "副型排序结果";
}

function resultOverviewTitle(bundle) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  if (main) {
    const primary = getMainPrimary(main);
    const typeName = primary ? TYPE_NAMES[primary] || `${primary}号` : "主型";
    const subtypeTop = getSubtypeTop(subtype);
    const subtypeText = subtypeTop ? `${SUBTYPE_SHORT_NAMES[subtypeTop.key] || SUBTYPE_NAMES[subtypeTop.key] || subtypeTop.label}优先` : "";
    return subtypeText ? `${mainTypeCode(main)} · ${subtypeText}` : `${mainTypeCode(main)} · ${typeName}`;
  }
  const top = getSubtypeTop(subtype);
  const second = getSubtypeSecond(subtype);
  if (!top) return "副型排序待确认";
  const first = SUBTYPE_NAMES[top.key] || top.label;
  const next = second ? ` / ${SUBTYPE_NAMES[second.key] || second.label}` : "";
  return `${first}${next}`;
}

function resultOverviewLine(bundle) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  const primary = getMainPrimary(main);
  if (main?.team?.code) {
    return `本次主型已计入「${main.team.name || "团队"}」总图；个人副型可之后再补。`;
  }
  if (main && isPersonalSubtypeResult(subtype)) {
    const first = getSubtypeTop(subtype);
    const second = getSubtypeSecond(subtype);
    return `主型看长期动机，副型看注意力入口。本次副型前两项为 ${SUBTYPE_NAMES[first?.key] || first?.label || "待确认"}${second ? ` / ${SUBTYPE_NAMES[second.key] || second.label}` : ""}。`;
  }
  if (main) {
    const line = TYPE_RESULT_LINES[primary] || "本次先呈现主型分布。";
    return `${line} 本次先呈现主型与侧翼。`;
  }
  const ranked = subtype?.subtype_ranked || [];
  if (ranked.length) {
    return "副型不是单一标签，更适合看从高到低的排序；补充主型后会更完整。";
  }
  return "本次先生成副型入口，建议与主型一起校准。";
}

function resultOverviewChips(bundle) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  const primary = getMainPrimary(main);
  const topSubtype = getSubtypeTop(subtype);
  const chips = [];
  if (primary) {
    chips.push(`主型 ${mainTypeCode(main)}`);
    chips.push(`前三 ${(main.top_types || []).slice(0, 3).map((item) => item.element).join("/") || "-"}`);
  } else {
    chips.push("主型可补");
  }
  if (isPersonalSubtypeResult(subtype)) {
    chips.push(topSubtype ? `${SUBTYPE_SHORT_NAMES[topSubtype.key] || SUBTYPE_NAMES[topSubtype.key] || topSubtype.label}优先` : "副型待确认");
  } else if (main) {
    chips.push("副型可补");
  }
  if (main?.quality_flags?.length || subtype?.quality_flags?.length) chips.push("建议复核");
  return chips.filter(Boolean).slice(0, 4);
}

function briefAnalysisTitle(bundle, result = null) {
  if (bundle.main?.team?.code) return "团队主型样本";
  if (isChildSubtypeResult(bundle.subtype || result)) return `${subtypeTopName(bundle.subtype || result)}亲子观察`;
  if (bundle.main && bundle.subtype) return `${mainTypeCode(bundle.main)}主副型特征`;
  if (bundle.main) return `${mainTypeCode(bundle.main)}核心特征`;
  return `${subtypeTopName(bundle.subtype || result)}副型特征`;
}

function briefAnalysisLine(bundle, result = null) {
  if (bundle.main?.team?.code) return "团队看分布，不给个人打分。";
  if (isChildSubtypeResult(bundle.subtype || result)) return "先看入口，再看家庭里的靠近方式。";
  if (bundle.main && bundle.subtype) return "主型看动力，副型看这个动力的入口。";
  if (bundle.main) return "抓核心动力，也看优势、压力和一句话翻译。";
  return "看第一、第二入口如何影响日常表现。";
}

function briefAnalysisHtml(bundle, translation, usage, result) {
  if (isChildSubtypeResult(bundle.subtype || result)) {
    const subtype = bundle.subtype || result;
    const ranked = subtype?.subtype_ranked || [];
    const first = ranked[0];
    const second = ranked[1];
    const firstName = first ? SUBTYPE_NAMES[first.key] || first.label : "待观察";
    const secondName = second ? SUBTYPE_NAMES[second.key] || second.label : "暂不明显";
    return analysisOneBoxHtml({
      eyebrow: "亲子观察重点",
      title: `${firstName}优先的靠近方式`,
      lead: `${subtypeIdentitySentence(subtype)} 这张卡适合先帮助家长看见孩子的入口，而不是急着给孩子定性。`,
      tags: [`第一 ${firstName}`, `第二 ${secondName}`, "先观察再沟通"],
      items: [
        ["第一入口", first ? `${SUBTYPE_NAMES[first.key] || first.label} ${Math.round(first.percent || 0)}%，更像孩子默认会先使用的靠近方式。` : "待继续观察。"],
        ["第二入口", second ? `${SUBTYPE_NAMES[second.key] || second.label}会一起影响亲近方式，尤其在家庭关系里容易出现。` : "暂不明显，先不急着补结论。"],
        ["家庭提示", "先接住孩子的入口，再谈要求和规则；把一次表现当线索，不把孩子固定成标签。"],
        ["老师校准", "少儿版一定要结合年龄、家庭互动和真实事件再判断。"]
      ],
      teacher: "亲子教育和亲密关系里，真实互动比单次分数更重要。"
    });
  }
  if (bundle.main) {
    const main = bundle.main;
    if (main.team?.code) {
      return teamMainSubmissionAnalysisHtml(main, result);
    }
    const primary = getMainPrimary(main);
    const analysis = TYPE_ANALYSIS[primary] || {
      focus: mainIdentitySentence(main),
      motive: "核心动力待复核",
      strength: translation.work,
      pressure: translation.pressure,
      relation: usage.near
    };
    const hasSubtype = isPersonalSubtypeResult(bundle.subtype);
    const subtype = bundle.subtype;
    const fourthLabel = hasSubtype ? "副型影响" : "一句话";
    const fourthText = hasSubtype
      ? `${subtypeTopName(subtype)}优先，会让这个主型更常从「${SUBTYPE_NAMES[getSubtypeTop(subtype)?.key] || subtypeTopName(subtype)}」入口表现出来。`
      : translation.friend;
    const typeTitle = primary ? `${primary}号 · ${TYPE_NAMES[primary] || "主型"}` : "核心动力";
    const usageText = `朋友翻译：${fourthText} 靠近：${usage.near}；避雷：${usage.avoid}；补能：${usage.charge}。`;
    return analysisOneBoxHtml({
      eyebrow: "核心特征",
      title: typeTitle,
      lead: analysis.focus,
      tags: [analysis.motive, shortFeatureTag(analysis.strength), resultConfidenceLabel(main)],
      items: [
        ["核心想要", `${analysis.motive}。这是你反复会回到的内在驱动力。`],
        ["高频优势", `${analysis.strength}。用在合适场景，会变成很稳定的个人力量。`],
        ["压力姿势", `${analysis.pressure}。压力大时会更明显，先看见它，再调整节奏。`],
        ["相处方式", usageText]
      ],
      teacher: "想看得更深，把编号和真实场景一起给老师。"
    });
  }
  const subtype = bundle.subtype;
  const ranked = subtype?.subtype_ranked || [];
  const first = ranked[0];
  const second = ranked[1];
  const firstName = first ? SUBTYPE_NAMES[first.key] || first.label : "待确认";
  const secondName = second ? SUBTYPE_NAMES[second.key] || second.label : "待确认";
  return analysisOneBoxHtml({
    eyebrow: "副型重点",
    title: `${firstName}优先${second ? ` · ${secondName}跟上` : ""}`,
    lead: first ? `你的注意力更容易先进入「${firstName}」，第二入口会一起影响日常表现。副型看的是入口排序，不是给人贴单选标签。` : "先看排序，再和主型一起校准。",
    tags: [`第一 ${firstName}`, `第二 ${secondName}`, resultConfidenceLabel(subtype)],
    items: [
      ["第一入口", first ? `${SUBTYPE_NAMES[first.key] || first.label} ${Math.round(first.percent || 0)}%，更像你进入生活和压力场景的默认入口。` : "待确认。"],
      ["第二入口", second ? `${SUBTYPE_NAMES[second.key] || second.label} ${Math.round(second.percent || 0)}%，会影响你的表达方式和关系节奏。` : "待确认。"],
      ["怎么理解", "第一副型像默认入口，第二副型像常用辅助手；两者组合起来，才更接近日常的你。"],
      ["下一步", "补上主型，再带真实场景一起看，会更稳。"]
    ],
    teacher: "先当入口排序看，别急着给自己下结论。"
  });
}

function teamMainSubmissionAnalysisHtml(main, result) {
  const primary = getMainPrimary(main);
  const top = topTypesText(main, " / ");
  const status = main?.quality_flags?.length ? "建议老师复核" : "已计入团队";
  return analysisOneBoxHtml({
    eyebrow: "团队样本",
    title: `${mainTypeCode(main)} 已进入团队总图`,
    lead: "你的主型已加入团队分布。团队页只看整体高位、低位和分化。",
    tags: [`前三 ${topTypesText(main)}`, "团队分布", status],
    items: [
      ["个人主位", `${mainTypeCode(main)} · 前三 ${top}。`],
      ["团队会看", "1-9号整体分布、共同高位、低位和成员分化。"],
      ["老师会核", "岗位结构、团队目标和真实协作场景。"],
      ["下一步", "截图或编号给老师，放进团队目标里读。"]
    ],
    teacher: "团队主型适合看协作结构，不适合用来给单个人贴标签。"
  });
}

function analysisOneBoxHtml({ eyebrow = "", title = "", lead = "", tags = [], items = [], teacher = "" } = {}) {
  const itemHtml = items.filter(Boolean).slice(0, 5).map(([label, text]) => `
    <p>
      <strong>${escapeHtml(label)}</strong>
      <span>${escapeHtml(text || "-")}</span>
    </p>
  `).join("");
  return `
    <div class="analysis-one-box" data-poster-box="analysis">
      <em>${escapeHtml(eyebrow)}</em>
      <strong>${escapeHtml(title)}</strong>
      <span class="analysis-lead">${escapeHtml(lead)}</span>
      ${featureTagsHtml(tags)}
      <div class="analysis-one-list">
        ${itemHtml}
      </div>
      ${teacher ? `<small>${escapeHtml(teacher)}</small>` : ""}
    </div>
  `;
}

function briefItemHtml(label, text) {
  return `<p><strong>${escapeHtml(label)}</strong><span>${escapeHtml(text || "-")}</span></p>`;
}

function featureTagsHtml(items = []) {
  const tags = items.filter(Boolean).slice(0, 3);
  if (!tags.length) return "";
  return `<div class="feature-tags">${tags.map((item) => `<i>${escapeHtml(item)}</i>`).join("")}</div>`;
}

function shortFeatureTag(text) {
  return String(text || "")
    .split(/[，,。；;]/)[0]
    .replace(/\s+/g, "")
    .slice(0, 8);
}

function teacherCtaHtml(result, textOverride = "") {
  const code = result?.verification_code || "------";
  const settings = state.siteSettings || {};
  const qr = settings.group_chat_qr_image_url || "";
  const caption = settings.group_chat_qr_caption || "扫码加入群聊";
  const qrHtml = qr
    ? `<div class="poster-qr-block result-brief-qr"><img src="${escapeHtml(qr)}" alt="${escapeHtml(caption)}"><p>${escapeHtml(caption)}</p></div>`
    : "";
  return `
    <div class="teacher-cta-card">
      <div>
        <strong>想看得更准，交给老师</strong>
        <span>${escapeHtml(textOverride || "基础结果先给方向；截图或发编号给老师，结合真实经历校准。")}</span>
      </div>
      <em>ref ${escapeHtml(code)}</em>
    </div>
    ${qrHtml}
  `;
}

function identityChips(bundle, code, options = {}) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  const primary = getMainPrimary(main);
  const topSubtype = getSubtypeTop(subtype);
  if (options.mainOnly && primary) {
    return [
      `主型 ${mainTypeCode(main)}`,
      "本次主型",
      "副型可补",
      `ref ${code}`
    ];
  }
  return [
    primary ? `主型 ${mainTypeCode(main)}` : "主型可补",
    topSubtype ? `${SUBTYPE_SHORT_NAMES[topSubtype.key] || SUBTYPE_NAMES[topSubtype.key] || topSubtype.label}优先` : "",
    `ref ${code}`
  ].filter(Boolean);
}

function subtypeRankText(subtype) {
  const ranked = subtype?.subtype_ranked || [];
  if (!ranked.length) return "可补";
  return ranked.slice(0, 3).map((item) => `${SUBTYPE_NAMES[item.key] || item.label}${Math.round(item.percent || 0)}%`).join(" / ");
}

function identityVisualHtml(bundle) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  if (main) {
    if (!isPersonalSubtypeResult(subtype)) {
      return `
        <div class="identity-main-only-visual">
          <div class="main-only-visual-head">
            <strong>主型分布</strong>
            <span>红否 · 黄不确定 · 绿是</span>
          </div>
          <div class="identity-main-only-bars">${mainResultDistributionHtml(main)}</div>
          ${resultDistributionSummaryHtml(main)}
        </div>
      `;
    }
    const subtypeBlock = `<div class="identity-subtype-panel">
      <div class="main-only-visual-head">
        <strong>副型排序</strong>
        <span>${escapeHtml(subtypeRankText(subtype))}</span>
      </div>
      ${subtypeTriangleHtml(subtype)}
    </div>`;
    return `
      <div class="identity-visual-grid">
        <div class="identity-main-only-visual identity-main-bars">
          <div class="main-only-visual-head">
            <strong>主型分布</strong>
            <span>红否 · 黄不确定 · 绿是</span>
          </div>
          ${mainResultDistributionHtml(main)}
          ${resultDistributionSummaryHtml(main)}
        </div>
        <div class="identity-mini-stack">
          ${subtypeBlock}
        </div>
      </div>
    `;
  }
  return `
    <div class="identity-subtype-only">
      ${subtypePieHtml(subtype?.subtype_ranked || [])}
      ${subtypeOverviewSummaryHtml(subtype)}
    </div>
  `;
}

function subtypeOverviewSummaryHtml(subtype) {
  const ranked = subtype?.subtype_ranked || [];
  const first = ranked[0];
  const second = ranked[1];
  const third = ranked[2];
  const confidence = {
    clear: "较集中",
    leaning: "有方向",
    mixed: "双倾向"
  }[subtype?.subtype_confidence] || "待复核";
  return `
    <div class="result-distribution-summary subtype-summary-grid">
      <span><small>第一</small><b>${escapeHtml(first ? SUBTYPE_NAMES[first.key] || first.label : "-")}</b></span>
      <span><small>第二</small><b>${escapeHtml(second ? SUBTYPE_NAMES[second.key] || second.label : "-")}</b></span>
      <span><small>第三</small><b>${escapeHtml(third ? SUBTYPE_NAMES[third.key] || third.label : "-")}</b></span>
      <span><small>状态</small><b>${escapeHtml(confidence)}</b></span>
    </div>
  `;
}

function resultDistributionSummaryHtml(main) {
  const primary = getMainPrimary(main);
  const wing = getWingNumber(main);
  const top = (main?.top_types || []).slice(0, 3).map((item) => item.element).join(" / ") || "-";
  const status = main?.quality_flags?.length ? "老师复核" : "可参考";
  return `
    <div class="result-distribution-summary">
      <span><small>主型</small><b>${escapeHtml(primary ? `${primary}号` : "-")}</b></span>
      <span><small>侧翼</small><b>${escapeHtml(wing ? `w${wing}` : "待看")}</b></span>
      <span><small>前三</small><b>${escapeHtml(top)}</b></span>
      <span><small>状态</small><b>${escapeHtml(status)}</b></span>
    </div>
  `;
}

function subtypeTriangleHtml(subtype) {
  const ranked = subtype?.subtype_ranked || [];
  if (!ranked.length) {
    return `
      <div class="subtype-triangle-empty">
        <strong>副型可补</strong>
        <span>加测后显示入口排序</span>
      </div>
    `;
  }
  const order = ["self_preservation", "social", "one_to_one"];
  const point = {
    self_preservation: [72, 18],
    social: [128, 116],
    one_to_one: [16, 116]
  };
  const rankMap = new Map(ranked.map((item, index) => [item.key, { ...item, rank: index + 1 }]));
  const nodes = order.map((key) => {
    const item = rankMap.get(key) || { key, percent: 0, rank: "" };
    const [x, y] = point[key];
    const active = item.rank === 1 ? " top" : "";
    return `
      <g class="tri-node${active}">
        <circle cx="${x}" cy="${y}" r="${item.rank === 1 ? 13 : 10}"></circle>
        <text x="${x}" y="${y + 4}" text-anchor="middle">${escapeHtml(item.rank || "")}</text>
        <text class="tri-label" x="${x}" y="${y + 25}" text-anchor="middle">${escapeHtml(SUBTYPE_NAMES[key])}</text>
      </g>
    `;
  }).join("");
  return `
    <svg class="subtype-triangle" viewBox="0 0 144 144" role="img" aria-label="副型三角排序">
      <path d="M72 18 L128 116 L16 116 Z"></path>
      ${nodes}
    </svg>
  `;
}

function translationCardHtml(item) {
  return `
    <div class="friend-translation-list">
      <p><strong>工作</strong><span>${escapeHtml(item.work)}</span></p>
      <p><strong>压力</strong><span>${escapeHtml(item.pressure)}</span></p>
    </div>
  `;
}

function usageGuideHtml(usage, result) {
  return `
    <div class="brief-focus-card feature-portrait usage-feature-card">
      <em>相处小抄</em>
      <strong>和我配合，先抓这三件事</strong>
      <span>${escapeHtml(`靠近我时，${usage.near}；容易踩雷的是，${usage.avoid}；真正补能的是，${usage.charge}。`)}</span>
      ${featureTagsHtml([usage.near, usage.avoid, usage.charge])}
    </div>
    <div class="usage-guide-list usage-guide-enhanced">
      <p><strong>靠近方式</strong><span>${escapeHtml(usage.near)}</span></p>
      <p><strong>避雷方式</strong><span>${escapeHtml(usage.avoid)}</span></p>
      <p><strong>充电口</strong><span>${escapeHtml(usage.charge)}</span></p>
    </div>
    ${teacherMiniStripHtml(result, "职场、关系和真实场景，交给老师会更准。")}
  `;
}

function teacherMiniStripHtml(result, text = "") {
  const code = result?.verification_code || "------";
  return `
    <div class="teacher-mini-strip">
      <strong>专业老师校准</strong>
      <span>${escapeHtml(text || "截图或发送编号，结合真实经历会更准。")}</span>
      <em>${escapeHtml(code)}</em>
    </div>
  `;
}

function nextCardKicker(deck, result) {
  if (deck.main?.team?.code) return "团队下一步";
  if (isChildSubtypeResult(deck.subtype || result)) return "家庭小抄";
  if (!deck.main && deck.subtype) return "下一步";
  return "相处小抄";
}

function nextCardTitle(deck, result) {
  if (deck.main?.team?.code) return "查看团队结果";
  if (isChildSubtypeResult(deck.subtype || result)) return "怎么靠近孩子";
  if (!deck.main && deck.subtype) return "补上主型会更准";
  return "我的相处小抄";
}

function nextCardLine(deck, result) {
  if (deck.main?.team?.code) return "团队总图不是个人评价，适合由老师结合团队样本和访谈解释。";
  if (isChildSubtypeResult(deck.subtype || result)) return "把这张图当成观察入口，不把孩子固定成某一种人。";
  if (!deck.main && deck.subtype) return "副型先看入口排序，补上主型会更完整。";
  if (deck.main && deck.subtype) return "这张卡最适合转发给亲近的人，让对方知道怎么和你配合。";
  return "本次先看主型；副型可以之后补，不影响这次主位结果。";
}

function nextCardFooter(deck, result) {
  if (deck.main?.team?.code) return "团队页 / 老师解读";
  if (isChildSubtypeResult(deck.subtype || result)) return "亲子沟通参考";
  return "保存图片 / 老师校准";
}

function nextCardHtml(deck, usage, result) {
  if (deck.main?.team?.code) {
    return `
      <div class="usage-guide-list">
        ${briefItemHtml("团队结果", "点击下方团队结果，查看团队总图。")}
        ${briefItemHtml("老师解读", "样本足够后，再结合团队目标和真实沟通场景。")}
        ${briefItemHtml("个人补充", "个人副型可之后补测，不影响本次团队主型提交。")}
      </div>
      <div class="poster-qr-block usage-guide-qr">${getTeamOrGroupQrHtml(result)}</div>
    `;
  }
  if (isChildSubtypeResult(deck.subtype || result)) {
    return `
      <div class="usage-guide-list">
        ${briefItemHtml("靠近方式", "先接住感受和节奏，再谈要求。")}
        ${briefItemHtml("避雷方式", "别把一次表现直接定义成性格。")}
        ${briefItemHtml("充电口", "稳定回应、具体陪伴、少一点急着纠正。")}
      </div>
      <div class="poster-qr-block usage-guide-qr">${nextStepQrHtml(result?.verification_code || "------", "找老师看亲子版", "亲子版更需要结合年龄、家庭互动和真实事件。")}</div>
    `;
  }
  if (!deck.main && deck.subtype) {
    return `
      <div class="usage-guide-list">
        ${briefItemHtml("现在能看", "副型排序和注意力入口。")}
        ${briefItemHtml("还差一步", "补测主型后，才能判断核心动机。")}
        ${briefItemHtml("找老师看", "把主型编号和副型编号一起发过去。")}
      </div>
      <div class="poster-qr-block usage-guide-qr">${nextStepQrHtml(result?.verification_code || "------", "补主型 / 找老师", "副型已完成，补上主型会更好看懂。")}</div>
    `;
  }
  return usageGuideHtml(usage, result);
}

function subtypeTranslation(subtype) {
  const top = getSubtypeTop(subtype);
  const key = top?.key || "social";
  return {
    social: {
      friend: "你以为我在看热闹，其实我在读懂这个场子怎么运转。",
      work: "我会关注位置、协作和共同目标。",
      pressure: "压力一来，更在意自己在群体里的位置。"
    },
    one_to_one: {
      friend: "你以为我忽冷忽热，其实我在找真正有火花的连接。",
      work: "我更容易被关键关系和高强度目标点燃。",
      pressure: "压力一来，更在意连接是否真实。"
    },
    self_preservation: {
      friend: "你以为我太务实，其实我在给生活先打地基。",
      work: "我会先看资源、节奏和边界。",
      pressure: "压力一来，先稳基本盘。"
    }
  }[key];
}

function subtypeUsage(subtype) {
  const top = getSubtypeTop(subtype);
  const key = top?.key || "social";
  const line = "副型先看注意力入口，补上主型后会更完整。";
  return {
    social: { line, near: "给我位置感", avoid: "把我排除在局面外", charge: "一起做成点什么" },
    one_to_one: { line, near: "认真、直接、有回应", avoid: "含糊和冷处理", charge: "高质量连接" },
    self_preservation: { line, near: "尊重我的节奏", avoid: "打乱基本盘", charge: "稳定、舒服、可持续" }
  }[key];
}

function renderResultUtilities(result) {
  const nav = document.querySelector(".result-utility-nav");
  if (!nav) return;
  const teamButton = byId("resultTeamButton");
  if (teamButton) {
    const hasTeam = Boolean(result?.team?.code || state.team?.code || getRecentLocalResults({ maxAgeMs: TEN_DAYS_MS }).some((item) => item.team?.code));
    teamButton.classList.toggle("muted", !hasTeam);
    teamButton.textContent = "团队结果";
  }
}

function onResultFeedback(event) {
  const button = event.target.closest("button[data-feedback]");
  if (!button || button.disabled) return;
  const value = button.dataset.feedback;
  document.querySelectorAll("#resultFeedback button[data-feedback]").forEach((item) => {
    item.disabled = true;
    item.classList.toggle("selected", item === button);
  });
  const holder = $("resultFeedback");
  const text = holder?.querySelector("span");
  if (holder) holder.classList.add("answered");
  if (text) text.textContent = RESULT_FEEDBACK_COPY[value] || "收到反馈，谢谢你。";
  trackEvent("result_feedback", {
    value,
    code: state.result?.verification_code || "",
    test_mode: state.result?.test_mode || "",
    result_kind: isSubtypeResult(state.result) ? "subtype" : "main"
  }, { keepalive: true });
}

function renderAnonymousTeamSubtypeShareDeck(result) {
  const code = result.verification_code || "------";
  $("shareDeck")?.classList.remove("main-only-share-deck", "subtype-only-share-deck");
  $("shareDeck")?.classList.add("team-subtype-share-deck");
  $("shareCard").dataset.type = 6;
  $("shareNumber").textContent = "team";
  $("hiddenCode").textContent = `ref ${code}`;
  $("sharePrimaryKicker").textContent = "团队副型提交凭证";
  $("shareTitle").textContent = "我已匿名提交团队副型";
  $("shareLine").textContent = "你的排序已匿名进入团队总图，只看整体。";
  $("shareChips").innerHTML = [
    "团队总图",
    "匿名汇总",
    "个人不展示"
  ].map((text) => `<span>${escapeHtml(text)}</span>`).join("");
  $("shareMiniMap").innerHTML = teamSubtypeIdentityHtml(result);
  $("shareTopTypes").textContent = "团队副型匿名提交 · 只看整体";

  $("shareEvidenceTitle").textContent = "团队副型怎么看";
  $("shareEvidenceKicker").textContent = "结果重点";
  $("shareEvidenceLine").textContent = "团队副型看的是整体注意力入口，不看个人标签。";
  $("shareEvidenceVisual").innerHTML = analysisOneBoxHtml({
    eyebrow: "团队副型重点",
    title: "团队默认会先关注什么",
    lead: "有人先看资源节奏，有人先看关键连接，也有人先看群体位置；汇总后才适合判断团队氛围和协作入口。",
    tags: ["匿名汇总", "只看整体", "老师解读"],
    items: [
      ["自保入口", "资源、节奏、边界和基本盘。高时团队更重视稳定、可持续和风险缓冲。"],
      ["一对一入口", "关键连接、真实回应和关系强度。高时团队更容易被强关系和关键人物牵动。"],
      ["社群入口", "群体位置、协作氛围和共同目标。高时团队更关注位置、共识和集体方向。"],
      ["专业老师", "要和团队主型、岗位结构、真实协作一起看，不能只看一个汇总图。"]
    ],
    teacher: "团队副型只服务团队观察，不看单个人。"
  });
  $("shareEvidenceFoot").textContent = "匿名汇总 · 只看整体";
  $("shareEvidenceCode").textContent = `ref ${code}`;

  $("shareNextKicker").textContent = "团队入口";
  $("shareNextTitle").textContent = "查看团队总图";
  $("shareNextLine").textContent = "";
  $("shareNextQr").innerHTML = getTeamOrGroupQrHtml(result);
  $("shareNextFoot").textContent = "团队页 / 群聊入口";
  $("shareNextCode").textContent = `ref ${code}`;
  $("shareEvidenceCard").dataset.type = 6;
  $("shareNextCard").dataset.type = 6;
  $("shareNextCard").hidden = true;
  updateShareCardPagination($("resultScreen"));
  resetResultFeedback();
}

function teamSubtypeIdentityHtml(result) {
  return `
    <div class="team-anon-visual">
      <div class="team-anon-route" aria-label="团队副型匿名流程">
        <span>你的排序</span>
        <i></i>
        <strong>匿名池</strong>
        <i></i>
        <span>团队总图</span>
      </div>
      <div class="team-anon-steps">
        <p><strong>不公开</strong><span>个人副型排序</span></p>
        <p><strong>只统计</strong><span>团队整体入口</span></p>
        <p><strong>再解读</strong><span>结合主型和访谈</span></p>
      </div>
      <div class="team-anon-badge">
        <span>已加入</span>
        <strong>团队副型总图</strong>
        <small>匿名汇总，只看整体</small>
      </div>
    </div>
  `;
}

function getGroupQrHtml(result) {
  const settings = state.siteSettings || {};
  const qr = settings.group_chat_qr_image_url || "";
  const caption = settings.group_chat_qr_caption || "扫码加入群聊";
  return qr
    ? `<div class="poster-qr-copy"><strong>进群找老师</strong><span>长按识别，继续看结果</span></div><img src="${escapeHtml(qr)}" alt="${escapeHtml(caption)}"><p>${escapeHtml(caption)}</p>`
    : `<div class="poster-qr-empty"><span>找老师继续看</span><p>保存结果图或发送编号，结合真实经历会更准</p></div>`;
}

function getTeamOrGroupQrHtml(result) {
  const teamUrl = result.team?.summary_url || (result.team?.code ? `/team/${result.team.code}` : "");
  if (teamUrl) {
    const absolute = new URL(teamUrl, window.location.origin).href;
    return `
      <div class="poster-qr-copy">
        <strong>团队总图</strong>
        <span>${escapeHtml(result.team?.name || "团队")}</span>
      </div>
      <div class="poster-qr-empty">
        <span>打开团队页</span>
        <p>${escapeHtml(absolute)}</p>
      </div>
    `;
  }
  return getGroupQrHtml(result);
}

function groupQrFallbackHtml(code, title = "继续校准", text = "保存结果图或发送编号，结合真实经历会更准") {
  return `
    <div class="poster-qr-empty">
      <span>${escapeHtml(title)}</span>
      <p>${escapeHtml(text)}</p>
      <small>ref ${escapeHtml(code)}</small>
    </div>
  `;
}

function nextStepQrHtml(code, title = "继续补全", text = "长按保存后，带编号继续校准。") {
  const settings = state.siteSettings || {};
  const qr = settings.group_chat_qr_image_url || "";
  const caption = settings.group_chat_qr_caption || "扫码加入群聊";
  if (qr) {
    return `
      <div class="poster-qr-copy">
        <strong>${escapeHtml(title)}</strong>
        <span>长按识别，找老师继续看</span>
      </div>
      <img src="${escapeHtml(qr)}" alt="${escapeHtml(caption)}">
      <p>${escapeHtml(caption)}</p>
    `;
  }
  return groupQrFallbackHtml(code, title, text);
}

function mainResultDistributionHtml(result) {
  const scores = result.scores || {};
  const topSet = new Set((result.top_types || []).map((item) => Number(item.element)));
  return `
    <div class="poster-main-bars" aria-label="主型结果分布">
      <div class="poster-main-legend" aria-label="颜色说明">
        <span><i class="no"></i>否</span>
        <span><i class="uncertain"></i>不确定</span>
        <span><i class="yes"></i>是</span>
        <em>虚线为中线</em>
      </div>
      ${[1,2,3,4,5,6,7,8,9].map((element) => {
        const item = scores[element] || {};
        const total = Number(item.yes || 0) + Number(item.uncertain || 0) + Number(item.no || 0) || 1;
        const no = Math.round(Number(item.no || 0) / total * 100);
        const uncertain = Math.round(Number(item.uncertain || 0) / total * 100);
        const yes = Math.max(0, 100 - no - uncertain);
        return `
          <div class="poster-main-row ${topSet.has(element) ? "top" : ""}">
            <span>${element}</span>
            <div class="poster-main-track">
              <b class="no" style="width:${no}%"></b>
              <b class="uncertain" style="width:${uncertain}%"></b>
              <b class="yes" style="width:${yes}%"></b>
              <i></i>
            </div>
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function subtypePieHtml(items = []) {
  const ranked = items.length ? items : [];
  const total = ranked.reduce((sum, item) => sum + Number(item.percent || 0), 0) || 1;
  let offset = 25;
  const colors = ["#ff7166", "#27c7ee", "#ffc83d"];
  const circles = ranked.slice(0, 3).map((item, index) => {
    const value = Number(item.percent || 0);
    const dash = Math.max(0, value / total * 100);
    const node = `<circle class="pie-seg seg-${index}" cx="72" cy="72" r="48" pathLength="100" stroke="${colors[index]}" stroke-width="${index === 0 ? 22 : 14}" stroke-dasharray="${dash} ${100 - dash}" stroke-dashoffset="${-offset}" fill="none"></circle>`;
    offset += dash;
    return node;
  }).join("");
  const top = ranked[0];
  const topPercent = Number(top?.percent || 0);
  return `
    <div class="poster-pie-wrap" aria-label="副型占比">
      <svg class="poster-pie" viewBox="0 0 144 144" role="img">
        <circle cx="72" cy="72" r="48" fill="rgba(255,255,255,.64)" stroke="rgba(20,33,38,.08)" stroke-width="14"></circle>
        ${circles}
        <text x="72" y="68" text-anchor="middle" class="pie-title">${escapeHtml(SUBTYPE_NAMES[top?.key] || top?.label || "副型")}</text>
        <text x="72" y="88" text-anchor="middle" class="pie-value">${Math.round(topPercent)}%</text>
      </svg>
      <div class="poster-pie-legend">
        ${ranked.slice(0, 3).map((item, index) => `
          <span class="${index === 0 ? "primary" : ""}"><i style="background:${colors[index]}"></i><b>${index + 1}</b>${escapeHtml(SUBTYPE_NAMES[item.key] || item.label)} ${Math.round(item.percent || 0)}%</span>
        `).join("")}
      </div>
    </div>
  `;
}

function calibrationCopy(flags) {
  if (!flags || !flags.length) {
    return "答题节奏稳定，结果可参考。";
  }
  return "本次存在作答质量提示，建议老师复核后再深入解读。";
}

function copyVerificationCode() {
  const code = state.result?.verification_code || "";
  if (!code) return;
  writeClipboardText(code).then(() => {
    const button = byId("copyCodeButton");
    if (button) button.textContent = "已复制";
    trackEvent("copy_code", {
      result_kind: isSubtypeResult(state.result) ? "subtype" : "main",
      test_mode: state.result?.test_mode || ""
    });
    window.setTimeout(() => {
      if (button) button.textContent = "复制编号";
    }, 1200);
  }).catch(() => {
    const button = byId("copyCodeButton");
    if (button) button.textContent = "请手动复制";
  });
}

function saveShareCard() {
  saveVisibleShareCards("result");
}

async function saveVisibleShareCards(scope = "result") {
  const root = scope === "combined" ? $("combinedScreen") : $("resultScreen");
  if (!root) return;
  const button = scope === "combined" ? byId("combinedPrintButton") : byId("shareSaveButton");
  const cards = [...root.querySelectorAll(".share-card")].filter((card) => card.offsetParent !== null);
  if (!cards.length) return;
  const code = scope === "combined"
    ? ($("combinedCodes")?.textContent || "jojo").replace(/\s+/g, "-").replace(/[^\w\u4e00-\u9fa5-]+/g, "")
    : (state.result?.verification_code || "jojo");
  if (button) button.textContent = "正在生成";
  const previews = [];
  try {
    for (let index = 0; index < cards.length; index += 1) {
      const previewUrl = await cardToShareImage(cards[index], index, cards.length);
      previews.push({ url: previewUrl, label: `${index + 1} / ${cards.length}` });
    }
    showShareImageModal(previews);
    if (button) button.textContent = `已生成${previews.length}张`;
  } catch {
    if (previews.length) showShareImageModal(previews);
    if (button) button.textContent = previews.length ? `已生成${previews.length}张` : "生成失败，请截图";
  }
  trackEvent(scope === "combined" ? "combined_card_save" : "share_card_save", {
    result_kind: isSubtypeResult(state.result) ? "subtype" : "main",
    test_mode: state.result?.test_mode || "",
    saved_count: previews.length
  });
  window.setTimeout(() => {
    if (button) button.textContent = `保存${cards.length}张图片`;
  }, 1500);
}

async function cardToShareImage(card, index, total) {
  let logoDataUrl = "";
  try {
    logoDataUrl = await loadShareAssetDataUrl("/jojo-logo.png");
  } catch {
    logoDataUrl = "";
  }
  const svg = sharePosterSvgFromCard(card, index, total, { logoDataUrl });
  const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const image = new Image();
  image.decoding = "sync";
  image.src = dataUrl;
  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
  });
  const canvas = document.createElement("canvas");
  canvas.width = 900;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff8ec";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
  return canvas.toDataURL("image/png", 0.96);
}

async function loadShareAssetDataUrl(src) {
  if (SHARE_ASSET_CACHE.has(src)) return SHARE_ASSET_CACHE.get(src);
  const promise = fetch(src, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) throw new Error("asset_failed");
      return response.blob();
    })
    .then((blob) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("asset_read_failed"));
      reader.readAsDataURL(blob);
    }));
  SHARE_ASSET_CACHE.set(src, promise);
  return promise;
}

function sharePosterSvgFromCard(card, index, total, options = {}) {
  const type = Number(card.dataset.type || state.result?.share?.primary_type || getMainPrimary(state.result) || 6);
  const palette = posterPalette(type);
  const logoDataUrl = options.logoDataUrl || "";
  const label = card.querySelector(".share-label")?.textContent.trim() || `0${index + 1} / 0${total}`;
  const title = card.querySelector("h3")?.textContent.trim() || "jojo测九型";
  const body = card.querySelector(".share-core > p:not(.share-label), .share-body p:not(.share-label)")?.textContent.trim() || "";
  const quote = card.querySelector(".brief-quote span")?.textContent.trim() || "";
  const chips = [...card.querySelectorAll(".share-chips span")].map((item) => item.textContent.trim()).filter(Boolean).slice(0, 3);
  const footer = card.querySelector(".share-footer > span:first-child")?.textContent.trim() || "";
  const code = card.querySelector(".hidden-code")?.textContent.trim() || "";
  const rows = posterRowsFromCard(card);
  const analysisBox = posterAnalysisFromCard(card);
  const identityVisual = (!rows.length && !analysisBox) ? posterIdentityVisualFromCard(card) : null;
  const blocks = analysisBox ? [] : posterBlocksFromCard(card);
  const cta = posterTeacherCtaFromCard(card);
  const isLongTitle = Array.from(title).length > 24;
  const titleSize = index === 0 ? 54 : (isLongTitle ? 45 : 52);
  const titleStep = index === 0 ? 66 : (isLongTitle ? 56 : 64);
  const titleLines = svgTextLines(title, index === 0 ? 17 : (isLongTitle ? 14 : 12), 3);
  const bodyLines = svgTextLines(body, 22, 2);
  const yAfterTitle = 242 + titleLines.length * titleStep;
  const blockStartY = yAfterTitle + (bodyLines.length ? 150 : 118) + (quote ? 116 : 0);
  const brandSvg = logoDataUrl
    ? `<image href="${escapeSvg(logoDataUrl)}" x="64" y="32" width="176" height="76" preserveAspectRatio="xMinYMid meet"/>`
    : `<circle cx="88" cy="75" r="18" fill="#fff" stroke="${palette.main}" stroke-width="5"/><circle cx="88" cy="75" r="5" fill="${palette.main}"/><text x="124" y="85" class="brand">jojo测九型</text>`;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1200" viewBox="0 0 900 1200">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fff8ef"/>
      <stop offset="0.48" stop-color="#ffffff"/>
      <stop offset="1" stop-color="${palette.soft}"/>
    </linearGradient>
    <linearGradient id="bar" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#f66f7f"/>
      <stop offset="0.52" stop-color="#e7c463"/>
      <stop offset="1" stop-color="#21bdb3"/>
    </linearGradient>
    <style>
      text { font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif; letter-spacing: 0; }
      .brand { fill: #7c938d; font-size: 25px; font-weight: 900; }
      .page { fill: rgba(20,33,38,.42); font-size: 28px; font-weight: 900; }
      .kicker { fill: ${palette.main}; font-size: 31px; font-weight: 930; }
      .title { fill: #153a3e; font-size: ${titleSize}px; font-weight: 950; }
      .body { fill: #38666a; font-size: 28px; font-weight: 720; }
      .chip { fill: #153a3e; font-size: 23px; font-weight: 880; }
      .muted { fill: rgba(52,73,81,.56); font-size: 22px; font-weight: 850; }
      .code { fill: rgba(20,33,38,.16); font-size: 17px; font-weight: 760; }
      .barlabel { fill: #6c8581; font-size: 21px; font-weight: 900; }
      .blockLabel { fill: ${palette.main}; font-size: 24px; font-weight: 930; }
      .blockText { fill: #2f6064; font-size: 25px; font-weight: 760; }
      .analysisText { fill: #2f6064; font-size: 22px; font-weight: 780; }
      .analysisTitle { fill: #153a3e; font-size: 34px; font-weight: 950; }
    </style>
  </defs>
  <rect x="0" y="0" width="900" height="1200" rx="34" fill="url(#bg)"/>
  ${brandSvg}
  <text x="760" y="85" class="page">0${index + 1} / 0${total}</text>
  <text x="615" y="246" fill="rgba(20,33,38,.055)" font-size="190" font-weight="950">${escapeSvg(card.querySelector(".share-watermark")?.textContent.trim() || "")}</text>
  <text x="64" y="174" class="kicker">${escapeSvg(label)}</text>
  ${titleLines.map((line, lineIndex) => `<text x="64" y="${258 + lineIndex * titleStep}" class="title">${escapeSvg(line)}</text>`).join("")}
  ${bodyLines.map((line, lineIndex) => `<text x="64" y="${yAfterTitle + 20 + lineIndex * 40}" class="body">${escapeSvg(line)}</text>`).join("")}
  ${quote ? posterQuoteSvg(quote, yAfterTitle + (bodyLines.length ? 110 : 74), palette) : ""}
  ${chips.map((chip, chipIndex) => {
    const x = 64 + chipIndex * 172;
    return `<rect x="${x}" y="${yAfterTitle + 92}" width="148" height="48" rx="24" fill="#fff" stroke="rgba(246,111,127,.28)"/>
  <text x="${x + 22}" y="${yAfterTitle + 124}" class="chip">${escapeSvg(chip)}</text>`;
  }).join("")}
  ${rows.length ? posterBarsSvg(rows, yAfterTitle + 210) : ""}
  ${analysisBox ? posterAnalysisBoxSvg(analysisBox, blockStartY, palette) : ""}
  ${identityVisual ? posterIdentityVisualSvg(identityVisual, yAfterTitle + 196, palette) : ""}
  ${blocks.length ? posterBlocksSvg(blocks, blockStartY) : ""}
  ${cta ? posterTeacherCtaSvg(cta, analysisBox ? blockStartY + 606 : (blocks.length ? blockStartY + Math.min(blocks.length, 6) * 102 + 20 : 820)) : ""}
  <text x="64" y="1110" class="muted">${escapeSvg(footer)}</text>
  <text x="670" y="1110" class="code">${escapeSvg(code)}</text>
</svg>`;
}

function posterPalette(type) {
  const key = Number(type) || 6;
  return {
    1: { main: "#de6c76", soft: "#eafff8" },
    2: { main: "#d85d91", soft: "#eafffb" },
    3: { main: "#d58c24", soft: "#ecfffb" },
    4: { main: "#8b76d9", soft: "#f4fff8" },
    5: { main: "#2d8aa7", soft: "#fff7ec" },
    6: { main: "#087f79", soft: "#fff1f6" },
    7: { main: "#d79b17", soft: "#ecfbff" },
    8: { main: "#ca5f43", soft: "#effffc" },
    9: { main: "#61a779", soft: "#fff5f1" }
  }[key] || { main: "#087f79", soft: "#fff1f6" };
}

function posterRowsFromCard(card) {
  return [...card.querySelectorAll(".poster-main-row")].map((row) => {
    const label = row.querySelector("span")?.textContent.trim() || "";
    const no = parseFloat(row.querySelector(".poster-main-track .no")?.style.width || "0") || 0;
    const uncertain = parseFloat(row.querySelector(".poster-main-track .uncertain")?.style.width || "0") || 0;
    const yes = parseFloat(row.querySelector(".poster-main-track .yes")?.style.width || `${Math.max(0, 100 - no - uncertain)}`) || 0;
    return { label, no, uncertain, yes };
  }).filter((row) => row.label);
}

function posterBlocksFromCard(card) {
  const focus = [...card.querySelectorAll(".brief-focus-card")].map((item) => ({
    label: item.querySelector("strong")?.textContent.trim() || "",
    text: item.querySelector("span")?.textContent.trim() || ""
  }));
  const mini = [...card.querySelectorAll(".teacher-mini-strip")].map((item) => ({
    label: item.querySelector("strong")?.textContent.trim() || "",
    text: item.querySelector("span")?.textContent.trim() || item.querySelector("em")?.textContent.trim() || ""
  }));
  const listItems = [...card.querySelectorAll(".friend-translation-list p, .usage-guide-list p, .poster-analysis-list p, .result-brief-grid p, .brief-list-panel p")].map((item) => ({
    label: item.querySelector("strong")?.textContent.trim() || "",
    text: item.querySelector("span")?.textContent.trim() || item.textContent.replace(item.querySelector("strong")?.textContent || "", "").trim()
  }));
  return [...focus, ...listItems, ...mini].filter((item) => item.label || item.text).slice(0, 6);
}

function posterIdentityVisualFromCard(card) {
  const pieItems = [...card.querySelectorAll(".poster-pie-legend span")].map((item) => {
    const text = item.textContent.trim();
    const percent = Number(text.match(/(\d+)%/)?.[1] || 0);
    const label = text
      .replace(/^\d+/, "")
      .replace(/\s*\d+%\s*$/, "")
      .trim();
    return { label, percent };
  }).filter((item) => item.label);
  if (pieItems.length) return { kind: "subtype", items: pieItems };
  const teamAnon = card.querySelector(".team-anon-visual");
  if (teamAnon) {
    const route = [...teamAnon.querySelectorAll(".team-anon-route span, .team-anon-route strong")]
      .map((item) => item.textContent.trim())
      .filter(Boolean);
    const steps = [...teamAnon.querySelectorAll(".team-anon-steps p")].map((item) => ({
      label: item.querySelector("strong")?.textContent.trim() || "",
      text: item.querySelector("span")?.textContent.trim() || ""
    })).filter((item) => item.label || item.text);
    const badge = {
      label: teamAnon.querySelector(".team-anon-badge span")?.textContent.trim() || "",
      title: teamAnon.querySelector(".team-anon-badge strong")?.textContent.trim() || "",
      text: teamAnon.querySelector(".team-anon-badge small")?.textContent.trim() || ""
    };
    return { kind: "teamAnon", route, steps, badge };
  }
  return null;
}

function posterIdentityVisualSvg(visual, startY, palette) {
  if (visual.kind === "teamAnon") return posterTeamAnonSvg(visual, startY, palette);
  return posterSubtypeIdentitySvg(visual.items || [], startY, palette);
}

function posterSubtypeIdentitySvg(items, startY, palette) {
  const y = Math.min(startY, 560);
  const max = Math.max(...items.map((item) => item.percent || 0), 100);
  const colors = ["#ff7166", "#27c7ee", "#ffc83d"];
  return `<rect x="64" y="${y}" width="772" height="360" rx="30" fill="rgba(255,255,255,.78)" stroke="${palette.main}" stroke-opacity=".18" stroke-width="3"/>
  <text x="96" y="${y + 52}" class="blockLabel">副型排序</text>
  <text x="96" y="${y + 96}" fill="#153a3e" font-size="40" font-weight="950">${escapeSvg(items[0]?.label || "副型待确认")}优先</text>
  <circle cx="696" cy="${y + 92}" r="62" fill="${colors[0]}" fill-opacity=".16" stroke="${colors[0]}" stroke-width="16"/>
  <text x="696" y="${y + 86}" text-anchor="middle" class="blockLabel">第一</text>
  <text x="696" y="${y + 121}" text-anchor="middle" fill="#153a3e" font-size="33" font-weight="950">${Math.round(items[0]?.percent || 0)}%</text>
  ${items.slice(0, 3).map((item, index) => {
    const rowY = y + 156 + index * 62;
    const barWidth = Math.max(16, 472 * (Number(item.percent || 0) / max));
    return `<text x="96" y="${rowY + 22}" class="blockLabel">${index + 1}. ${escapeSvg(item.label)}</text>
  <rect x="292" y="${rowY}" width="472" height="28" rx="14" fill="rgba(20,33,38,.08)"/>
  <rect x="292" y="${rowY}" width="${barWidth}" height="28" rx="14" fill="${colors[index] || palette.main}"/>
  <text x="784" y="${rowY + 22}" class="chip">${Math.round(item.percent || 0)}%</text>`;
  }).join("")}
  <text x="96" y="${y + 332}" class="muted">副型看入口排序，第一和第二一起读会更接近日常表现。</text>`;
}

function posterTeamAnonSvg(visual, startY, palette) {
  const y = Math.min(startY, 560);
  const route = (visual.route || ["你的排序", "匿名池", "团队总图"]).slice(0, 3);
  const steps = (visual.steps || []).slice(0, 3);
  return `<rect x="64" y="${y}" width="772" height="360" rx="30" fill="rgba(255,255,255,.78)" stroke="${palette.main}" stroke-opacity=".18" stroke-width="3"/>
  <text x="96" y="${y + 52}" class="blockLabel">匿名汇总路径</text>
  ${route.map((item, index) => {
    const x = 96 + index * 248;
    return `<rect x="${x}" y="${y + 82}" width="184" height="72" rx="26" fill="${index === 1 ? palette.main : "#fff"}" fill-opacity="${index === 1 ? ".14" : ".78"}" stroke="${palette.main}" stroke-opacity=".16"/>
  <text x="${x + 92}" y="${y + 128}" text-anchor="middle" fill="#153a3e" font-size="26" font-weight="930">${escapeSvg(item)}</text>
  ${index < route.length - 1 ? `<line x1="${x + 190}" y1="${y + 118}" x2="${x + 236}" y2="${y + 118}" stroke="${palette.main}" stroke-opacity=".38" stroke-width="5" stroke-linecap="round"/>` : ""}`;
  }).join("")}
  ${steps.map((step, index) => {
    const x = 96 + index * 234;
    const textLines = svgTextLines(step.text, 8, 2);
    return `<text x="${x}" y="${y + 210}" class="blockLabel">${escapeSvg(step.label)}</text>
  ${textLines.map((line, lineIndex) => `<text x="${x}" y="${y + 246 + lineIndex * 29}" class="blockText">${escapeSvg(line)}</text>`).join("")}`;
  }).join("")}
  <rect x="96" y="${y + 302}" width="708" height="38" rx="19" fill="${palette.main}" fill-opacity=".08"/>
  <text x="120" y="${y + 328}" class="muted">${escapeSvg(visual.badge?.text || "匿名汇总，只看整体")}</text>`;
}

function posterAnalysisFromCard(card) {
  const box = card.querySelector(".analysis-one-box");
  if (!box) return null;
  const directStrong = [...box.children].find((item) => item.tagName === "STRONG");
  const directSmall = [...box.children].find((item) => item.tagName === "SMALL");
  const items = [...box.querySelectorAll(".analysis-one-list p")].map((item) => ({
    label: item.querySelector("strong")?.textContent.trim() || "",
    text: item.querySelector("span")?.textContent.trim() || ""
  })).filter((item) => item.label || item.text);
  return {
    eyebrow: box.querySelector("em")?.textContent.trim() || "",
    title: directStrong?.textContent.trim() || "",
    lead: box.querySelector(".analysis-lead")?.textContent.trim() || "",
    tags: [...box.querySelectorAll(".feature-tags i")].map((item) => item.textContent.trim()).filter(Boolean).slice(0, 3),
    items,
    teacher: directSmall?.textContent.trim() || ""
  };
}

function posterBarsSvg(rows, startY) {
  const legendY = startY - 38;
  return `
    <circle cx="72" cy="${legendY}" r="8" fill="#f66f7f"/><text x="92" y="${legendY + 8}" class="muted">否</text>
    <circle cx="152" cy="${legendY}" r="8" fill="#e7c463"/><text x="172" y="${legendY + 8}" class="muted">不确定</text>
    <circle cx="292" cy="${legendY}" r="8" fill="#21bdb3"/><text x="312" y="${legendY + 8}" class="muted">是</text>
    <line x1="486" y1="${legendY - 14}" x2="486" y2="${legendY + 18}" stroke="rgba(20,33,38,.42)" stroke-width="3" stroke-dasharray="7 7"/><text x="506" y="${legendY + 8}" class="muted">虚线为中线</text>
    ${rows.slice(0, 9).map((row, index) => {
      const y = startY + index * 48;
      const barX = 116;
      const barW = 700;
      const noW = barW * row.no / 100;
      const uncertainW = barW * row.uncertain / 100;
      const yesW = Math.max(0, barW - noW - uncertainW);
      return `<text x="68" y="${y + 20}" class="barlabel">${escapeSvg(row.label)}</text>
  <rect x="${barX}" y="${y}" width="${barW}" height="24" rx="12" fill="rgba(20,33,38,.08)"/>
  <rect x="${barX}" y="${y}" width="${noW}" height="24" rx="12" fill="#f66f7f"/>
  <rect x="${barX + noW}" y="${y}" width="${uncertainW}" height="24" fill="#e7c463"/>
  <rect x="${barX + noW + uncertainW}" y="${y}" width="${yesW}" height="24" rx="12" fill="#21bdb3"/>
  <line x1="${barX + barW / 2}" y1="${y - 6}" x2="${barX + barW / 2}" y2="${y + 30}" stroke="rgba(20,33,38,.4)" stroke-width="3" stroke-dasharray="7 7"/>`;
    }).join("")}
  `;
}

function posterBlocksSvg(blocks, startY) {
  return blocks.map((block, index) => {
    const y = startY + index * 102;
    const textLines = svgTextLines(block.text, 22, 2);
    return `<rect x="64" y="${y}" width="772" height="82" rx="18" fill="rgba(255,255,255,.72)" stroke="rgba(20,33,38,.08)"/>
  <text x="92" y="${y + 36}" class="blockLabel">${escapeSvg(block.label)}</text>
  ${textLines.map((line, lineIndex) => `<text x="238" y="${y + 36 + lineIndex * 30}" class="blockText">${escapeSvg(line)}</text>`).join("")}`;
  }).join("");
}

function posterAnalysisBoxSvg(analysis, startY, palette) {
  const y = Math.min(startY, 400);
  const boxHeight = 640;
  const titleLines = svgTextLines(analysis.title, 18, 2);
  const leadLines = svgTextLines(analysis.lead, 21, 3);
  const tags = (analysis.tags || []).slice(0, 3);
  const tagY = y + 242;
  const listStart = y + 308;
  let currentY = listStart;
  const itemSvg = (analysis.items || []).slice(0, 5).map((item) => {
    const isUsage = item.label === "使用说明";
    const textLines = svgTextLines(item.text, 21, isUsage ? 3 : 2);
    const rowHeight = isUsage ? 104 : 76;
    const itemY = currentY;
    currentY += rowHeight;
    return `<line x1="96" y1="${itemY - 14}" x2="804" y2="${itemY - 14}" stroke="rgba(20,33,38,.075)" stroke-width="2"/>
  <text x="96" y="${itemY + 16}" class="blockLabel">${escapeSvg(item.label)}</text>
  ${textLines.map((line, lineIndex) => `<text x="252" y="${itemY + 16 + lineIndex * 28}" class="analysisText">${escapeSvg(line)}</text>`).join("")}`;
  }).join("");
  const teacherLines = svgTextLines(analysis.teacher, 32, 2);
  const canShowTeacher = teacherLines.length && currentY < y + boxHeight - 78;
  const teacherY = y + boxHeight - 72;
  return `<rect x="64" y="${y}" width="772" height="${boxHeight}" rx="28" fill="rgba(255,255,255,.78)" stroke="${palette.main}" stroke-opacity=".22" stroke-width="3"/>
  <circle cx="790" cy="${y + 54}" r="20" fill="${palette.main}" fill-opacity=".12"/>
  <text x="96" y="${y + 42}" class="blockLabel">${escapeSvg(analysis.eyebrow)}</text>
  ${titleLines.map((line, lineIndex) => `<text x="96" y="${y + 92 + lineIndex * 40}" class="analysisTitle">${escapeSvg(line)}</text>`).join("")}
  ${leadLines.map((line, lineIndex) => `<text x="96" y="${y + 166 + lineIndex * 30}" class="analysisText">${escapeSvg(line)}</text>`).join("")}
  ${posterTagPillsSvg(tags, tagY, palette)}
  ${itemSvg}
  ${canShowTeacher ? `<rect x="92" y="${teacherY}" width="716" height="54" rx="18" fill="${palette.main}" fill-opacity=".07"/>
  ${teacherLines.map((line, lineIndex) => `<text x="116" y="${teacherY + 23 + lineIndex * 24}" class="muted">${escapeSvg(line)}</text>`).join("")}` : ""}`;
}

function posterTagPillsSvg(tags, y, palette) {
  let x = 96;
  const nodes = [];
  for (const tag of (tags || []).slice(0, 3)) {
    const text = String(tag || "").replace(/\s*\/\s*/g, "/").trim();
    const chars = Array.from(text);
    const label = chars.length > 10 ? `${chars.slice(0, 10).join("")}…` : text;
    const width = Math.min(238, Math.max(126, Array.from(label).length * 21 + 42));
    if (x + width > 804) break;
    nodes.push(`<rect x="${x}" y="${y}" width="${width}" height="42" rx="21" fill="${palette.main}" fill-opacity=".08" stroke="${palette.main}" stroke-opacity=".16"/>
  <text x="${x + 20}" y="${y + 28}" class="chip">${escapeSvg(label)}</text>`);
    x += width + 22;
  }
  return nodes.join("");
}

function posterQuoteSvg(text, startY, palette) {
  const lines = svgTextLines(text, 21, 2);
  return `<rect x="64" y="${startY}" width="772" height="96" rx="22" fill="rgba(255,255,255,.76)" stroke="${palette.main}" stroke-opacity=".18"/>
  <text x="92" y="${startY + 38}" class="blockLabel">朋友视角</text>
  ${lines.map((line, lineIndex) => `<text x="92" y="${startY + 70 + lineIndex * 30}" class="blockText">${escapeSvg(line)}</text>`).join("")}`;
}

function posterTeacherCtaFromCard(card) {
  const node = card.querySelector(".teacher-cta-card");
  if (!node) return null;
  return {
    title: node.querySelector("strong")?.textContent.trim() || "想看得更准",
    text: node.querySelector("span")?.textContent.trim() || "把编号发给老师，结合真实场景会更匹配。",
    code: node.querySelector("em")?.textContent.trim() || ""
  };
}

function posterTeacherCtaSvg(cta, startY) {
  const y = Math.min(startY, 922);
  const textLines = svgTextLines(cta.text, 25, 2);
  return `<rect x="64" y="${y}" width="772" height="120" rx="24" fill="rgba(255,255,255,.78)" stroke="rgba(20,33,38,.1)"/>
  <text x="92" y="${y + 45}" class="blockLabel">${escapeSvg(cta.title)}</text>
  ${textLines.map((line, lineIndex) => `<text x="92" y="${y + 78 + lineIndex * 30}" class="blockText">${escapeSvg(line)}</text>`).join("")}
  <text x="690" y="${y + 45}" class="code">${escapeSvg(cta.code)}</text>`;
}

function posterQrSvgBlock(footer) {
  return `<rect x="330" y="825" width="240" height="218" rx="30" fill="rgba(255,255,255,.72)" stroke="rgba(20,33,38,.1)"/>
  <rect x="364" y="878" width="172" height="118" rx="24" fill="rgba(255,255,255,.86)" stroke="rgba(20,33,38,.08)"/>
  <text x="450" y="930" text-anchor="middle" class="chip">进群入口</text>
  <text x="450" y="972" text-anchor="middle" class="muted">${escapeSvg(footer || "长按保存后继续看")}</text>`;
}

function svgTextLines(text, maxChars, maxLines = 3) {
  const chars = Array.from(String(text || "").trim());
  if (!chars.length) return [];
  const lines = [];
  for (let i = 0; i < chars.length && lines.length < maxLines; i += maxChars) {
    lines.push(chars.slice(i, i + maxChars).join(""));
  }
  return lines;
}

function escapeSvg(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function showShareImageModal(images = []) {
  const modal = $("shareImageModal");
  const list = $("shareImageList");
  if (!modal || !list) return;
  const title = $("shareImageTitle");
  if (title) title.textContent = images.length > 2 ? "长按保存三张图" : "长按保存结果图";
  list.innerHTML = images.map((item, index) => `
    <figure>
      <img src="${escapeHtml(item.url)}" alt="结果分享图 ${index + 1}">
      <figcaption>${escapeHtml(item.label || `${index + 1} / ${images.length}`)}</figcaption>
    </figure>
  `).join("");
  modal.hidden = false;
  showSaveToast(`${images.length}张图已生成，可长按保存`);
}

function closeShareImageModal() {
  $("shareImageModal").hidden = true;
  $("shareImageList").innerHTML = "";
}

function setTeamImageLinkState(enabled, label) {
  const link = $("teamImageLink");
  if (!link) return;
  link.hidden = false;
  link.textContent = label || (enabled ? "导出图片" : "样本满后可导出");
  link.setAttribute("aria-disabled", enabled ? "false" : "true");
  link.classList.toggle("is-disabled", !enabled);
  if (!enabled) link.removeAttribute("href");
}

function renderTeamSummary(summary) {
  if (summary.kind === "subtype") {
    renderSubtypeTeamSummary(summary);
    return;
  }
  state.currentTeamSummary = summary;
  const hasConclusion = Number(summary.member_count || 0) >= 3;
  const missingCount = Math.max(0, 3 - Number(summary.member_count || 0));
  document.querySelector("#teamScreen .eyebrow").textContent = "团队九型总图";
  $("teamSummaryTitle").textContent = hasConclusion ? "团队主型总图" : "团队主型收集中";
  $("teamSummaryNote").textContent = hasConclusion
    ? teamMainInsight(summary)
    : `还差 ${missingCount} 人亮起总图。`;
  if (hasConclusion) {
    $("teamImageLink").href = `/api/team/${encodeURIComponent(summary.team.code)}/report.svg`;
  }
  setTeamImageLinkState(hasConclusion, hasConclusion ? "导出图片" : `还差${missingCount}人`);
  $("teamSummaryMeta").innerHTML = `
    <span>${escapeHtml(summary.team.name)}</span>
    <span>成员 ${summary.member_count} 人</span>
    <span>至 ${formatDate(summary.team.expires_at)}</span>
    <span>${summary.team.active ? "进行中" : "已过期"}</span>
  `;
  $("teamSummaryGrid").innerHTML = `
    <div class="top-type-item team-kpi-item">
      <span>主导元素</span>
      <strong>${hasConclusion ? summary.dominant_elements.map((item) => `${item.element}号`).join(" / ") : "等待样本"}</strong>
      <small>${hasConclusion ? "团队更常调用的能量" : "还差" + missingCount + "人"}</small>
    </div>
    <div class="top-type-item team-kpi-item">
      <span>低位元素</span>
      <strong>${hasConclusion ? summary.low_elements.map((item) => `${item.element}号`).join(" / ") : "待亮起"}</strong>
      <small>${hasConclusion ? "需要补位或被看见的视角" : "避免过早判断"}</small>
    </div>
    <div class="top-type-item team-kpi-item">
      <span>分化元素</span>
      <strong>${hasConclusion ? (summary.split_elements.length ? summary.split_elements.map((item) => `${item.element}号`).join(" / ") : "暂无明显高分化") : "暂不判断"}</strong>
      <small>${hasConclusion ? "成员差异较大的位置" : "等待更多成员"}</small>
    </div>
  `;
  if (!hasConclusion) {
    $("teamEvidenceBars").innerHTML = `
      <div class="team-empty-state">
        <strong>已有 ${Number(summary.member_count || 0)}/3 人</strong>
        <p>再来 ${missingCount} 人，团队总图就亮。</p>
      </div>
    `;
    return;
  }
  $("teamEvidenceBars").innerHTML = `
    <div class="team-chart-head">
      <div>
        <strong>团队1-9号证据条</strong>
        <span>红=否定 · 黄=不确定 · 绿=确定 · 虚线=50%</span>
      </div>
      <em>${Number(summary.member_count || 0)}人样本</em>
    </div>
    <p class="evidence-legend">红=否定 · 黄=不确定 · 绿=确定 · 虚线=50%</p>
    ${[1,2,3,4,5,6,7,8,9].map((element) => {
      const item = summary.stats[element] || {};
      return `
        <div class="evidence-row team">
          <span class="evidence-label">${element}号</span>
          <div class="evidence-track">
            <span class="no" style="width:${item.no_rate || 0}%"></span>
            <span class="uncertain" style="width:${item.uncertain_rate || 0}%"></span>
            <span class="yes" style="width:${item.yes_rate || 0}%"></span>
            <i></i>
          </div>
          <strong>均${Math.round(item.mean || 0)} / ${item.disagreement || "-"}</strong>
        </div>
      `;
    }).join("")}
  `;
}

function teamMainInsight(summary) {
  const dominant = (summary.dominant_elements || []).slice(0, 3).map((item) => Number(item.element)).filter(Boolean);
  if (!dominant.length) return "先看样本数量，再判断团队倾向。";
  const words = {
    1: "标准校准",
    2: "关系支持",
    3: "目标推进",
    4: "真实表达",
    5: "信息理解",
    6: "风险验证",
    7: "可能性探索",
    8: "边界承担",
    9: "稳定氛围"
  };
  return `这个团队更容易把注意力放在${dominant.map((element) => words[element]).join("、")}上；复盘时先确认共识、卡点和需要被支持的部分。`;
}

function renderSubtypeTeamSummary(summary) {
  state.currentTeamSummary = summary;
  const hasConclusion = Number(summary.member_count || 0) >= 5;
  const missingCount = Math.max(0, 5 - Number(summary.member_count || 0));
  document.querySelector("#teamScreen .eyebrow").textContent = "团队副型总图";
  $("teamSummaryTitle").textContent = hasConclusion ? "团队副型总图" : "团队副型收集中";
  $("teamSummaryNote").textContent = hasConclusion
    ? teamSubtypeInsight(summary)
    : `还差 ${missingCount} 人亮起入口排序。`;
  if (hasConclusion) {
    $("teamImageLink").href = `/api/team/${encodeURIComponent(summary.team.code)}/report.svg`;
  }
  setTeamImageLinkState(hasConclusion, hasConclusion ? "导出图片" : `还差${missingCount}人`);
  $("teamSummaryMeta").innerHTML = `
    <span>${escapeHtml(summary.team.name)}</span>
    <span>匿名样本 ${summary.member_count} 人</span>
    <span>至 ${formatDate(summary.team.expires_at)}</span>
    <span>${summary.team.active ? "进行中" : "已过期"}</span>
  `;
  $("teamSummaryGrid").innerHTML = `
    <div class="top-type-item team-kpi-item">
      <span>主导入口</span>
      <strong>${hasConclusion ? summary.dominant_subtypes.map((item) => escapeHtml(item.label)).join(" / ") : "等待样本"}</strong>
      <small>${hasConclusion ? "团队更常进入的注意力入口" : "还差" + missingCount + "人"}</small>
    </div>
    <div class="top-type-item team-kpi-item">
      <span>分化入口</span>
      <strong>${hasConclusion ? (summary.split_subtypes.length ? summary.split_subtypes.map((item) => escapeHtml(item.label)).join(" / ") : "暂无明显高分化") : "暂不判断"}</strong>
      <small>${hasConclusion ? "不同成员差异较大的入口" : "等待更多成员"}</small>
    </div>
    <div class="top-type-item team-kpi-item">
      <span>匿名提交</span>
      <strong>只看整体</strong>
      <small>个人排序不公开</small>
    </div>
  `;
  const stats = Object.values(summary.subtype_stats || {});
  if (!hasConclusion) {
    $("teamEvidenceBars").innerHTML = `
      <div class="team-empty-state team-subtype-waiting">
        <strong>已有 ${Number(summary.member_count || 0)}/5 人匿名提交</strong>
        <p>再来 ${missingCount} 人，入口排序就亮。</p>
      </div>
    `;
    return;
  }
  $("teamEvidenceBars").innerHTML = `
    <div class="team-chart-head">
      <div>
        <strong>团队副型入口均值</strong>
        <span>均值 / 分化</span>
      </div>
      <em>${Number(summary.member_count || 0)}人匿名</em>
    </div>
    ${stats.map((item) => `
      <div class="evidence-row team-subtype">
        <span class="evidence-label">${escapeHtml(item.label || item.full || item.key)}</span>
        <div class="evidence-track single">
          <span class="yes" style="width:${Math.max(0, Math.min(100, item.mean || 0))}%"></span>
          <i></i>
        </div>
        <strong>均${Math.round(item.mean || 0)} / ${escapeHtml(item.disagreement || "-")}</strong>
      </div>
      <p class="team-stat-note">中位 ${Math.round(item.median || 0)} · 标准差 ${Math.round(item.sd || 0)} · IQR ${Math.round(item.iqr || 0)}</p>
    `).join("")}
  `;
}

function teamSubtypeInsight(summary) {
  const dominant = (summary.dominant_subtypes || []).slice(0, 2).map((item) => item.label).filter(Boolean);
  if (!dominant.length) return "先看匿名样本数量，再判断团队副型倾向。";
  const first = dominant[0];
  const second = dominant[1];
  const copy = {
    "自保型": "这个团队更容易先关注资源、节奏和基本盘",
    "一对一型": "这个团队更容易先关注关键连接、真实回应和关系强度",
    "社群型": "这个团队更容易先关注群体位置、协作氛围和共同目标"
  };
  const firstLine = copy[first] || `这个团队更容易先进入${first}入口`;
  return second
    ? `${firstLine}；${second}会作为第二入口影响团队氛围。`
    : `${firstLine}。`;
}

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function formatShortDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatDateTime(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${date.getFullYear()}年${month}月${day}日 ${hour}:${minute}`;
}

function formatCount(value) {
  const number = Math.max(0, Math.floor(Number(value) || 0));
  return number.toLocaleString("zh-CN");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function createMapSvg(scores, topTypes = [], size = 420, compact = false) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.39;
  const minR = size * 0.1;
  const labelR = size * (compact ? 0.445 : 0.455);
  const topSet = new Set(topTypes.map((item) => Number(item.element)));
  const elements = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const point = (element, radius) => {
    const angle = -Math.PI / 2 + ((element - 1) * Math.PI * 2) / 9;
    return {
      x: cx + Math.cos(angle) * radius,
      y: cy + Math.sin(angle) * radius
    };
  };
  const polygon = elements.map((element) => {
    const percent = scores[element]?.type_percent || 0;
    const p = point(element, minR + (percent / 100) * (maxR - minR));
    return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }).join(" ");
  const linePath = (sequence) => sequence.map((element, index) => {
    const p = point(element, maxR);
    return `${index === 0 ? "M" : "L"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`;
  }).join(" ") + " Z";
  const nodes = elements.map((element) => {
    const node = point(element, maxR);
    const label = point(element, labelR);
    return `
      <circle class="map-node ${topSet.has(element) ? "top" : ""}" cx="${node.x.toFixed(1)}" cy="${node.y.toFixed(1)}" r="${compact ? 5 : 8}"></circle>
      <text class="map-label" x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}">${element}</text>
    `;
  }).join("");
  const rings = [0.25, 0.5, 0.75, 1].map((ratio) => `<circle class="map-ring" cx="${cx}" cy="${cy}" r="${(maxR * ratio).toFixed(1)}"></circle>`).join("");
  const axis = elements.map((element) => {
    const p = point(element, maxR);
    return `<line class="map-axis" x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}"></line>`;
  }).join("");

  return `
    <svg class="map-svg ${compact ? "compact-map" : ""}" viewBox="0 0 ${size} ${size}" role="img" aria-label="九型人格地图">
      ${rings}
      ${axis}
      <path class="map-star" d="${linePath([1,4,2,8,5,7])}"></path>
      <path class="map-star" d="${linePath([3,6,9])}"></path>
      <polygon class="map-polygon" points="${polygon}"></polygon>
      ${nodes}
    </svg>
  `;
}
