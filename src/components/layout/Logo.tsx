export function Logo({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-2 " + (className ?? "")}>
      <div
        aria-hidden
        className="relative flex h-8 w-8 items-center justify-center rounded-lg gradient-brand shadow-elegant"
      >
        <span className="text-sm font-bold text-brand-foreground">P</span>
      </div>
      <span className="text-base font-semibold tracking-tight text-foreground">
        Gráfica <span className="text-gradient-brand">Prisma</span>
      </span>
    </div>
  );
}
