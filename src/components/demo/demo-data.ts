import type { StatusMeta } from "@/lib/status"
import { ejemploEstados } from "@/lib/status"

/** Datos de EJEMPLO para mostrar el diseño. Bórralos al construir tu módulo. */

export const monthlySeries = [
  { mes: "ene", ingresos: 1180000, gastos: 820000 },
  { mes: "feb", ingresos: 1240000, gastos: 860000 },
  { mes: "mar", ingresos: 1310000, gastos: 900000 },
  { mes: "abr", ingresos: 1270000, gastos: 880000 },
  { mes: "may", ingresos: 1390000, gastos: 930000 },
  { mes: "jun", ingresos: 1420000, gastos: 950000 },
  { mes: "jul", ingresos: 1380000, gastos: 940000 },
  { mes: "ago", ingresos: 1460000, gastos: 970000 },
  { mes: "sep", ingresos: 1510000, gastos: 990000 },
]

export const byArea = [
  { area: "Contabilidad", monto: 420000 },
  { area: "Auditoría", monto: 310000 },
  { area: "Impuestos", monto: 280000 },
  { area: "Consultoría", monto: 240000 },
  { area: "Legal", monto: 160000 },
]

export interface ExampleRow {
  id: string
  concepto: string
  responsable: string
  fecha: string
  monto: number
  estado: StatusMeta
}

export const rows: ExampleRow[] = [
  { id: "F-1042", concepto: "Servicio de auditoría anual", responsable: "Ana López", fecha: "2026-09-22", monto: 185000, estado: ejemploEstados.pagada },
  { id: "F-1043", concepto: "Asesoría fiscal mensual", responsable: "Luis Pérez", fecha: "2026-09-24", monto: 42000, estado: ejemploEstados.pendiente },
  { id: "F-1044", concepto: "Contabilidad electrónica", responsable: "Sofía Ruiz", fecha: "2026-09-10", monto: 36500, estado: ejemploEstados.vencida },
  { id: "F-1045", concepto: "Precios de transferencia", responsable: "Ana López", fecha: "2026-09-27", monto: 128000, estado: ejemploEstados.enRevision },
  { id: "F-1046", concepto: "Consultoría legal corporativa", responsable: "Carlos Díaz", fecha: "2026-09-29", monto: 64000, estado: ejemploEstados.borrador },
]
