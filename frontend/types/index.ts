export type RawStation = {
    id: number
    name: string
    slug: string
    description: string
    frequency: number
    music_ids: string
}

export type Station = Omit<RawStation, 'musicIds'> & {
    musicIds: number[]
}

export type Music = {
    id: number
    name: string
    artist: string
    image: string
}
