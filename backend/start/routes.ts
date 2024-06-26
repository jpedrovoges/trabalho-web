import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
    return { hello: 'world' }
})

Route.group(() => {
    Route.get('/:id', 'UsersController.getUser')
    Route.post('/create', 'UsersController.create')
    Route.post('/login', 'UsersController.authenticate')
}).prefix('/user')

Route.get('/session/check-authenticated', 'UsersController.checkAuthenticated')

Route.group(() => {
    Route.get('/all', 'StationsController.all')

    Route.group(() => {
        Route.get('/my', 'StationsController.getStationByUserId')

        Route.post('/create', 'StationsController.create')

        Route.patch('/:id', 'StationsController.update')

        Route.delete('/:id', 'StationsController.remove')
    }).middleware('auth')

}).prefix('/station')

Route.get('/music', 'MusicController.index')
Route.get('/stream', 'MusicController.stream')
