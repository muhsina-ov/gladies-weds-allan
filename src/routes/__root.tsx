import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#5c5044" },
      { title: "Allan & Gladies — Wedding Invitation" },
      {
        name: "description",
        content:
          "Join us to celebrate the wedding of Allan & Gladies on Wednesday, 4 November 2026. Ceremony at Assembly of God Church & Reception at CSI LITE Auditorium, Chennai.",
      },
      // Open Graph / WhatsApp / Facebook
      { property: "og:site_name", content: "Allan & Gladies Wedding" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://gladies-weds-allan.invitingyou.top/" },
      { property: "og:title", content: "Allan & Gladies — Wedding Invitation" },
      {
        property: "og:description",
        content:
          "Join us to celebrate the wedding of Allan & Gladies on 4 November 2026. Ceremony at Assembly of God Church & Reception at CSI LITE Auditorium, Chennai.",
      },
      { property: "og:image", content: "https://cdn.jsdelivr.net/gh/muhsina-ov/gladies-weds-allan@main/public/og-card.jpg" },
      { property: "og:image:url", content: "https://cdn.jsdelivr.net/gh/muhsina-ov/gladies-weds-allan@main/public/og-card.jpg" },
      { property: "og:image:secure_url", content: "https://cdn.jsdelivr.net/gh/muhsina-ov/gladies-weds-allan@main/public/og-card.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Wedding Invitation of Allan & Gladies — 4 November 2026" },
      // Twitter
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:url", content: "https://gladies-weds-allan.invitingyou.top/" },
      { name: "twitter:title", content: "Allan & Gladies — Wedding Invitation" },
      {
        name: "twitter:description",
        content:
          "Join us to celebrate the wedding of Allan & Gladies on 4 November 2026. Ceremony at Assembly of God Church & Reception at CSI LITE Auditorium, Chennai.",
      },
      { name: "twitter:image", content: "https://cdn.jsdelivr.net/gh/muhsina-ov/gladies-weds-allan@main/public/og-card.jpg" },
    ],
    links: [
      { rel: "canonical", href: "https://gladies-weds-allan.invitingyou.top/" },
      { rel: "image_src", href: "https://cdn.jsdelivr.net/gh/muhsina-ov/gladies-weds-allan@main/public/og-card.jpg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=Jost:wght@300;400;500&family=Petit+Formal+Script&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
