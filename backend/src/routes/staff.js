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

route.put("/:employeeId", (req, res) => {
  const employeeId = req.params.id;

  const {
    postId,
    depId,
    firstName,
    lastName,
    gender,
    DOB,
    email,
    phone,
    address,
  } = req.body;

  // Validate required fields
  if (
    !postId &&
    !depId &&
    !firstName &&
    !lastName &&
    !gender &&
    !DOB &&
    !email &&
    !phone &&
    !address
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  db.query(
    "UPDATE Staff SET PostId = ?, DepId = ?, FirstName = ?, LastName = ?, Gender = ?,Email = ?, Phone = ?, Address = ? WHERE EmployeeId = ?",
    [
      postId,
      depId,
      firstName,
      lastName,
      gender,
      email,
      phone,
      address,
      employeeId,
    ],
    (updateErr, updateResult) => {
      if (updateErr) {
        return res.status(500).json({
          message: "Something went wrong while updating staff",
          error: updateErr.message,
        });
      }

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "Staff not found" });
      }

      return res.status(200).json({ message: "Staff updated successfully" });
    }
  );
});

route.get("/", (req, res) => {
  db.query(
    `SELECT s.*, d.DepName, p.PostTitle 
    FROM Staff s 
    JOIN Department d ON s.DepId = d.DepId
    JOIN Post p ON s.PostId = p.PostId`,
    (getErr, getRes) => {
      if (getErr)
        return res.status(200).json({
          message: "some thing went wrong to get Staff",
          error: getErr.message,
        });
      return res.status(200).json(getRes);
    }
  );
});

module.exports = route;
