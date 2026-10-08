import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Construction } from "lucide-react"

import { EmptyState } from "@/components/shared/empty-state"
import { navigation } from "@/config/navigation"

/**
 * Ruta comodín: muestra "en construcción" para las secciones del menú que todavía
 * no tienen página. Cuando una sección tenga su propia carpeta en app/(app), esa ruta
 * tiene prioridad.
 */
type Props = { params: Promise<{ slug: string[] }> }

const findItem = (slug: string[]) => {
  const href = `/${slug.map(decodeURIComponent).join("/")}`
  return navigation.flatMap((s) => s.items).find((i) => i.href === href)
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: findItem((await params).slug)?.title ?? "Página no encontrada" }
}

export default async function SectionPage({ params }: Props) {
  const item = findItem((await params).slug)
  if (!item) notFound()
  return <EmptyState icon={Construction} title={item.title} description={`${item.description} Esta sección está en construcción.`} />
}
