const express = require("express");
const database = require("../config/DB");
const postsRouter = express.Router();
const exceljs = require("exceljs");

postsRouter.get("/download/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Retrieve posts for the specified user from the database
    const query = `SELECT * FROM posts WHERE userId = ${userId}`;
    const posts = await new Promise((resolve, reject) => {
      database.query(query, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    // Create an Excel workbook and worksheet
    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Posts");

    worksheet.addRow(["userId", "id", "title", "body"]);
    posts.forEach((post) => {
      worksheet.addRow([post.userId, post.id, post.title, post.body]);
    });

    // Write the workbook to a buffer
    const buffer = await workbook.xlsx.writeBuffer();

    // Send the buffer as a response
    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.send("internal server error", error);
  }
});

postsRouter.get("/:userId", (req, res) => {
  const { userId } = req.params;
  try {
    const query = `SELECT * FROM posts WHERE userId = ${userId}`;
    database.query(query, (err, result) => {
      if (err) throw err;
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.send("internal server error", err);
  }
});

postsRouter.post("/Add", (req, res) => {
  const posts = req.body;

  try {
    // Convert posts array into an array of arrays (multiple value sets)
    const postValues = posts.map((post) => [
      post.userId,
      post.id,
      post.title,
      post.body,
    ]);

    // Construct the SQL query
    const query = `INSERT IGNORE INTO posts (userId, id, title, body) VALUES ?`;

    // Execute the query with the array of post values
    database.query(query, [postValues], (err) => {
      if (err) {
        console.log("Error in adding post", err);
        res.status(500).send("Error adding post");
      } else {
        res.send("Post added successfully");
      }
    });
  } catch (error) {
    console.log(error);
    res.send("internal server error", error);
  }
});

module.exports = postsRouter;
