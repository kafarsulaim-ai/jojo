const TYPE_NAMES = {
  1: "人间校准仪",
  2: "心意接线员",
  3: "人生项目经理",
  4: "情绪收藏家",
  5: "信息囤积者",
  6: "安全预案师",
  7: "快乐逃生员",
  8: "人间防护罩",
  9: "氛围修复师"
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
    button: "开始主型90题"
  },
  main180: {
    eyebrow: "专业深测入口",
    line: "深一点。",
    button: "开始深测180题"
  },
  main270: {
    eyebrow: "专业深测入口",
    line: "深一点。",
    button: "开始深测180题"
  },
  subtype_adult: {
    eyebrow: "副型补充入口",
    line: "补一张入口图。",
    button: "开始个人副型"
  },
  subtype_child: {
    eyebrow: "亲子观察入口",
    line: "给孩子看入口。",
    button: "开始少儿副型"
  },
  team_subtype: {
    eyebrow: "匿名团队副型测试",
    line: "匿名汇总。",
    button: "开始团队副型"
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
    friend: "你以为我太会照顾人，其实我在确认我们之间有没有真的连上。",
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
    friend: "你以为我想太多，其实我在给大家提前装安全气囊。",
    work: "我会预判风险、准备备选方案。",
    pressure: "压力一来，容易进入预案宇宙。",
    near: "给确定感",
    avoid: "临时变卦不解释",
    charge: "有人一起扛风险"
  },
  7: {
    friend: "你以为我在玩，其实我在给生活疯狂开新地图。",
    work: "我擅长带来可能性、创意和气氛。",
    pressure: "压力一来，先找出口和新鲜感。",
    near: "保留可能性",
    avoid: "把我困在无聊里",
    charge: "有趣、有路、有下一站"
  },
  8: {
    friend: "你以为我太强势，其实我在确认谁能站稳、谁别被欺负。",
    work: "关键时刻我会撑边界、做决断。",
    pressure: "压力一来，保护和掌控会先上线。",
    near: "直接坦诚",
    avoid: "绕弯和暗控",
    charge: "并肩作战，别让我一个人扛"
  },
  9: {
    friend: "你以为我没意见，其实我在给现场降噪，让大家别炸。",
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
const WECHAT_READY_KEY = "jojoWechatReadyAt";
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
  reusableTeamMain: null,
  deviceToken: "",
  accountToken: "",
  account: null,
  adminAccount: null,
  adminPermissions: {},
  wechat: null,
  wechatEnabled: false,
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
  const savedWechat = localStorage.getItem("jojoWechatAccount");
  if (savedWechat) {
    try { state.wechat = JSON.parse(savedWechat); } catch { state.wechat = null; }
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
  $("passkeyRegisterButton").addEventListener("click", registerPasskey);
  $("passkeyLoginButton").addEventListener("click", loginPasskey);
  $("wechatLoginButton").addEventListener("click", () => {
    ensureGlobalIdentity(2).then((loggedIn) => {
      if (loggedIn || hasAnyLoggedInIdentity()) openHistory();
      else startWechatAuth("history");
    });
  });
  $("wechatLogoutButton").addEventListener("click", logoutWechat);
  $("markerWechatButton").addEventListener("click", () => startWechatAuth("marker"));
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
  $("methodButton").addEventListener("click", () => showInfo("method"));
  $("calibrationButton").addEventListener("click", () => showInfo("calibration"));
  $("noticeButton").addEventListener("click", () => showInfo("notice"));
  $("infoBackButton").addEventListener("click", () => {
    window.history.replaceState(null, "", "/");
    showScreen("start");
  });
  window.addEventListener("beforeunload", trackPotentialAbandon);
  window.addEventListener("beforeunload", () => trackResultDwell({ beacon: true }));
  updatePasskeyStatus();
  state.analyticsSession = ensureAnalyticsSession();
  loadWechatStatus();
  loadAdminStatus();
  loadSiteSettings();
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
    await ensureWechatReady(routeParams.get("wechat") === "ok" ? 4 : 2);
    const requestedMode = routeParams.get("mode") || "main90";
    const requestedTeam = routeParams.get("team") || "";
    if (MODE_COPY[requestedMode]) setMode(requestedMode);
    if (requestedTeam) {
      $("teamCodeInput").value = requestedTeam.trim().toUpperCase();
      $("joinTeamInput").checked = true;
    }
    window.history.replaceState(null, "", "/");
    if (state.wechat) {
      state.recoveryMarkerConfirmed = true;
      await beginTest();
      return;
    }
  }
  if (!parts.length && routeParams.get("view") === "history") {
    await ensureWechatReady(routeParams.get("wechat") === "ok" ? 4 : 2);
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
  if (!historyActive || !draft) {
    card.hidden = true;
    return;
  }
  const total = draft.session.questions.length;
  const answered = Object.keys(draft.answers || {}).length;
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
  if (result.wechat) {
    state.wechat = result.wechat;
    localStorage.setItem("jojoWechatAccount", JSON.stringify(result.wechat));
    updateWechatStatus();
  }
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
  return Boolean(state.wechat || state.accountToken || state.account || state.adminAccount);
}

function hasUserIdentity() {
  return Boolean(state.wechat || state.accountToken || state.account);
}

function hasStaffIdentity() {
  return Boolean(state.adminAccount);
}

function hasAnyLoggedInIdentity() {
  return Boolean(hasUserIdentity() || hasStaffIdentity());
}

function hasHistoryIdentity() {
  return Boolean(hasUserIdentity());
}

async function openHistory() {
  showScreen("history");
  $("resumeCard").hidden = true;
  state.historyHasResults = false;
  $("wechatPanel").hidden = true;
  $("historyList").innerHTML = `<div class="history-item muted"><span>加载中</span></div>`;
  await ensureGlobalIdentity(2);
  if (!hasHistoryIdentity()) {
    renderHistory([]);
    renderResumeCard();
    updateWechatStatus();
    return;
  }
  renderResumeCard();
  $("historyList").innerHTML = `<div class="history-item muted"><span>加载中</span></div>`;
  try {
    const params = new URLSearchParams({ device: state.deviceToken });
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/me/results?${params.toString()}`);
    const data = response.ok ? await response.json() : { results: [] };
    if (data.account) saveAccount(data.account, state.accountToken);
    if (data.wechat) {
      state.wechat = data.wechat;
      if (state.wechat.nickname && !$("nicknameInput").value.trim()) $("nicknameInput").value = state.wechat.nickname;
      updateWechatStatus();
    }
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
    if (state.historyHasResults || hasHistoryIdentity()) {
      $("wechatPanel").hidden = true;
      return;
    }
    updateWechatStatus();
  } catch {
    state.historyHasResults = false;
    renderHistory([]);
    renderResumeCard();
    if (hasHistoryIdentity()) {
      $("wechatPanel").hidden = true;
      return;
    }
    updateWechatStatus();
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

function saveAccount(account, token) {
  if (account) {
    state.account = account;
    localStorage.setItem("enneagramAccount", JSON.stringify(account));
  }
  if (token) {
    state.accountToken = token;
    localStorage.setItem("enneagramAccountToken", token);
  }
  updatePasskeyStatus();
}

function clearSavedAccount() {
  state.account = null;
  state.accountToken = "";
  localStorage.removeItem("enneagramAccount");
  localStorage.removeItem("enneagramAccountToken");
  updatePasskeyStatus();
}

async function loadAuthStatus() {
  try {
    const params = new URLSearchParams();
    if (state.accountToken) params.set("account_token", state.accountToken);
    const response = await fetch(`/api/auth/me${params.toString() ? `?${params.toString()}` : ""}`, { credentials: "same-origin" });
    const data = response.ok ? await response.json() : {};
    state.wechat = data.user?.wechat || null;
    if (data.user?.account) state.account = data.user.account;
    else if (state.accountToken || state.account) clearSavedAccount();
    state.adminAccount = data.staff?.account || null;
    state.adminPermissions = data.staff?.permissions || {};
    if (state.wechat?.nickname && !$("nicknameInput").value.trim()) $("nicknameInput").value = state.wechat.nickname;
    if (state.wechat) {
      try {
        localStorage.setItem("jojoWechatAccount", JSON.stringify(state.wechat));
        sessionStorage.setItem(WECHAT_READY_KEY, new Date().toISOString());
      } catch {}
    } else {
      localStorage.removeItem("jojoWechatAccount");
    }
    updateWechatStatus();
    return Boolean(data.logged_in || hasAnyLoggedInIdentity());
  } catch {
    updateWechatStatus();
    return hasAnyLoggedInIdentity();
  }
}

async function loadWechatStatus() {
  try {
    const response = await fetch("/api/auth/wechat/config", { credentials: "same-origin" });
    const data = response.ok ? await response.json() : { enabled: false };
    state.wechatEnabled = Boolean(data.enabled);
    state.wechat = data.account || data.wechat || null;
    if (state.wechat?.nickname && !$("nicknameInput").value.trim()) $("nicknameInput").value = state.wechat.nickname;
    updateWechatStatus();
    if (state.wechat) {
      try {
        localStorage.setItem("jojoWechatAccount", JSON.stringify(state.wechat));
        sessionStorage.setItem(WECHAT_READY_KEY, new Date().toISOString());
      } catch {}
    } else {
      localStorage.removeItem("jojoWechatAccount");
    }
  } catch {
    state.wechatEnabled = false;
    state.wechat = null;
    updateWechatStatus();
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
  updateWechatStatus();
}

async function ensureGlobalIdentity(retries = 2) {
  if (!state.wechatEnabled) await loadWechatStatus();
  await loadAuthStatus();
  if (hasAnyLoggedInIdentity()) return true;
  const attempts = Math.max(1, Number(retries || 1));
  for (let index = 0; index < attempts; index += 1) {
    await Promise.allSettled([loadWechatStatus(), loadAuthStatus()]);
    if (hasAnyLoggedInIdentity()) return true;
    if (index < attempts - 1) await wait(160 + index * 120);
  }
  return hasAnyLoggedInIdentity();
}

async function ensureWechatReady(retries = 2) {
  if (!state.wechatEnabled) await loadWechatStatus();
  if (state.wechat) return true;
  const attempts = Math.max(1, Number(retries || 1));
  for (let index = 0; index < attempts; index += 1) {
    await loadWechatStatus();
    if (state.wechat) return true;
    if (index < attempts - 1) await wait(180 + index * 160);
  }
  return Boolean(state.wechat);
}

function updateWechatStatus() {
  const panel = $("wechatPanel");
  const markerButton = $("markerWechatButton");
  if (!panel || !markerButton) return;
  const historyActive = screens.history?.classList.contains("active");
  panel.hidden = !historyActive || state.historyHasResults || hasHistoryIdentity();
  markerButton.hidden = !state.wechatEnabled || Boolean(state.wechat);
  if (!state.wechatEnabled && !state.wechat) return;
  const avatar = state.wechat?.avatar_url || "/jojo-icon.svg";
  $("wechatAvatar").innerHTML = `<img src="${escapeHtml(avatar)}" alt="">`;
  $("wechatStatusTitle").textContent = state.wechat?.nickname ? state.wechat.nickname : "登录查看记录";
  $("wechatStatusText").textContent = state.wechat
    ? "已登录"
    : (hasAnyLoggedInIdentity() ? "已登录" : "");
  $("wechatLoginButton").textContent = state.wechat ? "刷新" : "微信授权登录";
  markerButton.textContent = "微信授权登录";
  $("wechatLogoutButton").hidden = !state.wechat;
}

function startWechatAuth(source = "history") {
  if (source === "history" && hasHistoryIdentity()) {
    openHistory();
    return;
  }
  if (!state.wechatEnabled) {
    if (source === "marker") {
      skipRecoveryMarker();
      return;
    }
    alert("微信授权还没有配置好，请稍后再试。");
    return;
  }
  const currentPath = window.location.pathname === "/" ? "/" : `${window.location.pathname}${window.location.search || ""}`;
  let redirect = currentPath;
  if (source === "history") {
    redirect = "/?view=history";
  } else if (source === "marker") {
    const startParams = new URLSearchParams({ start: "1", mode: $("modeInput").value || state.mode || "main90" });
    const teamCode = $("joinTeamInput").checked ? $("teamCodeInput").value.trim() : "";
    if (teamCode) startParams.set("team", teamCode);
    redirect = `/?${startParams.toString()}`;
  }
  const params = new URLSearchParams({ redirect, device: state.deviceToken });
  window.location.href = `/auth/wechat/start?${params.toString()}`;
}

async function logoutWechat() {
  try {
    await fetch("/api/auth/wechat/logout", { method: "POST", credentials: "same-origin" });
  } catch {}
  state.wechat = null;
  localStorage.removeItem("jojoWechatAccount");
  updateWechatStatus();
  openHistory();
}

function updatePasskeyStatus() {
  const supported = Boolean(window.PublicKeyCredential && navigator.credentials);
  $("passkeyRegisterButton").disabled = !supported;
  $("passkeyLoginButton").disabled = !supported;
  if (!supported) {
    $("passkeyStatus").textContent = "当前浏览器暂不支持Passkey，可继续使用本机记录和星图编号。";
    return;
  }
  if (state.accountToken && state.account?.name) {
    $("passkeyStatus").textContent = `已启用：${state.account.name}。换手机时可用Passkey找回记录。`;
    $("passkeyRegisterButton").querySelector("span").textContent = "重新创建Passkey";
    return;
  }
  $("passkeyStatus").textContent = "可选开启，之后换设备也能免密码找回测试记录。";
}

async function registerPasskey() {
  if (!window.PublicKeyCredential || !navigator.credentials) {
    alert("当前浏览器暂不支持Passkey。");
    return;
  }
  const button = $("passkeyRegisterButton");
  button.disabled = true;
  button.querySelector("span").textContent = "正在启用";
  try {
    const name = $("nicknameInput").value.trim() || state.account?.name || "jojo用户";
    const optionsRes = await fetch("/api/passkey/register/options", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, device_token: state.deviceToken })
    });
    const options = await optionsRes.json();
    if (!optionsRes.ok) throw new Error(options.error || "Passkey准备失败");
    const credential = await navigator.credentials.create({
      publicKey: transformCreationOptions(options.publicKey)
    });
    const verifyRes = await fetch("/api/passkey/register/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credential: serializeCredential(credential),
        device_token: state.deviceToken
      })
    });
    const data = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(data.error || "Passkey启用失败");
    saveAccount(data.account, data.account_token);
    renderHistory([...(data.results || []), ...JSON.parse(localStorage.getItem("enneagramLocalResults") || "[]")]);
  } catch (err) {
    alert(err.message || "Passkey启用失败，可以继续用本机记录和星图编号。");
  } finally {
    button.disabled = false;
    updatePasskeyStatus();
  }
}

async function loginPasskey() {
  if (!window.PublicKeyCredential || !navigator.credentials) {
    alert("当前浏览器暂不支持Passkey。");
    return;
  }
  const button = $("passkeyLoginButton");
  button.disabled = true;
  button.textContent = "正在找回";
  try {
    const optionsRes = await fetch("/api/passkey/login/options", { method: "POST" });
    const options = await optionsRes.json();
    if (!optionsRes.ok) throw new Error(options.error || "Passkey准备失败");
    const assertion = await navigator.credentials.get({
      publicKey: transformRequestOptions(options.publicKey)
    });
    const verifyRes = await fetch("/api/passkey/login/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        credential: serializeAssertion(assertion),
        device_token: state.deviceToken
      })
    });
    const data = await verifyRes.json();
    if (!verifyRes.ok) throw new Error(data.error || "Passkey找回失败");
    saveAccount(data.account, data.account_token);
    renderHistory(data.results || []);
  } catch (err) {
    alert(err.message || "Passkey找回失败，请确认是否在这个域名创建过Passkey。");
  } finally {
    button.disabled = false;
    button.textContent = "用Passkey找回";
    updatePasskeyStatus();
  }
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
    if (!hasAnyLoggedInIdentity()) {
      $("historyList").innerHTML = draft
        ? ""
        : `<div class="history-item muted"><strong>还没有记录</strong><span>先完成一次测试。</span></div>`;
      return;
    }
    $("historyList").innerHTML = `<div class="history-item muted"><strong>还没有记录</strong><span>先完成一次测试。</span></div>`;
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
    $("startEyebrow").textContent = "团队测试入口";
    $("startLine").textContent = "给团队一张图。";
    return;
  }
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
    $("teamCreatedTitle").textContent = "复制链接给团队";
    $("teamCreatedBody").textContent = `${data.team.name} · ${data.team.mode_label} · 有效至 ${formatDate(data.team.expires_at)}`;
    $("teamCreatedSummaryLink").href = summaryUrl;
    $("teamCopyInviteButton").textContent = "复制链接给团队";
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
    const isSubtypeTeam = data.team.test_kind === "subtype";
    $("teamInviteMeta").textContent = data.team.active
      ? `${data.team.mode_label || "团队测试"} · 链接有效至 ${formatDate(data.team.expires_at)}`
      : "链接已过期，本次测试不会计入团队";
    $("joinTeamInput").checked = data.team.active;
    $("joinTeamInput").disabled = !data.team.active;
    if (isSubtypeTeam && data.team.active) {
      setMode("team_subtype");
      document.querySelectorAll(".mode-card").forEach((item) => {
        item.classList.toggle("active", false);
      });
      $("modeGrid").hidden = true;
      $("startEyebrow").textContent = "匿名团队副型测试";
      $("startLine").textContent = "完成60题后，结果只进入团队副型匿名汇总，不展示个人明细。";
      return;
    }
    $("modeGrid").hidden = false;
    document.querySelector('[data-mode="main90"]').click();
    $("startEyebrow").textContent = data.team.active ? "团队九型测试" : "团队链接已过期";
    $("startLine").textContent = data.team.active
      ? "完成90题后，本次结果会计入团队总图。"
      : "你仍可以完成个人测试，但结果不会计入该团队。";
    if (data.team.active) checkRecentMainForTeam(data.team);
  } catch {
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
    $("teamReuseBody").textContent = `${formatDateTime(data.reusable.created_at)} 的${modeShortLabel(data.reusable.test_mode, data.reusable.mode_label)}可以直接计入「${team.name}」。`;
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
          nickname: $("nicknameInput").value.trim() || state.wechat?.nickname || "",
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
  if (shouldPromptRecoveryMarker()) {
    showRecoveryMarker();
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
  return Boolean(draftMode === currentMode && draftTeamCode === currentTeamCode);
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
  $("markerWechatButton").hidden = true;
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
  if (sessionStorage.getItem(WECHAT_READY_KEY)) return false;
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
  updateWechatStatus();
  $("recoveryModal").hidden = false;
  trackEvent("recovery_marker_prompt", { mode: state.mode });
  if (!isCoarsePointer() && !$("markerWechatButton").hidden) window.setTimeout(() => $("markerWechatButton").focus(), 40);
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
  if (shouldPromptRecoveryMarker()) {
    showRecoveryMarker();
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
      nickname: $("nicknameInput").value.trim() || state.wechat?.nickname || "",
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
  const steps = Array.from({ length: total }, (_, index) => {
    const groupNumber = index + 1;
    const status = groupNumber < currentGroup ? "complete" : groupNumber === currentGroup ? "current" : "upcoming";
    const style = status === "current" ? ` style="--fill:${Math.round(fill * 100)}%"` : "";
    return `<span class="jo-step ${status}"${style} aria-hidden="true"><span></span></span>`;
  });
  const split = Math.ceil(total / 2);
  $("groupProgressTop").innerHTML = steps.slice(0, split).join("");
  $("groupProgressBottom").innerHTML = steps.slice(split).join("");
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
  const lines = ["自动保存好了", "下一组，轻轻来", "不用满分，真实就行", "喝口水也算进度"];
  $("encouragementModal").dataset.tone = String((group - 1) % 5);
  $("modalKicker").textContent = `第 ${group} 组已收好`;
  $("modalTitle").textContent = item.title;
  $("modalBody").textContent = item.body;
  $("modalProgressBar").style.width = `${percent}%`;
  $("modalPercent").textContent = `${percent}%`;
  $("modalMeta").textContent = `${done}/${total} · ${lines[(group - 1) % lines.length]}`;
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
      <p>老师端只看团队层面的分布，不展示个人副型明细。</p>
    </div>
    <div class="snapshot-card">
      <span>团队</span>
      <strong>${escapeHtml(result.team?.name || "团队")}</strong>
      <p>本次结果会计入团队副型总图。</p>
    </div>
    <div class="snapshot-card soft">
      <span>匿名规则</span>
      <strong>不展示个人</strong>
      <p>只保留团队层面的注意力入口。</p>
    </div>
  `;
}

function teamSubtypeTopHtml(result) {
  return `
    <div class="top-type-item">
      <span>匿名规则</span>
      <strong>不展示个人明细</strong>
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
  $("combinedNote").textContent = "截图三张卡即可转发；更完整的判断交给老师结合访谈校准。";
  $("combinedCodes").textContent = codeText;
  const combinedFocus = report.focus || "主型看核心动机，副型看这个动机最常进入生活的入口。";
  const briefFocus = combinedFocus.split("。").filter(Boolean)[0] || "主型看核心动机，副型看注意力入口";
  const primaryCardTitle = `${primary}号 × ${subtypeTitle}`;
  $("combinedContent").innerHTML = `
    <section class="share-deck combined-share-deck" aria-label="三张综合结果分享卡">
      <article class="share-card share-card-primary" data-type="${escapeHtml(primary)}">
        <div class="share-watermark" aria-hidden="true">${escapeHtml(String(primary))}</div>
        <div class="share-top">
          <span class="share-brand"><img src="/jojo-icon.svg" alt="">jojo测九型</span>
          <span>01 / 03</span>
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
          <span class="share-brand"><img src="/jojo-icon.svg" alt="">jojo测九型</span>
          <span>02 / 03</span>
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
      <article class="share-card share-card-next" data-type="${escapeHtml(primary)}">
        <div class="share-watermark" aria-hidden="true">go</div>
        <div class="share-top">
          <span class="share-brand"><img src="/jojo-icon.svg" alt="">jojo测九型</span>
          <span>03 / 03</span>
        </div>
        <div class="share-core share-card-stack">
          <p class="share-label">下一步</p>
          <h3>带着编号找老师</h3>
          <p>${escapeHtml(report.caution || "这是一张地图，不是最终标签；建议结合真实事件和老师访谈校准。")}</p>
          <div class="poster-qr-block">${getGroupQrHtml(main)}</div>
        </div>
        <div class="share-footer">
          <span>进群继续看结果</span>
          <span class="hidden-code">ref ${escapeHtml(codeText)}</span>
        </div>
      </article>
    </section>
  `;
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
  const identity = identityTitle(deck);
  const mainOnly = Boolean(main && !hasSubtype);
  const topText = main
    ? (main.top_types || []).slice(0, 3).map((item) => `${item.element}号`).join(" / ")
    : "主型可补";
  const subtypeRank = subtypeRankText(subtype);

  $("shareDeck")?.classList.toggle("main-only-share-deck", mainOnly);
  setShareDeckType(cardType);
  $("shareNumber").textContent = main ? `${primary}` : "sx";
  $("hiddenCode").textContent = `ref ${code}`;
  $("sharePrimaryKicker").textContent = mainOnly ? "主型结果" : "身份卡";
  $("shareTitle").textContent = mainOnly ? mainOnlyTitle(main) : identity;
  $("shareLine").textContent = mainOnly
    ? "本次结果先以主型为主；副型像补光，之后可加测，不影响这张主图。"
    : (main ? "" : "副型先看排序，主型补齐后更完整。");
  $("shareChips").innerHTML = identityChips(deck, code, { mainOnly }).filter((text) => !text.startsWith("ref ")).map((text) => `<span>${escapeHtml(text)}</span>`).join("");
  $("shareMiniMap").innerHTML = identityVisualHtml(deck);
  $("shareTopTypes").textContent = main ? `${mainOnly ? "本次主型分布" : "前三"} ${topText.replace(/号/g, "")}${hasSubtype ? ` · ${subtypeRank.split(" / ")[0]}` : ""}` : `副型 ${subtypeRank.split(" / ").slice(0, 2).join(" / ")}`;

  $("shareEvidenceTitle").textContent = translation.friend;
  $("shareEvidenceKicker").textContent = "朋友翻译卡";
  $("shareEvidenceLine").textContent = "";
  $("shareEvidenceVisual").innerHTML = translationCardHtml(translation);
  $("shareEvidenceFoot").textContent = main ? "朋友 / 工作 / 压力" : "副型视角";
  $("shareEvidenceCode").textContent = `ref ${code}`;

  $("shareNextKicker").textContent = "使用说明卡";
  $("shareNextTitle").textContent = "我的使用说明";
  $("shareNextLine").textContent = "";
  $("shareNextQr").innerHTML = usageGuideHtml(usage, result);
  $("shareNextFoot").textContent = "进群继续看结果";
  $("shareNextCode").textContent = `ref ${code}`;
  renderResultUtilities(result);
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

function mainTypeCode(main) {
  const primary = getMainPrimary(main);
  const wing = getWingNumber(main);
  return primary ? `${primary}${wing ? `w${wing}` : "号"}` : "主型";
}

function mainOnlyTitle(main) {
  const primary = getMainPrimary(main);
  const typeName = primary ? (TYPE_NAMES[primary] || main?.share?.title || `${primary}号`) : "主型结果";
  return `${mainTypeCode(main)} ${typeName}`;
}

function identityTitle(bundle) {
  const main = bundle.main;
  const subtype = bundle.subtype;
  const primary = getMainPrimary(main);
  const typeName = primary ? (TYPE_NAMES[primary] || main?.share?.title || `${primary}号`) : "";
  const typeCode = primary ? mainTypeCode(main) : "副型待拼图";
  const topSubtype = getSubtypeTop(subtype);
  const subtypeName = topSubtype
    ? `${SUBTYPE_SHORT_NAMES[topSubtype.key] || SUBTYPE_NAMES[topSubtype.key] || topSubtype.label}优先`
    : "副型可补";
  if (!primary) {
    return `我是 ${subtypeName}的注意力入口`;
  }
  return topSubtype ? `我是 ${typeCode} ${subtypeName}的${typeName}` : `我是 ${typeCode} 的${typeName}`;
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
        </div>
      `;
    }
    const subtypeBlock = `<div class="identity-subtype-triangle">${subtypeTriangleHtml(subtype)}</div>`;
    return `
      <div class="identity-visual-grid">
        <div class="identity-main-bars">${mainResultDistributionHtml(main)}</div>
        <div class="identity-mini-stack">
          <div class="identity-mini-map">${createMapSvg(main.scores || {}, main.top_types || [], 180, true)}</div>
          ${subtypeBlock}
        </div>
      </div>
    `;
  }
  return `
    <div class="identity-subtype-only">
      ${subtypePieHtml(subtype?.subtype_ranked || [])}
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
  const settings = state.siteSettings || {};
  const qr = settings.group_chat_qr_image_url || "";
  const caption = settings.group_chat_qr_caption || "扫码加入群聊";
  const qrHtml = qr
    ? `<img src="${escapeHtml(qr)}" alt="${escapeHtml(caption)}"><p>${escapeHtml(caption)}</p>`
    : `<div class="poster-qr-empty compact"><span>进群入口</span><p>添加群聊里查看</p></div>`;
  return `
    <div class="usage-guide-list">
      <p><strong>靠近</strong><span>${escapeHtml(usage.near)}</span></p>
      <p><strong>避雷</strong><span>${escapeHtml(usage.avoid)}</span></p>
      <p><strong>充电口</strong><span>${escapeHtml(usage.charge)}</span></p>
    </div>
    <div class="poster-qr-block usage-guide-qr">${qrHtml}</div>
  `;
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
  const line = "副型先说明注意力入口，主型补完后会更像完整说明书。";
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
    teamButton.textContent = hasTeam ? "团队测试结果查看" : "团队测试结果查看";
  }
}

function renderAnonymousTeamSubtypeShareDeck(result) {
  const code = result.verification_code || "------";
  const teamName = result.team?.name || "团队";
  $("shareDeck")?.classList.remove("main-only-share-deck");
  $("shareCard").dataset.type = 6;
  $("shareNumber").textContent = "team";
  $("hiddenCode").textContent = `ref ${code}`;
  $("sharePrimaryKicker").textContent = "团队副型";
  $("shareTitle").textContent = "已匿名计入";
  $("shareLine").textContent = "";
  $("shareChips").innerHTML = [
    `团队 ${teamName}`,
    "匿名汇总"
  ].map((text) => `<span>${escapeHtml(text)}</span>`).join("");
  $("shareMiniMap").innerHTML = `
    <div class="poster-qr-empty">
      <span>个人明细已隐藏</span>
      <p>老师端查看团队层面的注意力入口分布</p>
    </div>
  `;
  $("shareTopTypes").textContent = "团队副型匿名提交";

  $("shareEvidenceTitle").textContent = "为什么匿名";
  $("shareEvidenceKicker").textContent = "简要说明";
  $("shareEvidenceLine").textContent = "";
  $("shareEvidenceVisual").innerHTML = `
    <div class="poster-analysis-list">
      <p><strong>个人</strong>不公开副型排序，减少被贴标签。</p>
      <p><strong>团队</strong>只汇总整体倾向，适合复盘氛围和协作入口。</p>
      <p><strong>老师</strong>结合团队主型和访谈再做解释。</p>
    </div>
  `;
  $("shareEvidenceFoot").textContent = "匿名汇总，不展示个人明细";
  $("shareEvidenceCode").textContent = `ref ${code}`;

  $("shareNextKicker").textContent = "团队入口";
  $("shareNextTitle").textContent = "查看团队总图";
  $("shareNextLine").textContent = "";
  $("shareNextQr").innerHTML = getTeamOrGroupQrHtml(result);
  $("shareNextFoot").textContent = "团队页 / 群聊入口";
  $("shareNextCode").textContent = `ref ${code}`;
  $("shareEvidenceCard").dataset.type = 6;
  $("shareNextCard").dataset.type = 6;
}

function getGroupQrHtml(result) {
  const settings = state.siteSettings || {};
  const qr = settings.group_chat_qr_image_url || "";
  const caption = settings.group_chat_qr_caption || "扫码加入群聊";
  return qr
    ? `<div class="poster-qr-copy"><strong>进群找老师</strong><span>长按识别，继续看结果</span></div><img src="${escapeHtml(qr)}" alt="${escapeHtml(caption)}"><p>${escapeHtml(caption)}</p>`
    : `<div class="poster-qr-empty"><span>群二维码待上传</span><p>管理员后台可配置</p></div>`;
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

function groupQrFallbackHtml(code) {
  return `
    <div class="poster-qr-empty">
      <span>副型可补</span>
      <p>本次主型结果已生成，之后可加测副型把入口看得更细</p>
      <small>ref ${escapeHtml(code)}</small>
    </div>
  `;
}

function nextStepQrHtml(code, title = "继续补全") {
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
  return groupQrFallbackHtml(code);
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
    if (button) button.textContent = "已生成三张";
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
    if (button) button.textContent = "保存三张图片";
  }, 1500);
}

async function cardToShareImage(card, index, total) {
  const svg = sharePosterSvgFromCard(card, index, total);
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

function sharePosterSvgFromCard(card, index, total) {
  const type = Number(card.dataset.type || state.result?.share?.primary_type || getMainPrimary(state.result) || 6);
  const palette = posterPalette(type);
  const label = card.querySelector(".share-label")?.textContent.trim() || `0${index + 1} / 0${total}`;
  const title = card.querySelector("h3")?.textContent.trim() || "jojo测九型";
  const body = card.querySelector(".share-core > p, .share-body p")?.textContent.trim() || "";
  const chips = [...card.querySelectorAll(".share-chips span")].map((item) => item.textContent.trim()).filter(Boolean).slice(0, 3);
  const footer = card.querySelector(".share-footer > span:first-child")?.textContent.trim() || "";
  const code = card.querySelector(".hidden-code")?.textContent.trim() || "";
  const rows = posterRowsFromCard(card);
  const blocks = posterBlocksFromCard(card);
  const qr = card.querySelector(".poster-qr-block") ? posterQrSvgBlock(footer) : "";
  const isLongTitle = Array.from(title).length > 24;
  const titleSize = index === 0 ? 58 : (isLongTitle ? 45 : 52);
  const titleStep = index === 0 ? 70 : (isLongTitle ? 56 : 64);
  const titleLines = svgTextLines(title, index === 0 ? 12 : (isLongTitle ? 13 : 11), 3);
  const bodyLines = svgTextLines(body, 22, 2);
  const yAfterTitle = 242 + titleLines.length * titleStep;
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
    </style>
  </defs>
  <rect x="0" y="0" width="900" height="1200" rx="34" fill="url(#bg)"/>
  <circle cx="88" cy="75" r="18" fill="#fff" stroke="${palette.main}" stroke-width="5"/>
  <circle cx="88" cy="75" r="5" fill="${palette.main}"/>
  <text x="124" y="85" class="brand">jojo测九型</text>
  <text x="760" y="85" class="page">0${index + 1} / 0${total}</text>
  <text x="615" y="246" fill="rgba(20,33,38,.055)" font-size="190" font-weight="950">${escapeSvg(card.querySelector(".share-watermark")?.textContent.trim() || "")}</text>
  <text x="64" y="174" class="kicker">${escapeSvg(label)}</text>
  ${titleLines.map((line, lineIndex) => `<text x="64" y="${258 + lineIndex * titleStep}" class="title">${escapeSvg(line)}</text>`).join("")}
  ${bodyLines.map((line, lineIndex) => `<text x="64" y="${yAfterTitle + 20 + lineIndex * 40}" class="body">${escapeSvg(line)}</text>`).join("")}
  ${chips.map((chip, chipIndex) => {
    const x = 64 + chipIndex * 172;
    return `<rect x="${x}" y="${yAfterTitle + 92}" width="148" height="48" rx="24" fill="#fff" stroke="rgba(246,111,127,.28)"/>
  <text x="${x + 22}" y="${yAfterTitle + 124}" class="chip">${escapeSvg(chip)}</text>`;
  }).join("")}
  ${rows.length ? posterBarsSvg(rows, yAfterTitle + 210) : ""}
  ${blocks.length ? posterBlocksSvg(blocks, yAfterTitle + 165) : ""}
  ${qr || ""}
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
  const listItems = [...card.querySelectorAll(".friend-translation-list p, .usage-guide-list p, .poster-analysis-list p")];
  return listItems.map((item) => ({
    label: item.querySelector("strong")?.textContent.trim() || "",
    text: item.querySelector("span")?.textContent.trim() || item.textContent.replace(item.querySelector("strong")?.textContent || "", "").trim()
  })).filter((item) => item.label || item.text).slice(0, 4);
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
    const y = startY + index * 126;
    const textLines = svgTextLines(block.text, 21, 2);
    return `<rect x="64" y="${y}" width="772" height="96" rx="18" fill="rgba(255,255,255,.72)" stroke="rgba(20,33,38,.08)"/>
  <text x="92" y="${y + 36}" class="blockLabel">${escapeSvg(block.label)}</text>
  ${textLines.map((line, lineIndex) => `<text x="92" y="${y + 68 + lineIndex * 28}" class="blockText">${escapeSvg(line)}</text>`).join("")}`;
  }).join("");
}

function posterQrSvgBlock(footer) {
  return `<rect x="292" y="660" width="316" height="316" rx="34" fill="rgba(255,255,255,.78)" stroke="rgba(20,33,38,.1)"/>
  <rect x="348" y="718" width="204" height="156" rx="28" fill="rgba(255,255,255,.86)" stroke="rgba(20,33,38,.08)"/>
  <text x="450" y="790" text-anchor="middle" class="chip">进群入口</text>
  <text x="450" y="835" text-anchor="middle" class="muted">${escapeSvg(footer || "长按保存后继续看")}</text>`;
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
  list.innerHTML = images.map((item, index) => `
    <figure>
      <img src="${escapeHtml(item.url)}" alt="结果分享图 ${index + 1}">
      <figcaption>${escapeHtml(item.label || `${index + 1} / ${images.length}`)}</figcaption>
    </figure>
  `).join("");
  modal.hidden = false;
  showSaveToast("三张图已生成，可长按保存");
}

function closeShareImageModal() {
  $("shareImageModal").hidden = true;
  $("shareImageList").innerHTML = "";
}

function renderTeamSummary(summary) {
  if (summary.kind === "subtype") {
    renderSubtypeTeamSummary(summary);
    return;
  }
  document.querySelector("#teamScreen .eyebrow").textContent = "团队九型总图";
  $("teamSummaryTitle").textContent = summary.team.name;
  $("teamSummaryNote").textContent = summary.sample_note;
  $("teamImageLink").href = `/api/team/${encodeURIComponent(summary.team.code)}/report.svg`;
  $("teamImageLink").hidden = false;
  $("teamSummaryMeta").innerHTML = `
    <span>成员 ${summary.member_count} 人</span>
    <span>有效至 ${formatDate(summary.team.expires_at)}</span>
    <span>${summary.team.active ? "进行中" : "已过期"}</span>
  `;
  $("teamSummaryGrid").innerHTML = `
    <div class="top-type-item">
      <span>团队主导元素</span>
      <strong>${summary.dominant_elements.map((item) => `${item.element}号`).join(" / ") || "暂无"}</strong>
    </div>
    <div class="top-type-item">
      <span>团队低位元素</span>
      <strong>${summary.low_elements.map((item) => `${item.element}号`).join(" / ") || "暂无"}</strong>
    </div>
    <div class="top-type-item">
      <span>分化元素</span>
      <strong>${summary.split_elements.length ? summary.split_elements.map((item) => `${item.element}号`).join(" / ") : "暂无明显高分化"}</strong>
    </div>
  `;
  $("teamEvidenceBars").innerHTML = `
    <div class="evidence-title">团队1-9号证据条</div>
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

function renderSubtypeTeamSummary(summary) {
  document.querySelector("#teamScreen .eyebrow").textContent = "团队副型总图";
  $("teamSummaryTitle").textContent = summary.team.name;
  $("teamSummaryNote").textContent = `${summary.sample_note} 本页为匿名汇总，仅展示团队层面的注意力入口。`;
  $("teamImageLink").href = `/api/team/${encodeURIComponent(summary.team.code)}/report.svg`;
  $("teamImageLink").hidden = false;
  $("teamSummaryMeta").innerHTML = `
    <span>匿名样本 ${summary.member_count} 人</span>
    <span>有效至 ${formatDate(summary.team.expires_at)}</span>
    <span>${summary.team.active ? "进行中" : "已过期"}</span>
  `;
  $("teamSummaryGrid").innerHTML = `
    <div class="top-type-item">
      <span>主导入口</span>
      <strong>${summary.dominant_subtypes.map((item) => escapeHtml(item.label)).join(" / ") || "暂无"}</strong>
    </div>
    <div class="top-type-item">
      <span>分化入口</span>
      <strong>${summary.split_subtypes.length ? summary.split_subtypes.map((item) => escapeHtml(item.label)).join(" / ") : "暂无明显高分化"}</strong>
    </div>
    <div class="top-type-item">
      <span>匿名规则</span>
      <strong>不展示个人明细</strong>
    </div>
  `;
  const stats = Object.values(summary.subtype_stats || {});
  $("teamEvidenceBars").innerHTML = `
    <div class="evidence-title">团队副型入口均值</div>
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

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
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
