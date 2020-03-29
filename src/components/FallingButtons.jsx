import React from "react";

const FallingButtons = props => {
  const { buttonsToChooseArray, getButtons } = props;

  return (
    <div className="fallingButtonsDiv">
      {getButtons(
        buttonsToChooseArray.sort((a, b) => {
          return 0.5 - Math.random();
        })
      )}
    </div>
  );
};

export default FallingButtons;
