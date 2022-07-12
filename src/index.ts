import express from 'express'
import 'reflect-metadata'
import 'es6-shim'
import statsRoute from './routers/stats.router'
import containersRoute from './routers/containers.router'

import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', statsRoute)
app.use('/containers', containersRoute)

app.listen(process.env.PORT, () => {
    console.log('Server started on port: ' + process.env.PORT)
})
