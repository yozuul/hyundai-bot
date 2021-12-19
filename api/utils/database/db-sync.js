import { postgres } from './db-connect'

import { darkGray, red } from 'ansicolor'

import {
   defaultUser,
   defaultUserSubscribe,
   defaultCarName,
   defaultEngineType,
   defaultEquipmentName,
   defaultCars,
   defaultSettings
} from './default-db-data'

const pgSync = async (models) => {
   try {
      const {
         UserModel,
         UserSubscribeModel,
         CarModel,
         CarNameModel,
         EngineTypeModel,
         EquipmentNameModel,
         SettingsModel
      } = models

      await postgres.sync()
      await (async () => {
         const existUser = await UserModel.findAll({ row: true })
         if(existUser.length === 0) {
            UserModel.bulkCreate(defaultUser)
         }
         const existCars = await CarModel.findAll({ row: true })
         if(existCars.length === 0) {
            CarModel.bulkCreate(defaultCars)
         }
         const existCarName = await CarNameModel.findAll({ row: true })
         if(existCarName.length === 0) {
            CarNameModel.bulkCreate(defaultCarName)
         }
         const existEngineType = await EngineTypeModel.findAll({ row: true })
         if(existEngineType.length === 0) {
            EngineTypeModel.bulkCreate(defaultEngineType)
         }
         const existEquipmentName = await EquipmentNameModel.findAll({ row: true })
         if(existEquipmentName.length === 0) {
            EquipmentNameModel.bulkCreate(defaultEquipmentName)
         }
         const existSubscribes = await UserSubscribeModel.findAll({ row: true })
         if(existSubscribes.length === 0) {
            UserSubscribeModel.bulkCreate(defaultUserSubscribe)
         }
         const existSettings = await SettingsModel.findAll({ row: true })
         if(existSettings.length === 0) {
            SettingsModel.bulkCreate(defaultSettings)
         }
      })()
      } catch (err) {
         console.log(err)
         console.log(('Ошибка синхронизации таблиц').red)
   }
}

export default pgSync