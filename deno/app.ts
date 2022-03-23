import { Application } from "https://deno.land/x/oak/mod.ts";

import todoRoutes from "./routes/todos.ts";

const app = new Application();

// To use middleware we should make function async
app.use(async (ctx, next) => {
  console.log("Middleware");
  await next();
});

// Add headers to fix CORS error in SPA front-end application
app.use(async (ctx, next) => {
  ctx.response.headers.set("Access-Control-Allow-Origin", "*");
  ctx.response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  ctx.response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  await next();
});

// For routes to work
app.use(todoRoutes.routes());
app.use(todoRoutes.allowedMethods());

await app.listen({ port: 8000 });
