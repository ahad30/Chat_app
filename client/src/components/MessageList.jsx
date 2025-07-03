import { useEffect, useRef, useState } from 'react';
import { useSocket } from '../context/SocketProvider';
import Message from './Message';

const MessageList = ({ username, room, users, setUsers }) => {
  console.log(username)
  const socket = useSocket();
  const [messages, setMessages] = useState([]);
  const [currentUser , setCurrentUser] = useState("")
  const messagesEndRef = useRef(null);

  console.log(messages)
  console.log(users)

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleLocationMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleRoomData = ({ users: roomUsers }) => {
      console.log(ro)
      setUsers(roomUsers);
    };

    // Join room
    socket.emit("join", { username, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    // Set up listeners
    socket.on('message', handleMessage);
    socket.on('messageLocation', handleLocationMessage);
    socket.on('roomData', handleRoomData);

    return () => {
      // Clean up listeners
      socket.off('message', handleMessage);
      socket.off('messageLocation', handleLocationMessage);
      socket.off('roomData', handleRoomData);
    };
  }, [socket, username, room, setUsers]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <Message 
          key={`${message.createdAt}-${index}`} 
          message={message} 
          isCurrentUser={message.username === username} 
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;