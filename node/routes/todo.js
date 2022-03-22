const express = require("express");

const router = express.Router();

let todos = [];

router.get("/todos", (req, res, next) => {
  res.status(200).json({ todos });
});

router.post("/todos", (req, res, next) => {
  const newTodo = {
    id: new Date().toISOString(),
    text: req.body.text,
  };
  todos.push(newTodo);
  res.status(200).json({ message: "Todo created", newTodo });
});

router.put("/todos/:todoId", (req, res, next) => {
  const { todoId: tId } = req.params;
  const todoIndex = todos.findIndex((todo) => todo.id === tId);
  todos[todoIndex] = { ...todos[todoIndex], text: req.body.text };
  res.status(200).json({ message: "Updated todo" });
});

router.delete("/todos/:todoId", (req, res, next) => {
  const { todoId: tId } = req.params;
  todos = todos.filter((todo) => todo.id !== tId);
  res.status(200).json({ message: "Todo deleted" });
});

module.exports = router;
