### Web Socket Proxy
a simple proxy which broadcast rest api request to websocket(socket.io) clients without auth and cache control.

###forever
安装forever:
npm install -g forever
如果命令行输入没有forever，自行搜索添加.profiles， bash.rc等配置文件。

启动：
forever start -l ws.log -f -a --pidFile pid index.js

停止:
forever stopall

查看:
forever list

###关于ws.js
没有经过任何包装的websocket服务

###Nginx Reverse proxy

server {
        listen       8088;
        server_name  localhost;

        location / {
			root E:\\DocRoot;
			index index.html index.htm;
        }
		
		location ^~/socket.io {
			proxy_set_header Upgrade $http_upgrade;
			proxy_set_header Connection "upgrade";
			proxy_http_version 1.1;
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			proxy_set_header Host $host;
			proxy_pass http://rv2.app.com:8885;
		}
}
