declare module '@ioc:Adonis/Core/HttpContext' {
    interface HttpContextContract {
        user: { id: number }
    }
}
