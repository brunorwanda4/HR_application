const express = require("express");
const route = express.Router();
const db = require("../config/db");

route.post("/", (req, res) => {
  const { postId, FirstName, Email, LastName, Gender, Phone, Address, DepId } =
    req.body;

  if (
    !postId ||
    !FirstName ||
    !Email ||
    !LastName ||
    !Gender ||
    !Phone ||
    !Address ||
    !DepId
  )
    return res.status(400).json({
      message:
        "PostId,  FirstName,LastName ,Email, Gender, Phone,Address and DepId are require",
    });

  db.query(
    "SELECT * FROM Staff WHERE Email = ? OR Phone = ?",
    [Email, Phone],
    (getErr, getRes) => {
      if (getErr) {
        return res.status(500).json({
          message: "some thing went wrong to get Staff by Email or Phone",
          error: getErr.message,
        });
      }

      if (getRes.length !== 0) {
        return res
          .status(400)
          .json({ message: "Email Or Phone is ready exit, try other" });
      }

      db.query(
        "INSERT INTO Staff (PostId, FirstName, Email, LastName, Gender, Phone, Address, DepId) VALUES (?,?,?,?,?,?,?,?)",
        [postId, FirstName, Email, LastName, Gender, Phone, Address, DepId],
        (updateErr, updateRes) => {
          if (updateErr) {
            return res.status(500).json({
              message: "some thing went wrong to update Staff",
              error: updateErr.message,
              description: `${updateErr}`,
            });
          }

          return res.status(201).json({
            message: "Department is update successful",
            id: updateRes.insertId,
          });
        }
      );
    }
  );
});

route.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM Staff WHERE EmployeeId = ?",
    [id],
    (deleteErr, deleteRes) => {
      if (deleteErr) {
        return res.status(500).json({
          message: "some thing went wrong to delete staff",
          error: deleteErr.message,
        });
      }
      return res.status(200).json({ message: "Delete staff successful" });
    }
  );
});

route.put("/:id", (req, res) => {
  const { id } = req.params;

  const { postId, FirstName, Email, LastName, Gender, Phone, Address, DepId } =
    req.body;

  if (
    !postId &&
    !FirstName &&
    !Email &&
    !LastName &&
    !Gender &&
    !Phone &&
    !Address &&
    !DepId
  )
    return res.status(400).json({
      message:
        "Please one field are required PostId,  FirstName,LastName ,Email, Gender, Phone,Address and DepId",
    });

  db.query(
    "UPDATE  Staff SET postId = ?, FirstName = ?, Email = ?, LastName = ?, Gender = ?, Phone = ?, Address = ?, DepId = ? "
  );
});

route.get("/", (req, res) => {
  db.query("SELECT * FROM Staff", (getErr, getRes) => {
    if (getErr)
      return res.status(200).json({
        message: "some thing went wrong to get Staff",
        error: getErr.message,
      });
    return res.status(200).json(getRes);
  });
});

module.exports = route;
