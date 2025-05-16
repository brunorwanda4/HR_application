const express = require("express");
const cors = require("cors");
const department = require("./routes/department");
const post = require("./routes/post");
const staff = require("./routes/staff");
const users = require("./routes/users");
const app = express();

app.use(cors());
app.use(express.json());

require("./config/db");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello guy application is running" });
});

app.use("/department", department);
app.use("/post", post);
app.use("/staff", staff);
app.use("/user", users);

app.listen(3008, () => console.log("Server is running 👻"));
