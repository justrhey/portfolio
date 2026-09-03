import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import SmoothScrollProvider from './SmoothScrollProvider.jsx';
import './styles.css';
import './jumbotron.css';
import './work-showcase.css';
import './theme-green.css';
createRoot(document.getElementById('root')).render(<React.StrictMode><SmoothScrollProvider><App /></SmoothScrollProvider></React.StrictMode>);
