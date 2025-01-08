import React from 'react';
import ModelViewer from '../components/ModelViewer';

export default function Vision3D() {
  const artworks = [
    { id: 1, title: '3D Artwork 1', model: '/models/model1.glb' },
    { id: 2, title: '3D Artwork 2', model: '/models/model2.glb' },
    { id: 3, title: '3D Artwork 3', model: '/models/model3.glb' },
    
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl  mt-6">
          3D Art Gallery
        </h1>
        <p className="mt-3 text-xl text-gray-500">
          Experience art in three dimensions
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {artworks.map((art) => (
          <div key={art.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-64 bg-gray-200">
              <ModelViewer modelPath={art.model} />
            </div>
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900">{art.title}</h3>
              <p className="mt-2 text-sm text-gray-500">
                Interactive 3D artwork that you can explore from every angle.
              </p>
              <div className="mt-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                  View in 3D
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Use your mouse or touch controls to rotate and zoom the 3D artworks
        </p>
      </div>
    </div>
  );
}