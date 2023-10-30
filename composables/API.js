export async function useAPI(path = "") {
    if (!path.length) throw '💥 API path is empty'

    return (await useLazyFetch(path, {
        baseURL: `${useRuntimeConfig().public.CACHE_PROXY_URL}/${useRuntimeConfig().public.API_URL}`,
        
    })).data
}