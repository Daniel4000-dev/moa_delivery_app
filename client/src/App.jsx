import { getAuth } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {Route, Routes} from 'react-router-dom';
import { fadeInOut } from './animations';
import { validateUserJWTToken } from './api';
import { app } from './config/firebaseConfig';
import { motion } from 'framer-motion';
import { Login, Main } from './container';
import { setUserDetails } from './context/actions/userActions';
import { Alert, MainLoader } from './components';

function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setisLoading] = useState(false)

  const dispatch = useDispatch();
  useEffect(() => {
    setisLoading(true);
    firebaseAuth.onAuthStateChanged(cred => {
      if(cred) {
         cred.getIdToken().then(token => {
          validateUserJWTToken(token).then(data => {
            dispatch(setUserDetails(data))
          });
         })
      } else {
        navigate
      }
      setInterval(() => {
        setisLoading(false)
      }, 3000)
    });
  }, [])

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center bg-white">
        {isLoading && (
          <motion.div {...fadeInOut} className='fixed z-50 inset-0 bg-lightgray backdrop-blur-md flex items-center justify-center w-full'>
            <MainLoader />
          </motion.div>
        )}
        <Routes>
          <Route path='/*' element={<Main />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        <Alert type={''} message={'Hi there'} />
    </div>
  )
}

export default App
