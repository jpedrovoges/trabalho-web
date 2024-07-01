import Station from 'App/Models/Station'
import { TrackQueue } from './TrackQueue'
import Music from 'App/Models/Music'

export class StationMusicService {
    private static _stationMusicQueue = new Map<number, TrackQueue>()

    public static async getStationMusicQueue(stationId: number) {
        const station = await Station
            .query()
            .where('id', stationId)
            .firstOrFail()

        let stationTrackQueue = StationMusicService._stationMusicQueue.get(stationId)

        if (!stationTrackQueue) {
            const musics = await Music
                .query()
                .whereIn('id', (station.musicIds as unknown as string).split(','))

            const musicTracks = musics.map(music => music.file)

            stationTrackQueue = new TrackQueue(musicTracks)
            StationMusicService._stationMusicQueue.set(stationId, stationTrackQueue)
        }

        return stationTrackQueue
    }
}
