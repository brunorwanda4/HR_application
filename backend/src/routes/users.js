const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const KEY = "MAMA_HAPPY";

router.post("/register", (req, res) => {
  const { EmployeeId, username, Password } = req.body;
  if (!EmployeeId || !username || !Password)
    return res
      .status(400)
      .json({ message: "EmployeeId, username, Password  are required" });
  bcrypt.hash(Password, 10, (hErr, hRes) => {
    if (hErr)
      return res
        .status(500)
        .json({ message: "Hash error", error: hErr.message });

    db.query(
      "INSERT INTO Users (EmployeeId, username, Password ) VALUES (? , ? , ?)",
      [EmployeeId, username, hRes],
      (iErr, iRes) => {
        if (iErr)
          return res
            .status(500)
            .json({ message: "Insert error", error: iErr.message });
        return res.status(201).json({
          message: "Created successful",
          id: iRes.insertId,
        });
      }
    );
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "username, password are require" });
  }

  db.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (gErr, gRes) => {
      if (gErr)
        return res
          .status(500)
          .json({ message: "get Err", error: gErr.message });

      if (gRes.length === 0)
        return res.status(404).json({ message: "user not exist" });

      const user = gRes[0];

      bcrypt.compare(password, user.Password, (eM, rM) => {
        if (eM) {
          return res
            .status(500)
            .json({ message: "err to compare passwords", error: eM.message });
        }

        if (!rM) {
          return res.status(401).json({ message: "Password are not match" });
        }
        const token = jwt.sign(
          {
            userId: user.UserId,
            username: user.username,
            staffId : user.EmployeeId
          },
          KEY,
          { expiresIn: "2day" }
        );
        delete user.Password;

        res.status(200).json({
          message: "Login successful",
          user,
          token,
        });
      });
    }
  );
});

module.exports = router;
