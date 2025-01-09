import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useStateContext } from '../context/ContextProvider';

export default function DarkModeToggle() {
    const { darkMode, setDarkMode } = useStateContext();

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg transition-colors duration-200 
                     hover:bg-gray-200 dark:hover:bg-gray-700
                     text-gray-600 dark:text-gray-300"
            aria-label="Toggle dark mode"
        >
            {darkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
        </button>
    );
}
