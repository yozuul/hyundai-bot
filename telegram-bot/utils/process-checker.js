import pm2 from 'pm2'

pm2.list((err, data) => {
	for (let process of data) {
		if(process.pm2_env.status !== 'online') {
			pm2.restart(process.name, (err, proc) => {
				pm2.disconnect()
			})
		}
	}
})