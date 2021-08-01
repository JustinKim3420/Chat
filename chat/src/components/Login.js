import React, { useState } from "react";
import InputField from "./InputField";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = ({ notify, login }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      notify("Please enter a username", "danger");
      return null;
    }
    if (!password) {
      notify("Please enter a password", "danger");
      return null;
    }
    login({ variables: { username, password } });
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <form className='login-form' onSubmit={(event)=>handleSubmit(event)}>
        <InputField
          inputLabel="Username"
          type="text"
          confirmPassword={username}
          updateInput={setUsername}
        />
        <InputField
          inputLabel="Password"
          type="password"
          confirmPassword={password}
          updateInput={setPassword}
        />
        <div className="mt-2">
          <Button type="submit" className="mx-4">
            Login
          </Button>
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            <Button type="button" className="mx-4">
              Sign up
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
