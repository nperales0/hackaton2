// src/pages/ItemsPage.jsx
import React from 'react';
import ItemList from '../components/ItemList';

const ItemsPage = () => {
    return (
        <div className="items-page">
            <h1 className="text-3xl font-bold underline text-center mt-4">Items</h1>
            <ItemList />
        </div>
    );
};

export default ItemsPage;
