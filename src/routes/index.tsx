import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { useAuth } from '../contexts/auth';

import { GlobalRoutes } from './global.routes';
import { AppRoutes, AppRedirects } from './app.routes';
import { AuthRoutes, AuthRedirects } from './auth.routes';

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
              ...AppRoutes.map((props, index) => (
                <Route key={index} {...props} />
              )),
              ...AppRedirects.map((props, index) => (
                <Redirect key={index} {...props} />
              )),
            ]
          : [
              ...AuthRoutes.map((props, index) => (
                <Route key={index} {...props} />
              )),
              ...AuthRedirects.map((props, index) => (
                <Redirect key={index} {...props} />
              )),
            ]}
        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
