import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactComponent as Logo } from './logo.svg';
import './main.css';
function App() {
  return (
    <div className="container">
      <Logo style={{ width: '300px' }} />
      <div className="text-3xl text-blue-500">welcome to use FTA-React-CLI</div>
    </div>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
