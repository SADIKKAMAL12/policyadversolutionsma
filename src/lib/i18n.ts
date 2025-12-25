import type { Language, PaymentMethodContent } from "../types"
import en from "../locales/en.json"
import fr from "../locales/fr.json"
import ar from "../locales/ar.json"

type TranslationMap = Record<Language, Record<string, unknown>>

const translations: TranslationMap = {
  en,
  fr,
  ar,
}

const rtlLanguages: Language[] = ["ar"]
const PAYMENT_DATA_KEY = "payment.data"

export const supportedLanguages: { code: Language; label: string; emoji: string }[] = [
  { code: "en", label: "English", emoji: "🇺🇸" },
  { code: "fr", label: "Français", emoji: "🇫🇷" },
  { code: "ar", label: "العربية", emoji: "🇸🇦" },
]

export function translate(text: string, language: Language): string {
  if (!text || language === "en") {
    return text
  }

  const entry = translations[language][text]
  if (typeof entry === "string") {
    return entry
  }

  const trimmed = text.trim()
  if (!trimmed) {
    return text
  }

  const fallback = translations[language][trimmed]
  if (typeof fallback === "string") {
    return fallback
  }

  return text
}

export function getLanguageLabel(language: Language) {
  return supportedLanguages.find((lang) => lang.code === language)?.label ?? language
}

export function isRTL(language: Language) {
  return rtlLanguages.includes(language)
}

export function getPaymentMethodContent(language: Language): PaymentMethodContent[] {
  const localized = translations[language][PAYMENT_DATA_KEY]
  if (Array.isArray(localized)) {
    return localized as PaymentMethodContent[]
  }
  const fallback = translations.en[PAYMENT_DATA_KEY]
  if (Array.isArray(fallback)) {
    return fallback as PaymentMethodContent[]
  }
  return []
}
