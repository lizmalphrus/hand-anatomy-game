"use client";

import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { useState, useCallback } from "react";
import { Muscle, Nerve, PlacedMuscle } from "../lib/types";
import MuscleCard from "./MuscleCard";
import NerveColumn from "./NerveColumn";

interface GameBoardProps {
  unplacedMuscles: Muscle[];
  placedMuscles: PlacedMuscle[];
  onPlaceMuscle: (muscleId: string, nerve: Nerve) => void;
  selectedCardId: string | null;
  onSelectCard: (id: string | null) => void;
}

const nerves: Nerve[] = ["median", "ulnar", "radial"];

export default function GameBoard({
  unplacedMuscles,
  placedMuscles,
  onPlaceMuscle,
  selectedCardId,
  onSelectCard,
}: GameBoardProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [feedbackId, setFeedbackId] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<
    "correct" | "incorrect" | null
  >(null);

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: { distance: 5 },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 200, tolerance: 5 },
  });
  const sensors = useSensors(pointerSensor, touchSensor);

  const activeMuscle = activeId
    ? unplacedMuscles.find((m) => m.id === activeId)
    : null;

  const showFeedback = useCallback((muscleId: string, correct: boolean) => {
    setFeedbackId(muscleId);
    setFeedbackType(correct ? "correct" : "incorrect");
    setTimeout(() => {
      setFeedbackId(null);
      setFeedbackType(null);
    }, 600);
  }, []);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
    onSelectCard(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over) return;

    const muscleId = active.id as string;
    const nerve = over.id as Nerve;
    if (!nerves.includes(nerve)) return;

    const muscle = unplacedMuscles.find((m) => m.id === muscleId);
    if (!muscle) return;

    onPlaceMuscle(muscleId, nerve);
    showFeedback(muscleId, muscle.nerve === nerve);
  };

  const handleTapCard = (id: string) => {
    onSelectCard(selectedCardId === id ? null : id);
  };

  const handleTapColumn = (nerve: Nerve) => {
    if (!selectedCardId) return;
    const muscle = unplacedMuscles.find((m) => m.id === selectedCardId);
    if (!muscle) return;

    onPlaceMuscle(selectedCardId, nerve);
    showFeedback(selectedCardId, muscle.nerve === nerve);
    onSelectCard(null);
  };

  const placedByNerve = (nerve: Nerve) =>
    placedMuscles.filter((p) => p.placedIn === nerve);

  const progress = placedMuscles.length;
  const total = placedMuscles.length + unplacedMuscles.length;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Progress bar */}
        <div className="mb-6 flex items-center gap-3">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {progress}/{total}
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--bg-secondary)]">
            <div
              className="h-full rounded-full bg-[var(--accent-teal)] transition-all duration-300"
              style={{ width: `${(progress / total) * 100}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Card pool */}
          <div className="lg:w-1/3">
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
              Muscles to Sort ({unplacedMuscles.length} remaining)
            </h2>
            <div
              className="flex flex-wrap gap-2"
              onClick={() => onSelectCard(null)}
            >
              {unplacedMuscles.map((muscle, i) => (
                <MuscleCard
                  key={muscle.id}
                  muscle={muscle}
                  isSelected={selectedCardId === muscle.id}
                  onTap={handleTapCard}
                  index={i}
                />
              ))}
              {unplacedMuscles.length === 0 && (
                <p className="py-8 text-center text-sm italic text-[var(--text-secondary)] w-full">
                  All muscles placed!
                </p>
              )}
            </div>
          </div>

          {/* Nerve columns */}
          <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
            {nerves.map((nerve) => (
              <NerveColumn
                key={nerve}
                nerve={nerve}
                placedMuscles={placedByNerve(nerve)}
                onTapColumn={handleTapColumn}
                feedbackId={feedbackId}
                feedbackType={feedbackType}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeMuscle ? (
          <div className="rounded-lg border border-[var(--accent-teal)] bg-[var(--bg-card)] px-3 py-2 text-sm font-medium shadow-xl shadow-[var(--accent-teal)]/20">
            <span className="text-white">{activeMuscle.name}</span>
            {activeMuscle.note && (
              <span className="ml-1.5 text-xs text-[var(--text-secondary)]">
                ({activeMuscle.note})
              </span>
            )}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
