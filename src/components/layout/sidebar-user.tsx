"use client"

import { ChevronsUpDown, LogOut, Settings } from "lucide-react"
import { toast } from "sonner"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { UserAvatar } from "@/components/shared/user-avatar"
import { site } from "@/config/site"

/** Usuario en la parte inferior del sidebar. Los datos vienen de `site.user` hasta conectar la sesión real. */
export function SidebarUser() {
  const { firstName, lastName, role, email } = site.user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors outline-none hover:bg-sidebar-accent/60 focus-visible:ring-2 focus-visible:ring-sidebar-ring">
        <UserAvatar firstName={firstName} lastName={lastName} highlight />
        <span className="flex min-w-0 flex-1 flex-col leading-tight">
          <span className="truncate text-sm font-semibold text-white">
            {firstName} {lastName}
          </span>
          <span className="truncate text-xs text-sidebar-foreground/70">{role}</span>
        </span>
        <ChevronsUpDown className="size-4 text-sidebar-foreground/50" />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="w-60">
        <DropdownMenuLabel className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold">
            {firstName} {lastName}
          </span>
          <span className="text-xs font-normal text-muted-foreground">{email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={() => toast.info("Preferencias: disponible próximamente.")}>
          <Settings />
          Preferencias
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onSelect={() => toast("Sesión de ejemplo", { description: "La plantilla no tiene autenticación." })}>
          <LogOut />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
