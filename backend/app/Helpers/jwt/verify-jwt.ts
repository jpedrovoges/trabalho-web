import { RequestContract } from '@ioc:Adonis/Core/Request'
import { SECRET } from 'App/Constants'
import jwt, { JwtPayload } from 'jsonwebtoken'

export function verifyJwt(this: RequestContract) {
    const { user } = jwt.verify(
        this.bearerToken,
        SECRET,
    ) as JwtPayload & { user: { id: number } }

    return user
}
