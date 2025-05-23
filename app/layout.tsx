import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Copyright } from "lucide-react";
import { ClerkProvider } from "@clerk/nextjs";

import { Providers } from "./providers";

import { fontSans } from "@/config/fonts";
import { ThemeSwitch } from "@/components/theme-switch";

export const metadata: Metadata = {
  title: {
    default: "Deen24ID - Dexa Group Absensi",
    template: `%s - Dexa Group Absensi`,
  },
  description: "Aplikasi absensi untuk tes masuk dexa group",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
            <div className="relative flex flex-col h-screen">
              <ThemeSwitch className="absolute self-end" />
              <main className="container mx-auto max-w-7xl py-4 px-4 flex-grow">
                {children}
              </main>
              <footer className="w-full flex items-center justify-center py-3">
                <Link
                  isExternal
                  className="flex items-center gap-1 text-primary"
                  href="https://deen24id.artidata.io"
                >
                  <Copyright />
                  <p>Imaduddin Haetami</p>
                </Link>
              </footer>
            </div>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
