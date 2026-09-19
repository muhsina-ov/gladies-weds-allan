import { useRef, useState } from "react";
import { couple } from "@/lib/wedding";
const lantern = "https://media.invitestory.in/seashell-vows/src/assets/watercolor-lantern.png";
const lanterns = "https://media.invitestory.in/seashell-vows/src/assets/lantern-constellation.png";

type ReleasedLantern = {
  id: number;
  x: number;
  drift: number;
  tilt: number;
  scale: number;
  duration: number;
  delay: number;
  blur: number;
  opacity: number;
  depth: "far" | "middle" | "near";
};

export function WishLantern() {
  const [released, setReleased] = useState<ReleasedLantern[]>([]);
  const [message, setMessage] = useState("Tap to fill the sky with lanterns.");
  const id = useRef(0);

  function releaseLanterns() {
    const batch: ReleasedLantern[] = Array.from({ length: 22 }, (_, index) => {
      const depth = index < 8 ? "far" : index < 17 ? "middle" : "near";
      const depthScale = depth === "far" ? 0.3 : depth === "middle" ? 0.58 : 0.92;
      return {
        id: id.current++,
        x: 5 + Math.random() * 90,
        drift: -90 + Math.random() * 180,
        tilt: -8 + Math.random() * 16,
        scale: depthScale * (0.78 + Math.random() * 0.42),
        duration: depth === "far" ? 7.4 : depth === "middle" ? 6.3 : 5.3,
        delay: Math.random() * 1.4,
        blur: depth === "far" ? 1.4 : depth === "middle" ? 0.45 : 0,
        opacity: depth === "far" ? 0.54 : depth === "middle" ? 0.78 : 1,
        depth,
      };
    });
    setReleased((current) => [...current.slice(-44), ...batch]);
    setMessage(`The sky is glowing for ${couple.groom} and ${couple.bride}.`);
    window.setTimeout(() => {
      const batchIds = new Set(batch.map((entry) => entry.id));
      setReleased((current) => current.filter((entry) => !batchIds.has(entry.id)));
    }, 9000);
  }

  return (
    <section className="wish-sky relative isolate overflow-hidden px-6 py-20 text-center">
      <img
        src={lanterns}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1536}
        className="pointer-events-none absolute -right-28 -top-24 -z-10 h-[115%] w-auto opacity-45"
      />

      {released.map((entry) => (
        <img
          key={entry.id}
          src={lantern}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1536}
          className={`wish-lantern-flight pointer-events-none absolute bottom-[-13rem] w-24 ${
            entry.depth === "near" ? "z-20" : entry.depth === "middle" ? "z-10" : "z-0"
          }`}
          style={
            {
              left: `${entry.x}%`,
              opacity: entry.opacity,
              filter: `blur(${entry.blur}px) drop-shadow(0 12px 18px oklch(0.62 0.09 72 / 0.22))`,
              "--wish-tilt": `${entry.tilt}deg`,
              "--wish-drift": `${entry.drift}px`,
              "--wish-scale": entry.scale,
              "--wish-duration": `${entry.duration}s`,
              "--wish-delay": `${entry.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      <div className="mx-auto max-w-sm">
        <img
          src={lantern}
          alt="Watercolor paper lantern glowing warmly"
          loading="lazy"
          width={1024}
          height={1536}
          className="lantern-breathe mx-auto w-28 object-contain"
        />
        <h2 className="mt-2 font-display text-[2.35rem] leading-tight">Send them a wish</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Release a sky full of light for their new beginning.
        </p>
        <button
          type="button"
          onClick={releaseLanterns}
          className="press mt-7 flex min-h-[50px] w-full items-center justify-center rounded-sm bg-primary px-5 text-[0.68rem] uppercase tracking-[0.22em] text-primary-foreground shadow-[0_14px_30px_-18px_rgba(112,82,42,0.75)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Release lanterns
        </button>
        <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground">
          {message}
        </p>
      </div>
    </section>
  );
}
