export const useApi = () => {
  const config = useRuntimeConfig()

  const apiBase = config.public.apiBase

  const request = async <T>(
    url: string,
    options: any = {}
  ): Promise<T> => {
    return await $fetch<T>(url, {
      baseURL: apiBase,
      ...options,
    })
  }

  return {
    request,
  }
}