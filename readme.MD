### Web Socket Proxy
a simple proxy which broadcast rest api request to websocket(socket.io) clients without auth and cache control.

###forever
npm install -g forever
然后使用命令：
forever start -l ws.log -f --pidFile pid index.js

###关于ws.js
没有经过任何包装的websocket服务