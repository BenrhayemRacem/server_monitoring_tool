
import { Request, Response } from 'express'
import axiosInstance from '../config/axios.config'
import { StatusCodes } from 'http-status-codes'
import { validateBodyAndParse } from '../utils/validateAndParse'
import { ContainersListParamsValidator } from '../services/validators/containersListParams.validator'


class ContainersController {

    async  listAllContainers(req:Request,res:Response) {

        try{

            const [params,error] = await validateBodyAndParse<ContainersListParamsValidator>(req.body,ContainersListParamsValidator) ;

            if(!params) return res.status(StatusCodes.BAD_REQUEST).json({error});
             axiosInstance({
                method : "get",
                url: '/containers/json',
                 params ,
            }).then((response)=>{
                return res.status(response.status).json(response.data)
             }).catch((error)=> {
                 //console.log(error)
                 return res.status(error.response.status).json(error.response.data)
             })

        }catch (e) {
            console.log(e)
            return res.status(StatusCodes.BAD_REQUEST).json(e)

        }
    }

}


export default new ContainersController()