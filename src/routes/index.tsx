import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import { GlobalRoutes } from './global.routes';

import AppLayout from '../layouts/App';
import AuthLayout from '../layouts/Auth';

import NotFound from '../components/NotFound';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <BrowserRouter>
      <Switch>
        {GlobalRoutes.map((props, index) => (
          <Route key={index} {...props} />
        ))}
        {signed
          ? [
              <Route key={0} path="/app" component={AppLayout} />,
              <Redirect key={1} from="/auth" to="/app" />,
            ]
          : [
              <Route key={0} path="/auth" component={AuthLayout} />,
              <Redirect key={1} from="/app" to="/auth" />,
            ]}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
