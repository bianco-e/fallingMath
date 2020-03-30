import React, { useState, useEffect } from "react";
import { useTransition, animated } from "react-spring";
import "./App.css";
import FallingButton from "./components/FallingButton";
import Score from "./components/Score";
import Lifes from "./components/Lifes";

const generateNumber = () => {
  return Math.floor(Math.random() * 25);
};

const generateOperator = () => {
  const operatorsArray = ["+", "-", "x", "/"];
  return operatorsArray[Math.floor(Math.random() * operatorsArray.length)];
};

const operationResult = (firstNumber, secondNumber, operator) => {
  if (operator === "+") {
    return firstNumber + secondNumber;
  } else if (operator === "-") {
    return firstNumber - secondNumber;
  } else if (operator === "x") {
    return firstNumber * secondNumber;
  } else if (operator === "/") {
    if ((firstNumber / secondNumber) % 1 !== 0) {
      return (firstNumber / secondNumber).toFixed(2);
    } else {
      return firstNumber / secondNumber;
    }
  }
};

const getExtraOptions = () => {
  let buttonsToChooseArray = [];
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
  return buttonsToChooseArray;
};

function App() {
  const [randomNumber, setRandomNumber] = useState();
  const [randomNumber2, setRandomNumber2] = useState();
  const [randomOperator, setRandomOperator] = useState("");
  const [score, setScore] = useState(0);
  const [lifes, setLifes] = useState(5);
  const [optionsToShow, setOptionsToShow] = useState([]);
  const [correctOptions, setCorrectOptions] = useState([]);
  const [result, setResult] = useState();

  const newOperationAndResult = () => {
    const firstNumber = generateNumber();
    const secondNumber = generateNumber();
    const operator = generateOperator();
    const newResult = operationResult(firstNumber, secondNumber, operator);
    setRandomNumber(firstNumber);
    setRandomOperator(operator);
    setRandomNumber2(secondNumber);
    setResult(newResult);
    return newResult;
  };

  const configNewStage = () => {
    const result = newOperationAndResult();
    const orderedOptions = getExtraOptions().concat(result);
    const unOrderedOptions = orderedOptions
      .map((content, i) => ({
        content: content,
        key: i
      }))
      .sort(() => {
        return Math.random() - 0.5;
      });
    setOptionsToShow(unOrderedOptions);
    const isLowerArray = orderedOptions
      .slice(19, 22)
      .filter(element => result < element.slice(1));
    const isGreaterArray = orderedOptions
      .slice(22, 25)
      .filter(element => result > element.slice(1));
    const correctOptionsArray = orderedOptions
      .filter(but => result === but)
      .concat(isLowerArray)
      .concat(isGreaterArray);
    setCorrectOptions(correctOptionsArray);
  };

  useEffect(() => {
    configNewStage();
  }, []);

  useEffect(() => {
    if (lifes < 1) {
      alert(`You lost! Your score was ${score}`);
      setScore(0);
      setLifes(5);
      configNewStage();
    }
  }, [lifes]);

  useEffect(() => {
    configNewStage();
  }, [score]);

  const transitions = useTransition(optionsToShow, item => item.key, {
    from: { transform: "translate3d(0,-100px,0)" },
    enter: () => ({
      transform: `translate3d(0,${Math.random() * (420 - 10) + 10}px,0)`
    })
  });
  return (
    <div className="wrapper">
      <div className="fallingButtonsDiv">
        {transitions.map(({ item, props, key }) => (
          <animated.div key={key} style={props}>
            <FallingButton
              number={item.content}
              onClickAction={number => {
                return correctOptions.includes(number)
                  ? number === result
                    ? setScore(score + 2)
                    : setScore(score + 1)
                  : setLifes(lifes - 1);
              }}
            />
          </animated.div>
        ))}
      </div>
      <div className="bottomDiv">
        <Score score={score} />
        <h1>{`${randomNumber} ${randomOperator} ${randomNumber2}`}</h1>
        <Lifes lifes={lifes} />
      </div>
    </div>
  );
}

export default App;
