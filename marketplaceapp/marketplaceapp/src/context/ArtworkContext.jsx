// src/context/ArtworkContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axiosClient from '../axiosClient';

// Create the Context
const ArtworkContext = createContext();

// Custom Hook to Use the Artwork Context
export const useArtworkContext = () => {
    return useContext(ArtworkContext);
};

// Provider Component
export const ArtworkProvider = ({ children }) => {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Function to Fetch User
    const checkUser = async () => {
        try {
            const token = localStorage.getItem('TOKEN');
            if (!token) {
                setUser(null);
                setIsAuthenticated(false);
                return;
            }

            const response = await axiosClient.get('/user');
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (err) {
            console.error('Error fetching user:', err);
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem('TOKEN');
        }
    };

    // Function to Check if User is Admin
    const isAdmin = () => {
        return isAuthenticated && user && user.id === 1; // Assuming user with ID 1 is admin
    };

    // Function to Fetch Artworks
    const fetchArtworks = async () => {
        try {
            const response = await axiosClient.get('/artworks');
            setArtworks(response.data.data || []);
            setError(null);
        } catch (err) {
            console.error('Error fetching artworks:', err);
            setError(err.response?.data?.message || 'Error fetching artworks');
            setArtworks([]);
        } finally {
            setLoading(false);
        }
    };

    // Function to Add New Artwork
    const addArtwork = async (formData) => {
        try {
            const response = await axiosClient.post('/artworks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setArtworks(prev => [...prev, response.data.data]);
            setError(null);
            return response.data;
        } catch (err) {
            console.error('Error adding artwork:', err);
            const errorMessage = err.response?.data?.message || 'Error adding artwork';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Function to Update Artwork
    const updateArtwork = async (id, formData) => {
        try {
            const response = await axiosClient.post(`/artworks/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setArtworks(prev => 
                prev.map(art => art.id === id ? response.data.data : art)
            );
            setError(null);
            return response.data;
        } catch (err) {
            console.error('Error updating artwork:', err);
            const errorMessage = err.response?.data?.message || 'Error updating artwork';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Function to Delete Artwork
    const deleteArtwork = async (id) => {
        try {
            await axiosClient.delete(`/artworks/${id}`);
            setArtworks(prev => prev.filter(art => art.id !== id));
            setError(null);
        } catch (err) {
            console.error('Error deleting artwork:', err);
            const errorMessage = err.response?.data?.message || 'Error deleting artwork';
            setError(errorMessage);
            throw new Error(errorMessage);
        }
    };

    // Check user authentication status when the component mounts
    useEffect(() => {
        checkUser();
    }, []);

    // Fetch artworks after checking authentication
    useEffect(() => {
        fetchArtworks();
    }, [isAuthenticated]);

    // Set up an interval to periodically check authentication status
    useEffect(() => {
        const interval = setInterval(checkUser, 5000); // Check every 5 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <ArtworkContext.Provider
            value={{
                artworks,
                loading,
                error,
                addArtwork,
                updateArtwork,
                deleteArtwork,
                refreshArtworks: fetchArtworks,
                isAdmin,
                user,
                isAuthenticated,
                checkUser
            }}
        >
            {children}
        </ArtworkContext.Provider>
    );
};
