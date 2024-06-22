import axios from 'axios';
import * as jwtDecode from 'jwt-decode'; // Asumiendo que ya tienes esta librería instalada

const BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';
const API_URL = `${BASE_URL}/items`;

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

export const getRoleBasedOnToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    const decodedToken = jwtDecode(token);
    return decodedToken.role;
}

export const fetchLogin = async (username, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/login`, { username, password });
        const token = response.data.token;

        localStorage.setItem('token', token);

        return response.data;
    } catch (error) {
        console.error('Error fetching login:', error);
        throw error;
    }
};

export const fetchRegister = async (body) => {
    try {
        const response = await axios.post(`${BASE_URL}/auth/register`, body);
        return response.data;
    } catch (error) {
        console.error('Error en fetchRegister:', error);
        throw error;
    }
};

export const getProducts = async (skip, limit) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.get(`${BASE_URL}/api/products`, {
            params: { skip, limit },
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const purchaseCart = async (userId) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('No token found');
        }
        const response = await axios.post(`${BASE_URL}/buy`, { userId }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error purchasing cart:', error);
        throw error;
    }
};
