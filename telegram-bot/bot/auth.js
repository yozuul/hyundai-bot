export class Authorize {
   constructor(bot) {
      this.bot = bot
   }
   async confirmLogin(chat_id) {
      const title = 'Для подтверждения номера, введите пятизначный код присланный телеграмом.'
      await this.bot.sendMessage(chat_id, title)
      this.user[chat_id].currentMenu = 'confirmLogin'
      this.user[chat_id].menuPath = '/confirmLogin'
   }

   async isLoginCode(chat_id, code) {
      if(this.user[chat_id].currentMenu === 'confirmLogin') {
         const stringCode = code.toString()
         if(stringCode.length === 5) {
            return stringCode
         } else {
            return false
         }
      }
   }
}

export { Authorize }