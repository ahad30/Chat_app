import { useSocket } from '@/context/SocketProvider';
import { useState } from 'react';
import toast from 'react-hot-toast';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isSendingLocation, setIsSendingLocation] = useState(false);
  const socket = useSocket();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return toast.error("Please type first");

    setIsSending(true); // Disable send button

    socket.emit('sendMessage', message, (error) => {
      setIsSending(false)
      if (error) {
        alert(error);
      } else {
        setMessage('');
      }
    });
  };

  const handleLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser');
    }

    setIsSendingLocation(true); // Disable location button

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit('sendLocation', position, (error) => {
        setIsSendingLocation(false);

        if (error) {
          console.log(error);
        } else {
          console.log("Location shared");
        }
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
        disabled={isSending}
        className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
          isSending ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500'
        }`}
      >
        {isSending ? 'Sending...' : 'Send'}
      </button>
      <button
        type="button"
        onClick={handleLocation}
        disabled={isSendingLocation}
        className={`px-4 py-2 text-white rounded-md focus:outline-none focus:ring-2 ${
          isSendingLocation ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
        }`}
      >
        {isSendingLocation ? 'Sharing...' : 'Location'}
      </button>
    </form>
  );
};

export default MessageForm;
