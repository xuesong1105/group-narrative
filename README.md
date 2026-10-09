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

## 部署到阿里云（120.26.93.211）

这台机器是 2 核 2G 的 Alibaba Cloud Linux 3。网站构建完是纯静态文件，服务器只需要 Nginx，不必在服务器上装 Node。2G 内存跑构建容易不够，所以在你自己的电脑上构建，再把 `dist/` 传上去。

我没法登录你的服务器。下面的命令需要你自己在阿里云控制台和本机终端里执行。不要把 root 密码发到对话里。

### 1. 安全组放行 80 端口

阿里云控制台 → 云服务器 ECS → 实例 → 这个实例 → 安全组 → 入方向 → 手动添加：

- 协议：TCP
- 端口：80
- 授权对象：`0.0.0.0/0`

22 端口保持只给你自己的 IP，不要对全世界开放。

### 2. 在你自己的电脑上构建

需要已安装 Node.js 20 或更高版本。

```bash
npm ci
npm run build
```

完成后当前目录下会出现 `dist/`，里面有 `index.html`。

### 3. 上传到服务器

把 `dist` 里的文件传到服务器的 `/tmp/qungui-dist`。在你自己的电脑上执行（把密钥或密码登录方式换成你购买实例时设置的那种）：

```bash
ssh root@120.26.93.211 "mkdir -p /tmp/qungui-dist"
scp -r dist/. root@120.26.93.211:/tmp/qungui-dist/
```

Windows PowerShell 同样可以用这两条，前提是系统里有 OpenSSH。也可以用阿里云控制台的「远程连接 → 上传文件」，把 `dist` 里的内容放到 `/tmp/qungui-dist`。

### 4. 在服务器上安装 Nginx 并挂上网站

SSH 登录后：

```bash
ssh root@120.26.93.211
```

如果整个项目已经在服务器上，直接：

```bash
bash deploy/setup-aliyun.sh
```

如果服务器上只有刚传上去的页面，把下面整段贴进去执行：

```bash
dnf install -y nginx
rm -rf /usr/share/nginx/html/*
cp -a /tmp/qungui-dist/. /usr/share/nginx/html/
systemctl enable --now nginx
systemctl reload nginx
firewall-cmd --permanent --add-service=http
firewall-cmd --reload
```

`firewall-cmd` 如果提示找不到命令，说明没开 firewalld，跳过那两行即可。安全组才是阿里云上真正挡公网的那一层。

### 5. 打开网站

浏览器访问 [http://120.26.93.211](http://120.26.93.211)。

以后改了文案或图片，在自己电脑上重新 `npm run build`，再执行一次第 3 步和第 4 步里的 `cp`，然后 `systemctl reload nginx`。

### 其他方式

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
