import { CarController } from '../../controllers'

class InlineKeyboard {
   async init() {
      const menuData = {
         allCars: await CarController.getAllCars(),
         models: await CarController.getAllModelNames(),
         engines: await CarController.getAllEngineTypes(),
         equipments: await CarController.getAllEquipmentNames(),
      }
      this.allCars = menuData.allCars.data
      this.modelNames = menuData.models.data
      this.engineTypes = menuData.engines.data
      this.equipmentNames = menuData.equipments.data
      return {
         allCars: this.allCars,
         modelNames: this.modelNames,
         engineTypes: this.engineTypes,
         equipmentNames: this.equipmentNames,
      }
   }

   selectCity() {
      return [
         [{
            text: '<-',
            callback_data: 'prev',
         },{
            text: 'Ростов-на-Дону',
            callback_data: 'select_city_1',
         }],
         [{
            text: 'Москва и подмосковье',
            callback_data: 'select_city_2',
         },{
            text: 'Екатеринбург',
            callback_data: 'select_city_3',
         }],
         [{
            text: 'Тула',
            callback_data: 'select_city_4',
         },{
            text: 'Тюмень',
            callback_data: 'select_city_5',
         }],
      ]
   }
   selectDiler() {
      return [
         [{
            text: 'Акрос',
            callback_data: 'select_diler_1',
         },{
            text: 'Major',
            callback_data: 'select_diler_2',
         }],
         [{
            text: 'Центр Зеленоград',
            callback_data: 'select_diler_3',
         },{
            text: 'Фаворит Моторс Восток',
            callback_data: 'select_diler_4',
         }],
         [{
            text: 'Фаворит Моторс Север',
            callback_data: 'select_diler_5',
         },{
            text: 'СИМ',
            callback_data: 'select_diler_6',
         }],
      ]
   }
   selectPayment() {
      return [
         [{
            text: 'В кредит',
            callback_data: 'credit',
         }],
         [{
            text: 'Наличные',
            callback_data: 'nal',
         }]
      ]
   }

   bookThis() {
      return {
         first: () => {
            return {
               image: 'https://www.masmotors.ru/colors/hyundai-sonata/10.png',
               caption: `SONATA Classic\n2.0 MPI - 6AT\n\nЦвет: БЕЛЫЙ\nКоробка передач: Автоматическая\nПривод: Передний\nСтоимость: 1852000 ₽\n\nhttps://showroom.hyundai.ru/model/e0931bca-75be-45d1-9c81-edf80ada05dd`,
               button: [[{
                  text: 'Бронировать',
                  callback_data: 'book_this',
               }]]
            }
         },
         second: () => {
            return {
               image: 'https://www.masmotors.ru/colors/hyundai-creta/14.png',
               caption: `Новая CRETA Classic\n1.6л 6MT 2WD\n\nЦвет: ЧЕРНЫЙ\nКоробка передач: Механическая\nПривод: Передний\nСтоимость: 1344000 ₽\n\nОсобенности\n\n+Подогрев руля\n\n+Подогрев лобового стекла\n\n+Подогрев форсунок стеклоомывателя\n\n+Отделка руля кожей\n\nhttps://showroom.hyundai.ru/model/ce89f873-69c8-4dbf-a5aa-b533a40c6ea4`,
               button: [[{
                  text: 'Бронировать',
                  callback_data: 'book_this',
               }]]
            }
         }
      }
   }

   // МОДЕЛИ
   async getModelsKeyboard(userSubscribes) {
      const carModelsKeyboard = []
      let keyboardRow = []
      if(this.modelNames) {
         for(let model of this.modelNames) {
            const buttonIcon = this.checkModelSubscribe(model.callback_action, userSubscribes)
            keyboardRow.push({
               text: `${buttonIcon} ${model.model_name}`,
               callback_data: model.callback_action
            })
            if(keyboardRow.length === 3) {
               carModelsKeyboard.push(keyboardRow)
               keyboardRow = []
            }
         }
         keyboardRow.length > 0 ? carModelsKeyboard.push(keyboardRow) : ''
         carModelsKeyboard.push([{
            text: 'Любая',
            callback_data: 'subscribe_all_models',
         }])
         return carModelsKeyboard
      }
   }
   // ДВИГАТЕЛИ
   getEnginesKeyboard(modelShortcut, userSubscribes) {
      const enginesKeyboard = []
      const engineShortcuts = new Set()
      const engineShortcutsArr = []
      let keyboardRow = []
      if(this.allCars) {
         for(let car of this.allCars) {
            if(car.model_name === modelShortcut) {
               engineShortcuts.add(car.engine_type)
            }
         }
         for(let foundedEngine of engineShortcuts) {
            const engine = this.engineTypes.find((engineType) => {
               if(engineType.callback_action === foundedEngine) {
                  return foundedEngine
               }
            })
            engineShortcutsArr.push(engine.callback_action)
            if(engine) {
               const buttonIcon = this.checkEngineSubscribe(foundedEngine, userSubscribes)
               keyboardRow.push({
                  text: `${buttonIcon} ${engine.engine_type}`,
                  callback_data: engine.callback_action
               })
               if(keyboardRow.length === 2) {
                  enginesKeyboard.push(keyboardRow)
                  keyboardRow = []
               }
            }
         }
         keyboardRow.length > 0 ? enginesKeyboard.push(keyboardRow) : ''
         enginesKeyboard.push([{
            text: 'Любая',
            callback_data: 'subscribe_all_engines',
         }])
      }
      return {
         keyboard: enginesKeyboard,
         enginesData: engineShortcuts,
         enginesList: engineShortcutsArr
      }
   }
   // КОМПЛЕКТАЦИИ
   getEquipmentsKeyboard(engineShortcut, modelShortcut, userSubscribes) {
      const equipmentKeyboard = []
      const equipmentShortcutsArr = []
      let keyboardRow = []
      if(this.allCars) {
         for(let car of this.allCars) {
            if((car.model_name === modelShortcut) && (car.engine_type === engineShortcut)) {
               equipmentShortcutsArr.push(car.equipment_name)
            }
         }
         for(let foundedEquipment of equipmentShortcutsArr) {
            const equipment = this.equipmentNames.find((equipmentName) => {
               if(equipmentName.callback_action === foundedEquipment) {
                  return foundedEquipment
               }
            })
            if(equipment) {
               const buttonIcon = this.checkEquipmentSubscribe(
                  foundedEquipment, engineShortcut, modelShortcut, userSubscribes
               )
               keyboardRow.push({
                  text: `${buttonIcon} ${equipment.equipment_name}`,
                  callback_data: equipment.callback_action
               })
               if(keyboardRow.length === 2) {
                  equipmentKeyboard.push(keyboardRow)
                  keyboardRow = []
               }
            }
         }
         keyboardRow.length > 0 ? equipmentKeyboard.push(keyboardRow) : ''
         equipmentKeyboard.push([{
            text: 'Любая',
            callback_data: 'subscribe_all_equipment',
         }])
      }
      return {
         keyboard: equipmentKeyboard,
         equipmentList: equipmentShortcutsArr
      }
   }

   checkModelSubscribe(callback_action, userSubscribes) {
      let buttonIcon = '✅'
      for(let subscribe of userSubscribes) {
         if(subscribe.model === callback_action) buttonIcon = '❎'
      }
      return buttonIcon
   }
   checkEngineSubscribe(callback_action, userSubscribes) {
      let buttonIcon = '✅'
      if(!userSubscribes) return
      for(let subscribe of userSubscribes) {
         if(subscribe.engine === callback_action) buttonIcon = '❎'
      }
      return buttonIcon
   }
   checkEquipmentSubscribe(equipment, engine, model, userSubscribes) {
      let buttonIcon = '✅'
      for(let sub of userSubscribes) {
         if((sub.model === model) && (sub.engine === engine) && (sub.equipment === equipment)) {
            buttonIcon = '❎'
         }
      }
      return buttonIcon
   }

   existPhones(users) {
      const phonesKeyboard = []
      for(let user of users) {
         if(user.role_id === 2) {
            phonesKeyboard.push([{
               text: `${user.phone_num} ❌`,
               callback_data: user.phone_num,
            }])
         }
      }
      return phonesKeyboard
   }

   subscribeSuccess() {
      return [[{
         text: 'Подписаться ещё на одну',
         callback_data: 'reload_menu',
      }]]
   }
   unSubscribeSuccess() {
      return [[{
         text: 'Вы отписались.',
         callback_data: 'reload_menu',
      }]]
   }
   confirmLoginInit() {
      return [[{
         text: 'Подтвердить',
         callback_data: 'send_auth_code_init',
      }]]
   }
   confirmAuth() {
      return [[{
         text: 'Отправить код',
         callback_data: 'send_auth_code',
      }]]
   }
   settings() {
      return [
         [
            {
               text: 'Город по умолчанию',
               callback_data: 'settings:change_city',
            },
            {
               text: 'Дилер по умолчанию',
               callback_data: 'settings:change_diler',
            }
         ],
         [{
            text: 'Кнопка метода оплаты',
            callback_data: 'settings:change_payment_method',
         }]
         // [{
         //    text: '🔔 - Уведомлить о наличии - 🔔',
         //    callback_data: 'send_request_all',
         // }]
      ]
   }

   get cars() {
      return {
         models: this.modelNames,
         engines: this.engineTypes
      }
   }
}

export { InlineKeyboard }