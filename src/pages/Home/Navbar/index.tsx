import React from 'react';
import { Link } from 'react-router-dom';

import SocialNetwork from '../../../components/SocialNetwork';

import { useAuth } from '../../../contexts/auth';

import logo from '../../../assets/icons/logo.svg';
import avatar from '../../../assets/img/avatar.png';

import './styles.css';

const Navbar: React.FC = () => {
  const { signed, user } = useAuth();

  return (
    <nav className="navbar home shadow-box">
      <div className="wrapper">
        <Link
          to={{ pathname: '/' }}
          title="Ir para home Seu Café"
          className="wrapper-logo"
        >
          <img src={logo} alt="Logo do site Seu Café" className="logo-image" />
          <span className="logo-title shadow-text">Seu Café</span>
        </Link>
        <div className="wrapper-options">
          <SocialNetwork />
          {signed ? (
            <Link
              title="Ir para dashboard"
              className="user-logged"
              to={{ pathname: '/app' }}
            >
              {user?.avatar ? (
                <img
                  src={`${process.env.REACT_APP_API}/files/${user.avatar?.key}`}
                  alt="Avatar do usuário"
                  className="shadow-box"
                />
              ) : (
                <img
                  src={avatar}
                  alt="Avatar do usuário"
                  className="shadow-box"
                  style={{ padding: '5px' }}
                />
              )}
            </Link>
          ) : (
            <Link
              title="Entrar agora"
              className="btn-signin shadow-box"
              to={{ pathname: '/auth/signin' }}
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
