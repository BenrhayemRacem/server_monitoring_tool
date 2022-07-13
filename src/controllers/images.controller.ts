
import {Request,Response} from 'express'
import axiosInstance from '../config/axios.config'
import { StatusCodes } from 'http-status-codes'
import { validateBodyAndParse } from '../utils/validateAndParse'
import { ImageBuildParamsValidator } from '../services/validators/imageBuildParams.validator'

class ImagesController {

    async listAllImages(req: Request, res: Response) {
        try {
            const all = req.query.all ? req.query.all : false;
            axiosInstance({
                method: 'GET',
                url: `/images/json?all=${all}`
            }).then(response => res.status(StatusCodes.OK).json(response.data))
                .catch(err => res.status(err.response.status).json(err.response.data))

        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async getOneImageDetails(req: Request, res: Response) {
        try {
            const id = req.params.id;
            axiosInstance({
                method: 'GET',
                url: `/images/${id}/json`
            }).then(response => res.status(response.status).json(response.data))
                .catch(err => res.status(err.response.status).json(err.response.data))
        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    /** Return parent layers of an image **/

    async getHistoryOfOneImage(req: Request, res: Response) {

        try{
            const id = req.params.id;
        axiosInstance({
            method: 'GET',
            url: `/images/${id}/history`
        }).then(response => res.status(response.status).json(response.data))
            .catch(err => res.status(err.response.status).json(err.response.data))
    }

    catch(e) {
        console.log(e)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
    }
}

    async tagImage(req:Request,res:Response) {
        try{
            const id = req.params.id;
            const repo = req.query.repo  ? req.query.repo : "" ;
            const tag = req.query.tag? req.query.tag : "" ;
            axiosInstance({
                method: 'POST',
                url: `/images/${id}/tag?repo=${repo}&tag=${tag}`
            }).then(response => res.status(response.status).json({message:`new tag: ${repo}:${tag}`}))
                .catch(err => res.status(err.response.status).json(err.response.data))
        }

        catch (e) {
        console.log(e)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async removeImage(req:Request,res:Response) {
        try {
            const id = req.params.id;
            const force = req.query.force ? req.query.force : false
            const noprune = req.query.noprune ? req.query.noprune : false
            axiosInstance({
                method: 'DELETE',
                url: `/images/${id}?force=${force}&noprune=${noprune}`
            }).then(response => res.status(response.status).json(response.data))
                .catch(err => res.status(err.response.status).json(err.response.data))


        } catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }
    
    async deleteUnusedImage(req:Request,res:Response) {
        try{
            const dangling = req.query.dangling ? req.query.dangling : true ;
            axiosInstance({
                method: 'POST',
                url: `/images/prune`,
                params : {
                    dangling : [dangling]
                }
            }).then(response => res.status(response.status).json(response.data))
                .catch(err => res.status(err.response.status).json(err.response.data))

        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async buildImage(req:Request,res:Response) {
        try {

            const [params, error] =await validateBodyAndParse<ImageBuildParamsValidator>(
                req.body,
                ImageBuildParamsValidator
            )
            if (!params)
                return res.status(StatusCodes.BAD_REQUEST).json({ error })
            axiosInstance({
                method : 'POST',
                url : '/build',
                params,
            }).then(response => res.status(response.status).json(response.data))
                .catch(err => res.status(err.response.status).json(err.response.data))
        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

}



export default new ImagesController()