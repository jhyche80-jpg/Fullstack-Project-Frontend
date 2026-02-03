import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { type Login } from '../../types/userTypes'
import { userLogin } from '../../utils/api/userApi'
import '../../Styles/Login.css'
import { LoginContext } from '../../context/Context'
export default function Login() {
    const [loginInfo, setLoginInfo] = useState<Login>({
        username: '',
        password: ''
    })
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const loginContext = useContext(LoginContext)

    if (!loginContext) {
        throw new Error("NavBar must be used within a LoginProvider")
    }

    const { toggleLogin } = loginContext

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
            toggleLogin()
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
        <form onSubmit={HandleSubmit} className='formLogin'>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className='SignInArea'>
                <label> <strong>Username:</strong> </label>
                <input
                    type="text"
                    value={loginInfo.username}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, username: e.target.value })
                    }
                    placeholder="Username"
                    className='InputLogin'
                />

            </div>

            <div className='SignInArea'>
                <label> <strong>Password:</strong></label>
                <input
                    type="password"
                    value={loginInfo.password}
                    onChange={(e) =>
                        setLoginInfo({ ...loginInfo, password: e.target.value })
                    }
                    placeholder="Password"
                    className='InputLogin'
                />
            </div>


            <button type="submit">Login</button>

            <p>
                No account? Register <NavLink to="/register">Here</NavLink>
            </p>
        </form>
    )
}