#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 学习资源库快速部署工具');
console.log('================================');

// 检查是否安装了必要的工具
function checkRequirements() {
  console.log('📋 检查部署要求...');
  
  try {
    execSync('npm --version', { stdio: 'pipe' });
    console.log('✅ Node.js 和 npm 已安装');
  } catch (error) {
    console.error('❌ 请先安装 Node.js 和 npm');
    process.exit(1);
  }
}

// 构建项目
function buildProject() {
  console.log('📦 构建项目...');
  try {
    execSync('npm run build', { stdio: 'inherit' });
    console.log('✅ 项目构建成功');
  } catch (error) {
    console.error('❌ 项目构建失败');
    process.exit(1);
  }
}

// 检查构建结果
function checkBuild() {
  const distPath = path.join(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    console.error('❌ dist 目录不存在，构建失败');
    process.exit(1);
  }
  
  const indexPath = path.join(distPath, 'index.html');
  if (!fs.existsSync(indexPath)) {
    console.error('❌ index.html 不存在，构建失败');
    process.exit(1);
  }
  
  console.log('✅ 构建文件检查通过');
}

// 显示部署选项
function showDeployOptions() {
  console.log('\n🎯 选择部署方案：');
  console.log('1. Vercel (推荐) - 免费，自动部署');
  console.log('2. Netlify - 免费，拖拽部署');
  console.log('3. GitHub Pages - 免费，与代码集成');
  console.log('4. 自建服务器 - 完全控制');
  console.log('5. 仅构建 - 不部署');
}

// Vercel 部署
function deployToVercel() {
  console.log('🚀 部署到 Vercel...');
  
  try {
    // 检查是否安装了 Vercel CLI
    execSync('vercel --version', { stdio: 'pipe' });
  } catch (error) {
    console.log('📦 安装 Vercel CLI...');
    execSync('npm install -g vercel', { stdio: 'inherit' });
  }
  
  console.log('🔐 请登录 Vercel...');
  execSync('vercel login', { stdio: 'inherit' });
  
  console.log('📤 部署项目...');
  execSync('vercel', { stdio: 'inherit' });
  
  console.log('✅ Vercel 部署完成！');
  console.log('📝 记得在 Vercel 控制台配置环境变量：');
  console.log('   - VITE_BIN_ID');
  console.log('   - VITE_API_KEY');
}

// Netlify 部署
function deployToNetlify() {
  console.log('🌐 准备 Netlify 部署...');
  console.log('📋 手动步骤：');
  console.log('1. 访问 https://netlify.com');
  console.log('2. 注册/登录账号');
  console.log('3. 拖拽 dist 文件夹到页面');
  console.log('4. 配置环境变量');
  console.log('5. 获得部署链接');
  
  console.log('\n📁 构建文件位置：', path.join(process.cwd(), 'dist'));
}

// GitHub Pages 部署
function deployToGitHub() {
  console.log('📚 准备 GitHub Pages 部署...');
  console.log('📋 手动步骤：');
  console.log('1. 创建 GitHub 仓库');
  console.log('2. 推送代码到仓库');
  console.log('3. 启用 GitHub Pages');
  console.log('4. 配置环境变量');
  console.log('5. 自动部署完成');
  
  console.log('\n🔧 自动配置 GitHub Actions...');
  
  // 创建 GitHub Actions 配置
  const workflowDir = path.join(process.cwd(), '.github', 'workflows');
  if (!fs.existsSync(workflowDir)) {
    fs.mkdirSync(workflowDir, { recursive: true });
  }
  
  const workflowContent = `name: Deploy to GitHub Pages

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
        VITE_BIN_ID: \${{ secrets.VITE_BIN_ID }}
        VITE_API_KEY: \${{ secrets.VITE_API_KEY }}
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: \${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
`;
  
  fs.writeFileSync(path.join(workflowDir, 'deploy.yml'), workflowContent);
  console.log('✅ GitHub Actions 配置已创建');
}

// 自建服务器部署
function deployToServer() {
  console.log('🖥️ 自建服务器部署...');
  console.log('📋 部署步骤：');
  console.log('1. 将 dist 文件夹上传到服务器');
  console.log('2. 配置 Web 服务器 (Nginx/Apache)');
  console.log('3. 配置环境变量');
  console.log('4. 重启服务');
  
  console.log('\n📁 构建文件位置：', path.join(process.cwd(), 'dist'));
  console.log('🔧 可以使用提供的部署脚本：');
  console.log('   - Linux: ./deploy-server.sh');
  console.log('   - Windows: deploy-server.bat');
}

// 主函数
function main() {
  const args = process.argv.slice(2);
  const deployType = args[0] || 'menu';
  
  checkRequirements();
  buildProject();
  checkBuild();
  
  switch (deployType) {
    case 'vercel':
      deployToVercel();
      break;
    case 'netlify':
      deployToNetlify();
      break;
    case 'github':
      deployToGitHub();
      break;
    case 'server':
      deployToServer();
      break;
    case 'build':
      console.log('✅ 仅构建完成，未部署');
      break;
    default:
      showDeployOptions();
      console.log('\n💡 使用方法：');
      console.log('node quick-deploy.js vercel    # 部署到 Vercel');
      console.log('node quick-deploy.js netlify    # 部署到 Netlify');
      console.log('node quick-deploy.js github     # 部署到 GitHub Pages');
      console.log('node quick-deploy.js server     # 部署到自建服务器');
      console.log('node quick-deploy.js build      # 仅构建');
      break;
  }
}

main();
