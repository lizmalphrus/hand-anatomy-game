"use client";

import { useState, useCallback } from "react";
import { GamePhase, Muscle, Nerve, PlacedMuscle } from "../lib/types";
import { muscles, shuffleArray } from "../lib/muscleData";
import IntroScreen from "./IntroScreen";
import GameBoard from "./GameBoard";
import ScoreScreen from "./ScoreScreen";

export default function Game() {
  const [phase, setPhase] = useState<GamePhase>("intro");
  const [unplacedMuscles, setUnplacedMuscles] = useState<Muscle[]>([]);
  const [placedMuscles, setPlacedMuscles] = useState<PlacedMuscle[]>([]);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const startGame = useCallback(() => {
    setUnplacedMuscles(shuffleArray(muscles));
    setPlacedMuscles([]);
    setSelectedCardId(null);
    setPhase("playing");
  }, []);

  const handlePlaceMuscle = useCallback(
    (muscleId: string, nerve: Nerve) => {
      const muscle = unplacedMuscles.find((m) => m.id === muscleId);
      if (!muscle) return;

      const correct = muscle.nerve === nerve;
      const placed: PlacedMuscle = { muscle, placedIn: nerve, correct };

      setUnplacedMuscles((prev) => prev.filter((m) => m.id !== muscleId));
      setPlacedMuscles((prev) => {
        const next = [...prev, placed];
        // Check if game is over
        if (next.length === muscles.length) {
          setTimeout(() => setPhase("results"), 800);
        }
        return next;
      });
    },
    [unplacedMuscles]
  );

  return (
    <>
      {phase === "intro" && <IntroScreen onStart={startGame} />}
      {phase === "playing" && (
        <GameBoard
          unplacedMuscles={unplacedMuscles}
          placedMuscles={placedMuscles}
          onPlaceMuscle={handlePlaceMuscle}
          selectedCardId={selectedCardId}
          onSelectCard={setSelectedCardId}
        />
      )}
      {phase === "results" && (
        <ScoreScreen placedMuscles={placedMuscles} onPlayAgain={startGame} />
      )}
    </>
  );
}
