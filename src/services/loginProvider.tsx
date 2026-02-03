import React, { useState } from 'react'
import { LoginContext } from '../context/Context'


export default function LoginProvider({ children }: { children: React.ReactNode }) {
    const [loggedin, setLoggedIn] = useState(false)

    const toggleLogin = () => setLoggedIn(prev => !prev)

    return (
        <LoginContext.Provider value={{ loggedin, toggleLogin }}>
            {children}
        </LoginContext.Provider>
    )
}