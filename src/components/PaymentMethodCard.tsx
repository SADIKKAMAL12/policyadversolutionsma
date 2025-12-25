import { useState } from "react"
import { ChevronDown, Copy, Check } from "lucide-react"
import type { PaymentMethod } from "../types"
import placeholderLogo from "../assets/logos/placeholder.svg"

interface PaymentMethodCardProps {
  method: PaymentMethod
}

export default function PaymentMethodCard({ method }: PaymentMethodCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopiedField(label)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const copyAllDetails = () => {
    const allDetails = method.details.map((detail) => `${detail.label}: ${detail.value}`).join("\n")
    const fullText = `${method.name}\n${"-".repeat(method.name.length)}\n${allDetails}${
      method.instructions ? `\n\nInstructions: ${method.instructions}` : ""
    }`

    navigator.clipboard.writeText(fullText)
    setCopiedField("all")
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-slate-200 hover:border-slate-300">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-8 flex flex-col items-center justify-center gap-4 hover:bg-slate-50 transition-colors duration-200"
      >
        <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center">
          <img
            src={method.logo || placeholderLogo}
            alt={`${method.name} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-bold text-slate-900">{method.name}</h3>
        <ChevronDown
          className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden`}
      >
        <div className="px-8 pb-8 space-y-6">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

          {method.details.map((detail, index) => (
            <div key={index} className="space-y-2">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">{detail.label}</label>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-100 rounded-lg p-3 font-mono text-sm text-slate-900 break-all">
                  {detail.value}
                </div>
                {detail.copyable && (
                  <button
                    onClick={() => handleCopy(detail.value, detail.label)}
                    className="p-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg transition-colors duration-200"
                    title="Copy"
                  >
                    {copiedField === detail.label ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                )}
              </div>
            </div>
          ))}

          {method.instructions && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900 leading-relaxed">{method.instructions}</p>
            </div>
          )}

          <button
            onClick={copyAllDetails}
            className="w-full py-3 px-6 bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-xl font-semibold hover:from-slate-800 hover:to-black transition-all duration-200 flex items-center justify-center gap-2"
          >
            {copiedField === "all" ? (
              <>
                <Check className="w-5 h-5" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Payment Information
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
