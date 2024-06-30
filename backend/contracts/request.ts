declare module '@ioc:Adonis/Core/Request' {
    interface RequestContract {
        bearerToken: string
        verifyJwt(): { id: number }
    }
}
