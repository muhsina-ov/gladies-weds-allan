import { useEffect, useRef, useState } from "react";
const poster = "https://media.invitestory.in/seashell-vows/src/assets/opener-frames/lantern-reveal-first.png";

const SESSION_KEY = "everlasting-vows-opened";

export function InvitationOpener() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [visible, setVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const alreadyOpened = sessionStorage.getItem(SESSION_KEY) === "true";
    if (alreadyOpened) return;

    setVisible(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  async function openInvitation() {
    if (!videoRef.current || started) return;
    setStarted(true);
    window.dispatchEvent(new CustomEvent("start-wedding-bgm"));
    try {
      await videoRef.current.play();
    } catch {
      finishOpening();
    }
  }

  function finishOpening() {
    sessionStorage.setItem(SESSION_KEY, "true");
    window.setTimeout(() => setClosing(true), 180);
    window.setTimeout(() => {
      document.body.style.overflow = "";
      setVisible(false);
    }, 1900);
  }

  if (!visible) return null;

  return (
    <div
      className={`invitation-opener fixed inset-0 z-[100] bg-background ${closing ? "is-closing" : ""}`}
      role="dialog"
      aria-label="Open Allan and Gladies's wedding invitation"
    >
      <video
        ref={videoRef}
        src="https://media.invitestory.in/seashell-vows/media/wedding-opener.mp4"
        poster={poster}
        preload="auto"
        playsInline
        muted
        onEnded={finishOpening}
        className="h-full w-full object-cover [transform:translateZ(0)]"
      />
      {!started && (
        <button
          type="button"
          onClick={openInvitation}
          className="absolute inset-0 flex w-full flex-col items-center justify-end bg-[linear-gradient(180deg,transparent_42%,rgba(25,29,38,0.58)_100%)] px-6 pb-14 text-center text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/80"
        >
          <span className="script text-xl text-[#f4d8a1]">Allan & Gladies</span>
          <span className="mt-3 border-b border-white/60 pb-1 text-[0.68rem] uppercase tracking-[0.24em]">
            Tap to open
          </span>
        </button>
      )}
    </div>
  );
}
