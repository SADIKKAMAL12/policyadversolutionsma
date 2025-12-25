import type { PaymentMethod } from "../types"
import binanceLogo from "../assets/logos/binance-logo.jpeg"
import cihLogo from "../assets/logos/cih-logo.png"
import payoneerLogo from "../assets/logos/payoneer-logo.jpeg"
import redotpayLogo from "../assets/logos/redotpay-logo.png"
import usdtLogo from "../assets/logos/usdt-logo.jpg"
import wiseLogo from "../assets/logos/wise-logo.png"

export const paymentMethods: PaymentMethod[] = [
  {
    id: "cih-bank",
    name: "CIH Bank",
    logo: cihLogo,
    details: [
      { label: "Account Holder", value: "KAMAL SADIK", copyable: true },
      { label: "RIB", value: "230 780 2748742211002900 76", copyable: true },
      { label: "IBAN", value: "MA64 2307 8027 4874 2211 0029 0076", copyable: true },
      { label: "SWIFT Code", value: "CIHMMAMC", copyable: true },
    ],
    instructions: "Transfer the exact amount to the account above. Keep your receipt for confirmation.",
  },
  {
    id: "payoneer",
    name: "Payoneer",
    logo: payoneerLogo,
    details: [
      { label: "Email", value: "Sadikkamal299@gmail.com", copyable: true },
      { label: "ID", value: "74984035", copyable: true },
    ],
    instructions: "Send payment to the email above using your Payoneer account.",
  },
  {
    id: "redotpay",
    name: "RedotPay",
    logo: redotpayLogo,
    details: [{ label: "User ID", value: "1097116046", copyable: true }],
    instructions: "Use the User ID above to complete your payment through RedotPay.",
  },
  {
    id: "usdt-trc20",
    name: "USDT (TRC20)",
    logo: usdtLogo,
    details: [
      { label: "Wallet Address", value: "THCY7VUs4F7gYQmQ1N44dRXgVYQr4DkiLF", copyable: true },
      { label: "Network", value: "TRC20 (Tron)" },
    ],
    instructions: "Send USDT to the wallet address above using TRC20 network only.",
  },
  {
    id: "binance-id",
    name: "Binance ID",
    logo: binanceLogo,
    details: [{ label: "Binance ID", value: "74251224", copyable: true }],
    instructions: "Use the Binance ID above for payment processing.",
  },
  {
    id: "wise",
    name: "Wise",
    logo: wiseLogo,
    details: [{ label: "Payment Link", value: "https://wise.com/pay/business/adversolutionsllc", copyable: true }],
    instructions:
      "Click the payment link above to complete your payment through Wise. You will be redirected to the secure Wise payment page.",
  },
]
