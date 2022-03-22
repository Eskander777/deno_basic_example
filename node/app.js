const express = require("express");

const todoRoutes = require("./routes/todo");

const app = express();

app.use(express.json({ extended: false }));

app.use((req, res, next) => {
  console.log("Some middleware!");
  next();
});

app.use(todoRoutes);

app.listen(3000);
