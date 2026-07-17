import {
  Printer,
  Palette,
  Package,
  FileText,
  Layers,
  Sparkles,
  Truck,
  ShieldCheck,
  Clock,
  Award,
} from "lucide-react";

export const siteConfig = {
  name: "Gráfica Prisma",
  tagline: "Impressão premium com precisão de estúdio.",
  whatsapp: "https://wa.me/244923000000",      // Código +244 (Angola)
  phone: "+244 923 000 000",
  email: "orcamentos@graficaprisma.ao",         // Domínio .ao
  address: "Rua da Tipografia, 42 — Talatona, Luanda",
};

export const navLinks = [
  { href: "#servicos", label: "Serviços" },
  { href: "#processo", label: "Processo" },
  { href: "#portfolio", label: "Portefólio" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#faq", label: "FAQ" },
  { href: "#contacto", label: "Contacto" },
];

export const services = [
  {
    icon: Printer,
    title: "Impressão Offset",
    description:
      "Grandes tiragens com fidelidade de cor absoluta, ideal para catálogos, revistas e edições especiais.",
  },
  {
    icon: Layers,
    title: "Impressão Digital",
    description:
      "Tiragens curtas com entrega expressa e qualidade fotográfica em papéis premium.",
  },
  {
    icon: Package,
    title: "Embalagens Personalizadas",
    description:
      "Caixas, sacos e etiquetas com acabamentos de luxo — verniz UV, hot-stamping e relevos.",
  },
  {
    icon: FileText,
    title: "Cartões & Papelaria",
    description:
      "Cartões de visita, papel timbrado e envelopes com corte especial e papéis texturados.",
  },
  {
    icon: Palette,
    title: "Design Gráfico",
    description:
      "Identidade visual, artes finais e paginação por uma equipa criativa dedicada ao seu projeto.",
  },
  {
    icon: Sparkles,
    title: "Sinalética & Grande Formato",
    description:
      "Roll-ups, lonas, decoração de montras e wraps veiculares com produção in-house.",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Briefing",
    description: "Ouvimos o seu projeto e definimos objetivos, prazos e materiais ideais.",
  },
  {
    step: "02",
    title: "Orçamento",
    description: "Enviamos uma proposta detalhada em menos de 24 horas úteis.",
  },
  {
    step: "03",
    title: "Prova & Aprovação",
    description: "Recebe uma prova digital e, quando aplicável, prova de cor calibrada.",
  },
  {
    step: "04",
    title: "Produção",
    description: "Impressão em máquinas calibradas com controlo de qualidade em cada tiragem.",
  },
  {
    step: "05",
    title: "Entrega",
    description: "Logística cuidada e entrega em todo o país nos prazos combinados.",
  },
];

export const stats = [
  { value: 18, suffix: "+", label: "Anos de experiência" },
  { value: 2400, suffix: "+", label: "Projetos entregues" },
  { value: 98, suffix: "%", label: "Clientes satisfeitos" },
  { value: 24, suffix: "h", label: "Resposta a orçamentos" },
];

export const whyChoose = [
  {
    icon: Award,
    title: "Acabamentos premium",
    description: "Verniz UV, hot-stamping, relevos e cortes especiais executados internamente.",
  },
  {
    icon: Clock,
    title: "Prazos garantidos",
    description: "Planeamento rigoroso com entregas expresso disponíveis em 48 horas.",
  },
  {
    icon: ShieldCheck,
    title: "Fidelidade de cor",
    description: "Fluxo de trabalho ICC e provas calibradas para resultados previsíveis.",
  },
  {
    icon: Truck,
    title: "Entrega em todo o país",
    description: "Logística própria em Luanda, com envios diários para as províncias.",
  },
];

export const testimonials = [
  {
    name: "João Mendes",
    role: "Diretor Criativo, Estúdio Kwanza",
    quote:
      "A Prisma tornou-se uma extensão do nosso estúdio. A qualidade de impressão e o rigor de cor são simplesmente incomparáveis.",
  },
  {
    name: "Maria dos Santos",
    role: "Fundadora, Casa de Angola",
    quote:
      "Rótulos, caixas e catálogos — entregam sempre no prazo e com um acabamento que valoriza a marca.",
  },
  {
    name: "Nádia Ferreira",
    role: "Marketing Manager, Grupo Sol",
    quote:
      "Atendimento consultivo, propostas transparentes e execução impecável. Recomendo sem reservas.",
  },
  {
    name: "José Cambuta",
    role: "Sócio, Construtora Monte Belo",
    quote:
      "Trabalho consistente há mais de cinco anos. Nunca falharam um prazo — e a cor é sempre exata.",
  },
];

export const faqs = [
  {
    q: "Qual o prazo médio de produção?",
    a: "Para tiragens digitais standard entregamos em 48 horas. Trabalhos offset ou com acabamentos especiais entre 5 a 8 dias úteis.",
  },
  {
    q: "Aceitam quantidades pequenas?",
    a: "Sim. A impressão digital permite quantidades a partir de 25 unidades com o mesmo cuidado das grandes tiragens.",
  },
  {
    q: "Fazem também o design?",
    a: "Sim. A nossa equipa de design cria identidades visuais e paginação, ou ajusta as artes que nos enviar.",
  },
  {
    q: "Que ficheiros devo enviar?",
    a: "PDF/X-1a ou PDF/X-4 em CMYK com 3mm de sangria e imagens a 300 dpi. Podemos rever e adaptar os seus ficheiros.",
  },
  {
    q: "Fazem entregas fora de Luanda?",
    a: "Sim, entregamos para todo o território nacional angolano. Os portes são calculados no orçamento consoante a província e o volume da encomenda.",
  },
];

export const clients = [
  "KWANZA",
  "SUMOL",
  "LUBANGO",
  "CASA ANGOLA",
  "KINAXI",
  "GRUPO SOL",
  "MONTE BELO",
  "OCTAVA",
  "KWATA",
  "HORIZONTE",
];