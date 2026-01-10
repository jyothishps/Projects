import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const result = await login(email, password);
        if (result.success) {
            navigate('/home');
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white relative">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/src/assets/wallpaper.jpg')" }}
            />
            
            {/* Dark overlay for better readability */}
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Content */}
            <div className="bg-neutral-800/90 backdrop-blur-sm p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
                <h2 className="text-3xl font-bold mb-6 text-center text-purple-500">Login</h2>
                {error && <div className="bg-red-500/20 text-red-400 p-3 rounded mb-4 text-sm">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-neutral-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-neutral-400 mb-1">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-neutral-700 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-medium transition-colors">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-neutral-400">
                    Don't have an account? <Link to="/register" className="text-purple-400 hover:underline">Register</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;