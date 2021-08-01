import React, { useState } from "react";
import InputField from "./InputField";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { CREATE_USER } from "../mutations";
import { useMutation } from "@apollo/client";

const SignUp = ({ notify }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [createUser, createdUser] = useMutation(CREATE_USER);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!username) {
      notify("Please enter a username", "danger");
      return null;
    }
    if (!email) {
      notify("Please enter an email", "danger");
      return null;
    }
    if (!password) {
      notify("Please enter a password", "danger");
      return null;
    }
    if (!confirmPassword) {
      notify("Please confirm your password", "danger");
      return null;
    }
    if (confirmPassword !== password) {
      notify("Password and confirm password do not match", "danger");
      return null;
    }

    createUser({
      variables: { username: username, password: password, email: email },
    });

    history.push("/login");
    notify(`Successfully create an account with email ${email}`, "success");
  };

  return (
    <div className="container">
      <div className="login">
        <h1>Registration</h1>
        <InputField
          inputLabel="Username"
          type="text"
          inputValue={username}
          updateInput={setUsername}
        />
        <InputField
          inputLabel="E-mail"
          type="text"
          inputValue={email}
          updateInput={setEmail}
        />
        <InputField
          inputLabel="Password"
          type="password"
          inputValue={password}
          updateInput={setPassword}
        />
        <InputField
          inputLabel="Confirm Password"
          type="password"
          inputValue={confirmPassword}
          updateInput={setConfirmPassword}
        />
        <Link to="/login">Already have an account?</Link>
        <Button type="" className="mt-2" onClick={handleSubmit}>
          Create Account
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
