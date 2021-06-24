import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVER_POINT;

const service = axios.create({
    baseURL,
    withCredentials: true
});

const AUTH_SERVICE = {
    login() {
        return service.get('/login');
    },
    account() {
        return service.get('/account');
    },
    getReturnURL() {
        return service.get('/auth/openid/return');
    },
    logout() {
        return service.post('/api/logout', {});
    },
};

export default AUTH_SERVICE;
