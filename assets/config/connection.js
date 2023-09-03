const Sequelize = require("sequelize");
require("dotenv").config();
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  password,
  {
    host: "127.0.0.1",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
