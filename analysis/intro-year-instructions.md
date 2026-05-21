# Instrucciones de Bloque: intro-year
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:386 (desktop), 1:105 (mobile)
> Complejidad: Simple
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Sección de presentación que muestra el año de la edición actual en grande, un logo del premio y un texto descriptivo sobre el propósito de los premios. Fondo azul con gradiente. Aparece justo debajo del hero carousel.

---

## 2. Variantes Detectadas

- **Default:** Dos columnas — logo a la izquierda (150×143px) + contenido (año + texto) a la derecha.
- **Mobile:** Columna única — logo arriba, año + texto debajo apilados.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1)
        ├── div (col A)
        │     └── <picture> ← logo del premio (150×143px)
        └── div (col B)
              ├── <h2> ← "2025" (año de la edición)
              └── <p> ← "Con estos premios, la Fundación Mutua Madrileña quiere reconocer la labor de los jóvenes universitarios que dedican parte de su tiempo y esfuerzo a proyectos de voluntariado."
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<div class="intro-year">
  <div class="intro-year-row">
    <div class="intro-year-media">
      <picture>
        <img src="..." alt="Logo Premios al Voluntariado Universitario" loading="lazy" decoding="async" />
      </picture>
    </div>
    <div class="intro-year-content">
      <h2 class="intro-year-heading">2025</h2>
      <p class="intro-year-body">Con estos premios, la Fundación Mutua Madrileña quiere reconocer la labor de los jóvenes universitarios que dedican parte de su tiempo y esfuerzo a proyectos de voluntariado.</p>
    </div>
  </div>
</div>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Logo/Imagen | `image` | `reference` | `string` | sí |
| Año | `year` | `text` | `string` | sí |
| Descripción | `description` | `richtext` | `string` | sí |

---

## 5. Estilos

```css
.intro-year {
  background: linear-gradient(135deg, #46bded 0%, #008ec7 100%);
  padding: var(--spacing-4xl) var(--spacing-2xl);
}
.intro-year-row {
  display: flex;
  align-items: center;
  gap: var(--spacing-3xl);
  max-width: 1160px;
  margin: 0 auto;
}
.intro-year-media { flex-shrink: 0; }
.intro-year-media img { width: 150px; height: 143px; }
.intro-year-heading {
  font: var(--font-weight-light) 40px/40px var(--font-family-heading);
  color: white;
  margin-bottom: var(--spacing-md);
}
.intro-year-body {
  font: var(--font-weight-regular) 20px/30px var(--font-family-heading);
  color: white;
}

@media (max-width: 767px) {
  .intro-year-row { flex-direction: column; text-align: center; }
  .intro-year-heading { font-size: 32px; }
  .intro-year-body { font-size: 18px; }
}
```

---

## 6. Accesibilidad

- ♿ El logo debe tener `alt` descriptivo, no decorativo.
- ♿ El texto de año `<h2>` es correcto si es el encabezado de sección (podría ser `<p>` decorativo si ya existe un H2 antes — validar jerarquía).

---

## 7. Rendimiento

- Imagen del logo: `loading="lazy"` — está below-the-fold (debajo del hero carousel que ocupa el viewport completo).
- Sin animaciones detectadas.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Logo premio | celda del bloque → `<picture>` ya en DOM | No (below-the-fold) | PNG/SVG | 150×143 (~1:1) |

---

## 9. Notas Adicionales

- El gradiente de fondo (`#46bded` → `#008ec7`) crea continuidad visual con la sección hero superior.
- En el diseño Figma, la sección mide 1160px de ancho interno (nodo Container 1:387).
- ⚠️ Validar si el año "2025" debe ser un `<h2>` o un elemento presentacional — depende de la estructura de headings de la página final.
