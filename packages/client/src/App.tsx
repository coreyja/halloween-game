import React, { FunctionComponent, useEffect } from "react";

import logo from "./logo.png";
import "./App.css";

const OptionButton = ({title}) => (
  <button class="block bg-orange-300 rounded px-16 py-4 my-6">
    {title}
  </button>
);

function App() {
  return (
    <div class="App min-h-screen">
      <header class="App-header">
        <img src={logo} class="App-logo max-w-xs m-auto pt-2" alt="logo" />
        <p class="px-6">
          This is where the story will go. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit. Fusce vehicula lorem id facilisis porta.
          Aliquam erat volutpat. Sed ullamcorper pellentesque nibh dignissim
          auctor. Vivamus accumsan suscipit dictum. Vestibulum vel massa
          suscipit, suscipit est sed, aliquet nunc. Nunc dapibus posuere ex,
          viverra vestibulum tortor sodales vel. Maecenas congue ultricies
          tincidunt. Sed eget enim in ante vehicula bibendum. Sed et porta eros.
          Sed volutpat sodales mollis. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Donec convallis mi nunc, sit amet gravida libero
          maximus non. Suspendisse sed dui in urna porta sagittis. Ut laoreet
          ante eget diam ultricies semper. Aliquam fermentum augue pretium
          vulputate eleifend. Quisque mollis nulla eu sodales hendrerit. Etiam
          venenatis ac nulla ut mollis. Maecenas sed viverra sem. Integer
          feugiat nisi sem, ut vehicula sem semper faucibus. Nunc dictum
          ultricies est, ac porttitor diam suscipit sed. Proin interdum, nulla
          id bibendum ullamcorper, erat leo vulputate risus, eu maximus elit
          mauris nec augue. Nulla id commodo ex, ut volutpat quam. Etiam lacinia
          elit blandit tempor sodales.
        </p>

        <div class="flex flex-col items-center">
          <OptionButton title="Option 1" />
          <OptionButton title="Option 2" />
          <OptionButton title="Option 3" />
        </div>
      </header>
    </div>
  );
}

export default App;
