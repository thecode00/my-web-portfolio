import { motion } from "framer-motion";
import React from "react";

function PendingScreen() {
  return (
    <>
      <motion.img
        initial={{ x: 0, y: 0 }}
        animate={{ x: 100 }}
        src={"public/pngwing.png"}
      />
    </>
  );
}

export default PendingScreen;
