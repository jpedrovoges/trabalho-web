import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Station from 'App/Models/Station'
import { createStationSchema, updateStationSchema } from 'App/Schemas/station'

export default class StationsController {
    public async all() {
        return Station.all()
    }

    public async getStationByUserId({ response, user }: HttpContextContract) {
        const station = await Station
            .query()
            .where('creator_id', user.id)
            .first()

        return response.json({ station })
    }

    public async create({ request, response, user }: HttpContextContract) {
        const station = await Station
            .query()
            .where('creator_id', user.id)
            .first()

        if (station)
            throw new Error('Station already found! You can only have one station at a time')

        const {
            frequency,
            description,
            image,
            name,
        } = await request.validate({ schema: createStationSchema })

        await Station.create({
            frequency,
            description,
            image,
            name,
            creatorId: user.id,
        })

        return response.status(201)
    }

    public async update({ request, response, user }: HttpContextContract) {
        const { id } = request.params()

        const station = await Station
            .query()
            .where({ id, creatorId: user.id })
            .firstOrFail()

        const {
            name,
            description,
            image,
            musicIds,
        } = await request.validate({ schema: updateStationSchema })

        await station
            .merge({
                name: name || station.name,
                description,
                image,
                musicIds,
            }).save()

        return response.status(204)
    }

    public async remove({ request, response, user }: HttpContextContract) {
        const { id } = request.params()

        const station = await Station
            .query()
            .where({ id, creatorId: user.id })
            .firstOrFail()

        await station.delete()

        return response.status(204)
    }
}
