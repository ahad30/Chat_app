const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');
const Filter = require('bad-words');
const { generateMessage, generateLocation } = require('./utils/messages');
const { addUser, getUserById, getUsersInRoom, removeUser } = require('./utils/users');
const port = process.env.PORT || 5000; 
const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());
const io = socketio(server, {
  cors: {
    origin:  "http://localhost:5173" || "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});



app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  socket.on('join', (options, callback) => {
    // console.log('Join user',options)
    const { error, user } = addUser({ id: socket.id, ...options });
    if (error) {
      return callback(error);
    }
    console.log(user)  

    socket.join(user.room);
    socket.emit('message', generateMessage('Admin', 'Welcome!'));
    socket.broadcast.to(user.room).emit('message', 
      generateMessage('Admin', `${user.username} has joined`));

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUserById(socket?.id);
    const filter = new Filter();
    
    if (filter.isProfane(message)) {
      return callback('Profanity is not allowed');
    }

    if (user) {
      io.to(user.room).emit('message', generateMessage(user.username, message));
    }
    callback("");
  });

  socket.on('sendLocation', (position, callback) => {
    const user = getUserById(socket?.id);

    if (user) {
      io.to(user.room).emit('messageLocation', 
        generateLocation(
          user.username,
          `https://google.com/maps?q=${position?.coords?.latitude},${position?.coords?.longitude}`
        ));
    }
    callback("");
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', 
        generateMessage('Admin', `${user.username} has left`));
       io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});




server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});