import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js');
  });
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
