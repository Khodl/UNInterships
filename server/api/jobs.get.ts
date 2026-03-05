export default defineEventHandler(async (event) => {
  const { untalentToken } = useRuntimeConfig()
  const { page } = getQuery(event)

  return $fetch('https://untalent.org/api/v1/jobs', {
    query: {
      token: untalentToken,
      page: page || 1,
    },
  })
})
