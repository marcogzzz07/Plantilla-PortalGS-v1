"use client"

import { useState } from "react"
import { BarChart3, Download, FileText, LayoutDashboard, Plus, Receipt, TrendingUp, Wallet } from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { MetricCard } from "@/components/shared/metric-card"
import { PageHeader } from "@/components/shared/page-header"
import { PageTabsList, PageTabsTrigger } from "@/components/shared/page-tabs"
import { SectionCard } from "@/components/shared/section-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { UserAvatar } from "@/components/shared/user-avatar"
import { formatCompactCurrency, formatCurrency, formatDate } from "@/lib/format"
import { byArea, monthlySeries, rows } from "./demo-data"

const areaConfig = {
  ingresos: { label: "Ingresos", color: "var(--brand)" },
  gastos: { label: "Gastos", color: "var(--chart-2)" },
} satisfies ChartConfig
const barConfig = { monto: { label: "Monto", color: "var(--chart-2)" } } satisfies ChartConfig

/** Tablero de EJEMPLO: muestra cómo se combinan los componentes del diseño. */
export function DemoDashboard() {
  const [open, setOpen] = useState(false)

  return (
    <div className="space-y-6">
      <PageHeader
        icon={LayoutDashboard}
        title="Tablero de ejemplo"
        badge="Datos de ejemplo"
        description="Así se ve una página del Portal GS: encabezado, indicadores, gráficas y una tabla con estados."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success("Descargando reporte (ejemplo)")}>
              <Download />
              Exportar
            </Button>
            <Button onClick={() => setOpen(true)}>
              <Plus />
              Nuevo registro
            </Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Ingresos del mes" value={formatCompactCurrency(1510000)} icon={Wallet} accent="green" helper="+3.4 % vs. agosto" />
        <MetricCard label="Gastos del mes" value={formatCompactCurrency(990000)} icon={Receipt} accent="pink" helper="Dentro de presupuesto" />
        <MetricCard label="Margen" value="34.4 %" icon={TrendingUp} accent="blue" progress={34} helper="Meta anual: 35 %" />
        <MetricCard label="Pendientes" value={3} unit="registros" icon={FileText} accent="amber" helper="1 vencido" />
      </div>

      <Tabs defaultValue="resumen" className="gap-6">
        <PageTabsList>
          <PageTabsTrigger value="resumen">Resumen</PageTabsTrigger>
          <PageTabsTrigger value="detalle">Detalle</PageTabsTrigger>
        </PageTabsList>

        <TabsContent value="resumen" className="space-y-6">
          <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
            <SectionCard title="Ingresos y gastos" description="Enero a septiembre" icon={BarChart3}>
              <ChartContainer config={areaConfig} className="aspect-auto h-64 w-full">
                <AreaChart data={monthlySeries} margin={{ left: 0, right: 8, top: 8 }}>
                  <defs>
                    <linearGradient id="ing" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} width={72} tickFormatter={(v) => formatCompactCurrency(v)} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(v, n) => `${areaConfig[n as keyof typeof areaConfig].label}: ${formatCurrency(Number(v), 0)}`} />} />
                  <Area dataKey="ingresos" type="monotone" stroke="var(--color-ingresos)" strokeWidth={2.5} fill="url(#ing)" />
                  <Area dataKey="gastos" type="monotone" stroke="var(--color-gastos)" strokeWidth={2} fill="transparent" />
                </AreaChart>
              </ChartContainer>
            </SectionCard>

            <SectionCard title="Por área" description="Monto del mes" icon={BarChart3}>
              <ChartContainer config={barConfig} className="aspect-auto h-64 w-full">
                <BarChart data={byArea} layout="vertical" margin={{ left: 0, right: 8 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="area" tickLine={false} axisLine={false} width={92} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent formatter={(v) => formatCurrency(Number(v), 0)} />} />
                  <Bar dataKey="monto" fill="var(--color-monto)" radius={6} barSize={18} />
                </BarChart>
              </ChartContainer>
            </SectionCard>
          </div>
        </TabsContent>

        <TabsContent value="detalle">
          <SectionCard title="Registros recientes" description="Tabla con estados y responsables" icon={FileText} contentClassName="-mx-4 px-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-4">Folio</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="pr-4">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => {
                  const [first, last] = r.responsable.split(" ")
                  return (
                    <TableRow key={r.id}>
                      <TableCell className="pl-4 font-medium">{r.id}</TableCell>
                      <TableCell>{r.concepto}</TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          <UserAvatar firstName={first} lastName={last} size="sm" />
                          {r.responsable}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{formatDate(r.fecha)}</TableCell>
                      <TableCell className="text-right tabular-nums">{formatCurrency(r.monto)}</TableCell>
                      <TableCell className="pr-4">
                        <StatusBadge {...r.estado} />
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </SectionCard>
        </TabsContent>
      </Tabs>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setOpen(false)
              toast.success("Registro creado (ejemplo)")
            }}
            className="grid gap-4"
          >
            <DialogHeader>
              <DialogTitle>Nuevo registro</DialogTitle>
              <DialogDescription>Ejemplo de formulario en un diálogo.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor="concepto">Concepto</Label>
              <Input id="concepto" placeholder="Ej. Asesoría fiscal mensual" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="monto">Monto</Label>
                <Input id="monto" type="number" min={0} placeholder="0.00" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="area">Área</Label>
                <Select defaultValue="Contabilidad">
                  <SelectTrigger id="area" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {byArea.map((a) => (
                      <SelectItem key={a.area} value={a.area}>
                        {a.area}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Crear registro</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
