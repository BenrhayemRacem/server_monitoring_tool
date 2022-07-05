import express from 'express'
import statsController from '../controllers/stats.controller'

const router = express.Router()

router.get('/all', statsController.getContainers)
router.get('/details/:id', statsController.getOneContainerDetails)
router.get('/images/all', statsController.getDockerImages)

export default router
