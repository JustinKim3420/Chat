import React from "react";
import InputField from './InputField'
import './Login.css'

const Login = () => {
  return (
    <div className="login">
      <h1>Login</h1>
      <InputField inputLabel='Username' type='text'/>
      <InputField inputLabel='Password' type='password'/>
    </div>
  );
};

export default Login;
