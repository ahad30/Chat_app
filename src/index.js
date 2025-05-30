const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const  Filter  = require('bad-words')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {
    console.log('New WebSocket connection')

    socket.emit('message', '!Welcome' )

    socket.broadcast.emit('message', 'A new user is joined' )

    socket.on('sendMessage', (message, callback) => {
         const filter = new Filter()
         if(filter.isProfane(message)){
            return callback('Profinity is not allowed')
         }
           
         io.emit('message', message )
         callback("")
    })

     socket.on('sendLocation', (position , callback) => {
         io.emit('message',`https://google.com/maps?q=${position?.coords?.latitude},${position?.coords?.longitude}` )
         callback()
    })

    socket.on('disconnect', () => {
         io.emit('message', 'A user is left' )
    })

      
 
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})