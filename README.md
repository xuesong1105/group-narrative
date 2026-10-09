# 群规 · 十二条

一个叙事型单页网站：把群里的十二条群规写成一部可滚动阅读的「群聊编年史」。每一条群规是一个章节，配有原文、注解和一个可交互的小装置（拆红包、事变计时、揭晓倒计时、否定计算器、净网陪审席、随礼计算器等）。

技术栈：Vite + React + TypeScript + Tailwind CSS v4 + Motion，图标使用 Phosphor。构建产物是纯静态文件，任何 Web 服务器都能托管。

## 本地开发

需要 Node.js 20+。

```bash
npm install
npm run dev        # http://localhost:43127
```

## 修改内容

所有群规文本、标签、注解都在 `src/rules.ts`。两个关键时间也在这里：

- `INCIDENT_AT`：裂变峡谷事变时间（2026-05-23 18:30，北京时间）
- `REVEAL_AT`：松哥悬案揭晓时间（2027-05-01 00:00，北京时间）

每条群规的交互装置在 `src/components/widgets/` 下。

## 部署到服务器

### 方式一：直接用 Nginx 托管静态文件

```bash
npm ci
npm run build      # 产物在 dist/
scp -r dist/* user@your-server:/var/www/qungui/
```

然后参考 `deploy/nginx.conf`，把 `root` 改成 `/var/www/qungui` 即可。构建使用相对路径（`base: './'`），放在子目录下（如 `https://example.com/qungui/`）也能正常访问。

### 方式二：Docker

```bash
docker build -t qungui .
docker run -d --name qungui -p 8088:80 --restart unless-stopped qungui
```

访问 `http://你的服务器IP:8088`。

### 本地预览构建产物

```bash
npm run build
npm run preview    # http://localhost:43128
```

## 说明

- 「违规红包」的罚单计数保存在浏览器 localStorage 中，仅本机可见，不需要后端。
- 已适配手机与桌面端，并遵循系统的「减少动态效果」设置。
- 中文字体使用系统自带字体（苹方 / 微软雅黑 / 宋体），不加载大体积中文网络字体，国内访问更快。
