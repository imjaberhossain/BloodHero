import axios from 'axios';

const API_URL = 'http://localhost:8080/api/blood-requests';

export const getBloodRequestsApi = async (bloodGroup = '') => {
  const response = await axios.get(API_URL, {
    params: { bloodGroup: bloodGroup === 'সব' ? '' : bloodGroup }
  });
  return response.data;
};

export const createBloodRequestApi = async (requestData) => {
  const response = await axios.post(API_URL, requestData);
  return response.data;
};