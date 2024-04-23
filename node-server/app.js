const Koa=require('koa')
const Router = require('koa-router')
const app = new Koa()
const router = new Router()
const cors = require('koa-cors')

app.use(cors())
app.use(router.routes())

router.prefix('/api')

router.get('/', async ctx => {
  console.log(ctx.query);

  await sleep(5)

  ctx.body = ctx.query
})


function sleep(s) {
  return new Promise((resole, reject) => {
    setTimeout(() => {
      resole()
    }, s*1000)
  })
}

app.listen(9090, console.log('Server is running at 9090 ...'))