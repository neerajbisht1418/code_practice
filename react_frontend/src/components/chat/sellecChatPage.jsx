import React from 'react';
import ChatBox from './ChatBox';

const SellerChatPage = ({ userId, sellerId }) => {
  return (
    <div className="h-full flex flex-col">
      <header className="bg-green-600 text-white py-4 px-6">
        <h2 className="text-xl font-semibold">Seller Chat</h2>
      </header>
      <div className="flex-1">
        <ChatBox userId={userId} partnerId={sellerId} />
      </div>
    </div>
  );
};

export default SellerChatPage;