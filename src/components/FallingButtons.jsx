import React, { useState } from "react";
import { useTransition, animated } from "react-spring";

const FallingButtons = props => {
  const { buttonsToChooseArray, getButtons } = props;
  const unOrderedButtons = getButtons(
    buttonsToChooseArray.sort((a, b) => {
      return 0.5 - Math.random();
    })
  );

  /*  const [items, set] = useState(unOrderedButtons);
  const transitions = useTransition(items, item => item.key, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" }
  });
  return transitions.map(({ item, props, key }) => (
    <animated.div key={key} style={props}>
      {item.text}
    </animated.div>
  )); */

  return <div className="fallingButtonsDiv">{unOrderedButtons}</div>;
};

export default FallingButtons;
