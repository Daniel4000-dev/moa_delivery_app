import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { fadeInOut } from "./animations";
import { getAllCartItems, validateUserJWTToken } from "./api";
import { app } from "./config/firebaseConfig";
import { motion } from "framer-motion";
import { Dashboard, Login, Main } from "./container";
import { setUserDetails } from "./context/actions/userActions";
import { Alert, MainLoader } from "./components";
import { setCartItems } from "./context/actions/cartActions";

function App() {
  const firebaseAuth = getAuth(app);
  const [isLoading, setisLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const isAdmin = user && user.admin === true;

  useEffect(() => {
    setisLoading(true);
    firebaseAuth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateUserJWTToken(token).then((data) => {
            if (data) {
              getAllCartItems(data.user_id).then((items) => {
                dispatch(setCartItems(items));
              });
            }
            dispatch(setUserDetails(data));
          });
        });
      } else {
        console.log("oops");
      }
      setInterval(() => {
        setisLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center bg-white">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className="fixed z-50 inset-0 bg-lightgray backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        {isAdmin ? (
          <Route path="/dashboard/*" element={<Dashboard />} />
         ) : ( 
          <Route path="/login" element={<Navigate replace={true} />} />
         )}
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
}

export default App;
