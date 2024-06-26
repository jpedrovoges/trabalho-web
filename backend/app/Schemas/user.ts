import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const createUserSchema = schema.create({
    email: schema.string([
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string([
        rules.email(),
        rules.unique({ table: 'users', column: 'username' }),
    ]),
    // TODO confirm password field?
    password: schema.string(),
})

export const loginSchema = schema.create({
    username: schema.string([rules.exists({ table: 'users', column: 'username' })]),
    password: schema.string(),
})
