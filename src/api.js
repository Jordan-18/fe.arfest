import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://arfest.local/api/'
});

export default instance;
