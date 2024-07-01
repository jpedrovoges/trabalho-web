const STORAGE_KEY = 'jwt'

export function getJwt() {
    return localStorage.getItem(STORAGE_KEY)
}

export function setJwt(token: string) {
    localStorage.setItem(STORAGE_KEY, token)
}
