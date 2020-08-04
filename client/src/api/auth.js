import axios from './index';

/* ----you can access all global_settings api methods--- */
const authMethods = {
    registerUser: '/users',
};


function registerUserApi(data) {
    return axios.request({
        method: 'post',
        url: authMethods.registerUser,
        data
    }).catch(error => error.response) ;
}

export {registerUserApi};