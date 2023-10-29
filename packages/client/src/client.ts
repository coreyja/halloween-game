// client.ts
import { edenFetch } from "@elysiajs/eden";
import type { App } from "@halloween/server/src/index";

export const fetch = edenFetch<App>("http://localhost:3000");
