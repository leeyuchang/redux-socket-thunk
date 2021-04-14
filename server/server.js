const express = require('express')
const http = require('http')
const socketio = require('socket.io')
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const server = http.createServer().listen(9000, () => {
  console.log('Express Server with Socket Running!!! 9000')
});

let io = socketio(server)

io.sockets.on('connection', (socket) => {
  console.log("Connected to Socket!!" + socket.id)

  socket.on('disconnect', () => {
    console.log('disconnected!', socket.id);
    clearInterval(socket.interval)
  });

  socket.on('error', error => {
    console.log(error);
    clearInterval(socket.interval)
  })
})


