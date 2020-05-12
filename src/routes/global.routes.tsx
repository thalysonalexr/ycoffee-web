import { RouteProps } from 'react-router-dom';

import Home from '../pages/Home';

export const GlobalRoutes: RouteProps[] = [
  { path: '/', exact: true, component: Home },
];

export default GlobalRoutes;
