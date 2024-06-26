import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { TrackQueue } from 'App/Services/TrackQueue'
import Music from 'App/Models/Music'

export default class MusicController {
    public async index() {
        return Music.all()
    }

    public async stream({ response }: HttpContextContract) {
        // TODO remove client on request closed
        const { client, id } = TrackQueue.instance.addClient()

        TrackQueue.instance.play()

        response
            .append('Content-Type', 'audio/mp3')

        return response.stream(client)
    }
}
