import React from 'react';

import AppRoutes from '../../routes/app.routes';

import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Loading from '../../components/Loading';

import { useAuth } from '../../contexts/auth';
import { AlertProvider } from '../../contexts/alert';
import { UploadProvider } from '../../contexts/upload';

import './styles.css';

const App: React.FC = () => {
  const { loading, signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <>
      <Loading loading={loading} />
      <main className="app">
        <Sidebar />
        <AlertProvider>
          <div className="wrapper-app">
            <Navbar handleSignOut={handleSignOut} />
            <div className="wrapper-routes">
              <UploadProvider>
                <AppRoutes />
              </UploadProvider>
            </div>
          </div>
        </AlertProvider>
      </main>
    </>
  );
};

export default App;
