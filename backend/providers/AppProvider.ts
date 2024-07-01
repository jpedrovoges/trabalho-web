import type { ApplicationContract } from '@ioc:Adonis/Core/Application'
import { getBearerToken, signJwt, verifyJwt } from 'App/Helpers/jwt'

export default class AppProvider {
    constructor(protected app: ApplicationContract) {
    }

    public register() {
        // Register your own bindings
    }

    public async boot() {
        const Request = this.app.container.use('Adonis/Core/Request')
        const Response = this.app.container.use('Adonis/Core/Response')

        Request.getter('bearerToken', getBearerToken)
        Request.macro('verifyJwt', verifyJwt)
        Response.macro('signJwt', signJwt)
    }

    public async ready() {
    }

    public async shutdown() {
        // Cleanup, since app is going down
    }
}
