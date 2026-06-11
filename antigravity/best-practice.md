# Checklist de Mejores Prácticas: App de Bienes Raíces (Next.js)

## 🚀 1. Arquitectura y Rendimiento
* [ ] **Server Components (RSC):** Úsalos por defecto para SEO y carga rápida.
* [ ] **`'use client'` Limitado:** Solo para mapas, calculadoras, carruseles y formularios.
* [ ] **`<Image />` de Next.js:** Uso obligatorio para fotos inmobiliarias (lazy loading, WebP).
* [ ] **ISR / PPR:** Páginas estáticas con actualizaciones incrementales para precios y disponibilidad.
* [ ] **Revalidación (`revalidateTag`):** Actualizar caché bajo demanda cuando se venda o modifique una propiedad.

## 🔍 2. SEO Especializado
* [ ] **`generateMetadata`:** Títulos dinámicos (ej. "Casa de 4 Habs en Madrid | Empresa").
* [ ] **Sitemaps Dinámicos:** `sitemap.ts` actualizado con cada nueva propiedad.
* [ ] **JSON-LD (Schema Markup):** Añadir `RealEstateListing` para "rich snippets" en Google.
* [ ] **Rutas Semánticas:** URLs descriptivas como `/propiedades/venta/ciudad/id`.

## 🎨 3. UX/UI Premium
* [ ] **Diseño Visual:** Estilo minimalista, espacios amplios, protagonismo absoluto de la fotografía.
* [ ] **Filtros por URL:** Filtros de búsqueda basados en `searchParams` (sin recarga de página).
* [ ] **Mapas Interactivos:** Mapbox/Google Maps con "clustering" (agrupación) de propiedades.
* [ ] **Galerías Full-Screen:** Lightbox inmersivo para ver detalles de fotos.
* [ ] **Micro-interacciones:** Hover effects fluidos y animaciones suaves de transición.

## 💾 4. Datos y Backend
* [ ] **CMS Headless / BaaS:** Supabase, Sanity o Contentful.
* [ ] **Búsqueda Geoespacial:** Uso de PostGIS para búsquedas por proximidad o polígono en el mapa.
* [ ] **CDN Rápido:** Entrega optimizada para cientos de fotos pesadas y videos.

## 💡 5. Features Clave (Recomendaciones)
* [ ] **Calculadora de Hipoteca:** Widget interactivo por propiedad.
* [ ] **Tours 3D / Video:** Integración con Matterport o videos embebidos.
* [ ] **Sistema de Favoritos:** Cuentas de usuario para guardar casas.
* [ ] **Alertas de Precio:** Notificaciones por email si una casa guardada baja de precio.
* [ ] **Programador de Visitas:** Calendario integrado (tipo Calendly) para tours físicos/virtuales.

## 🔒 6. Seguridad y Accesibilidad
* [ ] **Server Actions:** Procesamiento seguro de formularios de contacto (Leads).
* [ ] **Anti-Spam y Validación:** Uso de Zod y Turnstile/reCAPTCHA.
* [ ] **Textos `alt` Estrictos:** Obligatorio en todas las imágenes de propiedades para SEO y accesibilidad.
