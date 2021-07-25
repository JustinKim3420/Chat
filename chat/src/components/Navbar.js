import React from "react";
import {
  Container,
  Navbar as Nav,
  Nav as Link,
} from "react-bootstrap";

const Navbar = () => {
  return (
    <Nav bg="primary" variant="dark" expand="lg">
      <Container>
        <Nav.Brand href="#home">Messenger</Nav.Brand>
        <Nav.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Collapse id="basic-navbar-nav">
          <Link className="me-auto">
            <Link.Link href="#home">Home</Link.Link>
          </Link>
        </Nav.Collapse>
      </Container>
    </Nav>
  );
};

export default Navbar;
