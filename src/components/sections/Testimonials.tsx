import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";
import { testimonials } from "@/data/site";
import { SectionHeader } from "./SectionHeader";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => clearInterval(id);
  }, []);

  const current = testimonials[index];

  return (
    <section id="depoimentos" className="bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Depoimentos"
          title="Clientes que voltam sempre"
          description="Relações duradouras construídas com rigor, escuta e execução impecável."
        />

        <div className="relative mt-14 min-h-[260px] overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <Quote className="h-8 w-8 text-primary/40" aria-hidden />
          <div className="relative mt-4 h-full">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <blockquote className="text-xl leading-relaxed text-foreground sm:text-2xl">
                  “{current.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="text-sm font-semibold text-foreground">{current.name}</p>
                  <p className="text-sm text-muted-foreground">{current.role}</p>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Ver depoimento ${i + 1}`}
              onClick={() => setIndex(i)}
              className={
                "h-1.5 rounded-full transition-all " +
                (i === index ? "w-8 bg-primary" : "w-4 bg-border")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
