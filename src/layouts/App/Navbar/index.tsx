import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { useAlert } from '../../../contexts/alert';

import home from '../../../assets/icons/home.svg';
import turnoff from '../../../assets/icons/turnoff.svg';

import './styles.css';

interface Props {
  handleSignOut: () => void;
}

const Navbar: React.FC<Props> = ({ handleSignOut }) => {
  const { message, type } = useAlert();

  return (
    <nav className="navbar dashboard shadow-box">
      <div className="wrapper">
        <Link title="Ir para Home" to={{ pathname: '/' }} className="link">
          <img src={home} alt="Icone de Home" />
          Ínicio
        </Link>
        <button
          title="Fazer Logout"
          className="link btn-signout"
          onClick={handleSignOut}
        >
          <img src={turnoff} alt="Icone de power" />
          Sair
        </button>
      </div>
      <div
        style={
          message
            ? {
                opacity: 1,
                transition: 'opacity 0.5s linear',
              }
            : {
                opacity: 0,
                pointerEvents: 'none',
              }
        }
        className={classNames('shadow-box', 'alert', type)}
      >
        {message}
      </div>
    </nav>
  );
};

export default Navbar;
