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

        await UserService.register(email, username, password)

        return response.status(201)
    }

    public async authenticate({ request }: HttpContextContract) {
        const { email, password } = await request.validate({ schema: loginSchema })

        // TODO return JWT token
        await UserService.authenticate(email, password)
    }
}
