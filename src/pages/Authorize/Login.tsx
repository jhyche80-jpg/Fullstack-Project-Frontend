//import React, { useState } from 'react'
import type { Login } from '../../types/types'
import { NavLink, useNavigate } from 'react-router-dom'
// Accept username
// Accept Password
// compare password to password on file
// if the passwords match then navigate to the next page or show error message 
export default function Login() {
    // const [username, setUsername] = useState()
    const navigate = useNavigate()
    const HandleSubmit = () => {
        navigate('/projects')
    }
    return (
        <form onSubmit={HandleSubmit}>
            <label htmlFor="user">Username:</label>
            <input type="text" name="user" placeholder='Username:' />
            <label htmlFor="">Password:</label>
            <input type="text" placeholder='Password' />
            <button type='submit'>Login</button>
            <p>No account ? No problem! Register <NavLink to={'/register'}>Here</NavLink></p>

        </form >
    )
}
