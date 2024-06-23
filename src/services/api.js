// api.js
import axios from 'axios';
import * as jwtDecode from 'jwt-decode'; // Asumiendo que ya tienes esta librería instalada

const BASE_URL = 'https://cepnq6rjbk.execute-api.us-east-1.amazonaws.com/';
// const API_URL = `${BASE_URL}/items`;

const localItems = {
    "items": [
        {
            "asin": "B07XFH6YXZ",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "103.89",
            "imgUrl": "https://m.media-amazon.com/images/I/41El7h3wLvL._AC_UL320_.jpg",
            "stars": "4.0",
            "title": "Lenovo Thinkcentre M910q Tiny PC Black - Intel Quad Core i5-6500T 2.5GHz / 8GB-DDR4 / 256GB SSD / Windows 10 Pro (Renewed)"
        },
        {
            "asin": "B07FXLSTJQ",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "8.49",
            "imgUrl": "https://m.media-amazon.com/images/I/71TY+E3TxDL._AC_UL320_.jpg",
            "stars": "4.2",
            "title": "amFilm Galaxy Note 9 Screen Protector Glass (Full Screen Coverage), Tempered Glass Screen Protector for Samsung Galaxy Note 9 - Dot Matrix, Case Friendly, 3D Curved with Easy Installation Tray - 2018"
        },
        {
            "asin": "B08JY7SRVK",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "59.99",
            "imgUrl": "https://m.media-amazon.com/images/I/51QpT5jDcBL._AC_UL320_.jpg",
            "stars": "4.1",
            "title": "Avantree Aria 90C, a Second Pair of Bluetooth Headphones Opera Wireless TV Watching Set Dual Link, Comfortable 35 Hrs, Extra Loud (No Charging Dock Included, Single Headphone Only)"
        },
        {
            "asin": "B06XH46MWW",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "48.99",
            "imgUrl": "https://m.media-amazon.com/images/I/51WfgjZu-cL._AC_UL320_.jpg",
            "stars": "4.3",
            "title": "NETGEAR Cable Modem CM500 - Compatible with All Cable Providers Including Xfinity by Comcast, Spectrum, Cox | for Cable Plans Up to 400Mbps | DOCSIS 3.0"
        },
        {
            "asin": "B09BYJ77L6",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "0.0",
            "imgUrl": "https://m.media-amazon.com/images/I/717goThDk-L._AC_UL320_.jpg",
            "stars": "5.0",
            "title": "TP-Link 7 Stream AX3200 WiFi 6 Router (Archer AX32)- Dual Band Gigabit Wireless Internet Router, High-Speed ax Router for Streaming, Long Range Coverage"
        },
        {
            "asin": "B0C6LWLQQH",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "30.99",
            "imgUrl": "https://m.media-amazon.com/images/I/61BmU4EKnFL._AC_UL320_.jpg",
            "stars": "5.0",
            "title": "DIGISHUO USB 3.0 to IDE/SATA Hard Drive Adapter External Hard Drive Reader Ultra Recovery Converter for 2.5 3.5in HDD | SSD DVD Optical Drive | Support UASP"
        },
        {
            "asin": "B0B93TYZK4",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "16.99",
            "imgUrl": "https://m.media-amazon.com/images/I/61UfDvqPAVL._AC_UL320_.jpg",
            "stars": "4.2",
            "title": "2nd Generation Stylus Pen for iPad with Wireless Charging,Palm Rejection,Digital Display,Compatible with Apple iPad Mini 6,iPad Air 4/5,iPad Pro 11 inch1/2/3/4,iPad Pro 12.9 inch3/4/5/6-Black"
        },
        {
            "asin": "B085XN9B7N",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "18.95",
            "imgUrl": "https://m.media-amazon.com/images/I/61T+-E0LvfL._AC_UL320_.jpg",
            "stars": "4.1",
            "title": "Bluetooth BLE iBeacon (BC011-MultiBeacon) - Shows Battery Level in Broadcast - Long Range BLE 5.0"
        },
        {
            "asin": "B07CXTKT1J",
            "boughtInLastMonth": "200",
            "isBestSeller": "False",
            "price": "14.19",
            "imgUrl": "https://m.media-amazon.com/images/I/71qS7NRWxhL._AC_UL320_.jpg",
            "stars": "4.6",
            "title": "E-Z Ink (TM Compatible Ink Cartridge Replacement for Canon PGI-225 PGI225 Compatible with PIXMA MX882 MX892 MG5320 MG6220 MG5220 MG6120 MG8220 MX712 IP4820 IP4920 IX6520 Printer (Large Black, 4 Pack)"
        },
        {
            "asin": "B07F72RJYN",
            "boughtInLastMonth": "0",
            "isBestSeller": "False",
            "price": "30.0",
            "imgUrl": "https://m.media-amazon.com/images/I/51f5FVzH32L._AC_UL320_.jpg",
            "stars": "4.7",
            "title": "Samsung 8GB DDR4 PC4-21300, 2666MHZ, 288 PIN DIMM, 1.2V, CL 19 desktop ram memory module"
        }
    ],
    "lastKey": {
        "asin": "B07F72RJYN"
    }
};

export const fetchItems = async (limit = 12, lastKey = null) => {
    try {
        // Aquí simulamos una llamada a la API
        const data = localItems; // Usamos los items locales en lugar de hacer una petición HTTP
        return data;
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
