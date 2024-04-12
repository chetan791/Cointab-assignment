const database = require("../config/DB");

const ensuretable = (req, res, next) => {
  const query = `CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255),
    Phone VARCHAR(255),
    Website VARCHAR(255),
    City VARCHAR(255),
    Company VARCHAR(255),
    isAdded BOOLEAN default true
  )`;

  database.query(query, (err) => {
    if (err) console.log("Error in creating table", err);
    else next();
  });
};

module.exports = ensuretable;
