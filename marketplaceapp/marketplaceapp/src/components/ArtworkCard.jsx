import React from 'react';
import { useArtworkContext } from '../context/ArtworkContext';

const ArtworkCard = ({ artwork, onEdit }) => {
    const { deleteArtwork, isAdmin, isAuthenticated } = useArtworkContext();

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this artwork?')) {
            try {
                await deleteArtwork(artwork.id);
            } catch (error) {
                console.error('Error deleting artwork:', error);
            }
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
                src={artwork.image_path}
                alt={artwork.image_title}
                className="w-full h-48 object-cover"
            />
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{artwork.image_title}</h3>
                <p className="text-gray-600 mb-4">{artwork.description}</p>
                
                {isAuthenticated && isAdmin() && (
                    <div className="flex justify-end space-x-2">
                        <button
                            onClick={() => onEdit(artwork)}
                            className="px-3 py-1 text-sm text-indigo-600 hover:text-indigo-800"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-800"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkCard;