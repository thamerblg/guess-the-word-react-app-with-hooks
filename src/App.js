import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const words = [
    "pies",
    "game",
    "like",
    "hope",
    "fail",
    "joke",
    "drag",
    "drop",
    "code",
    "love",
    "node",
    "html",
  ];

  const [randomWord, setRandomWord] = useState("");
  const [char, setChar] = useState("");
  const [numberOfTrials, setNumberOfTrials] = useState(6);
  const [result, setResult] = useState([
    { id: 0, Character: "" },
    { id: 1, Character: "" },
    { id: 2, Character: "" },
    { id: 3, Character: "" },
  ]);
  const [sumCharResult, setSumCharResult] = useState("");
  const [message, setMessage] = useState({ type: "", status: "" });

  useEffect(
    () => {
      setRandomWord(words[Math.floor(Math.random() * words.length)]);
    }, // eslint-disable-next-line
    []
  );

  useEffect(() => {
    setSumCharResult(
      result.reduce(function (accumulator, curValue) {
        return accumulator + curValue.Character;
      }, "")
    );
  }, [result]);

  const submitForm = (e) => {
    e.preventDefault();
    if (char.length === 0) {
      setMessage({
        type: "info",
        status: "The field is empty, please enter a letter !!!",
      });
      setTimeout(() => {
        setMessage({ type: "", status: "" });
      }, 3000);
    } else if (char.length > 1) {
      setMessage({
        type: "warning",
        status: "Stop, you must enter a single letter !!!",
      });
      setTimeout(() => {
        setMessage({ type: "", status: "" });
      }, 3000);
    } else if (randomWord.includes(char)) {
      var index = randomWord.indexOf(char);

      const newState = result.map((obj) =>
        obj.id === index ? { ...obj, Character: char } : obj
      );

      setResult(newState);

      setMessage({
        type: "success",
        status: "Good, that is a true lettre !!!",
      });
      setTimeout(() => {
        setMessage({ type: "", status: "" });
      }, 3000);
    } else {
      setNumberOfTrials(numberOfTrials - 1);
      setMessage({
        type: "danger",
        status: "Failed, that is a false lettre !!!",
      });
      setTimeout(() => {
        setMessage({ type: "", status: "" });
      }, 3000);
    }
    setChar("");
  };

  const handleRestart = (e) => {
    e.preventDefault();
    setRandomWord(words[Math.floor(Math.random() * words.length)]);
    setNumberOfTrials(6);
    const restartState = result.map((obj) => {
      return { id: obj.id, Character: "" };
    });
    setResult(restartState);
    setChar("");
  };

  return (
    <div className="container">
      <h1>Guess The Word</h1>
      <ul className="word-in-progress">
        <li>{result[0].Character === "" ? "_" : result[0].Character}</li>
        <li>{result[1].Character === "" ? "_" : result[1].Character}</li>
        <li>{result[2].Character === "" ? "_" : result[2].Character}</li>
        <li>{result[3].Character === "" ? "_" : result[3].Character}</li>
      </ul>
      <p className={`message ${message.type ? message.type : ""}`}>
        {message.status}
      </p>
      <p className="remaining">
        {numberOfTrials === 0
          ? "Failed, You Lose..."
          : sumCharResult === randomWord
          ? "Success, You Win..."
          : `You have ${numberOfTrials} guesses remaining`}
      </p>
      {numberOfTrials !== 0 && sumCharResult !== randomWord ? (
        <form className="guess-form" onSubmit={submitForm}>
          <label>Type one letter:</label>
          <input
            type="text"
            name="letter"
            className="letter"
            value={char}
            onChange={(e) => {
              setChar(e.target.value);
            }}
          />
          <div className="btn-submit">
            <button
              className="guess"
              disabled={numberOfTrials === 0 || sumCharResult === randomWord}
            >
              Guess!
            </button>
          </div>
        </form>
      ) : (
        <button className="play-again" onClick={handleRestart}>
          Play Again!
        </button>
      )}
    </div>
  );
}

export default App;
