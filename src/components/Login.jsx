import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchLogin } from "../services/api";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetchLogin(username, password);
            localStorage.setItem('token', response.token);

            // Redirigir según el rol
            if (response.role === 'admin') {
                navigate('/items');
            } else if (response.role === 'cliente') {
                navigate('/items');
            }

            console.log(response.token);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <>
            <h1>Login</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username</label>
                    <div>
                        <input onChange={(e) => (setUsername(e.target.value))} type="text" id="username"></input>
                    </div>
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <div>
                        <input onChange={(e) => (setPassword(e.target.value))} type="password" id="password"></input>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    )
};

export default Login;
