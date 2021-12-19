import fse from 'fs-extra'
import puppeteer from 'puppeteer'
import { darkGray, red, green } from 'ansicolor'

import { $bot } from './http'
import { UserController } from '../telegram-bot/controllers'
import { Booking } from './actions/booking'

const userPhone = process.env.USER_PHONE

class Messanger {
   async init() {
      const { data: user } = await UserController.findByPhone([userPhone])
      this.phone = user.phone_num
      if(user) {
         user.chat_id = user.tg_id
         const page = await this.openWebVersion(userPhone)
         new Booking(user).startWatch(page)
      } else {
         console.log('Пользователь не найден')
      }
   }

   async openWebVersion(phone_num) {
      const url = 'https://web.telegram.org/z'
      const browser = await puppeteer.launch({
         headless: true,
         devtools: true,
         defaultViewport: null,
         args: [
            // '--start-maximized',
            '--disable-notifications',
            '--window-size=1920,1020',
            '--no-sandbox',
         ]
      })
      await this.loadLocalStorage(browser, phone_num, url)
      const page = await browser.newPage()
      const tabs = await browser.pages()
      await tabs[0].close()
      await page.goto(url, { waitUntil: 'networkidle2' })
      await page.waitForTimeout(4000)
      await this.checkModalError(page)
      await this.openBotTab(page)
      await this.checkBackDrop(page)
      return page
   }

   async openBotTab(page) {
      const clickTabID = 'officialBotClickableTab'
      // Проверка авторизации
      await this.checkAuth(page)
      // Ждём загрузки
      const tabBtnQuery = '.ListItem.Chat .info .title h3'
      await page.waitForSelector(tabBtnQuery , { timeout: 0 })
      await page.evaluate((tabBtnQuery, clickTabID) => {
         const allTabs = document.querySelectorAll(tabBtnQuery)
         for(let tab of allTabs) {
            if(tab.innerText === 'Hyundai Showroom Official') {
               const officialBotClickableTab = tab.parentNode.parentNode.parentNode
               officialBotClickableTab.setAttribute('id', clickTabID)
            }
         }
      }, tabBtnQuery, clickTabID)
      await page.click(`#${clickTabID}`, { delay: 100 })
      await page.waitForSelector('.messages-container .message-date-group')
      await page.waitForSelector('#message-input-text')
   }

   async loadLocalStorage (browser, phone_num, url, storageData) {
      const basePath = `./users/${phone_num}/localStorage.json`
      try {
         storageData = await fse.readJson(basePath)
      } catch (err) {
         console.error(err)
      }
      await this.setDomainLocalStorage(browser, url, storageData)
   }

   async setDomainLocalStorage (browser, url, values) {
      const page = await browser.newPage()
      await page.setRequestInterception(true)
      page.on('request', r => {
         r.respond({
            status: 200,
            contentType: 'text/plain',
            body: 'save local storage',
         })
      })
      await page.goto(url)
      await page.evaluate(values => {
         for (const key in values) {
            localStorage.setItem(key, JSON.stringify(values[key]))
         }
      }, values)
      await page.close()
   }

   async checkModalError(page) {
      const webworkersError = await page.evaluate(() => {
         let checkResult = false
         if(document.querySelector(`.Modal.error`)) checkResult = true
         return checkResult
      })
      if(webworkersError) {
         await page.reload({ waitUntil: ['networkidle0', 'domcontentloaded'] })
         await page.waitForTimeout(3000)
      }
   }
   async checkBackDrop(page) {
      // console.log("checkBackDrop app")
      const checkBackDrop = await page.evaluate(() => {
         let check = false
         console.log(document.querySelector(`.backdrop`))
         if (document.querySelector(`.backdrop`)) check = true
         return check
      })
      // console.log(checkBackDrop)
      if (checkBackDrop) await page.click('.backdrop', { dealy: 150 })
      await page.waitForTimeout(500)
      return
   }
   async checkAuth(page) {
      const adminID = [1884297416]
      const isAuth = await page.evaluate(() => {
         let authPage = false
         const query1 = document.querySelector('#auth-pages')
         const query2 = document.querySelector('#auth-qr-form')
         if(query1 || query2) authPage = true
         return authPage
      })
      if(isAuth) {
         $bot.post('/sendNotify', {
            text: `🔐\nДля номера ${this.phone} треубется повторная авторизация!\nПробуем перезагрузиться...`,
            users: adminID
         })
         process.exit()
      }
   }

   async exportLog(phone_num, text) {
      const filePath = `./users/${phone_num}/logs/log.json`
      try {
         await fse.outputJson(filePath, { log: text })
      } catch (err) {
         console.error(err)
      }
   }
}

new Messanger().init()

console.log(('Парсер запущен:').darkGray, (userPhone).green)