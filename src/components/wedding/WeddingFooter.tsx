import { useState } from "react";
import { couple } from "@/lib/wedding";
import { useParallax } from "@/hooks/use-reveal";
import footerWash from "@/assets/footer-wash.jpg";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
const lantern = "https://media.invitestory.in/seashell-vows/src/assets/watercolor-lantern.png";
const lanterns = "https://media.invitestory.in/seashell-vows/src/assets/lantern-constellation.png";

export function WeddingFooter() {
  const drift = useParallax(0.18);
  const [shareStatus, setShareStatus] = useState("Share this invitation");

  async function copyInvitation() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Invitation link copied");
    } catch {
      setShareStatus("Copy the link from your browser");
    }
  }

  return (
    <footer className="footer-scene relative isolate min-h-[38rem] overflow-hidden">
      <img
        src={footerWash}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1280}
        className="absolute inset-0 -z-30 h-full w-full object-cover"
        style={{ transform: `translate3d(0, ${-drift * 0.32}px, 0) scale(1.12)` }}
      />
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,var(--color-background)_0%,transparent_24%,color-mix(in_oklab,var(--color-background)_38%,transparent)_100%)]" />
      <img
        src={lanterns}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1536}
        className="pointer-events-none absolute -right-24 -top-32 -z-10 h-[110%] w-auto opacity-40"
      />
      <img
        src={lantern}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1536}
        className="lantern-breathe pointer-events-none absolute -left-10 top-24 -z-10 w-28 opacity-70"
      />

      <div className="mx-auto flex min-h-[38rem] max-w-lg flex-col items-center justify-end px-7 pb-10 pt-32 text-center">
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="w-24 opacity-75"
        />
        <p className="mt-4 script text-lg text-primary">We cannot wait to celebrate with you</p>
        <h2 className="mt-4 font-display text-[2.65rem] leading-[1.05]">
          {couple.groom} <span className="script text-2xl text-primary">&</span> {couple.bride}
        </h2>

        <div className="mt-7 grid w-full max-w-sm grid-cols-2 border-y border-primary/25 py-4 text-left">
          <div className="border-r border-primary/25 pr-5">
            <p className="text-xs text-muted-foreground">The wedding</p>
            <p className="mt-1 font-display text-lg">4 November 2026</p>
          </div>
          <div className="pl-5">
            <p className="text-xs text-muted-foreground">The place</p>
            <p className="mt-1 font-display text-lg">Kilpauk, Chennai</p>
          </div>
        </div>

        <button
          type="button"
          onClick={copyInvitation}
          className="press mt-7 min-h-[48px] rounded-sm border border-primary/45 bg-background/70 px-6 text-[0.66rem] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          Copy invitation link
        </button>
        <p aria-live="polite" className="mt-3 min-h-5 text-xs text-muted-foreground">
          {shareStatus}
        </p>

        <p className="mt-8 text-xs leading-relaxed text-foreground/70">
          With love, from our families to yours
        </p>

        <a
          href="https://www.instagram.com/invitestory.in/"
          target="_blank"
          rel="noreferrer"
          className="mt-6 text-[0.55rem] uppercase tracking-[0.18em] text-foreground/40 transition-colors hover:text-primary/70"
        >
          Follow @invitestory.in on Instagram
        </a>
      </div>
    </footer>
  );
}
