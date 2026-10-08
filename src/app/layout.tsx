import type { Metadata } from "next"
import { Figtree } from "next/font/google"

import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { site } from "@/config/site"
import "./globals.css"

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} · ${site.module}`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster theme="light" position="bottom-right" richColors closeButton />
      </body>
    </html>
  )
}
