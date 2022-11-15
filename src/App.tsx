import React from "react";
import "./App.css";
import AlphabetCanvas from "./components/AlphabetCanvas";
import TriangleCanvas from "./components/TriangleCanvas";

function App() {
  return (
    <>
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      {/* <TriangleCanvas /> */}
      <AlphabetCanvas />
    </>
  );
}

export default App;
