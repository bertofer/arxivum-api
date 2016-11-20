const Koa = require('koa')
const cors = require('koa-cors')
const log = require('./modules/logger')('arxivum:index')

const app = new Koa()

// Init database
require('./modules/database')

// TODO: Remove by default, allow by options.
app.use(cors())

// Global middlewares
const logger = require('./middleware/requestLogger')
app.use(logger)

const errorHandler = require('./middleware/errorHandler')
app.use(errorHandler)

const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// Init API routes
const apiRouter = require('./modules/apiRouter')
app.use(apiRouter.routes())

app.listen(3000)

log('App listening on port 3000')