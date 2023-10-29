import React, { FunctionComponent, useEffect } from "react";

import Countdown from "react-countdown";

import logo from "./logo.png";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetch } from "./client";
import { Logo } from "./CJALogo";

const buttonColor = ({ chosen, isOver }) => {
  let classes = [];

  if (chosen) {
    classes.push("bg-orange-500");
  } else {
    classes.push("bg-orange-300");
  }
  if (isOver) {
    classes.push("opacity-50");
  }
  return classes.join(" ");
};

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

  const isOver = game_state.secondsLeft <= 0;

  const OptionButton = ({ option }) => (
    <button
      className={`block rounded px-16 py-4 my-6 ${buttonColor({
        chosen: option.chosen,
        isOver,
      })}`}
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
      <img src={logo} className="App-logo max-w-xs m-auto pt-2" alt="logo" />
      <p className="text-center py-8">
        Time Left: {Math.max(game_state.secondsLeft, 0)} seconds
      </p>
      <p className="px-6">{game_state.currentStory}</p>

      <div className="flex flex-col items-center">
        {game_state.options.map((option, i) => (
          <OptionButton key={i} option={option} />
        ))}
      </div>

      <div className="cja-branding mt-auto pt-24 text-center">
        Created by <a href="https://coreyja.com">coreyja</a>
        <a href="https://coreyja.com">
          <Logo />
        </a>
      </div>
    </div>
  );
}

export default App;
