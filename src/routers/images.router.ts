import express from 'express'
import imagesController from '../controllers/images.controller'


const router = express.Router()

router.get('/' , imagesController.listAllImages)
router.get('/:id' , imagesController.getOneImageDetails)
router.get('/history/:id' , imagesController.getHistoryOfOneImage)
router.post('/tag/:id' , imagesController.tagImage)
router.post('/prune' , imagesController.deleteUnusedImage)
router.delete('/:id' , imagesController.removeImage)





export default router