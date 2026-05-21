# Instrucciones de Bloque: contact-bar
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:485 (desktop), 1:181 (mobile)
> Complejidad: Simple
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Barra de contacto con fondo azul marino oscuro. Muestra un heading "¿Dudas?", un texto de invitación a contactar, y dos botones CTA (teléfono/WhatsApp y email) con fondo azul claro. Sirve como sección de contacto rápido.

---

## 2. Variantes Detectadas

- **Default (desktop):** Layout horizontal — "¿Dudas?" a la izquierda, texto de apoyo a la derecha, CTAs debajo del heading.
- **Mobile:** Layout vertical apilado — heading, texto, y CTAs apilados centrados.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1)
        ├── div (col A)
        │     └── <h2> ← "¿Dudas?"
        └── div (col B)
              ├── <p> ← "Contacta con nosotros y te ayudaremos con cualquier aclaración que necesites."
              └── <p><a href="tel:911718215">91 171 82 15 | WhatsApp 680 573 188</a></p>
  └── div (fila 2)
        └── div (col A)
              └── <p><a href="mailto:premios@fundacionmutua.es">premios@fundacionmutua.es</a></p>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="contact-bar">
  <div class="contact-bar-container">
    <div class="contact-bar-heading">
      <h2 class="contact-bar-title">¿Dudas?</h2>
    </div>
    <div class="contact-bar-body">
      <p class="contact-bar-text">Contacta con nosotros y te ayudaremos con cualquier aclaración que necesites.</p>
    </div>
    <div class="contact-bar-actions">
      <a href="tel:911718215" class="contact-bar-cta">
        91 171 82 15 | WhatsApp 680 573 188
      </a>
      <a href="mailto:premios@fundacionmutua.es" class="contact-bar-cta">
        premios@fundacionmutua.es
      </a>
    </div>
  </div>
</div>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título | `title` | `text` | `string` | sí |
| Texto descriptivo | `description` | `text` | `string` | sí |
| Texto CTA teléfono | `phoneText` | `text` | `string` | sí |
| URL teléfono | `phoneUrl` | `text` | `string` | sí |
| Texto CTA email | `emailText` | `text` | `string` | sí |
| URL email | `emailUrl` | `text` | `string` | sí |

---

## 5. Estilos

```css
.contact-bar {
  background: var(--color-primary-dark); /* #0a5182 */
  padding: var(--spacing-4xl) var(--spacing-2xl);
}
.contact-bar-container {
  max-width: 1160px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: var(--spacing-lg);
  align-items: center;
}
.contact-bar-title {
  font: var(--font-weight-regular) 40px/40px var(--font-family-heading);
  color: var(--color-primary-light); /* #46bded */
}
.contact-bar-text {
  font: var(--font-weight-regular) 20px/30px var(--font-family-heading);
  color: var(--color-primary-lighter); /* #d2f2ff */
}
.contact-bar-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: var(--spacing-lg);
  padding-left: var(--spacing-lg);
}
.contact-bar-cta {
  background: var(--color-primary-light); /* #46bded */
  color: white;
  font: var(--font-weight-bold) 24px/24px var(--font-family-cta);
  padding: var(--spacing-lg);
  letter-spacing: 1px;
  text-decoration: none;
}
.contact-bar-cta:hover {
  background: var(--color-primary); /* #008ec7 */
}

@media (max-width: 767px) {
  .contact-bar-container {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .contact-bar-actions { flex-direction: column; align-items: center; }
  .contact-bar-cta { font-size: 18px; width: 100%; text-align: center; }
}
```

---

## 6. Accesibilidad

- ♿ `href="tel:..."` para el enlace de teléfono — permite click-to-call en móvil.
- ♿ `href="mailto:..."` para el email.
- ♿ Contraste: texto `#46bded` sobre `#0a5182` — verificar ratio WCAG AA (posible insuficiencia con el heading).
- ♿ Contraste: texto blanco sobre `#46bded` en CTAs — ratio ≈3.4:1, puede no cumplir AA para texto grande. ⚠️ Documentar como posible issue de accesibilidad.

---

## 7. Rendimiento

- Sin imágenes.
- Solo CSS, sin JS.
- Sección estática sin animaciones.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| (Ninguna imagen en este bloque) | — | — | — | — |

---

## 9. Notas Adicionales

- La altura fija del contenedor en desktop es 188px (nodo 1:486).
- Los CTAs no tienen border-radius (esquinas rectas) — coherente con el diseño general del sitio.
- ♿ El contraste del título `#46bded` sobre fondo `#0a5182` tiene ratio ≈3.8:1 — cumple AA para texto grande (≥24px) pero podría no cumplir para texto normal.
