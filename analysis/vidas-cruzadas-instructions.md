# Instrucciones de Bloque: vidas-cruzadas
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:549 (desktop), 1:230 (mobile)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección destacada "Vidas Cruzadas" que muestra historias reales de voluntarios. Tiene un header con el logo de la sección, una zona de texto descriptivo a la izquierda con un SVG decorativo de lazo de fondo, y una lista de historias con imagen + título a la derecha. Fondo azul claro (`#d2f2ff`).

---

## 2. Variantes Detectadas

- **Default (desktop):** Dos columnas — texto descriptivo a la izquierda (max-width 280px), lista de 2 historias a la derecha con imágenes.
- **Mobile:** Layout vertical — texto arriba, historias debajo apiladas.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1 — header con logo)
        └── div (col A)
              └── <picture> ← logo "Vidas Cruzadas" (300×66px)
  └── div (fila 2 — contenido principal)
        ├── div (col A — texto descriptivo)
        │     ├── <p> ← "Conoce más a fondo las vivencias de algunos de los estudiantes..."
        │     ├── <p> ← "En el blog Vidas Cruzadas podrás conocer éstas y otras historias..."
        │     ├── <p> ← "Descubre por qué nos sirven de inspiración para mejorar día a día."
        │     └── <p><a href="...">Ver todas las historias</a></p> ← enlace CTA
        └── div (col B — lista de historias)
              └── <ul> o múltiples <div>
                    ... (ver fila 3 y 4)
  └── div (fila 3 — historia 1)
        ├── div (col A)
        │     └── <picture> ← imagen de la historia (265×200px)
        └── div (col B)
              └── <h3> ← "Aprender en las aulas, educar en casa"
  └── div (fila 4 — historia 2)
        ├── div (col A)
        │     └── <picture> ← imagen de la historia (263×200px)
        └── div (col B)
              └── <h3> ← "Una escuela infantil en Burundi que abre el futuro de un pueblo entero"
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="vidas-cruzadas">
  <div class="vidas-cruzadas-header">
    <picture>
      <img src="..." alt="Vidas Cruzadas" class="vidas-cruzadas-logo" loading="lazy" decoding="async" />
    </picture>
  </div>
  <div class="vidas-cruzadas-body">
    <div class="vidas-cruzadas-text">
      <p>Conoce más a fondo las vivencias de algunos de los estudiantes impulsores de diferentes proyectos de voluntariado universitario.</p>
      <p>En el blog <strong>Vidas Cruzadas</strong> podrás conocer éstas y otras historias que explican la razón de ser de la Fundación Mutua Madrileña.</p>
      <p>Descubre por qué nos sirven de inspiración para mejorar día a día.</p>
      <a href="..." class="vidas-cruzadas-cta">Ver todas las historias</a>
    </div>
    <div class="vidas-cruzadas-decoration" aria-hidden="true">
      <!-- SVG lazo decorativo de fondo -->
    </div>
    <ul class="vidas-cruzadas-stories">
      <li class="vidas-cruzadas-story">
        <a href="..." class="vidas-cruzadas-story-link">
          <div class="vidas-cruzadas-story-image">
            <picture>
              <img src="..." alt="Aprender en las aulas, educar en casa" loading="lazy" decoding="async" />
            </picture>
          </div>
          <h3 class="vidas-cruzadas-story-title">Aprender en las aulas, educar en casa</h3>
        </a>
      </li>
      <li class="vidas-cruzadas-story">
        <a href="..." class="vidas-cruzadas-story-link">
          <div class="vidas-cruzadas-story-image">
            <picture>
              <img src="..." alt="Una escuela infantil en Burundi..." loading="lazy" decoding="async" />
            </picture>
          </div>
          <h3 class="vidas-cruzadas-story-title">Una escuela infantil en Burundi que abre el futuro de un pueblo entero</h3>
        </a>
      </li>
    </ul>
  </div>
</div>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: vidas-cruzadas`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Logo | `logo` | `reference` | `string` | sí |
| Texto descriptivo | `description` | `richtext` | `string` | sí |
| Texto CTA | `ctaText` | `text` | `string` | sí |
| URL CTA | `ctaUrl` | `text` | `string` | sí |
| Imagen decorativa (lazo SVG) | `decorationImage` | `reference` | `string` | no |

**Campos de cada historia** (`id: vidas-cruzadas-item`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Imagen de la historia | `image` | `reference` | `string` | sí |
| Título de la historia | `title` | `text` | `string` | sí |
| URL de la historia | `url` | `text` | `string` | sí |

---

## 5. Estilos

```css
.vidas-cruzadas {
  background: var(--color-primary-lighter); /* #d2f2ff */
  padding: var(--spacing-4xl) 0;
}
.vidas-cruzadas-header {
  background: white;
  box-shadow: var(--shadow-card);
  max-width: 1220px;
  margin: 0 auto;
  padding: var(--spacing-xl) var(--spacing-xl);
  text-align: center;
}
.vidas-cruzadas-logo { width: 300px; height: 66px; }
.vidas-cruzadas-body {
  position: relative;
  max-width: 1120px;
  margin: var(--spacing-xl) auto 0;
  padding: var(--spacing-2xl);
  display: flex;
  gap: var(--spacing-4xl);
}
.vidas-cruzadas-text {
  max-width: 280px;
  flex-shrink: 0;
}
.vidas-cruzadas-text p {
  font: var(--font-weight-regular) 18px/30px var(--font-family-heading);
  color: var(--color-text-dark); /* #26446d */
  margin-bottom: var(--spacing-md);
}
.vidas-cruzadas-cta {
  font: var(--font-weight-medium) 18px/30px var(--font-family-heading);
  color: var(--color-primary-link); /* #177db1 */
  text-decoration: none;
}
.vidas-cruzadas-cta:hover { text-decoration: underline; }
.vidas-cruzadas-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.vidas-cruzadas-stories {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-4xl);
  list-style: none;
  padding: 0;
  position: relative;
  z-index: 1;
}
.vidas-cruzadas-story-link { display: flex; align-items: flex-start; gap: var(--spacing-4xl); text-decoration: none; }
.vidas-cruzadas-story-image {
  width: 265px;
  height: 200px;
  flex-shrink: 0;
  border: 6px solid white;
  box-shadow: var(--shadow-image); /* 15px 15px 0px 0px rgba(165,165,165,0.2) */
}
.vidas-cruzadas-story-image img { width: 100%; height: 100%; object-fit: cover; }
.vidas-cruzadas-story-title {
  font: var(--font-weight-regular) 24px/40px var(--font-family-heading);
  color: var(--color-primary-dark); /* #0a5182 */
}

@media (max-width: 767px) {
  .vidas-cruzadas-body { flex-direction: column; }
  .vidas-cruzadas-text { max-width: 100%; }
  .vidas-cruzadas-story-link { flex-direction: column; }
  .vidas-cruzadas-story-image { width: 100%; height: auto; aspect-ratio: 265/200; }
}
```

---

## 6. Accesibilidad

- ♿ SVG decorativo del lazo: `aria-hidden="true"` + `role="presentation"`.
- ♿ Imágenes de historias: `alt` con el título de la historia.
- ♿ CTA "Ver todas las historias" necesita `aria-label` explícito o contexto suficiente.
- ♿ Cada historia es un enlace completo (imagen + título → misma URL).

---

## 7. Rendimiento

- Todas las imágenes: `loading="lazy"` — sección below-the-fold.
- SVG del lazo: preferiblemente inline para evitar un request adicional, o como background-image CSS.
- Sin JS necesario.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Logo Vidas Cruzadas | celda del bloque → `<picture>` ya en DOM | No (below-fold) | SVG/PNG | 300×66 |
| SVG lazo decorativo | metadatos/CSS background — requiere `createOptimizedPicture` o inline SVG | No | SVG | 1120×250 (decorativo) |
| Imagen historia 1 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | 265×200 (~4:3) |
| Imagen historia 2 | celda del bloque → `<picture>` ya en DOM | No | WebP/JPEG | 263×200 (~4:3) |

---

## 9. Notas Adicionales

- El SVG del lazo (`lazoVidasCruzadas.svg`) actúa como decoración de fondo entre las historias. Se superpone visualmente al área de contenido.
- Las imágenes de las historias tienen un efecto de sombra desplazada (15px, 15px) tipo "foto polaroid".
- El borde blanco grueso (6px) alrededor de las imágenes refuerza el efecto de fotografía impresa.
- ⚠️ En mobile, las historias se apilan verticalmente y el texto descriptivo ocupa todo el ancho.
- ⚠️ El SVG decorativo podría ser complejo de posicionar en mobile — considerar ocultarlo con `display: none` en breakpoints pequeños.
