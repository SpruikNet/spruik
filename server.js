const server = require('koa-static')
const Koa = require('koa')
const app = new Koa()

app.use(server('$ {_dirname}/build'))

const port = process.env.PORT || 3000

app.listen(port, () => {
console.log('listening in port ${port}')
})

