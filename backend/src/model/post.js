const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB");
const User = require("./user");

const Post = sequelize.define("posts", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
});

// Define associations between models
Post.belongsTo(User, { foreignKey: "userId" });

module.exports = Post;
