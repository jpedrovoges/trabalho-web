import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { createUserSchema, loginSchema } from 'App/Schemas/user'
import { UserService } from 'App/Services/UserService'

export default class UsersController {
    public async create({ request, response }: HttpContextContract) {
        const {
            email,
            password,
            username,
        } = await request.validate({ schema: createUserSchema })

        await UserService.createUser(email, password, username)

        return response.status(201)
    }

    public async login({ request, response }: HttpContextContract) {
        const { username, password } = await request.validate({ schema: loginSchema })

        await UserService.login(username, password)

        // TODO return JWT token
        return response.status(200)
    }
}
