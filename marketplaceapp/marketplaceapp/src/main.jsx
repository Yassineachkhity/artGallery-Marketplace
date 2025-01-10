// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RouterProvider } from 'react-router-dom';
import router from './router.jsx';
import { ContextProvider } from './context/ContextProvider.jsx';
import { ArtworkProvider } from './context/ArtworkContext.jsx'; // Import ArtworkProvider

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <ArtworkProvider> {/* Wrap with ArtworkProvider */}
        <RouterProvider router={router} />
      </ArtworkProvider>
    </ContextProvider>
  </StrictMode>,
);
