import React, { useState, useEffect, useContext, createContext } from 'react';
import jwt from 'jwt-decode';
import moment from 'moment';

import api, {
  registerUser,
  authenticate,
  middlewareUnathourized,
} from '../services/api-core';
import { UserModel, UserAuth } from '../types/domain/User';

interface TokenDecoded {
  id: string;
  role: 'user' | 'admin';
  iat: number;
  exp: number;
}

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UserModel | null;
  messageExpired: string;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [loading, setLoading] = useState(false);
  const [messageExpired, setMessageExpired] = useState('');

  useEffect(() => {
    async function loadStorageData() {
      setLoading(true);

      const storageUser = localStorage.getItem('@ycoffee:user');
      const storageToken = localStorage.getItem('@ycoffee:token');

      if (storageUser && storageToken) {
        if (tokenIsExpired(storageToken)) {
          setMessageExpired('Sua sessão expirou');
          signOut();
        } else {
          api.defaults.headers.Authorization = `Bearer ${storageToken}`;
          setUser(JSON.parse(storageUser));
        }
      }

      setLoading(false);
    }

    loadStorageData();
    middlewareUnathourized(() => {
      setMessageExpired('Sua sessão expirou');
      signOut();
    });
  }, []);

  function tokenIsExpired(token: string) {
    const { exp } = jwt<TokenDecoded>(token);
    return moment().isAfter(moment.unix(exp)); // current date has passed the exp date
  }

  async function saveUserData(data: UserAuth) {
    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    localStorage.setItem('@ycoffee:user', JSON.stringify(data.user));
    localStorage.setItem('@ycoffee:token', data.token);

    setUser(data.user);
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      setLoading(true);
      const { data } = await registerUser<UserAuth>(name, email, password);
      await saveUserData(data);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setLoading(true);
      const { data } = await authenticate<UserAuth>(email, password);
      await saveUserData(data);
    } finally {
      setLoading(false);
    }
  }

  function signOut() {
    setUser(null);
    api.defaults.headers.Authorization = undefined;

    localStorage.removeItem('@ycoffee:user');
    localStorage.removeItem('@ycoffee:token');
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        messageExpired,
        loading,
        user,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
