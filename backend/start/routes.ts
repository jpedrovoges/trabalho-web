/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

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
