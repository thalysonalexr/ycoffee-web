import React, { useState, useEffect, useContext, createContext } from 'react';

import api, { registerUser, authenticate } from '../services/api-core';
import { User, UserAuth } from '../types/domain/User';

interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: User | null;
  signIn(email: string, password: string): Promise<void>;
  signUp(name: string, email: string, password: string): Promise<void>;
  signOut(): void;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const storageUser = localStorage.getItem("@ycoffee:user");
      const storageToken = localStorage.getItem("@ycoffee:token");

      if (storageUser && storageToken) {
        api.defaults.headers.Authorization = `Bearer ${storageToken}`;

        setUser(JSON.parse(storageUser));
        setLoading(false);
      }
    }

    loadStorageData();
  }, []);

  async function saveUserData(data: UserAuth) {
    api.defaults.headers.Authorization = `Bearer ${data.token}`;

    localStorage.setItem("@ycoffee:user", JSON.stringify(data.user));
    localStorage.setItem("@ycoffee:token", data.token);

    setUser(data.user);
  }

  async function signUp(name: string, email: string, password: string) {
    const { data } = await registerUser<UserAuth>(name, email, password);      
    await saveUserData(data);
  }

  async function signIn(email: string, password: string) {
    const { data } = await authenticate<UserAuth>(email, password);
    await saveUserData(data);
  }

  function signOut() {
    setUser(null);

    localStorage.removeItem("@ycoffee:user");
    localStorage.removeItem("@ycoffee:token");
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
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
