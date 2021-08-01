import { useApolloClient } from "@apollo/client";
import React, { useEffect } from "react";
import { Container, Navbar as Nav, Nav as Link } from "react-bootstrap";
import {useHistory} from 'react-router-dom'

const Navbar = ({ setAuthorization, authorization }) => {
  const client = useApolloClient();
  const history= useHistory();

  const handleLogout = () => {
    setAuthorization('')
    localStorage.clear();
    client.resetStore();
    history.push('/')
  };

  const handleLogin = () => {
    history.push('/')
  };

  useEffect(() => {
    console.log(authorization);
  }, [authorization]);

  return (
    <Nav bg="primary" variant="dark" expand="lg">
      <Container>
        <Nav.Brand href="#home">Messenger</Nav.Brand>
        <Nav.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Collapse id="basic-navbar-nav">
          <Link className="me-auto">
            <Link.Link href="#home">Home</Link.Link>
          </Link>
          {authorization ? (
            <Link className="ms-auto">
              <Link.Link onClick={(event) => handleLogout(event)}>
                Log out
              </Link.Link>
            </Link>
          ) : (
            <Link className="ms-auto">
              <Link.Link onClick={() => handleLogin()}>
                Log in
              </Link.Link>
            </Link>
          )}
        </Nav.Collapse>
      </Container>
    </Nav>
  );
};

export default Navbar;
