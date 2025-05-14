const express = require("express");
const route = express.Router();
const db = require("../config/db");

route.post("/", (req, res) => {
  const { PostTitle } = req.body;

  if (!PostTitle)
    return res.status(400).json({ message: "DepName is require" });

  db.query(
    "SELECT * FROM Post WHERE PostTitle = ?",
    [PostTitle],
    (getErr, getRes) => {
      if (getErr) {
        return res.status(500).json({
          message: "some thing went wrong to get Post by PostTitle",
          error: getErr.message,
        });
      }

      if (getRes.length !== 0) {
        return res
          .status(400)
          .json({ message: "PostTitle is ready exit, try other" });
      }

      db.query(
        "INSERT INTO Post (PostTitle) VALUES (?)",
        [PostTitle],
        (insertErr, insertRes) => {
          if (insertErr) {
            return res.status(500).json({
              message: "some thing went wrong to create Post",
              error: insertErr.message,
            });
          }

          return res.status(201).json({
            message: "Post is create successful",
            id: insertRes.insertId,
          });
        }
      );
    }
  );
});

route.get("/", (req, res) => {
  db.query("SELECT * FROM Post", (getErr, getRes) => {
    if (getErr)
      return res.status(200).json({
        message: "some thing went wrong to get Post",
        error: getErr.message,
      });
    return res.status(200).json(getRes);
  });
});

module.exports = route;
