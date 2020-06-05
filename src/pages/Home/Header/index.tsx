import React from 'react';

import './styles.css';

const Header: React.FC = () => (
  <header className="welcome">
    <div className="wrapper">
      <h1 className="title shadow-text">
        Receitas <em>delíciosas</em> e <em>práticas</em> para você amante de{' '}
        <em>café!</em>
      </h1>
    </div>
  </header>
);

export default Header;
