"use client";

import { useDroppable } from "@dnd-kit/core";
import { Nerve, PlacedMuscle } from "../lib/types";

interface NerveColumnProps {
  nerve: Nerve;
  placedMuscles: PlacedMuscle[];
  onTapColumn: (nerve: Nerve) => void;
  feedbackId: string | null;
  feedbackType: "correct" | "incorrect" | null;
}

const nerveConfig: Record<
  Nerve,
  {
    label: string;
    color: string;
    borderColor: string;
    bgColor: string;
    count: number;
    subdivision?: { label: string; fullName: string };
  }
> = {
  median: {
    label: "Median Nerve",
    color: "var(--median-color)",
    borderColor: "var(--median-border)",
    bgColor: "var(--median-bg)",
    count: 10,
    subdivision: {
      label: "AIN",
      fullName: "Anterior Interosseous Nerve",
    },
  },
  ulnar: {
    label: "Ulnar Nerve",
    color: "var(--ulnar-color)",
    borderColor: "var(--ulnar-border)",
    bgColor: "var(--ulnar-bg)",
    count: 13,
  },
  radial: {
    label: "Radial Nerve",
    color: "var(--radial-color)",
    borderColor: "var(--radial-border)",
    bgColor: "var(--radial-bg)",
    count: 6,
    subdivision: {
      label: "PIN",
      fullName: "Posterior Interosseous Nerve",
    },
  },
};

function PlacedItem({
  pm,
  feedbackId,
  feedbackType,
}: {
  pm: PlacedMuscle;
  feedbackId: string | null;
  feedbackType: "correct" | "incorrect" | null;
}) {
  return (
    <div
      className={`
        rounded-md px-3 py-1.5 text-xs font-medium
        ${feedbackId === pm.muscle.id && feedbackType === "correct" ? "animate-correct-flash" : ""}
        ${feedbackId === pm.muscle.id && feedbackType === "incorrect" ? "animate-incorrect-shake" : ""}
      `}
      style={{
        backgroundColor: pm.correct
          ? "rgba(34, 197, 94, 0.15)"
          : "rgba(239, 68, 68, 0.15)",
        borderLeft: `3px solid ${
          pm.correct ? "var(--correct-color)" : "var(--incorrect-color)"
        }`,
        color: pm.correct ? "var(--correct-color)" : "var(--incorrect-color)",
      }}
    >
      {pm.muscle.name}
      {!pm.correct && (
        <span className="ml-1 opacity-60">
          →{" "}
          {pm.muscle.nerve.charAt(0).toUpperCase() + pm.muscle.nerve.slice(1)}
          {pm.muscle.subdivision ? ` (${pm.muscle.subdivision})` : ""}
        </span>
      )}
    </div>
  );
}

export default function NerveColumn({
  nerve,
  placedMuscles,
  onTapColumn,
  feedbackId,
  feedbackType,
}: NerveColumnProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: nerve,
    data: { nerve },
  });

  const config = nerveConfig[nerve];

  // Split placed muscles into main vs subdivision
  const mainMuscles = placedMuscles.filter((p) => !p.muscle.subdivision);
  const subMuscles = placedMuscles.filter((p) => !!p.muscle.subdivision);

  return (
    <div
      ref={setNodeRef}
      onClick={() => onTapColumn(nerve)}
      className={`
        flex min-h-[200px] flex-col rounded-xl border-2 border-dashed
        transition-all duration-200 cursor-pointer
        ${isOver ? "border-solid bg-white/5 scale-[1.01]" : ""}
      `}
      style={{
        borderColor: isOver ? config.color : config.borderColor,
        backgroundColor: isOver ? undefined : config.bgColor,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between rounded-t-lg px-4 py-3"
        style={{ borderBottom: `1px solid ${config.borderColor}` }}
      >
        <h3 className="text-base font-bold" style={{ color: config.color }}>
          {config.label}
        </h3>
        <span
          className="rounded-full px-2 py-0.5 text-xs font-medium"
          style={{
            backgroundColor: config.bgColor,
            color: config.color,
            border: `1px solid ${config.borderColor}`,
          }}
        >
          {placedMuscles.length}/{config.count}
        </span>
      </div>

      {/* Placed muscles — main trunk */}
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        {placedMuscles.length === 0 && (
          <p className="py-4 text-center text-xs text-[var(--text-secondary)] italic">
            Drop muscles here
          </p>
        )}
        {mainMuscles.map((pm) => (
          <PlacedItem
            key={pm.muscle.id}
            pm={pm}
            feedbackId={feedbackId}
            feedbackType={feedbackType}
          />
        ))}

        {/* Subdivision sub-bucket */}
        {config.subdivision && (
          <div
            className="mt-2 rounded-lg border border-dashed p-2"
            style={{
              borderColor: config.borderColor,
              backgroundColor: "rgba(255,255,255,0.02)",
            }}
          >
            <div
              className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: config.color, opacity: 0.7 }}
            >
              <span
                className="inline-block h-px flex-1"
                style={{ backgroundColor: config.borderColor }}
              />
              {config.subdivision.label}
              <span
                className="inline-block h-px flex-1"
                style={{ backgroundColor: config.borderColor }}
              />
            </div>
            <p
              className="mb-1.5 text-center text-[10px] italic"
              style={{ color: config.color, opacity: 0.4 }}
            >
              {config.subdivision.fullName}
            </p>
            {subMuscles.length === 0 && mainMuscles.length === 0 && (
              <p className="py-1 text-center text-[10px] text-[var(--text-secondary)] italic opacity-50">
                —
              </p>
            )}
            {subMuscles.map((pm) => (
              <PlacedItem
                key={pm.muscle.id}
                pm={pm}
                feedbackId={feedbackId}
                feedbackType={feedbackType}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
