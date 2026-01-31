"use client";

interface IntroScreenProps {
  onStart: () => void;
}

export default function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-4 py-12 text-center">
      <div className="animate-fade-in max-w-lg">
        <div className="mb-6 text-6xl">🦴</div>
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
          Hand Nerd
          <br />
          <span className="text-[var(--accent-teal)]">Detector</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--text-secondary)]">
          Do you know the innervation of every muscle of the hand?
          <br />
          Here&apos;s a lil test to find out.
        </p>

        <div className="mt-8 rounded-xl border border-[var(--accent-teal)]/20 bg-[var(--bg-secondary)] p-6 text-left text-sm">
          <h2 className="mb-3 text-base font-semibold text-[var(--accent-teal)]">
            How to Play
          </h2>
          <ul className="space-y-2 text-[var(--text-secondary)]">
            <li className="flex gap-2">
              <span className="text-[var(--median-color)]">●</span>
              <span>
                <strong className="text-white">Desktop:</strong> Drag each
                muscle card into the correct nerve column
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--ulnar-color)]">●</span>
              <span>
                <strong className="text-white">Mobile:</strong> Tap a card to
                select it, then tap a nerve column to place it
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--radial-color)]">●</span>
              <span>
                You&apos;ll get{" "}
                <strong className="text-[var(--correct-color)]">
                  immediate feedback
                </strong>{" "}
                on each placement
              </span>
            </li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="mt-8 cursor-pointer rounded-xl bg-[var(--accent-teal)] px-8 py-3 text-lg font-bold text-[var(--bg-primary)] transition-all hover:scale-105 hover:shadow-lg hover:shadow-[var(--accent-teal)]/20 active:scale-95 animate-pulse-glow"
        >
          Scrub In 🧤
        </button>
      </div>
    </div>
  );
}
