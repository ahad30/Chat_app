import { useEffect, useRef, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const MessageList = ({ username }) => {
  const socket = useSocket();
  console.log(socket)
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);
  const currentUser = username.toLowerCase()


  useEffect(() => {
    if (!socket) return;


    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleLocationMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("message", handleMessage);
    socket.on("messageLocation", handleLocationMessage);

    return () => {
      socket.off("message", handleMessage);
      socket.off("messageLocation", handleLocationMessage);
    };
  }, [socket]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="space-y-4">
      {messages.map((message, index) => (
        <div
          key={index}
          className={`max-w-xs px-4 py-2 rounded-lg 
    ${
      message.username === currentUser
        ? "bg-blue-500 text-white ml-auto" 
        : "bg-gray-200 text-gray-800"
    }  `}
        >
          <p className="text-xs mt-1 opacity-70">
            {message.username} •{" "}
            {new Date(message.createdAt).toLocaleTimeString()}
          </p>
          {message.url ? (
            <a
              href={message.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              My current location
            </a>
          ) : (
            <p>{message.text}</p>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
