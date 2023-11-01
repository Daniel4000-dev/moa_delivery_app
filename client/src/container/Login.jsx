import React, { useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons/index";
import { buttonClick } from "../animations";
import {useNavigate} from 'react-router-dom';
import { getFunctions } from 'firebase/functions';


import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from "../config/firebaseConfig";
import { setAdminRoleOnServer, validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { alertInfo, alertNull, alertWarning } from "../context/actions/alertActions";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState('');

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector( state => state.user );
  const alert = useSelector((state) => state.alert); 

  // useEffect(() => {
  //    if(user) {
  //     navigate('/', { replace: true });
  //    }
  // }, [user]);

  const loginWithGoogle = async () => {
    try {
      // Sign in with Google
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;
      const uid = user.uid;
  
      // Call your server to set the "admin" claim
      await setAdminRoleOnServer(uid);
  
      // Get the user's ID token
      const idToken = await user.getIdToken();
  
      // Validate the user's JWT token and get user data
      const data = await validateUserJWTToken(idToken);
  
      console.log(data);
  
      if (data && data.admin === true) {
        console.log('User is an admin');
        // User is an admin: handle this case as needed
        // dispatch(setUserDetails(data));
        navigate('/', { replace: true });
      } else {
        // User is not an admin: handle this case as needed
        console.log('User is not an admin.');
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      // Handle sign-in error
    }
  };
  
  

  const signUpWithEmailPass = async () => {
    if (!userEmail || !password || !confirmPassword) {
      dispatch(alertInfo('Required fields should not be empty'));
      return;
    }
  
    if (password !== confirmPassword) {
      dispatch(alertWarning('Password does not match'));
      setInterval(() => {
        dispatch(alertNull());
      }, 3000);
      return;
    }
  
    try {
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, userEmail, password);
      const user = userCred.user;
      const uid = user.uid;
  
      // Make an API call to your server to set the "admin" claim
      await setAdminRoleOnServer(uid);
  
      const token = await user.getIdToken();
      const data = await validateUserJWTToken(token);
      console.log(data);
  
      if (data && data.admin === true) {
        console.log('is an admin');
        // User is an admin: handle this case as needed
        // dispatch(setUserDetails(data));
        // navigate('/', { replace: true });
      } else {
        // User is not an admin: handle this case as needed
        console.log('User is not an admin.');
      }
    } catch (error) {
      console.error('Sign-up error:', error);
      // Handle sign-up error
    }
  };
  

  const signInWithEmailPass = async () => {
    if (!userEmail || !password) {
      dispatch(alertWarning('Email and password are required'));
      return;
    }
  
    try {
      const userCred = await signInWithEmailAndPassword(firebaseAuth, userEmail, password);
      const user = userCred.user;
      const uid = user.uid;
  
      // Make an API call to your server to set the "admin" claim
      await setAdminRoleOnServer(uid);
  
      const token = await user.getIdToken();
      const data = await validateUserJWTToken(token);
      console.log(token)
  
      if (data && data.admin === true) {
        console.log(data)
        // User is an admin
        // dispatch(setUserDetails(data));
        // navigate('/', { replace: true });
        console.log('is an admin')
      } else {
        // User is not an admin: handle this case as needed
        console.log('User is not an admin.');
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      // Handle sign-in error
    }
  };
  

  

  return (
    <div className="w-screen h-screen relative overflow-hidden flex">
      <img
        src={LoginBg}
        className="object-cover absolute top-0 left-0 w-full h-full"
      />

      <div className="flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-50 backdrop-blur-sm p-4 px-4 py-12 gap">
        <div className="flex items-center justify-start gap-4 w-full">
          <img src={Logo} className="w-8" alt="" />
          <p className="text-headingColor font-semibold text-2xl">City</p>
        </div>

        <p className="text-3xl font-semibold text-headingColor">Welcome Back</p>
        <p className="text-xl text-textColor -mt-1">
          {isSignup ? "Sign Up" : "Sign In"} with following
        </p>

        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
          <LoginInput
            placeholder={"Email Here"}
            icon={<FaEnvelope className="tex-xl text-textColor" />}
            inputState={userEmail}
            inputStateFunction={setuserEmail}
            type="email"
            setSignup={isSignup}
          />

          <LoginInput
            placeholder={"Password Here"}
            icon={<FaLock className="tex-xl text-textColor" />}
            inputState={password}
            inputStateFunction={setpassword}
            type="password"
            setSignup={isSignup}
          />

          {isSignup && (
            <LoginInput
              placeholder={"Confirm Password Here"}
              icon={<FaEnvelope className="tex-xl text-textColor" />}
              inputState={confirmPassword}
              inputStateFunction={setConfirmPassword}
              type="password"
              setSignup={isSignup}
            />
          )}

          {!isSignup ? (
            <p>
              Doesn't have an account?{" "}
              <motion.button
                {...buttonClick}
                onClick={() => setIsSignup(true)}
                className="text-red-400 underline cursor-pointer bg-transparent"
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <motion.button
                {...buttonClick}
                onClick={() => setIsSignup(false)}
                className="text-red-400 underline cursor-pointer bg-transparent"
              >
                Create one
              </motion.button>
            </p>
          )}

          {isSignup ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick = {signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Sign In
            </motion.button>
          )}
        </div>

        <div className="flex items-center justify-between gap-16">
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-24 h-[1px] rounded-md bg-white"></div>
        </div>

        <motion.div
          {...buttonClick}
          onClick={loginWithGoogle}
          className="flex items-center justify-center px-20 py-2 bg-cardOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
        >
          <FcGoogle className="text-3xl" />
          <p className="capitalize text-base text-headingColor ">
            Signin with Google
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
