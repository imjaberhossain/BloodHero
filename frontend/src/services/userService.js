import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

// ১. ডোনার সার্চ সার্ভিস
export const searchDonorsApi = async (bloodGroup = '', district = '') => {
  const response = await axios.get(`${API_URL}/search`, {
    params: {
      bloodGroup: bloodGroup === 'সব' ? '' : bloodGroup,
      district: district === 'সব' ? '' : district
    }
  });
  return response.data;
};

// ২. প্রোফাইল ডাটা গেট করা
export const getUserProfile = async (userId) => {
  const response = await axios.get(`${API_URL}/${userId}`);
  return response.data;
};

// ৩. প্রোফাইল ইনফরমেশন আপডেট করা
export const updateUserProfile = async (userId, userData) => {
  const response = await axios.put(`${API_URL}/${userId}`, userData);
  return response.data;
};