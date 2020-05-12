import React from 'react';
import { Link } from 'react-router-dom';

import SocialNetwork from '../SocialNetwork';

import logo from '../../assets/icons/logo.svg';

import './styles.css';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar shadow-box">
      <div className="wrapper">
        <Link
          to={{ pathname: '/' }}
          title="Ir para home Seu Café"
          className="wrapper-logo">
          <img
            src={logo}
            alt="Logo do site Seu Café"
            className="logo-image" />
          <span className="logo-title shadow-text">
            Seu Café
          </span>
        </Link>
        <div className="wrapper-options">
          <SocialNetwork />
          <Link
            title="Entrar agora"
            className="btn-signin shadow-box"
            to={{ pathname: '/signin' }}>Entrar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
