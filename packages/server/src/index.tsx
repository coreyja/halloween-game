import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import cron from "@elysiajs/cron";
import OpenAI from "openai";
import { initialStory } from "../prompts/initial_story";

interface GameState {
  currentStory: string;
  options: string[];
}

const state: { game?: GameState } = { };

const openai = new OpenAI({
  apiKey: process.env["OPENAI_KEY"],
});

const parse = (content: string) => {
  console.debug(content)
  
  const json = JSON.parse(content);

  if (!json['story']) {
    throw 'No story found'
  }
  if (!json['options']) {
    throw 'No options found'
  }

  return json as { story: string, options: string[] }
}

const createNewStory = async () => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "system", content: initialStory() }],
    model: "gpt-3.5-turbo",
  });

  const content = chatCompletion.choices[0].message.content;

  if (content) {
    const parsedContent = parse(content);
    state.game = {
      currentStory: parsedContent.story,
      options: parsedContent.options,
    }
  }

  console.log(state);
}

createNewStory()

const app = new Elysia()
  .use(html())
  .use(staticPlugin({ assets: "../client/out", prefix: "/" }))
  .use(
    cron({
      name: "heartbeat",
      pattern: "*/5 * * * *",
      async run() {
        await createNewStory()
      },
    }),
  )
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
  .get("/api/game_state", () => state.game)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
