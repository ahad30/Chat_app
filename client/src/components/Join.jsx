import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Join = () => {
  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const navigate = useNavigate();
  


  useEffect(() => {
  const handleBackButton = (event) => {
    event.preventDefault();
    toast.error("Back navigation is disabled in chat");
    window.history.pushState(null, "", window.location.href);
  };

  window.history.pushState(null, "", window.location.href);
  window.addEventListener("popstate", handleBackButton);

  return () => {
    window.removeEventListener("popstate", handleBackButton);
  };
}, []);




  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !room) return;
    navigate(`/chat?username=${username}&room=${room}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Join Chat</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Display name
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Display name"
              required
            />
          </div>
          <div>
            <label htmlFor="room" className="block text-sm font-medium text-gray-700">
              Room
            </label>
            <input
              type="text"
              id="room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Room"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Join
          </button>
        </form>
      </div>
    </div>
  );
};

export default Join;