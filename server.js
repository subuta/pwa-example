import Koa from 'koa'
import serve from 'koa-static'
import cors from '@koa/cors'
import logger from 'koa-logger'
import clearModule from 'clear-module'

// Watch(file changes) and clear api module cache on dev.
const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  const watcher = require('sane')('./api')
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /api module cache from server')
      clearModule.match(/api/)
    })
  })
}

const app = new Koa()

if (!dev) {
  app.use(serve('public'))
}

// log requests
app.use(logger())

// cors
app.use(cors())

// Register api routes/allowedMethods
if (dev) {
  // Dynamic import modules for development(With no-module-cache).
  // SEE: https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
  app.use((...args) => require('./api').default.routes().apply(null, args))
  app.use((...args) => require('./api').default.allowedMethods().apply(null, args))
} else {
  // Use modules statically otherwise (prod/test).
  const api = require('./api').default
  app.use(api.routes())
  app.use(api.allowedMethods())
}

app.listen(3000)