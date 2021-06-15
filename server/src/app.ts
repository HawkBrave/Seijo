import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import indexRouter from './routes/index'
import loginRouter from './routes/login'
import usersRouter from './routes/users'
import postsRouter from './routes/posts'
import { errorHandler } from './utils/error'

const app = express()

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.use(errorHandler)

module.exports = app