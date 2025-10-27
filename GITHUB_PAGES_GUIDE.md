# 📚 GitHub Pages 部署详细指南

## 🎯 什么是 GitHub Pages？

GitHub Pages 是 GitHub 提供的免费静态网站托管服务，可以将你的项目自动部署到公网，访问地址类似：
- `https://your-username.github.io/learning-resources-hub`

### ✅ 优点：
- 🆓 完全免费
- 🔄 自动部署
- 🔒 自动 HTTPS
- 🌍 全球 CDN
- 📝 与代码仓库集成

---

## 📋 部署前准备

### 1. 确保项目可以正常构建

```bash
# 测试构建
npm run build

# 检查 dist 文件夹是否存在
ls dist
```

### 2. 需要准备的内容：
- ✅ GitHub 账号
- ✅ 本地已安装 Git
- ✅ 项目可以正常构建

---

## 🚀 详细部署步骤

### 步骤 1：创建 GitHub 仓库

#### 1.1 登录 GitHub
访问 [github.com](https://github.com) 并登录

#### 1.2 创建新仓库
1. 点击右上角 "+" → "New repository"
2. 填写仓库信息：
   - **Repository name**: `learning-resources-hub`
   - **Description**: 学习资源收藏库
   - **Visibility**: Public（必需，GitHub Pages 免费版只支持公开仓库）
   - ❌ **不要勾选** "Initialize this repository with a README"
3. 点击 "Create repository"

### 步骤 2：初始化本地 Git 仓库

```bash
# 1. 进入项目目录
cd C:\Users\074011672\Documents\MyDoc\Cursor_Project\Demo1

# 2. 初始化 Git 仓库
git init

# 3. 添加所有文件
git add .

# 4. 提交代码
git commit -m "Initial commit: Learning Resources Hub"

# 5. 重命名分支为 main
git branch -M main

# 6. 添加远程仓库（替换成你的 GitHub 用户名）
git remote add origin https://github.com/streamxww/learning-resources-hub.git

# 7. 推送代码到 GitHub
git push -u origin main
```

**注意：** 如果 GitHub 要求身份验证，你需要：
1. 使用 Personal Access Token 而不是密码
2. 或者使用 GitHub Desktop 客户端
3. 或者配置 SSH 密钥

### 步骤 3：配置 GitHub Actions 自动部署

我已经为你创建了自动部署配置，现在需要：

#### 3.1 检查配置文件
确认 `.github/workflows/deploy.yml` 文件存在：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      env:
        VITE_BIN_ID: ${{ secrets.VITE_BIN_ID }}
        VITE_API_KEY: ${{ secrets.VITE_API_KEY }}
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### 3.2 添加环境变量（重要！）

1. 进入你的 GitHub 仓库
2. 点击 **Settings** → **Secrets and variables** → **Actions**
3. 点击 **New repository secret**
4. 添加以下两个密钥：

**第一个密钥：**
- **Name**: `VITE_BIN_ID`
- **Secret**: 你的 JSONBin.io Bin ID（例如：`$2a$10$abc123...`）

**第二个密钥：**
- **Name**: `VITE_API_KEY`
- **Secret**: 你的 JSONBin.io Master Key

5. 点击 **Add secret** 保存

### 步骤 4：推送配置到 GitHub

```bash
# 添加新文件
git add .github/workflows/deploy.yml

# 提交更改
git commit -m "Add GitHub Pages deployment workflow"

# 推送到 GitHub
git push origin main
```

### 步骤 5：启用 GitHub Pages

#### 5.1 允许 GitHub Actions 部署

1. 进入仓库 **Settings**
2. 找到 **Pages** 选项（左侧菜单）
3. 在 **Source** 部分：
   - 选择 "GitHub Actions"
4. 点击 **Save**

#### 5.2 等待第一次部署

1. 进入仓库的 **Actions** 标签页
2. 你应该能看到正在运行的工作流 "Deploy to GitHub Pages"
3. 等待部署完成（通常 2-5 分钟）
4. 部署成功后，会显示绿色 ✅ 图标

### 步骤 6：访问你的网站

部署成功后，访问：
```
https://your-username.github.io/learning-resources-hub
```

**例如**：
```
https://githubuser.github.io/learning-resources-hub
```

---

## 🔄 后续自动部署

### 每次更新代码

```bash
# 1. 修改代码

# 2. 提交更改
git add .
git commit -m "Update resources"

# 3. 推送到 GitHub
git push origin main

# 4. GitHub Actions 会自动部署！
```

**无需任何其他操作**，GitHub 会自动：
- ✅ 检测到代码更新
- ✅ 运行构建命令
- ✅ 部署到 GitHub Pages
- ✅ 更新网站内容

---

## 🎨 自定义域名（可选）

### 步骤 1：购买域名

推荐域名注册商：
- Namecheap
- GoDaddy
- 阿里云
- 腾讯云

### 步骤 2：配置 DNS

在你的域名提供商添加 CNAME 记录：

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | www | your-username.github.io | 3600 |
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### 步骤 3：在 GitHub 配置

1. 进入仓库 **Settings** → **Pages**
2. 在 **Custom domain** 输入你的域名
3. 点击 **Save**
4. GitHub 会自动生成 CNAME 文件

### 步骤 4：等待生效

DNS 生效需要 10 分钟到 48 小时，完成后就可以使用你的域名访问了！

---

## 🐛 常见问题解决

### 问题 1：构建失败

**原因**：环境变量未配置

**解决**：
1. 检查是否正确添加了 `VITE_BIN_ID` 和 `VITE_API_KEY`
2. 确保两个密钥的名称完全正确
3. 重新推送代码

### 问题 2：404 错误

**原因**：路径配置问题

**解决**：
检查 `vite.config.ts` 中的 `base` 配置：
```typescript
base: process.env.NODE_ENV === 'production' ? '/learning-resources-hub/' : '/',
```

确保 `/learning-resources-hub/` 与你的仓库名一致！

### 问题 3：样式丢失

**原因**：资源路径错误

**解决**：
```bash
# 重新构建
npm run build

# 检查 dist 文件夹
ls dist/assets
```

### 问题 4：部署缓慢

**原因**：GitHub Actions 需要时间

**解决**：
- 首次部署较慢（约 5 分钟）
- 后续部署较快（约 2 分钟）
- 这是正常的！

### 问题 5：无法访问 .env 变量

**原因**：GitHub Actions 需要配置 secrets

**解决**：
1. 确保在 GitHub 仓库设置了 secrets
2. 检查 `.github/workflows/deploy.yml` 中的环境变量配置
3. 重新触发部署

---

## 📊 部署检查清单

部署前检查：
- ✅ 项目可以正常构建
- ✅ GitHub 仓库已创建
- ✅ 代码已推送到 GitHub
- ✅ 环境变量已配置
- ✅ GitHub Pages 已启用
- ✅ Actions 权限已授予

部署后检查：
- ✅ Actions 运行成功
- ✅ 网站可以访问
- ✅ 样式正常显示
- ✅ 功能正常工作
- ✅ 云端同步功能正常

---

## 🎯 完整操作命令总结

```bash
# 1. 初始化项目（只需要一次）
cd C:\Users\074011672\Documents\MyDoc\Cursor_Project\Demo1
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/learning-resources-hub.git
git push -u origin main

# 2. 每次更新代码
git add .
git commit -m "Update: your message"
git push origin main

# 3. GitHub Actions 会自动部署！
```

---

## 🌟 高级技巧

### 1. 分支预览

你可以在不同分支上部署：
```bash
# 创建功能分支
git checkout -b feature/new-feature

# 开发完成后推送
git push origin feature/new-feature

# 在 GitHub 上可以看到分支的预览链接
```

### 2. 预览部署

每次 Pull Request 都会自动创建预览环境：
1. 创建功能分支
2. 开发新功能
3. 创建 Pull Request
4. GitHub 会自动部署预览版本
5. 可以在 PR 页面上看到预览链接

### 3. 回滚部署

如果需要回滚到之前的版本：
```bash
# 查看历史
git log

# 回滚到指定版本
git reset --hard <commit-hash>
git push origin main --force
```

### 4. 监控部署状态

1. 进入 **Actions** 标签页
2. 查看最新的工作流运行状态
3. 可以看到详细的日志和错误信息

---

## 📞 需要帮助？

如果遇到问题：
1. 查看 GitHub Actions 的日志
2. 检查环境变量配置
3. 确认构建命令正确
4. 查看 GitHub Pages 的设置

**祝部署顺利！** 🎉
