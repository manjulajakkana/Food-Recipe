import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';

// CSS files
import './index.css';
import './styles/global.css';
import './styles/admin.css';

// Render React application
createRoot(document.getElementById('root')).render(
    <StrictMode>
        <App />
    </StrictMode>
);