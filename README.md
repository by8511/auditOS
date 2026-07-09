# Audit OS Railway 静态部署包

这个包用于修复 Railway `CRASHED` / `Unexposed service` 的情况。

## 上传到 GitHub

把本目录里的文件全部放到 GitHub 仓库根目录：

- `package.json`
- `index.js`
- `prototypes/auditos-v0-1.html`
- `prototypes/auditos-v0-2.html`
- `prototypes/auditos-v0-3.html`
- `prototypes/auditos-v0-4.html`
- `prototypes/auditos-v0-5.html`

提交到 `main` 后，Railway 会执行 `npm start`，用 `index.js` 提供静态页面。

## 访问路径

- 根路径 `/` 默认打开 v0.5
- v0.5: `/prototypes/auditos-v0-5.html`
- 旧版本仍保留在 `/prototypes/auditos-v0-1.html` 到 `/prototypes/auditos-v0-4.html`

如果 Railway 仍显示 `Unexposed service`，进入 Service 的 `Settings / Networking`，点击 `Generate Domain` 生成公开域名。
