// src/components/AnimatedHeader.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

export default function AnimatedHeader() {
  const mountRef = useRef(null);

  useEffect(() => {
    // THREE.js setup
    const currentMount = mountRef.current;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Black background

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Torus Knot
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 100, 16);
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x444444,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.005;

      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const handleResize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      currentMount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="relative w-full h-96 overflow-hidden bg-gradient-rainbow animate-gradient">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="absolute top-0 left-0 w-full h-full"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10 px-4">
        <h1 className="text-5xl font-bold drop-shadow-lg">3D Art Gallery</h1>
        <p className="mt-4 text-2xl drop-shadow-lg">
          Experience art in three dimensions
        </p>
      </div>

      {/* Floating SVG Elements */}
      <div className="absolute top-10 left-10 animate-float">
        <svg width="50" height="50" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="40" stroke="#ffffff" strokeWidth="5" />
        </svg>
      </div>

      <div className="absolute bottom-20 right-20 animate-float-reverse">
        <svg width="30" height="30" viewBox="0 0 100 100" fill="none">
          <polygon
            points="50,15 61,35 85,35 66,50 75,72 50,60 25,72 34,50 15,35 39,35"
            stroke="#ffffff"
            strokeWidth="5"
          />
        </svg>
      </div>
    </div>
  );
}
