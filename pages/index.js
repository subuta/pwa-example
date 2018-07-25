import Router from 'koa-router'
import views from 'koa-views'

const pages = new Router()

pages.use(views(`${__dirname}/views`, {
  extension: 'hbs',
  map: {hbs: 'handlebars'},
  options: {
    partials: {
      layout: './layout'
    }
  }
}))

// Handle access to '/'
pages.get('/', async (ctx) => {
  await ctx.redirect('/pages/hoge')
})

pages.get('/pages/hoge', async (ctx) => {
  await ctx.render('hoge')
})

pages.get('/pages/fuga', async (ctx) => {
  await ctx.render('fuga')
})

pages.get('/pages/piyo', async (ctx) => {
  await ctx.render('piyo')
})

export default pages