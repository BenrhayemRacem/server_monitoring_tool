import express from 'express'
import containersController from "../controllers/containers.controller"


const router = express.Router()


router.get("/" , containersController.listAllContainers)


export default router