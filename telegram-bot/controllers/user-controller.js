import { $users } from '../http'

export class UserController {
   static async getAll() {
      return $users.get('/getAll')
   }
   static findById(tg_id) {
      return $users.post('/findById', tg_id)
   }
   static findByPhone(phone_num) {
      return $users.post('/findByPhone', phone_num)
   }
   static getSubscribes(tg_id) {
      return $users.post('/getSubscribes', tg_id)
   }
   static subscribeAllModels(data) {
      return $users.post('/subscribeAllModels', data)
   }
   static subscribeAllEngines(data) {
      return $users.post('/subscribeAllEngines', data)
   }
   static subscribeAllEquipments(data) {
      return $users.post('/subscribeAllEquipments', data)
   }
   static checkEquipmentSubscribe(data) {
      return $users.post('/checkEquipmentSubscribe', data)
   }
   static unsubscribeAll(data) {
      return $users.post('/unsubscribeAll', data)
   }
   static saveNewPhone(data) {
      return $users.post('/saveNewPhone', data)
   }
   static deletePhone(data) {
      return $users.post('/deletePhone', data)
   }
   static confirmPhone(data) {
      return $users.post('/confirmPhone', data)
   }
}