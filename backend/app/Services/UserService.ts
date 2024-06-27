import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'

export class UserService {
    public static async register(email: string, username: string, password: string) {
        await User.create({
            email,
            username,
            password,
        })
    }

    public static async authenticate(email: string, password: string) {
        const user = await User.findByOrFail('email', email)

        const passwordMatch = await Hash.verify(user.password, password)

        if (!passwordMatch)
            throw new Error('Invalid credentials')

        // TODO generate and return JWT
        return { user }
    }
}
