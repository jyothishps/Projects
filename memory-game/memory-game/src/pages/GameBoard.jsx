import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import Leaderboard from "../components/Leaderboard";

export default function GameBoard() {
  const emojis = ["🐱", "🐶", "🦁", "🐸", "🐵", "🐷"];
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [refreshLeaderboard, setRefreshLeaderboard] = useState(false);

  // Shuffle and initialize cards
  const shuffleCards = () => {
    const shuffled = [...emojis, ...emojis]
      .map((emoji) => ({ emoji, id: Math.random(), matched: false }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setMoves(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTime(0);
    setIsRunning(true);
    setDisabled(false);
  };

  // Handle card selection
  const handleChoice = (card) => {
    if (disabled) return;
    if (card.matched) return;
    if (choiceOne && card.id === choiceOne.id) return; // prevent same card
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Reset turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves((prev) => prev + 1);
    setDisabled(false);
  };

  // Format time as MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => setTime((prev) => prev + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  // Match logic
  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setDisabled(true);

    if (choiceOne.emoji === choiceTwo.emoji) {
      setCards((prev) =>
        prev.map((c) =>
          c.emoji === choiceOne.emoji ? { ...c, matched: true } : c
        )
      );
      setTimeout(() => resetTurn(), 500);
    } else {
      setTimeout(() => resetTurn(), 800);
    }
  }, [choiceOne, choiceTwo]);

  // Check for game completion
  useEffect(() => {
    const allMatched = cards.length > 0 && cards.every((card) => card.matched);
    if (allMatched && cards.length > 0) {
      setIsRunning(false);

      const username = prompt(
        `Congratulations! You finished in ${moves} moves and ${formatTime(
          time
        )}. Enter your name:`
      );

      if (username) {
        axios
          .post("http://localhost:5000/api/scores", {
            username,
            moves,
            time_taken: time,
          })
          .then(() => setRefreshLeaderboard((prev) => !prev))
          .catch((err) => console.log(err));
      }
    }
  }, [cards]);

  // Initial shuffle
  useEffect(() => {
    shuffleCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1 className="text-3xl font-bold text-white mb-4">Memory Game</h1>
      <button
        className="px-4 py-2 bg-sky-500 rounded text-white mb-6"
        onClick={shuffleCards}
      >
        New Game
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          justifyItems: "center",
        }}
      >
        {cards.map((card) => (
          <Card
            key={card.id}
            item={card}
            onClick={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </div>

      <p className="text-white mt-6 text-lg">Moves: {moves}</p>
      <p className="text-white mt-2 text-lg">Time: {formatTime(time)}</p>

      {/* Leaderboard component */}
      <Leaderboard key={refreshLeaderboard} />
    </div>
  );
}
