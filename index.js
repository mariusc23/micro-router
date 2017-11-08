const url = require('url')
const defineRoute = require('path-match')()

const routerHandler = (routes, options = {}) => {
  const baseUrl = options.baseUrl || ''
  const paths = Object.keys(routes)
  return next => (req, res) => {
    for (let i = 0; i < paths.length; i++) {
      const path = paths[i]
      const fullPath = `${baseUrl}${path}`
      const match = defineRoute(fullPath)
      const params = match(url.parse(req.url).pathname)
      if (params) {
        const route = routes[path]
        req.params = params
        return route(req, res)
      }
    }
    if (next) {
      return next(req, res)
    }
    const err = new Error('Not Found')
    err.statusCode = 404
    throw err
  }
}

const router = (routes, options) => (req, res) => {
  // handler
  if (res) {
    return routerHandler(routes, options)(null)(req, res)
  }
  // middleware (req = next)
  return routerHandler(routes, options)(req)
}

module.exports = {
  router,
}
