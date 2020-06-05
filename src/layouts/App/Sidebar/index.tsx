import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDashboard } from 'react-icons/ai';

import List from './List';

import logo from '../../../assets/icons/logo.svg';
import home from '../../../assets/icons/home-brown.svg';
import coffee from '../../../assets/icons/coffee-sm.svg';
import list from '../../../assets/icons/list.svg';
import addList from '../../../assets/icons/add-list.svg';
import iuser from '../../../assets/icons/user.svg';
import avatar from '../../../assets/img/avatar.png';
import arrowRight from '../../../assets/icons/arrow-right.svg';

import { useAuth } from '../../../contexts/auth';

import './styles.css';

const Sidebar: React.FC = () => {
  const { user } = useAuth();

  function wrapLastName(fullName: string) {
    const first = fullName.split(' ')[0];

    if (fullName.split(' ').length === 1) return first;

    const last = fullName.split(' ')[1];

    return `${first} ${last[0]}.`;
  }

  return (
    <aside className="sidebar shadow-box">
      <section title="Seu Café" className="wrapper-logo">
        <img src={logo} alt="Logo do site Seu Café" className="logo-image" />
        <span className="logo-title">Seu Café</span>
      </section>
      {user ? (
        <section className="user-logged">
          {user.avatar ? (
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
          <div className="user-info">
            <strong className="shadow-text">{wrapLastName(user.name)}</strong>
            <span className="shadow-text">{user.email}</span>
          </div>
        </section>
      ) : null}
      <section className="dashboard">
        <AiOutlineDashboard size={32} color="#412507" />
        <span>Dashboard</span>
      </section>
      <nav className="navbar">
        <ul className="navlist">
          <li>
            <Link title="Ir para Home" to={{ pathname: '/' }}>
              <div>
                <img src={home} alt="Icone de Home" />
              </div>
              <div>
                <span>Ínicio</span>
                <img
                  src={arrowRight}
                  alt="Icone de flecha para direita"
                  className="icon-arrow"
                />
              </div>
            </Link>
          </li>
          <li>
            <List
              title="Minhas receitas de café"
              toPath="/app/coffees"
              icon={coffee}
            >
              <li>
                <Link
                  title="Listar minhas receitas"
                  to={{ pathname: '/app/coffees' }}
                >
                  <img src={list} alt="Icone de lista" />
                  listar minhas receitas
                </Link>
              </li>
              <li>
                <Link
                  title="Cadastrar nova receita"
                  to={{ pathname: '/app/coffees/new' }}
                >
                  <img src={addList} alt="Icone de adicionar em lista" />
                  cadastrar nova receita
                </Link>
              </li>
            </List>
          </li>
          <li>
            <List
              title="Minhas informações"
              toPath="/app/account/me"
              icon={iuser}
            >
              <li>
                <Link
                  title="Alterar perfil"
                  to={{ pathname: '/app/account/me' }}
                >
                  <img src={iuser} alt="Icone de usuário" />
                  alterar perfil
                </Link>
              </li>
            </List>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
