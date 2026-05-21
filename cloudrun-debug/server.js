const http = require("http");
const crypto = require("crypto");

const PORT = Number(process.env.PORT || 80);
const APPID = process.env.WECHAT_CLOUDRUN_APPID || process.env.WECHAT_APPID || "wx94f032f804cbd5a6";
const ENVID = process.env.WECHAT_CLOUDRUN_ENVID || process.env.WECHAT_ENV_ID || "prod-d3gc8q1vbe7507d81";
const SERVICE_NAME = process.env.WECHAT_CLOUDRUN_SERVICE || "express-ul3g";
const CALLBACK_URL = (process.env.WECHAT_CLOUDRUN_CALLBACK_URL || "https://jojo.xjrwith.cn/auth/wechat/cloudrun/callback").replace(/\/+$/, "");
const RELAY_SECRET = process.env.WECHAT_RELAY_SECRET || "";
const RELAY_TTL_MS = Number(process.env.WECHAT_RELAY_TTL_MS || 5 * 60 * 1000);

function cleanText(value, max) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pickHeaders(headers) {
  const picked = {};
  for (const [key, value] of Object.entries(headers || {})) {
    const lower = key.toLowerCase();
    if (
      lower.startsWith("x-wx-") ||
      lower.startsWith("x-forwarded-") ||
      lower.includes("openid") ||
      lower.includes("unionid") ||
      lower.includes("nickname") ||
      lower.includes("avatar") ||
      lower === "x-cloudbase-context" ||
      lower === "cookie" ||
      lower === "host" ||
      lower === "user-agent" ||
      lower === "content-type"
    ) {
      picked[lower] = value;
    }
  }
  return picked;
}

function parseCloudbaseContext(value) {
  if (!value) return {};
  try {
    const text = Buffer.from(String(value), "base64").toString("utf8");
    return JSON.parse(text);
  } catch {
    return {};
  }
}

function randomB64(bytes = 18) {
  return crypto.randomBytes(bytes).toString("base64url");
}

function toBase64Url(value) {
  return Buffer.from(value).toString("base64url");
}

function signRelayPayload(payload) {
  const encoded = toBase64Url(JSON.stringify(payload));
  const signature = crypto.createHmac("sha256", RELAY_SECRET).update(encoded).digest("base64url");
  return `${encoded}.${signature}`;
}

function safeRedirectTarget(value) {
  const raw = cleanText(String(value || ""), 500);
  if (!raw) return "/";
  if (raw.startsWith("/") && !raw.startsWith("//")) return raw;
  try {
    const target = new URL(raw);
    if (target.hostname === "jojo.xjrwith.cn" || target.hostname.endsWith(".xjrwith.cn")) {
      return target.pathname + target.search + target.hash;
    }
  } catch {
    return "/";
  }
  return "/";
}

function parseIdentity(req) {
  const headers = req.headers || {};
  const h = {};
  for (const [key, value] of Object.entries(headers)) h[key.toLowerCase()] = value;
  const context = parseCloudbaseContext(h["x-cloudbase-context"]);
  return {
    openid: cleanText(h["x-wx-openid"] || context?.OPENID || context?.openid || context?.userInfo?.openid || "", 120),
    unionid: cleanText(h["x-wx-unionid"] || context?.UNIONID || context?.unionid || context?.userInfo?.unionid || "", 120),
    nickname: cleanText(h["x-wx-nickname"] || context?.nickName || context?.nickname || context?.userInfo?.nickName || context?.userInfo?.nickname || "", 80),
    avatar_url: cleanText(h["x-wx-avatar-url"] || h["x-wx-avatar"] || context?.avatarUrl || context?.avatar_url || context?.userInfo?.avatarUrl || "", 500),
    city: cleanText(h["x-wx-city"] || context?.city || context?.userInfo?.city || "", 80),
    province: cleanText(h["x-wx-province"] || context?.province || context?.userInfo?.province || "", 80),
    country: cleanText(h["x-wx-country"] || context?.country || context?.userInfo?.country || "", 80),
    appid: cleanText(h["x-wx-appid"] || APPID, 80),
    envid: cleanText(h["x-wx-envid"] || ENVID, 80),
    service: cleanText(h["x-wx-service"] || SERVICE_NAME, 80)
  };
}

function buildRelayTicket(identity, redirect, device) {
  const now = Date.now();
  const payload = {
    source: "cloudrun",
    jti: randomB64(18),
    iat: now,
    exp: now + RELAY_TTL_MS,
    appid: identity.appid || APPID,
    envid: identity.envid || ENVID,
    service: identity.service || SERVICE_NAME,
    openid: identity.openid,
    unionid: identity.unionid,
    nickname: identity.nickname,
    avatar_url: identity.avatar_url,
    city: identity.city,
    province: identity.province,
    country: identity.country,
    redirect: safeRedirectTarget(redirect),
    device_hash: device ? crypto.createHash("sha256").update(cleanText(device, 120)).digest("hex") : ""
  };
  return signRelayPayload(payload);
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload, null, 2);
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store"
  });
  res.end(body);
}

function renderLoginPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="color-scheme" content="light">
  <title>JOJO授权登录</title>
  <script src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  <script src="https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.3.0/cloud.js"></script>
  <script src="https://web-9gikcbug35bad3a8-1304825656.tcloudbaseapp.com/sdk/1.3.1/mplogin.min.js"></script>
  <style>
    :root {
      color-scheme: light;
      --bg: #f6f7f1;
      --panel: rgba(255, 255, 255, 0.82);
      --text: #1c2220;
      --muted: #6e7874;
      --line: rgba(30, 40, 37, 0.08);
      --accent: #57b59a;
      --accent-2: #f2a866;
      --shadow: 0 18px 40px rgba(24, 35, 32, 0.10);
    }
    * { box-sizing: border-box; }
    html, body { margin: 0; min-height: 100%; background: radial-gradient(circle at top, #ffffff 0, #f6f7f1 48%, #eef3ef 100%); color: var(--text); font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif; }
    body { display: grid; place-items: center; padding: 24px; }
    .shell {
      width: min(100%, 420px);
      padding: 28px 22px 22px;
      border: 1px solid var(--line);
      border-radius: 22px;
      background: var(--panel);
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }
    .mark {
      width: 52px;
      height: 52px;
      border-radius: 16px;
      display: grid;
      place-items: center;
      margin-bottom: 16px;
      background: linear-gradient(145deg, rgba(87,181,154,0.18), rgba(242,168,102,0.18));
      color: var(--accent);
      font-weight: 700;
      letter-spacing: 0;
    }
    h1 { margin: 0 0 8px; font-size: 22px; line-height: 1.2; }
    p { margin: 0; color: var(--muted); line-height: 1.6; font-size: 14px; }
    .panel {
      margin-top: 18px;
      padding: 16px;
      border: 1px solid var(--line);
      border-radius: 18px;
      background: rgba(255,255,255,0.72);
    }
    .meta { display: grid; gap: 8px; margin-top: 12px; font-size: 12px; color: var(--muted); }
    .row { display: flex; justify-content: space-between; gap: 12px; }
    .btn {
      margin-top: 18px;
      width: 100%;
      height: 48px;
      border: 0;
      border-radius: 14px;
      background: linear-gradient(135deg, var(--accent), #6dc6aa);
      color: white;
      font-size: 16px;
      font-weight: 700;
      letter-spacing: 0;
      box-shadow: 0 10px 24px rgba(87,181,154,0.26);
    }
    .btn:disabled { opacity: .7; }
    .foot { margin-top: 12px; font-size: 12px; color: var(--muted); line-height: 1.6; }
    .status { margin-top: 14px; font-size: 13px; color: var(--muted); min-height: 20px; }
    .error { color: #b44848; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 12px; }
  </style>
</head>
<body>
  <main class="shell">
    <div class="mark">JO</div>
    <h1>微信授权登录</h1>
    <p>完成授权后，系统会把你的微信身份交回 JOJO，并自动返回到刚才的页面。</p>
    <section class="panel">
      <div class="row"><span>AppID</span><code>${escapeHtml(APPID)}</code></div>
      <div class="row"><span>环境</span><code>${escapeHtml(ENVID)}</code></div>
      <div class="row"><span>服务</span><code>${escapeHtml(SERVICE_NAME)}</code></div>
    </section>
    <button id="start" class="btn">微信授权登录</button>
    <div id="status" class="status">准备就绪。</div>
    <div class="foot">如果页面没有自动进入下一步，请点一下按钮。授权完成后会自动回到 JOJO。</div>
  </main>
  <script>
    const config = {
      appid: ${JSON.stringify(APPID)},
      envid: ${JSON.stringify(ENVID)},
      serviceName: ${JSON.stringify(SERVICE_NAME)},
      callbackUrl: ${JSON.stringify(CALLBACK_URL)}
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
        setStatus(err?.message ? "授权失败：" + err.message : "授权失败，请稍后再试。", "error");
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

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 2_000_000) {
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

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const pickedHeaders = pickHeaders(req.headers);

  if (url.pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    return res.end(renderLoginPage());
  }

  if (url.pathname === "/wechat-login") {
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
    return res.end(renderLoginPage());
  }

  if (url.pathname === "/api/wechat/relay" && req.method === "POST") {
    const body = await readBody(req);
    const identity = parseIdentity(req);
    if (!identity.openid) {
      return sendJson(res, 400, {
        ok: false,
        error: "missing_wechat_identity",
        headers: pickedHeaders,
        identity
      });
    }
    if (!RELAY_SECRET) {
      return sendJson(res, 500, {
        ok: false,
        error: "relay_secret_missing"
      });
    }
    const ticket = buildRelayTicket(identity, body.redirect || body.return_to || "/", body.device || "");
    return sendJson(res, 200, {
      ok: true,
      ticket,
      callback_url: CALLBACK_URL,
      redirect: safeRedirectTarget(body.redirect || body.return_to || "/"),
      identity: {
        openid: identity.openid ? `${identity.openid.slice(0, 4)}***${identity.openid.slice(-4)}` : "",
        unionid: identity.unionid ? `${identity.unionid.slice(0, 4)}***${identity.unionid.slice(-4)}` : "",
        nickname: identity.nickname,
        avatar_url: identity.avatar_url
      }
    });
  }

  if (url.pathname === "/api/headers") {
    return sendJson(res, 200, {
      ok: true,
      service: "jojo-cloudrun-relay",
      method: req.method,
      pathname: url.pathname,
      query: Object.fromEntries(url.searchParams.entries()),
      headers: pickedHeaders,
      all_headers: req.headers,
      remote_address: req.socket.remoteAddress || "",
      received_at: new Date().toISOString()
    });
  }

  if (url.pathname === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end("ok");
  }

  sendJson(res, 200, {
    ok: true,
    service: "jojo-cloudrun-relay",
    path: req.url,
    hint: "Open /wechat-login in WeChat, or inspect /api/headers and /api/wechat/relay."
  });
});

server.listen(PORT, () => {
  console.log(`jojo-cloudrun-relay listening on ${PORT}`);
});
