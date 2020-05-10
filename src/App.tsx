import React from 'react';

import Footer from './components/Footer';
import Router from './router';

import './global.css';

const App: React.FC = () => (
  <>
    <Router />
    <Footer />
  </>
);

export default App;
