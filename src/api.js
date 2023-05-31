import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://arfest-be.local/api/',
  baseURL02: 'http://arfest-be.local/',
});

export default instance;
