import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnsureAuthenticated {
    public async handle(
        { request }: HttpContextContract,
        next: () => Promise<void>
    ) {
        request.verifyJwt()

        await next()
    }
}
