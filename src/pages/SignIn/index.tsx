import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from 'react-icons/fa';

import Loading from '../../components/Loading';

import { useAuth } from '../../contexts/auth';

import locks from '../../assets/icons/locks.svg';
import signAt from '../../assets/icons/signat.svg';
import signin from '../../assets/img/user-signin.webp';

import './styles.css';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [error, setError] = useState('');

  const { signIn, loading, messageExpired } = useAuth();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();

    const empty = [email, passw].some((input) => input.length === 0);

    if (empty) {
      setError('Preencha todos os campos.');
      return;
    }

    try {
      await signIn(email, passw);
    } catch ({ response: { status } }) {
      status === 401
        ? setError('Suas credenciais estão incorretas.')
        : setError('Sistema indisponível. Tente mais tarde.');
    }
  }

  useEffect(() => {
    if (messageExpired) setError(messageExpired);
  }, [messageExpired]);

  return (
    <>
      <Loading loading={loading} />
      <div className="wrapper shadow-box">
        <div className="wrapper-nav">
          <Link title="Ir para página inicial" to={{ pathname: '/' }}>
            <FaLongArrowAltLeft size={16} color="#412507" />
            voltar a Home
          </Link>
        </div>
        {error ? <span className="error-message">{error}</span> : null}
        <div className="wrapper-content">
          <div className="wrapper-image">
            <img src={signin} alt="Login de usuário" />
          </div>
          <div className="wrapper-form">
            <form onSubmit={handleSignIn}>
              <legend>
                <strong>faça login</strong>
              </legend>
              <div className="wrapper-input">
                <label htmlFor="email">
                  <img src={signAt} alt="Icone de arroba" />
                </label>
                <input
                  id="email"
                  required
                  autoFocus
                  type="email"
                  maxLength={100}
                  title="Insira seu endereço de e-mail"
                  placeholder="endereço de e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="wrapper-input">
                <label htmlFor="passw">
                  <img src={locks} alt="Icone de cadeado" />
                </label>
                <input
                  id="passw"
                  required
                  type="password"
                  maxLength={255}
                  title="Insira sua senha"
                  placeholder="sua senha"
                  onChange={(e) => setPassw(e.target.value)}
                />
              </div>
              <button type="submit" className="shadow-box">
                entrar
              </button>
            </form>
            <span>
              <Link
                title="Registrar-se agora"
                to={{ pathname: '/auth/signup' }}
              >
                Cadastre-se agora
                <FaLongArrowAltRight size={16} color="#412507" />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
