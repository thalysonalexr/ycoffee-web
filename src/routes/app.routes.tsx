import React from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

import NewCoffee from '../pages/NewCoffee';
import ListCoffees from '../pages/ListCoffees';
import EditCoffee from '../pages/EditCoffee';
import EditAccount from '../pages/EditAccount';

const AppRoutes: React.FC = () => (
  <>
    <Route path="/app/coffees" exact component={ListCoffees} />
    <Route path="/app/coffees/new" exact component={NewCoffee} />
    <Route path="/app/coffees/edit/:id" exact component={EditCoffee} />
    <Route path="/app/account/me" exact component={EditAccount} />
    <Redirect from="/app" exact to="/app/coffees" />
  </>
);

export default withRouter(AppRoutes);
