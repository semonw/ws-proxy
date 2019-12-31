var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });

    socket.on('heartbeat',function(){
        console.log('heartbeat...');
        socket.emit('heartbeat', 'echo');
        res.send('heartbeat.');
    });

    console.log('client count:' + io.clients.length);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', function (req, res) {
    res.send('Websocket Service.');
});

app.post('/ws/msg', function (req, res) {
    console.log(req.body);
    var msg = req.body;
    io.emit('msg', msg);
    res.send('msg broadcasted.');
});

http.listen(8885, function () {
    console.log('listening on localhost:8885');
});
