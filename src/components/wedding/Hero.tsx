const heroArch = "https://media.invitestory.in/seashell-vows/src/assets/hero-arch.jpg";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
const coupleImg = "https://media.invitestory.in/seashell-vows/src/assets/couple-walking.png";
import { PetalTap } from "./PetalTap";
import { useParallax } from "@/hooks/use-reveal";
import { couple } from "@/lib/wedding";

export function Hero() {
  const bg = useParallax(0.35);
  const fg = useParallax(0.12);

  return (
    <PetalTap>
      <header className="relative min-h-[100svh] overflow-hidden paper">
        <div
          className="absolute inset-x-0 top-0 h-[78svh]"
          style={{ transform: `translate3d(0, ${bg}px, 0)`, willChange: "transform" }}
        >
          <img
            src={heroArch}
            alt="Watercolor beach wedding arch at sunset"
            width={1024}
            height={1536}
            className="h-full w-full object-cover object-top animate-bloom"
          />
          <div className="absolute inset-0" style={{ background: "var(--gradient-veil)" }} />
        </div>

        <img
          src={floral}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -left-10 top-6 w-36 opacity-70 animate-float-soft"
          style={{ transform: `translate3d(0, ${bg * 0.5}px, 0)` }}
        />
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-12 top-24 w-32 -scale-x-100 opacity-60 animate-float-soft"
          style={{ animationDelay: "1.4s", transform: `translate3d(0, ${bg * 0.35}px, 0)` }}
        />

        <img
          src={coupleImg}
          alt="Bride and groom walking hand in hand"
          width={1024}
          height={1536}
          className="pointer-events-none absolute bottom-[28%] left-1/2 w-[64%] max-w-[300px] -translate-x-1/2 object-contain animate-bloom drop-shadow-[0_18px_28px_rgba(92,80,68,0.18)]"
          style={{ transform: `translate3d(-50%, ${-fg * 0.6}px, 0)` }}
        />

        <div
          className="relative flex min-h-[100svh] flex-col items-center justify-end px-6 pb-14 text-center"
          style={{ transform: `translate3d(0, ${-fg}px, 0)` }}
        >
          <p className="script text-lg text-primary animate-ink" style={{ animationDelay: "0.4s" }}>
            Together with our families
          </p>
          <h1
            className="mt-3 font-display text-[3.15rem] leading-[1.02] text-foreground animate-ink"
            style={{ animationDelay: "0.7s" }}
          >
            {couple.groom}
            <span className="script mx-2 block text-2xl text-primary">&</span>
            {couple.bride}
          </h1>
          <p
            className="mt-5 text-[0.66rem] uppercase tracking-airy text-muted-foreground animate-ink"
            style={{ animationDelay: "1s" }}
          >
            {couple.dateLabel}
          </p>
          <p
            className="mt-2 text-[0.66rem] uppercase tracking-airy text-muted-foreground animate-ink"
            style={{ animationDelay: "1.15s" }}
          >
            CSI LITE Auditorium · Chennai
          </p>
        </div>
      </header>
    </PetalTap>
  );
}
