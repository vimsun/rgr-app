// src/components/NavBar.js

import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Button, Navbar, Nav} from 'react-bootstrap';
import { Link } from "react-router-dom";

const NavBar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return(
    <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {isAuthenticated && user && user.email === "admin@gmail.com" && (
            <Nav className="mr-auto">
                <Link className="link-css" to="/">Home</Link>&nbsp;
                <Link className="link-css" to="/concert">Concert</Link>&nbsp;
                <Link className="link-css" to="/statistics">Statistics</Link>
            </Nav>
            )}
            {!isAuthenticated && (
            <Button variant="outline-info" onClick={() => loginWithRedirect({})}>Log in</Button>
            )}

            {isAuthenticated && <Button variant="outline-info" onClick={() => logout()}>Log out</Button>}

        </Navbar.Collapse>
    </Navbar>
);
};

export default NavBar;