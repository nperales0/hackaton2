import React, { useState } from 'react';
import ItemList from '../components/ItemList';
import Cart from '../components/Cart';

const ItemsPage = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.asin === item.asin);
            if (existingItem) {
                return prevCart.map(cartItem =>
                    cartItem.asin === item.asin
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            } else {
                return [...prevCart, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemAsin) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(cartItem => cartItem.asin === itemAsin);
            if (existingItem.quantity > 1) {
                return prevCart.map(cartItem =>
                    cartItem.asin === itemAsin
                        ? { ...cartItem, quantity: cartItem.quantity - 1 }
                        : cartItem
                );
            } else {
                return prevCart.filter(item => item.asin !== itemAsin);
            }
        });
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <div className="items-page">
            <h1 className="text-3xl font-bold underline text-center mt-4">Items</h1>
            <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
            <ItemList addToCart={addToCart} />
        </div>
    );
};

export default ItemsPage;
