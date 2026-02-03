import React, { useState } from 'react'
import { LoginContext } from '../context/Context'


export default function LoginProvider({ children }: { children: React.ReactNode }) {
    const [loggedin, setLoggedIn] = useState(() => {
        const stored = localStorage.getItem("loggedin")
        return stored === "true" ? true : false
    })

    function toggleLogin(choice?: boolean) {
        const newState = typeof choice === "boolean" ? choice : !loggedin
        setLoggedIn(newState)
        localStorage.setItem("loggedin", newState.toString()) // persist
    }

    return (
        <LoginContext.Provider value={{ loggedin, toggleLogin }}>
            {children}
        </LoginContext.Provider>
    )
}