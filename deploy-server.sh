#!/bin/bash

# 服务器部署脚本
echo "🚀 开始部署学习资源库到服务器..."

# 1. 构建项目
echo "📦 构建项目..."
npm run build

# 2. 创建部署目录
echo "📁 创建部署目录..."
mkdir -p /var/www/learning-resources
cd /var/www/learning-resources

# 3. 复制构建文件
echo "📋 复制构建文件..."
cp -r dist/* .

# 4. 配置 Nginx
echo "⚙️ 配置 Nginx..."
cat > /etc/nginx/sites-available/learning-resources << EOF
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名
    
    root /var/www/learning-resources;
    index index.html;
    
    location / {
        try_files \$uri \$uri/ /index.html;
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
EOF

# 5. 启用站点
echo "🔗 启用站点..."
ln -sf /etc/nginx/sites-available/learning-resources /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# 6. 配置 SSL (可选)
echo "🔒 配置 SSL..."
# certbot --nginx -d your-domain.com

echo "✅ 部署完成！"
echo "🌐 访问地址: http://your-domain.com"
echo "📝 记得配置环境变量 VITE_BIN_ID 和 VITE_API_KEY"
