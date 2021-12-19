import { UserController, SettingsController } from '../controllers'
import { InlineKeyboard, ReplyKeyboard } from './keyboards'

export class MainMenu {
   constructor(bot) {
      this.bot = bot
      this.user = {}
   }
   async init(users) {
      for(let user of users) {
         const chat_id = user.tg_id
         this.user[chat_id] = {
            chat_id: chat_id,
            role_id: user.role_id,
            phone_num: user.phone_num,
            curentSelected: {},
         }
      }
      this.inlineKeyboard = new InlineKeyboard()
      const { allCars, modelNames, engineTypes, equipmentNames } = await this.inlineKeyboard.init()
      this.allCars = allCars
      this.modelNames = modelNames
      this.engineTypes = engineTypes
      this.equipmentNames = equipmentNames
   }

   // МЕНЮ АДМИНА
   async botSettings(chat_id) {
      if(this.user[chat_id].role_id === 1) {
         const title = '🛠 НАСТРОЙКИ'
         const menu = await this.bot.sendMessage(chat_id, title, {
            reply_markup: JSON.stringify({
               inline_keyboard: await this.inlineKeyboard.settings()
            })
         })
         this.user[chat_id].settings_menu_id = menu.message_id
         this.user[chat_id].currentMenu = 'settings'
         this.user[chat_id].menuPath = '/settings'
      }
   }
   // Редактировать настройки
   async changeSettings(chat_id) {
      const { data: settings } = await SettingsController.getBotSettings()
      const message = async (text) => this.bot.sendMessage(chat_id, text)
      await this.bot.deleteMessage(chat_id, this.user[chat_id].settings_menu_id)
      return {
         city: () => {
            const title = `Текущий город по умолчанию: \n${settings.default_city}\nДля изменения города, отправьте его название в чат`
            message(title)
            this.user[chat_id].currentMenu = 'changeCity'
         },
         diler: () => {
            const title = `Текущий дилер по умолчанию: \n${settings.default_diler} (${settings.default_city})\nДля изменения дилера, отправьте его название в чат`
            message(title)
            this.user[chat_id].currentMenu = 'changeDiler'
         },
         payment: () => {
            const title = `Текущий метод оплаты при бронировании: \n${settings.default_payment}\nДля изменения метода оплаты, отправьте навзание в чат`
            message(title)
            this.user[chat_id].currentMenu = 'changePayment'
         },
      }
   }

   async checkSettings(chat_id, text) {
      if((this.user[chat_id].role_id !== 1) || (this.user[chat_id].menuPath !== '/settings')) return
      if(this.user[chat_id].currentMenu === 'changeCity') {
         const title = `Город успешно изменён на ${text}.\nИзменения вступят в силу после очередной перезагрузки бота`
         SettingsController.setDefaultCity(text)
         await this.bot.sendMessage(chat_id, title)
         await this.botSettings(chat_id)
      }
      if(this.user[chat_id].currentMenu === 'changeDiler') {
         const title = `Дилер успешно изменён на ${text}.\nИзменения вступят в силу после очередной перезагрузки бота`
         SettingsController.setDefaultDiler(text)
         await this.bot.sendMessage(chat_id, title)
         await this.botSettings(chat_id)
      }
      if(this.user[chat_id].currentMenu === 'changePayment') {
         const title = `Метод оплаты успешно изменён на ${text}.\nИзменения вступят в силу после очередной перезагрузки бота`
         SettingsController.setDefaultPayment(text)
         await this.botSettings(chat_id)
      }
   }

   async addNewPhone(chat_id) {
      if(this.user[chat_id].role_id === 1) {
         if(!this.user[chat_id].menu_id) { await this.started(chat_id) }
         const title = 'Для удаления привязанного телефона, нажмите на соотвествующую кнопку с его номером.\nДля добавления нового, отправьте его номер в чат в формате: \n+7xxxxxxxxxx'
         const users = await UserController.getAll()
         await this.bot.editMessageText(title, {
            chat_id: chat_id,
            message_id: this.user[chat_id].menu_id,
            reply_markup: JSON.stringify({
               inline_keyboard: this.inlineKeyboard.existPhones(users.data)
            })
         })
      }
      this.user[chat_id].currentMenu = 'addNewPhone'
      this.user[chat_id].menuPath = '/addNewPhone'
   }

   async deletePhone(chat_id, phone_num) {
      if(this.user[chat_id].currentMenu = 'addNewPhone') {
         await UserController.deletePhone([chat_id, phone_num])
         await this.bot.deleteMessage(chat_id, this.user[chat_id].menu_id)
      }
   }

   async saveNewPhone(chat_id, phoneNumber) {
      const checkCorrectPhone = parseInt(phoneNumber)
      if(this.user[chat_id].currentMenu = 'addNewPhone') {
         if(checkCorrectPhone.toString().length === 11) {
            const user = await UserController.saveNewPhone([phoneNumber])
            await this.bot.sendMessage(chat_id, user.data.text)
            this.started(chat_id)
         } else {
            await this.bot.sendMessage(chat_id, 'Номер указан не верно')
            return
         }
      }
   }

   async started(chat_id) {
      const userSubscribe = await UserController.getSubscribes([chat_id])
      if(!this.user[chat_id]) return
      if(this.user) {
         this.user[chat_id].userSubscribe = userSubscribe.data
         if (this.user[chat_id].role_id === 1) {
            await this.bot.sendMessage(chat_id, 'ВЫ ВОШЛИ КАК АДМИНИСТРАТОР', {
               reply_markup: {
                  keyboard: ReplyKeyboard.startedAdmin,
                  resize_keyboard: true
               }
            })
         }
         if (this.user[chat_id].role_id === 2) {
            await this.bot.sendMessage(chat_id, 'Добро пожаловать', {
               reply_markup: {
                  keyboard: ReplyKeyboard.startedUser,
                  resize_keyboard: true
               }
            })
         }
         const startedMenu = await this.bot.sendMessage(chat_id, 'Давайте приступим к подбору автомобиля', {
            reply_markup: JSON.stringify({
               inline_keyboard: await this.inlineKeyboard.getModelsKeyboard(this.user[chat_id].userSubscribe)
            })
         })
         this.user[chat_id].menu_id = startedMenu.message_id
         this.user[chat_id].currentMenu = 'started'
         this.user[chat_id].menuPath = 'models'
      }
      return
   }

   async sendNotify({text, users}) {
      for(let chat_id of users) {
         await this.bot.sendMessage(chat_id, text)
      }
   }

   async getEnginesMenu(chat_id, modelShortcut) {
      if(!this.user[chat_id]) return
      console.log(this.user)
      const menuTitle = 'Вас интересует любая модификация или же есть какие-то предпочтения?'
      this.enginesMenuData = this.inlineKeyboard?.getEnginesKeyboard(
         modelShortcut, this.user[chat_id].userSubscribe
      )
      if(this.enginesMenuData) {
         this.bot.editMessageText(menuTitle, {
            chat_id: chat_id,
            message_id: this.user[chat_id].menu_id,
            reply_markup: JSON.stringify({
               inline_keyboard: this.enginesMenuData.keyboard
            })
         })
      }
      this.user[chat_id].currentMenu = 'engines'
      this.user[chat_id].menuPath += '/engines'
      this.user[chat_id].curentSelected.model = modelShortcut
   }

   async getEquipmentsMenu(chat_id, engineShortcut) {
      if(!this.user[chat_id]) return
      const title = 'Вас интересует любая комплектация или же есть какие-то предпочтения?'
      this.equipmentsMenuData = this.inlineKeyboard?.getEquipmentsKeyboard(
         engineShortcut, this.user[chat_id].curentSelected.model, this.user[chat_id].userSubscribe
      )
      if (this.equipmentsMenuData) {
         this.bot.editMessageText(title, {
            chat_id: chat_id,
            message_id: this.user[chat_id].menu_id,
            reply_markup: JSON.stringify({
               inline_keyboard: this.equipmentsMenuData.keyboard
            })
         })
      }
      this.user[chat_id].currentMenu = 'equipments'
      this.user[chat_id].menuPath += '/equipments'
      this.user[chat_id].curentSelected.engine = engineShortcut
   }
   // ПОДПИСКА
   async subscribeAllModels(chat_id) {
      if(!this.user[chat_id]) return
      await UserController.subscribeAllModels({
         tg_id: chat_id,
         allCars: this.allCars
      })
      await this.subscribeSuccess(chat_id)
   }

   async subscribeAllEngines(chat_id) {
      if(!this.user[chat_id]) return
      await UserController.subscribeAllEngines({
         tg_id: chat_id,
         model: this.user[chat_id].curentSelected.model,
         modelName: this.user[chat_id].curentSelected.model,
         allCars: this.allCars
      })
      await this.subscribeSuccess(chat_id)
   }

   async subscribeAllEquipments(chat_id) {
      if(!this.user[chat_id]) return
      const curentSelected = this.user[chat_id].curentSelected
      await UserController.subscribeAllEquipments({
         tg_id: chat_id,
         model: curentSelected.model,
         engine: curentSelected.engine,
         allCars: this.allCars
      })
      this.subscribeSuccess(chat_id)
   }
   // Проверка подписок на комплектации
   async checkEquipmentSubscribe(chat_id, equipmentshortcuts) {
      if(!this.user[chat_id]) return
      const user = this.user[chat_id]
      user.curentSelected.equipment = equipmentshortcuts
      const { model, engine, equipment } = user.curentSelected
      const founded = await UserController.checkEquipmentSubscribe({
         tg_id: user.chat_id,
         model: model,
         engine: engine,
         equipment: equipment
      })
      if(founded.data.result === 'unsubscribe') {
         this.unsubscribeEquipment(chat_id)
      } else {
         this.subscribeSuccess(chat_id)
      }
   }
   // Отмена подписки на комплектацию
   async unsubscribeEquipment(chat_id) {
      if(!this.user[chat_id]) return
      await this.bot.editMessageText('Вы отписались.', {
         chat_id: chat_id,
         message_id: this.user[chat_id].menu_id,
         reply_markup: JSON.stringify({
            inline_keyboard: this.inlineKeyboard.subscribeSuccess()
         })
      })
   }
   // Успешная подписка
   async subscribeSuccess(chat_id) {
      await this.bot.editMessageText('Спасибо, мы сообщим когда появится автомобиль для вас.', {
         chat_id: chat_id,
         message_id: this.user[chat_id].menu_id,
         reply_markup: JSON.stringify({
            inline_keyboard: this.inlineKeyboard.subscribeSuccess()
         })
      })
   }
   // Отписаться от всего
   async unsubscribeAll(chat_id) {
      if(!this.user[chat_id]) return
      await UserController.unsubscribeAll([chat_id])
      await this.bot.sendMessage(chat_id, 'Вы успешно отписались от всех подписок.')
      await this.started(chat_id)
      return
   }
   async userNotExist(chat_id) {
      await this.bot.sendMessage(chat_id, 'Вы не имеете доступа к боту', {
         reply_markup: {
            keyboard: ReplyKeyboard.startedUnauthorize
         }
      })
   }
   checkUser(chat_id) {
      if(this.user) {
         return this.user[chat_id]
      } else {
         return false
      }
   }
   async reopenMenu(chat_id, menu_id) {
      if (chat_id && this.menu_id) {
         await this.bot.editMessageText('[Меню отключено поскольку вы открыли это меню ниже]', {
            chat_id: chat_id,
            message_id: this.menu_id
         })
      } if(!this.menu_id) {
         this.menu_id = menu_id
      }
   }
   foundModelName(chat_id) {
      const user = this.user[chat_id]
      let modelName = false
      for(let model of this.modelNames) {
         if(model.callback_action === user.curentSelected.model) {
            modelName = model.model_name
         }
      }
      return modelName
   }
   foundEngineType(chat_id) {
      const user = this.user[chat_id]
      let engineType = false
      for(let engine of this.engineTypes) {
         if(engine.callback_action === user.curentSelected.engine) {
            engineType = engine.engine_type
         }
      }
      return engineType
   }
   foundEquipmentName(chat_id) {
      const user = this.user[chat_id]
      let equipmentName = false
      for(let equipment of this.equipmentNames) {
         if(equipment.callback_action === user.curentSelected.equipment) {
            equipmentName = equipment.equipment_name
         }
      }
      return equipmentName
   }
}