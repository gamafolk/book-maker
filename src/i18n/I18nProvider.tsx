import { ReactNode } from "react";
import { createContext, useContextSelector } from "use-context-selector";
import { useI18nContextValue } from "../hooks";

export type I18nCtx = ReturnType<typeof useI18nContextValue>;

const I18nContext = createContext<I18nCtx>({} as I18nCtx);

export default function I18nProvider({ children }: { children: ReactNode }) {
  const value = useI18nContextValue();

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18nContext<T>(selector: (ctx: I18nCtx) => T) {
  return useContextSelector(I18nContext, selector);
}

export function useTranslation() {
  return useI18nContext((ctx) => ctx.t);
}
