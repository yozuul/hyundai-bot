import { CarModel, CarNameModel, EngineTypeModel, EquipmentNameModel } from '../models'

export class CarService {
    static async getAllCars() {
        const allCars = await CarModel.findAll({ raw : true })
        return allCars
    }
    static async getAllModelNames() {
        const allModels = await CarNameModel.findAll({ raw : true })
        return allModels
    }
    static async getAllEngineTypes() {
        const allEngines = await EngineTypeModel.findAll({ raw : true })
        return allEngines
    }
    static async getAllEquipmentNames() {
        const allEquipments = await EquipmentNameModel.findAll({ raw : true })
        return allEquipments
    }
}



