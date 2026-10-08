"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, CheckCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { sampleNotifications as initialNotifications } from "@/config/site"
import { cn } from "@/lib/utils"

export function NotificationsMenu() {
  const [items, setItems] = useState(initialNotifications)
  const unread = items.filter((n) => !n.read).length

  const markRead = (id: string) => setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  const markAllRead = () => setItems((prev) => prev.map((n) => ({ ...n, read: true })))

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-lg"
          className="relative rounded-full"
          aria-label={unread ? `Notificaciones (${unread} sin leer)` : "Notificaciones"}
        >
          <Bell className="size-[18px]" />
          {unread > 0 && (
            <span className="absolute top-1 right-1 flex size-4 items-center justify-center rounded-full bg-brand text-[10px] font-semibold text-white ring-2 ring-background">
              {unread}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-3 py-2.5">
          <DropdownMenuLabel className="p-0 text-sm font-semibold text-foreground">Notificaciones</DropdownMenuLabel>
          <Button variant="ghost" size="xs" onClick={markAllRead} disabled={unread === 0} className="text-brand">
            <CheckCheck />
            Marcar todo como leído
          </Button>
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-96 overflow-y-auto p-1">
          {items.map((n) => (
            <DropdownMenuItem key={n.id} asChild className="items-start gap-3 rounded-lg px-2.5 py-2.5">
              <Link href={n.href} onClick={() => markRead(n.id)}>
                <span
                  className={cn("mt-1.5 size-2 shrink-0 rounded-full", n.read ? "bg-transparent" : "bg-brand")}
                  aria-hidden
                />
                <span className="flex flex-1 flex-col gap-0.5">
                  <span className={cn("text-sm", !n.read && "font-medium")}>{n.title}</span>
                  <span className="text-xs text-muted-foreground">{n.description}</span>
                  <span className="text-[11px] text-muted-foreground/80">{n.time}</span>
                </span>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
