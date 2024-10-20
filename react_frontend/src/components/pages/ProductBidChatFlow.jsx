import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { connectSocket, onMessageReceived, sendMessage, onBidAccepted, onNotificationReceived, disconnectSocket } from '../../services/socketService';

const ProductBidChatFlow = ({ userId }) => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState([]);
  const [acceptedBid, setAcceptedBid] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);

  // Post a product
  const handlePostProduct = async () => {
    try {
      const response = await axios.post('/api/v1/product', { userId, product, price });
      setProducts([...products, response.data]); // Update the product list
      setProduct('');
      setPrice('');
    } catch (error) {
      console.error('Error posting product:', error);
    }
  };

  // Place a bid
  const handlePlaceBid = async (productId) => {
    try {
      const response = await axios.post('/api/v1/bid/place', { productId, bidderId: userId, bidAmount: price });
      setBids([...bids, response.data]);
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  // Accept a bid
  const handleAcceptBid = async (bidId) => {
    try {
      const response = await axios.post('/api/v1/bid/accept', { bidId, sellerId: userId });
      setAcceptedBid(response.data);
    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };

  // Socket connection and event listeners
  useEffect(() => {
    const socket = connectSocket(userId);

    // Listen for incoming messages
    onMessageReceived((message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Listen for bid acceptance event
    onBidAccepted((data) => {
      console.log('Bid accepted:', data);
      setAcceptedBid(data);  // Update accepted bid and start chat
    });

    // Listen for notifications
    onNotificationReceived((notification) => {
      setNotifications((prevNotifications) => [...prevNotifications, notification]);
    });

    // Cleanup on component unmount
    return () => disconnectSocket();
  }, [userId]);

  // Send a chat message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message) {
      const newMessage = {
        message,
        senderId: userId,
        receiverId: acceptedBid.bidderId,
        productId: acceptedBid.productId,
        timestamp: new Date().toISOString(),
      };
      sendMessage(newMessage);
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="product-bid-chat-container">
      {/* Section to Post a Product */}
      <div className="post-product">
        <h2>Post a Product</h2>
        <input
          type="text"
          placeholder="Product Name"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button onClick={handlePostProduct}>Post Product</button>
      </div>

      {/* List of Posted Products */}
      <div className="product-list">
        <h2>Product List</h2>
        <ul>
          {products.map((prod) => (
            <li key={prod._id}>
              {prod.product} - ${prod.price} 
              <button onClick={() => handlePlaceBid(prod._id)}>Place Bid</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Section for Placed Bids */}
      <div className="bid-list">
        <h2>Bids</h2>
        <ul>
          {bids.map((bid) => (
            <li key={bid._id}>
              Bidder {bid.bidderId} - ${bid.bidAmount}
              <button onClick={() => handleAcceptBid(bid._id)}>Accept Bid</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Notification Section */}
      <div className="notifications">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((note, index) => (
            <li key={index}>{note.message}</li>
          ))}
        </ul>
      </div>

      {/* Chat Section (after bid acceptance) */}
      {acceptedBid && (
        <div className="chat-section">
          <h2>Chat with {acceptedBid.bidderId}</h2>
          <div className="messages">
            {messages.map((msg, index) => (
              <div key={index} className={msg.senderId === userId ? 'message-sent' : 'message-received'}>
                <p>{msg.message}</p>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>

          {/* Input to send message */}
          <form onSubmit={handleSendMessage}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductBidChatFlow;
