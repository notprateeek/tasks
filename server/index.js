// import modules
import express from 'express'
import { connect } from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import 'dotenv/config'
import allRoutes from './routes/index.js'

// app
const app = express()

// db
connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// middleware
app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser())

// routes
app.use('/api', allRoutes)

// error handlers
// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, next) => {
  const status = error.statusCode || 500
  const message = error.message || 'Internal Server Error'

  return res.status(status).json({ message, stack: error.stack })
})

// port
const port = process.env.PORT || 8080

// listener
app.listen(port)
