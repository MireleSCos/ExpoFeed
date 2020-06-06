import axios from 'axios';

const api = axios.create({
  baseURL: 'http://hopeproject.herokuapp.com',
});

export default api;
