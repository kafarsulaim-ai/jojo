# 九型人格地图 H5 MVP

## 本地运行

```bash
cd apps/enneagram-map-h5
npm start
```

打开：

```text
http://localhost:4173
```

后台：

```text
http://localhost:4173/admin.html
```

## 生产运行

```bash
PORT=4173 ADMIN_KEY=your-secret-key npm start
```

用 Nginx 将域名反代到 `127.0.0.1:4173` 即可。

Nginx 示例：

```nginx
server {
    listen 80;
    server_name jojo.xjrwith.cn;

    location / {
        proxy_pass http://127.0.0.1:4173;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

正式测试前建议设置后台密钥：

```bash
ADMIN_KEY="换成一串只有团队知道的密钥" PORT=4173 npm start
```

## 微信授权

微信授权是可选能力。未配置时，页面会自动隐藏微信入口，用户仍可用本机记录、星图编号、Passkey、账号/永久暗号完成找回。

```bash
WECHAT_APPID="公众号或网站应用AppID" \
WECHAT_SECRET="对应AppSecret" \
WECHAT_AUTH_TYPE="official" \
WECHAT_AUTH_BASE_URL="https://auth.xjrwith.cn" \
WECHAT_COOKIE_DOMAIN=".xjrwith.cn" \
WECHAT_ALLOWED_REDIRECT_HOSTS="jojo.xjrwith.cn,auth.xjrwith.cn" \
PORT=4173 npm start
```

- `WECHAT_AUTH_TYPE=official`：公众号网页授权，适合微信内打开。
- `WECHAT_AUTH_TYPE=website`：开放平台网站应用扫码登录，适合浏览器打开。
- `WECHAT_AUTH_BASE_URL`：统一授权中心域名；如果暂时只给 JOJO 使用，可不填，默认使用当前域名。
- `WECHAT_COOKIE_DOMAIN=.xjrwith.cn`：让 `jojo.xjrwith.cn` 和后续其他站点共享同一登录 Cookie。
- 微信后台需要把授权回调域名配置为 `WECHAT_AUTH_BASE_URL` 的域名。

如果希望走云托管中转授权，可改用：

```bash
WECHAT_AUTH_MODE="cloudrun" \
WECHAT_CLOUDRUN_LOGIN_URL="https://你的云托管域名/wechat-login" \
WECHAT_CLOUDRUN_CALLBACK_URL="https://jojo.xjrwith.cn/auth/wechat/cloudrun/callback" \
WECHAT_CLOUDRUN_APPID="公众号AppID" \
WECHAT_CLOUDRUN_ENVID="云托管环境ID" \
WECHAT_CLOUDRUN_SERVICE="云托管服务名" \
WECHAT_RELAY_SECRET="主站和云托管共用的签名密钥" \
WECHAT_COOKIE_DOMAIN=".xjrwith.cn" \
PORT=4173 npm start
```

实际给用户看的登录入口，建议放在 `jojo.xjrwith.cn/wechat-login` 这类自己的域名下，不要直接拿云托管测试域名当第一入口。

## 数据文件

提交结果保存在：

```text
apps/enneagram-map-h5/data/results.jsonl
```

微信授权用户保存在：

```text
apps/enneagram-map-h5/data/wechat_accounts.json
```

分享卡右下角会显示一个很小的“星图编号”，例如：

```text
M7KQ2AB
```

老师拿到用户截图后，可在后台按编号查询更完整的数据。

## 当前版本

- 270题母题库来自 `docs/enneagram_kb/28_九型人格地图270题母题库_v2.md`（v3内容）
- H5支持标准90题和专业180题，两者都从同一套270题母库分层抽题
- 团队副型使用60题专属匿名团队题库
- 题目随机打乱顺序
- 每10题弹出一次鼓励提示
- 主型题库已移除健康/低健康维度，并固定覆盖防御机制题
- 结果页生成九型地图和分享卡
