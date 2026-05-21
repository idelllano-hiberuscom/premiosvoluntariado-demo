# Instrucciones de Bloque: blog-cards
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:496 (desktop), 1:192 (mobile)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección de blog con un header destacado (logo del blog + título + subtítulo), una barra "Últimos post" y un grid de 4 tarjetas de artículos. Cada tarjeta tiene imagen, título, fecha y extracto. Fondo general gris claro (`#eff3f8`).

---

## 2. Variantes Detectadas

- **Default (desktop):** 4 tarjetas en fila horizontal (flex, equal width).
- **Mobile:** 2 columnas × 2 filas (grid 2-col).

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1 — header del blog)
        ├── div (col A)
        │     └── <picture> ← logo del blog (75×78px)
        └── div (col B)
              ├── <h2> ← "El blog de los Premios"
              └── <p> ← "Toda la actualidad e información sobre diferentes aspectos del voluntariado."
  └── div (fila 2 — subtítulo sección)
        └── div (col A)
              └── <h3> ← "Últimos post"
  └── div (fila 3 — post 1)
        ├── div (col A)
        │     └── <picture> ← imagen del artículo
        └── div (col B)
              ├── <h4> ← "Por qué los campos de voluntariado pueden cambiar tu verano"
              ├── <p> ← "18 de mayo de 2026" (fecha)
              └── <p> ← "Hay quienes aprovechan el verano para descansar..." (extracto)
  └── div (fila 4 — post 2)
        ├── div (col A)
        │     └── <picture> ← imagen
        └── div (col B)
              ├── <h4> ← título
              ├── <p> ← fecha
              └── <p> ← extracto
  └── div (fila 5 — post 3)
        ... (misma estructura)
  └── div (fila 6 — post 4)
        ... (misma estructura)
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="blog-cards">
  <div class="blog-cards-header">
    <div class="blog-cards-logo">
      <picture>
        <img src="..." alt="Blog Premios Voluntariado" loading="lazy" decoding="async" />
      </picture>
    </div>
    <div class="blog-cards-intro">
      <h2 class="blog-cards-title">El blog de los Premios</h2>
      <p class="blog-cards-subtitle">Toda la actualidad e información sobre diferentes aspectos del voluntariado.</p>
    </div>
  </div>
  <div class="blog-cards-section-title">
    <h3>Últimos post</h3>
  </div>
  <ul class="blog-cards-grid">
    <li class="blog-cards-item">
      <a href="..." class="blog-cards-link">
        <div class="blog-cards-image">
          <picture>
            <img src="..." alt="..." loading="lazy" decoding="async" />
          </picture>
        </div>
        <h4 class="blog-cards-item-title">Por qué los campos de voluntariado pueden cambiar tu verano</h4>
        <time class="blog-cards-date" datetime="2026-05-18">18 de mayo de 2026</time>
        <p class="blog-cards-excerpt">Hay quienes aprovechan el verano para descansar, viajar o trabajar. Y luego están quienes deciden dedicar unas semanas a convivir con otros jóvenes mientras colaboran…</p>
      </a>
    </li>
    <!-- 3 items más con la misma estructura -->
  </ul>
</div>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: blog-cards`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Logo del blog | `logo` | `reference` | `string` | sí |
| Título del blog | `title` | `text` | `string` | sí |
| Subtítulo | `subtitle` | `text` | `string` | no |
| Título de sección | `sectionTitle` | `text` | `string` | no |

**Campos de cada post** (`id: blog-cards-item`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Imagen | `image` | `reference` | `string` | sí |
| Título del post | `postTitle` | `text` | `string` | sí |
| Fecha | `date` | `text` | `string` | sí |
| Extracto | `excerpt` | `richtext` | `string` | sí |
| URL del post | `url` | `text` | `string` | sí |

---

## 5. Estilos

```css
.blog-cards {
  background: var(--color-bg-grey); /* #eff3f8 */
  padding: var(--spacing-2xl);
  max-width: var(--container-max-width);
}
.blog-cards-header {
  background: white;
  box-shadow: var(--shadow-card);
  display: flex;
  align-items: center;
  padding: var(--spacing-xl) var(--spacing-4xl);
  gap: var(--spacing-3xl);
}
.blog-cards-logo img { width: 75px; height: 78px; }
.blog-cards-title {
  font: var(--font-weight-regular) 32px/40px var(--font-family-heading);
  color: var(--color-text-dark); /* #26446d */
}
.blog-cards-subtitle {
  font: var(--font-weight-regular) 24px/30px var(--font-family-heading);
  color: var(--color-primary-link); /* #177db1 */
  text-align: center;
}
.blog-cards-section-title {
  background: var(--color-primary-lighter); /* #d2f2ff */
  padding: var(--spacing-4xl) var(--spacing-xl);
}
.blog-cards-section-title h3 {
  font: var(--font-weight-regular) 28px/36px var(--font-family-heading);
  color: var(--color-text-dark);
}
.blog-cards-grid {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}
.blog-cards-item {
  flex: 1 0 0;
  padding: var(--spacing-3xl);
  background: linear-gradient(to top, var(--color-bg-grey) 85%, var(--color-primary-lighter) 85%);
}
.blog-cards-image {
  border: 2px solid white;
  aspect-ratio: 220/149;
  overflow: hidden;
}
.blog-cards-image img { width: 100%; height: 100%; object-fit: cover; }
.blog-cards-item-title {
  font: var(--font-weight-medium) 20px/28px var(--font-family-heading);
  color: var(--color-primary-dark); /* #0a5182 */
  padding: var(--spacing-md) 0 var(--spacing-sm);
}
.blog-cards-date {
  display: inline-block;
  background: var(--color-bg-light); /* #f7f9f8 */
  padding: var(--spacing-sm);
  font: var(--font-weight-regular) 14px/20px var(--font-family-heading);
  color: var(--color-primary-link);
}
.blog-cards-excerpt {
  font: var(--font-weight-light) 16px/26px var(--font-family-heading);
  color: var(--color-text-light); /* #6c828d */
  max-height: 160px;
  overflow: hidden;
}

@media (max-width: 767px) {
  .blog-cards-grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--spacing-md); }
  .blog-cards-item { padding: var(--spacing-lg); }
  .blog-cards-header { flex-direction: column; text-align: center; }
}
```

---

## 6. Accesibilidad

- ♿ Usar `<time datetime="...">` para las fechas (permite parsing por screen readers).
- ♿ Imágenes de artículos necesitan `alt` descriptivo.
- ♿ Cada tarjeta completa es un `<a>` (click target grande).
- ♿ `aria-label` en la lista: `aria-label="Últimos artículos del blog"`.

---

## 7. Rendimiento

- Todas las imágenes: `loading="lazy"` — están below-the-fold (detrás del hero, intro y requisitos).
- Extractos con `max-height: 160px; overflow: hidden` — previenen layout shift si el texto es largo.
- Sin JS necesario.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Logo del blog | celda del bloque → `<picture>` ya en DOM | No (below-fold) | PNG/SVG | 75×78 (~1:1) |
| Imagen post 1 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | 220:149 (~3:2) |
| Imagen post 2 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | 220:149 (~3:2) |
| Imagen post 3 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | 220:149 (~3:2) |
| Imagen post 4 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | 220:149 (~3:2) |

---

## 9. Notas Adicionales

- Los 4 post cards tienen un gradiente sutil de fondo (de `#d2f2ff` arriba al `#eff3f8` abajo con punto de corte al 85%).
- Las imágenes de los posts tienen borde blanco de 2px.
- En mobile cambia a grid 2×2 (no es un cambio a 1 columna — se mantienen 2 columnas).
- ⚠️ El header del blog (logo + título + subtítulo) es un bloque visualmente separado del grid de tarjetas. Considerar si deben ser dos bloques separados o uno compuesto.
