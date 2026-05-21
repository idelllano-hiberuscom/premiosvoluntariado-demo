# Instrucciones de Bloque: hero-carousel
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:325 (desktop), 1:3 (mobile)
> Complejidad: Alta
> Requiere JS: sí
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Carousel hero a pantalla completa con 6 slides de contenido visual/video. Incluye paginación (dots), botones prev/next, y un panel lateral flotante con información de ediciones anteriores. Ocupa el primer viewport visible y contiene la imagen LCP.

---

## 2. Variantes Detectadas

- **Default:** Carousel con panel lateral de ediciones visible a la derecha.
- **Mobile:** Carousel a ancho completo sin panel lateral. Flechas prev/next fuera del slide.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1 — config: número romano + año)
        └── div (col A)
              └── <p> ← "XIII, 2025" (texto de edición)
  └── div (fila 2 — slide 1)
        ├── div (col A)
        │     └── <picture> ← imagen/thumbnail del video
        └── div (col B)
              ├── <h2> ← título del slide "Creciendo juntos ASU"
              └── <p><a href="...">Ver vídeo</a></p> ← enlace CTA
  └── div (fila 3 — slide 2)
        ├── div (col A)
        │     └── <picture> ← imagen/thumbnail
        └── div (col B)
              ├── <h2> ← título
              └── <p><a href="...">Ver vídeo</a></p>
  ... (filas 4-7: slides 3-6 con la misma estructura)
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="hero-carousel">
  <div class="hero-carousel-viewport">
    <div class="hero-carousel-track">
      <div class="hero-carousel-slide hero-carousel-slide--active" role="tabpanel" aria-label="Slide 1 de 6">
        <div class="hero-carousel-media">
          <picture>
            <img src="..." alt="Creciendo juntos ASU" loading="eager" fetchpriority="high" />
          </picture>
          <button class="hero-carousel-play" aria-label="Reproducir vídeo">▶</button>
        </div>
        <div class="hero-carousel-content">
          <h2 class="hero-carousel-title">Creciendo juntos ASU</h2>
          <a href="..." class="hero-carousel-cta button">Ver vídeo</a>
        </div>
      </div>
      <!-- slides 2-6: misma estructura con loading="lazy" -->
    </div>
  </div>
  <div class="hero-carousel-controls">
    <button class="hero-carousel-prev" aria-label="Slide anterior">‹</button>
    <div class="hero-carousel-dots" role="tablist">
      <button class="hero-carousel-dot hero-carousel-dot--active" role="tab" aria-selected="true" aria-label="Ir a slide 1"></button>
      <button class="hero-carousel-dot" role="tab" aria-selected="false" aria-label="Ir a slide 2"></button>
      <!-- 4 dots más -->
    </div>
    <button class="hero-carousel-next" aria-label="Slide siguiente">›</button>
  </div>
  <aside class="hero-carousel-editions">
    <div class="hero-carousel-edition hero-carousel-edition--current">
      <p class="hero-carousel-edition-title">XIII Edición, 2025</p>
      <p class="hero-carousel-edition-status">Cerrado el plazo de inscripción</p>
      <a href="..." class="hero-carousel-edition-link">Más información</a>
    </div>
    <div class="hero-carousel-edition">
      <p class="hero-carousel-edition-title">XII Edición, 2024</p>
      <a href="..." class="hero-carousel-edition-link">Conoce los ganadores de la XII edición</a>
    </div>
  </aside>
</div>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: hero-carousel`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título de edición | `editionLabel` | `text` | `string` | sí |

**Campos de cada slide** (`id: hero-carousel-item`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Imagen/thumbnail | `image` | `reference` | `string` | sí |
| Título del slide | `title` | `text` | `string` | sí |
| URL del vídeo | `videoUrl` | `text` | `string` | no |
| Texto del CTA | `ctaText` | `text` | `string` | no |
| URL del CTA | `ctaUrl` | `text` | `string` | no |

**Campos del panel de ediciones** (`id: hero-carousel-edition`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título edición | `editionTitle` | `text` | `string` | sí |
| Texto estado | `editionStatus` | `text` | `string` | no |
| Texto enlace | `editionLinkText` | `text` | `string` | sí |
| URL enlace | `editionLinkUrl` | `text` | `string` | sí |

---

## 5. Estilos

```css
.hero-carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: linear-gradient(180deg, #0a4f80 0%, rgba(10, 79, 128, 0.85) 70%, white 100%);
}
.hero-carousel-viewport { max-width: var(--container-max-width); margin: 0 auto; }
.hero-carousel-track { display: flex; transition: transform 0.4s ease; }
.hero-carousel-slide { min-width: 100%; display: flex; gap: var(--spacing-2xl); }
.hero-carousel-media { flex: 1; position: relative; aspect-ratio: 16/9; }
.hero-carousel-media img { width: 100%; height: 100%; object-fit: cover; }
.hero-carousel-content { display: flex; flex-direction: column; justify-content: center; }
.hero-carousel-title { font: var(--font-weight-semibold) 18px/24px var(--font-family-cta); color: white; }
.hero-carousel-cta { font: var(--font-weight-bold) 24px/24px var(--font-family-cta); color: white; letter-spacing: 1px; }

/* Dots */
.hero-carousel-dot { width: 15px; height: 4px; border-radius: 2px; background: rgba(255,255,255,0.4); }
.hero-carousel-dot--active { background: var(--color-primary-light); width: 26px; }

/* Editions panel */
.hero-carousel-editions {
  position: absolute; right: 32px; top: 50%; transform: translateY(-50%);
  width: 360px; background: white; box-shadow: var(--shadow-card);
}
.hero-carousel-edition { padding: var(--spacing-lg); }
.hero-carousel-edition--current { background: var(--color-bg-grey); }
```

---

## 6. Accesibilidad

- ♿ `role="tablist"` / `role="tab"` en dots para navegación por teclado.
- ♿ `aria-label` en cada dot con número de slide.
- ♿ `aria-label` en botones prev/next.
- ♿ `role="tabpanel"` en cada slide con `aria-label`.
- ♿ Cada imagen necesita alt text descriptivo del contenido del vídeo.
- ♿ Botón play del vídeo necesita `aria-label="Reproducir vídeo"`.

---

## 7. Rendimiento

- **LCP:** La imagen del primer slide es el candidato principal a LCP — `loading="eager"` + `fetchpriority="high"`.
- Slides 2-6: `loading="lazy"` + `decoding="async"`.
- El carousel requiere JS mínimo (transformX en el track, event listeners para dots/prev/next).
- ⚠️ No pre-cargar imágenes de todos los slides — solo el activo + el siguiente.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Thumbnail slide 1 | celda del bloque → `<picture>` ya en DOM | **SÍ** (above-the-fold confirmado) | WebP/JPEG | ≈16:9 |
| Thumbnails slides 2-6 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | ≈16:9 |

---

## 9. Notas Adicionales

- ⚠️ El panel lateral de ediciones aparece flotante sobre el carousel. En mobile desaparece o se reposiciona debajo del carousel. Requiere decisión de implementación: ¿bloque separado o sección del hero?
- ⚠️ El número romano (XIII) aparece con tipografía `Rubik:Regular 40px #46bded`. Es el primer elemento del carousel que se usa como configuración del bloque.
- Los 6 slides detectados tienen thumbnails de vídeo con un botón play centrado.
- El gradiente de fondo cambia según el slide activo (no confirmado si es dinámico o estático).
