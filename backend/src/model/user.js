const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB");

const User = sequelize.define("users", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
  website: DataTypes.STRING,
  city: DataTypes.STRING,
  company: DataTypes.STRING,
  isAdded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = User;
