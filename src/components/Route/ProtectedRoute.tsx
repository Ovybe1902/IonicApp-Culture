import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import Cookies from 'js-cookie';

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>; // You can replace 'any' with the specific props type if known
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = Cookies.get('userId') !== undefined; // Replace 'yourCookieName' with the actual name of your cookie

  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default ProtectedRoute;
