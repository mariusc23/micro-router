# micro-router

> Router for [micro](https://github.com/zeit/micro).

## Installation

    npm install --save @mariusc23/micro-router

## Usage

#### Basic

```js
const { router } = require('@mariusc23/micro-router')

module.exports = router({
  '/': async (req, res) => {
    return 'home'
  },
  '/dashboard': async (req, res) => {
    return 'dashboard'
  },
})
```

#### With Route Middleware

```js
const { applyMiddleware } = require('@mariusc23/micro-middleware')
const { router } = require('@mariusc23/micro-router')

module.exports = router({
  '/': async (req, res) => {
    return 'home'
  },
  '/login': applyMiddleware(
    [
      next => (req, res) => {
        req.middlewareWasApplied = true
        return next(req, res)
      },
    ],
    async (req, res) => {
      return req.middlewareWasApplied
    }
  ),
})
```

#### With Global Middleware

```js
const { applyMiddleware } = require('@mariusc23/micro-middleware')
const { router } = require('@mariusc23/micro-router')

const middleware = [
  next => (req, res) => {
    req.middlewareWasApplied = true
    return next(req, res)
  },
]

const handler = router({
  '/': async (req, res) => {
    return req.middlewareWasApplied
  }
})

module.exports = applyMiddleware(middleware, handler)
```

## License

Copyright (c) 2017 Marius Craciunoiu. Licensed under the MIT license.
