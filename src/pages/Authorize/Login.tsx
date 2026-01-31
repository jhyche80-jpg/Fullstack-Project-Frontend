import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { type Login } from '../../types/userTypes'
import { userLogin } from '../../utils/api/userApi'

export default function Login() {
    const [loginInfo, setLoginInfo] = useState<Login>({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()

    async function HandleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            const { token, user } = await userLogin(loginInfo)
            if (!token) {
                setError('Login failed: no token returned')
                return
            }

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            navigate('/projects')
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Login failed'
            setError(message)
        }
    }

    return (
        <form onSubmit={HandleSubmit}>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <label>Username:</label>
            <input
                type="text"
                value={loginInfo.username}
                onChange={(e) =>
                    setLoginInfo({ ...loginInfo, username: e.target.value })
                }
                placeholder="Username"
            />

            <label>Password:</label>
            <input
                type="password"
                value={loginInfo.password}
                onChange={(e) =>
                    setLoginInfo({ ...loginInfo, password: e.target.value })
                }
                placeholder="Password"
            />

            <button type="submit">Login</button>

            <p>
                No account? Register <NavLink to="/register">Here</NavLink>
            </p>
        </form>
    )
}