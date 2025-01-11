// src/pages/Home.jsx
import React, { useState } from 'react';
import { useStateContext } from '../context/ContextProvider';
import { useArtworkContext } from '../context/ArtworkContext';
import ArtworkCard from '../components/ArtworkCard';
import ArtworkForm from '../components/ArtworkForm';
import {Palette} from 'lucide-react';

export default function Home() {
    const { user, isAdmin } = useStateContext(); // Destructure isAdmin from StateContext
    const { artworks, loading, error, addArtwork, updateArtwork, deleteArtwork } = useArtworkContext();

    const [showForm, setShowForm] = useState(false);
    const [editArtwork, setEditArtwork] = useState(null);

    const handleEdit = (artwork) => {
        setEditArtwork(artwork);
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this artwork?')) {
            try {
                await deleteArtwork(id);
            } catch (error) {
                console.error('Error deleting artwork:', error);
            }
        }
    };

    return (
        <>
            {/* Hero Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            {user ? (
                                <>Welcome <span className="text-indigo-600">{user.name}</span> to ArtMarket</>
                            ) : (
                                <>Welcome to <span className="text-indigo-600">ArtMarket</span></>
                            )}
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Discover unique digital art pieces and collect NFTs from talented artists around the world.
                        </p>
                    </div>
                </div>
            </div>

            {/* Artworks Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Artworks</h2>
                    {isAdmin && (
                        <button
                            onClick={() => { setEditArtwork(null); setShowForm(true); }}
                            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                        >
                            Add New Artwork
                        </button>
                    )}
                </div>

                {showForm && (
                    <ArtworkForm
                        onClose={() => setShowForm(false)}
                        onSubmit={editArtwork ? updateArtwork : addArtwork}
                        existingData={editArtwork}
                    />
                )}

                {loading ? (
                    <div className="flex items-center justify-center min-h-[400px]">
                        <div className="relative w-20 h-20">
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full animate-ping"></div>
                            <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-600 rounded-full animate-pulse"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-indigo-600">
                                <Palette className="w-8 h-8 animate-bounce" />
                            </div>
                        </div>
                    </div>
                ) : error ? (
                    <p className="text-red-500">Error: {JSON.stringify(error)}</p>
                ) : (
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {artworks.map(art => (
                            <ArtworkCard
                                key={art.id}
                                artwork={art}
                                isAdmin={isAdmin}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}