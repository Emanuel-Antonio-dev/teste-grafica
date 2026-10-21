import { motion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";

export function CTA() {
  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl gradient-brand p-10 shadow-elegant sm:p-16"
      >
        <div
          aria-hidden
          className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-3xl"
        />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-brand-foreground sm:text-4xl">
              Pronto para levantar o padrão dos seus materiais impressos?
            </h2>
            <p className="mt-4 max-w-2xl text-brand-foreground/85">
              Fale connosco hoje. Recebe uma proposta detalhada e uma prova
              gratuita em menos de 24 horas úteis.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <a href="#contacto">
                Solicitar orçamento
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-white/40 bg-transparent text-brand-foreground hover:bg-white/10 hover:text-brand-foreground"
            >
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
