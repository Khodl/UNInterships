export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const page = Number(query.page) || 1

  const data = await $fetch(`https://untalent.org/api/v1/jobs`, {
    params: {
      token: config.apiToken,
      page,
    },
  })

  return data
})
