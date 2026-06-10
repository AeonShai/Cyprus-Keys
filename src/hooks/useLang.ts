import { useLangStore } from "@/store/langStore";
import { t as translate, type TranslationKey } from "@/lib/translations";

export function useLang() {
  const { lang, setLang } = useLangStore();
  const t = (key: TranslationKey) => translate(lang, key);
  return { lang, setLang, t };
}
