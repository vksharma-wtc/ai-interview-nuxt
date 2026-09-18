export default defineNuxtPlugin(() => {
    const graphql = $fetch.create({
      baseURL: 'https://chirag.academy/graphql',
  
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
    return {
      provide: {
        graphql
      }
    }
  })