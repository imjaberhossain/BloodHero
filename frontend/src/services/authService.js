import API from './api';

export const registerUser = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const verifyOtp = async (otpData) => {
  const response = await API.post('/auth/verify-otp', otpData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await API.post('/auth/login', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};