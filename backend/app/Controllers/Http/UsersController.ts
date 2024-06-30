import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { createUserSchema, loginSchema } from 'App/Schemas/user'

export default class UsersController {
    public async create({ request, response }: HttpContextContract) {
        const {
            email,
            password,
            username,
        } = await request.validate({ schema: createUserSchema })

        await User.create({ email, username, password })

        return response.status(201)
    }

    public async authenticate({ request, response }: HttpContextContract) {
        const { email, password } = await request.validate({ schema: loginSchema })

        const user = await User.findByOrFail('email', email)

        const passwordMatch = await Hash.verify(user.password, password)

        if (!passwordMatch)
            throw new Error('Invalid credentials')

        const token = response.signJwt(user, { expiresIn: '10m' })

        return response.send({ token })
    }
}
