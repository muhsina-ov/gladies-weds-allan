import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/wedding/Hero";
import { Countdown } from "@/components/wedding/Countdown";
import { Reveal } from "@/components/wedding/Section";
import { SectionTitle } from "@/components/wedding/Ornaments";
import { WishLantern } from "@/components/wedding/WishLantern";
import { WeddingFooter } from "@/components/wedding/WeddingFooter";
import { InvitationOpener } from "@/components/wedding/InvitationOpener";
import { MusicPlayer } from "@/components/wedding/MusicPlayer";
import { couple, events, venue, downloadICS } from "@/lib/wedding";
import { useParallax } from "@/hooks/use-reveal";
const floral = "https://media.invitestory.in/seashell-vows/src/assets/floral-spray.png";
import mapImg from "@/assets/venue-map.jpg";
const ringsVignette = "https://media.invitestory.in/seashell-vows/src/assets/rings-seashell-vignette.png";
const floralDivider = "https://media.invitestory.in/seashell-vows/src/assets/bougainvillea-divider.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Allan Joseph Bright & Gladies — Wedding Invitation" },
      {
        name: "description",
        content:
          "Together with our families, we joyfully invite you to celebrate the wedding of Allan Joseph Bright & Gladies on Wednesday, 4 November 2026 at CSI LITE Auditorium, Kilpauk, Chennai.",
      },
      { property: "og:site_name", content: "Allan & Gladies Wedding" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gladies-weds-allan.invitingyou.top/" },
      { property: "og:title", content: "Allan Joseph Bright & Gladies — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Together with our families, we joyfully invite you to celebrate the wedding of Allan Joseph Bright & Gladies on Wednesday, 4 November 2026 at CSI LITE Auditorium, Kilpauk, Chennai.",
      },
      { property: "og:image", content: "https://gladies-weds-allan.invitingyou.top/og-card.jpg" },
      { property: "og:image:url", content: "https://gladies-weds-allan.invitingyou.top/og-card.jpg" },
      { property: "og:image:secure_url", content: "https://gladies-weds-allan.invitingyou.top/og-card.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Wedding Invitation of Allan Joseph Bright & Gladies — 4 November 2026" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://gladies-weds-allan.invitingyou.top/" },
      { name: "twitter:title", content: "Allan Joseph Bright & Gladies — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Together with our families, we joyfully invite you to celebrate the wedding of Allan Joseph Bright & Gladies on Wednesday, 4 November 2026 at CSI LITE Auditorium, Kilpauk, Chennai.",
      },
      { name: "twitter:image", content: "https://gladies-weds-allan.invitingyou.top/og-card.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://gladies-weds-allan.invitingyou.top/" },
      { rel: "image_src", href: "https://gladies-weds-allan.invitingyou.top/og-card.jpg" },
    ],
  }),
  component: Invitation,
});

function Invitation() {
  const drift = useParallax(0.18);

  return (
    <main className="paper overflow-x-hidden">
      <InvitationOpener />
      <MusicPlayer />
      <Hero />

      {/* Countdown */}
      <section className="px-6 py-14">
        <Reveal>
          <p className="text-center text-[0.62rem] uppercase tracking-airy text-muted-foreground">
            Counting down to the vows
          </p>
          <div className="mt-6">
            <Countdown iso={couple.weddingISO} />
          </div>
        </Reveal>
      </section>

      {/* Story */}
      <section className="relative px-7 pb-16">
        <img
          src={floral}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={1024}
          height={1024}
          className="pointer-events-none absolute -right-16 -top-6 w-40 opacity-40"
          style={{ transform: `translate3d(0, ${-drift * 0.4}px, 0)` }}
        />
        <Reveal>
          <SectionTitle overline="Our invitation" title="Joined in Love & Faith" />
          <p className="text-center font-display text-[1.18rem] leading-[1.85] text-foreground/90">
            Together with our families, we joyfully invite you to celebrate our wedding day.
            We request the honour of your presence and your heartfelt blessings and prayers as we
            exchange our vows and unite our lives before God and loved ones.
          </p>
          <p className="mt-6 script text-center text-lg text-primary">{couple.tagline}</p>
          <img
            src={ringsVignette}
            alt="Watercolor wedding rings, jasmine and a seashell"
            loading="lazy"
            width={1536}
            height={1024}
            className="mx-auto mt-7 w-60 object-contain"
          />
        </Reveal>
      </section>

      {/* Events */}
      <section className="relative px-6 pb-16">
        <img
          src={floralDivider}
          alt=""
          aria-hidden="true"
          loading="lazy"
          width={2172}
          height={724}
          className="pointer-events-none mx-auto mb-8 w-full max-w-md opacity-80"
        />
        <Reveal>
          <SectionTitle overline="A day of joy" title="Celebrations" />
        </Reveal>
        <ul className="space-y-4">
          {events.map((ev, i) => (
            <li key={ev.name}>
              <Reveal delay={i * 60}>
                <article className="card-soft press p-5">
                  <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-primary/30 text-primary">
                      {ev.glyph}
                    </span>
                    <div className="min-w-0">
                      <h3 className="truncate font-display text-2xl">{ev.name}</h3>
                      <p className="text-[0.62rem] uppercase tracking-airy text-muted-foreground">
                        {ev.date} · {ev.time}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-foreground/80">{ev.venue}</p>
                  <p className="mt-1 text-xs italic text-muted-foreground">{ev.note}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <Reveal>
        <WishLantern />
      </Reveal>

      {/* Venue */}
      <section className="px-6 pb-16">
        <Reveal>
          <SectionTitle overline="Find your way" title="The venue" />
          <div className="card-soft overflow-hidden">
            <img
              src={mapImg}
              alt={`Illustrated map of ${venue.name}`}
              loading="lazy"
              width={1024}
              height={768}
              className="h-44 w-full object-cover"
            />
            <div className="p-5">
              <h3 className="font-display text-2xl">{venue.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{venue.address}</p>
              <a
                href={venue.mapsUrl}
                target="_blank"
                rel="noreferrer"
                className="press mt-5 flex min-h-[48px] items-center justify-center rounded-sm bg-primary px-5 text-[0.68rem] uppercase tracking-airy text-primary-foreground"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Calendar CTA in the thumb zone */}
      <section className="px-6 pb-20">
        <Reveal>
          <div className="card-soft p-6 text-center">
            <p className="script text-lg text-primary">Save our date</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Add every ceremony to your calendar in one tap.
            </p>
            <button
              type="button"
              onClick={downloadICS}
              className="press mt-5 flex min-h-[52px] w-full items-center justify-center rounded-sm border border-primary/45 bg-secondary text-[0.68rem] uppercase tracking-airy text-foreground"
            >
              Add to Calendar
            </button>
          </div>
        </Reveal>
      </section>

      <WeddingFooter />
    </main>
  );
}
