const Message = ({ message, isCurrentUser }) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isCurrentUser ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
       <p className="text-xs mt-1 opacity-70">
          {message.username} • {new Date(message.createdAt).toLocaleTimeString()}
        </p>
        {message.url ? (
          <a href={message.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            My current location
          </a>
        ) : (
          <p>{message.text}</p>
        )}
       
      </div>
    </div>
  );
};

export default Message;