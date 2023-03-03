import { useStorage } from "@vueuse/core"

// [ route, {  etag: "", payload: {} }]
const cache = useStorage('api/cache', new Map([]))

export async function useAPI(path = "") {
    if (!path.length) throw '💥 API path is empty'

    return (await useLazyFetch(path, {
        headers: { 'if-none-match': cache.value.get(path)?.etag },
        baseURL: useRuntimeConfig().public.API_URL,
        onResponse({ request, response, options }) {
            if (response.status === 304) response._data = cache.value.get(path).payload
            else cache.value.set(path, { etag: response.headers.get('etag'), payload: response._data })

            return response._data
        }
    })).data
}