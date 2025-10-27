# 🌐 完整部署指南 - 将学习资源库部署到服务器

## 📋 部署方案对比

| 方案 | 难度 | 成本 | 域名 | 自动部署 | 推荐度 |
|------|------|------|------|----------|--------|
| **Vercel** | ⭐ | 免费 | 自定义 | ✅ | ⭐⭐⭐⭐⭐ |
| **Netlify** | ⭐ | 免费 | 自定义 | ✅ | ⭐⭐⭐⭐⭐ |
| **GitHub Pages** | ⭐⭐ | 免费 | 自定义 | ✅ | ⭐⭐⭐⭐ |
| **自建服务器** | ⭐⭐⭐⭐ | 付费 | 自定义 | ❌ | ⭐⭐⭐ |

---

## 🚀 方案一：Vercel 部署（最推荐）

### 优点：
- ✅ 完全免费
- ✅ 自动部署
- ✅ 全球 CDN
- ✅ 自定义域名
- ✅ 环境变量管理

### 详细步骤：

#### 1. 准备项目
```bash
# 确保项目可以构建
npm run build

# 如果构建失败，检查依赖
npm install
```

#### 2. 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 3. 登录 Vercel
```bash
vercel login
```

#### 4. 部署项目
```bash
# 在项目根目录运行
vercel

# 按提示操作：
# ? Set up and deploy "~/learning-resources-hub"? [Y/n] Y
# ? Which scope do you want to deploy to? 选择你的账号
# ? Link to existing project? [y/N] N
# ? What's your project's name? learning-resources-hub
# ? In which directory is your code located? ./
# ? Want to override the settings? [y/N] N
```

#### 5. 配置环境变量
1. 访问 [vercel.com/dashboard](https://vercel.com/dashboard)
2. 选择你的项目
3. 进入 Settings → Environment Variables
4. 添加以下变量：
   - `VITE_BIN_ID`: 你的 JSONBin.io Bin ID
   - `VITE_API_KEY`: 你的 JSONBin.io Master Key

#### 6. 重新部署
```bash
vercel --prod
```

#### 7. 自定义域名（可选）
1. 在 Vercel 控制台进入项目设置
2. 点击 "Domains"
3. 添加你的域名
4. 按照提示配置 DNS

### 访问地址：
- 默认：`https://learning-resources-hub-xxx.vercel.app`
- 自定义：`https://your-domain.com`

---

## 🌐 方案二：Netlify 部署

### 优点：
- ✅ 拖拽部署，超简单
- ✅ 免费 SSL
- ✅ 表单处理
- ✅ 分支预览

### 详细步骤：

#### 1. 构建项目
```bash
npm run build
```

#### 2. 部署到 Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账号
3. 拖拽 `dist` 文件夹到页面
4. 等待部署完成

#### 3. 配置环境变量
1. 进入 Site settings
2. 找到 Environment variables
3. 添加：
   - `VITE_BIN_ID`: 你的 JSONBin.io Bin ID
   - `VITE_API_KEY`: 你的 JSONBin.io Master Key

#### 4. 重新部署
在 Netlify 控制台点击 "Trigger deploy"

### 访问地址：
- 默认：`https://amazing-name-123456.netlify.app`
- 自定义：`https://your-domain.com`

---

## 📚 方案三：GitHub Pages 部署

### 优点：
- ✅ 完全免费
- ✅ 与 GitHub 集成
- ✅ 自动部署
- ✅ 版本控制

### 详细步骤：

#### 1. 创建 GitHub 仓库
```bash
# 初始化 Git
git init
git add .
git commit -m "Initial commit"

# 推送到 GitHub
git remote add origin https://github.com/your-username/learning-resources-hub.git
git push -u origin main
```

#### 2. 启用 GitHub Pages
1. 进入 GitHub 仓库
2. 点击 Settings
3. 找到 Pages 选项
4. Source 选择 "GitHub Actions"

#### 3. 配置环境变量
1. 进入仓库 Settings
2. 找到 Secrets and variables → Actions
3. 添加：
   - `VITE_BIN_ID`: 你的 JSONBin.io Bin ID
   - `VITE_API_KEY`: 你的 JSONBin.io Master Key

#### 4. 自动部署
每次推送代码到 main 分支，GitHub Actions 会自动部署！

### 访问地址：
- 默认：`https://your-username.github.io/learning-resources-hub`
- 自定义：`https://your-domain.com`

---

## 🖥️ 方案四：自建服务器部署

### 适用场景：
- 有服务器资源
- 需要完全控制
- 企业内网部署

### Linux 服务器部署：

#### 1. 安装 Nginx
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# CentOS/RHEL
sudo yum install nginx
```

#### 2. 构建和部署
```bash
# 构建项目
npm run build

# 创建部署目录
sudo mkdir -p /var/www/learning-resources
sudo cp -r dist/* /var/www/learning-resources/

# 设置权限
sudo chown -R www-data:www-data /var/www/learning-resources
sudo chmod -R 755 /var/www/learning-resources
```

#### 3. 配置 Nginx
```bash
sudo nano /etc/nginx/sites-available/learning-resources
```

添加以下配置：
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    root /var/www/learning-resources;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # 静态资源缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
}
```

#### 4. 启用站点
```bash
sudo ln -s /etc/nginx/sites-available/learning-resources /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

#### 5. 配置 SSL（可选）
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

### Windows 服务器部署：

#### 1. 安装 IIS
1. 打开"服务器管理器"
2. 添加角色和功能
3. 选择 IIS

#### 2. 构建项目
```bash
npm run build
```

#### 3. 配置 IIS
1. 打开 IIS 管理器
2. 右键"网站" → "添加网站"
3. 网站名称：Learning Resources
4. 物理路径：`C:\inetpub\wwwroot\learning-resources`
5. 端口：80

#### 4. 复制文件
```bash
# 复制构建文件到 IIS 目录
xcopy /E /Y dist\* "C:\inetpub\wwwroot\learning-resources\"
```

---

## 🔧 环境变量配置

无论使用哪种部署方案，都需要配置环境变量：

### 必需的环境变量：
- `VITE_BIN_ID`: JSONBin.io 的 Bin ID
- `VITE_API_KEY`: JSONBin.io 的 Master Key

### 配置方法：

#### Vercel：
1. 项目设置 → Environment Variables
2. 添加变量并选择环境（Production）

#### Netlify：
1. Site settings → Environment variables
2. 添加变量

#### GitHub Pages：
1. 仓库设置 → Secrets and variables → Actions
2. 添加 Repository secrets

#### 自建服务器：
```bash
# 创建 .env 文件
echo "VITE_BIN_ID=your-bin-id" > .env
echo "VITE_API_KEY=your-api-key" >> .env
```

---

## 🎯 推荐部署流程

### 新手推荐：Vercel
1. 最简单，5分钟部署
2. 完全免费
3. 自动 HTTPS
4. 全球 CDN

### 企业推荐：自建服务器
1. 完全控制
2. 数据安全
3. 内网部署
4. 自定义配置

### 开源项目：GitHub Pages
1. 与代码仓库集成
2. 自动部署
3. 版本控制
4. 完全免费

---

## 🚀 快速开始（推荐）

### 使用 Vercel 部署（5分钟完成）：

```bash
# 1. 安装 Vercel CLI
npm install -g vercel

# 2. 登录
vercel login

# 3. 部署
vercel

# 4. 配置环境变量（在 Vercel 控制台）
# 5. 重新部署
vercel --prod
```

**完成！** 你的学习资源库现在可以在公网访问了！🎉

---

## 📞 部署后支持

部署完成后，你可以：
- ✅ 分享链接给同事
- ✅ 配置云端同步
- ✅ 自定义域名
- ✅ 监控访问统计

**现在你的学习资源库真正实现了全球访问！** 🌍
