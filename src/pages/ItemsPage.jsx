import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import Cart from '../components/Cart';

const ItemsPage = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    const removeFromCart = (itemAsin) => {
        setCart((prevCart) => prevCart.filter(item => item.asin !== itemAsin));
    };

    return (
        <div className="items-page">
            <h1 className="text-3xl font-bold underline text-center mt-4">Items</h1>
            <Cart cart={cart} removeFromCart={removeFromCart} />
            <ItemList addToCart={addToCart} />
        </div>
    );
};

export default ItemsPage;
