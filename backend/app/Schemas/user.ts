import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const createUserSchema = schema.create({
    email: schema.string([
        rules.email(),
        rules.unique({ table: 'users', column: 'email' }),
    ]),
    username: schema.string([rules.unique({ table: 'users', column: 'username' })]),
    password: schema.string([rules.minLength(8)]), // TODO confirm password field?
})

export const loginSchema = schema.create({
    email: schema.string([rules.exists({ table: 'users', column: 'email' })]),
    password: schema.string(),
})
