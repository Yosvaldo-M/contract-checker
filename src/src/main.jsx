// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import ContractChecker from './ContractChecker.jsx';

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <ContractChecker />
  </React.StrictMode>
);
