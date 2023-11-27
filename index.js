import express from 'express'
import dotenv from 'dotenv'
import { authRouter, eventsRouter } from './routes/index.js'
import { dbConnection } from './database/config.js'
import cors from 'cors'

dotenv.config()

const app = express()

// Serve static assets
app.use(express.static('public'))

// CORS config
app.use(cors())

// Parse body requests
app.use(express.json())

// DB Connection
dbConnection()

// Routes
app.use('/api/auth', authRouter)
app.use('/api/events', eventsRouter)

const port = process.env.PORT
app.listen(port, () => console.log(`Server runing on ${port}`))
