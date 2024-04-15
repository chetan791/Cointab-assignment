const express = require("express");
const postsRouter = express.Router();
const exceljs = require("exceljs");
const Post = require("../model/post");
const { Op } = require('sequelize');

postsRouter.get("/download/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.findAll({
      where: { userId: userId },
      attributes: ['userId', 'id', 'title', 'body'],
    });

    const workbook = new exceljs.Workbook();
    const worksheet = workbook.addWorksheet("Posts");

    worksheet.addRow(["userId", "id", "title", "body"]);
    posts.forEach((post) => {
      worksheet.addRow([post.userId, post.id, post.title, post.body]);
    });

    const buffer = await workbook.xlsx.writeBuffer();

    res.set(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.send(buffer);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error: " + error.message);
  }
});


postsRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const posts = await Post.findAll({
      where: { userId: userId },
    });

    res.send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error: " + error.message);
  }
});


postsRouter.post("/Add", async (req, res) => {
  const posts = req.body;
  try {
    await Post.bulkCreate(posts);

    res.send("Posts added successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error: " + error.message);
  }
});


module.exports = postsRouter;
