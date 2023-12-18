import React from "react";
import classes from "./JoyconButton.module.css";

const JoyconButton: React.FC<{ text: string | null; shape: string }> = (
  props
) => {
  const buttonShape = "360px";
  return (
    <div className={classes.button} style={{ borderRadius: buttonShape }}>
      {props.text}
    </div>
  );
};

export default JoyconButton;
