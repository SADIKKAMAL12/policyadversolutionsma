import { useMemo, useState } from "react"
import { MessageCircle, Phone, ShieldCheck, Clock } from "lucide-react"
import PaymentMethodCard from "./PaymentMethodCard"
import PaymentMethodModal from "./PaymentMethodModal"
import { translate, isRTL, getPaymentMethodContent } from "../lib/i18n"
import type { Language, PaymentMethod } from "../types"
import binanceLogo from "../assets/logos/binance-logo.jpeg"
import cihLogo from "../assets/logos/cih-logo.png"
import payoneerLogo from "../assets/logos/payoneer-logo.jpeg"
import redotpayLogo from "../assets/logos/redotpay-logo.png"
import usdtLogo from "../assets/logos/usdt-logo.jpeg"
import wiseLogo from "../assets/logos/wise-logo.png"
import placeholderLogo from "../assets/logos/placeholder.svg"

const paymentMethodLogos: Record<string, string> = {
  "cih-bank": cihLogo,
  "payoneer": payoneerLogo,
  "redotpay": redotpayLogo,
  "usdt-trc20": usdtLogo,
  "binance-id": binanceLogo,
  "wise": wiseLogo,
}

interface PaymentPageProps {
  language: Language
  onBack: () => void
}

export default function PaymentPage({ language, onBack }: PaymentPageProps) {
  const handleContactSupport = () => {
    window.open("https://wa.me/212610341885", "_blank")
  }
  const rtl = isRTL(language)
  const backArrow = rtl ? "→" : "←"
  const [activeMethodId, setActiveMethodId] = useState<string | null>(null)

  const paymentMethods = useMemo<PaymentMethod[]>(() => {
    const localizedMethods = getPaymentMethodContent(language)
    return localizedMethods.map((method) => ({
      ...method,
      logo: paymentMethodLogos[method.id] ?? placeholderLogo,
    }))
  }, [language])

  const badges = useMemo(
    () => [
      {
        icon: ShieldCheck,
        label: translate("WARRANTY", language),
        description: translate("Warranty remains valid as long as client uses account properly and without policy violations.", language),
      },
      {
        icon: Clock,
        label: translate("REVIEW TIME", language),
        description: translate("Verification can take 24h–7 days depending on platform decision.", language),
      },
    ],
    [language],
  )

  return (
    <div className="space-y-6 p-6 lg:p-10">
      <div className="relative flex flex-col gap-4 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-blue-900/40 p-6 text-white shadow-inner dark:bg-slate-900/60">
        <div className="pointer-events-none absolute inset-0 opacity-50 blur-2xl">
          <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-brand/30" />
          <div className="absolute bottom-0 right-14 h-36 w-36 rounded-full bg-indigo-500/30" />
        </div>
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              {translate("Payment Methods", language)}
            </h1>
            <p className="text-sm text-slate-200">
              {translate("Click on a payment method to view payment details", language)}
            </p>
          </div>
          <button
            type="button"
            onClick={onBack}
            className={`inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white/80 hover:text-white ${rtl ? "flex-row-reverse" : ""}`}
          >
            <span aria-hidden>{backArrow}</span>
            <span>{translate("Back to Policies", language)}</span>
          </button>
        </div>
        <p className="relative text-xs uppercase tracking-[0.3em] text-slate-300">
          {translate("Payment instructions are available in your preferred language.", language)}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-2xl border border-slate-200/40 bg-white/90 p-4 shadow-inner dark:border-slate-700 dark:bg-slate-900/70"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900/5 text-brand dark:bg-slate-900/50">
              <badge.icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{badge.label}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed break-words">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            language={language}
            onOpen={(item) => setActiveMethodId(item.id)}
            isHighlighted={activeMethodId === method.id}
          />
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-lg dark:border-slate-800/70 dark:bg-slate-900">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-1 items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-indigo-500 text-white shadow-lg">
              <MessageCircle className="h-7 w-7" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{translate("Next Steps", language)}</h2>
              <p className="text-slate-600 dark:text-slate-300">
                {translate("After payment, please contact support for confirmation.", language)}
              </p>
            </div>
          </div>
          <button
            onClick={handleContactSupport}
            className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-slate-900 via-brand to-indigo-500 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-400/40 transition hover:scale-[1.01]"
          >
            <Phone className="h-5 w-5" />
            {translate("Contact Support", language)}
          </button>
        </div>
      </div>

      {paymentMethods.map((method) => (
        <PaymentMethodModal
          key={method.id}
          method={method}
          language={language}
          isOpen={activeMethodId === method.id}
          onClose={() => setActiveMethodId(null)}
        />
      ))}
    </div>
  )
}
