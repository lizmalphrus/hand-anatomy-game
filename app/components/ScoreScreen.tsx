"use client";

import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas";
import { PlacedMuscle } from "../lib/types";
import { calculateScore } from "../lib/scoring";
import ShareImage from "./ShareImage";

interface ScoreScreenProps {
  placedMuscles: PlacedMuscle[];
  onPlayAgain: () => void;
}

export default function ScoreScreen({
  placedMuscles,
  onPlayAgain,
}: ScoreScreenProps) {
  const shareRef = useRef<HTMLDivElement>(null);
  const [sharing, setSharing] = useState(false);
  const { correct, total, percent, tier } = calculateScore(placedMuscles);

  const incorrectPlacements = placedMuscles.filter((p) => !p.correct);
  const correctPlacements = placedMuscles.filter((p) => p.correct);

  const handleShare = useCallback(async () => {
    if (!shareRef.current || sharing) return;
    setSharing(true);

    try {
      const canvas = await html2canvas(shareRef.current, {
        backgroundColor: "#0a0f1a",
        scale: 1,
        width: 1080,
        height: 1080,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setSharing(false);
          return;
        }

        const file = new File([blob], "hand-nerd-detector.png", {
          type: "image/png",
        });

        if (navigator.share && navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: "Hand Nerd Detector",
              text: `I scored ${percent}% on the Hand Nerd Detector! "${tier.label}"`,
            });
          } catch {
            downloadImage(canvas);
          }
        } else {
          downloadImage(canvas);
        }

        setSharing(false);
      }, "image/png");
    } catch {
      setSharing(false);
    }
  }, [sharing, percent, tier.label]);

  const downloadImage = (canvas: HTMLCanvasElement) => {
    const link = document.createElement("a");
    link.download = "hand-nerd-detector.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const isPerfect = percent === 100;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      {/* Confetti for perfect score */}
      {isPerfect && <Confetti />}

      <div className="animate-fade-in text-center">
        <div className="mb-4 text-5xl">{isPerfect ? "🏆" : "🦴"}</div>

        {/* Score circle */}
        <div className="mx-auto mb-6 flex h-40 w-40 flex-col items-center justify-center rounded-full border-4 border-[var(--accent-teal)] bg-[var(--accent-teal)]/10">
          <span className="text-5xl font-bold text-white">{percent}%</span>
          <span className="text-sm text-[var(--text-secondary)]">
            {correct}/{total}
          </span>
        </div>

        {/* Tier */}
        <h2 className="mb-1 text-2xl font-bold text-[var(--median-color)]">
          &ldquo;{tier.label}&rdquo;
        </h2>
        <p className="text-[var(--text-secondary)] italic">{tier.subtitle}</p>

        {/* Actions */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={onPlayAgain}
            className="cursor-pointer rounded-xl bg-[var(--accent-teal)] px-6 py-3 font-bold text-[var(--bg-primary)] transition-all hover:scale-105 active:scale-95"
          >
            Try Again
          </button>
          <button
            onClick={handleShare}
            disabled={sharing}
            className="cursor-pointer rounded-xl border-2 border-[var(--accent-teal)] px-6 py-3 font-bold text-[var(--accent-teal)] transition-all hover:bg-[var(--accent-teal)]/10 active:scale-95 disabled:opacity-50"
          >
            {sharing ? "Generating..." : "Share Score 📸"}
          </button>
        </div>

        {/* Answer review */}
        <div className="mt-10 text-left">
          {incorrectPlacements.length > 0 && (
            <div className="mb-6">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--incorrect-color)]">
                Incorrect ({incorrectPlacements.length})
              </h3>
              <div className="space-y-2">
                {incorrectPlacements.map((p) => (
                  <div
                    key={p.muscle.id}
                    className="flex items-center justify-between rounded-lg bg-[var(--incorrect-color)]/10 px-4 py-2 text-sm"
                  >
                    <span className="text-white">
                      {p.muscle.name}
                      {p.muscle.note && (
                        <span className="ml-1 text-[var(--text-secondary)]">
                          ({p.muscle.note})
                        </span>
                      )}
                    </span>
                    <span className="text-[var(--text-secondary)]">
                      <span className="text-[var(--incorrect-color)] line-through">
                        {p.placedIn}
                      </span>
                      {" → "}
                      <span className="text-[var(--correct-color)]">
                        {p.muscle.nerve}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {correctPlacements.length > 0 && (
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--correct-color)]">
                Correct ({correctPlacements.length})
              </h3>
              <div className="flex flex-wrap gap-2">
                {correctPlacements.map((p) => (
                  <span
                    key={p.muscle.id}
                    className="rounded-md bg-[var(--correct-color)]/10 px-3 py-1 text-xs text-[var(--correct-color)]"
                  >
                    {p.muscle.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden share image */}
      <ShareImage
        ref={shareRef}
        score={percent}
        correct={correct}
        total={total}
        tier={tier}
        placedMuscles={placedMuscles}
      />
    </div>
  );
}

function Confetti() {
  const colors = ["#f59e0b", "#a78bfa", "#22d3ee", "#22c55e", "#14b8a6"];
  const pieces = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    color: colors[i % colors.length],
    size: 6 + Math.random() * 8,
  }));

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.left}%`,
            top: -20,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            animation: `confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
    </div>
  );
}
