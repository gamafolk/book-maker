import { useCallback, useEffect, useState } from "react";
import mustache from "mustache";

import ptBr from "../i18n/langs/ptBR.json";
import enUs from "../i18n/langs/enUS.json";

export type Lang = typeof langs;
export type LangKey = keyof typeof ptBr | keyof typeof enUs;

const langs = { ptBr, enUs };

const keys: (keyof Lang)[] = ["enUs", "ptBr"];

function getLang() {
  const lang = localStorage.getItem("@curr-lang");
  return keys.find((k) => k === lang) ?? keys[0];
}

export default function useI18nContextValue() {
  const [lang, setLang] = useState(getLang());

  const t = useCallback(
    (textKey: LangKey, config?: Record<string, unknown>) => {
      const template = langs[lang][textKey];
      return mustache.render(template, config ?? {});
    },
    [lang]
  );

  useEffect(() => {
    localStorage.setItem("@curr-lang", lang);
  }, [lang]);

  return { lang, t, setLang };
}
