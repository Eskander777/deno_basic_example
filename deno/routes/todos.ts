import { Router } from "https://deno.land/x/oak/mod.ts";

const router = new Router();

interface Todo {
  id: string;
  text: string;
}

let todos: Todo[] = [];

router.get("/todos", (ctx) => {
  ctx.response.body = { todos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body({ type: "json" }).value;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };

  todos.push(newTodo);

  ctx.response.body = { message: "Todo added", newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const { todoId: tId } = ctx.params;
  const todoIndex = todos.findIndex((todo) => todo.id === tId);

  const data = await ctx.request.body({ type: "json" }).value;

  todos[todoIndex] = { ...todos[todoIndex], text: data.text };
  ctx.response.body = { message: "Todo updated" };
});

router.delete("/todos/:todoId", (ctx) => {
  const { todoId: tId } = ctx.params;
  todos = todos.filter((todo) => todo.id !== tId);

  ctx.response.body = { message: "Todo deleted" };
});

export default router;
