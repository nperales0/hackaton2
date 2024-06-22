import React, { useState } from 'react';

const Cart = ({ cart, removeFromCart }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="cart p-4 mb-4 border-b">
            <h2 className="text-2xl font-semibold cursor-pointer" onClick={toggleCart}>
                Shopping Cart {isOpen ? '▲' : '▼'}
            </h2>
            {isOpen && (
                cart.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {cart.map((item) => (
                            <div key={item.asin} className="flex items-center border p-4 rounded shadow">
                                <img src={item.imgUrl} alt={item.title} className="w-16 h-16 object-cover" />
                                <div className="ml-4 flex-1">
                                    <h4 className="text-lg font-semibold">{item.title}</h4>
                                    <p className="text-sm">Price: ${item.price}</p>
                                    <p className="text-sm">Stars: {item.stars}</p>
                                    <p className="text-sm">Quantity: {item.quantity}</p>
                                    <button
                                        className="mt-2 bg-red-500 text-white p-1 rounded"
                                        onClick={() => removeFromCart(item.asin)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}
        </div>
    );
};

export default Cart;
