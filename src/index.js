const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const  Filter  = require('bad-words')
const {generateMessage} = require('./utils/messages')
const {generateLocation} = require('./utils/messages')
const app = express()
const server = http.createServer(app)
const io = socketio(server)
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))



io.on('connection', (socket) => {
    console.log('New WebSocket connection')


    socket.on('join' , ({username , room}) => {
        socket.join(room)

        socket.emit('message', generateMessage('Welcome!') )

       socket.broadcast.to(room).emit('message', generateMessage(`${username} has joined`)  )


    })

    
    socket.on('sendMessage', (message, callback) => {
         const filter = new Filter()
         if(filter.isProfane(message)){
            return callback('Profinity is not allowed')
         }
           
         io.emit('message', generateMessage(message) )
         callback("")
    })

     socket.on('sendLocation', (position , callback) => {
         io.emit('messageLocation', generateLocation(`https://google.com/maps?q=${position?.coords?.latitude},${position?.coords?.longitude}`) )
         callback("")
    })

    socket.on('disconnect', () => {
         io.emit('message', generateMessage('A user is left') )
    })

      
 
})

server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})