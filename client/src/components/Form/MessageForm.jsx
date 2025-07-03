import { useSocket } from '@/context/SocketProvider';
import { useState, useContext } from 'react';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const socket = useSocket();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    socket.emit('sendMessage', message, (error) => {
      if (error) {
        alert(error);
      }
    });

    setMessage('');
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('sendLocation', position , (error) => {
      if (error) {
        return console.log(error);
      }
      console.log("Location shared");
    });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Type a message"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Send
      </button>
      <button
        type="button"
        onClick={handleLocation}
        className="px-4 py-2 text-white bg-gray-600 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Location
      </button>
    </form>
  );
};

export default MessageForm;