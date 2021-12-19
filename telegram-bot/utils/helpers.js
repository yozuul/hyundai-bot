import fs from 'fs'
import request from 'request'
import { exec } from 'child_process'
import fse from 'fs-extra'
import fetch from 'node-fetch'
import { pmStart, pmDelete } from './pm2-runner'

export const createUserProfile = async (phone_number) => {
   try {
      const userProfilePath = `../parser/users/${phone_number}/localStorage.json`
      await fse.outputJson(userProfilePath, {name: 'test'})
      console.log('Профиль создан!')
      pmStart(phone_number)
    } catch (err) {
      console.error(err)
    }
}
export const deleteUserProfile = async (phone_number) => {
   try {
      const userProfilePath = `../parser/users/${phone_number}`
      await fse.remove(userProfilePath)
      console.log('Профиль удалён!')
      pmDelete(phone_number)
      // restart('del')
      // setTimeout(restart, 3000, 'start')
    } catch (err) {
      console.error(err)
    }
}
export const saveFile = (chat_id, document, updateConfig) => {
  const token = process.env.BOT_TOKEN
  const url = `https://api.telegram.org/bot${token}/getFile?file_id=${document.file_id}`
  request(url, async (err, res, body) => {
      if (err) console.log(err)
      const { result } = JSON.parse(body)
      const urlPath = `https://api.telegram.org/file/bot${token}/${result.file_path}`
      const response = await fetch(urlPath)
      const data = await response.json()
      const userID = document.file_name.split('.json')[0]
      const profilePath = `../parser/users/${userID}`
      const exists = await fse.pathExists(profilePath)
      if(exists) {
         try {
            await fse.outputJson(`${profilePath}/localStorage.json`, data)
          } catch (err) {
            console.error(err)
         }
         updateConfig(chat_id, 'Конфиг успешно обновлён')
      } else {
         updateConfig(chat_id, 'Пользователь не найден')
      }
  })
}