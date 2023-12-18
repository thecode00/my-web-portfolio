import React from "react";
import JoyconButton from "./JoyconButton";
import classes from "./Joycon.module.css";

const Joycon: React.FC<{ joyconColor: string }> = (prop) => {
  return (
    <div className={classes.joycon}>
      {/* <JoyconButton text="A" shape="o" /> */}
    </div>
  );
};

export default Joycon;
