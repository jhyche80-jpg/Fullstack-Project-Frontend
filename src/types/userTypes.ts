export interface Register {
    username: string
    email: string
    password: string
    birthDate: string
    firstName: string
    lastName: string
}
export interface User {
    _id: string
    username: string
    email: string
    password: string
    birthdate: Date
    firstName: string
    lastName: string
}
export interface Login {
    username: string
    password: string
}

export interface AuthResponse {
    user: User
    token?: string
}