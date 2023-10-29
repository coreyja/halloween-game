import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";

const app = new Elysia()
  .use(html())
  .use(staticPlugin({ assets: "../client/out", prefix: "/" }))
  .get("/", () => (
    <html lang="en">
      <head>
        <title>coreyja - Halloween Game</title>

        <script src="/index.js"></script>
        <link rel="stylesheet" href="/index.css" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
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
