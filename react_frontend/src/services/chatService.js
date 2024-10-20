// services/chatService.js
import axios from 'axios';
const BASE_URL = import.meta.env.VITE_NODE_ENV === "production" ? import.meta.env.VITE_LOCAL_BACKEND_URL:import.meta.env.VITE_LIVE_BACKEND_URL


// Fetch chat history between the user and the seller for a specific product
export const fetchChatHistory = async (userId, sellerId, productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}/${sellerId}/${productId}`);
    return response.data.data; // Assuming your API returns { success: true, data: [...] }
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

// Save a new chat message
export const saveChatMessage = async (messageData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/v1/chat/save`, messageData);
    return response.data;
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
};
