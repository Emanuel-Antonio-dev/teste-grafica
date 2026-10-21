import { motion } from "motion/react";
import { processSteps } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function Process() {
  return (
    <section id="processo" className="bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Processo"
          title="Um método simples, do briefing à entrega"
          description="Cinco etapas transparentes para garantir que cada projeto sai à primeira e no prazo combinado."
        />

        <div className="relative mt-16">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-9 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          <ol className="grid gap-8 lg:grid-cols-5">
            {processSteps.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative"
              >
                <div className="flex items-center justify-center">
                  <span className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card text-sm font-semibold text-primary shadow-soft">
                    {step.step}
                  </span>
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
