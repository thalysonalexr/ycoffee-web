import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/pt-br';

import { useAuth } from '../../contexts/auth';
import { useAlert } from '../../contexts/alert';
import { useUpload } from '../../contexts/upload';

import Loading from '../../components/Loading';
import Upload from '../../components/Upload';
import FileInfo from '../../components/FileInfo';

import user from '../../assets/icons/user.svg';
import trash from '../../assets/icons/trash-white.svg';
import locks from '../../assets/icons/locks.svg';
import signAt from '../../assets/icons/signat.svg';
import eyes from '../../assets/icons/eyes.svg';

import {
  getUserAccount,
  destroyUserAccount,
  updateUserAccount,
} from '../../services/api-core';
import { UserModel } from '../../types/domain/User';

import './styles.css';

const EditAccount: React.FC = () => {
  const history = useHistory();
  const inputPassw = useRef({} as HTMLInputElement);

  const { setMessageAlert, hideAlert } = useAlert();
  const { signIn, signOut } = useAuth();
  const {
    uploadedFile,
    handleUpload,
    processUploadUser,
    cleanupUploadFile,
  } = useUpload();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createdAt, setCreatedAt] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  async function handleUpdateAccount(e: FormEvent) {
    e.preventDefault();

    setIsLoading(true);

    try {
      const {
        data: { user },
      } = await updateUserAccount<{ user: UserModel }>({
        name,
        email,
        password,
      });

      if (uploadedFile) {
        processUploadUser(uploadedFile.file);

        if (uploadedFile.error) {
          setMessageAlert(
            'Ocorreu um erro ao fazer upload da imagem',
            'danger'
          );
        }
      }

      setTimeout(async () => await signIn(user.email, password), 5000);

      setMessageAlert('Alterações salvas com sucesso', 'success');
      hideAlert(3000);
    } catch ({ response: { status } }) {
      status === 400
        ? setMessageAlert(
            'As informações inseridas estão incorretas.',
            'danger'
          )
        : setMessageAlert('Erro aoatualizar informações.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDestroyAccount() {
    setIsLoading(true);

    try {
      await destroyUserAccount();

      setTimeout(() => {
        hideAlert(0);
        setIsLoading(false);
        signOut();
        history.push('/');
      }, 2000);
    } catch {
      setMessageAlert('Erro ao excluir conta', 'danger');
      hideAlert(3000);
    }
  }

  useEffect(() => {
    setIsLoading(true);

    async function handleGetUserAccount() {
      return await getUserAccount<{ user: UserModel }>();
    }

    handleGetUserAccount()
      .then(({ data: { user } }) => {
        setName(user.name);
        setEmail(user.email);
        setCreatedAt(user.createdAt);

        if (user.avatar) {
          const { avatar } = user;
          const urlImage = `${process.env.REACT_APP_API}/files/${avatar.key}`;

          axios.get(urlImage, { responseType: 'blob' }).then(({ data }) => {
            const file = new File([data], avatar.name);
            handleUpload([file]);
          });
        }
      })
      .catch(() => signOut())
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => cleanupUploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="edit-account shadow-box">
      <Loading loading={isLoading} />
      <form onSubmit={handleUpdateAccount}>
        <div className="header">
          <legend>
            <strong>Minhas informações</strong>
            <img src={user} alt="Icone de usuário" />
          </legend>
          <button
            onClick={() => handleDestroyAccount()}
            type="button"
            title="Excluir minha conta"
            className="remove shadow-box"
          >
            <img src={trash} alt="Icone de lixeira" />
          </button>
        </div>
        <div className="wrapper">
          <label htmlFor="name">Meu nome</label>
          <div className="wrapper-input">
            <input
              id="name"
              required
              autoFocus
              type="text"
              value={name}
              maxLength={255}
              title="Insira seu nome completo"
              placeholder="Ex: John Stewartt"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <label>Minhas credenciais</label>
          <div className="credentials">
            <div className="wrapper-input">
              <label htmlFor="email">
                <img src={signAt} alt="Icone de arroba" />
              </label>
              <input
                id="email"
                required
                type="email"
                value={email}
                maxLength={100}
                title="Insira seu endereço e e-mail"
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
                value={password}
                maxLength={255}
                ref={inputPassw}
                title="Insira sua senha"
                placeholder="sua senha"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                onClick={() => {
                  inputPassw.current.type === 'text'
                    ? (inputPassw.current.type = 'password')
                    : (inputPassw.current.type = 'text');
                }}
                type="button"
                title="Ver senha"
                className="view-password"
              >
                <img src={eyes} alt="Icone de olho" />
              </button>
            </div>
          </div>
          <div className="upload-image">
            <label>Minha foto de perfil</label>
            <Upload />
            <FileInfo />
          </div>
          <div className="submit-form">
            <span className="since">
              Usuário(a) desde&nbsp;
              <Moment format="DD MMM YYYY" date={createdAt} />
            </span>
            <button className="shadow-box" type="submit">
              salvar alterações
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default EditAccount;
