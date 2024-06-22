// src/services/api.js
import axios from 'axios';
import * as jwtDecode from 'jwt-decode';


const API_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/items';

export const fetchItems = async (limit = 2, lastKey = null) => {
    try {
        const response = await axios.get(API_URL, {
            params: { limit, lastKey },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching items:', error);
        throw error;
    }
};


export const fetchLogin = async (username, password) => {
    try {
        const response = await axios.post('/auth/login', { username, password });
        const token = response.data.token;
        localStorage.setItem('token', token);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

export const fetchRegister = async (body) => {
    try {
        const response = await axios.post('/auth/register', body);
        return response.data;
    } catch (error) {
        console.error('Error en fetchRegister:', error);
        throw error;
    }
};
