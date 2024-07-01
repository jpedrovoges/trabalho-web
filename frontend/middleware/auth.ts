import { fetchAuthenticated } from '~/helpers/fetch-authenticated'
import { getJwt } from '~/helpers/jwt'

export default defineNuxtRouteMiddleware(async () => {
    if (process.server)
        return

    const token = getJwt()

    if (!token)
        return navigateTo('/login')

    // TODO get when authentication expires to avoid calling this method every time
    const { isAuthenticated } =
        await fetchAuthenticated<{ isAuthenticated: boolean }>('/session/check-authenticated')

    if (!isAuthenticated)
        return navigateTo('/login')
})
