module.exports = {
	apps: [{
		name: "f-tresEnRaya",
		script: "npm -- run serve",
		
		log_date_format: "DD/MM/YYYY HH:mm:ss Z",
		
		instances: 1,
		exec_mode: "fork",
		watch: true,
		
	 	env_production: {
			NODE_ENV: "production",
			TZ: 'Europe/Madrid'
		},
		
	}]
}
