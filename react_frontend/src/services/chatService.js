// services/chatService.js
import axios from 'axios';

// Fetch chat history between the user and the seller for a specific product
export const fetchChatHistory = async (userId, sellerId, productId) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/chat/${userId}/${sellerId}/${productId}`);
    return response.data.data; // Assuming your API returns { success: true, data: [...] }
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

// Save a new chat message
export const saveChatMessage = async (messageData) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/chat/save', messageData);
    return response.data;
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
};
