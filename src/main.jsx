import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { DateProvider } from './contexts/DateContext';
import './styles/reset.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <DateProvider>
                <App />
            </DateProvider>
        </BrowserRouter>
    </StrictMode>,
);
