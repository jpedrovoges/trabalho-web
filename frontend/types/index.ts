export type Station = {
    id: number
    name: string
    slug: string
    description: string
    frequency: number
    musicIds: number[]
}

export type Music = {
    id: number
    name: string
    artist: string
    image: string
}
