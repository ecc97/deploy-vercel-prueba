import { apiUrl } from "./apiUrl";
import { UserData, UserLogin } from "@/interfaces/IDataUser";

export const login = async (userLogin: UserLogin): Promise<UserLogin | null> => {
    try {
        const response = await fetch(`${apiUrl}/RaicesUrbanas/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userLogin),
        })

        if (!response.ok) {
            throw new Error('Server Error')
        }

        const data: UserData = await response.json()
        return data
    } catch (error) {
        console.error('Error al iniciar sesión', error)
        throw new Error('Error fetching user data')
    }
}