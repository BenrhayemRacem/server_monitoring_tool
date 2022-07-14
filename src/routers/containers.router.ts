import express from 'express'
import containersController from '../controllers/containers.controller'

const router = express.Router()

router.get('/', containersController.listAllContainers)
router.get('/:id', containersController.getOneContainerDetails)
router.post('/start/:id', containersController.startContainer)
router.post('/create', containersController.createContainer)
router.post('/restart/:id', containersController.restartContainer)
router.post('/stop/:id', containersController.stopContainer)
router.post('/kill/:id', containersController.killContainer)
router.post('/pause/:id', containersController.pauseContainer)
router.post('/unpause/:id', containersController.unpauseContainer)
router.post('/rename/:id/:newName', containersController.renameContainer)

router.delete('/:id', containersController.removeContainer)

export default router
