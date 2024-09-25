import { apiUrl } from "./apiUrl";
import { UserData, UserLogin } from "../interfaces/IDataUser";

export const login = async (userLogin: UserLogin): Promise<UserLogin | null> => {
    try {
        const response = await fetch(`${apiUrl}/users?username=${userLogin.username}`)

        if (!response.ok) {
            throw new Error('Server Error')
        }

        const data: UserData[] = await response.json()

        if(data.length > 0) {
            return data[0]
        }

        return null
    } catch (error) {
        console.error('Error al iniciar sesión', error)
        throw new Error('Error fetching user data')
    }
}