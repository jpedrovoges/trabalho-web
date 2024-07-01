import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Music from 'App/Models/Music'

export default class extends BaseSeeder {
    public async run() {
        await Music.createMany([
            {
                name: 'Promenade',
                artist: 'Unfound',
                image: 'https://f4.bcbits.com/img/a0230727954_16.jpg',
                file: 'promenade.mp3',
            },
            {
                name: 'Flare',
                artist: 'Jasper De Ceuster',
                image: 'https://f4.bcbits.com/img/a3136894922_16.jpg',
                file: 'flare.mp3',
            },
            {
                name: 'Azur',
                artist: 'Krosia',
                image: 'https://f4.bcbits.com/img/a1956830623_16.jpg',
                file: 'azur.mp3',
            },
            {
                name: 'Billiards',
                artist: 'HOME',
                image: 'https://f4.bcbits.com/img/a3785840355_16.jpg',
                file: 'billiards.mp3',
            },
        ])
    }
}
