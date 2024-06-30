import { ResponseContract } from '@ioc:Adonis/Core/Response'
import { SECRET } from 'App/Constants'
import User from 'App/Models/User'
import jwt, { SignOptions } from 'jsonwebtoken'

export function signJwt(this: ResponseContract, user: User, options?: SignOptions) {
    const payload = {
        user: {
            id: user.id,
        },
    }

    return jwt.sign(
        payload,
        SECRET,
        options
    )
}
