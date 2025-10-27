import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api', // substitua pela sua API
  timeout: 10000,
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
