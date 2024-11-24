"use client";
import React, { useState, useEffect } from "react";

const GameDisplayer = ({ randNum }) => {
  const [checkValue, setCheckValue] = useState();
  const [output, setOutput] = useState("Start Guessing");
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(
    localStorage.getItem("highScore")
      ? parseInt(localStorage.getItem("highScore"))
      : 0
  );

  const inputHandler = (event) => setCheckValue(parseInt(event.target.value));
  const checkHandler = () => {
    if (!correctAnswer && score > 0) {
      if (checkValue !== undefined) {
        if (checkValue === randNum) {
          setOutput("🎉 Correct Guess!");
          setCorrectAnswer(true);
        } else {
          setOutput(checkValue > randNum ? "⬆️ Guess is Higher" : "⬇️ Guess is Lower");
          setScore(score - 1);

          if (score - 1 === 0) {
            setOutput("💀 Game Over");
            setScore(0);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (correctAnswer && score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }
  }, [correctAnswer, score, highScore]);

  const resetLocalStorage = () => {
    localStorage.removeItem("highScore");
    setHighScore(0);
  };

  const reloadGame = () => window.location.reload();

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl text-gray-800">
      {/* Top Section */}
      <div className="flex items-center justify-between mb-8">
        <div className="h-1 bg-gray-300 flex-grow"></div>
        <h1 className={`text-5xl font-extrabold mx-6 ${correctAnswer ? "text-green-500" : "text-gray-800"}`}>
          {correctAnswer ? randNum : "?"}
        </h1>
        <div className="h-1 bg-gray-300 flex-grow"></div>
      </div>

      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">Guess My Number</h2>

      {/* Game Info */}
      <div className="flex justify-between mb-6">
        <p className="text-lg">
          <span className="font-bold">Score:</span> {score}
        </p>
        <p className="text-lg">
          <span className="font-bold">High Score:</span> {highScore}
        </p>
      </div>

      {/* Feedback */}
      <div className="text-center mb-6">
        <p className={`text-2xl font-medium ${correctAnswer ? "text-green-500" : score === 0 ? "text-red-500" : "text-gray-800"}`}>
          {output}
        </p>
      </div>

      {/* Input & Actions */}
      <div className="space-y-4">
        <input
          type="number"
          onChange={inputHandler}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:outline-none"
          placeholder="Enter your guess"
        />
        <div className="flex justify-between">
          <button
            onClick={checkHandler}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition"
          >
            Guess
          </button>
          <button
            onClick={reloadGame}
            className="px-4 py-2 bg-yellow-500 text-white font-medium rounded-md hover:bg-yellow-600 transition"
          >
            Restart
          </button>
          <button
            onClick={resetLocalStorage}
            className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition"
          >
            Reset Score
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameDisplayer;
