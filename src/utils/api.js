import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://arfest-be.local/api/',
  baseURL: 'https://api.arfest.keifproject.com/api/',
});

export default instance;
