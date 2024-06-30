import { RequestContract } from '@ioc:Adonis/Core/Request'

export function getBearerToken(this: RequestContract) {
    const authHeader = this.header('Authorization')

    if (!authHeader)
        throw new Error('No Authorization header passed')

    const [type, value] = authHeader.split(' ')

    if (!type || type.toLowerCase() !== 'bearer' || !value)
        throw new Error('Invalid Authorization header value: ' + authHeader)

    return value
}
