import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fetchItems } from "../services/api.js";

const ItemList = () => {
    const [items, setItems] = useState([]);
    const [lastKey, setLastKey] = useState(null);
    const [loading, setLoading] = useState(false);
    const observer = useRef();

    const loadItems = async () => {
        setLoading(true);
        try {
            const data = await fetchItems(12, lastKey); // Change limit to 12 for grid display
            setItems((prevItems) => [...prevItems, ...data.items]);
            setLastKey(data.lastKey ? data.lastKey.asin : null);
        } catch (error) {
            console.error('Error fetching items:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadItems();
    }, []);

    const lastItemRef = useCallback(
        (node) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && lastKey) {
                    loadItems();
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, lastKey]
    );

    return (
        <div className="w-full p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => {
                    if (items.length === index + 1) {
                        return (
                            <div
                                ref={lastItemRef}
                                key={item.asin}
                                className="border p-4 rounded shadow"
                            >
                                <img src={item.imgUrl} alt={item.title} className="w-full h-32 object-cover" />
                                <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
                                <p className="text-sm">Price: ${item.price}</p>
                                <p className="text-sm">Stars: {item.stars}</p>
                            </div>
                        );
                    } else {
                        return (
                            <div
                                key={item.asin}
                                className="border p-4 rounded shadow"
                            >
                                <img src={item.imgUrl} alt={item.title} className="w-full h-32 object-cover" />
                                <h4 className="text-lg font-semibold mt-2">{item.title}</h4>
                                <p className="text-sm">Price: ${item.price}</p>
                                <p className="text-sm">Stars: {item.stars}</p>
                            </div>
                        );
                    }
                })}
            </div>
            {loading && <p className="text-center mt-4">Loading...</p>}
        </div>
    );
};

export default ItemList;
