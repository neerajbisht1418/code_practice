import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { Send, User } from 'lucide-react';

const ChatBox = ({ userId, partnerId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const newSocket = io('http://localhost:3000');
    setSocket(newSocket);
    newSocket.on('connect', () => {
      console.log('Connected to server');
      newSocket.emit('join', { userId });
    });
    
    newSocket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => newSocket.close();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message && socket) {
      const newMessage = {
        text: message,
        sender: userId,
        receiver: partnerId,
        timestamp: new Date().toISOString()
      };
      socket.emit('sendMessage', newMessage);
      setMessage('');  // Clear the input field after sending
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.sender === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-end space-x-2 ${
                msg.sender === userId ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div
                className={`rounded-lg py-2 px-4 max-w-xs ${
                  msg.sender === userId
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {/* Format the timestamp as desired */}
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <Send size={24} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
