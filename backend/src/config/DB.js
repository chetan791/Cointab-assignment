const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const database = new Sequelize(process.env.DB);

module.exports = database;
