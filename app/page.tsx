"use client"

import { useState } from "react"
import PoliciesPage from "../src/components/PoliciesPage"
import PaymentPage from "../src/components/PaymentPage"

type PageType = "policies" | "payment"

export default function Page() {
  const [currentPage, setCurrentPage] = useState<PageType>("policies")

  const handleAgree = () => {
    setCurrentPage("payment")
  }

  return (
    <>
      {currentPage === "policies" && <PoliciesPage onAgree={handleAgree} />}
      {currentPage === "payment" && <PaymentPage />}
    </>
  )
}
