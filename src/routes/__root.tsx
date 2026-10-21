import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  ScrollRestoration,
} from "@tanstack/react-router";
import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

// --- Metadados centralizados ---
const siteMetadata = {
  title: "Gráfica AC PRINT",
  description:
    "Impressão offset e digital de alta qualidade, embalagens, cartões e materiais promocionais. Prazos rápidos, acabamentos premium e atendimento consultivo.",
  siteUrl: "https://graficaprisma.pt",
  ogImage: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ffad3fe7-509d-4771-beb9-34762c53a901/id-preview-8ba8c614--175f4a6b-f4d3-4dfb-90c9-654222059fbb.lovable.app-1784296463282.png",
};

// --- Componente 404 melhorado ---
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-8xl font-bold tracking-tight text-primary/20">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O endereço que procura não existe ou foi movido.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            Voltar ao início
          </Link>
          <a
            href="mailto:info@graficaprisma.pt"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Falar com suporte
          </a>
        </div>
      </div>
    </div>
  );
}

// --- Componente de erro melhorado ---
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
      <div className="max-w-md">
        <h1 className="text-6xl font-bold tracking-tight text-destructive">Oops, tente novamente!</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Algo correu mal</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Ocorreu um erro ao carregar esta página. Pode tentar novamente ou voltar ao início.
        </p>
        <p className="mt-1 text-xs text-muted-foreground/50">
          {error.message || "Erro inesperado"}
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

// --- Definição da rota raiz ---
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: siteMetadata.title },
      { name: "description", content: siteMetadata.description },
      { name: "author", content: "Gráfica Prisma" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: siteMetadata.title },
      { property: "og:description", content: siteMetadata.description },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Gráfica Prisma" },
      { property: "og:url", content: siteMetadata.siteUrl },
      { property: "og:image", content: siteMetadata.ogImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteMetadata.title },
      { name: "twitter:description", content: siteMetadata.description },
      { name: "twitter:image", content: siteMetadata.ogImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "canonical", href: siteMetadata.siteUrl },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Gráfica Prisma",
          description: siteMetadata.description,
          image: siteMetadata.ogImage,
          url: siteMetadata.siteUrl,
          priceRange: "€€",
          telephone: "+351 210 000 000",
          email: "info@graficaprisma.pt",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Lisboa",
            addressCountry: "PT",
          },
          sameAs: [
            "https://instagram.com/graficaprisma",
            "https://facebook.com/graficaprisma",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

// --- Shell (HTML wrapper) ---
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

// --- Componente raiz (com providers) ---
function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
        storageKey="prisma-theme"
        disableTransitionOnChange
      >
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center bg-background">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </ThemeProvider>
    </QueryClientProvider>
  );
}