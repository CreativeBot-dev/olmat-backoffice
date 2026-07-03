module.exports = {
  apps: [
    {
      name: "prod-olmat-backoffice",
      script: "yarn",
      args: "start",
      cwd: "/root/olmat/olmat-backoffice",
      instances: 1,
      autorestart: true,
      exec_mode: "cluster",
      watch: false,
      max_memory_restart: "700M",
      env: {
        NODE_ENV: "production",
        PORT: 3088,
      },
    },
  ],
};
