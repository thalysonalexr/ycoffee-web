import React from 'react';

import { AuthProvider } from './contexts/auth';

import Routes from './routes';

import './global.css';

const App: React.FC = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;
