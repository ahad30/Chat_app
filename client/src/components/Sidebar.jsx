import { useEffect, useContext } from 'react';
import { useSocket } from '../context/SocketProvider';

const Sidebar = ({ room, users, setUsers }) => {
  const socket = useSocket();

  useEffect(() => {
     if (!socket) return; 
    socket.on('roomData', ({ users }) => {
      setUsers(users);
    });

    return () => {
      socket.off('roomData');
    };
  }, [socket, setUsers]);

  return (
    <div className="w-64 bg-gray-800 text-white p-4 overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">{room}</h2>
      <h3 className="font-semibold mb-2">Users</h3>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;