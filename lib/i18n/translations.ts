import { Locale, Translations, DEFAULT_LOCALE } from "./types";
import en from "../../locales/en.json";
import es from "../../locales/es.json";
import ja from "../../locales/ja.json";

const translationsMap: Record<Locale, Translations> = {
  en: en as Translations,
  es: es as Translations,
  ja: ja as Translations,
};

export function getTranslations(locale: Locale): Translations {
  return translationsMap[locale] ?? translationsMap[DEFAULT_LOCALE];
}

export { translationsMap };
