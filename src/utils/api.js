import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.arfest.keifproject.com/api/',
});

export default instance;
