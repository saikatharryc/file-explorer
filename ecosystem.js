module.exports = {
  apps: [
    {
      name: "file explorer",
      script: "./bin/www",
      env: {
        NODE_ENV: "development",
        MONGO_URI: "<CONNECTION URL>"
      },
      env_production: {
        NODE_ENV: "production",
        MONGO_URI: "<CONNECTION URL>"
      }
    }
  ]
};
