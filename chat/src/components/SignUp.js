import React, {useState} from "react";
import InputField from "./InputField";
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'

const SignUp = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleSubmit = (event)=>{
        if(!password===confirmPassword){
            
        }
    }

  return (
    <div className="container">
      <div className="login">
      <h1>Registration</h1>
        <InputField inputLabel="Username" type="text" inputValue={username} updateInput={setUsername}/>
        <InputField inputLabel="E-mail" type="text" inputValue={email} updateInput={setEmail}/>
        <InputField inputLabel="Password" type="password" inputValue={password} updateInput={setPassword}/>
        <InputField inputLabel="Confirm Password" type="password" inputValue={confirmPassword} updateInput={setConfirmPassword}/>
        <Link to='/login'>Already have an account?</Link>
        <Button type='' className='mt-2' onClick={handleSubmit}>Create Account</Button>
      </div>
    </div>
  );
};

export default SignUp;
