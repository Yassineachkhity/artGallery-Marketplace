// src/pages/Vision3D.jsx
import React from 'react';
import ModelViewer from '../components/ModelViewer';
import AnimatedHeader from '../components/AnimatedHeader';

export default function Vision3D() {
  const artworks = [
    { id: 1, title: '3D Artwork 1', model: '/models/model1.glb' },
    { id: 2, title: '3D Artwork 2', model: '/models/model2.glb' },
    { id: 3, title: '3D Artwork 3', model: '/models/model3.glb' },
    // Add more artworks if needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Animated Header */}
      <AnimatedHeader />

      {/* Spacer */}
      <div className="h-12"></div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {artworks.map((art) => (
          <div
            key={art.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            {/* Image Container */}
            <div className="h-80 bg-gray-200">
              <ModelViewer modelPath={art.model} />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-2xl font-medium text-gray-900">{art.title}</h3>
              <p className="mt-2 text-sm text-gray-500">
                Interactive 3D artwork that you can explore from every angle.
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-12 text-center">
        <p className="text-gray-600">
          Use your mouse or touch controls to rotate and zoom the 3D artworks
        </p>
      </div>
    </div>
  );
}
