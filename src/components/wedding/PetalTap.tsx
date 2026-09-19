import { useCallback, useRef, useState } from "react";

type Petal = { id: number; x: number; y: number; drift: number; hue: number };

/** Signature interaction: tapping the hero scatters watercolor petals from the touch point. */
export function PetalTap({ children }: { children: React.ReactNode }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const seed = useRef(0);

  const spawn = useCallback((clientX: number, clientY: number, host: HTMLElement) => {
    const rect = host.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const batch: Petal[] = Array.from({ length: 7 }, () => ({
      id: seed.current++,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 24,
      drift: (Math.random() - 0.5) * 120,
      hue: Math.random(),
    }));
    setPetals((p) => [...p.slice(-40), ...batch]);
    setTimeout(() => {
      const ids = new Set(batch.map((b) => b.id));
      setPetals((p) => p.filter((q) => !ids.has(q.id)));
    }, 2600);
  }, []);

  return (
    <div
      className="relative"
      onPointerDown={(e) => spawn(e.clientX, e.clientY, e.currentTarget)}
    >
      {children}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {petals.map((p) => (
          <span
            key={p.id}
            className="absolute block h-2.5 w-3.5"
            style={{
              left: p.x,
              top: p.y,
              // @ts-expect-error custom property
              "--drift": `${p.drift}px`,
              background:
                p.hue > 0.5
                  ? "color-mix(in oklab, var(--color-primary) 45%, white)"
                  : "color-mix(in oklab, var(--color-sage) 55%, white)",
              borderRadius: "70% 30% 65% 35% / 60% 60% 40% 40%",
              animation: `petal-fall ${1.9 + p.hue}s cubic-bezier(.3,.6,.4,1) forwards`,
              willChange: "transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
}
