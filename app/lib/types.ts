export type Nerve = "median" | "ulnar" | "radial";
export type Subdivision = "AIN" | "PIN" | null;

export interface Muscle {
  id: string;
  name: string;
  nerve: Nerve;
  subdivision?: Subdivision; // AIN (median branch) or PIN (radial branch)
  note?: string; // extra detail shown only on score screen, not on card
}

export interface PlacedMuscle {
  muscle: Muscle;
  placedIn: Nerve;
  correct: boolean;
}

export type GamePhase = "intro" | "playing" | "results";

export interface GameState {
  phase: GamePhase;
  unplacedMuscles: Muscle[];
  placedMuscles: PlacedMuscle[];
  selectedCardId: string | null; // for tap-to-select on mobile
}

export interface ScoreTier {
  label: string;
  subtitle: string;
  minPercent: number;
}
