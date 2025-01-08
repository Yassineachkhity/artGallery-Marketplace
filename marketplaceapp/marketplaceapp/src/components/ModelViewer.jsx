// components/ModelViewer.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Environment } from '@react-three/drei';

function Model({ modelPath }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} dispose={null} />;
}

const ModelViewer = ({ modelPath }) => {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 60 }}
      style={{ height: '100%', width: '100%' }}
      frameloop="demand" // Improves performance by rendering on demand
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="studio" background />
      <Suspense
        fallback={
          <Html center>
            <span className="text-gray-400">Loading 3D Model...</span>
          </Html>
        }
      >
        <Model modelPath={modelPath} />
      </Suspense>
      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
  );
};

export default ModelViewer;