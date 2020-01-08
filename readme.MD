### Web Socket Proxy
a simple proxy which broadcast rest api request to websocket(socket.io) clients without auth and cache control.

###forever
npm install -g forever
然后使用命令：
forever start -l ws.log -f --pidFile pid index.js

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
