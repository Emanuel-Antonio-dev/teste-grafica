import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "motion/react";
import { Mail, MapPin, Phone, Clock, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "./SectionHeader";
import { siteConfig } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Indique o seu nome").max(80),
  email: z.string().trim().email("Email inválido").max(120),
  company: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Descreva o seu projeto").max(1000),
});

type FormValues = z.infer<typeof schema>;

const MESSAGE_MAX = 1000;

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const messageLength = watch("message")?.length ?? 0;

  const onSubmit = async (_values: FormValues) => {
    setStatus("idle");
    try {
      await new Promise((resolve, reject) => setTimeout(() => (Math.random() > 1 ? reject() : resolve(true)), 700));
      setStatus("sent");
      reset();
      setTimeout(() => setStatus("idle"), 4000);
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contacto" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Contacto"
          title="Vamos dar cor ao seu próximo projeto"
          description="Envie-nos os detalhes e recebe uma proposta em menos de 24 horas úteis."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <h3 className="text-lg font-semibold text-foreground">Falar diretamente</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Prefere contacto direto? Estamos disponíveis nos dias úteis das 9h às 19h.
              </p>
              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Morada</p>
                    <p className="text-muted-foreground">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Telefone</p>
                    <a className="text-muted-foreground hover:text-foreground" href={`tel:${siteConfig.phone}`}>
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a className="text-muted-foreground hover:text-foreground" href={`mailto:${siteConfig.email}`}>
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Clock className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Horário</p>
                    <p className="text-muted-foreground">Dias úteis, 9h–19h</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-3xl border border-border bg-card p-8 shadow-soft lg:col-span-3"
            noValidate
          >
            {/* feedback de estado — anunciado para leitores de tela */}
            <div aria-live="polite" className="mb-2">
              <AnimatePresence mode="wait">
                {status === "sent" && (
                  <motion.div
                    key="sent"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-4 flex items-center gap-2 rounded-lg border border-primary/20 bg-primary/10 px-4 py-3 text-sm text-primary"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    Mensagem enviada. Entraremos em contacto em breve.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mb-4 flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                  >
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    Não foi possível enviar. Tente novamente ou use o email ao lado.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">
                  Nome <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  {...register("name")}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1 text-xs text-destructive">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <Input id="company" autoComplete="organization" {...register("company")} />
              </div>
              <div className="sm:col-span-2">
                <div className="flex items-baseline justify-between">
                  <Label htmlFor="message">
                    Descreva o seu projeto <span className="text-destructive">*</span>
                  </Label>
                  <span className="text-xs text-muted-foreground">
                    {messageLength}/{MESSAGE_MAX}
                  </span>
                </div>
                <Textarea
                  id="message"
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  placeholder="Tipo de material, quantidades, prazos e acabamentos desejados."
                  {...register("message")}
                />
                {errors.message && (
                  <p id="message-error" className="mt-1 text-xs text-destructive">
                    {errors.message.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                Ao enviar aceita a nossa política de privacidade.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting || status === "sent"} className="gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> A enviar...
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Enviado
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Enviar pedido
                  </>
                )}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}