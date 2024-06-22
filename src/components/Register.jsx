import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRegister } from '../services/api';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'cliente' // Default role to 'cliente' if not specified
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRadioChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchRegister(formData);
            localStorage.setItem('token', response.token);

            // Redirigir según el rol
            if (formData.role === 'admin') {
                navigate('/items');
            } else if (formData.role === 'cliente') {
                navigate('/items');
            }

            console.log(response.token);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <section>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username" className="block text-lg font-medium leading-6 text-gray-900">
                        Username
                    </label>
                    <div className="mt-2">
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={formData.username}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-4 my-5">
                    <label htmlFor="password" className="block text-lg font-medium leading-6 text-gray-900">
                        Contraseña
                    </label>
                    <div className="mt-2">
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset bg-gray-200 ring-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="sm:col-span-4 my-5">
                    <label className="block text-lg font-medium leading-6 text-gray-900">
                        Rol
                    </label>
                    <div className="mt-2 flex items-center">
                        <input
                            id="admin"
                            name="role"
                            type="radio"
                            value="admin"
                            checked={formData.role === 'admin'}
                            onChange={handleRadioChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                        />
                        <label htmlFor="admin" className="ml-3 block text-lg font-medium text-gray-900">
                            Admin
                        </label>
                        <input
                            id="client"
                            name="role"
                            type="radio"
                            value="cliente"
                            checked={formData.role === 'cliente'}
                            onChange={handleRadioChange}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 ml-6"
                        />
                        <label htmlFor="client" className="ml-3 block text-lg font-medium text-gray-900">
                            Cliente
                        </label>
                    </div>
                </div>
                {error && (
                    <div className="text-red-500 text-center mb-4">
                        {error}
                    </div>
                )}
                <div className="flex justify-center">
                    <button id="registerSubmit" className='bg-primary text-white font-bold mx-6 py-2 px-4 my-1 rounded-full cursor-pointer' type="submit">
                        Registrarse
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Register;
