import { CarService } from '../services'

export class ParserController {
    static async getAllCars (req, res, next) {
        try {
            const cars = await CarService.getAllCars()
            return res.json(cars)
        } catch (err) {
            next(err)
        }
    }
    static async getAllModelNames (req, res, next) {
        try {
            const models = await CarService.getAllModelNames()
            return res.json(models)
        } catch (err) {
            next(err)
        }
    }
    static async getAllEngineTypes (req, res, next) {
        try {
            const engines = await CarService.getAllEngineTypes()
            return res.json(engines)
        } catch (err) {
            next(err)
        }
    }
    static async getAllEquipmentNames (req, res, next) {
        try {
            const equipments = await CarService.getAllEquipmentNames()
            return res.json(equipments)
        } catch (err) {
            next(err)
        }
    }
}
