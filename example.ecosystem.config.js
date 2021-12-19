const fs = require('fs')

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
  return fs.readdirSync(path, (err, content) => {
    if (err) { return err } else { return content }
  })
}

const userProfiles = getDirectories('./parser/users')

for(let user of userProfiles) {
  let count = 0
  appData.push({
    name: user,
    cwd: './parser',
    script: 'app.js',
    node_args: '--es-module-specifier-resolution=node',
    env: {
      USER_PHONE: user,
    },
    cron_restart: `*/1${count} * * * *`,
  })
}
count++

module.exports = {
  apps: appData,
}