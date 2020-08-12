import axios from 'axios';




// Set config defaults when creating the instance
const baseAxios = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});


export default baseAxios;
