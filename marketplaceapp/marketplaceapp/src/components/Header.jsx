// src/components/Header.jsx

import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Header({ user, token, onLogout }) {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path
            ? 'text-indigo-600 border-b-2 border-indigo-600'
            : 'text-gray-700 hover:text-indigo-600';
    };

    const navigationLinks = [
        { name: 'Home', path: '/' },
        { name: 'Create', path: '/create' },
        { name: '3D Vision', path: '/3d-vision' },
        { name: 'Tokens', path: '/tokens' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <header className="bg-white shadow-md fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-indigo-600">
                            ArtMarket
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`${isActive(link.path)} inline-flex items-center px-1 pt-1 text-sm font-medium`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 justify-center px-6">
                        <div className="w-full max-w-lg">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                    placeholder="Search for art..."
                                />
                                <div className="absolute left-3 top-2.5">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Login/Logout Button */}
                    <div className="hidden md:flex">
                        {token ? (
                            <button
                                onClick={onLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                            >
                                Login
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={toggleMobileMenu}
                            className="text-gray-700 hover:text-indigo-600 focus:outline-none focus:text-indigo-600 transition duration-300"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMobileMenuOpen && (
                <nav className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigationLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`block px-3 py-2 rounded-md text-base font-medium ${
                                    isActive(link.path)
                                        ? 'text-indigo-600 border-l-4 border-indigo-600 bg-gray-50'
                                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                                } transition duration-300`}
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Search Bar in Mobile Menu */}
                        <div className="mt-3 px-3">
                            <div className="relative">
                                <input
                                    type="text"
                                    className="w-full bg-gray-100 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
                                    placeholder="Search for art..."
                                />
                                <div className="absolute left-3 top-2.5">
                                    <svg
                                        className="h-5 w-5 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Login/Logout Button in Mobile Menu */}
                        <div className="mt-3 px-3">
                            {token ? (
                                <button
                                    onClick={() => {
                                        onLogout();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            )}
        </header>
    );
}
