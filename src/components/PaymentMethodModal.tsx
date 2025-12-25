import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Copy, Check, X } from "lucide-react"
import type { Language, PaymentMethod } from "../types"
import placeholderLogo from "../assets/logos/placeholder.svg"
import { translate } from "../lib/i18n"

interface PaymentMethodModalProps {
  method: PaymentMethod
  language: Language
  onClose: () => void
  isOpen: boolean
}

export default function PaymentMethodModal({ method, language, onClose, isOpen }: PaymentMethodModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    document.addEventListener("keydown", handleKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKey)
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen, onClose])

  const handleCopy = (value: string, fieldKey: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(fieldKey)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const copyAllDetails = () => {
    const allDetails = method.details.map((detail) => `${detail.label}: ${detail.value}`).join("\n")
    const fullInstructions = method.instructions ?? ""
    const fullText = `${method.name}\n${"-".repeat(method.name.length)}\n${allDetails}${
      fullInstructions ? `\n\n${fullInstructions}` : ""
    }`

    navigator.clipboard.writeText(fullText)
    setCopiedField("all")
    setTimeout(() => setCopiedField(null), 2000)
  }

  if (!mounted || !isOpen) {
    return null
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 px-4 py-6 backdrop-blur sm:p-6">
      <div className="relative w-full max-w-3xl max-h-[calc(100vh-3rem)] overflow-y-auto rounded-3xl border border-white/20 bg-white/95 shadow-2xl shadow-black/30 sm:max-h-[90vh] dark:bg-slate-900/95">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-slate-100/70 p-2 text-slate-500 hover:text-slate-900 dark:bg-slate-800/70 dark:text-slate-300"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="grid gap-6 rounded-3xl p-6 sm:p-8 lg:grid-cols-2">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-inner dark:bg-slate-800">
                <img src={method.logo || placeholderLogo} alt={`${method.name} logo`} className="h-12 w-12 object-contain" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
                  {translate("Payment Methods", language)}
                </p>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{method.name}</h2>
              </div>
            </div>
            {method.instructions && (
              <div className="rounded-2xl bg-gradient-to-br from-slate-900/5 to-white/5 p-4 text-sm text-slate-700 shadow-inner dark:from-slate-800 dark:to-slate-800/70 dark:text-slate-200">
                {method.instructions}
              </div>
            )}
          </div>
          <div className="space-y-4">
            {method.details.map((detail, index) => (
              <div key={`${method.id}-${index}`} className="rounded-2xl border border-slate-200/80 p-4 dark:border-slate-700/70">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
                  {detail.label}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 break-all rounded-xl bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 dark:bg-slate-900/60 dark:text-slate-100">
                    {detail.value}
                  </div>
                  {detail.copyable && (
                    <button
                      type="button"
                      onClick={() => handleCopy(detail.value, `${method.id}-${index}`)}
                      className="rounded-xl bg-slate-900 p-3 text-white hover:bg-slate-700 dark:bg-slate-700 dark:hover:bg-slate-600"
                      aria-label={translate("Copy", language)}
                    >
                      {copiedField === `${method.id}-${index}` ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-slate-100/50 bg-slate-50/70 px-8 py-6 dark:border-slate-800 dark:bg-slate-900/60">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <button
              type="button"
              onClick={copyAllDetails}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-slate-900 via-brand to-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-500/40 transition hover:scale-[1.01]"
            >
              {copiedField === "all" ? (
                <>
                  <Check className="h-5 w-5" />
                  {translate("Copied!", language)}
                </>
              ) : (
                <>
                  <Copy className="h-5 w-5" />
                  {translate("Copy Payment Information", language)}
                </>
              )}
            </button>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {translate("Payment instructions are available in your preferred language.", language)}
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
