import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class EnsureAuthenticated {
    public async handle(
        ctx: HttpContextContract,
        next: () => Promise<void>,
    ) {
        const user = ctx.request.verifyJwt()

        ctx.user = user

        await next()
    }
}
