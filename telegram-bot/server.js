import {} from 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { darkGray, red } from 'ansicolor'

import { botStart } from './bot'

const PORT = process.env.API_PORT
const botCommand = await botStart()

const startServer = async () => {
   const app = express()
   try {
      app.use(cors({
         credentials: true,
         origin: process.env.CLIENT_URL
      }))
      app.use(express.json())
      app.post('/sendNotify', (req, res, next) => {
         botCommand.sendNotify(req.body)
         res.send('OK')
         next()
      })
      app.listen(PORT, () => {
         console.log((`\nСервер запущен на порту ${PORT}`).darkGray)
      })
   } catch (err) {
      console.log(err)
      console.log(('Ошибка запуска сервера').red);
   }
}

startServer()