import { Request, Response } from 'express'
import axiosInstance from '../config/axios.config'
import { StatusCodes } from 'http-status-codes'
import { validateBodyAndParse } from '../utils/validateAndParse'
import { ContainersListParamsValidator } from '../services/validators/containersListParams.validator'
import { ContainerCreateBodyValidator } from '../services/validators/containerCreateBody.validator'

class ContainersController {
    async listAllContainers(req: Request, res: Response) {
        try {
            const [params, error] =
                await validateBodyAndParse<ContainersListParamsValidator>(
                    req.body,
                    ContainersListParamsValidator,
                )

            if (!params)
                return res.status(StatusCodes.BAD_REQUEST).json({ error })
            axiosInstance({
                method: 'get',
                url: '/containers/json',
                params,
            })
                .then((response) => {
                    return res.status(response.status).json(response.data)
                })
                .catch((error) => {
                    //console.log(error)
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async getOneContainerDetails(req: Request, res: Response) {
        try {
            const id = req.params.id
            axiosInstance({
                url: `/containers/${id}/json`,
            })
                .then((response) => {
                    return res.status(response.status).json(response.data)
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async startContainer(req: Request, res: Response) {
        try {
            const id = req.params.id
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/start`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: 'container started successfully' })
                })
                .catch((error) => {
                    if (error.response.status === StatusCodes.NOT_MODIFIED) {
                        return res
                            .status(StatusCodes.BAD_REQUEST)
                            .json({ message: 'container already started' })
                    }
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async stopContainer(req: Request, res: Response) {
        try {
            const id = req.params.id
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/stop`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: 'container stopped successfully' })
                })
                .catch((error) => {
                    if (error.response.status === StatusCodes.NOT_MODIFIED) {
                        return res
                            .status(StatusCodes.BAD_REQUEST)
                            .json({ message: 'container already stopped' })
                    }
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async restartContainer(req: Request, res: Response) {
        try {
            const id = req.params.id
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/restart`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: 'container restarted successfully' })
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async killContainer(req: Request, res: Response) {
        try {
            const id = req.params.id
            const signal = req.query.signal ? req.query.signal : 'SIGKILL'
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/kill?signal=${signal}`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: 'container killed successfully' })
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
    async pauseContainer(req:Request,res:Response) {
        try {
            const id = req.params.id
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/pause`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: 'container paused successfully' })
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
    async unpauseContainer(req:Request,res:Response) {
        try {
            const id = req.params.id
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/unpause`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: 'container unpaused successfully' })
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
    async renameContainer(req: Request, res: Response) {
        try {
            const id = req.params.id
            const newName = req.params.newName
            axiosInstance({
                method: 'POST',
                url: `/containers/${id}/rename?name=${newName}`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: `container new name is: ${newName}` })
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async removeContainer(req:Request,res:Response) {
        try {
            const id = req.params.id
            const v = req.query.v? req.query.v : false ;
            const force = req.query.force? req.query.force : false ;
            const link = req.query.link? req.query.link : false ;

            axiosInstance({
                method: 'DELETE',
                url: `/containers/${id}?link=${link}&v=${v}&force=${force}`,
            })
                .then(() => {
                    return res
                        .status(StatusCodes.OK)
                        .json({ message: `container removed successfully` })
                })
                .catch((error) => {
                    return res
                        .status(error.response.status)
                        .json(error.response.data)
                })
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async createContainer (req:Request,res:Response) {
        try{
            const url = req.query.name  ? `/containers/create?name=${req.query.name}` :`/containers/create` ;
            const [data,error] = await validateBodyAndParse<ContainerCreateBodyValidator>(req.body,ContainerCreateBodyValidator);
            if(!data) return res.status(StatusCodes.BAD_REQUEST).json({error})
            axiosInstance({
                method : 'POST',
                url,
                data
            }).then(response => res.status(response.status).json(response.data))
                .catch(err=>res.status(err.response.status).json(err.response.data))

        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
}

export default new ContainersController()
