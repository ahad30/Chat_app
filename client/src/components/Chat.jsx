import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import MessageList from './MessageList';
import MessageForm from './Form/MessageForm';

const Chat = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get('username');
  const room = searchParams.get('room');
  const [users, setUsers] = useState([]);
  console.log(users)

  useEffect(() => {
    if (!username || !room) {
      window.location.href = '/';
    }
  }, [username, room]);

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