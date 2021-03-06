import React from "react";
import { Container, Navbar as Nav, Nav as Link } from "react-bootstrap";
import { useHistory, Link as RouterLink } from "react-router-dom";

const Navbar = ({ setAuthorization, authorization, setUser , currentUser, currentUserQuery }) => {
  const history = useHistory();

  const handleLogout = async () => {
    setAuthorization("");
    setUser({});
    window.localStorage.clear();
    await currentUserQuery.client.resetStore()
    history.push("/");
  };

  //Links the user to the page where they can login.
  const handleLogin = () => {
    history.push("/");
  };

  return (
    <Nav bg="primary" variant="dark" expand="lg">
      <Container>
        <RouterLink to="/home" className="nav-brand">
          Messenger
        </RouterLink>
        <Nav.Toggle aria-controls="basic-navbar-nav" />
        <Nav.Collapse id="basic-navbar-nav">
          <Link>
            <RouterLink to="/home" className="nav-item">
              Home
            </RouterLink>
          </Link>
          <Link>
            <RouterLink to="/users" className="nav-item">
              Users
            </RouterLink>
          </Link>
          {currentUser ? (
            <div className="nav-text mx-auto">
              You are signed in as {currentUser.username}
            </div>
          ) : null}
          {authorization ? (
            <Link className="ms-auto">
              <Link.Link onClick={(event) => handleLogout(event)}>
                Log out
              </Link.Link>
            </Link>
          ) : (
            <Link className="ms-auto">
              <Link.Link onClick={() => handleLogin()}>Log in</Link.Link>
            </Link>
          )}
        </Nav.Collapse>
      </Container>
    </Nav>
  );
};

export default Navbar;
