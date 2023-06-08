import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://arfest-be.local/api/',
});

export default instance;
