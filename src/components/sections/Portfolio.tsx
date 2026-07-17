import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SectionHeader } from "./SectionHeader";
import p1 from "@/assets/portfolio-1.jpg";
import p2 from "@/assets/portfolio-2.jpg";
import p3 from "@/assets/portfolio-3.jpg";
import p4 from "@/assets/portfolio-4.jpg";
import p5 from "@/assets/portfolio-5.jpg";
import p6 from "@/assets/portfolio-6.jpg";

type Category = "Todos" | "Papelaria" | "Embalagem" | "Editorial" | "Grande formato";

interface Project {
  title: string;
  category: Exclude<Category, "Todos">;
  image: string;
  client: string;
}

const projects: Project[] = [
  { title: "Cartões com hot-stamping", category: "Papelaria", image: p1, client: "Shungla Studio" },
  { title: "Sacos & caixas premium", category: "Embalagem", image: p2, client: "Petále" },
  { title: "Flyers & brochuras", category: "Editorial", image: p3, client: "Diversos" },
  { title: "Roll-ups para eventos", category: "Grande formato", image: p4, client: "Nordic Expo" },
  { title: "Edição limitada de livro", category: "Editorial", image: p5, client: "Editora Grão" },
  { title: "Wrap veicular", category: "Grande formato", image: p6, client: "Capitólio" },
];

const categories: Category[] = ["Todos", "Papelaria", "Embalagem", "Editorial", "Grande formato"];

export function Portfolio() {
  const [active, setActive] = useState<Category>("Todos");
  const filtered = useMemo(
    () => (active === "Todos" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <section id="portfolio" className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Portefólio"
          title="Trabalhos recentes que nos orgulham"
          description="Uma pequena seleção de projetos entregues nos últimos meses."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={
                "rounded-full border px-4 py-2 text-sm font-medium transition-all " +
                (active === cat
                  ? "border-primary bg-primary text-primary-foreground shadow-soft"
                  : "border-border bg-background text-muted-foreground hover:text-foreground")
              }
            >
              {cat}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.figure
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    width={900}
                    height={1125}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-4 p-6 text-background opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-xs uppercase tracking-widest opacity-80">
                    {project.category}
                  </p>
                  <p className="mt-1 text-base font-semibold">{project.title}</p>
                  <p className="text-sm opacity-80">{project.client}</p>
                </figcaption>
              </motion.figure>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
