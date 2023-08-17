export async function useAPI(path = "") {
    if (!path.length) throw '💥 API path is empty'

    return (await useLazyFetch(path, {
        baseURL: useRuntimeConfig().public.API_URL,
        
    })).data
}