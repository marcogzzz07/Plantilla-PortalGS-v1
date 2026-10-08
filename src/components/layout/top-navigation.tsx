"use client"

import { Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlobalSearch } from "./global-search"
import { HelpMenu } from "./help-menu"
import { NotificationsMenu } from "./notifications-menu"

export function TopNavigation({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 bg-background/85 px-4 backdrop-blur-md sm:px-6 lg:px-8">
      <Button variant="ghost" size="icon-lg" className="lg:hidden" onClick={onMenuClick} aria-label="Abrir menú">
        <Menu className="size-5" />
      </Button>

      <GlobalSearch className="max-w-md bg-card" />

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <HelpMenu />
        <NotificationsMenu />
      </div>
    </header>
  )
}
