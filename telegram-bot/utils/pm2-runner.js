import pm2 from'pm2'

export const pmStart = (userPhone) => {
   const profileTemplate = {
      name: userPhone,
      cwd: '../parser',
      script: 'app.js',
      node_args: '--es-module-specifier-resolution=node',
      env: {
         USER_PHONE: userPhone,
      },
      cron_restart: `*/10 * * * *`,
   }
   pm2.connect((err) => {
      if (err) {
         console.error(err)
         process.exit(2)
      }
      pm2.start(profileTemplate, (err, apps) => {
         if (err) {
            console.error(err)
            return pm2.disconnect()
         }
         pm2.disconnect()
      })
   })
}
export const pmDelete = (userPhone) => {
   pm2.connect((err) => {
      if (err) {
         console.error(err)
         process.exit(2)
      }
      pm2.stop(userPhone, (err, apps) => {
         if (err) {
            console.error(err)
            return pm2.disconnect()
         }
         pm2.disconnect()
      })
   })
}

export { pm2 }

// pm2.list((err, list) => {
//    console.log(err, list)
//    pm2.restart('api', (err, proc) => {
//       // Disconnects from PM2
//       pm2.disconnect()
//    })
// })