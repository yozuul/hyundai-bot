import { readdirSync } from 'fs'
import { pm2 } from './telegram-bot/utils/pm2-runner.js'

const appData = []

appData.push({
  name: 'telegram-bot',
  cwd: './telegram-bot',
  script: 'server.js',
  node_args: '-r dotenv/config --es-module-specifier-resolution=node',
}, {
  name: 'api',
  cwd: './api',
  script: 'server.js',
  node_args: '-r dotenv/config --es-module-specifier-resolution=node',
})

const getDirectories = (path) => {
   return readdirSync(path, (err, content) => {
      if (err) { return err } else { return content }
   })
}

const userProfiles = getDirectories('./parser/users')

let count = 0
for (let user of userProfiles) {
   let cronjob = `*/1${count} * * * *`
   appData.push({
      name: user,
      cwd: './parser',
      script: 'app.js',
      node_args: '--es-module-specifier-resolution=node',
      exp_backoff_restart_delay: parseInt(pause),
      env: {
         USER_PHONE: user,
      },
      cron_restart: cronjob,
   })
   count++
}

pm2.connect((err) => {
   if (err) {
      console.error(err)
      process.exit(2)
   }
   pm2.start(appData, (err, apps) => {
      if (err) {
         console.error(err)
         return pm2.disconnect()
      }
      pm2.disconnect()
   })
})