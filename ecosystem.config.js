module.exports = {
  apps: [
    {
      name: "sliprecs-backend",
      script: "backend/server.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
