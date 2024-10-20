import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { connectSocket, onMessageReceived, sendMessage, onBidAccepted, onNotificationReceived, disconnectSocket } from '../../services/socketService';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const ProductBidChatFlow = ({ userId }) => {
  const [product, setProduct] = useState('');
  const [price, setPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [bids, setBids] = useState([]);
  const [acceptedBid, setAcceptedBid] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const handleError = useCallback((error, customMessage) => {
    console.error(customMessage, error);
    setError(error.response?.data?.message || error.message || customMessage);
    setTimeout(() => setError(null), 5000); // Clear error after 5 seconds
  }, []);

  const getAllProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/product`);
      setProducts(response.data);
    } catch (error) {
      handleError(error, 'Error fetching products');
    }
  }, [handleError]);

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const handlePostProduct = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/product`, { sellerId: userId, title: product, price });
      setProducts(prevProducts => [...prevProducts, response.data]);
      setProduct('');
      setPrice('');
    } catch (error) {
      handleError(error, 'Error posting product');
    }
  };

  const handlePlaceBid = async (productId, price) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bid`, { productId, bidderId: userId, amount: Number(price) });
      setBids(prevBids => [...prevBids, response.data]);
    } catch (error) {
      handleError(error, 'Error placing bid');
    }
  };

  const handleAcceptBid = async (bidId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/bid/accept`, { bidId, sellerId: userId });
      setAcceptedBid(response.data);
    } catch (error) {
      handleError(error, 'Error accepting bid');
    }
  };

  useEffect(() => {
    const socket = connectSocket(userId);

    onMessageReceived((message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    onBidAccepted((data) => {
      console.log('Bid accepted:', data);
      setAcceptedBid(data);
    });

    onNotificationReceived((notification) => {
      setNotifications(prevNotifications => [...prevNotifications, notification]);
    });

    return () => disconnectSocket();
  }, [userId]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && acceptedBid) {
      const newMessage = {
        message,
        senderId: userId,
        receiverId: acceptedBid.bidderId,
        productId: acceptedBid.productId,
        timestamp: new Date().toISOString(),
      };
      sendMessage(newMessage);
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      {/* Post a Product Section */}
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

      {/* Product List Section */}
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
                Product ID
              </th>
              <th className="px-6 py-3 border-b border-gray-200"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prod.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${prod.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{prod._id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handlePlaceBid(prod._id, prod?.price)}
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

      {/* Bids Section */}
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

      {/* Notifications Section */}
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

      {/* Chat Section */}
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