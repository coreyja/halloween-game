import React, { FunctionComponent, useEffect } from "react";

import Countdown from "react-countdown";

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

  const [secondsLeft, setSecondsLeft] = React.useState(undefined);

  if (!game_state || !game_state.currentStory || !game_state.options) {
    return <div>Loading...</div>;
  }

  const nextStageAt = new Date(game_state.nextStageAt!);
  const now = new Date();

  const isOver = nextStageAt.getTime() < now.getTime();

  const OptionButton = ({ option }) => (
    <button
      className={`block rounded px-16 py-4 my-6 ${
        option.chosen ? "bg-orange-500" : "bg-orange-300"
      }`}
      onClick={() => {
        mutate(option.content);
      }}
      disabled={isOver}
    >
      {option.content} ({option.votes} votes)
    </button>
  );
  return (
    <div className="App min-h-screen">
      <header className="App-header">
        <img src={logo} className="App-logo max-w-xs m-auto pt-2" alt="logo" />
        <p>
          Time Left: <Countdown date={nextStageAt} />
        </p>
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
