export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  return sendRedirect(event, `https://untalent.org/jobs/${slug}`, 302)
})
