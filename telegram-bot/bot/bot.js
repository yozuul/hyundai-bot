import TelegramApi from 'node-telegram-bot-api'
import { darkGray, red, green } from 'ansicolor'

import { UserController } from '../controllers'
import { MainMenu } from './main-menu'

const bot = new TelegramApi(process.env.BOT_TOKEN, { polling: true })
const menu = new MainMenu(bot)

export const botStart = () => {
      // Сообщения
   bot.on('message', async (msg) => {
      const text = msg.text || 'default'
      const chat_id = msg.chat.id
      // Проверка авторизации
      const checkAuth = await UserController.findById([chat_id])
      if(!checkAuth.data) {
         menu.unAuthorizedUser(chat_id)
         return
      }
      // Стартовое меню
      if ((text === '/start') || (text === 'Подписаться')) {
         await menu.started(chat_id)
      }
      // Внутреннее
      if(!menu.checkUser(chat_id)) return
      if (text === 'Отписаться от всего') {
         await menu.unsubscribeAll(chat_id)
      }
      if (text === '🛠 Настройки бота') {
         await menu.botSettings(chat_id)
      }
      if (text === '📞 Добавить номер') {
         await menu.addNewPhone(chat_id)
      }
      if (text.split('+7')[1]) {
         await menu.saveNewPhone(chat_id, text)
      }
      await menu.checkSettings(chat_id, text)
      // if (text.length === 5) {
      //    const loginCode = await menu.isLoginCode(chat_id, parseInt(text))
      //    parser.sendLoginCode(chat_id, loginCode)
      // }
      console.log(('message:').darkGray, (text).green)
   })

   // Колбеки
   bot.on('callback_query', async (query) => {
      const callback = query.data
      const chat_id = query.message.chat.id

      if(!menu.checkUser(chat_id)) return
      // НАСТРОЙКИ
      const checkSettings = callback.split('settings:')
      if (checkSettings[1]) {
         const settingsMenu = await menu.changeSettings(chat_id)
         if(checkSettings[1] === 'change_city') {
            settingsMenu.city()
         }
         if(checkSettings[1] === 'change_diler') {
            settingsMenu.diler()
         }
         if(checkSettings[1] === 'change_payment_method') {
            settingsMenu.payment()
         }
      }
      // ПОДПИСКА
      if (callback === 'subscribe_all_models') {
         menu.subscribeAllModels(chat_id)
      }
      if (callback === 'subscribe_all_engines') {
         menu.subscribeAllEngines(chat_id)
      }
      if (callback === 'subscribe_all_equipment') {
         menu.subscribeAllEquipments(chat_id)
      }
      // НАВИГАЦИЯ
      // Модели
      if (callback.split('model_')[1]) {
         menu.getEnginesMenu(chat_id, callback)
      }
      // Модфификации
      if (callback.split('engine_')[1]) {
         menu.getEquipmentsMenu(chat_id, callback)
      }
      // Комплектации
      if (callback.split('equipment_')[1]) {
         menu.checkEquipmentSubscribe(chat_id, callback)
      }
      // Вспомогательные кнопки
      if (callback.split('+7')[1]) {
         menu.deletePhone(chat_id, callback)
      }
      if (callback === 'reload_menu') {
         menu.started(chat_id)
      }
      if (callback === 'send_request_all') {
         menu.sendRequestAll(chat_id, query)
      }
      if (callback === 'send_request_one') {
         menu.sendRequestOne(chat_id)
      }
      if (callback === 'book_this') {
         console.log(callback)
         menu.selectCity(chat_id)
      }
      if (callback.split('select_city_')[1]) {
         menu.selectDiler(chat_id)
      }
      if (callback.split('select_diler_')[1]) {
         menu.selectPayment(chat_id)
      }
      if ((callback === 'credit') || (callback === 'nal')) {
         menu.doneBook(chat_id)
      }
      console.log(('callback:').darkGray, (callback).green)
   })

   // Контакты
   bot.on('contact', async (msg) => {
      const chat_id = msg.chat.id
      const { contact } = msg
      const userContact = {
         name: `${contact.first_name} ${contact.last_name}`,
         tg_id: `${contact.user_id}`,
         phone_num: `${contact.phone_number}`
      }
      const isUserExist = await UserController.findByPhone([contact.phone_number])
      if(isUserExist.data) {
         await UserController.confirmPhone(userContact)
         await menu.restartBot()
      } else {
         await menu.userNotExist(chat_id)
      }
      return
   })

   console.log(('Бот запущен').darkGray);

   (async () => {
      const { data } = await UserController.getAll()
      menu.init(data)
   })()

   return menu
}

