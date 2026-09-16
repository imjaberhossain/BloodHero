import axios from 'axios';

const API_URL = 'http://localhost:8080/api/messages';

export const sendMessageApi = async (senderId, receiverId, content) => {
  const response = await axios.post(API_URL, { senderId, receiverId, content });
  return response.data;
};

export const getConversationApi = async (user1, user2) => {
  const response = await axios.get(`${API_URL}/conversation?user1=${user1}&user2=${user2}`);
  return response.data;
};