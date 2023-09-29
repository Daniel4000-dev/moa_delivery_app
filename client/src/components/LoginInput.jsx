import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInOut } from "../animations";

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunction,
  Type,
  isSignup,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
    {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-sm rounded-md w-full px-4 py-2`}
    >
      {icon}
      <input
        type={Type}
        placeholder={placeholder}
        className={`w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none ${
          isFocus ? "shadow-md shadow-red-400" : "shadow-none"
        }`}
        value={inputState}
        onChange={(e) => inputStateFunction(e.target.value)}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
    </motion.div>
  );
};

export default LoginInput;
