import React from 'react';
import UserChatPage from '../chat/UserChatPage';
import SellerChatPage from '../chat/sellerChatPage';

const ChatApp = () => {
  const userId = '6713704d225eb2492373a679'; // Replace with actual user ID
  const sellerId = '67137039225eb2492373a674'; // Replace with actual seller ID

  return (
    <div className="h-screen flex">
      <div className="w-1/2 border-r">
        <UserChatPage userId={userId} sellerId={sellerId} />
      </div>
      <div className="w-1/2">
        <SellerChatPage userId={sellerId} sellerId={userId} />
      </div>
    </div>
  );
};

export default ChatApp;