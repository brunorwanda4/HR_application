const express = require("express");
const route = express.Router();
const db = require("../config/db");

route.post("/", (req, res) => {
  const { DepName } = req.body;

  if (!DepName) return res.status(400).json({ message: "DepName is require" });

  db.query(
    "SELECT * FROM Department WHERE DepName = ?",
    [DepName],
    (getErr, getRes) => {
      if (getErr) {
        return res.status(500).json({
          message: "some thing went wrong to get Department by DepName",
          error: getErr.message,
        });
      }

      if (getRes.length !== 0) {
        return res
          .status(400)
          .json({ message: "DepName is ready exit, try other" });
      }

      db.query(
        "INSERT INTO Department (DepName) VALUES (?)",
        [DepName],
        (insertErr, insertRes) => {
          if (insertErr) {
            return res.status(500).json({
              message: "some thing went wrong to create Department",
              error: insertErr.message,
            });
          }

          return res.status(201).json({
            message: "Department is create succuss full",
            id: insertRes.insertId,
          });
        }
      );
    }
  );
});

route.get("/", (req, res) => {
  db.query("SELECT * FROM Department", (getErr, getRes) => {
    if (getErr)
      return res.status(200).json({
        message: "some thing went wrong to get Department",
        error: getErr.message,
      });
    return res.status(200).json(getRes);
  });
});

module.exports = route;
