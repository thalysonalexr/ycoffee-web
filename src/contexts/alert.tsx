import React, { useContext, createContext, useState } from 'react';

interface Alert {
  type: string;
  message: string;
  hideAlert: (seconds: number) => void;
  setMessageAlert: (message: string, type: 'success' | 'danger') => void;
}

const AlertContext = createContext({} as Alert);

export const AlertProvider: React.FC = ({ children }) => {
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  function setMessageAlert(message: string, type: string = 'success') {
    setMessage(message);
    setType(type);
  }

  function setEmpty() {
    setMessageAlert('');
  }

  function hideAlert(seconds: number = 0) {
    setTimeout(() => setEmpty(), seconds);
  }

  return (
    <AlertContext.Provider
      value={{ message, setMessageAlert, hideAlert, type }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);
