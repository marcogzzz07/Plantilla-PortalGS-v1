"use client"

import { Bell, Inbox, Palette, Plus, Trash2, Wallet } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { EmptyState } from "@/components/shared/empty-state"
import { InfoGrid } from "@/components/shared/info-grid"
import { MetricCard } from "@/components/shared/metric-card"
import { PageHeader } from "@/components/shared/page-header"
import { PageTabsList, PageTabsTrigger } from "@/components/shared/page-tabs"
import { SectionCard } from "@/components/shared/section-card"
import { StatusBadge } from "@/components/shared/status-badge"
import { UserAvatar } from "@/components/shared/user-avatar"
import { ejemploEstados } from "@/lib/status"

const colors = [
  { name: "Rojo GS", token: "brand", className: "bg-brand", use: "Acciones clave, sección activa, acentos" },
  { name: "Rojo suave", token: "brand-soft", className: "bg-brand-soft", use: "Fondos de etiquetas y estados destacados" },
  { name: "Carbón", token: "sidebar", className: "bg-sidebar", use: "Sidebar y paneles oscuros" },
  { name: "Texto", token: "foreground", className: "bg-foreground", use: "Texto principal y botón principal" },
  { name: "Fondo", token: "background", className: "bg-background border", use: "Fondo de página" },
  { name: "Tarjeta", token: "card", className: "bg-card border", use: "Tarjetas, tablas y diálogos" },
  { name: "Éxito", token: "success", className: "bg-success", use: "Estados completados o pagados" },
  { name: "Advertencia", token: "warning", className: "bg-warning", use: "Pendientes y riesgos" },
  { name: "Información", token: "info", className: "bg-info", use: "Estados en proceso" },
  { name: "Error", token: "destructive", className: "bg-destructive", use: "Errores, vencidos y acciones de borrar" },
]

/** Catálogo vivo del diseño: cada bloque indica el archivo del componente. */
export function ComponentCatalog() {
  return (
    <div className="space-y-6">
      <PageHeader
        icon={Palette}
        title="Componentes"
        badge="Sistema de diseño"
        description="Todas las piezas del diseño del Portal GS, funcionando. Debajo de cada título está el archivo que debes importar."
      />

      <Block title="Colores" file="src/app/globals.css">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {colors.map((c) => (
            <div key={c.token} className="space-y-2">
              <div className={`h-14 rounded-xl ${c.className}`} />
              <div>
                <p className="text-sm font-medium">{c.name}</p>
                <p className="text-xs text-muted-foreground">
                  <code>{c.token}</code> · {c.use}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Tipografía" file="Figtree · src/app/layout.tsx">
        <div className="space-y-2">
          <p className="text-[28px] leading-tight font-bold tracking-tight">Título de página · 28 px bold</p>
          <p className="text-base font-semibold">Título de tarjeta · 16 px semibold</p>
          <p className="text-sm">Texto normal · 14 px</p>
          <p className="text-xs text-muted-foreground">Texto secundario · 12 px gris</p>
        </div>
      </Block>

      <Block title="Botones" file="src/components/ui/button.tsx">
        <div className="flex flex-wrap items-center gap-2">
          <Button>Principal</Button>
          <Button variant="outline">Secundario</Button>
          <Button variant="secondary">Suave</Button>
          <Button variant="ghost">Fantasma</Button>
          <Button variant="destructive">
            <Trash2 />
            Eliminar
          </Button>
          <Button variant="link">Enlace</Button>
          <Button size="sm">
            <Plus />
            Chico
          </Button>
          <Button size="icon" variant="outline" aria-label="Notificaciones">
            <Bell />
          </Button>
        </div>
      </Block>

      <Block title="Etiquetas de estado" file="src/components/shared/status-badge.tsx · estados en src/lib/status.ts">
        <div className="flex flex-wrap gap-2">
          {Object.values(ejemploEstados).map((s) => (
            <StatusBadge key={s.label} {...s} />
          ))}
        </div>
      </Block>

      <Block title="Indicadores" file="src/components/shared/metric-card.tsx">
        <div className="grid gap-4 sm:grid-cols-3">
          <MetricCard label="Con ayuda" value="1,240" unit="registros" icon={Wallet} accent="green" helper="Texto de apoyo" />
          <MetricCard label="Con barra" value="68 %" icon={Wallet} accent="blue" progress={68} helper="Meta: 80 %" />
          <MetricCard label="Como filtro" value={12} icon={Wallet} accent="amber" selected href="#" helper="Seleccionado" />
        </div>
      </Block>

      <Block title="Pestañas" file="src/components/shared/page-tabs.tsx">
        <Tabs defaultValue="uno">
          <PageTabsList>
            <PageTabsTrigger value="uno">Primera</PageTabsTrigger>
            <PageTabsTrigger value="dos">Segunda</PageTabsTrigger>
            <PageTabsTrigger value="tres">Tercera</PageTabsTrigger>
          </PageTabsList>
        </Tabs>
      </Block>

      <Block title="Formularios" file="src/components/ui/input.tsx · select.tsx · textarea.tsx · checkbox.tsx · slider.tsx">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="c-nombre">Campo de texto</Label>
            <Input id="c-nombre" placeholder="Escribe aquí" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="c-select">Lista de opciones</Label>
            <Select defaultValue="a">
              <SelectTrigger id="c-select" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">Opción A</SelectItem>
                <SelectItem value="b">Opción B</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2 md:col-span-2">
            <Label htmlFor="c-texto">Comentario</Label>
            <Textarea id="c-texto" placeholder="Escribe un comentario…" />
          </div>
          <label className="flex items-center gap-2 text-sm">
            <Checkbox defaultChecked /> Casilla de confirmación
          </label>
          <div className="grid gap-2">
            <Label>Barra deslizable</Label>
            <Slider defaultValue={[60]} max={100} step={5} />
          </div>
        </div>
      </Block>

      <div className="grid gap-6 lg:grid-cols-2">
        <Block title="Datos en rejilla y avatares" file="src/components/shared/info-grid.tsx · user-avatar.tsx">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <UserAvatar firstName="Ana" lastName="López" highlight />
              <UserAvatar firstName="Luis" lastName="Pérez" />
              <UserAvatar firstName="Sofía" lastName="Ruiz" size="lg" />
            </div>
            <InfoGrid
              items={[
                { label: "Folio", value: "F-1042" },
                { label: "Responsable", value: "Ana López" },
                { label: "Área", value: "Contabilidad" },
                { label: "Fecha", value: "22 sep 2026" },
              ]}
            />
          </div>
        </Block>

        <Block title="Progreso y avisos" file="src/components/ui/progress.tsx · sonner (toast)">
          <div className="space-y-4">
            <Progress value={45} className="h-2" />
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={() => toast.success("Cambios guardados")}>
                Aviso de éxito
              </Button>
              <Button variant="outline" onClick={() => toast.error("No se pudo guardar")}>
                Aviso de error
              </Button>
              <Button variant="outline" onClick={() => toast.info("Dato informativo")}>
                Aviso informativo
              </Button>
            </div>
          </div>
        </Block>
      </div>

      <Block title="Estado vacío" file="src/components/shared/empty-state.tsx">
        <EmptyState icon={Inbox} title="No hay registros todavía" description="Cuando agregues el primero, aparecerá aquí." action={<Button>Agregar registro</Button>} />
      </Block>

      <p className="text-xs text-muted-foreground">
        También se usan en el tablero de ejemplo (Inicio): gráficas con <code>src/components/ui/chart.tsx</code>, tablas con <code>table.tsx</code> y
        diálogos con <code>dialog.tsx</code>.
      </p>
    </div>
  )
}

function Block({ title, file, children }: { title: string; file: string; children: React.ReactNode }) {
  return (
    <SectionCard title={title} description={file}>
      {children}
    </SectionCard>
  )
}
