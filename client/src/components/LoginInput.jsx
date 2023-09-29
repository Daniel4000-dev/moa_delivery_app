import { useState } from "react"

const   LoginInput = ({placeholder, icon, inputState, inputStateFunction, Type, isSignup}) => {
    const [isFocus, setIsFocus] = useState(false)

    return (
        <div className={`flex items-center justify-center gap-4 bg-cardOverlay backdrop-blur-sm rounded-md w-full px-4 py-2`}>
            {icon}
            <input type={Type} placeholder={placeholder} className={`w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none ${isFocus ? "shadow-md shadow-red-400" : "shadow-none"}`}
                value={inputState}
                onChange={(e) => inputStateFunction(e.target.value)}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </div>
    )
}

export default LoginInput