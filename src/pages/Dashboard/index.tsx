import React from 'react';

import { useAuth } from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }

  return (
    <span>
      Hello World!
      <button onClick={handleSignOut}>Sair</button>
    </span>
  );
};

export default Dashboard;
