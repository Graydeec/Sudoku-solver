import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Solver from "./Solver";
import Game from "./Game";
import { useState, useEffect } from "react";

function App() {
  const [mode, setMode] = useState("GAME");

  const handleClick = (e) => {
    setMode(e.target.value);
  };

  return (
    <div className="App">
      <div className="App-header">
        <Header name={"SODUKU"} />
        <div className="buttonBar">
          <button
            className="button"
            value="GAME"
            onClick={(e) => handleClick(e)}
          >
            Game
          </button>
          <button
            className="button"
            value="SOLVER"
            onClick={(e) => handleClick(e)}
          >
            Solver
          </button>
        </div>
        {mode === "GAME" ? <Game /> : <Solver />}
      </div>
    </div>
  );
}

export default App;
