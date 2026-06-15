"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "../lib/i18n/LanguageContext";
import { Locale } from "../lib/i18n/types";

interface LanguageOption {
  code: Locale;
  label: string;
  nativeLabel: string;
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  { code: "en", label: "English", nativeLabel: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", nativeLabel: "Español", flag: "🇪🇸" },
  { code: "ja", label: "日本語", nativeLabel: "日本語", flag: "🇯🇵" },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger button */}
      <button
        id="language-selector-btn"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((v) => !v)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-nordic-dark/70 hover:text-nordic-dark hover:bg-black/5 transition-all text-sm font-medium"
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.nativeLabel}</span>
        <span
          className={`material-icons text-sm text-nordic-dark/40 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-soft border border-nordic-dark/8 overflow-hidden z-50 animate-fade-in"
        >
          {LANGUAGES.map((lang) => {
            const isActive = lang.code === locale;
            return (
              <button
                key={lang.code}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-mosque/8 text-mosque font-semibold"
                    : "text-nordic-dark/70 hover:bg-black/4 hover:text-nordic-dark"
                }`}
              >
                <span className="text-lg leading-none">{lang.flag}</span>
                <span>{lang.nativeLabel}</span>
                {isActive && (
                  <span className="material-icons text-sm ml-auto text-mosque">
                    check
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
