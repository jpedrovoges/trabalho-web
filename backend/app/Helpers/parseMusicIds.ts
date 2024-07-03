import Station from 'App/Models/Station'

export function parseMusicIds(station: Station) {
    if (station.musicIds)
        station.musicIds = station.$original.musicIds.split(',').map(Number)
}
