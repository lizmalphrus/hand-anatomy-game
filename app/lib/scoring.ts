import { PlacedMuscle, ScoreTier } from "./types";

const tiers: ScoreTier[] = [
  {
    label: "Certified Hand Nerd",
    subtitle: "You probably dream about the carpal tunnel.",
    minPercent: 100,
  },
  {
    label: "Ready for the OR",
    subtitle: "The attending might actually let you close.",
    minPercent: 75,
  },
  {
    label: "Netter Notice",
    subtitle: "Back to the books! 📚",
    minPercent: 50,
  },
  {
    label: "Dude, Did You Even Study?",
    subtitle: "That little short one on the side? That's called the thumb.",
    minPercent: 0,
  },
];

export function calculateScore(placed: PlacedMuscle[]): {
  correct: number;
  total: number;
  percent: number;
  tier: ScoreTier;
} {
  const correct = placed.filter((p) => p.correct).length;
  const total = placed.length;
  const percent = total > 0 ? Math.round((correct / total) * 100) : 0;
  const tier = tiers.find((t) => percent >= t.minPercent) ?? tiers[tiers.length - 1];

  return { correct, total, percent, tier };
}
