import { UserModel, UserSubscribeModel } from '../models'
import { Op } from '../utils/database'

export class UserService {
   // ПОДПИСКИ
   static async getSubscribes(tg_id) {
      const userSubscribes = await UserSubscribeModel.findAll({
         where: { tg_id: tg_id },
         row: true
      })
      return userSubscribes
   }

   static async subscribeAllModels({tg_id, allCars}) {
      await UserSubscribeModel.destroy({
         where: { tg_id: tg_id }
      })
      const subscribeModels = allCars.map((car) => {
         return {
            tg_id: tg_id,
            model: car.model_name,
            engine: car.engine_type,
            equipment: car.equipment_name,
         }
      })
      const subscribe = await UserSubscribeModel.bulkCreate(subscribeModels)
      return subscribe
   }

   static async subscribeAllEngines({tg_id, model, allCars}) {
      await UserSubscribeModel.destroy({
         where: [{ tg_id: tg_id }, { model: model }],
      })
      const subscribeEngines = []
      for (let car of allCars) {
         if (car.model_name === model) {
            subscribeEngines.push({
               tg_id: tg_id,
               model: model,
               engine: car.engine_type,
               equipment: car.equipment_name,
            })
         }
      }
      const subscribe = await UserSubscribeModel.bulkCreate(subscribeEngines)
      return subscribe
   }

   static async subscribeAllEquipments({tg_id, model, engine, allCars}) {
      await UserSubscribeModel.destroy({
         where: [{ tg_id: tg_id }, { model: model }, { engine: engine }],
      })
      const subscribeEquipments = []
      for (let car of allCars) {
         if ((car.model_name === model) && (car.engine_type === engine)) {
            subscribeEquipments.push({
               tg_id: tg_id,
               model: model,
               engine: engine,
               equipment: car.equipment_name,
            })
         }
      }
      UserSubscribeModel.bulkCreate(subscribeEquipments)
      return subscribeEquipments
   }

   static async checkEquipmentSubscribe(data) {
      let result = 'subscribe'
      const { tg_id, model, engine, equipment } = data
      const checkExactSubscribes = await UserSubscribeModel.findOne({
         where: [{ tg_id: tg_id }, { model: model }, { engine: engine }, { equipment: equipment }],
      })
      if (checkExactSubscribes) {
         checkExactSubscribes.destroy()
         result = 'unsubscribe'
      } else {
         UserSubscribeModel.create({
            tg_id: tg_id,
            model: model,
            engine: engine,
            equipment: equipment
         })
      }
      return {
         result: 'result'
      }
   }

   static async unsubscribeAll(tg_id) {
      const userSubscribes = await UserSubscribeModel.destroy({
         where: { tg_id: tg_id }
      })
      return {
         result: userSubscribes
      }
   }
   static async saveNewPhone(phone_num) {
      let data = {
         result: true,
         text: '🔔\nНомер успешно добавлен. \nТеперь вы можете авторизоваться в боте под указанным номером телефона.'
      }
      const user = await UserModel.findOne({
         where: { phone_num: phone_num }
      })
      if(user) {
         data.result = false
         data.text = 'Указанный номер уже привязан.'
      } else {
         UserModel.create({
            role_id: 2,
            phone_num: phone_num
         })
      }
      return data
   }
   static async confirmPhone(userData) {
      const user = await UserModel.findOne({
         where: { phone_num: userData.phone_num }
      })
      user.tg_id = userData.tg_id
      user.name = userData.name || 'User'
      await user.save()
      return user
   }
   static async deletePhone(userData) {
      console.log(userData)
      await UserModel.destroy({
         where: { phone_num: userData[1] },
      })
      await UserSubscribeModel.destroy({
         where: { tg_id: userData[0] },
      })
      return {
         result: true
      }
   }

   // ПОЛЬЗОВАТЕЛИ
   static async getAll() {
      const allUsers = await UserModel.findAll({ raw: true })
      return allUsers
   }

   static async findById(tg_id) {
      const user = await UserModel.findOne({
         where: { tg_id: tg_id }
      })
      return user
   }

   static async findByPhone(phone_num) {
      const users = await UserModel.findAll({
         row: true
      })
      return users.find(user => parseInt(user.phone_num) === parseInt(phone_num))
   }
}



