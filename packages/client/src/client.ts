// client.ts
import { edenFetch } from "@elysiajs/eden";
import type { App } from "@halloween/server/src/index";

const stripTrailingSlash = (str) => {
  return str.endsWith("/") ? str.slice(0, -1) : str;
};

export const fetch = edenFetch<App>(stripTrailingSlash(location.href));
