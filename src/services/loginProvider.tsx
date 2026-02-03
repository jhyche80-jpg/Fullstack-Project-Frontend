import React, { useState } from 'react'
import { LoginContext } from '../context/Context'

export default function LoginProvider({ children }: { children: React.ReactNode }) {
    const [loggedin, setLoggedIn] = useState(false)
    function toggleLogin() {
        if (loggedin) return setLoggedIn(false)
        else return setLoggedIn(true)
    }
    return (

        <LoginContext.Provider value={{ loggedin, toggleLogin }}>
            {children}
        </LoginContext.Provider>

    )
}
