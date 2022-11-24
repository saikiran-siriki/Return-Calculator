import axios from 'axios'
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 10 });
export const CryptoClient = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3/coins/',
    timeout: 1000
});