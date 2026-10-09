#!/bin/bash
# 在阿里云服务器上用 root 执行。
# 事先把本机构建好的 dist/ 上传到 /tmp/qungui-dist（里面要有 index.html）。
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "请用 root 执行：sudo bash setup-aliyun.sh"
  exit 1
fi

if [ ! -f /tmp/qungui-dist/index.html ]; then
  echo "没有找到 /tmp/qungui-dist/index.html"
  echo "请先在自己的电脑上执行 npm run build，再把 dist 目录上传到 /tmp/qungui-dist"
  exit 1
fi

dnf install -y nginx
mkdir -p /usr/share/nginx/html
rm -rf /usr/share/nginx/html/*
cp -a /tmp/qungui-dist/. /usr/share/nginx/html/
restorecon -Rv /usr/share/nginx/html 2>/dev/null || true

systemctl enable --now nginx
systemctl reload nginx

if command -v firewall-cmd >/dev/null 2>&1 && systemctl is-active --quiet firewalld; then
  firewall-cmd --permanent --add-service=http
  firewall-cmd --reload
fi

echo "服务器这边好了。记得在阿里云安全组放行 TCP 80，然后打开 http://120.26.93.211"
