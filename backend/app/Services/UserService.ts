import User from 'App/Models/User'

export class UserService {
    public static async createUser(email: string, username: string, password: string) {
        // TODO hash password
        await User.create({
            email,
            username,
            password,
        })
    }

    public static async login(username: string, password: string) {
        // TODO validate and return a token session
    }
}
