import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const AuthRoutes: React.FC = (props) => (
  <>
    <Route path="/auth/signin" exact component={SignIn} />
    <Route path="/auth/signup" exact component={SignUp} />
    <Redirect from="/auth" exact to="/auth/signin" />
  </>
);

export default withRouter(AuthRoutes);
