var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var usocket = [];

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  console.log('a user connected')
  socket.on('join', function (name) {
    usocket[name] = socket
    io.emit("join", name) //通过广播的形式将新用户发送给群聊成员
  })

  socket.on('message', function (msg) {
    io.emit('message', msg) //将消息广播出去
  })
})

http.listen(8081, function () {
  console.log('开始服务')
})