"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight, Search, SearchX } from "lucide-react"

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { navigation } from "@/config/navigation"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"

const sections = navigation.flatMap((s) => s.items)

function normalize(text: string) {
  return text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
}

/** Buscador de secciones con atajo ⌘K / Ctrl+K. Agrega aquí otros tipos de resultado de tu módulo. */
export function GlobalSearch({ className }: { className?: string }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((value) => !value)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const q = normalize(query.trim())
  const results = q ? sections.filter((item) => normalize(`${item.title} ${item.description}`).includes(q)) : sections.slice(0, 5)

  function close() {
    setOpen(false)
    setQuery("")
  }

  function goTo(href: string) {
    close()
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={cn(
          "flex h-9 w-full items-center gap-2.5 rounded-full border bg-muted/60 px-3.5 text-sm text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
          className
        )}
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Buscar secciones…</span>
        <kbd className="hidden rounded-md border bg-background px-1.5 py-0.5 font-sans text-[10px] font-medium sm:inline">⌘K</kbd>
      </button>

      <Dialog open={open} onOpenChange={(value) => (value ? setOpen(true) : close())}>
        <DialogContent className="top-[15%] translate-y-0 gap-0 overflow-hidden p-0 sm:max-w-xl" showCloseButton={false}>
          <DialogTitle className="sr-only">Buscar en {site.name}</DialogTitle>
          <DialogDescription className="sr-only">Busca secciones del módulo.</DialogDescription>
          <div className="flex items-center gap-3 border-b px-4">
            <Search className="size-4 text-muted-foreground" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) goTo(results[0].href)
              }}
              placeholder="Escribe el nombre de una sección…"
              className="h-12 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <kbd className="rounded-md border px-1.5 py-0.5 text-[10px] text-muted-foreground">Esc</kbd>
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {results.length > 0 && (
              <div className="mb-2">
                <p className="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">{q ? "Secciones" : "Accesos rápidos"}</p>
                <div className="space-y-0.5">
                  {results.map((item) => {
                    const Icon = item.icon
                    return (
                      <button
                        key={item.href}
                        type="button"
                        onClick={() => goTo(item.href)}
                        className="group flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left text-sm transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
                      >
                        <span className="flex size-8 items-center justify-center rounded-lg bg-muted text-foreground">
                          <Icon className="size-4" />
                        </span>
                        <span className="flex min-w-0 flex-1 flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="truncate text-xs text-muted-foreground">{item.description}</span>
                        </span>
                        <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100" />
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            {q && results.length === 0 && (
              <div className="flex flex-col items-center gap-2 py-10 text-center text-sm text-muted-foreground">
                <SearchX className="size-6" />
                No encontramos resultados para “{query}”.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
