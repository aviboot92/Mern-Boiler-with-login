import axios from './index';

/* ----you can access all global_settings api methods--- */
const authMethods = {
    registerUser: '/users',
    loadUser: '/auth'
};


function registerUserApi(data) {
    return axios.request({
        method: 'post',
        url: authMethods.registerUser,
        data
    }).catch(error => error.response) ;
}

function loadUserApi() {
    return axios.request({
        method: 'get',
        url: authMethods.loadUser,
    }).catch(error => error.response) ;
}

export {registerUserApi, loadUserApi};