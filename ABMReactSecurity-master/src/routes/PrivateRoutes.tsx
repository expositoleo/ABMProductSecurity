import * as React from 'react';
import { Navigate } from 'react-router-dom';

import useIsLoggedIn from '../hooks/useIsLoggedIn';

type PrivateRouteProps = {
  element: React.ReactNode;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  // Utils
  const isLoggedIn: boolean = useIsLoggedIn();

  // Render
  if (isLoggedIn) {
    return element;
  }

  //El Navigate te indica a donde te vas a dirigir una vez que te logees
  return <Navigate to="/login" />;
};

export default PrivateRoute;