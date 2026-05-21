# Instrucciones de Bloque: requirements
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:396 (desktop), 1:118 (mobile)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección de dos tarjetas informativas: la tarjeta izquierda muestra los requisitos de participación (con ítems con check icon) y la tarjeta derecha muestra enlaces de descarga/información con un CTA para empezar. Fondo blanco, tarjetas con sombra.

---

## 2. Variantes Detectadas

- **Default (desktop):** Dos tarjetas lado a lado, cada una de ~360px de ancho.
- **Mobile:** Tarjetas apiladas verticalmente a 100% de ancho.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1 — tarjeta "Requisitos")
        ├── div (col A — encabezado)
        │     ├── <h2> ← "¿Eres universitario y colaboras en algún proyecto de voluntariado?"
        │     └── <p> ← subtítulo "Puedes participar en los Premios si cumples los siguientes requisitos"
        └── div (col B — lista de requisitos)
              └── <ul>
                    ├── <li> ← "Que lleve en marcha al menos un año"
                    ├── <li> ← "Que esté gestionado mayoritariamente por estudiantes..."
                    ├── <li> ← "Que tenga como destinatarios a personas..."
                    ├── <li> ← "Que se desarrolle, íntegra o parcialmente..."
                    └── <li> ← "El promotor del proyecto puede ser un solo estudiante..."
  └── div (fila 2 — tarjeta "Empieza por aquí")
        ├── div (col A — encabezado)
        │     └── <h2> ← "Empieza por aquí"
        └── div (col B — enlaces)
              └── <ul>
                    ├── <li><a href="..."> ← "Descárgate las Bases de los XIII Premios..."</a></li>
                    ├── <li><a href="..."> ← "Descárgate la Ficha de inscripción..."</a></li>
                    └── <li><a href="..."> ← "Obtén más información sobre cómo presentar..."</a></li>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="requirements">
  <div class="requirements-grid">
    <div class="requirements-card requirements-card--checklist">
      <div class="requirements-card-header">
        <h2 class="requirements-card-title">¿Eres universitario y colaboras en algún proyecto de voluntariado?</h2>
        <p class="requirements-card-subtitle">Puedes participar en los Premios si cumples los siguientes requisitos</p>
      </div>
      <ul class="requirements-list">
        <li class="requirements-list-item">
          <span class="requirements-check-icon" aria-hidden="true">✓</span>
          Que lleve en marcha al menos un año
        </li>
        <!-- más items -->
      </ul>
    </div>
    <div class="requirements-card requirements-card--links">
      <div class="requirements-card-header">
        <h2 class="requirements-card-title">Empieza por aquí</h2>
      </div>
      <ul class="requirements-links">
        <li class="requirements-link-item">
          <a href="..." class="requirements-link">
            <span class="requirements-link-icon" aria-hidden="true">↓</span>
            Descárgate las Bases de los XIII Premios...
          </a>
        </li>
        <!-- más items -->
      </ul>
    </div>
  </div>
</div>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: requirements`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| (Sin campos propios del contenedor — solo items) | — | — | — | — |

**Campos de cada tarjeta** (`id: requirements-card`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título | `title` | `text` | `string` | sí |
| Subtítulo | `subtitle` | `text` | `string` | no |
| Tipo de tarjeta | `cardType` | `select` | `string` | sí |
| Contenido (lista) | `content` | `richtext` | `string` | sí |

---

## 5. Estilos

```css
.requirements {
  padding: var(--spacing-4xl) var(--spacing-2xl);
  max-width: var(--container-max-width);
  margin: 0 auto;
}
.requirements-grid {
  display: flex;
  gap: var(--spacing-xl);
  justify-content: center;
}
.requirements-card {
  width: 360px;
  background: var(--color-bg-white);
  box-shadow: var(--shadow-card);
}
.requirements-card-header {
  padding: var(--spacing-xl) var(--spacing-2xl);
  background: var(--color-bg-grey);
  border-bottom: 3px solid var(--color-bg-divider);
}
.requirements-card-title {
  font: var(--font-weight-regular) 26px/36px var(--font-family-heading);
  color: var(--color-primary-dark);
}
.requirements-card-subtitle {
  font: var(--font-weight-regular) 16px/24px var(--font-family-body);
  color: var(--color-text-body);
}
.requirements-list {
  padding: var(--spacing-xl) var(--spacing-2xl);
  list-style: none;
}
.requirements-list-item {
  font: var(--font-weight-regular) 16px/24px var(--font-family-body);
  color: var(--color-text-body);
  padding: var(--spacing-sm) 0;
  border-bottom: 1px solid var(--color-bg-divider);
}
.requirements-check-icon {
  color: var(--color-primary);
  margin-right: var(--spacing-sm);
}
.requirements-link {
  font: var(--font-weight-semibold) 16px/20px var(--font-family-cta);
  color: var(--color-primary-link);
  text-decoration: underline;
}

@media (max-width: 767px) {
  .requirements-grid { flex-direction: column; align-items: center; }
  .requirements-card { width: 100%; max-width: 360px; }
}
```

---

## 6. Accesibilidad

- ♿ Los iconos check (✓) deben tener `aria-hidden="true"` — son decorativos.
- ♿ Los enlaces de descarga deben indicar tipo de archivo y peso si es PDF.
- ♿ Las tarjetas podrían beneficiarse de `role="region"` con `aria-labelledby` apuntando al título.

---

## 7. Rendimiento

- Sin imágenes en este bloque (solo iconos que pueden ser CSS/SVG inline).
- `loading="lazy"` no aplica.
- Solo CSS — no requiere JS.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Icono check (tick) | CSS pseudo-element o SVG inline | No | SVG/CSS | Decorativo |
| Icono descarga (flecha) | CSS pseudo-element o SVG inline | No | SVG/CSS | Decorativo |

---

## 9. Notas Adicionales

- Las tarjetas tienen estructura tipo tabla con `<th>`-like header (fondo gris `#eff3f8`) + body con lista.
- En desktop, las dos tarjetas están perfectamente alineadas horizontalmente.
- ⚠️ El diseño no muestra claramente si los ítems de la lista son links o texto plano — los de la tarjeta izquierda parecen texto plano; los de la tarjeta derecha son links.
- La sección de requisitos parece estar posicionada sobre un fondo blanco sin contenedor visual adicional.
