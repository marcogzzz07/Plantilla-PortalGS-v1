"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

import { findActiveNavItem } from "@/config/navigation"
import { site } from "@/config/site"

/** Ruta de navegación: Portal GS › Módulo › Sección. */
export function Breadcrumb() {
  const pathname = usePathname()
  const item = findActiveNavItem(pathname)
  const isRoot = pathname === site.home

  return (
    <nav aria-label="Ruta" className="mb-4 flex items-center gap-1.5 text-xs text-muted-foreground">
      <span>{site.name}</span>
      <ChevronRight className="size-3" />
      {isRoot ? (
        <span className="font-medium text-foreground">{site.module}</span>
      ) : (
        <>
          <Link href={site.home} className="hover:text-foreground hover:underline">
            {site.module}
          </Link>
          {item && (
            <>
              <ChevronRight className="size-3" />
              <span className="font-medium text-foreground">{item.title}</span>
            </>
          )}
        </>
      )}
    </nav>
  )
}
