import { BarChart3, FileText, LayoutDashboard, Palette, Settings, Wallet } from "lucide-react"
import type { LucideIcon } from "lucide-react"

export interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  /** Texto breve de la sección (lo usa el buscador). */
  description: string
  /** Número rojo junto al nombre (pendientes, avisos) */
  badge?: number
}

export interface NavSection {
  label: string
  items: NavItem[]
  /** Si existe, la sección se muestra como grupo desplegable con ícono propio (como "Mi GS"). */
  group?: { title: string; icon: LucideIcon }
  /** El grupo inicia contraído. */
  defaultCollapsed?: boolean
}

/**
 * Menú del módulo. Cada sección es un bloque del sidebar.
 * Reemplaza estas secciones por las de tu módulo.
 */
export const navigation: NavSection[] = [
  {
    label: "General",
    items: [
      { title: "Inicio", href: "/", icon: LayoutDashboard, description: "Tablero de ejemplo con indicadores, gráficas y tablas." },
      { title: "Componentes", href: "/componentes", icon: Palette, description: "Catálogo de todos los componentes del diseño." },
    ],
  },
  {
    label: "Ejemplo",
    group: { title: "Grupo desplegable", icon: Wallet },
    items: [
      { title: "Sección con aviso", href: "/ejemplo/aviso", icon: FileText, description: "Ejemplo de sección con contador.", badge: 3 },
      { title: "Reportes", href: "/ejemplo/reportes", icon: BarChart3, description: "Ejemplo de sección dentro de un grupo." },
    ],
  },
  {
    label: "Sistema",
    items: [{ title: "Configuración", href: "/ejemplo/configuracion", icon: Settings, description: "Ejemplo de sección de configuración." }],
  },
]

/** Sección activa: la de ruta más larga que coincide con la URL actual. */
export function findActiveNavItem(pathname: string, sections: NavSection[] = navigation): NavItem | undefined {
  const items = sections.flatMap((s) => s.items)
  return items
    .filter((item) => (item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`)))
    .sort((a, b) => b.href.length - a.href.length)[0]
}
