import { api } from "../../services/axios";
import type { Login, Register, AuthResponse } from "../../types/userTypes";


// post(login)
//post(Logout)
//post Register 
export async function userLogin(formdata: Login): Promise<AuthResponse> {
    try {
        const { data } = await api.post<AuthResponse>("/auth/login", formdata)
        return data

    } catch (error) {
        console.error("Error logging in", error)
        throw error
    }
}
export async function userRegister(registerData: Register): Promise<{ message: string }> {
    try {
        const { data } = await api.post<{ message: string }>('/auth/register', registerData)
        return data
    } catch (error) {
        console.error(" Problem registering data ", error)
        throw error
    }
}
export async function userLogout(): Promise<{ message: string }> {
    try {
        const { data } = await api.post<{ message: string }>('/auth/logout')
        return data

    } catch (error) {
        console.error("Error:", error)
        throw error
    }
}
