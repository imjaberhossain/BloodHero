import api from './axiosInstance';

// Authentication APIs
export const registerUser = (userData) => api.post('/auth/register', userData);
export const verifyOtp = (otpData) => api.post('/auth/verify-otp', otpData);
export const loginUser = (credentials) => api.post('/auth/login', credentials);

// Blood Request APIs
export const getBloodRequests = () => api.get('/blood-requests');
export const createBloodRequest = (requestData) => api.post('/blood-requests', requestData);