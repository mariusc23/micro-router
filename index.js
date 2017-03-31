const url = require('url')
const defineRoute = require('path-match')()

const routerHandler = routes => next => (req, res) => {
  const paths = Object.keys(routes)
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    const match = defineRoute(path)
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

const router = routes => (req, res) => {
  // handler
  if (res) {
    return routerHandler(routes)(null)(req, res)
  }
  // middleware (req = next)
  return routerHandler(routes)(req)
}

module.exports = {
  router,
}
