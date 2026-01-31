import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { type Login } from '../../types/userTypes'
import { userLogin } from '../../utils/api/userApi'

// Accept username
// Accept Password
// compare password to password on file
// if the passwords match then navigate to the next page or show error message 
export default function Login() {
    const [loginInfo, setLoginInfo] = useState<Login>({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()
    async function HandleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await userLogin(loginInfo)
            console.log(response)
            navigate('/projects')
            const { token, user } = await userLogin(loginInfo);
            localStorage.setItem('token', JSON.stringify(token));
            localStorage.setItem('user', JSON.stringify(user));

        } catch (error: any) {
            const message =
                error.response?.data?.message || error.message || 'Login failed';
            setError(message);
        }

    }

    return (
        <form onSubmit={HandleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <label htmlFor="user">Username:</label>
            <input
                type="text"
                name="user"
                value={loginInfo.username}
                onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })} placeholder='Username:' />
            <label htmlFor="">Password:</label>
            <input
                type="password"
                placeholder='Password'
                value={loginInfo.password}
                onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
            <button type='submit'>Login</button>
            <p>No account ? No problem! Register <NavLink to={'/register'}>Here</NavLink></p>

        </form >
    )
}
