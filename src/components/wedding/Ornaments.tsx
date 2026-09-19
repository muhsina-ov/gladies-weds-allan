export function Divider({ label }: { label?: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-6 text-primary/70">
      <span className="h-px w-14 bg-gradient-to-r from-transparent to-primary/50" />
      <span className="text-[0.7rem] tracking-airy">{label ?? "❖"}</span>
      <span className="h-px w-14 bg-gradient-to-l from-transparent to-primary/50" />
    </div>
  );
}

export function SectionTitle({
  overline,
  title,
}: {
  overline: string;
  title: string;
}) {
  return (
    <div className="text-center">
      <p className="text-[0.62rem] uppercase tracking-airy text-muted-foreground">
        {overline}
      </p>
      <h2 className="mt-3 font-display text-[2rem] leading-tight text-foreground">
        {title}
      </h2>
      <Divider />
    </div>
  );
}
