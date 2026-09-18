export const useCategories = () => {
  const config = useRuntimeConfig()

  const query = `
    query GetCategories {
      categories(first: 20) {
        nodes {
          id
          name
          slug
          description
          
        }
      }
    }
  `

  const { data, error } = useAsyncData('categories', () =>
    $fetch(config.public.wordpressGraphql, {
      method: 'POST',
      body: {
        query
      }
    })
  )

  const categories = computed(() => {
    return data.value?.data?.categories?.nodes || []
  })

  console.log(categories.value)

  return {
    categories,
    error
  }
}