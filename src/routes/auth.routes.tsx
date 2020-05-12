import { RouteProps, RedirectProps } from 'react-router-dom';

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export const AuthRoutes: RouteProps[] = [
  { path: '/signin', component: SignIn },
  { path: '/signup', component: SignUp },
];

export const AuthRedirects: RedirectProps[] = [
  { from: '/dashboard', to: '/signin' }
];

export default AuthRoutes;
