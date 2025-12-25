export type Language = "en" | "fr" | "ar"

export interface PaymentMethodDetail {
  label: string
  value: string
  copyable?: boolean
}

export interface PaymentMethodContent {
  id: string
  name: string
  details: PaymentMethodDetail[]
  instructions?: string
}

export interface PaymentMethod extends PaymentMethodContent {
  logo: string
}

export interface PolicyTab {
  id: string
  label: string
  title: string
  sections: PolicySection[]
}

export interface PolicySection {
  heading: string
  content: string | string[]
}

export type PageType = "policies" | "payment"
