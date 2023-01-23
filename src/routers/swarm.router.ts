import express from 'express'
import swarmController from '../controllers/swarm.controller'

const router = express.Router()

router.get('/' , swarmController.getOneSwarmDetails)
router.get('/nodes' , swarmController.listAllSwarmNodes)
router.get('/nodes/:id' , swarmController.inspectOneNode)
router.put('/nodes/:id' , swarmController.updateNode)


export default router