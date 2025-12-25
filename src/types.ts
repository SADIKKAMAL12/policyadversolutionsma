export interface PaymentMethod {
  id: string
  name: string
  logo: string
  details: {
    label: string
    value: string
    copyable?: boolean
  }[]
  instructions?: string
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
