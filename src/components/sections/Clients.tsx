import { clients } from "@/data/site";

export function Clients() {
  const doubled = [...clients, ...clients];
  return (
    <section aria-label="Clientes" className="border-y border-border bg-background-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Marcas que confiam na Prisma
        </p>
        <div className="relative mt-8 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background-muted to-transparent"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background-muted to-transparent"
          />
          <div className="marquee flex w-max gap-16">
            {doubled.map((c, i) => (
              <span
                key={`${c}-${i}`}
                className="whitespace-nowrap text-lg font-semibold tracking-[0.2em] text-muted-foreground/70"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
