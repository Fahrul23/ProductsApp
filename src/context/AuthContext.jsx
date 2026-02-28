import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser } from '../services/api';
import { saveToken, getToken, saveUser, getUser, clearAuth } from '../utils/storage';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check stored auth on app start
    useEffect(() => {
        checkStoredAuth();
    }, []);

    const checkStoredAuth = async () => {
        try {
            const token = await getToken();
            const storedUser = await getUser();
            if (token && storedUser) {
                setUser(storedUser);
                setIsLoggedIn(true);
            }
        } catch (error) {
            console.error('Error checking stored auth:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (username, password) => {
        try {
            const data = await loginUser(username, password);
            const userData = {
                id: data.id,
                username: data.username,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                image: data.image,
            };
            await saveToken(data.accessToken);
            await saveUser(userData);
            setUser(userData);
            setIsLoggedIn(true);
            return { success: true };
        } catch (error) {
            const message =
                error.response?.data?.message || 'Login gagal. Periksa kembali username dan password.';
            return { success: false, message };
        }
    };

    const logout = async () => {
        try {
            await clearAuth();
            setUser(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isLoggedIn,
                login,
                logout,
            }}>
            {children}
        </AuthContext.Provider>
    );
};
