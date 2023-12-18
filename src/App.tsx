import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { motion } from "framer-motion";
import PendingScreen from "./components/ui/PendingScreen";
import Joycon from "./components/nintendo-switch/Joycon";

function App() {
  return (
    <motion.div className="App">
      <Joycon />
    </motion.div>
  );
}

export default App;
