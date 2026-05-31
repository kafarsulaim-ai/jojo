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

const SUBTYPE_NAMES = {
  social: "社群型",
  one_to_one: "一对一型",
  self_preservation: "自保型"
};

const USER_IDENTITY_LABELS = {
  account: "注册用户",
  contact: "联系方式归并",
  nickname: "昵称归并",
  anonymous: "匿名记录"
};

const state = {
  account: null,
  permissions: {},
  results: [],
  selectedCode: null,
  requestId: 0,
  teachers: [],
  invites: [],
  users: [],
  selectedUserId: null,
  siteSettings: {},
  groupQrImage: "",
  teacherDashboard: null,
  teacherAvatarImage: "",
  viewedCodes: new Set()
};

const $ = (id) => document.getElementById(id);

function isSubtypeMode(mode) {
  return Boolean(mode?.startsWith("subtype") || mode === "team_subtype");
}

document.addEventListener("DOMContentLoaded", () => {
  const savedInvite = sessionStorage.getItem("jojoTeacherInviteCode") || "";
  const savedTeacherName = sessionStorage.getItem("jojoTeacherName") || "";
  if (savedInvite) $("inviteCodeInput").value = savedInvite;
  if (savedTeacherName) $("registerNameInput").value = savedTeacherName;
  $("loginForm").addEventListener("submit", handleLogin);
  $("registerForm").addEventListener("submit", handleRegister);
  $("resetForm").addEventListener("submit", handleResetPassword);
  $("showResetButton").addEventListener("click", toggleResetForm);
  $("teacherDiagnosisForm").addEventListener("submit", submitTeacherDiagnosis);
  $("teacherProfileForm").addEventListener("submit", saveTeacherProfile);
  $("teacherAvatarFileInput").addEventListener("change", onTeacherAvatarFileChange);
  $("logoutButton").addEventListener("click", handleLogout);
  $("adminEntryButton").addEventListener("click", () => switchTab("teachers"));
  $("adminQuickEntry").addEventListener("click", onAdminQuickJump);
  $("adminForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loadResults();
  });
  $("loadResultsButton").addEventListener("click", loadResults);
  $("codeSearchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadResults();
  });
  $("codeSearchInput").addEventListener("input", updateExportLink);
  $("teamFilterInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadResults();
  });
  $("teamFilterInput").addEventListener("input", updateExportLink);
  $("keywordSearchInput").addEventListener("keydown", (event) => {
    if (event.key === "Enter") loadResults();
  });
  $("keywordSearchInput").addEventListener("input", updateExportLink);
  $("modeFilterInput").addEventListener("change", () => {
    updateExportLink();
    loadResults();
  });
  $("adminTabs").addEventListener("click", onTabClick);
  $("inviteForm").addEventListener("submit", createInvite);
  $("teachersTableBody").addEventListener("click", onTeacherAction);
  $("invitesTableBody").addEventListener("click", onInviteAction);
  $("inviteOutput").addEventListener("click", onInviteAction);
  $("refreshTeachersButton").addEventListener("click", loadTeacherData);
  $("userSearchForm").addEventListener("submit", (event) => {
    event.preventDefault();
    loadUsers();
  });
  $("refreshUsersButton").addEventListener("click", loadUsers);
  $("usersList").addEventListener("click", onUserClick);
  $("siteSettingsForm").addEventListener("submit", saveSiteSettings);
  $("groupQrFileInput").addEventListener("change", onGroupQrFileChange);
  const invite = new URLSearchParams(window.location.search).get("invite");
  if (invite) $("inviteCodeInput").value = invite.toUpperCase();
  updateExportLink();
  bootAdmin();
});

async function bootAdmin() {
  try {
    window.history.replaceState(null, "", window.location.pathname === "/admin.html" ? "/admin.html" : window.location.pathname);
    const data = await adminFetch("/api/auth/me");
    if (!data?.staff?.account) throw new Error("unauthorized");
    setAccount(data.staff);
    showDashboard();
    await loadDashboardData();
  } catch {
    showAuth();
  }
}

async function adminFetch(url, options = {}) {
  const fetchOptions = {
    method: options.method || "GET",
    credentials: "same-origin",
    headers: options.body ? { "Content-Type": "application/json" } : undefined,
    body: options.body ? JSON.stringify(options.body) : undefined
  };
  const response = await fetch(url, fetchOptions);
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { error: text };
  }
  if (!response.ok) {
    if (response.status === 401 && !options.allowUnauthorized) showAuth();
    const err = new Error(data.error || "request_failed");
    err.status = response.status;
    Object.assign(err, data);
    throw err;
  }
  return data;
}

function setAccount(data) {
  state.account = data.account;
  state.permissions = data.permissions || {};
  const role = state.account.role === "super_admin" ? "管理员" : "老师";
  $("currentAccountLabel").textContent = `${state.account.name} · ${role}`;
  $("adminEntryButton").hidden = !state.permissions.can_manage_teachers;
  $("adminQuickEntry").hidden = true;
  $("teachersTab").hidden = !state.permissions.can_manage_teachers;
  $("settingsTab").hidden = !state.permissions.can_manage_teachers;
  $("usersTab").hidden = !state.permissions.can_manage_users;
  $("resultsFold").hidden = !state.permissions.can_view_results;
  $("exportLink").hidden = !state.permissions.can_view_results;
  document.querySelectorAll("[data-admin-only='true']").forEach((node) => {
    node.hidden = !state.permissions.can_manage_users;
  });
  renderTeacherProfile();
}

function showAuth() {
  state.account = null;
  state.permissions = {};
  $("authShell").hidden = false;
  $("dashboardShell").hidden = true;
  $("loginForm").hidden = false;
  if ($("inviteCodeInput").value.trim()) $("registerNameInput").focus();
  else $("loginAccountInput").focus();
}

function showDashboard() {
  $("authShell").hidden = true;
  $("dashboardShell").hidden = false;
  if (!state.permissions.can_manage_teachers && ["teachers", "settings"].includes(activeTab())) switchTab("overview");
  if (!state.permissions.can_manage_users && activeTab() === "users") switchTab("overview");
}

async function loadDashboardData() {
  await Promise.all([
    loadTeacherDashboard(),
    state.permissions.can_view_results ? loadResults() : Promise.resolve(resetResultsPanel()),
    state.permissions.can_manage_teachers ? loadTeacherData() : Promise.resolve(),
    state.permissions.can_manage_users ? loadUsers() : Promise.resolve(resetUsersPanel()),
    state.permissions.can_manage_teachers ? loadSiteSettings() : Promise.resolve()
  ]);
}

function toggleResetForm() {
  const form = $("resetForm");
  form.hidden = !form.hidden;
  if (!form.hidden) {
    $("resetAccountInput").value = $("resetAccountInput").value || $("loginAccountInput").value.trim();
    $("resetAccountInput").focus();
  }
}

async function handleLogin(event) {
  event.preventDefault();
  setMessage("loginMessage", "正在登录...");
  try {
    const data = await adminFetch("/api/admin/auth/login", {
      method: "POST",
      body: {
        login_id: $("loginAccountInput").value.trim(),
        password: $("loginPasswordInput").value
      }
    });
    setAccount(data);
    showDashboard();
    setMessage("loginMessage", "");
    await loadDashboardData();
  } catch (err) {
    setMessage("loginMessage", err.message || "登录失败");
  }
}

async function handleRegister(event) {
  event.preventDefault();
  setMessage("registerMessage", "正在开通...");
  try {
    const data = await adminFetch("/api/admin/auth/register", {
      method: "POST",
      body: {
        invite_code: $("inviteCodeInput").value.trim(),
        name: $("registerNameInput").value.trim(),
        login_id: $("registerLoginInput").value.trim(),
        password: $("registerPasswordInput").value
      }
    });
    setAccount(data);
    showDashboard();
    setMessage("registerMessage", "");
    await loadDashboardData();
  } catch (err) {
    setMessage("registerMessage", err.message || "开通失败");
  }
}

async function handleResetPassword(event) {
  event.preventDefault();
  const account = $("resetAccountInput").value.trim();
  const code = $("resetCodeInput").value.trim();
  const password = $("resetPasswordInput").value;
  setMessage("resetMessage", code ? "正在重设..." : "正在发送重置码...");
  try {
    if (!code) {
      await adminFetch("/api/admin/auth/reset/request", {
        method: "POST",
        body: { login_id: account }
      });
      setMessage("resetMessage", "重置码已发到邮箱。");
      $("resetCodeInput").focus();
      return;
    }
    const data = await adminFetch("/api/admin/auth/reset/confirm", {
      method: "POST",
      body: {
        login_id: account,
        reset_code: code,
        password
      }
    });
    setAccount(data);
    showDashboard();
    setMessage("resetMessage", "");
    await loadDashboardData();
  } catch (err) {
    setMessage("resetMessage", err.message || "找回失败");
  }
}

async function handleLogout() {
  await adminFetch("/api/admin/auth/logout", { method: "POST" }).catch(() => {});
  state.results = [];
  state.teachers = [];
  state.invites = [];
  state.users = [];
  state.teacherDashboard = null;
  showAuth();
}

function setMessage(id, text) {
  const element = $(id);
  if (element) element.textContent = text || "";
}

async function loadTeacherDashboard() {
  if (!state.account) return;
  try {
    const data = await adminFetch("/api/admin/dashboard");
    state.teacherDashboard = data;
    if (data.profile) {
      state.account = { ...state.account, ...data.profile };
      renderTeacherProfile();
    }
    renderTeacherDashboard(data);
  } catch {
    renderTeacherDashboard(null);
  }
}

function renderTeacherDashboard(data) {
  const stats = data?.stats || {};
  $("teacherStatsRow").innerHTML = `
    <div><span>诊断</span><strong>${escapeHtml(stats.diagnosis_count ?? 0)}</strong></div>
    <div><span>用户</span><strong>${escapeHtml(stats.diagnosed_people_count ?? 0)}</strong></div>
    <div><span>查看</span><strong>${escapeHtml(stats.view_count ?? 0)}</strong></div>
  `;
  const views = data?.recent_views || [];
  const diagnoses = data?.recent_diagnoses || [];
  const items = views.length ? views : diagnoses;
  if (!items.length) {
    $("teacherRecentTableBody").innerHTML = `<tr><td colspan="4">暂无查看记录</td></tr>`;
    return;
  }
  $("teacherRecentTableBody").innerHTML = items.map((item) => `
    <tr>
      <td>${escapeHtml(formatDateTime(item.viewed_at || item.created_at))}</td>
      <td>
        <strong class="table-main-text">${escapeHtml(item.note_name || item.user_nickname || item.diagnosis_nickname || "未填写")}</strong>
        <small>${escapeHtml(item.verification_code || "")}</small>
      </td>
      <td>${escapeHtml(modeText(item.test_mode))}</td>
      <td>${escapeHtml(compactNoteText(item) || formatDateTime(item.test_time))}</td>
    </tr>
  `).join("");
}

function renderTeacherProfile() {
  if (!state.account) return;
  const avatar = state.teacherAvatarImage || state.account.avatar_url || "/jojo-icon.svg";
  $("teacherAvatarPreview").innerHTML = `<img src="${escapeHtml(avatar)}" alt="">`;
  $("teacherProfileName").textContent = state.account.name || "老师";
  $("teacherNameInput").value = state.account.name || "";
  $("teacherBioInput").value = state.account.bio || "";
}

function onTeacherAvatarFileChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    setMessage("teacherProfileMessage", "请选择图片文件");
    return;
  }
  if (file.size > 1_300_000) {
    setMessage("teacherProfileMessage", "图片请控制在1.3MB以内");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const image = String(reader.result || "");
    if (!imageSourceAllowed(image, "teacherProfileMessage")) return;
    state.teacherAvatarImage = image;
    renderTeacherProfile();
    setMessage("teacherProfileMessage", "");
  };
  reader.readAsDataURL(file);
}

async function saveTeacherProfile(event) {
  event.preventDefault();
  setMessage("teacherProfileMessage", "正在保存...");
  try {
    const data = await adminFetch("/api/admin/profile", {
      method: "POST",
      body: {
        avatar_url: state.teacherAvatarImage || state.account?.avatar_url || "",
        name: $("teacherNameInput").value.trim(),
        bio: $("teacherBioInput").value.trim()
      }
    });
    state.account = data.account || state.account;
    state.teacherAvatarImage = "";
    renderTeacherProfile();
    setMessage("teacherProfileMessage", "已保存");
  } catch (err) {
    setMessage("teacherProfileMessage", err.message || "保存失败");
  }
}

async function submitTeacherDiagnosis(event) {
  event.preventDefault();
  const nickname = $("diagnosisNicknameInput").value.trim();
  const code = $("diagnosisCodeInput").value.trim().toUpperCase();
  if (!nickname || !code) {
    setMessage("diagnosisMessage", "请填写用户昵称和测试编号");
    return;
  }
  setMessage("diagnosisMessage", "正在查询...");
  try {
    const data = await adminFetch("/api/admin/activity/diagnose", {
      method: "POST",
      body: {
        user_nickname: nickname,
        verification_code: code
      }
    });
    setMessage("diagnosisMessage", "已记录，本次结果已打开");
    $("codeSearchInput").value = code;
    updateExportLink();
    if (data.result) {
      state.results = [data.result];
      renderQualitySummary({ total: 1, flagged: data.result.quality_flags?.length ? 1 : 0, modes: [], top_flags: [] });
      renderList();
      if (data.record) data.result.teacher_note = data.record;
      renderDetail(data.result, "teacherDiagnosisDetail");
    } else {
      await loadResults();
    }
    await loadTeacherDashboard();
  } catch (err) {
    setMessage("diagnosisMessage", err.status === 404 ? "没有查到这个测试编号" : (err.message || "查询失败"));
  }
}

async function saveTeacherResultNote(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const code = form.dataset.code || "";
  const button = form.querySelector("button[type='submit']");
  const status = form.querySelector("[data-note-status]");
  if (!code) return;
  if (button) button.disabled = true;
  if (status) status.textContent = "正在保存...";
  try {
    const data = await adminFetch("/api/admin/activity/note", {
      method: "POST",
      body: {
        verification_code: code,
        note_name: form.elements.note_name?.value.trim() || "",
        note_summary: form.elements.note_summary?.value.trim() || "",
        note_followup: form.elements.note_followup?.value.trim() || "",
        diagnosis_nickname: $("diagnosisNicknameInput")?.value.trim() || ""
      }
    });
    const item = state.results.find((result) => result.verification_code === code);
    if (item) item.teacher_note = data.note;
    if (status) status.textContent = "已保存";
    await loadTeacherDashboard();
  } catch (err) {
    if (status) status.textContent = err.status === 403 ? "请先通过昵称和编号打开结果" : (err.message || "保存失败");
  } finally {
    if (button) button.disabled = false;
  }
}

function onTabClick(event) {
  const button = event.target.closest("button[data-tab]");
  if (!button || button.hidden) return;
  switchTab(button.dataset.tab);
}

function onAdminQuickJump(event) {
  const button = event.target.closest("button[data-admin-jump]");
  if (!button) return;
  switchTab(button.dataset.adminJump);
}

function activeTab() {
  return document.querySelector(".admin-tabs button.active")?.dataset.tab || "overview";
}

function switchTab(tab) {
  if (["teachers", "settings"].includes(tab) && !state.permissions.can_manage_teachers) tab = "overview";
  if (tab === "users" && !state.permissions.can_manage_users) tab = "overview";
  document.querySelectorAll(".admin-tabs button[data-tab]").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tab);
  });
  document.querySelectorAll(".admin-panel[data-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === tab);
  });
  if (tab === "teachers" && !state.teachers.length) loadTeacherData();
  if (tab === "users" && !state.users.length) loadUsers();
  if (tab === "settings") loadSiteSettings();
}

function resetResultsPanel() {
  $("resultsList").innerHTML = "";
  $("resultDetail").innerHTML = `<p class="muted">输入用户昵称和测试编号后查看。</p>`;
  $("teacherDiagnosisDetail").innerHTML = `<p class="muted">输入用户昵称和测试编号后查看。</p>`;
  renderQualitySummary({ total: 0, flagged: 0, modes: [], top_flags: [] });
}

function resetUsersPanel() {
  $("usersList").innerHTML = "";
  $("userDetail").innerHTML = `<p class="muted">管理员可查看用户列表。</p>`;
}

async function loadSiteSettings() {
  if (!state.permissions.can_manage_teachers) return;
  try {
    const data = await adminFetch("/api/admin/site-settings");
    state.siteSettings = data.settings || {};
    state.groupQrImage = state.siteSettings.group_chat_qr_image_url || "";
    $("groupQrCaptionInput").value = state.siteSettings.group_chat_qr_caption || "扫码加入群聊";
    renderGroupQrPreview();
  } catch (err) {
    setMessage("siteSettingsMessage", err.message || "设置加载失败");
  }
}

function onGroupQrFileChange(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    setMessage("siteSettingsMessage", "请选择图片文件");
    return;
  }
  if (file.size > 1_300_000) {
    setMessage("siteSettingsMessage", "图片请控制在1.3MB以内");
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    const image = String(reader.result || "");
    if (!imageSourceAllowed(image, "siteSettingsMessage")) return;
    state.groupQrImage = image;
    renderGroupQrPreview();
    setMessage("siteSettingsMessage", "");
  };
  reader.readAsDataURL(file);
}

function imageSourceAllowed(image, messageId) {
  if (!image.startsWith("data:image/")) {
    setMessage(messageId, "图片读取失败，请换一张");
    return false;
  }
  if (image.length > 1_900_000) {
    setMessage(messageId, "图片过大，请压缩后再上传");
    return false;
  }
  return true;
}

function renderGroupQrPreview() {
  const image = state.groupQrImage || "";
  $("groupQrPreview").innerHTML = image
    ? `<img src="${escapeHtml(image)}" alt="微信群聊二维码预览">`
    : `<span>还没有二维码</span>`;
}

async function saveSiteSettings(event) {
  event.preventDefault();
  setMessage("siteSettingsMessage", "正在保存...");
  try {
    const data = await adminFetch("/api/admin/site-settings", {
      method: "POST",
      body: {
        group_chat_qr_image_url: state.groupQrImage,
        group_chat_qr_caption: $("groupQrCaptionInput").value.trim() || "扫码加入群聊"
      }
    });
    state.siteSettings = data.settings || {};
    state.groupQrImage = state.siteSettings.group_chat_qr_image_url || "";
    renderGroupQrPreview();
    setMessage("siteSettingsMessage", "已保存");
  } catch (err) {
    setMessage("siteSettingsMessage", err.message || "保存失败");
  }
}

async function loadResults() {
  if (!state.permissions.can_view_results) {
    resetResultsPanel();
    return;
  }
  const requestId = ++state.requestId;
  const code = $("codeSearchInput").value.trim().toUpperCase();
  const mode = $("modeFilterInput").value;
  const team = $("teamFilterInput").value.trim().toUpperCase();
  const keyword = $("keywordSearchInput").value.trim();
  updateExportLink();

  const params = new URLSearchParams();
  if (code) params.set("code", code);
  if (mode) params.set("mode", mode);
  if (team) params.set("team", team);
  if (keyword) params.set("keyword", keyword);

  $("resultsList").innerHTML = `<div class="result-list-item"><span>正在查询</span></div>`;
  $("resultDetail").innerHTML = `<p class="muted">正在查询匹配记录...</p>`;
  try {
    const data = await adminFetch(`/api/admin/results?${params.toString()}`);
    if (requestId !== state.requestId) return;
    state.results = data.results || [];
    renderQualitySummary(data.quality);
    renderList();
    const exactMatch = code ? state.results.find((item) => item.verification_code === code) : null;
    const previousSelection = state.selectedCode ? state.results.find((item) => item.verification_code === state.selectedCode) : null;
    renderDetail(exactMatch || previousSelection || state.results[0]);
    if (code) {
      adminTrackEvent("admin_code_lookup", {
        has_result: state.results.length > 0,
        result_count: state.results.length,
        mode,
        team_present: Boolean(team)
      });
    }
  } catch (err) {
    if (requestId !== state.requestId) return;
    $("resultsList").innerHTML = `<div class="result-list-item"><strong>查询失败</strong><span>${escapeHtml(err.message || "请稍后重试")}</span></div>`;
    $("resultDetail").innerHTML = `<p class="muted">没有可展示的数据。</p>`;
  }
}

function updateExportLink() {
  const params = new URLSearchParams();
  if ($("codeSearchInput")?.value.trim()) params.set("code", $("codeSearchInput").value.trim().toUpperCase());
  if ($("modeFilterInput")?.value) params.set("mode", $("modeFilterInput").value);
  if ($("teamFilterInput")?.value.trim()) params.set("team", $("teamFilterInput").value.trim().toUpperCase());
  if ($("keywordSearchInput")?.value.trim()) params.set("keyword", $("keywordSearchInput").value.trim());
  const suffix = params.toString();
  $("exportLink").href = suffix ? `/api/admin/export.csv?${suffix}` : "/api/admin/export.csv";
}

function renderList() {
  if (!state.results.length) {
    $("resultsList").innerHTML = `<div class="result-list-item"><strong>暂无记录</strong><span>请确认地图编号</span></div>`;
    $("resultDetail").innerHTML = `<p class="muted">没有查到匹配结果。</p>`;
    return;
  }
  $("resultsList").innerHTML = state.results.map((item) => {
    const primary = primaryLabel(item);
    const nickname = item.user?.nickname || "未填写昵称";
    return `
      <button class="result-list-item ${item.verification_code === state.selectedCode ? "active" : ""}" type="button" data-code="${escapeHtml(item.verification_code)}">
        <strong>${escapeHtml(item.verification_code)} · ${escapeHtml(primary)}</strong>
        <span>${escapeHtml(nickname)} · ${escapeHtml(modeLabel(item))} · ${formatDate(item.created_at)}</span>
      </button>
    `;
  }).join("");
  document.querySelectorAll(".result-list-item[data-code]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = state.results.find((result) => result.verification_code === button.dataset.code);
      renderDetail(item);
    });
  });
}

function renderQualitySummary(summary) {
  const panel = $("qualityPanel");
  if (!panel) return;
  const data = summary || { total: 0, flagged: 0, modes: [], top_flags: [] };
  const flaggedRate = data.total ? Math.round((data.flagged / data.total) * 100) : 0;
  const main90 = (data.modes || []).find((item) => item.mode === "main90");
  const main180 = (data.modes || []).find((item) => item.mode === "main180" || item.mode === "main270");
  const stability = [
    main90 ? `90题接近 ${Math.round(main90.close_top_rate || 0)}%` : "",
    main180 ? `180题接近 ${Math.round(main180.close_top_rate || 0)}%` : ""
  ].filter(Boolean).join(" · ") || "等待样本";
  const topFlags = (data.top_flags || []).map((item) => `${flagLabel(item.flag)} ${item.count}`).join(" / ") || "暂无高频标记";
  panel.innerHTML = `
    <div class="quality-card"><span>样本</span><strong>${escapeHtml(data.total || 0)}</strong><small>筛选内</small></div>
    <div class="quality-card"><span>质量标记</span><strong>${escapeHtml(flaggedRate)}%</strong><small>${escapeHtml(topFlags)}</small></div>
    <div class="quality-card"><span>稳定性</span><strong>${escapeHtml(stability)}</strong><small>前三接近需复核</small></div>
  `;
}

function flagLabel(flag) {
  return {
    straight_line_risk: "连续同选",
    uncertainty_risk: "不确定多",
    moderate_uncertainty_risk: "不确定略多",
    over_agree_risk: "认同偏高",
    soft_agree_risk: "轻认同偏高",
    over_deny_risk: "否认偏高",
    low_variance_risk: "波动低",
    close_top_three_risk: "前三接近",
    virtue_bias_risk: "美德化",
    competence_persona_risk: "能力角色",
    prosocial_persona_risk: "友好角色",
    reverse_consistency_risk: "正反差异",
    scenario_mismatch_risk: "情境差异",
    close_subtype_risk: "副型接近"
  }[flag] || flag;
}

function adminTrackEvent(event, properties = {}) {
  fetch("/api/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      event,
      path: window.location.pathname || "/admin.html",
      mode: $("modeFilterInput").value || "admin",
      session_id: "admin",
      analytics_session: "admin",
      device_token: "admin",
      client_ts: new Date().toISOString(),
      properties
    }),
    keepalive: true
  }).catch(() => {});
}

async function loadTeacherData() {
  if (!state.permissions.can_manage_teachers) return;
  try {
    const [teachersData, invitesData] = await Promise.all([
      adminFetch("/api/admin/teachers"),
      adminFetch("/api/admin/invites")
    ]);
    state.teachers = teachersData.teachers || [];
    state.invites = invitesData.invites || [];
    renderTeachers();
    renderInvites();
  } catch (err) {
    $("teachersTableBody").innerHTML = `<tr><td colspan="6">${escapeHtml(err.message || "加载失败")}</td></tr>`;
    $("invitesTableBody").innerHTML = `<tr><td colspan="6">${escapeHtml(err.message || "加载失败")}</td></tr>`;
  }
}

async function createInvite(event) {
  event.preventDefault();
  setMessage("inviteMessage", "正在生成...");
  try {
    const data = await adminFetch("/api/admin/invites", {
      method: "POST",
      body: {
        role: "teacher",
        note: $("inviteNoteInput").value.trim(),
        expires_in_days: Number($("inviteDaysInput").value || 30)
      }
    });
    const invite = data.invite;
    const url = new URL(invite.join_url, window.location.origin).href;
    $("inviteOutput").innerHTML = `
      <strong>${escapeHtml(invite.code)}</strong>
      <small>${escapeHtml(url)}</small>
      <button class="ghost-action compact" type="button" data-copy="${escapeHtml(url)}">复制邀请链接</button>
    `;
    setMessage("inviteMessage", "已生成，可复制给老师。");
    $("inviteNoteInput").value = "";
    await loadTeacherData();
  } catch (err) {
    setMessage("inviteMessage", err.message || "生成失败");
  }
}

function renderTeachers() {
  if (!state.teachers.length) {
    $("teachersTableBody").innerHTML = `<tr><td colspan="6">暂无老师账号</td></tr>`;
    return;
  }
  $("teachersTableBody").innerHTML = state.teachers.map((teacher) => {
    const isSelf = teacher.id === state.account?.id;
    const canOperate = teacher.role !== "super_admin" || isSelf;
    const canPromote = state.account?.role === "super_admin" && teacher.id !== state.account?.id;
    const statusAction = teacher.status === "disabled" ? "启用" : "禁用";
    const roleAction = teacher.role === "super_admin" ? "取消管理员" : "设为管理员";
    return `
      <tr>
        <td><strong>${escapeHtml(teacher.name)}</strong>${isSelf ? `<small>当前账号</small>` : ""}</td>
        <td>${roleLabel(teacher.role)}</td>
        <td>${statusLabel(teacher.status)}</td>
        <td>${escapeHtml(teacher.invite_count || 0)}</td>
        <td>${teacher.last_login_at ? formatDate(teacher.last_login_at) : "-"}</td>
        <td>
          ${canPromote ? `<button class="ghost-link table-action" type="button" data-teacher="${escapeHtml(teacher.id)}" data-action="role">${roleAction}</button>` : ""}
          ${canOperate && !isSelf ? `<button class="ghost-link table-action" type="button" data-teacher="${escapeHtml(teacher.id)}" data-action="status">${statusAction}</button>` : ""}
          ${canOperate ? `<button class="ghost-link table-action" type="button" data-teacher="${escapeHtml(teacher.id)}" data-action="password">改密</button>` : ""}
          ${canOperate && !isSelf ? `<button class="ghost-link table-action" type="button" data-teacher="${escapeHtml(teacher.id)}" data-action="remove">移除</button>` : ""}
        </td>
      </tr>
    `;
  }).join("");
}

function renderInvites() {
  if (!state.invites.length) {
    $("invitesTableBody").innerHTML = `<tr><td colspan="6">暂无邀请码</td></tr>`;
    return;
  }
  $("invitesTableBody").innerHTML = state.invites.map((invite) => {
    const url = new URL(invite.join_url, window.location.origin).href;
    return `
      <tr>
        <td><strong>${escapeHtml(invite.code)}</strong></td>
        <td>${inviteStatusLabel(invite)}</td>
        <td>${escapeHtml(invite.note || "-")}</td>
        <td>${formatDate(invite.expires_at)}</td>
        <td>${escapeHtml(invite.use_count || 0)} / ${escapeHtml(invite.max_uses || 1)}</td>
        <td><button class="ghost-link table-action" type="button" data-copy="${escapeHtml(url)}">复制链接</button></td>
      </tr>
    `;
  }).join("");
}

async function onTeacherAction(event) {
  const button = event.target.closest("button[data-teacher]");
  if (!button) return;
  const id = button.dataset.teacher;
  const action = button.dataset.action;
  const teacher = state.teachers.find((item) => item.id === id);
  if (!teacher) return;
  const body = {};
  if (action === "status") {
    body.status = teacher.status === "disabled" ? "active" : "disabled";
  }
  if (action === "role") {
    body.role = teacher.role === "super_admin" ? "teacher" : "super_admin";
  }
  if (action === "password") {
    const password = window.prompt(`为 ${teacher.name} 设置新密码，至少6位`);
    if (!password) return;
    body.password = password;
  }
  if (action === "remove") {
    if (!window.confirm(`确定要移除 ${teacher.name} 吗？`)) return;
    try {
      await adminFetch(`/api/admin/teachers/${encodeURIComponent(id)}`, { method: "DELETE" });
      await loadTeacherData();
      setMessage("inviteMessage", "已移除");
    } catch (err) {
      setMessage("inviteMessage", err.message || "操作失败");
    }
    return;
  }
  try {
    await adminFetch(`/api/admin/teachers/${encodeURIComponent(id)}`, { method: "PATCH", body });
    await loadTeacherData();
    setMessage("inviteMessage", "已更新");
  } catch (err) {
    setMessage("inviteMessage", err.message || "操作失败");
  }
}

function onInviteAction(event) {
  const button = event.target.closest("button[data-copy]");
  if (!button) return;
  navigator.clipboard?.writeText(button.dataset.copy).then(() => {
    const old = button.textContent;
    button.textContent = "已复制";
    window.setTimeout(() => {
      button.textContent = old;
    }, 1200);
  });
}

async function loadUsers() {
  if (!state.permissions.can_manage_users) {
    resetUsersPanel();
    return;
  }
  const keyword = $("userKeywordInput").value.trim();
  const params = new URLSearchParams();
  if (keyword) params.set("keyword", keyword);
  $("usersList").innerHTML = `<div class="result-list-item"><span>正在加载用户</span></div>`;
  try {
    const data = await adminFetch(`/api/admin/users?${params.toString()}`);
    state.users = data.users || [];
    renderUsers();
    if (state.users.length) {
      const selected = state.users.find((item) => item.id === state.selectedUserId) || state.users[0];
      loadUserDetail(selected.id);
    } else {
    $("userDetail").innerHTML = `<p class="muted">暂无用户。</p>`;
    }
  } catch (err) {
    $("usersList").innerHTML = `<div class="result-list-item"><strong>加载失败</strong><span>${escapeHtml(err.message || "")}</span></div>`;
  }
}

function renderUsers() {
  if (!state.users.length) {
    $("usersList").innerHTML = `<div class="result-list-item"><strong>暂无用户</strong><span>换个关键词试试。</span></div>`;
    return;
  }
  $("usersList").innerHTML = state.users.map((user) => `
    <button class="result-list-item ${user.id === state.selectedUserId ? "active" : ""}" type="button" data-user="${escapeHtml(user.id)}">
      <strong>${escapeHtml(user.name)} · ${escapeHtml(user.result_count || 0)}次</strong>
      <span>${escapeHtml(user.contact || "未留联系方式")} · ${escapeHtml(user.last_result_code || "暂无编号")}</span>
    </button>
  `).join("");
}

function onUserClick(event) {
  const button = event.target.closest("button[data-user]");
  if (!button) return;
  loadUserDetail(button.dataset.user);
}

async function loadUserDetail(id) {
  if (!state.permissions.can_manage_users) {
    resetUsersPanel();
    return;
  }
  state.selectedUserId = id;
  renderUsers();
  $("userDetail").innerHTML = `<p class="muted">正在加载用户记录...</p>`;
  try {
    const data = await adminFetch(`/api/admin/users/${encodeURIComponent(id)}`);
    const results = data.results || [];
    const identityLabel = USER_IDENTITY_LABELS[data.user?.identity_kind] || "测试用户";
    $("userDetail").innerHTML = `
      <div class="detail-header">
        <div>
          <h2>${escapeHtml(data.user?.name || "测试用户")}</h2>
          <p class="muted">${identityLabel} · 注册 ${formatDate(data.user?.created_at)}</p>
        </div>
      </div>
      <div class="detail-grid">
        <div class="detail-cell"><span>联系方式</span><strong>${escapeHtml(data.user?.contact || "未留")}</strong></div>
        <div class="detail-cell"><span>用户ID</span><strong>${escapeHtml(data.user?.id || "-")}</strong></div>
        <div class="detail-cell"><span>测试次数</span><strong>${escapeHtml(results.length || 0)}</strong></div>
        <div class="detail-cell"><span>最近更新</span><strong>${data.user?.updated_at ? formatDate(data.user.updated_at) : "-"}</strong></div>
      </div>
      <table class="data-table">
        <thead><tr><th>编号</th><th>测试</th><th>结果</th><th>团队</th><th>时间</th></tr></thead>
        <tbody>
          ${results.map((item) => `
            <tr>
              <td>${escapeHtml(item.verification_code)}</td>
              <td>${escapeHtml(item.mode_label || item.test_mode || "-")}</td>
              <td>${escapeHtml(item.title || item.primary_type || "-")}</td>
              <td>${escapeHtml(item.team?.name || "-")}</td>
              <td>${formatDate(item.created_at)}</td>
            </tr>
          `).join("") || `<tr><td colspan="5">暂无测试记录</td></tr>`}
        </tbody>
      </table>
    `;
  } catch (err) {
    $("userDetail").innerHTML = `<p class="muted">${escapeHtml(err.message || "加载失败")}</p>`;
  }
}

function renderDetail(item, targetId = "resultDetail") {
  if (!item) return;
  state.selectedCode = item.verification_code;
  if (isSubtypeMode(item.test_mode)) {
    renderSubtypeDetail(item, targetId);
    return;
  }
  const top = item.top_types || [];
  const flags = item.quality_flags || [];
  const scores = [1,2,3,4,5,6,7,8,9].map((element) => item.scores?.[element] || item.scores?.[String(element)] || { element });
  $(targetId).innerHTML = `
    <div class="detail-header">
      <div>
        <h2>${escapeHtml(item.verification_code)}</h2>
        <p class="muted">${escapeHtml(formatDate(item.created_at))}</p>
      </div>
      <button class="ghost-action compact" type="button" data-copy-json="true">复制JSON</button>
    </div>
    ${teacherNotePanel(item, targetId)}
    <div class="detail-grid">
      <div class="detail-cell"><span>昵称</span><strong>${escapeHtml(item.user?.nickname || "未填写")}</strong></div>
      <div class="detail-cell"><span>联系方式</span><strong>${escapeHtml(item.user?.contact || "未填写")}</strong></div>
      <div class="detail-cell"><span>测试模式</span><strong>${escapeHtml(modeLabel(item))}</strong></div>
      <div class="detail-cell"><span>前三元素</span><strong>${escapeHtml(top.map((x) => `${x.element}号`).join(" / ") || "-")}</strong></div>
      <div class="detail-cell"><span>团队</span><strong>${escapeHtml(item.team?.name || "未加入")}</strong></div>
      <div class="detail-cell"><span>质量标记</span><strong>${escapeHtml(flags.length ? flags.length : "无")}</strong></div>
      <div class="detail-cell"><span>答题数</span><strong>${escapeHtml(item.answers?.length || 0)}</strong></div>
    </div>
    <p class="muted">${escapeHtml(flags.join(" / ") || "本次无明显作答质量风险标记。")}</p>
    <table class="data-table">
      <thead><tr><th>元素</th><th>名称</th><th>主分</th><th>百分比</th><th>是</th><th>不确定</th><th>否</th><th>防御均分</th><th>正向均分</th><th>反向均分</th><th>情境均分</th></tr></thead>
      <tbody>
        ${scores.map((score) => `
          <tr>
            <td>${score.element}</td>
            <td>${escapeHtml(TYPE_NAMES[score.element] || "")}</td>
            <td>${cell(score.type_score)}</td>
            <td>${cell(score.type_percent)}%</td>
            <td>${cell(score.yes)}</td>
            <td>${cell(score.uncertain)}</td>
            <td>${cell(score.no)}</td>
            <td>${cell(score.defense_score)}</td>
            <td>${cell(score.direct_average)}</td>
            <td>${cell(score.reverse_average)}</td>
            <td>${cell(score.scenario_average)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <table class="data-table">
      <thead><tr><th>题号</th><th>元素</th><th>题型</th><th>维度</th><th>原始分</th><th>计分后</th></tr></thead>
      <tbody>
        ${(item.answers || []).map((answer) => `
          <tr>
            <td>${escapeHtml(answer.question_id)}</td>
            <td>${escapeHtml(answer.element)}</td>
            <td>${escapeHtml(answer.form)}</td>
            <td>${escapeHtml(answer.dimension)}</td>
            <td>${escapeHtml(answer.raw_answer)}</td>
            <td>${escapeHtml(answer.scored_value)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  $(targetId).querySelector("[data-copy-json='true']")?.addEventListener("click", (event) => copyJson(item, event.currentTarget));
  bindTeacherNoteForm(targetId);
  recordResultView(item.verification_code);
  if (targetId === "resultDetail") renderList();
}

function renderSubtypeDetail(item, targetId = "resultDetail") {
  if (item?.anonymous || item?.team?.test_kind === "subtype" || item?.test_mode === "team_subtype") {
    renderAnonymousTeamSubtypeDetail(item, targetId);
    return;
  }
  const flags = item.quality_flags || [];
  const ranked = item.subtype_ranked || Object.values(item.subtype_scores || {}).sort((a, b) => b.percent - a.percent);
  $(targetId).innerHTML = `
    <div class="detail-header">
      <div>
        <h2>${escapeHtml(item.verification_code)}</h2>
        <p class="muted">${escapeHtml(formatDate(item.created_at))}</p>
      </div>
      <button class="ghost-action compact" type="button" data-copy-json="true">复制JSON</button>
    </div>
    ${teacherNotePanel(item, targetId)}
    <div class="detail-grid">
      <div class="detail-cell"><span>昵称</span><strong>${escapeHtml(item.user?.nickname || "未填写")}</strong></div>
      <div class="detail-cell"><span>联系方式</span><strong>${escapeHtml(item.user?.contact || "未填写")}</strong></div>
      <div class="detail-cell"><span>测试模式</span><strong>${escapeHtml(modeLabel(item))}</strong></div>
      <div class="detail-cell"><span>副型排序</span><strong>${escapeHtml(ranked.map((x) => SUBTYPE_NAMES[x.key] || x.label || x.key).join(" / ") || "-")}</strong></div>
      <div class="detail-cell"><span>置信提示</span><strong>${escapeHtml(item.subtype_confidence || "-")}</strong></div>
      <div class="detail-cell"><span>答题数</span><strong>${escapeHtml(item.answers?.length || 0)}</strong></div>
    </div>
    <p class="muted">${escapeHtml(flags.join(" / ") || "本次无明显作答质量风险标记。")}</p>
    <table class="data-table">
      <thead><tr><th>副型</th><th>百分比</th><th>原始均分</th><th>答题数</th></tr></thead>
      <tbody>
        ${ranked.map((score) => `
          <tr>
            <td>${escapeHtml(SUBTYPE_NAMES[score.key] || score.label || score.key)}</td>
            <td>${cell(score.percent)}%</td>
            <td>${cell(score.raw_average)}</td>
            <td>${cell(score.count)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <table class="data-table">
      <thead><tr><th>题号</th><th>副型柱</th><th>原始分</th></tr></thead>
      <tbody>
        ${(item.answers || []).map((answer) => `
          <tr>
            <td>${escapeHtml(answer.question_id)}</td>
            <td>${escapeHtml(SUBTYPE_NAMES[answer.column] || answer.column)}</td>
            <td>${escapeHtml(answer.raw_answer)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
  $(targetId).querySelector("[data-copy-json='true']")?.addEventListener("click", (event) => copyJson(item, event.currentTarget));
  bindTeacherNoteForm(targetId);
  recordResultView(item.verification_code);
  if (targetId === "resultDetail") renderList();
}

function renderAnonymousTeamSubtypeDetail(item, targetId = "resultDetail") {
  state.selectedCode = item.verification_code;
  $(targetId).innerHTML = `
    <div class="detail-header">
      <div>
        <h2>${escapeHtml(item.verification_code)}</h2>
        <p class="muted">${escapeHtml(formatDate(item.created_at))}</p>
      </div>
    </div>
    ${teacherNotePanel(item, targetId)}
    <div class="detail-grid">
      <div class="detail-cell"><span>测试模式</span><strong>团队副型</strong></div>
      <div class="detail-cell"><span>团队</span><strong>${escapeHtml(item.team?.name || "团队")}</strong></div>
      <div class="detail-cell"><span>隐私</span><strong>匿名汇总</strong></div>
    </div>
    <p class="muted">团队副型不展示个人副型排序，只进入团队层面的汇总。</p>
  `;
  bindTeacherNoteForm(targetId);
  recordResultView(item.verification_code);
  if (targetId === "resultDetail") renderList();
}

function teacherNotePanel(item, targetId) {
  if (targetId !== "teacherDiagnosisDetail") return "";
  const note = item.teacher_note || {};
  return `
    <form class="teacher-note-panel" data-teacher-note-form data-code="${escapeHtml(item.verification_code || "")}">
      <div class="teacher-note-head">
        <strong>老师备注</strong>
        <span>${escapeHtml(note.note_updated_at ? `更新 ${formatDateTime(note.note_updated_at)}` : "")}</span>
      </div>
      <div class="teacher-note-grid">
        <label>
          <span>备注姓名</span>
          <input name="note_name" maxlength="60" value="${escapeHtml(note.note_name || item.user?.nickname || "")}" placeholder="方便以后认人">
        </label>
        <label>
          <span>下次跟进点</span>
          <input name="note_followup" maxlength="180" value="${escapeHtml(note.note_followup || "")}" placeholder="下次重点聊什么">
        </label>
      </div>
      <label>
        <span>沟通主要内容</span>
        <textarea name="note_summary" maxlength="300" rows="3" placeholder="记录本次沟通重点、用户关心的问题、老师判断方向">${escapeHtml(note.note_summary || "")}</textarea>
      </label>
      <div class="teacher-note-actions">
        <button class="ghost-action compact" type="submit">保存备注</button>
        <p class="muted" data-note-status></p>
      </div>
    </form>
  `;
}

function bindTeacherNoteForm(targetId) {
  const form = $(targetId)?.querySelector("[data-teacher-note-form]");
  if (form) form.addEventListener("submit", saveTeacherResultNote);
}

function recordResultView(code) {
  if (!code || !state.account) return;
  if (state.viewedCodes.has(code)) return;
  state.viewedCodes.add(code);
  adminFetch("/api/admin/activity/view", {
    method: "POST",
    body: { verification_code: code }
  })
    .then(() => loadTeacherDashboard())
    .catch(() => {});
}

function primaryLabel(item) {
  if (isSubtypeMode(item.test_mode)) {
    return SUBTYPE_NAMES[item.share?.primary_type] || item.share?.title || "副型结果";
  }
  const primary = item.share?.primary_type || item.top_types?.[0]?.element || "";
  return primary ? `${primary}号` : "-";
}

function modeLabel(item) {
  const labels = {
    main90: "主型90题",
    main180: "主型180题",
    main270: "主型180题",
    subtype_adult: "成人副型",
    subtype_child: "少儿副型",
    team_subtype: "团队副型"
  };
  return labels[item.test_mode] || item.mode_label || item.test_mode || "主型90题";
}

function roleLabel(role) {
  return role === "super_admin" ? "管理员" : "老师";
}

function statusLabel(status) {
  return status === "disabled" ? "停用" : "正常";
}

function inviteStatusLabel(invite) {
  if (invite.status === "used") return "已使用";
  if (invite.status === "revoked") return "已撤销";
  if (invite.expires_at && Date.now() > Date.parse(invite.expires_at)) return "已过期";
  return "可注册";
}

function formatDateTime(value) {
  if (!value) return "-";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch {
    return value || "-";
  }
}

function compactNoteText(item) {
  const text = [item.note_summary, item.note_followup].filter(Boolean).join(" / ");
  if (!text) return "";
  return Array.from(text).slice(0, 34).join("") + (Array.from(text).length > 34 ? "..." : "");
}

function modeText(mode) {
  const labels = {
    main90: "主型90题",
    main180: "主型180题",
    main270: "主型180题",
    subtype_adult: "成人副型",
    subtype_child: "少儿副型",
    team_subtype: "团队副型"
  };
  return labels[mode] || mode || "-";
}

function copyJson(item, button) {
  navigator.clipboard?.writeText(JSON.stringify(item, null, 2)).then(() => {
    if (!button) return;
    button.textContent = "已复制";
    window.setTimeout(() => {
      button.textContent = "复制JSON";
    }, 1200);
  });
}

function formatDate(value) {
  if (!value) return "";
  try {
    return new Intl.DateTimeFormat("zh-CN", {
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    }).format(new Date(value));
  } catch {
    return value;
  }
}

function cell(value) {
  return value == null || value === "" ? "-" : escapeHtml(value);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
