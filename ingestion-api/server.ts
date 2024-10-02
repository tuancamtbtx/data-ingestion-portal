import express, { Application } from 'express'
import cors from 'cors'
import logger from '@src/utils/logger'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const allowedOrigins = ['http://localhost:3000', 'https://finops.tsengineering.io', '*']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions
  if (allowedOrigins.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate))



const PORT = 8080
const HOST_NAME = '0.0.0.0'

app.listen(PORT, HOST_NAME, () => {
  logger.info(`Server running on host ${HOST_NAME}: port ${PORT}`)
})
