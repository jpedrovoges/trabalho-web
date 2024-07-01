import Music from 'App/Models/Music'

export default class MusicController {
    public async index() {
        return Music.all()
    }
}
