import { useEffect, useMemo, useRef, useState } from "react";

function useCountdown(iso: string) {
  const target = useMemo(() => new Date(iso).getTime(), [iso]);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function FlipCell({ value, label }: { value: number; label: string }) {
  const text = String(value).padStart(2, "0");
  const prev = useRef(text);
  const [flipKey, setFlipKey] = useState(0);

  useEffect(() => {
    if (prev.current !== text) {
      prev.current = text;
      setFlipKey((k) => k + 1);
    }
  }, [text]);

  return (
    <div className="flex flex-1 flex-col items-center gap-2">
      <div
        className="relative w-full overflow-hidden card-soft px-1 py-3"
        style={{ perspective: "320px" }}
      >
        <span
          key={flipKey}
          className="block origin-top text-center font-display text-[1.9rem] leading-none text-foreground"
          style={{ animation: "flip-in 520ms cubic-bezier(.22,1,.36,1)" }}
        >
          {text}
        </span>
        <span className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-primary/25" />
      </div>
      <span className="text-[0.55rem] uppercase tracking-airy text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

export function Countdown({ iso }: { iso: string }) {
  const t = useCountdown(iso);
  return (
    <div className="flex items-start gap-2">
      <FlipCell value={t.days} label="Days" />
      <FlipCell value={t.hours} label="Hrs" />
      <FlipCell value={t.minutes} label="Min" />
      <FlipCell value={t.seconds} label="Sec" />
    </div>
  );
}
