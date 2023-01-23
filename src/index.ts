import express from 'express'
import 'reflect-metadata'
import 'es6-shim'
import statsRoute from './routers/stats.router'
import containersRoute from './routers/containers.router'
import imagesRoute from './routers/images.router'
import swarmRoute from './routers/swarm.router'


import dotenv from 'dotenv'
import { task } from './services/crons/nodeStatus-cron'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', statsRoute)
app.use('/containers', containersRoute)
app.use('/images', imagesRoute)
app.use('/swarm' , swarmRoute)

app.listen(process.env.PORT, () => {
    console.log('Server started on port: ' + process.env.PORT)
    console.log(process.env.DOCKER_API_BASE_URL)
    task.start()
})
