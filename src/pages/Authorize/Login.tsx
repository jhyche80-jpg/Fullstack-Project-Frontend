import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { type Login } from '../../types/userTypes'
import { userLogin } from '../../utils/api/userApi'
import type { AxiosError } from 'axios'
// Accept username
// Accept Password
// compare password to password on file
// if the passwords match then navigate to the next page or show error message 
export default function Login() {
    const [loginInfo, setLoginInfo] = useState<Login>({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    async function HandleSubmit() {
        try {
            const data = await userLogin(loginInfo)
            console.log(data)
            navigate('/projects')

        } catch (error: any) {
            console.error(error.response?.data.message)
        }

    }

    return (
        <form onSubmit={HandleSubmit}>
            <label htmlFor="user">Username:</label>
            <input
                type="text"
                name="user"
                value={loginInfo.username}
                onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })} placeholder='Username:' />
            <label htmlFor="">Password:</label>
            <input
                type="text"
                placeholder='Password'
                value={loginInfo.password}
                onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })} />
            <button type='submit'>Login</button>
            <p>No account ? No problem! Register <NavLink to={'/register'}>Here</NavLink></p>

        </form >
    )
}
