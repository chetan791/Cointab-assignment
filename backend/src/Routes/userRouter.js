const express = require("express");
const ensuretable = require("../middleware/table");
const database = require("../config/DB");
const userRouter = express.Router();

userRouter.use(ensuretable);

userRouter.get("/", (req, res) => {
  try {
    const query = `SELECT * FROM users`;
    database.query(query, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (error) {
    console.log(error);
    res.send("internal server error", error);
  }
});

userRouter.post("/Add", (req, res) => {
  const { id, name, email, phone, website, city, company } = req.body;
  try {
    const query = `INSERT INTO users (id,name, email, phone, website, city, company, isAdded) VALUES (?, ?, ?, ?, ?, ? ,?, ?)`;

    database.query(
      query,
      [id, name, email, phone, website, city, company, true],
      (err) => {
        if (err) console.log("Error in adding user", err);
        else res.status(200).send("User Added");
      }
    );
  } catch (error) {
    console.log(error);
    res.send("internal server error", error);
  }
});

module.exports = userRouter;
