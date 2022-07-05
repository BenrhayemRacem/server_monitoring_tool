import statsRoute from './routers/stats.router'

import express from 'express'

import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', statsRoute)


app.listen(process.env.PORT, () => {


    console.log('Server started on port: ' + process.env.PORT)
})
