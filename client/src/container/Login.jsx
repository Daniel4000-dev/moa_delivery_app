import React, { useState } from 'react'
import { LoginBg, Logo, } from '../assets'
import { LoginInput } from '../components';
import { motion } from 'framer-motion';
import {FaEnvelope, FaLock, } from '../assets/icons/index';
import { buttonClick } from '../animations';

const Login = () => {
  const [userEmail, setuserEmail] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [password, setpassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState();

  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        <img src={LoginBg} className='object-cover absolute top-0 left-0 w-full h-full'/>


        <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-50 backdrop-blur-sm p-4 px-4 py-12 gap'>
            <div className='flex items-center justify-start gap-4 w-full'>
                <img src={Logo} className='w-8' alt='' />
                <p className='text-headingColor font-semibold text-2xl'>City</p>
            </div>

            <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
            <p className='text-xl text-textColor -mt-1'>Sign in with following</p>


            <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>
              <LoginInput 
                placeholder={"Email Here"}
                icon={<FaEnvelope className='tex-xl text-textColor' />}
                inputState={userEmail}
                inputStateFunction={setuserEmail}
                type='email'
                setSignup={isSignup}
              /> 

                <LoginInput 
                placeholder={"Password Here"}
                icon={<FaLock className='tex-xl text-textColor' />}
                inputState={password}
                inputStateFunction={setpassword}
                type='password'
                setSignup={isSignup}
              /> 

              {isSignup && (
                <LoginInput 
                placeholder={"Confirm Password Here"}
                icon={<FaEnvelope className='tex-xl text-textColor' />}
                inputState={confirmPassword}
                inputStateFunction={setConfirmPassword}
                type='password'
                setSignup={isSignup}
              /> 
              )}
              
              {!isSignup ? (<p>Doesn't have an account? <motion.button {...buttonClick}>Create one</motion.button></p>)
               :
               (<p> Already have an account</p>)
               }
            </div>
        </div>


    </div>
  )
}

export default Login