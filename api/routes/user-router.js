import { Router } from 'express'
import { UserController } from '../controllers'

const userRouter = new Router()

userRouter.get('/getAll', UserController.getAll)
userRouter.post('/findById', UserController.findById)
userRouter.post('/findByPhone', UserController.findByPhone)
userRouter.post('/getSubscribes', UserController.getSubscribes)
userRouter.post('/subscribeAllModels', UserController.subscribeAllModels)
userRouter.post('/subscribeAllEngines', UserController.subscribeAllEngines)
userRouter.post('/subscribeAllEquipments', UserController.subscribeAllEquipments)
userRouter.post('/checkEquipmentSubscribe', UserController.checkEquipmentSubscribe)
userRouter.post('/unsubscribeAll', UserController.unsubscribeAll)
userRouter.post('/saveNewPhone', UserController.saveNewPhone)
userRouter.post('/confirmPhone', UserController.confirmPhone)
userRouter.post('/deletePhone', UserController.deletePhone)

export { userRouter }