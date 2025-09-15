import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password },{withCredentials:true});

            // Store token and redirect
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');

        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="card w-full max-w-sm bg-gray-800 shadow-2xl p-6 transition-transform transform hover:scale-105 duration-300">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                {error && <div className="alert alert-error mb-4">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text text-gray-400">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="email@example.com"
                            className="input input-bordered w-full text-black"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mb-6">
                        <label className="label">
                            <span className="label-text text-gray-400">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="input input-bordered w-full text-black"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full">Login</button>
                    </div>
                </form>
                <p className="text-center text-sm text-gray-400 mt-4">
                    Don't have an account? <Link to="/register" className="link link-hover text-blue-400">Register</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
