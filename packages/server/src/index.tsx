import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(html())
  .use(staticPlugin({ assets: "../client/out", prefix: "/" }))
  .get("/", () => (
    <html lang="en">
      <head>
        <title>Hello World</title>

        <script src="/index.js"></script>
      </head>
      <body>
        <h1>Hello World</h1>
        <div id="react-root"></div>
      </body>
    </html>
  ))
  .get("/api/hello", () => ({ msg: "test" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
