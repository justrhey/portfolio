import React from 'react';
import { createRoot } from 'react-dom/client';
import ProjectsPage from './ProjectsPage.jsx';
import './styles.css';
import './jumbotron.css';
import './work-showcase.css';
import './theme-green.css';
import './projects-page.css';

createRoot(document.getElementById('root')).render(<React.StrictMode><ProjectsPage /></React.StrictMode>);
