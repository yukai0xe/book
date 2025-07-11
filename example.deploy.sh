#!/usr/bin/env sh

# 建置
npx vitepress build

# 進入輸出資料夾
cd docs/dist

# 初始化並提交
git init
git add -A
git commit -m 'deploy to production'

# 推送到 production 分支
git push -f git@github.com:[account]/[repo].git production

read -n 1 -s -r -p "按下任意鍵退出..."
