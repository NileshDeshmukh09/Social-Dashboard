import React, { useState, useRef } from 'react';
import '../assets/login.css';
import { SWIFT_LOGO } from '../constants';
import { Input, InputRef } from 'antd';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firbase';
import Header from '../Components/Header';


const Login: React.FC = () => {

  const email = useRef<InputRef>(null);
  const password = useRef<InputRef>(null);
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | boolean>(false);

  const validateData = (inputEmail: string, inputPassword: string): boolean | string => {

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const checkEmail = emailRegex.test(inputEmail);

    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    const checkPassword = passwordRegex.test(inputPassword);


    if (!checkEmail) return "Email is Not Valid";
    if (!checkPassword) return "Password is Not Valid";


    return false;
  };

  const handleButtonClick = () => {
    if ((email.current && email.current.input) && (password.current && password.current.input)) {
      const inputEmail = email.current.input.value;
      const inputPassword = password.current.input.value;
      let message: string | boolean = validateData(inputEmail, inputPassword);
      setErrorMessage(message);

      if (message) return;

      if (!isSignIn) {
        // Logic for sign-up
        createUserWithEmailAndPassword(auth, inputEmail, inputPassword)
          .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
           console.log(user)
            // ...
     
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            if( errorMessage.includes("email-already-in-use")) {
              setErrorMessage("Email Already In Use");
            }
            // ..
          });

      } else {
        // Logic for sign-in
        signInWithEmailAndPassword(auth, inputEmail, inputPassword)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)

  })
  .catch((error) => {
    // const errorCode = error.code;
    const errorMessage = error.message;
    if( errorMessage.includes("user-not-found")) {
      setErrorMessage("User Not Found!");
    }else
    setErrorMessage("Something went wrong");
  });
      }


    }
  };

  return (
    <>
    <Header isSignIn={false}/>
    <div className='main-div'>
      <form onSubmit={(e) => e.preventDefault()} className="login-div">
        <img src={SWIFT_LOGO} alt="swift-logo" className='swift-logo' /> 

        { !isSignIn && <h1>Sign Up</h1>}
        <Input
          ref={email}
          placeholder="Email"
          className='search-input'
        />

        <Input
          ref={password}
          type='password'
          placeholder="User@123"
          className='search-input'
        />
        <p className="error-message">{errorMessage}</p>
        <button className='Login-btn' onClick={handleButtonClick}>
          { isSignIn ? "Login" : 'Create Account' }
        </button>

        <p>  { isSignIn ? "Don't have an account? " : 'Already A User? '} 
          <span onClick={() => setIsSignIn(!isSignIn)}>{isSignIn ? 'Sign Up' : 'Sign In'}</span>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
