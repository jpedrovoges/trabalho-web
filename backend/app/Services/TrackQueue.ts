import { extname, join } from 'path'
import { readdir } from 'fs/promises'
import { createReadStream, type ReadStream } from 'fs'
import { ffprobe } from '@dropb/ffprobe'
import ffprobeStatic from 'ffprobe-static'
import Throttle from 'throttle'
import { PassThrough } from 'stream'

ffprobe.path = ffprobeStatic.path

type Track = {
    filepath: string
    bitrate: number
}

export class TrackQueue {
    private _clients = new Map<string, PassThrough>()
    private _currentTrack: Track | undefined
    private _currentIndex: number = 0
    private _stream: ReadStream
    private _throttle: Throttle
    private _isPlaying = false

    // TODO use global object to store tracks
    private static _tracks: Track[] = []

    // TODO refactor since we can have multiple instances
    private static _instance: TrackQueue

    public static get instance() {
        if (!TrackQueue._instance)
            TrackQueue._instance = new TrackQueue()

        return TrackQueue._instance
    }

    private _broadcast(chunk) {
        this._clients.forEach(client => {
            client.write(chunk)
        })
    }

    public addClient() {
        const id = '1'
        const client = new PassThrough()

        this._clients.set(id, client)

        return { id, client }
    }

    public removeClient(id: string) {
        this._clients.delete(id)
    }

    public getNextTrack() {
        // Loop back to the first track
        if (this._currentIndex >= TrackQueue._tracks.length - 1)
            this._currentIndex = 0

        const track = TrackQueue._tracks[this._currentIndex++]

        this._currentTrack = track

        return track
    }

    public loadTrackStream() {
        const track = this._currentTrack

        if (!track) return

        console.log('Starting audio stream')

        this._stream = createReadStream(track.filepath)
    }

    public async start() {
        const track = this._currentTrack

        if (!track) return

        this._isPlaying = true

        // Takes in bps (bytes per second), so we divide bitrate by 8.
        this._throttle = new Throttle(track.bitrate / 8)

        this._stream
            .pipe(this._throttle)
            .on('data', chunk => this._broadcast(chunk))
            .on('end', () => this.play(true))
            .on('error', () => this.play(true))
    }

    public play(useNewTrack = false) {
        if (useNewTrack || !this._currentTrack) {
            console.log('Playing new track')

            this.getNextTrack()
            this.loadTrackStream()
            this.start()
        }
        else {
            this.resume()
        }
    }

    public resume() {
        if (!this._hasStarted || this._isPlaying)
            return

        console.log('Resumed')
        this.start()
    }

    public pause() {
        if (!this._hasStarted || !this._isPlaying)
            return

        this._isPlaying = false

        console.log('Paused')

        this._throttle.removeAllListeners('end')
        this._throttle.end()
    }

    private get _hasStarted() {
        return this._stream && this._throttle && this._currentTrack
    }

    public static async loadTracks(dir: string): Promise<void> {
        let filenames = await readdir(dir)

        filenames = filenames.filter(
            filename => extname(filename) === '.mp3'
        )

        // Add directory name back to filenames
        const filepaths = filenames.map(filename => join(dir, filename))

        TrackQueue._tracks = await Promise.all(filepaths.map(
            async filepath => {
                const bitrate = await TrackQueue.getTrackBitrate(filepath)

                return { filepath, bitrate }
            }
        ))

        console.log(`Loaded ${ TrackQueue._tracks.length } tracks`)
    }

    private static async getTrackBitrate(filepath: string): Promise<number> {
        const data = await ffprobe(filepath)
        const bitrate = data?.format?.bit_rate

        return bitrate ? parseInt(bitrate) : 128000
    }
}
