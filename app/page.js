"use client";
import React, { useState, useEffect } from "react";
import GameDisplayer from "./components/game-displayer";

function Page() {
  // Step 1: State for the random number
  const [randomNum, setRandomNum] = useState();

  // Generate a random number on component mount
  useEffect(() => {
    randNumGenerator();
  }, []);

  // Function to generate a random number
  const randNumGenerator = () => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    setRandomNum(num1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-blue-500 text-white">
      <GameDisplayer randNum={randomNum || 0} />
    </div>
  );
}

export default Page;
