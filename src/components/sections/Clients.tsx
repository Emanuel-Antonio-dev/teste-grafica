import { useReducedMotion } from "motion/react";
import { clients } from "@/data/site";

export function Clients() {
  const reduceMotion = useReducedMotion();
  const doubled = [...clients, ...clients];

  return (
    <section aria-label="Clientes" className="border-y border-border bg-background-muted py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Marcas que confiam na Prisma
        </p>

        {/* lista real para leitores de tela — o mural abaixo é decorativo */}
        <ul className="sr-only">
          {clients.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>

        <div className="group relative mt-8 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background-muted to-transparent sm:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background-muted to-transparent sm:w-28"
          />

          {reduceMotion ? (
            <div
              aria-hidden
              className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 sm:gap-x-14"
            >
              {clients.map((c) => (
                <span
                  key={c}
                  className="whitespace-nowrap text-lg font-semibold tracking-[0.2em] text-muted-foreground/70 transition-colors hover:text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          ) : (
            <div
              aria-hidden
              className="marquee flex w-max items-center gap-10 group-hover:[animation-play-state:paused] sm:gap-16"
            >
              {doubled.map((c, i) => (
                <span
                  key={`${c}-${i}`}
                  className="whitespace-nowrap text-lg font-semibold tracking-[0.2em] text-muted-foreground/70 transition-colors duration-300 hover:text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}