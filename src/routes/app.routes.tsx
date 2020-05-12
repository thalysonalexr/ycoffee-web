import { RouteProps, RedirectProps } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';

export const AppRoutes: RouteProps[] = [
  { path: '/dashboard', component: Dashboard },
];

export const AppRedirects: RedirectProps[] = [
  { from: '/signin', to: '/dashboard' },
  { from: '/signup', to: '/dashboard' },
];

export default AppRoutes;
