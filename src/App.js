import React, { useState, useEffect } from "react";
import "./App.css";
import FallingButtons from "./components/FallingButtons";
import Score from "./components/Score";
import Lifes from "./components/Lifes";

function App() {
  const [randomNumber, setRandomNumber] = useState();
  const [randomNumber2, setRandomNumber2] = useState();
  const [randomOperator, setRandomOperator] = useState("");
  const [score, setScore] = useState(0);
  const [lifes, setLifes] = useState(5);

  const generateNumber = () => {
    return Math.floor(Math.random() * 25);
  };

  const generateOperator = () => {
    const operatorsArray = ["+", "-", "*", "/"];
    return operatorsArray[Math.floor(Math.random() * operatorsArray.length)];
  };

  useEffect(() => {
    setRandomNumber(generateNumber());
    setRandomOperator(generateOperator());
    setRandomNumber2(generateNumber());
  }, []);

  useEffect(() => {
    if (lifes < 1) {
      alert(`You lost! Your score was ${score}`);
      setScore(0);
      setLifes(5);
      setRandomNumber(generateNumber());
      setRandomOperator(generateOperator());
      setRandomNumber2(generateNumber());
    }
  }, [lifes]);

  const operationResult = () => {
    return randomOperator === "+"
      ? randomNumber + randomNumber2
      : randomOperator === "-"
      ? randomNumber - randomNumber2
      : randomOperator === "*"
      ? randomNumber * randomNumber2
      : (randomNumber / randomNumber2) % 1 !== 0 &&
        (randomNumber / randomNumber2).toFixed(2);
  };

  const result = operationResult();

  const generateRandomButtons = result => {
    const buttonsToChooseArray = [];
    for (let i = 0; i < 8; i++) {
      buttonsToChooseArray.push(Math.round(Math.random() * 130));
    }
    for (let i = 0; i < 8; i++) {
      buttonsToChooseArray.push(Math.round(Math.random() * -30));
    }
    for (let i = 0; i < 3; i++) {
      buttonsToChooseArray.push((Math.random() * 10).toFixed(2));
    }
    for (let i = 0; i < 3; i++) {
      buttonsToChooseArray.push("<" + Math.round(Math.random() * 55));
    }
    for (let i = 0; i < 3; i++) {
      buttonsToChooseArray.push(">" + Math.round(Math.random() * 55));
    }

    return buttonsToChooseArray.concat(result);
  };
  const buttonsToChooseArray = generateRandomButtons(result);

  const isLowerArray = buttonsToChooseArray.slice(19, 21);
  const isGreaterArray = buttonsToChooseArray.slice(21, 24);
  const filteredIsLowerArray = isLowerArray.filter(
    element => result < element.slice(1)
  );
  const filteredIsGreaterArray = isGreaterArray.filter(
    element => result > element.slice(1)
  );

  const buttonsArray = buttonsToChooseArray
    .filter(but => result === but)
    .concat(filteredIsLowerArray)
    .concat(filteredIsGreaterArray);

  const getButtons = arr => {
    return arr.map(eachButton => (
      <button
        className="fallingButton"
        onClick={() => {
          return buttonsArray.includes(eachButton)
            ? eachButton === result
              ? setScore(score + 2)
              : setScore(score + 1)
            : setLifes(lifes - 1);
        }}
      >
        {eachButton}
      </button>
    ));
  };

  return (
    <div className="wrapper">
      <FallingButtons
        buttonsToChooseArray={buttonsToChooseArray}
        getButtons={getButtons}
      />
      <div className="bottomDiv">
        <Score score={score} />
        <h1>{`${randomNumber} ${randomOperator} ${randomNumber2}`}</h1>
        <Lifes lifes={lifes} />
      </div>
    </div>
  );
}

export default App;
