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
        PORT: 5000,
        MONGO_URI: "mongodb://localhost:27017/sliprecs",
        JWT_SECRET:"millionaire"
      },
    },
  ],
};
