module.exports = {
  apps: [
    {
      name: "prod-olmat-backoffice",
      script: "yarn",
      args: "start",
      cwd: "/var/www/olmat-backoffice",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
};
