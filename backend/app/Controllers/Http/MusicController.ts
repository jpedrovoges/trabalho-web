import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Music from 'App/Models/Music'
import { StationMusicService } from 'App/Services/StationMusicService'

export default class MusicController {
    public async index() {
        return Music.all()
    }

    public async stream({ request, response }: HttpContextContract) {
        const { id } = request.params()

        const trackQueue = await StationMusicService.getStationMusicQueue(id)

        trackQueue.play()

        const { client } = trackQueue.addClient()

        response
            .append('Content-Type', 'audio/mp3')

        return response.stream(client)
    }
}
