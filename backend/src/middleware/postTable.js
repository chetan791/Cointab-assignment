const database = require("../config/DB");

const posttable = (req, res, next) => {
  const query = `CREATE TABLE IF NOT EXISTS posts(
    userId INT,
    id INT PRIMARY KEY,
    title VARCHAR(255),
    body VARCHAR(255),
    FOREIGN KEY (userId) REFERENCES users(id)
  )`;

  database.query(query, (err) => {
    if (err) console.log("Error in creating table", err);
    else next();
  });
};

module.exports = posttable;
