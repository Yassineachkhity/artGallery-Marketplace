// src/context/ContextProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';

const StateContext = createContext({
    user: null,
    token: null,
    darkMode: false,
    setUser: () => {},
    setToken: () => {},
    setDarkMode: () => {},
    isAdmin: false, // Add isAdmin to the context
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [darkMode, setDarkMode] = useState(localStorage.getItem('DARK_MODE') === 'true');
    const [isAdmin, setIsAdmin] = useState(false); // State to track admin status

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('DARK_MODE', darkMode);
    }, [darkMode]);

    const setTokenFunc = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    // Function to fetch user data
    const fetchUser = async () => {
        try {
            const response = await axiosClient.get('/user');
            setUser(response.data);
            setIsAdmin(response.data.id === 1); // Assuming user with ID 1 is admin
        } catch (error) {
            console.error('Error fetching user:', error);
            setUser(null);
            setIsAdmin(false);
            setTokenFunc(null);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
    }, [token]);

    return (
        <StateContext.Provider value={{
            user,
            token,
            darkMode,
            setUser,
            setToken: setTokenFunc,
            setDarkMode,
            isAdmin, // Provide isAdmin to context consumers
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
