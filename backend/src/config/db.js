const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "HR_application_db",
});

db.connect((e) => {
    if (e) throw e;
    console.log("Database is connected 🌻")
})

module.exports = db;
