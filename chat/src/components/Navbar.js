import React from "react";
import { Container, Navbar as Nav , Nav as Link } from "react-bootstrap";

const Navbar = () => {
  return (
      <Nav bg="primary" variant='dark'>
        <Container>
          <Nav.Brand href="#home">Messenger</Nav.Brand>
        </Container>
      </Nav>
  );
};

export default Navbar;
