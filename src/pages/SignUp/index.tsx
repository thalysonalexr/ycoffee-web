import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltLeft } from 'react-icons/fa';

import { useAuth } from '../../contexts/auth';

import user from '../../assets/icons/user.svg';
import eyes from '../../assets/icons/eyes.svg';
import locks from '../../assets/icons/locks.svg';
import signAt from '../../assets/icons/signat.svg';

import '../sign.css';
import './styles.css';

const SignUp: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passw, setPassw] = useState('');
  const [error, setError] = useState('');

  const inputPassw = useRef({} as HTMLInputElement);

  const { signUp } = useAuth();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();

    const empty = [name, email, passw].some(input => input.length === 0);

    if (empty) {
      setError('Preencha todos os campos.');
      return;
    };

    try {
      await signUp(name, email, passw);
    } catch({ response: { status } }) {
      status === 422
        ? setError('E-mail já em uso por outra conta.')
        : setError('As informações inseridas estão incorretas.');
    }
  }

  return (
    <main className="sign up">
      <div className="wrapper shadow-box">
        <div className="wrapper-nav">
          <Link title="Ir para página inicial" to={{ pathname: '/' }}>
            <FaLongArrowAltLeft size={16} color="#412507" />
            voltar a Home
          </Link>
        </div>
        <div className="wrapper-form">
          <form onSubmit={handleSignUp}>
            <legend>
              <strong>Criar sua conta</strong>
            </legend>
            {error
              ? (<span className="error-message">
                  {error}
                </span>)
              : null}
            <div className="wrapper-input">
              <label htmlFor="name">
                <img src={user} alt="Icone de usuário"/>
              </label>
              <input
                id="name"
                required
                autoFocus
                type="text"
                maxLength={255}
                title="Insira seu nome completo"
                placeholder="digitar nome completo"
                onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="wrapper-input">
              <label htmlFor="email">
                <img src={signAt} alt="Icone de arroba"/>
              </label>
              <input
                id="email"
                required
                type="email"
                maxLength={100}
                title="Insira seu endereço de e-mail"
                placeholder="digitar endereço de e-mail"
                onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="wrapper-input">
              <label htmlFor="passw">
                <img src={locks} alt="Icone de cadeado"/>
              </label>
              <input
                id="passw"
                required
                ref={inputPassw}
                type="password"
                minLength={5}
                maxLength={255}
                title="Insira uma senha segura com no minímo 5 caracteres"
                placeholder="criar senha"
                onChange={(e) => setPassw(e.target.value)} />
              <button
                onClick={(e) => {
                  inputPassw.current.type === 'text'
                    ? inputPassw.current.type = 'password'
                    : inputPassw.current.type = 'text';
                }}
                type="button"
                title="Ver senha"
                className="view-password">
                <img src={eyes} alt="Icone de olho"/>
              </button>
            </div>
            <span className="info-terms">
              Ao me inscrever concordo com os&nbsp;
              <Link to={{ pathname: '/' }}>Termos de Serviço do Seu Café</Link>
              &nbsp;e concordo com a <Link to={{ pathname: '/' }}>Política de Privacidade</Link>.
            </span>
            <button
              type="submit"
              className="shadow-box">
              registre-se
            </button>
          </form>
          <hr />
          <span>
            <Link title="Fazer login agora" to={{ pathname: '/signin' }}>
              Já tem conta? Entrar
            </Link>
          </span>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
