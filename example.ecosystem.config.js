module.exports = {
  apps : [
    {
      name      : 'telegram-bot',
      cwd:      './telegram-bot',
      script    : 'server.js',
      node_args : '-r dotenv/config --es-module-specifier-resolution=node',
    },
    {
      name      : 'api',
      cwd:      './api',
      script    : 'server.js',
      node_args : '-r dotenv/config --es-module-specifier-resolution=node',
    },
    {
      name      : '+79015009458',
      cwd:      './parser',
      script    : 'app.js',
      node_args : '--es-module-specifier-resolution=node',
      env: {
        "USER_PHONE": "+79015009458",
      },
      cron_restart: "*/5 * * * *",
    }
  ]
}