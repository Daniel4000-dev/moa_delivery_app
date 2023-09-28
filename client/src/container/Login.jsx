import React from 'react'
import { avatar, heroBg, loginBg, logo } from '../assets'

const Login = () => {
  return (
    <div className='w-screen h-screen relative overflow-hidden flex'>
        <img src={loginBg} className='object-cover absolute top-0 left-0 w-full h-full'/>


        <div className='flex flex-col items-center bg-cardOverlay w-[80%] md:w-508 h-full z-50 backdrop-blur-sm p-4 px-4 py-12 gap'>
            <div className='flex items-center justify-start gap-4 w-full'>
                <img src={logo} className='w-8' alt='' />
                <p className='text-headingColor font-semibold text-2xl'>City</p>
            </div>

            <p className='text-3xl font-semibold text-headingColor'>Welcome Back</p>
            <p className='text-xl text-textColor -mt-1'>Sign in with following</p>


            <div className='w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4'>

            </div>
        </div>


    </div>
  )
}

export default Login