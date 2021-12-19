class ReplyKeyboard {
   static get startedAdmin() {
      return [
         ['Подписаться', 'Отписаться от всего'],
         ['🛠 Настройки бота', '📞 Добавить номер'],
      ]
   }
   static get startedUser() {
      return [['Подписаться', 'Отписаться от всего']]
   }
   static get startedUnauthorize() {
      return [[{
         text: '📞 Авторизация по номеру телефона',
         request_contact: true
      }]]
   }
}

export { ReplyKeyboard }