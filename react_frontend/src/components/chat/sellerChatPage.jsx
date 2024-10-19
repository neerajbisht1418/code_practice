import React from 'react';
import ChatBox from './ChatBox';

const SellerChatPage = ( ) => {
  const userId = '6713704d225eb2492373a679'; 
  const sellerId = '67137039225eb2492373a674'; 
  const productId = "123456789"

  return (
    <div className="h-full flex flex-col">
      <header className="bg-green-600 text-white py-4 px-6">
        <h2 className="text-xl font-semibold">Seller Chat</h2>
      </header>
      <div className="flex-1">
        <ChatBox userId={sellerId} partnerId={userId} productId={productId}/>
      </div>
    </div>
  );
};

export default SellerChatPage;