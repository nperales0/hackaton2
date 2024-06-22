// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ItemsPage from './pages/ItemsPage';
import Login from './components/Login';
import Register from './components/Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/items" element={<ItemsPage />} />
                <Route path='/' element={<Navigate to= "/items"/> }/>
                <Route path='/register' element={<Register/> }/>
                <Route path='/login' element={<Login/> }/>
            </Routes>
        </Router>
    );
}

export default App;
