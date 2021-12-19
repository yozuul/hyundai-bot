import pgSync from '../utils/database/db-sync'

import UserModel from './user-model'
import CarModel from './car-model'
import CarNameModel from './model-name-model'
import EngineTypeModel from './engine-type-model'
import EquipmentNameModel from './equipment-name-model'
import UserSubscribeModel from './user-subscribe-model'
import SettingsModel from './settings-model'

pgSync({
   UserModel: UserModel,
   UserSubscribeModel: UserSubscribeModel,
   CarModel: CarModel,
   CarNameModel: CarNameModel,
   EngineTypeModel: EngineTypeModel,
   EquipmentNameModel: EquipmentNameModel,
   SettingsModel: SettingsModel,
})

export {
   UserModel,
   UserSubscribeModel,
   CarModel,
   CarNameModel,
   EngineTypeModel,
   EquipmentNameModel,
   SettingsModel,
}