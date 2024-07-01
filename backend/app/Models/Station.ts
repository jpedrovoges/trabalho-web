import { DateTime } from 'luxon'
import { BaseModel, afterFind, beforeCreate, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import { string } from '@ioc:Adonis/Core/Helpers'

export default class Station extends BaseModel {
    @column({ isPrimary: true })
    public id: number

    @column()
    public name: string

    @column()
    public slug: string

    @column()
    public description: string

    @column()
    public image: string

    @column()
    public frequency: number

    @column()
    public creatorId: number

    @column()
    public musicIds: number[]

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @afterFind()
    public static formatMusicIds(station: Station) {
        if (!station.$dirty.musicIds)
            return

        const musicIdsString: string = station.$dirty.musicIds

        station.musicIds = Array.from(musicIdsString.split(','), v => parseInt(v, 10))
    }

    @beforeSave()
    public static stringifyMusicIds(station: Station) {
        if (!station.$dirty.musicIds)
            return

        station.$dirty.musicIds = station.musicIds.toString()
    }

    @beforeCreate()
    public static async slugify(station: Station) {
        if (station.slug) return

        const slug = string.toSlug(station.name, {
            replacement: '-',
            lower: true,
            strict: true,
        })

        const rows = await Station.query()
            .select('slug')
            .whereRaw('lower(??) = ?', ['slug', slug])
            .orWhereRaw('lower(??) like ?', ['slug', `${ slug }-%`])

        if (!rows.length) {
            station.slug = slug

            return
        }

        const incrementors = rows.reduce<number[]>((result, row) => {
            const tokens = row.slug.toLowerCase().split(`${ slug }-`)

            if (tokens.length < 2)
                return result

            const increment = Number(tokens.at(1))

            if (!Number.isNaN(increment))
                result.push(increment)

            return result
        }, [])

        const increment = incrementors.length ? Math.max(...incrementors) : 1

        station.slug = `${ slug }-${ increment }`
    }
}
