@echo off
echo 🚀 开始部署学习资源库到服务器...

echo 📦 构建项目...
npm run build

echo 📁 创建部署目录...
if not exist "C:\inetpub\wwwroot\learning-resources" mkdir "C:\inetpub\wwwroot\learning-resources"

echo 📋 复制构建文件...
xcopy /E /Y dist\* "C:\inetpub\wwwroot\learning-resources\"

echo ⚙️ 配置 IIS...
echo 请在 IIS 管理器中配置网站：
echo 1. 打开 IIS 管理器
echo 2. 右键"网站" → "添加网站"
echo 3. 网站名称: Learning Resources
echo 4. 物理路径: C:\inetpub\wwwroot\learning-resources
echo 5. 端口: 80 (或自定义端口)

echo ✅ 部署完成！
echo 🌐 访问地址: http://localhost:80
echo 📝 记得配置环境变量
pause
