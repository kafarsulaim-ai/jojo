# JOJO v1.2 交付终审清单

更新时间：2026-05-23

## 当前状态

- 用户端：https://jojo.xjrwith.cn
- 老师数据台：https://jojo.xjrwith.cn/admin.html
- GitHub 仓库：git@github.com:kafarsulaim-ai/jojo.git
- 当前稳定提交：68f0b05 `Polish result cards and teacher handoff`
- 腾讯云服务：`jx-personality.service`
- 线上目录：`/opt/jx-personality/apps/enneagram-map-h5`

本版本定位：先稳定交付，不继续堆新功能。重点保证用户能顺畅完成测试、看到可转发的结果卡，老师和管理员能做基础承接。

## 已完成模块

- 首页：主型快速版、主型深测版、副型个人版、亲子少儿版、团队创建入口。
- 主型测试：快速版 90 题、深测版从 270 题母题库中抽 180 题。
- 副型测试：个人副型、少儿副型、团队副型。
- 团队测试：团队主型、团队副型链接创建与邀请。
- 结果页：以分享卡为核心，当前可见两张核心卡。
- 结果导出：导出 PNG 图片。
- 历史测试：微信登录后查看历史记录。
- 老师端：邀请码开通、微信授权绑定、记录查看、用户查询、诊断承接。
- 管理员端：管理老师、邀请码、用户列表、联系方式和群二维码配置。

## 本轮终审通过项

已用移动端尺寸 `390 x 844` 进行脚本化验收：

- 首页无前端报错。
- 首页首屏内容完整，无明显溢出。
- 结果编号直达页可打开。
- 结果页可见 2 张核心分享卡。
- 团队创建弹窗可正常出现。
- 老师入口页可正常打开。

验收截图：

- `/tmp/jojo-live-home-mobile.png`
- `/tmp/jojo-live-result-mobile-correct.png`
- `/tmp/jojo-live-admin-mobile.png`
- `/tmp/jojo-live-team-modal-mobile.png`

核心链路：

- `/api/session?mode=main90` 可生成主型测试会话。
- `/api/submit` 可提交测试并生成结果编号。
- `/result/结果编号` 可直达结果页。
- 团队创建后出现链接弹窗，包含复制邀请链接、我也开始测试、团队总图入口。

## 保留风险

1. 微信授权需要继续用真实微信环境复测。
2. iPhone 音效需要继续真机判断，iOS 对静音键和网页音频有限制。
3. 题库准确性需要九型老师真实校准。
4. 结果页文案适合继续小样本 A/B。
5. 正式运营后需要固定备份线上数据。

## 上线同步

```bash
rsync -av \
  --exclude 'data/' \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.playwright-cli/' \
  --exclude 'cloudrun-debug/' \
  --exclude 'output/' \
  --rsync-path='sudo rsync' \
  /Users/zhangyuan/Documents/Playground/apps/enneagram-map-h5/ \
  openclaw-public:/opt/jx-personality/apps/enneagram-map-h5/

ssh openclaw-public 'sudo systemctl restart jx-personality.service'
```

## 线上检查

```bash
ssh openclaw-public 'sudo systemctl status --no-pager -l jx-personality.service'
ssh openclaw-public 'curl -s https://jojo.xjrwith.cn | grep -Eo "styles.css\\?v=[^\\\"[:space:]]+" | head'
```

## 下一阶段建议

短期只做三类事：

1. 真实用户小样本测试：10-30 人。
2. 九型老师校准题库和报告口径。
3. 修真实反馈里的高频问题。

暂时不建议继续新增大功能。当前最重要的是让产品稳定、顺滑、能被用户理解，也能被老师承接。
