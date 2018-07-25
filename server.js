import Koa from 'koa'
import serve from 'koa-static'
import cors from '@koa/cors'
import logger from 'koa-logger'
import clearModule from 'clear-module'

// Watch(file changes) and clear pages module cache on dev.
const dev = process.env.NODE_ENV !== 'production'
if (dev) {
  const watcher = require('sane')('./pages')
  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Clearing /pages module cache from server')
      clearModule.match(/pages/)
    })
  })
}

const app = new Koa()

// serve static files
app.use(serve('public'))

// log requests
app.use(logger())

// cors
app.use(cors())

// Register pages routes/allowedMethods
if (dev) {
  // Dynamic import modules for development(With no-module-cache).
  // SEE: https://github.com/glenjamin/ultimate-hot-reloading-example/blob/master/server.js
  app.use((...args) => require('./pages').default.routes().apply(null, args))
  app.use((...args) => require('./pages').default.allowedMethods().apply(null, args))
} else {
  // Use modules statically otherwise (prod/test).
  const pages = require('./pages').default
  app.use(pages.routes())
  app.use(pages.allowedMethods())
}

const PORT = 3000

console.log(`Server started at :::${PORT}`);

app.listen(3000)