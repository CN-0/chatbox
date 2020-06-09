import Axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, email, username, friends) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        email: email,
        username: username,
        friends:friends,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = (token) => {
    if(token){
        Axios.post('/users/logout',{logout:"logout"},{headers:{Authorization:`Bearer ${token}`}}).then(response=>{
    }).catch(err=>{
        console.log(err)
        console.log(err.response.data.msg)
    })
    }
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('username');
    localStorage.removeItem('room');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const login = (loginData) => {
    return dispatch => {
        dispatch(authStart())
        let url = '/users/login'
        
        Axios.post(url, loginData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('username', response.data.user.username);
                dispatch(authSuccess(response.data.token, response.data.user.email, response.data.user.username));
            })
            .catch(err => {
                console.log(err.response.data.msg);
                dispatch(authFail(err.response.data.msg));
            });
    };
};

export const register = (registerData) => {
    console.log(registerData)
    return dispatch => {
        dispatch(authStart())
        let url = '/users/register'
        Axios.post(url, registerData)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', response.data.user.email);
                localStorage.setItem('username', response.data.user.username);
                dispatch(authSuccess(response.data.token, response.data.user.email, response.data.user.username));
            })
            .catch(err => {
                dispatch(authFail("Email is already registered!"));
            });
    };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(logout());
        } else {
            const email = localStorage.getItem('email')
            const username = localStorage.getItem('username');
            dispatch(authSuccess(token, email, username));
             
        }
    };
};