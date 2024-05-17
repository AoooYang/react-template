import React from 'react';
import { createRoot } from 'react-dom/client';
import Logo from './logo.svg';
import './main.css';
function App() {
  let num = '11';
  return (
    <>
      <h2>hello world!111</h2>
      <Logo />
      <div className="text-3xl font-bold underline">tailwind</div>
    </>
  );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);
