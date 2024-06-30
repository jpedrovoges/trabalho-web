import User from 'App/Models/User'
import { SignOptions } from 'jsonwebtoken'

declare module '@ioc:Adonis/Core/Response' {
    interface ResponseContract {
        signJwt(user: User, options: SignOptions): string
    }
}
