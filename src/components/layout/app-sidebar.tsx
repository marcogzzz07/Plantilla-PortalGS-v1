"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown } from "lucide-react"

import { findActiveNavItem, navigation, type NavItem, type NavSection } from "@/config/navigation"
import { site } from "@/config/site"
import { cn } from "@/lib/utils"
import { BrandLogo } from "./brand-logo"
import { SidebarUser } from "./sidebar-user"

interface AppSidebarProps {
  /** Se llama al navegar (cierra el menú en tablet/móvil). */
  onNavigate?: () => void
  className?: string
}

export function AppSidebar({ onNavigate, className }: AppSidebarProps) {
  const pathname = usePathname()
  const active = findActiveNavItem(pathname)

  return (
    <div className={cn("flex h-full flex-col bg-sidebar text-sidebar-foreground", className)}>
      <div className="px-5 pt-6 pb-6">
        <Link href={site.home} onClick={onNavigate}>
          <BrandLogo />
        </Link>
      </div>

      <nav className="scrollbar-thin flex-1 space-y-6 overflow-y-auto px-3 pb-6" aria-label="Navegación principal">
        {navigation.map((section) =>
          section.group ? (
            <NavGroup key={section.label} section={section} activeHref={active?.href} onNavigate={onNavigate} />
          ) : (
            <div key={section.label}>
              <p className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-sidebar-foreground/50 uppercase">{section.label}</p>
              <ul className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink key={item.href} item={item} active={active?.href === item.href} onNavigate={onNavigate} />
                ))}
              </ul>
            </div>
          )
        )}
      </nav>

      <div className="border-t border-sidebar-border p-3">
        <SidebarUser />
      </div>
    </div>
  )
}

/** Grupo desplegable (p. ej. "Mi GS" con sus secciones). */
function NavGroup({ section, activeHref, onNavigate }: { section: NavSection; activeHref?: string; onNavigate?: () => void }) {
  const containsActive = section.items.some((i) => i.href === activeHref)
  const [open, setOpen] = useState(!section.defaultCollapsed || containsActive)
  const Icon = section.group!.icon
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          containsActive && "text-sidebar-accent-foreground",
          !open && containsActive && "bg-sidebar-accent"
        )}
      >
        <Icon className="size-4 shrink-0" />
        <span className="flex-1 text-left">{section.group!.title}</span>
        <ChevronDown className={cn("size-4 opacity-60 transition-transform", !open && "-rotate-90")} />
      </button>
      {open && (
        <ul className="mt-0.5 ml-5 space-y-0.5 border-l border-sidebar-border pl-2">
          {section.items.map((item) => (
            <NavLink key={item.href} item={item} active={activeHref === item.href} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </div>
  )
}

function NavLink({ item, active, onNavigate }: { item: NavItem; active: boolean; onNavigate?: () => void }) {
  const Icon = item.icon
  return (
    <li>
      <Link
        href={item.href}
        onClick={onNavigate}
        aria-current={active ? "page" : undefined}
        className={cn(
          "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
          "hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
          "focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:outline-none",
          active && "bg-sidebar-accent font-semibold text-sidebar-accent-foreground"
        )}
      >
        {active && <span className="absolute top-2 bottom-2 -left-0.5 w-[3px] rounded-full bg-sidebar-primary" aria-hidden />}
        <Icon className={cn("size-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100", active && "opacity-100")} />
        <span className="flex-1 truncate">{item.title}</span>
        {item.badge ? (
          <span className="rounded-full bg-sidebar-primary px-1.5 py-px text-[10px] font-semibold text-sidebar-primary-foreground tabular-nums">
            {item.badge}
          </span>
        ) : null}
      </Link>
    </li>
  )
}
