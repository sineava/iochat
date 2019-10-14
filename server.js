var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
connections = []

app.get('/',function(req,res) {
    res.sendFile(__dirname + '/index.htm')
    //res.send('<h1>Hello World</h1>')
})

io.on('connection',function(socket) {
    connections.push(socket)
    console.log('Connected: %s sockets connected',connections.length)
    socket.on('disconnect',function(data) {
        connections.splice(connections.indexOf(socket),1)
        console.log('Disconnected: %s sockets connected',connections.length)
    })

    socket.on('send message',function(data) {
        console.log(data)
        io.sockets.emit('new message',{msg:data})
    })
})

http.listen(3000,function() {
    console.log('listening on *:3000')
})