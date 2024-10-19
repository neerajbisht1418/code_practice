import axios from 'axios';

// Save message to database
const saveChatMessage = async (senderId, receiverId, message) => {
  try {
    const response = await axios.post('http://localhost:3000/api/v1/chat/save', {
      senderId,
      receiverId,
      message
    });
    return response.data;
  } catch (error) {
    console.error('Error saving message:', error);
  }
};

export { saveChatMessage };
