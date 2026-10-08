# Plantilla Portal GS

El diseño del Portal GS (el mismo de Mi GS) listo para empezar cualquier módulo nuevo: finanzas,
operaciones, comercial, etc. Trae el menú lateral, la barra superior, los colores y la tipografía de
GS y todos los componentes (indicadores, tarjetas, tablas, pestañas, gráficas, formularios,
diálogos y avisos), sin datos de ningún módulo.

## Ver la plantilla

```bash
npm install
npm run dev
```

Abre <http://localhost:3002>. Hay dos páginas de ejemplo:

- **Inicio** (`/`): un tablero de muestra que combina los componentes.
- **Componentes** (`/componentes`): el catálogo de cada pieza, con el archivo que la contiene.

## Empezar un módulo nuevo

1. Copia esta carpeta con otro nombre, por ejemplo `Finanzas-GS`, sin la carpeta `.git`. También
   puedes marcar el repositorio en GitHub como *template* y usar **Use this template**.
2. Cambia los datos del módulo en **`src/config/site.ts`**: nombre, usuario, opciones de ayuda y avisos.
3. Cambia el menú en **`src/config/navigation.ts`**: secciones, grupos desplegables, íconos y contadores.
4. Crea tus páginas en `src/app/(app)/<sección>/page.tsx`. Mientras una sección del menú no
   tenga página, se muestra como "en construcción".
5. Cuando ya no los necesites, borra `src/components/demo/` y la página `componentes`.

Si el módulo ya existe, también puedes copiar solo lo que necesites: `src/app/globals.css` (colores),
`src/components/ui`, `src/components/shared`, `src/components/layout`, `src/lib/format.ts`,
`src/lib/status.ts` y `public/brand/gs-logo.png`.

## Qué hay en cada carpeta

```text
src/
├── app/
│   ├── globals.css          # Colores y radios del diseño (tokens)
│   ├── layout.tsx           # Tipografía Figtree y avisos (toasts)
│   └── (app)/               # Páginas que llevan el menú lateral
├── config/
│   ├── site.ts              # Nombre del módulo, usuario, ayuda y avisos
│   └── navigation.ts        # Menú lateral
├── components/
│   ├── ui/                  # Componentes base (shadcn/ui): botones, tablas, diálogos, gráficas…
│   ├── shared/              # Piezas del Portal GS: encabezado, indicador, tarjeta, pestañas, estados…
│   ├── layout/              # Menú lateral, barra superior, buscador, notificaciones, usuario
│   └── demo/                # Ejemplos (se pueden borrar)
└── lib/
    ├── format.ts            # Fechas, moneda (MXN), números, porcentajes
    └── status.ts            # Estados y sus colores
```

## Reglas del diseño

- **Colores:** rojo GS (`brand`) para la sección activa y los acentos; carbón para el sidebar;
  el botón principal es oscuro. Los estados usan éxito, advertencia, información y error, siempre
  con una palabra, nunca solo con color.
- **Encabezado de cada página:** `PageHeader` con ícono, título, etiqueta y acciones a la derecha.
- **Indicadores:** fila de `MetricCard` arriba de la página.
- **Contenido:** dentro de `SectionCard` (título, descripción e ícono).
- **Montos:** `formatCurrency` y `formatCompactCurrency` de `lib/format.ts`.

## Stack

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui (Radix) · Lucide · Recharts · Sonner.
Corre en el puerto 3002 para no chocar con Mi GS (3000) ni con Alere (3001).
