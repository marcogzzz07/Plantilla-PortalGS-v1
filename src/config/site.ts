import { BookOpenText, LifeBuoy, MessageCircle } from "lucide-react"

/**
 * Datos del módulo. Al crear un módulo nuevo a partir de la plantilla,
 * este es el primer archivo que se cambia.
 */
export const site = {
  /** Nombre del portal (sidebar y título de la pestaña) */
  name: "Portal GS",
  /** Nombre del módulo, debajo del nombre del portal */
  module: "Módulo de ejemplo",
  company: "González Solís",
  description: "Plantilla de diseño del Portal GS.",
  /** Ruta de inicio del módulo */
  home: "/",
  /** Usuario de ejemplo que se muestra abajo del sidebar (luego vendrá de la sesión real) */
  user: { firstName: "Usuario", lastName: "Demo", role: "Administrador", email: "usuario@ejemplo.com" },
  /** Opciones del menú de ayuda de la barra superior */
  help: [
    { label: "Guía del módulo", icon: BookOpenText },
    { label: "Centro de ayuda", icon: LifeBuoy },
    { label: "Contactar al área responsable", icon: MessageCircle },
  ],
}

/** Avisos de ejemplo para la campana de notificaciones. */
export const sampleNotifications = [
  { id: "N-1", title: "Reporte listo", description: "El reporte mensual ya está disponible.", time: "Hace 10 min", read: false, href: "/" },
  { id: "N-2", title: "Solicitud aprobada", description: "Tu solicitud fue aprobada.", time: "Hace 2 h", read: false, href: "/" },
  { id: "N-3", title: "Nuevo componente", description: "Revisa el catálogo de componentes.", time: "Ayer", read: true, href: "/componentes" },
]
