const mysql = require("mysql");

const database = mysql.createConnection({
  host: "mysql-12d86e12-cointab-assignment-3a77.b.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_23-6f8ZVwLp4xLFZjbV",
  database: "cointab;",
});

module.exports = database;
