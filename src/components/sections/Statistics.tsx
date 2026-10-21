import { motion } from "motion/react";
import { stats, whyChoose } from "@/data/site";
import { useCountUp } from "@/hooks/useCountUp";
import { SectionHeader } from "./SectionHeader";

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, value: n } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        <span ref={ref}>{n}</span>
        <span className="text-gradient-brand">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function Statistics() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Porquê a AC PRINT"
          title="Rigor, cor e prazos que respeitamos"
          description="Investimos em maquinaria, calibração e processos para entregar qualidade previsível — sempre."
        />

        <div className="mt-14 grid grid-cols-2 gap-8 rounded-3xl border border-border bg-card p-10 shadow-soft lg:grid-cols-4">
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-highlight/15 text-highlight">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
