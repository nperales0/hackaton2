// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemsPage from './pages/ItemsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/items" element={<ItemsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
