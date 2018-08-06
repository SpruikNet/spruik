const server = require('koa-static')
const Koa = require('koa')
const app = new Koa()
const enforeceHttps = require(koa-sslify')
app.use(server('$ {_dirname}/build'))
app,use(enforceHttps())

app.use(serve('${_dirname}/build))

const port = process.env.PORT || 3000

app.listen(port, () => {
console.log('listening in port ${port}')
})

