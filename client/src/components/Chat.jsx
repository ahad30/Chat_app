import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import MessageForm from './Form/MessageForm';
import { useSocket } from '@/context/SocketProvider';
import toast from 'react-hot-toast';

const Chat = () => {
    const socket = useSocket();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const room = searchParams.get('room');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate()


   useEffect(() => {
    if (!socket) return;

    //  if (socket?.connected) {
      socket.on("connect", () => {
      socket.emit("join", { username, room }, (error) => {
        if (error) {
          toast.error(error);
          navigate("/")
          
        }
      });
    });
    //  }

    return () => {
      socket.off("connect");
    };
  }, [socket, username, room]);


  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar room={room} users={users} setUsers={setUsers} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4">
          <MessageList username={username} room={room} users={users} setUsers={setUsers}/>
        </div>
        <div className="p-4 border-t border-gray-200">
          <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Chat;