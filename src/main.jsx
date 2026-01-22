import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'leaflet/dist/leaflet.css';

import { RouterProvider } from "react-router/dom";
import { router } from './router/router.jsx';
import AuthProvider from './context/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist'>
      <QueryClientProvider client={queryClient }>
        <AuthProvider>
          <Toaster position="top-right" />
          <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
          
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>,
)
