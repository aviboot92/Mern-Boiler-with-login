import axios from 'axios';
import history from 'historyConfig';





// Set config defaults when creating the instance
const baseAxios = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

baseAxios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
    //place your reentry code
    // history.push('/');
   }
   return error;
 });

export default baseAxios;
