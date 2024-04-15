const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./src/config/DB");
const userRouter = require("./src/Routes/userRouter");
const postsRouter = require("./src/Routes/postRouter");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", postsRouter);

app.listen(5000, async () => {
  try {
    console.log("Server started on port 5000");
    await database.sync((err) => {
      if (err) {
        console.log("Error in connecting to DB", err);
      } else console.log("Connected to DB");
    });
  } catch (error) {
    console.log("Error in starting server", error);
  }
});
