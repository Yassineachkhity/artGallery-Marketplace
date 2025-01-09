import { createContext, useContext, useState, useEffect } from 'react';

const StateContext = createContext({
    user: null,
    token: null,
    darkMode: false,
    setUser: () => {},
    setToken: () => {},
    setDarkMode: () => {},
});

export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, _setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [darkMode, setDarkMode] = useState(localStorage.getItem('DARK_MODE') === 'true');

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('DARK_MODE', darkMode);
    }, [darkMode]);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('ACCESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACCESS_TOKEN');
        }
    };

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            darkMode,
            setDarkMode,
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
