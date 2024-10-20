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
      const response = await axios.post('http://localhost:3000/api/v1/product', {sellerId: userId, title:product, price });
      setProducts([...products, response.data]); // Update the product list
      setProduct('');
      setPrice('');
    } catch (error) {
      console.error('Error posting product:', error);
    }
  };

  //handle get all products
  const getAllProducts = async()=>{
    try {
        const response = await axios.get('http://localhost:3000/api/v1/product');
        setProducts(response?.data); // Update the product list
       
      } catch (error) {
        console.error('Error posting product:', error);
      }
  }

  useEffect(()=>{
    getAllProducts()
  },[])

  // Place a bid
  const handlePlaceBid = async (productId,price) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/bid', { productId, bidderId: userId, amount: Number(price) });
      setBids([...bids, response.data]);
    } catch (error) {
      console.error('Error placing bid:', error);
    }
  };

  // Accept a bid
  const handleAcceptBid = async (bidId) => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/bid/accept', { bidId, sellerId: userId });
      setAcceptedBid(response.data);
    } catch (error) {
      console.error('Error accepting bid:', error);
    }
  };

  // Socket connection and event listeners
  useEffect(() => {
    const socket = connectSocket(userId);
    console.log("socket",socket)

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
<div className="container mx-auto p-6 bg-gray-50 min-h-screen">
  {/* Section to Post a Product */}
  <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Post a Product</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        placeholder="Product Name"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <button
      onClick={handlePostProduct}
      className="mt-4 w-full md:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
    >
      Post Product
    </button>
  </div>

  {/* List of Posted Products */}
  <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product List</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Product
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Price
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            product id
          </th>
          <th className="px-6 py-3 border-b border-gray-200"></th>
        </tr>
      </thead>
      <tbody>
        {products.map((prod) => (
          <tr key={prod._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prod.title}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${prod.price}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${prod._id}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => handlePlaceBid(prod._id,prod?.price)}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              >
                Place Bid
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Section for Placed Bids */}
  <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Bids</h2>
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Bidder
          </th>
          <th className="px-6 py-3 border-b border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
            Bid Amount
          </th>
          <th className="px-6 py-3 border-b border-gray-200"></th>
        </tr>
      </thead>
      <tbody>
        {bids.map((bid) => (
          <tr key={bid._id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{bid.bidderId}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${bid.bidAmount}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => handleAcceptBid(bid._id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
              >
                Accept Bid
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {/* Notification Section */}
  <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Notifications</h2>
    <ul className="space-y-2">
      {notifications.map((note, index) => (
        <li key={index} className="text-gray-700">
          {note.message}
        </li>
      ))}
    </ul>
  </div>

  {/* Chat Section (after bid acceptance) */}
  {acceptedBid && (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Chat with {acceptedBid.bidderId}</h2>
      <div className="messages space-y-4 mb-6">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              msg.senderId === userId
                ? "bg-blue-100 text-right"
                : "bg-gray-100 text-left"
            }`}
          >
            <p className="text-gray-700">{msg.message}</p>
            <span className="block text-sm text-gray-500 mt-2">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      {/* Input to send message */}
      <form onSubmit={handleSendMessage} className="flex space-x-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </form>
    </div>
  )}
</div>
  );
};

export default ProductBidChatFlow;
