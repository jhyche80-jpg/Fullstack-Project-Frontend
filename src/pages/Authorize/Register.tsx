import React, { useState } from 'react'
import type { Register } from '../../types/userTypes'
import { userRegister } from '../../utils/api/userApi'
import { useNavigate } from 'react-router-dom'
export default function Register() {
    const navigate = useNavigate()
    const [registerInfo, setRegesterInfo] = useState<Register>({
        username: '',
        password: '',
        email: '',
        birthDate: '',
        firstName: '',
        lastName: ''
    })
    const [repassword, setRepassword] = useState<string>('')
    const [error, setError] = useState('')

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const response = await userRegister(registerInfo)
            console.log(response)
            navigate('/login')
        } catch (error: any) {
            const message =
                error.response?.data?.message ||
                error.message ||
                'Registration failed';
            setError(message)
        }
    }
    return (

        <form onSubmit={handleSubmit}>
            <p>{error}</p>
            <button type="button" onClick={() => navigate(-1)}>Back</button>
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    name='firstName'
                    onChange={(e) => setRegesterInfo({ ...registerInfo, firstName: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    name='lastName'
                    value={registerInfo.lastName}
                    onChange={(e) => setRegesterInfo({ ...registerInfo, lastName: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    name='username'
                    value={registerInfo.username}
                    onChange={(e) => setRegesterInfo({ ...registerInfo, username: e.target.value })}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    name='email'
                    value={registerInfo.email}
                    onChange={(e) => setRegesterInfo({ ...registerInfo, email: e.target.value })}

                />
            </div>
            <div>
                <label htmlFor="password">Password:</label>
                <input
                    type="text"
                    name='password'
                    value={registerInfo.password}
                    onChange={(e) => setRegesterInfo({ ...registerInfo, password: e.target.value })}
                />
            </div>
            <div>

                <label htmlFor="repass">Re-enter Password: </label>
                <input
                    type="text"
                    name='repass'
                    value={repassword}
                    onChange={(e) => setRepassword(e.target.value)}

                />
            </div>

            <div>
                <label htmlFor="birthDate">Birthday:</label>
                <input
                    type="date"
                    name='birthDate'
                    value={registerInfo.birthDate}
                    onChange={(e) => setRegesterInfo({ ...registerInfo, birthDate: e.target.value })}

                />
            </div>


            <button type='submit'>Submit</button>





        </form>
    )
}
