import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { loginUser, registerUser } from '../services/authApi.js';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userData = localStorage.getItem('user');
        return userData ? JSON.parse(userData) : null;
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (credentials) => {
        setIsLoading(true);
        try {
            const res = await loginUser(credentials);
            const { token, user: userFromServer } = res.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(userFromServer));
            setUser(userFromServer);

            toast.success('Uspješno ste se prijavili!');
            navigate('/');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Greška pri prijavi';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (credentials) => {
        setIsLoading(true);
        try {
            const res = await registerUser(credentials);
            const { token, user: userFromServer } = res.data;

            localStorage.setItem('authToken', token);
            localStorage.setItem('user', JSON.stringify(userFromServer));
            setUser(userFromServer);

            toast.success('Uspješno ste se registrirali!');
            navigate('/');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Greška pri registraciji';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        login,
        register,
        logout,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};