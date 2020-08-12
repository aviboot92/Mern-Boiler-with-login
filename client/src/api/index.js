import axios from 'axios';
import {LOGOUT} from 'variables/auth';
import {store} from 'redux/store';



// Set config defaults when creating the instance
const baseAxios = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 intercept any error responses from the api
 and check if the token is no longer valid.
 ie. Token has expired
 logout the user if the token has expired
**/

baseAxios.interceptors.response.use(
    res => res,
    err => {
      if (err.response.data.msg === 'Token is not valid') {
        store.dispatch({ type: LOGOUT });
      }
      return Promise.reject(err);
    }
  );

export default baseAxios;
