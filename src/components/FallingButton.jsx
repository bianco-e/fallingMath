import React from "react";

const FallingButton = ({ number, onClickAction }) => {
  return (
    <button className="fallingButton" onClick={() => onClickAction(number)}>
      {number}
    </button>
  );
};

export default FallingButton;
