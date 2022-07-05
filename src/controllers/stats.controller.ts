import { StatusCodes } from 'http-status-codes'
import { Request, Response } from 'express'

const dockerstats = require('dockerstats')

class StatsController {
    async getContainers(req: Request, res: Response) {
        try {
            const data = await dockerstats.dockerContainers()
            return res.status(StatusCodes.OK).json(data)
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async getOneContainerDetails(req: Request, res: Response) {
        try {
            const containerId = req.params.id
            const data = await dockerstats.dockerContainerStats(containerId)
            return res.status(StatusCodes.OK).json(data)
        } catch (e) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async getDockerImages(req: Request, res: Response) {
        try {
            const data = await dockerstats.dockerImages()
            return res.status(StatusCodes.OK).json(data)
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
}

export default new StatsController()
