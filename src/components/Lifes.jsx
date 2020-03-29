import React from "react";
import heart from "../images/heart.png";

const Lifes = ({ lifes }) => {
  return (
    <div class="lifesDiv">
      <img
        src={heart}
        alt="Heart"
        className={`${lifes === 5 ? "heartImage" : "heartImage hidden"}`}
      />
      <img
        src={heart}
        alt="Heart"
        className={`${lifes >= 4 ? "heartImage" : "heartImage hidden"}`}
      />
      <img
        src={heart}
        alt="Heart"
        className={`${lifes >= 3 ? "heartImage" : "heartImage hidden"}`}
      />
      <img
        src={heart}
        alt="Heart"
        className={`${lifes >= 2 ? "heartImage" : "heartImage hidden"}`}
      />
      <img
        src={heart}
        alt="Heart"
        className={`${lifes >= 1 ? "heartImage" : "heartImage hidden"}`}
      />
    </div>
  );
};

export default Lifes;
