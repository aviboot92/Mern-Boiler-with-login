import axios from 'axios';

/* ----you can access all global_settings api methods--- */
const authMethods = {
    registerUser: '/api/users',
};

const config = {
    headers: {
        'Content-Type': 'application/json'
    }
};

function registerUserApi(data) {
    return axios.request({
        method: 'post',
        url: authMethods.registerUser,
        data
    }).catch(error => error.response) ;
}

export {registerUserApi};