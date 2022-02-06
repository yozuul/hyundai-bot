import { readdirSync } from 'fs'
import { pm2 } from './telegram-bot/utils/pm2-runner.js'

const runProcess = (processData, processName) => {
   pm2.connect((err) => {
      if (err) {
         console.error(err)
         process.exit(2)
      }
      pm2.start(processData, (err, apps) => {
         if (err) {
            console.error(err)
            return pm2.disconnect()
         }
         pm2.disconnect()
      })
   })
   console.log(`Процесс запущен: ${processName}`)
}

// Запуск основных процессов
const mainProcess = [
   {
      name: 'api',
      cwd: './api',
      script: 'server.js',
      node_args: '-r dotenv/config --es-module-specifier-resolution=node',
   },
   {
      name: 'process-checker',
      cwd: './telegram-bot/utils',
      script: 'process-checker.js',
      node_args: '-r dotenv/config --es-module-specifier-resolution=node',
      cron_restart: '*/1 * * * *',
   },
   {
      name: 'telegram-bot',
      cwd: './telegram-bot',
      script: 'server.js',
      node_args: '-r dotenv/config --es-module-specifier-resolution=node',
   }
]

for (let process of mainProcess) {
   runProcess([process], process.name)
   try {
      await delayLounch(10000)
   } catch (error) {
      console.log(error)
      console.log(`Ошибка запуска процесса \n${process} ^`)
   }
}

// Запуск окон
const getDirectories = (path) => {
   return readdirSync(path, (err, content) => {
      if (err) { return err } else { return content }
   })
}

const userProfiles = getDirectories('./parser/users')

for (let [index, user] of userProfiles.entries()) {
   runProcess([{
      name: user,
      cwd: './parser',
      script: 'app.js',
      node_args: '--es-module-specifier-resolution=node',
      // stop_exit_codes: [0],
      autorestart: true,
      // exec_mode: 'cluster',
      exp_backoff_restart_delay: 100,
      env: {
         USER_PHONE: user,
      },
      cron_restart: `*/1${index} * * * *`,
   }], `пользователь: ${user}`)
   try {
      await delayLounch(20000)
   } catch (error) {
      console.log(error)
      console.log(`Ошибка запуска окна телеграма для пользователя \n${user} ^`)
   }
}

function delayLounch (t, val) {
   return new Promise((resolve) => {
      setTimeout(() => { resolve(val) }, t)
   })
}