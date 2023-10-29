import React, { useEffect } from "react";

import logo from "./logo.svg";
import "./App.css";
import { fetch } from "./client";

function App() {
  const [fetching, setFetching] = React.useState(false);
  const [msg, setMsg] = React.useState<string | undefined>();

  useEffect(() => {
    if (!fetching && !msg) {
      setFetching(true);
      fetch("/api/hello", {}).then((res) => {
        setMsg(res.data?.msg);
        setFetching(false);
      });
    }
  }, [msg, setMsg, fetching, setFetching]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {msg && <p>{msg}</p>}
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
