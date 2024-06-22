require('dotenv').config(); 
module.exports = {
  development: {
    username: process.env.DB_DEV_USERNAME,
    password: process.env.DB_DEV_PASSWORD,
    database: process.env.DB_DEV_NAME,
    host: process.env.DB_DEV_HOST,
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "postgres"
  },
  production: {
    username: "postgres",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "postgres"
  }
}
