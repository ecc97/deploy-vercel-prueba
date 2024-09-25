export interface UserData{
    id?: string;
    username: string
    email: string
    password: string
    role: string
}

export interface UserLogin {
    id?: string;
    username: string
    password: string
    role?: string
}