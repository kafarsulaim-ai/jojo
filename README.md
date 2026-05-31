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

## 邮箱登录

当前登录方案是：

- 普通用户可免登录使用，本机设备会自动记住历史结果。
- 换设备时可用邮箱注册/登录恢复账号。
- 用户忘记密码时，需要邮箱账号 + 星图编号，重置码会发到邮箱。
- 老师端使用邮箱账号登录；新老师通过邀请码注册。
- 老师忘记密码时，重置码会发到邮箱。
- 微信登录和 Passkey 登录均已关闭。

生产发信使用 SMTP：

```bash
SMTP_HOST="smtp.exmail.qq.com" \
SMTP_PORT=465 \
SMTP_SECURE=true \
SMTP_USER="yuan@xjrwith.cn" \
SMTP_PASS="客户端专用密码" \
SMTP_FROM="yuan@xjrwith.cn" \
SMTP_FROM_NAME="jojo测九型" \
PORT=4173 npm start
```

本地联调不想真实发邮件时可加：

```bash
SMTP_DRY_RUN=1 PORT=4173 npm start
```

## 数据文件

提交结果保存在：

```text
apps/enneagram-map-h5/data/results.jsonl
```

邮箱用户账号保存在：

```text
apps/enneagram-map-h5/data/passkeys.json
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
