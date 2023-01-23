
import { Request, Response } from 'express'
import axiosInstance from '../config/axios.config'
import { StatusCodes } from 'http-status-codes'
import { validateBodyAndParse } from '../utils/validateAndParse'
import { NodeUpdateBodyValidator } from '../services/validators/nodeUpdateBody.validator'



class SwarmController {


    async getOneSwarmDetails(req:Request,res:Response) {
        try{
            axiosInstance({
                method : 'GET',
                url : '/swarm',


            }).then(response=>{
                return res.status(response.status).json(response.data)
            }).catch(error=>{
                return res
                    .status(error.response.status)
                    .json(error.response.data)
            })
        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async listAllSwarmNodes(req:Request, res:Response) {
        try{

            axiosInstance({
                method : 'GET',
                url : '/nodes',
            }).then(response =>{
                return res.status(response.status).json(response.data)
            }).catch(error=>{
                return res
                    .status(error.response.status)
                    .json(error.response.data)
            })
        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async inspectOneNode(req:Request,res:Response) {
        try{
            const id = req.params.id
            axiosInstance({
                method: 'GET',
                url: `/nodes/${id}`
            }).then(response =>{
                return res.status(response.status).json(response.data)
            }).catch(error=>{
                return res
                    .status(error.response.status)
                    .json(error.response.data)
            })
        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }

    async updateNode (req:Request,res:Response) {
        try{
            const id = req.params.id ;
            const [data,error] = await validateBodyAndParse<NodeUpdateBodyValidator>(req.body,NodeUpdateBodyValidator)
            if (!data)
                return res.status(StatusCodes.BAD_REQUEST).json({ error })
            axiosInstance({
                method: 'GET',
                url: `/nodes/${id}`
            }).then(response =>{
                // @ts-ignore
                const body = {Availability:response.data.Spec.Availability , Role :response.data.Spec.Role,...data}
                const version = response.data.Version.Index
                axiosInstance({
                    method :'POST',
                    url : `/nodes/${id}/update?version=${version}`,
                    data:body
                }).then(response => res.status(response.status).json(response.data))
                    .catch(err=>res.status(err.response.status).json(err.response.data))
            }).catch(error=>{
                return res
                    .status(error.response.status)
                    .json(error.response.data)
            })

        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e)
        }
    }


}


export default new SwarmController()