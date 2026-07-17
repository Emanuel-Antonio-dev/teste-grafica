import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Sparkles, Zap, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import heroImg from "@/assets/hero-print.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-28">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,color-mix(in_oklab,var(--brand)_15%,transparent),transparent)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-12 lg:px-8">
        <div>
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={0}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-highlight" />
            Impressão premium em Portugal desde 2007
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="mt-6 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Impressão premium com{" "}
            <span className="text-gradient-brand">precisão de estúdio</span>.
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={2}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Cartões, embalagens, catálogos e sinalética produzidos com fidelidade de cor
            absoluta, acabamentos de luxo e prazos que respeitamos ao dia.
          </motion.p>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={3}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="gap-2">
              <a href="#contacto">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Falar por WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.dl
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={4}
            className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8 max-w-md"
          >
            {[
              { k: "18+", v: "Anos" },
              { k: "2.4k+", v: "Projetos" },
              { k: "48h", v: "Entrega expresso" },
            ].map((it) => (
              <div key={it.v}>
                <dt className="text-2xl font-semibold text-foreground">{it.k}</dt>
                <dd className="mt-1 text-xs text-muted-foreground">{it.v}</dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border shadow-elegant">
            <img
              src={heroImg}
              alt="Impressora offset e materiais impressos premium"
              width={1600}
              height={1200}
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 via-transparent to-transparent" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="absolute -left-4 top-10 hidden rounded-2xl border border-border bg-card/90 p-4 shadow-soft backdrop-blur sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Entrega expresso</p>
                <p className="text-sm font-semibold text-foreground">48 horas</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, y: -20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.7, duration: 0.7 }}
            className="absolute -right-4 bottom-10 hidden rounded-2xl border border-border bg-card/90 p-4 shadow-soft backdrop-blur sm:block"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-brand text-brand-foreground">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Fidelidade de cor</p>
                <p className="text-sm font-semibold text-foreground">Fluxo ICC calibrado</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
