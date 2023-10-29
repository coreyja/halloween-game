import React, { FunctionComponent, useEffect } from "react";

import logo from "./logo.png";
import "./App.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch } from "./client";

const OptionButton = ({ title }) => (
  <button className="block bg-orange-300 rounded px-16 py-4 my-6">
    {title}
  </button>
);

function App() {
  const queryClient = useQueryClient();
  const { data: game_state } = useQuery({
    queryKey: ["game_state"],
    queryFn: async () => {
      const resp = await fetch("/api/game_state", {});
      return resp.data;
    },
  });

  if (!game_state || !game_state.currentStory) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App min-h-screen">
      <header className="App-header">
        <img src={logo} className="App-logo max-w-xs m-auto pt-2" alt="logo" />
        <p className="px-6">{game_state.currentStory}</p>

        <div className="flex flex-col items-center">
          {game_state.options.map((option, i) => (
            <OptionButton key={i} title={option} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
