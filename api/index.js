import Router from 'koa-router'

const api = new Router({
  prefix: '/api'
})

api.get('/hoge', async (ctx) => {
  ctx.body = 'hoge!'
})

export default api