import { useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, Info, Clock, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SectionHeader } from "./SectionHeader";
import { Textarea } from "@/components/ui/textarea";

// --- Tipos existentes ---
type Formato = "reto" | "arredondado";
type AcabamentoBase = "fosco" | "brilho" | "kraft";
type Extra = "verniz" | "relevo" | "dourado" | "prateado";
type Cor = "brand" | "highlight" | "carvao";
type Quantidade = 250 | 500 | 1000 | 2500;

// --- NOVOS TIPOS ---
type Tamanho = "padrao" | "grande" | "mini";
type Papel = "couche_brilho" | "couche_mate" | "reciclado" | "kraft_papel" | "texturizado";
type Impressao = "frente" | "verso" | "frente_verso";
type Laminacao = "sem" | "fosca" | "brilhante";
type Prazo = "normal" | "expresso" | "urgente";

const CORES: Record<Cor, { label: string; swatch: string }> = {
  brand: { label: "Marca", swatch: "var(--brand)" },
  highlight: { label: "Destaque", swatch: "var(--highlight)" },
  carvao: { label: "Carvão", swatch: "oklch(0.25 0.02 264)" },
};

const EXTRAS_INFO: Record<Extra, { label: string; desc: string }> = {
  verniz: { label: "Verniz UV localizado", desc: "Brilho seletivo sobre o logótipo" },
  relevo: { label: "Relevo a seco", desc: "Textura em baixo-relevo no papel" },
  dourado: { label: "Hot stamping dourado", desc: "Folha metálica a quente" },
  prateado: { label: "Hot stamping prateado", desc: "Folha metálica a quente" },
};

const QUANTIDADES: Quantidade[] = [250, 500, 1000, 2500];

const TAMANHOS: Record<Tamanho, { label: string; dimensao: string }> = {
  padrao: { label: "Padrão", dimensao: "90×50mm" },
  grande: { label: "Grande", dimensao: "100×70mm" },
  mini: { label: "Mini", dimensao: "55×45mm" },
};

const PAPEIS: Record<Papel, { label: string; desc: string; texture: string }> = {
  couche_brilho: { label: "Couché brilhante", desc: "Brilho intenso e cores vibrantes", texture: "bg-gradient-to-br from-white/90 to-white/40" },
  couche_mate: { label: "Couché mate", desc: "Acabamento suave e elegante", texture: "bg-gradient-to-br from-gray-100 to-gray-300" },
  reciclado: { label: "Reciclado", desc: "Papel ecológico com textura natural", texture: "bg-gradient-to-br from-amber-100 to-amber-300" },
  kraft_papel: { label: "Kraft", desc: "Aspecto rústico e artesanal", texture: "bg-gradient-to-br from-yellow-800 to-yellow-600" },
  texturizado: { label: "Texturizado", desc: "Toque tátil e exclusivo", texture: "bg-gradient-to-br from-gray-200 to-gray-400" },
};

const IMPRESSAO_LABELS: Record<Impressao, string> = {
  frente: "Frente",
  verso: "Verso",
  frente_verso: "Frente e verso",
};

const PRAZOS: Record<Prazo, { label: string; desc: string }> = {
  normal: { label: "Normal", desc: "5–7 dias úteis" },
  expresso: { label: "Expresso", desc: "48 horas" },
  urgente: { label: "Urgente", desc: "24 horas (sob consulta)" },
};

// --- Componente PillGroup (melhorado) ---
function PillGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
  renderLabel,
  renderExtra,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  renderLabel: (v: T) => string;
  renderExtra?: (v: T) => React.ReactNode;
}) {
  return (
    <div>
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div role="radiogroup" aria-label={label} className="mt-2 flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={String(opt)}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => onChange(opt)}
              className={
                "rounded-full border px-4 py-1.5 text-sm font-medium transition-all " +
                (active
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground")
              }
            >
              {renderLabel(opt)}
              {renderExtra && renderExtra(opt)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// --- Componente do mockup (melhorado) ---
function CardMockup({
  formato,
  acabamento,
  extras,
  cor,
  quantidade,
  tamanho,
  papel,
  impressao,
  laminacao,
  prazo,
}: {
  formato: Formato;
  acabamento: AcabamentoBase;
  extras: Set<Extra>;
  cor: Cor;
  quantidade: Quantidade;
  tamanho: Tamanho;
  papel: Papel;
  impressao: Impressao;
  laminacao: Laminacao;
  prazo: Prazo;
}) {
  const reduceMotion = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 18 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 18 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 12);
    rotateX.set(-py * 12);
  };
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const radius = formato === "arredondado" ? 22 : 8;
  const stackCount = { 250: 1, 500: 2, 1000: 3, 2500: 4 }[quantidade];
  const accent = CORES[cor].swatch;
  const papelTexture = PAPEIS[papel].texture;
  const bgColor = acabamento === "kraft" ? "oklch(0.62 0.05 70)" : "var(--card)";

  // Determinar se mostra impressão no verso
  const showBack = impressao === "verso" || impressao === "frente_verso";

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1000 }}
      className="relative mx-auto w-full max-w-sm"
    >
      {/* pilha atrás */}
      {Array.from({ length: stackCount - 1 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 border border-border"
          style={{
            borderRadius: radius,
            background: bgColor,
            transform: `translate(${(i + 1) * 4}px, ${(i + 1) * 4}px)`,
            zIndex: -1 - i,
            opacity: 1 - i * 0.18,
          }}
        />
      ))}

      <motion.div
        style={{
          borderRadius: radius,
          background: bgColor,
          rotateX: reduceMotion ? 0 : springX,
          rotateY: reduceMotion ? 0 : springY,
          transformStyle: "preserve-3d",
        }}
        className="relative h-full w-full overflow-hidden border border-border shadow-elegant"
      >
        {/* Textura do papel */}
        <div className={`absolute inset-0 ${papelTexture} opacity-30`} />

        {/* Acabamento fosco */}
        {acabamento === "fosco" && (
          <div
            className="pointer-events-none absolute inset-0 opacity-40 mix-blend-multiply"
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.06) 1px, transparent 0)",
              backgroundSize: "4px 4px",
            }}
          />
        )}

        {/* Acabamento brilho */}
        {acabamento === "brilho" && (
          <motion.div
            className="pointer-events-none absolute inset-y-0 w-1/3 opacity-40 mix-blend-overlay"
            style={{ background: "linear-gradient(115deg, transparent, white, transparent)" }}
            animate={reduceMotion ? undefined : { x: ["-120%", "220%"] }}
            transition={reduceMotion ? undefined : { duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          />
        )}

        {/* Laminação */}
        {laminacao !== "sem" && (
          <div
            className={`pointer-events-none absolute inset-0 ${laminacao === "brilhante" ? "opacity-20" : "opacity-10"}`}
            style={{
              background: laminacao === "brilhante"
                ? "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)"
                : "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.05) 100%)",
            }}
          />
        )}

        {/* Verniz UV */}
        {extras.has("verniz") && (
          <div
            className="pointer-events-none absolute left-6 top-6 h-10 w-24 rounded-full opacity-50 mix-blend-overlay"
            style={{ background: "radial-gradient(ellipse, white, transparent 70%)" }}
          />
        )}

        {/* Hot stamping */}
        {(extras.has("dourado") || extras.has("prateado")) && (
          <motion.div
            className="absolute right-5 top-5 h-8 w-8 rounded-full"
            style={{
              backgroundImage: extras.has("dourado")
                ? "linear-gradient(135deg, #f6e7a1, #b8860b, #f6e7a1)"
                : "linear-gradient(135deg, #ececec, #9a9a9a, #ececec)",
              backgroundSize: "200% 200%",
            }}
            animate={reduceMotion ? undefined : { backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"] }}
            transition={reduceMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* Conteúdo */}
        <div className="relative flex h-full flex-col justify-between p-6">
          <div>
            <p
              className="text-lg font-semibold"
              style={{
                color: acabamento === "kraft" ? "oklch(0.25 0.03 70)" : "var(--foreground)",
                textShadow: extras.has("relevo")
                  ? "0 1px 0 rgba(255,255,255,0.6), 0 -1px 0 rgba(0,0,0,0.15)"
                  : undefined,
              }}
            >
              Prisma Studio
            </p>
            <div className="mt-1.5 h-[3px] w-10 rounded-full" style={{ background: accent }} />
          </div>
          <div>
            <p
              className="text-xs"
              style={{ color: acabamento === "kraft" ? "oklch(0.35 0.03 70)" : "var(--muted-foreground)" }}
            >
              Ana Ferreira — Direção Criativa
            </p>
            <p
              className="text-xs"
              style={{ color: acabamento === "kraft" ? "oklch(0.35 0.03 70)" : "var(--muted-foreground)" }}
            >
              ana@prisma.pt
            </p>
            {showBack && (
              <div className="mt-2 text-[10px] uppercase tracking-wider opacity-60">
                {impressao === "frente_verso" ? "✦ Frente e verso" : "✦ Verso"}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Badge de tamanho */}
      <div className="absolute -bottom-2 -right-2 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground shadow-md">
        {TAMANHOS[tamanho].dimensao}
      </div>
    </div>
  );
}

// --- Componente principal ---
export function Customizer() {
  // Estado existente
  const [formato, setFormato] = useState<Formato>("arredondado");
  const [acabamento, setAcabamento] = useState<AcabamentoBase>("fosco");
  const [extras, setExtras] = useState<Set<Extra>>(new Set());
  const [cor, setCor] = useState<Cor>("brand");
  const [quantidade, setQuantidade] = useState<Quantidade>(500);

  // NOVO ESTADO
  const [tamanho, setTamanho] = useState<Tamanho>("padrao");
  const [papel, setPapel] = useState<Papel>("couche_mate");
  const [impressao, setImpressao] = useState<Impressao>("frente");
  const [laminacao, setLaminacao] = useState<Laminacao>("sem");
  const [prazo, setPrazo] = useState<Prazo>("normal");
  const [observacoes, setObservacoes] = useState("");

  const toggleExtra = (extra: Extra) => {
    setExtras((prev) => {
      const next = new Set(prev);
      if (next.has(extra)) {
        next.delete(extra);
      } else {
        if (extra === "dourado") next.delete("prateado");
        if (extra === "prateado") next.delete("dourado");
        next.add(extra);
      }
      return next;
    });
  };

  // Resumo melhorado
  const resumo = useMemo(() => {
    const items = [
      TAMANHOS[tamanho].dimensao,
      PAPEIS[papel].label,
      formato === "arredondado" ? "Cantos arredondados" : "Cantos retos",
      { fosco: "Fosco", brilho: "Brilho", kraft: "Kraft" }[acabamento],
      IMPRESSAO_LABELS[impressao],
      laminacao !== "sem" ? `Laminação ${laminacao}` : "Sem laminação",
      ...Array.from(extras).map((e) => EXTRAS_INFO[e].label),
      `${quantidade} un.`,
      PRAZOS[prazo].label,
    ];
    return items;
  }, [tamanho, papel, formato, acabamento, impressao, laminacao, extras, quantidade, prazo]);

  return (
    <section id="personalizar" className="bg-background-muted py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Personalização"
          title="Monte o seu cartão, veja o resultado ao vivo"
          description="Escolha o acabamento e veja o mockup reagir instantaneamente antes de pedir orçamento."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:col-span-2 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <CardMockup
                formato={formato}
                acabamento={acabamento}
                extras={extras}
                cor={cor}
                quantidade={quantidade}
                tamanho={tamanho}
                papel={papel}
                impressao={impressao}
                laminacao={laminacao}
                prazo={prazo}
              />

              <div className="mt-8 flex flex-wrap gap-2">
                {resumo.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border bg-background-muted px-3 py-1 text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <Button asChild size="lg" className="mt-6 w-full gap-2">
                <a href="#contacto">
                  Pedir orçamento com esta personalização
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            </div>
          </div>

          {/* Controlos */}
          <div className="space-y-6 lg:col-span-3">
            {/* Grupo 1: Opções base */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="space-y-6">
                <PillGroup
                  label="Formato"
                  options={["reto", "arredondado"] as Formato[]}
                  value={formato}
                  onChange={setFormato}
                  renderLabel={(v) => (v === "reto" ? "Cantos retos" : "Cantos arredondados")}
                />

                <PillGroup
                  label="Acabamento base"
                  options={["fosco", "brilho", "kraft"] as AcabamentoBase[]}
                  value={acabamento}
                  onChange={setAcabamento}
                  renderLabel={(v) => ({ fosco: "Fosco", brilho: "Brilho", kraft: "Kraft reciclado" }[v])}
                />

                <div>
                  <p className="text-sm font-medium text-foreground">Cor de destaque</p>
                  <div className="mt-2 flex gap-3">
                    {(Object.keys(CORES) as Cor[]).map((c) => (
                      <button
                        key={c}
                        type="button"
                        aria-label={CORES[c].label}
                        aria-pressed={cor === c}
                        onClick={() => setCor(c)}
                        className={
                          "h-8 w-8 rounded-full border-2 transition-transform " +
                          (cor === c ? "scale-110 border-foreground" : "border-transparent hover:scale-105")
                        }
                        style={{ backgroundColor: CORES[c].swatch }}
                      />
                    ))}
                  </div>
                </div>

                <PillGroup
                  label="Quantidade"
                  options={QUANTIDADES}
                  value={quantidade}
                  onChange={setQuantidade}
                  renderLabel={(v) => `${v} un.`}
                />
              </div>
            </div>

            {/* Grupo 2: Novas opções */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <div className="space-y-6">
                <PillGroup
                  label="Tamanho"
                  options={["padrao", "grande", "mini"] as Tamanho[]}
                  value={tamanho}
                  onChange={setTamanho}
                  renderLabel={(v) => TAMANHOS[v].label}
                  renderExtra={(v) => (
                    <span className="ml-1 text-[10px] text-muted-foreground">
                      ({TAMANHOS[v].dimensao})
                    </span>
                  )}
                />

                <PillGroup
                  label="Tipo de papel"
                  options={["couche_mate", "couche_brilho", "reciclado", "kraft_papel", "texturizado"] as Papel[]}
                  value={papel}
                  onChange={setPapel}
                  renderLabel={(v) => PAPEIS[v].label}
                  renderExtra={(v) => (
                    <span className="ml-1 text-[10px] text-muted-foreground">• {PAPEIS[v].desc.slice(0, 20)}</span>
                  )}
                />

                <PillGroup
                  label="Impressão"
                  options={["frente", "verso", "frente_verso"] as Impressao[]}
                  value={impressao}
                  onChange={setImpressao}
                  renderLabel={(v) => IMPRESSAO_LABELS[v]}
                />

                <PillGroup
                  label="Laminação"
                  options={["sem", "fosca", "brilhante"] as Laminacao[]}
                  value={laminacao}
                  onChange={setLaminacao}
                  renderLabel={(v) => ({ sem: "Sem laminação", fosca: "Laminação fosca", brilhante: "Laminação brilhante" }[v])}
                />

                <PillGroup
                  label="Prazo de entrega"
                  options={["normal", "expresso", "urgente"] as Prazo[]}
                  value={prazo}
                  onChange={setPrazo}
                  renderLabel={(v) => PRAZOS[v].label}
                  renderExtra={(v) => (
                    <span className="ml-1 text-[10px] text-muted-foreground">({PRAZOS[v].desc})</span>
                  )}
                />
              </div>
            </div>

            {/* Grupo 3: Extras */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <p className="text-sm font-medium text-foreground">Acabamentos extra</p>
              <div className="mt-3 space-y-3">
                {(Object.keys(EXTRAS_INFO) as Extra[]).map((extra) => {
                  const checked = extras.has(extra);
                  return (
                    <label
                      key={extra}
                      htmlFor={extra}
                      className={
                        "flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors " +
                        (checked ? "border-primary bg-primary/5" : "border-border hover:border-primary/30")
                      }
                    >
                      <Checkbox id={extra} checked={checked} onCheckedChange={() => toggleExtra(extra)} className="mt-0.5" />
                      <span>
                        <span className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                          {EXTRAS_INFO[extra].label}
                          {(extra === "dourado" || extra === "prateado") && (
                            <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden />
                          )}
                        </span>
                        <span className="text-xs text-muted-foreground">{EXTRAS_INFO[extra].desc}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Grupo 4: Observações */}
            <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
              <label htmlFor="observacoes" className="text-sm font-medium text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Observações ou pedidos especiais
              </label>
              <Textarea
                id="observacoes"
                placeholder="Ex: alterar a fonte do nome, incluir código QR, etc."
                value={observacoes}
                onChange={(e) => setObservacoes(e.target.value)}
                className="mt-2 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}