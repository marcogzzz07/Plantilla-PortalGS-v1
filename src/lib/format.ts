const LOCALE = "es-MX"

/** Convierte "AAAA-MM-DD" en Date local (sin desfase de zona horaria). */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

/** Fecha corta: "25 sep" (o con las opciones que se indiquen). */
export function formatDate(iso: string, options: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" }) {
  return new Intl.DateTimeFormat(LOCALE, options).format(parseDate(iso)).replace(".", "")
}

/** Fecha larga: "viernes, 25 de septiembre de 2026". */
export function formatLongDate(iso: string) {
  return formatDate(iso, { weekday: "long", day: "numeric", month: "long", year: "numeric" })
}

/** Hoy en formato "AAAA-MM-DD". */
export function todayIso() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`
}

/** Moneda en pesos: "$12,500.00" (o sin decimales con decimals = 0). */
export function formatCurrency(value: number, decimals = 2) {
  return new Intl.NumberFormat(LOCALE, { style: "currency", currency: "MXN", minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)
}

/** Número con separadores: "1,234,567". */
export function formatNumber(value: number, decimals = 0) {
  return new Intl.NumberFormat(LOCALE, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(value)
}

/** Porcentaje: 0.125 → "12.5 %". */
export function formatPercent(ratio: number, decimals = 1) {
  return `${formatNumber(ratio * 100, decimals)} %`
}

/**
 * Montos grandes abreviados: 1 250 000 → "$1.3 M", 45 000 → "$45 mil".
 * Se arma a mano porque `notation: "compact"` escribe distinto en Node y en el navegador.
 */
export function formatCompactCurrency(value: number) {
  const abs = Math.abs(value)
  const sign = value < 0 ? "-" : ""
  if (abs >= 1_000_000) return `${sign}$${formatNumber(abs / 1_000_000, 1)} M`
  if (abs >= 1_000) return `${sign}$${formatNumber(abs / 1_000, 0)} mil`
  return `${sign}$${formatNumber(abs, 0)}`
}

export function getInitials(firstName: string, lastName = "") {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase()
}
