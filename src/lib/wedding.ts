export const couple = {
  bride: "Gladies",
  groom: "Allan Joseph Bright",
  tagline: "Two souls, one promise",
  dateLabel: "Wednesday, 4 November 2026",
  weddingISO: "2026-11-04T15:00:00+05:30",
};

export type WeddingEvent = {
  name: string;
  glyph: string;
  date: string;
  time: string;
  venue: string;
  note: string;
};

export const events: WeddingEvent[] = [
  {
    name: "Wedding Ceremony",
    glyph: "✝",
    date: "4 Nov 2026",
    time: "3:00 PM",
    venue: "CSI LITE Auditorium",
    note: "Solemnisation of Holy Matrimony & blessings.",
  },
  {
    name: "Wedding Reception",
    glyph: "❖",
    date: "4 Nov 2026",
    time: "6:00 PM",
    venue: "CSI LITE Auditorium",
    note: "Celebration, dinner & fellowship.",
  },
];

export const venue = {
  name: "CSI LITE Auditorium",
  address: "Balfour Road, Kellys, Kilpauk, Chennai, Tamil Nadu 600010",
  mapsUrl: "https://share.google/jyy1wDp3nfLw0RrRC",
};

function icsStamp(d: Date) {
  return `${d.toISOString().replace(/[-:]/g, "").slice(0, 15)}Z`;
}

export function buildICS() {
  const lines = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Allan & Gladies//Wedding//EN"];
  const starts: Record<string, string> = {
    "Wedding Ceremony": "2026-11-04T15:00:00+05:30",
    "Wedding Reception": "2026-11-04T18:00:00+05:30",
  };
  for (const ev of events) {
    const start = new Date(starts[ev.name] ?? couple.weddingISO);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${ev.name.toLowerCase().replace(/\s+/g, "-")}-allan-gladies@wedding`,
      `DTSTAMP:${icsStamp(new Date())}`,
      `DTSTART:${icsStamp(start)}`,
      `DTEND:${icsStamp(end)}`,
      `SUMMARY:${ev.name} | ${couple.groom} & ${couple.bride}`,
      `LOCATION:${ev.venue}`,
      `DESCRIPTION:${ev.note}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.join("\r\n");
}

export function downloadICS() {
  const blob = new Blob([buildICS()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "allan-gladies-wedding.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

