import { rules, schema } from '@ioc:Adonis/Core/Validator'

export const createStationSchema = schema.create({
    name: schema.string(),
    description: schema.string(),
    image: schema.string.optional(),
    frequency: schema.number([
        rules.unique({ table: 'stations', column: 'frequency' }),
        rules.range(0.1, 999.9),
    ]),
})

export const updateStationSchema = schema.create({
    name: schema.string.optional(),
    description: schema.string.optional(),
    image: schema.string.optional(),
})