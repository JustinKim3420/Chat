import React, {useState} from "react";
import InputField from "./InputField";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="login">
      <h1>Login</h1>
      <InputField inputLabel="Username" type="text" confirmPassword={username} updateInput={setUsername}/>
      <InputField inputLabel="Password" type="password" confirmPassword={password} updateInput={setPassword }/>
      <div className="mt-2">
        <Button type="submit" className="mx-4">
          Login
        </Button>
        <Button type="button" className="mx-4">
          <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
            Sign up
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Login;
