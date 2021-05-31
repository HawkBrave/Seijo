import express, { ErrorRequestHandler } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import indexRouter from './routes/index'
import usersRouter from './routes/users'
import postsRouter from './routes/posts'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use((err: any, 
  _request: express.Request, 
  response: express.Response, 
  _next: express.NextFunction) => {
  console.log(err)
  response.status(500).send("Error: " + err)
})

module.exports = app