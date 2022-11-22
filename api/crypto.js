import axios from 'axios'
export const CryptoClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/',
    timeout: 1000
  });

