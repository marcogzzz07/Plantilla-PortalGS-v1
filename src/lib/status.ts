/** Tonos de las etiquetas de estado (StatusBadge). Siempre acompañados de una palabra, nunca solo color. */
export type StatusTone = "success" | "warning" | "danger" | "info" | "neutral" | "brand"

export interface StatusMeta {
  label: string
  tone: StatusTone
}

/**
 * Ejemplo de catálogo de estados. Define uno así para cada tipo de registro de tu módulo
 * y úsalo con <StatusBadge {...ejemploEstados.pagada} />.
 */
export const ejemploEstados = {
  pagada: { label: "Pagada", tone: "success" },
  pendiente: { label: "Pendiente", tone: "warning" },
  vencida: { label: "Vencida", tone: "danger" },
  enRevision: { label: "En revisión", tone: "info" },
  borrador: { label: "Borrador", tone: "neutral" },
  destacada: { label: "Destacada", tone: "brand" },
} satisfies Record<string, StatusMeta>
