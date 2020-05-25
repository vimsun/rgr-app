// src/components/PrivateRoute.js

import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";

const PrivateRoute = ({ component: Component, path, ...rest }) => {
  const { loading, isAuthenticated, loginWithRedirect, user} = useAuth0();

  useEffect(() => {
    if (loading || isAuthenticated) {
      return;
    }
    const fn = async () => {
      await loginWithRedirect({
        appState: {targetUrl: window.location.pathname}
      });
    };
    fn();
  }, [loading, isAuthenticated, loginWithRedirect, path]);

  if(isAuthenticated === true && user){
      const render = props =>
      (user.email === "admin@gmail.com") ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
  }
  else
  return <Route path={path} render={null} {...rest} />;
};

export default PrivateRoute;