import API from './api';

export const getBloodRequests = async () => {
  const response = await API.get('/requests');
  return response.data;
};

export const createBloodRequest = async (requestData) => {
  const response = await API.post('/requests', requestData);
  return response.data;
};