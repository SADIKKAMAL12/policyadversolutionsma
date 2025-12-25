import { useEffect, useMemo, useState } from "react"
import PoliciesPage from "./components/PoliciesPage"
import PaymentPage from "./components/PaymentPage"
import LanguageSelector from "./components/LanguageSelector"
import ThemeToggle from "./components/ThemeToggle"
import type { Language, PageType } from "./types"
import { translate, isRTL } from "./lib/i18n"

type ThemeMode = "light" | "dark"

const THEME_KEY = "policy-portal-theme"
const LANGUAGE_KEY = "policy-portal-language"

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light"
  }

  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === "light" || stored === "dark") {
    return stored
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

const getPreferredLanguage = (): Language => {
  if (typeof window === "undefined") {
    return "en"
  }

  const stored = window.localStorage.getItem(LANGUAGE_KEY)
  if (stored === "fr" || stored === "en" || stored === "ar") {
    return stored as Language
  }

  return "en"
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>("policies")
  const [theme, setTheme] = useState<ThemeMode>(() => getPreferredTheme())
  const [language, setLanguage] = useState<Language>(() => getPreferredLanguage())

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }

    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.dataset.theme = theme
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    if (typeof document === "undefined") {
      return
    }
    const root = document.documentElement
    root.lang = language
    const dir = isRTL(language) ? "rtl" : "ltr"
    root.dir = dir
    document.body.dir = dir
    window.localStorage.setItem(LANGUAGE_KEY, language)
  }, [language])

  const steps = useMemo(
    () => [
      { id: "policies", label: translate("Step 1 · Review Policies", language) },
      { id: "payment", label: translate("Step 2 · Payment", language) },
    ],
    [language],
  )

  const stepProgress = currentPage === "policies" ? 0.5 : 1

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="pointer-events-none absolute inset-0 opacity-70 blur-3xl">
        <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-brand/30 dark:bg-brand/20" />
        <div className="absolute top-10 left-[-120px] h-72 w-72 rounded-full bg-slate-200/30 dark:bg-slate-900/30" />
        <div className="absolute bottom-28 left-1/3 h-48 w-48 rounded-full bg-indigo-200/25 dark:bg-indigo-900/20" />
        <div className="absolute -bottom-36 -left-10 h-96 w-96 rounded-full bg-sky-200/25 dark:bg-sky-900/25" />
        <div className="absolute top-1/3 right-16 h-64 w-64 rounded-full bg-purple-200/20 dark:bg-purple-900/20" />
        <div className="absolute bottom-8 right-1/4 h-40 w-40 rounded-full bg-rose-200/20 dark:bg-rose-900/25" />
        <div className="absolute top-12 left-1/2 h-36 w-36 rounded-full bg-amber-100/30 dark:bg-amber-900/20" />
      </div>
      <div className="pointer-events-none absolute inset-0 opacity-40 blur-[150px]">
        <div className="absolute top-1/2 left-10 h-40 w-40 rounded-full bg-fuchsia-200/30 dark:bg-fuchsia-900/25" />
        <div className="absolute bottom-16 left-1/2 h-48 w-48 rounded-full bg-cyan-200/25 dark:bg-cyan-900/25" />
        <div className="absolute top-0 right-1/2 h-56 w-56 rounded-full bg-blue-200/20 dark:bg-blue-900/20" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 lg:px-0">
        <header className="rounded-[28px] border border-white/80 bg-white/95 p-6 shadow-[0_25px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100/80 pb-4 dark:border-white/5">
            <span className="inline-flex items-center rounded-full border border-slate-200/70 bg-slate-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 dark:border-white/10 dark:bg-slate-800/80 dark:text-brand">
              {translate("Policy & Billing Hub", language)}
            </span>
            <div className="flex items-center gap-3">
              <LanguageSelector language={language} onChange={setLanguage} />
              <ThemeToggle theme={theme} onToggle={() => setTheme(theme === "light" ? "dark" : "light")} />
            </div>
          </div>
          <div className="mt-4 space-y-3 text-xs font-semibold text-slate-500 dark:text-slate-200">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {steps.map((step) => {
                  const isActive = currentPage === step.id
                  return (
                    <span
                      key={step.id}
                      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 ${
                        isActive
                          ? "border-brand/60 bg-brand/10 text-brand dark:bg-white/5 dark:text-white"
                          : "border-slate-200 text-slate-400 dark:border-slate-700 dark:text-slate-500"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isActive ? "bg-brand shadow-[0_0_6px_rgba(56,189,248,0.8)]" : "bg-slate-300 dark:bg-slate-600"
                        }`}
                        aria-hidden
                      />
                      <span className={`${isActive ? "text-inherit" : "text-slate-400 dark:text-slate-500"}`}>{step.label}</span>
                    </span>
                  )
                })}
              </div>
              <div className="text-slate-500 dark:text-slate-300">
                {translate("Currently viewing:", language)}{" "}
                <span className="font-semibold text-slate-900 dark:text-white">
                  {currentPage === "policies"
                    ? translate("Step 1 · Review Policies", language)
                    : translate("Step 2 · Payment", language)}
                </span>
              </div>
            </div>
            <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand via-sky-500 to-indigo-500 transition-all"
                style={{ width: `${stepProgress * 100}%` }}
              />
            </div>
          </div>
        </header>

        <div className="rounded-[32px] border border-white/60 bg-white/95 shadow-[0_35px_80px_rgba(15,23,42,0.12)] backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
          {currentPage === "policies" ? (
            <PoliciesPage language={language} onAgree={() => setCurrentPage("payment")} />
          ) : (
            <PaymentPage language={language} onBack={() => setCurrentPage("policies")} />
          )}
        </div>
      </div>
    </div>
  )
}

export default App
