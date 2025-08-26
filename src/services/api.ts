import axios from 'axios';

const api = axios.create({
    baseURL: 'https://www.thesportsdb.com/api/v1/json/123',
    timeout: 10000,
});

export default api;
