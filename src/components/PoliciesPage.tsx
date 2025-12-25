import { useState, useEffect, useRef } from "react"
import { CheckCircle2, Globe2, Mouse, MousePointerClick } from "lucide-react"
import { policyTabs } from "../data/policies"
import type { Language } from "../types"
import { translate, getLanguageLabel } from "../lib/i18n"

interface PoliciesPageProps {
  onAgree: () => void
  language: Language
}

export default function PoliciesPage({ onAgree, language }: PoliciesPageProps) {
  const [selectedTabId, setSelectedTabId] = useState(policyTabs[0].id)
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrollable, setIsScrollable] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const policyScrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 640px)").matches : false,
  )

  const selectedPolicy = policyTabs.find((tab) => tab.id === selectedTabId)!

  useEffect(() => {
    if (typeof window === "undefined") return
    const media = window.matchMedia("(min-width: 640px)")
    const handler = (event: MediaQueryListEvent) => setIsDesktop(event.matches)
    setIsDesktop(media.matches)
    media.addEventListener("change", handler)
    return () => media.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const container = scrollContainerRef.current
    const policyPanel = policyScrollRef.current
    const sentinel = sentinelRef.current

    container?.scrollTo({ top: 0 })
    policyPanel?.scrollTo({ top: 0 })
    setHasScrolledToBottom(false)

    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasScrolledToBottom(true)
        }
      },
      {
        root: isDesktop && policyPanel ? policyPanel : null,
        threshold: 0.05,
        rootMargin: isDesktop ? "0px" : "0px 0px -80px 0px",
      },
    )

    observer.observe(sentinel)

    return () => observer.disconnect()
  }, [selectedTabId, isDesktop])

  useEffect(() => {
    const panel = policyScrollRef.current
    if (!panel) return

    const updateScrollProgress = () => {
      const maxScroll = panel.scrollHeight - panel.clientHeight
      const progress = maxScroll <= 0 ? 1 : Math.min(1, panel.scrollTop / maxScroll)
      setScrollProgress(progress)
      setIsScrollable(maxScroll > 4)
    }

    updateScrollProgress()
    panel.addEventListener("scroll", updateScrollProgress)

    let resizeObserver: ResizeObserver | null = null
    if (typeof window !== "undefined" && "ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(updateScrollProgress)
      resizeObserver.observe(panel)
    }

    return () => {
      panel.removeEventListener("scroll", updateScrollProgress)
      resizeObserver?.disconnect()
    }
  }, [selectedTabId])

  const handleScrollPromptClick = () => {
    if (sentinelRef.current) {
      sentinelRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
      return
    }

    if (policyScrollRef.current) {
      policyScrollRef.current.scrollTo({
        top: policyScrollRef.current.scrollHeight,
        behavior: "smooth",
      })
    }
  }

  return (
    <div ref={scrollContainerRef} className="space-y-6 p-6 lg:p-10">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 p-8 text-white shadow-elevated">
        <div className="pointer-events-none absolute inset-0 opacity-60 blur-2xl">
          <div className="absolute -top-10 left-10 h-40 w-40 rounded-full bg-brand/30" />
          <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-purple-500/20" />
        </div>
        <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">
              {translate("Live translation", language)}
            </p>
            <h1 className="relative mt-2 text-3xl font-bold tracking-tight text-transparent lg:text-4xl">
              <span className="bg-gradient-to-r from-white via-slate-100 to-blue-200 bg-clip-text drop-shadow-[0_5px_15px_rgba(15,23,42,0.4)]">
                {translate("Service & Policy Selection", language)}
              </span>
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/40 via-cyan-200/30 to-transparent blur-sm mix-blend-screen" aria-hidden />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-60"
                style={{ clipPath: "polygon(10% 0%, 30% 0%, 80% 100%, 60% 100%)" }}
                aria-hidden
              />
            </h1>
            <p className="mt-2 text-white/70">
              {translate("Select a category and review the corresponding policy", language)}
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
            <Globe2 className="h-5 w-5" />
            {getLanguageLabel(language)}
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {policyTabs.map((tab) => {
            const isActive = tab.id === selectedTabId
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedTabId(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  isActive ? "bg-white text-slate-900 shadow-lg" : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {translate(tab.label, language)}
              </button>
            )
          })}
        </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-gradient-to-b from-white/95 to-emerald-50/40 shadow-lg shadow-slate-200/60 dark:border-slate-800/60 dark:from-slate-900/80 dark:to-slate-900/40 dark:shadow-slate-900/40">
        <div className="pointer-events-none absolute inset-0 opacity-40 blur-2xl">
          <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-brand/20" />
          <div className="absolute top-6 left-1/4 h-32 w-32 rounded-full bg-indigo-200/30 dark:bg-indigo-900/20" />
        </div>
        <div className="relative">
          <div ref={policyScrollRef} className="min-h-[60vh] max-h-[80vh] overflow-y-scroll">
            <div className="px-4 py-6 pr-8 sm:pl-8 sm:py-8 sm:pr-16">
              <div className="flex flex-col gap-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.4em] text-slate-400 dark:text-slate-500">
                    {translate(selectedPolicy.label, language)}
                  </p>
                  <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                    {translate(selectedPolicy.title, language)}
                  </h2>
                </div>
                <div className="grid gap-3 text-xs font-semibold text-slate-600 dark:text-slate-300 md:grid-cols-2">
                  <span className="rounded-2xl bg-slate-900/5 px-4 py-2 shadow-inner dark:bg-slate-900/60">
                    {translate("Step 1 · Review Policies", language)}
                  </span>
                  <span className="rounded-2xl bg-slate-900/5 px-4 py-2 shadow-inner dark:bg-slate-900/60">
                    {translate("Language", language)}: {getLanguageLabel(language)}
                  </span>
                </div>
              </div>
              {!hasScrolledToBottom && (
                <div className="mt-6 rounded-2xl border border-dashed border-slate-200/70 bg-white/90 p-4 text-sm text-slate-600 shadow-inner backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                      <MousePointerClick className="h-5 w-5 text-brand" aria-hidden />
                      <p className="font-semibold text-slate-700 dark:text-white">
                        {translate("Scroll to review the entire policy", language)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleScrollPromptClick}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-2 text-sm font-semibold text-brand shadow-sm transition hover:-translate-y-0.5 hover:bg-brand hover:text-white focus:outline-none focus:ring-2 focus:ring-brand/40 dark:bg-slate-900/70"
                    >
                      {translate("Scroll for me", language)}
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-6 space-y-10">
                {selectedPolicy.sections.map((section, index) => {
                  const translatedHeading = translate(section.heading, language)
                  const translatedContent = Array.isArray(section.content)
                    ? section.content.map((line) => translate(line, language))
                    : translate(section.content, language)

                  return (
                    <section
                      key={index}
                      className="rounded-2xl border border-slate-100/70 bg-white/90 p-6 shadow-sm dark:border-slate-800/60 dark:bg-slate-900/70"
                    >
                      <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                        {translatedHeading}
                      </h3>
                      <div className="mt-4 text-slate-700 dark:text-slate-200">
                        {Array.isArray(translatedContent) ? (
                          translatedContent.map((line, idx) => (
                            <p key={idx} className={line === "" ? "h-3" : "leading-relaxed"}>
                              {line}
                            </p>
                          ))
                        ) : (
                          <p className="leading-relaxed">{translatedContent}</p>
                        )}
                      </div>
                    </section>
                  )
                })}
              </div>
            </div>
            <div ref={sentinelRef} className="h-2 w-full" aria-hidden />
          </div>
          {!hasScrolledToBottom && isScrollable && (
            <div className="pointer-events-none absolute inset-x-0 bottom-6 flex justify-center">
              <button
                type="button"
                onClick={handleScrollPromptClick}
                className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-slate-900/80 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-slate-900/40 backdrop-blur transition hover:-translate-y-0.5 dark:bg-white/10"
                aria-label={translate("Tap to scroll", language)}
              >
                <Mouse className="h-5 w-5 text-brand" aria-hidden />
                <span>{translate("Tap to scroll", language)}</span>
              </button>
            </div>
          )}
          {isScrollable && (
            <div
              className="pointer-events-none absolute inset-y-6 right-3 flex w-3 justify-center sm:right-4"
              aria-hidden="true"
            >
              <div className="relative h-full w-1.5 overflow-hidden rounded-full border border-white/30 bg-white/50 shadow-inner dark:border-white/10 dark:bg-slate-800/70">
                <div
                  className="absolute inset-x-0 bottom-0 rounded-full bg-gradient-to-b from-brand via-blue-500 to-indigo-500 shadow-[0_0_12px_rgba(56,189,248,0.35)] transition-all duration-200 ease-out"
                  style={{ height: `${Math.max(scrollProgress, 0.06) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-slate-200/70 bg-slate-50/80 p-6 dark:border-slate-800/70 dark:bg-slate-900/60">
          <button
            onClick={onAgree}
            disabled={!hasScrolledToBottom}
            className={`mx-auto flex w-full max-w-md items-center justify-center gap-3 rounded-2xl px-6 py-4 text-lg font-semibold transition-all ${
              hasScrolledToBottom
                ? "bg-gradient-to-r from-brand via-blue-500 to-indigo-500 text-white shadow-[0_10px_30px_rgba(56,189,248,0.35)] hover:translate-y-[-1px]"
                : "cursor-not-allowed bg-slate-200/80 text-slate-500 dark:bg-slate-800/60 dark:text-slate-400"
            }`}
          >
            <CheckCircle2 className="h-6 w-6" />
            {translate("I AGREE TO THE POLICY", language)}
          </button>
          {!hasScrolledToBottom && (
            <p className="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
              {translate("Please scroll to the bottom to continue", language)}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
