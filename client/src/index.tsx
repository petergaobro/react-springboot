import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Create a root.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);