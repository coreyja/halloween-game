import React, { FunctionComponent, useEffect } from "react";

import logo from "./logo.png";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch } from "./client";

function App() {
  const queryClient = useQueryClient();
  const { data: game_state } = useQuery({
    queryKey: ["game_state"],
    queryFn: async () => {
      const resp = await fetch("/api/game_state", {});
      return resp.data;
    },
    refetchInterval: 250,
  });

  const { mutate } = useMutation({
    mutationFn: (option: string) => {
      return fetch("/api/vote", { body: { option }, method: "POST" });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["game_state"] });
    },
  });

  const OptionButton = ({ option }) => (
    <button
      className="block bg-orange-300 rounded px-16 py-4 my-6"
      onClick={() => {
        mutate(option.content);
      }}
    >
      {option.content} ({option.votes} votes)
    </button>
  );

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
            <OptionButton key={i} option={option} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
