import { useMemo } from "react"
import type { Language, PaymentMethod, PaymentMethodDetail } from "../types"
import placeholderLogo from "../assets/logos/placeholder.svg"
import { translate } from "../lib/i18n"

interface PaymentMethodCardProps {
  method: PaymentMethod
  language: Language
  onOpen: (method: PaymentMethod) => void
  isHighlighted?: boolean
}

type DetailRow = PaymentMethodDetail | null

export default function PaymentMethodCard({ method, language, onOpen, isHighlighted }: PaymentMethodCardProps) {
  const detailRows: DetailRow[] = useMemo(() => {
    const rows: DetailRow[] = method.details.slice(0, 2)
    while (rows.length < 2) {
      rows.push(null)
    }
    return rows
  }, [method.details])

  return (
    <div
      className={`relative rounded-2xl border border-slate-200/80 bg-gradient-to-b from-slate-900/3 to-white/95 p-6 shadow-lg shadow-slate-200/70 transition-all dark:border-slate-800/70 dark:from-slate-900/80 dark:to-slate-900/60 ${
        isHighlighted ? "ring-2 ring-brand" : "hover:-translate-y-1 hover:shadow-2xl"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-inner dark:bg-slate-800">
          <img src={method.logo || placeholderLogo} alt={`${method.name} logo`} className="h-12 w-12 object-contain" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            {translate("Payment Methods", language)}
          </p>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{method.name}</h3>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm text-slate-600 dark:text-slate-300">
        {detailRows.map((detail, index) => {
          if (!detail) {
            return (
              <div
                key={`placeholder-${index}`}
                className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-2 shadow-inner dark:bg-slate-800/50"
              >
                <span className="h-3 w-16 rounded-full bg-slate-200/80 dark:bg-slate-700/60" />
                <span className="h-3 w-20 rounded-full bg-slate-100/80 dark:bg-slate-700/50" />
              </div>
            )
          }

          return (
            <div
              key={`${method.id}-${index}`}
              className="flex items-center justify-between rounded-xl bg-white/80 px-3 py-2 shadow-inner dark:bg-slate-800/60"
            >
              <span className="font-semibold">{detail.label}</span>
              <span className="max-w-[140px] truncate text-right font-mono text-xs text-slate-500 dark:text-slate-400">
                {detail.value}
              </span>
            </div>
          )
        })}
      </div>

      <button
        type="button"
        onClick={() => onOpen(method)}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-slate-900 via-brand to-indigo-500 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(15,23,42,0.2)] transition hover:scale-[1.01]"
      >
        {translate("Click on a payment method to view payment details", language)}
      </button>
    </div>
  )
}
