"use client";

import { useDraggable } from "@dnd-kit/core";
import { Muscle } from "../lib/types";

interface MuscleCardProps {
  muscle: Muscle;
  isSelected: boolean;
  onTap: (id: string) => void;
  index: number;
}

export default function MuscleCard({
  muscle,
  isSelected,
  onTap,
  index,
}: MuscleCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: muscle.id,
      data: { muscle },
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        animationDelay: `${index * 30}ms`,
      }}
      {...listeners}
      {...attributes}
      onClick={(e) => {
        e.stopPropagation();
        onTap(muscle.id);
      }}
      className={`
        animate-card-entrance cursor-grab select-none rounded-lg border
        bg-[var(--bg-card)] px-3 py-2 text-sm font-medium
        transition-all duration-150
        ${
          isDragging
            ? "z-50 scale-105 opacity-60 shadow-xl shadow-[var(--accent-teal)]/20"
            : "hover:border-[var(--accent-teal)]/40 hover:bg-[var(--bg-card)]/80"
        }
        ${
          isSelected
            ? "border-[var(--accent-teal)] shadow-lg shadow-[var(--accent-teal)]/30 ring-1 ring-[var(--accent-teal)]"
            : "border-white/10"
        }
      `}
    >
      <span className="text-white">{muscle.name}</span>
    </div>
  );
}
