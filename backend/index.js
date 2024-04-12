const express = require("express");
const app = express();
const cors = require("cors");
const database = require("./src/config/DB");
const userRouter = require("./src/Routes/userRouter");
const posttable = require("./src/middleware/postTable");
const postsRouter = require("./src/Routes/postRouter");

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/posts", posttable, postsRouter);

app.listen(5000, () => {
  try {
    console.log("Server started on port 5000");
    database.connect((err) => {
      if (err) {
        console.log("Error in connecting to DB", err);
      } else console.log("Connected to DB");
    });
  } catch (error) {
    console.log("Error in starting server", error);
  }
});
