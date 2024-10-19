import React from 'react';
import ChatBox from './ChatBox';

const UserChatPage = () => {
  
  const userId = '6713704d225eb2492373a679'; 
  const sellerId = '67137039225eb2492373a674'; 
  return (
    <div className="h-full flex flex-col">
      <header className="bg-blue-600 text-white py-4 px-6">
        <h2 className="text-xl font-semibold">User Chat</h2>
      </header>
      <div className="flex-1">
        <ChatBox userId={userId} partnerId={sellerId} />
      </div>
    </div>
  );
};

export default UserChatPage;