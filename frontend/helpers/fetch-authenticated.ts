import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'
import { getJwt } from './jwt'

/**
 * Makes an authenticated request using authorization headers
 *
 * @param url - The relative path to the url
 * @param options - The fetch options
 */
export function fetchAuthenticated<T>(
    path: string,
    options?: NitroFetchOptions<NitroFetchRequest>,
) {
    return $fetch<T>(
        useRuntimeConfig().public.baseApiUrl + path,
        {
            headers: {
                Authorization: 'Bearer ' + getJwt(),
            },
            ...options,
        },
    )
}
