import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

const instance = axios.create({
    baseURL: `${process.env.DOCKER_API_BASE_URL}:${process.env.DOCKER_API_PORT}`,
})

export default instance
