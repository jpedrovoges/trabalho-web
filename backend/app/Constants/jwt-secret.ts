import Env from '@ioc:Adonis/Core/Env'

export const SECRET = Buffer.from(Env.get('APP_KEY'), 'base64')
