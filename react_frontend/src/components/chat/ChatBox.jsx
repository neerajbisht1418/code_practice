import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';
import { connectSocket, sendMessage, onMessageReceived, disconnectSocket } from '../../services/socketService';

const ChatBox = ({ userId, partnerId,productId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = connectSocket(userId);
    onMessageReceived((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    
    return () => disconnectSocket();
  }, [userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const newMessage = {
        message: message,
        senderId: userId,
        receiverId: partnerId,
        timestamp: new Date().toISOString(),
        productId 
      };
      sendMessage(newMessage);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`flex items-end space-x-2 ${
                msg.senderId === userId ? 'flex-row-reverse space-x-reverse' : 'flex-row'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <User size={20} className="text-gray-600" />
              </div>
              <div
                className={`rounded-lg py-2 px-4 max-w-xs ${
                  msg.senderId === userId ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200'
                }`}
              >
                <p>{msg.message}</p>
                <span className="text-xs opacity-75 mt-1 block">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSendMessage} className="bg-white border-t border-gray-200 p-4">
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
