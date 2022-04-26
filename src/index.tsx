import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './context/darkModeContext';
import './styles/global.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </React.StrictMode>
);