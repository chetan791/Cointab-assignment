const express = require("express");
const User = require("../model/user");
const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    // const query = `SELECT * FROM users`;
    // database.query(query, (err, result) => {
    //   if (err) throw err;
    //   res.send(result);
    // });

    const users = await user.findAll();
    res.send("hello");
  } catch (error) {
    console.log(error);
    res.send("internal server error", error);
  }
});

// Add user
userRouter.post("/Add", async (req, res) => {
  const { id, name, email, phone, website, city, company } = req.body;
  try {
    const [user, created] = await User.findOrCreate({
      where: { email: email },
      defaults: {
        id: id,
        name: name,
        email: email,
        phone: phone,
        website: website,
        city: city,
        company: company,
        isAdded: true,
      },
    });

    if (created) {
      res.status(200).send("User Added", user);
    } else {
      res.status(200).send("User already exists");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error: " + error.message);
  }
});

module.exports = userRouter;
