"use client";

import { forwardRef } from "react";
import { PlacedMuscle, ScoreTier } from "../lib/types";

interface ShareImageProps {
  score: number;
  correct: number;
  total: number;
  tier: ScoreTier;
  placedMuscles: PlacedMuscle[];
}

const ShareImage = forwardRef<HTMLDivElement, ShareImageProps>(
  function ShareImage({ score, correct, total, tier }, ref) {
    return (
      <div
        ref={ref}
        style={{
          width: 1080,
          height: 1080,
          background: "linear-gradient(135deg, #0a0f1a 0%, #111827 50%, #0a0f1a 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 80,
          fontFamily: "Arial, Helvetica, sans-serif",
          position: "absolute",
          left: -9999,
          top: -9999,
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(20, 184, 166, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        <div style={{ position: "relative", textAlign: "center" }}>
          <div style={{ fontSize: 80, marginBottom: 20 }}>🦴</div>

          <div
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "#14b8a6",
              letterSpacing: 4,
              textTransform: "uppercase",
              marginBottom: 40,
            }}
          >
            Nerve-Muscle Sorting Game
          </div>

          {/* Score circle */}
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              border: "4px solid #14b8a6",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 40px",
              background: "rgba(20, 184, 166, 0.08)",
            }}
          >
            <div
              style={{
                fontSize: 96,
                fontWeight: "bold",
                color: "#ffffff",
                lineHeight: 1,
              }}
            >
              {score}%
            </div>
            <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 8 }}>
              {correct}/{total} correct
            </div>
          </div>

          {/* Tier */}
          <div
            style={{
              fontSize: 42,
              fontWeight: "bold",
              color: "#f59e0b",
              marginBottom: 16,
            }}
          >
            &ldquo;{tier.label}&rdquo;
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#94a3b8",
              fontStyle: "italic",
            }}
          >
            {tier.subtitle}
          </div>
        </div>
      </div>
    );
  }
);

export default ShareImage;
