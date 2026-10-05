# KAISER 个人作品网站

[English](README.md)

使用 Astro 和 TypeScript 构建的响应式个人网站，通过组件与结构化数据展示工程背景、软件项目和公开联系渠道。

## 实现

- 将个人介绍、经历、项目和联系信息拆分为可复用组件。
- 使用 `src/data/` 维护个人与项目内容。
- 通过 Astro 生成静态生产文件。
- 提供 Caddy 本地服务脚本及 Cloudflare Tunnel 配置示例。
- 包含公开内容检查、类型检查和 Vitest 测试。

## 开发

安装 Node.js 和 npm 后执行：

```bash
npm ci
npm run dev
```

构建与预览：

```bash
npm run check
npm run build
npm run preview
```

## Windows 本地服务

生产目录服务脚本需要 PowerShell 和 Caddy：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/start-site.ps1
powershell -ExecutionPolicy Bypass -File scripts/verify-site.ps1
```

本地访问地址为 <http://127.0.0.1:8080/>，使用 `scripts/stop-site.ps1` 停止服务。

## 验证

```powershell
npm run audit:public
npm run check
npm run build
npm test -- --run
```

## 仓库结构

- [src/data/](src/data/)：个人资料、经历和项目内容。
- [src/components/](src/components/)：页面组件。
- [src/styles/](src/styles/)：视觉样式。
- [docs/operations/](docs/operations/)：域名、邮件和发布操作文档。
- [ops/](ops/)：服务配置示例。

凭据与私有源资料应保存在公开站点之外。仓库尚未指定覆盖整个项目的许可证。
