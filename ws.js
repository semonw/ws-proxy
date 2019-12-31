var app = require('express')();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
const fs = require('fs');
const WebSocket = require('ws');
var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

const wss = new WebSocket.Server({ noServer: true });
wss.on('connection', function connection(ws) {
    console.log('receive connect.');
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        ws.send(message);
    });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.post('/ws/msg', function (req, res) {
    if (!req.body) {
        console.log('body is null');
    }
    console.log(req.body);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
    res.send('msg broadcasted.');
});

app.on('upgrade', function upgrade(request, socket, head) {
    const pathname = url.parse(request.url).pathname;
    if (pathname === '/ws') {
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    }
    else {
        socket.destroy();
    }
});

http.listen(8885, function () {
    console.log('listening on localhost:8885');
});
