import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
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

export function Contact() {
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (_values: FormValues) => {
    await new Promise((r) => setTimeout(r, 700));
    setSent(true);
    reset();
    setTimeout(() => setSent(false), 4000);
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
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Morada</p>
                    <p className="text-muted-foreground">{siteConfig.address}</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Telefone</p>
                    <a
                      className="text-muted-foreground hover:text-foreground"
                      href={`tel:${siteConfig.phone}`}
                    >
                      {siteConfig.phone}
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <a
                      className="text-muted-foreground hover:text-foreground"
                      href={`mailto:${siteConfig.email}`}
                    >
                      {siteConfig.email}
                    </a>
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
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="name">Nome</Label>
                <Input
                  id="name"
                  autoComplete="name"
                  aria-invalid={!!errors.name}
                  {...register("name")}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="company">Empresa (opcional)</Label>
                <Input id="company" autoComplete="organization" {...register("company")} />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="message">Descreva o seu projeto</Label>
                <Textarea
                  id="message"
                  rows={5}
                  aria-invalid={!!errors.message}
                  placeholder="Tipo de material, quantidades, prazos e acabamentos desejados."
                  {...register("message")}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                Ao enviar aceita a nossa política de privacidade.
              </p>
              <Button type="submit" size="lg" disabled={isSubmitting} className="gap-2">
                {sent ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" /> Mensagem enviada
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {isSubmitting ? "A enviar..." : "Enviar pedido"}
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
