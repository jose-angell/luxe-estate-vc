import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../lib/i18n/LanguageContext";
import { cookies } from "next/headers";
import { Locale, SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../lib/i18n/types";

export const metadata: Metadata = {
  title: "Luxe Estate | Premium Real Estate",
  description: "Find your sanctuary. Discover exclusive curated properties and premium real estate.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Read locale from cookie server-side to avoid hydration flash
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("luxe_lang")?.value as Locale | undefined;
  const initialLocale: Locale =
    cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)
      ? cookieLocale
      : DEFAULT_LOCALE;

  return (
    <html lang={initialLocale} className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col bg-background-light text-nordic-dark font-display">
        <LanguageProvider initialLocale={initialLocale}>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
