import { motion } from "motion/react";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Printer,
  Palette,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

// --- Variants ---
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const containerStagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemStagger = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

// --- Componente de linhas animadas (novo background) ---
function AnimatedLines() {
  const lines = [
    { color: "var(--brand)", opacity: 0.12, width: 120, height: 2, x: "0%", y: "15%", duration: 18, delay: 0 },
    { color: "var(--primary)", opacity: 0.08, width: 200, height: 1.5, x: "-10%", y: "35%", duration: 22, delay: 2 },
    { color: "var(--highlight)", opacity: 0.1, width: 160, height: 2.5, x: "5%", y: "55%", duration: 20, delay: 4 },
    { color: "var(--brand)", opacity: 0.07, width: 250, height: 1.5, x: "-20%", y: "75%", duration: 25, delay: 1 },
    { color: "var(--primary)", opacity: 0.09, width: 180, height: 2, x: "10%", y: "90%", duration: 19, delay: 3 },
    // Linhas adicionais com diferentes ângulos
    { color: "var(--highlight)", opacity: 0.06, width: 140, height: 3, x: "-5%", y: "45%", duration: 30, delay: 0, angle: 15 },
    { color: "var(--brand)", opacity: 0.05, width: 220, height: 2, x: "15%", y: "65%", duration: 28, delay: 2, angle: -10 },
  ];

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      {lines.map((line, index) => {
        // Transformações: rotação e posição
        const style: React.CSSProperties = {
          width: line.width,
          height: line.height,
          backgroundColor: line.color,
          opacity: line.opacity,
          position: "absolute",
          left: line.x,
          top: line.y,
          transform: `rotate(${line.angle || 0}deg)`,
          borderRadius: "9999px",
          filter: "blur(0.5px)",
        };

        // Movimento horizontal contínuo (ida e volta)
        const xMovement = line.x.includes("-") ? "30%" : "-30%";

        return (
          <motion.div
            key={index}
            style={style}
            animate={{
              x: [0, xMovement, 0],
            }}
            transition={{
              duration: line.duration,
              delay: line.delay,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

// --- Hero principal ---
export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-32 pb-20 sm:pt-40 lg:pt-48 lg:pb-28"
      aria-labelledby="hero-title"
    >
      {/* Gradiente de fundo */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center_top,color-mix(in_oklab,var(--brand)_20%,transparent)_0%,transparent_70%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent"
      />

      {/* Fundo com linhas animadas */}
      <AnimatedLines />

      {/* Conteúdo centralizado */}
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.h1
          id="hero-title"
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
          className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Transformamos as suas ideias em realidade com acabamentos de luxo,
          fidelidade de cor absoluta e prazos que cumprimos – do cartão de visita
          à grande formato.
        </motion.p>

        <motion.div
          variants={containerStagger}
          initial="hidden"
          animate="show"
          className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            { icon: Printer, label: "Offset digital", desc: "Tiragens curtas e longas" },
            { icon: Palette, label: "Acabamentos", desc: "Verniz, relevo, hot stamp" },
            { icon: CheckCircle, label: "Cor calibrada", desc: "Fluxo ICC profissional" },
            { icon: Clock, label: "Entrega rápida", desc: "48h em Lisboa/Porto" },
          ].map((item) => (
            <motion.div
              key={item.label}
              variants={itemStagger}
              className="flex flex-col items-center rounded-xl border border-border/40 bg-card/50 p-4 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-card/80"
            >
              <item.icon className="mb-2 h-6 w-6 text-primary" aria-hidden="true" />
              <h3 className="text-sm font-semibold text-foreground">{item.label}</h3>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.dl
          initial="hidden"
          animate="show"
          variants={fadeUp}
          custom={6}
          className="mt-10 grid grid-cols-3 gap-4 border-t border-border/40 pt-8 max-w-lg mx-auto"
        >
          {[
            { k: "18+", v: "Anos de experiência" },
            { k: "2.4k+", v: "Projetos entregues" },
            { k: "98%", v: "Clientes satisfeitos" },
          ].map((item) => (
            <div key={item.v}>
              <dt className="text-2xl font-semibold text-foreground">{item.k}</dt>
              <dd className="mt-1 text-xs text-muted-foreground">{item.v}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}