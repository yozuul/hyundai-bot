import { $cars } from '../http'

export class CarController {
   static async getAllCars() {
      return $cars.get('/getAllCars')
   }
   static async getAllModelNames() {
      return $cars.get('/getAllModelNames')
   }
   static async getAllEngineTypes() {
      return $cars.get('/getAllEngineTypes')
   }
   static async getAllEquipmentNames() {
      return $cars.get('/getAllEquipmentNames')
   }
}