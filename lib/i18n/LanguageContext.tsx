"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  Locale,
  Translations,
  SUPPORTED_LOCALES,
  DEFAULT_LOCALE,
  COOKIE_NAME,
} from "./types";
import { getTranslations } from "./translations";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Detect locale from browser without external deps */
function detectBrowserLocale(): Locale {
  if (typeof navigator === "undefined") return DEFAULT_LOCALE;
  const lang = navigator.language?.toLowerCase() ?? "";
  if (lang.startsWith("es")) return "es";
  if (lang.startsWith("ja")) return "ja";
  return "en";
}

/** Read a cookie by name */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

/** Write a cookie that lasts 1 year */
function setCookie(name: string, value: string) {
  const maxAge = 60 * 60 * 24 * 365; // 1 year
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

// ─── Context ─────────────────────────────────────────────────────────────────

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  setLocale: (locale: Locale) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

interface LanguageProviderProps {
  children: ReactNode;
  /** Optional: server-detected locale from cookie (avoids flash) */
  initialLocale?: Locale;
}

export function LanguageProvider({
  children,
  initialLocale,
}: LanguageProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(
    initialLocale ?? DEFAULT_LOCALE
  );

  // On mount, resolve the real locale (cookie → browser → default)
  useEffect(() => {
    const cookieLocale = getCookie(COOKIE_NAME) as Locale | null;
    if (cookieLocale && SUPPORTED_LOCALES.includes(cookieLocale)) {
      setLocaleState(cookieLocale);
    } else if (!initialLocale) {
      setLocaleState(detectBrowserLocale());
    }
  }, [initialLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;
    setLocaleState(newLocale);
    setCookie(COOKIE_NAME, newLocale);
  }, []);

  const t = getTranslations(locale);

  return (
    <LanguageContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useTranslation() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useTranslation must be used inside <LanguageProvider>");
  }
  return ctx;
}
