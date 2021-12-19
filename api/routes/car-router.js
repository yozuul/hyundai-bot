import { Router } from 'express'
import { CarController } from '../controllers'

const carRouter = new Router()

carRouter.get('/getAllCars', CarController.getAllCars)
carRouter.get('/getAllModelNames', CarController.getAllModelNames)
carRouter.get('/getAllEngineTypes', CarController.getAllEngineTypes)
carRouter.get('/getAllEquipmentNames', CarController.getAllEquipmentNames)

export { carRouter }