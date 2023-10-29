import { Elysia, t } from "elysia";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import cron from "@elysiajs/cron";
import OpenAI from "openai";
import { initialStory } from "../prompts/initial_story";

interface GameOption {
  content: string;
  votes: number[];
}

interface GameState {
  currentStory: string;
  options: GameOption[];
}

const state: { game?: GameState } = {};

const openai = new OpenAI({
  apiKey: process.env["OPENAI_KEY"],
});

const parse = (content: string) => {
  console.debug(content);

  const json = JSON.parse(content);

  if (!json["story"]) {
    throw "No story found";
  }
  if (!json["options"]) {
    throw "No options found";
  }

  return json as { story: string; options: string[] };
};

const createNewStory = async () => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "system", content: initialStory() }],
    model: "gpt-3.5-turbo",
  });

  const content = chatCompletion.choices[0].message.content;

  if (content) {
    const parsedContent = parse(content);
    const gameOptions = parsedContent.options.map((option) => ({
      content: option,
      votes: [],
    }));
    state.game = {
      currentStory: parsedContent.story,
      options: gameOptions,
    };
  }

  console.log(state);
};

createNewStory();

const app = new Elysia({
  cookie: {
      secrets: 'Fischl von Luftschloss Narfidort',
  }
})
  .use(html())
  .use(staticPlugin({ assets: "../client/out", prefix: "/" }))
  .use(
    cron({
      name: "heartbeat",
      pattern: "*/5 * * * *",
      async run() {
        await createNewStory();
      },
    }),
  )
  .get(
    "/",
    ({ cookie: { profile } }) => {
      profile.value = profile?.value || { id: Math.random() }

      return (
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
    )},
  )
  .get("/api/game_state", ({ cookie: {profile}}) => ({...state.game, options: state.game?.options.map(o => ({...o, votes: o.votes.length, chosen: o.votes.includes(profile?.value?.id)}))}))
  .post(
    "/api/vote",
    ({ body, cookie: { profile }}) => {

      const chosenOption = state.game?.options.find(
        (option) => option.content === body.option,
      );
      const oldOption = state.game?.options.find(
        (option) => option.votes.includes(profile.value.id),
      );

      if (oldOption) {
        oldOption.votes = oldOption.votes.filter(
          (vote) => vote !== profile.value.id,
        );
      }
      if (chosenOption) {
        chosenOption.votes.push(profile.value.id);
      }
    },
    { body: t.Object({ option: t.String() }) },
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type App = typeof app;
