import { darkGray, red, green } from 'ansicolor'

export class ParserSubscribes {
   async modelClick(user, modelName) {
      const buttonQuery = `#${user.botMenuID} .InlineButtons button`
      console.log((`openModel: ${user.botMenuID}`).red)
      // ---------
      // Находим и помечаем кнопку с названием модели
      const modelButtonText = modelName
      const modelButtonID = '#modelClick'
      // console.log('modelButtonText', modelButtonText)
      await this.markClickButton(user.page, buttonQuery, modelButtonText, modelButtonID)
      // Кликаем, пока не сменится заголовок главного меню
      const enginesMenuTitle = 'Вас интересует любая модификация или же есть какие-то предпочтения?'
      await this.clickWhileNotOpen(user.page, user.botMenuID, enginesMenuTitle, modelButtonID)
   }
   async engineClick(user, engineType) {
      const page = user.page
      const botMenuID = user.botMenuID
      const buttonQuery = `#${botMenuID} .InlineButtons button`
      console.log((`openEngine: ${user.botMenuID}`).red)
      // ---------
      // Находим и помечаем кнопку с названием модели
      const engineButtonText = engineType
      const engineButtonID = '#engineClick'
      await this.markClickButton(page, buttonQuery, engineButtonText, engineButtonID)
      // Кликаем, пока не сменится заголовок главного меню
      const enginesMenuTitle = 'Вас интересует любая комплектация или же есть какие-то предпочтения?'
      await this.clickWhileNotOpen(page, botMenuID, enginesMenuTitle, engineButtonID)
   }
   async equipmentClick(user, engineType) {
      const page = user.page
      const botMenuID = user.botMenuID
      const buttonQuery = `#${botMenuID} .InlineButtons button`
      console.log((`openEngine: ${user.botMenuID}`).red)
      // ---------
      // Находим и помечаем кнопку с названием модели
      const engineButtonText = engineType
      const engineButtonID = '#engineClick'
      await this.markClickButton(page, buttonQuery, engineButtonText, engineButtonID)
      // Кликаем, пока не сменится заголовок главного меню
      const enginesMenuTitle = 'Спасибо, мы сообщим когда появится автомобиль для вас.'
      await this.clickWhileNotOpen(page, botMenuID, enginesMenuTitle, engineButtonID)
   }

   async reopenMenu(user, tagMenu) {
      console.log('reopenBegin', user.botMenuID)
      const page = user.page
      await page.hover('#botMenuOpenButtonQuery')
      await page.waitForTimeout(500)
      await page.click(tagMenu)  // '#subscribeBtn'
      const getCurrentMsgID = async () => {
         return await page.evaluate(() => {
            const dateContainers = '.messages-container .message-date-group'
            const msgDateContainer = Array.from(document.querySelectorAll(dateContainers)).pop()
            const latestMsgObject = msgDateContainer.lastChild
            const latestMsgObjectID = latestMsgObject.getAttribute('id')
            const latestMsgObjectTitle = document.querySelector(`#${latestMsgObjectID} p.text-content`)
            return {
               id: latestMsgObjectID,
               title: latestMsgObjectTitle ? latestMsgObjectTitle.innerText.split('\n')[0] : false,
            }
         })
      }
      const checkMessageIdCHange = async () => {
         let result = false
         const currentMsgId = await getCurrentMsgID()
         console.log(currentMsgId.title)
         if((currentMsgId.id !== user.botMenuID) && (currentMsgId.id !== 'message1000000000') && (currentMsgId.title === 'Давайте приступим к подбору автомобиля')) {
            result = currentMsgId.id
         }
         return result
      }
      let checker = false
      while(!checker) {
         await page.waitForTimeout(300)
         checker = await checkMessageIdCHange()
      }
      await page.click('.backdrop', { dealy: 300 })
      return checker
   }
   async unsubscribeAll(user) {
      const newMenuID = await this.reopenMenu(user, '#unSubscribeBtn')
      console.log('unsubscribeAll', newMenuID)
      return newMenuID
   }
   // --------------------
   async showMenu(user) {
      const newMenuID = await this.reopenMenu(user, '#subscribeBtn')
      console.log('showMenu', newMenuID)
      return newMenuID
   }

   // Пометка кнопки, которую надо кликнуть
   async markClickButton(page, buttonQuery, searchText, markID) {
      await page.evaluate((buttonQuery, searchText, markID) => {
         const menuButtons = document.querySelectorAll(buttonQuery)
         console.log(menuButtons)
         for(let btn of menuButtons) {
            console.log(btn)
            if((btn.innerText === searchText) || (btn.innerText === ' ' + searchText) || (btn.innerText === searchText + ' ') || (btn.innerText === ' ' + searchText + ' ')) {
               btn.setAttribute('id', markID.split('#')[1])
            }
         }
      }, buttonQuery, searchText, markID)
   }
   // Проверка что помеченная кнопка уже не нажата
   async checkClickButtonExist(page, buttonID) {
      return await page.evaluate((buttonID) => {
         let buttonExist = true
         if(!document.querySelector(buttonID)) buttonExist = false
         return buttonExist
      }, buttonID)
   }
   // Цикл кликов по помеченной кнопке
   async clickWhileNotOpen(page, botMenuID, menuChangeText, clickButtonID) {
      let menuChangeFlag = false
      while(menuChangeFlag !== menuChangeText) {
         const isButtonExits = await this.checkClickButtonExist(page, clickButtonID)
         if(isButtonExits) await page.click(clickButtonID)
         await page.waitForTimeout(500)
         menuChangeFlag = await this.checkMenuTitle(page, botMenuID)
      }
      await page.waitForTimeout(1100)
   }
   // Проверка текущего заголовка меню
   async checkMenuTitle(page, botMenuID) {
      const title = await page.evaluate((botMenuID) => {
         const titleTag = document.querySelector(`#${botMenuID} .text-content`)
         return titleTag.innerText
      }, botMenuID)
      return title.split('\n')[0]
   }
}

