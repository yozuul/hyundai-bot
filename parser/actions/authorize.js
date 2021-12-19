import fse from 'fs-extra'

export class Authorize {
   passUsers(users, menu) {
      this.users = users
      this.menu = menu
   }
   async checkTelegramLogin() {
      for(let account in this.users) {
         const page = this.users[account].page
         const isAuth = await page.evaluate(() => {
            let accountAuthorized = true
            const query1 = document.querySelector('#auth-pages')
            const query2 = document.querySelector('#auth-qr-form')
            if(query1 || query2) accountAuthorized = false
            return accountAuthorized
         })
         if(!isAuth) {
            await this.login(page, account)
         }
         this.phone_num = account.phone_num
         return isAuth
      }
   }

   async login(page, tg_id) {
      await page.waitForSelector('button')
      await page.click('button')
      await page.waitForNetworkIdle()
      await page.waitForSelector('label')
      await page.waitForNetworkIdle()
      // Набираем цифры
      await page.keyboard.type(this.phone_num .split('+7')[1])
      await page.click('button')
      await page.waitForNetworkIdle()
      await page.waitForSelector('label')
      await this.menu.confirmLogin(tg_id)
   }

   async sendLoginCode(tg_id, code) {
      console.log(tg_id)
      console.log('code:', code)
      const loginPage = this.users[tg_id].page
      await loginPage.keyboard.type(code)
      await loginPage.waitForNetworkIdle()
      await this.checkSession(loginPage, tg_id)
   }

   async checkSession(page) {
      const basePath = `./parser/users/${this.phone_num }/localStorage.json`
      const localStorage = await page.evaluate(() =>  Object.assign({}, window.localStorage))
      try {
         await fse.outputJson(basePath, localStorage, { spaces: 3 })
      } catch (err) {
         console.error(err)
      }
   }

   async confirmCode(code, tg_id) {
      const account = this.user[tg_id]
      const page = account.page
      if(account && !account.authorize) {
         await page.keyboard.type(code)
         page.click('button')
      }
   }
}