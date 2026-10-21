import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, MessageCircle, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "./Logo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");

  // Scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Detect active section for highlighting
  useEffect(() => {
    const onHashChange = () => {
      setActiveHash(window.location.hash || "");
    };
    window.addEventListener("hashchange", onHashChange);
    onHashChange();
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Fecha o menu ao redimensionar para desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Fecha com a tecla ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  // Trava o scroll do body quando o menu está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Fecha o menu ao clicar num link
  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    // Atualiza o hash ativo (opcional)
    setActiveHash(href);
  };

  // Verifica se o link está ativo (compara com o hash atual)
  const isActive = (href: string) => activeHash === href;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 " +
          (scrolled
            ? "border-b border-border/60 bg-background/70 backdrop-blur-xl"
            : "bg-transparent")
        }
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" aria-label="Ir para o início">
            <Logo />
          </a>

          {/* Desktop nav */}
          <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <a href={siteConfig.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </Button>
            <Button asChild size="sm" className="gap-2">
              <a href="#contacto">Solicitar orçamento</a>
            </Button>
          </div>

          {/* Mobile: botões lado a lado (ThemeToggle + Menu) */}
          <div className="flex items-center gap-1 lg:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              onClick={() => setIsOpen((v) => !v)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* ===== SIDEBAR MELHORADO ===== */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay com blur e fade mais suave */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Sidebar com animação de slide + leve escala */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col border-l border-border/60 bg-background/95 p-6 backdrop-blur-xl shadow-2xl lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              {/* Cabeçalho do sidebar: Logo + botão fechar */}
              <div className="flex items-center justify-between border-b border-border/40 pb-4">
                <Logo />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Fechar menu"
                  className="hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Links com stagger animation e indicador de ativo */}
              <nav className="mt-8 flex flex-col gap-1">
                {navLinks.map((link, index) => {
                  const active = isActive(link.href);
                  return (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => handleLinkClick(link.href)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{
                        delay: index * 0.05,
                        duration: 0.25,
                        ease: "easeOut",
                      }}
                      className={`group relative flex items-center justify-between rounded-md px-4 py-3 text-base font-medium transition-all ${
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-accent hover:text-accent-foreground"
                      }`}
                    >
                      <span>{link.label}</span>
                      {active && (
                        <motion.span
                          layoutId="active-indicator"
                          className="h-1.5 w-1.5 rounded-full bg-primary"
                        />
                      )}
                      {!active && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                      )}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Rodapé opcional (pode ser removido) */}
              <div className="mt-auto border-t border-border/40 pt-4 text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} Gráfica AC PRINT</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}