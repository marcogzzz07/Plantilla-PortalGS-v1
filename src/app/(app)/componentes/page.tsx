import type { Metadata } from "next"

import { ComponentCatalog } from "@/components/demo/component-catalog"

export const metadata: Metadata = { title: "Componentes" }

export default function ComponentsPage() {
  return <ComponentCatalog />
}
