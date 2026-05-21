# Instrucciones de Bloque: footer
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:577 (desktop), 1:265 (mobile)
> Complejidad: Media
> Requiere JS: no
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Footer multi-columna del sitio con borde superior azul claro (12px). Contiene: columna de logos + contacto, columnas de navegación ("Los Premios", "Ganadores/Blog", "Participa"), y una barra inferior con iconos de redes sociales y enlaces legales.

---

## 2. Variantes Detectadas

- **Default (desktop):** 4 columnas separadas por bordes verticales blancos + barra legal inferior.
- **Mobile:** Simplificado — iconos sociales en fila, un solo logo centrado, barra legal horizontal.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1 — columna logos + contacto)
        ├── div (col A)
        │     ├── <picture> ← logo Fundación Mutua (160×54px)
        │     ├── <picture> ← logo Premios Voluntariado (160×66px)
        │     ├── <p><strong>Contacto</strong></p>
        │     └── <ul>
        │           ├── <li><a href="mailto:..."><picture>icoMail</picture> premios@fundacionmutua.es</a></li>
        │           └── <li><a href="tel:..."><picture>icoPhone</picture> 91 171 82 15</a></li>
        └── div (col B — navegación "Los Premios")
              ├── <p><strong>Los Premios</strong></p>
              └── <ul>
                    ├── <li><a href="...">Conócenos</a></li>
                    ├── <li><a href="...">Compromiso de la Fundación Mutua</a></li>
                    ├── <li><a href="...">Ediciones anteriores</a></li>
                    └── <li><a href="...">Universidad y voluntariado</a></li>
  └── div (fila 2 — columnas navegación adicionales)
        ├── div (col A — "Ganadores/Blog")
        │     ├── <p><strong>Ganadores</strong></p>
        │     └── <p><strong>Blog</strong></p>
        └── div (col B — "Participa")
              ├── <p><strong>Participa</strong></p>
              └── <ul>
                    ├── <li><a href="...">Requisitos</a></li>
                    ├── <li><a href="...">Premios</a></li>
                    ├── <li><a href="...">Cómo participar</a></li>
                    └── <li><a href="...">Inscripción</a></li>
  └── div (fila 3 — redes sociales)
        └── div (col A)
              └── <ul>
                    ├── <li><a href="..."><picture>Twitter</picture></a></li>
                    ├── <li><a href="..."><picture>Instagram</picture></a></li>
                    ├── <li><a href="..."><picture>Facebook</picture></a></li>
                    └── <li><a href="..."><picture>YouTube</picture></a></li>
  └── div (fila 4 — barra legal)
        └── div (col A)
              └── <p> ← "© 2025 Fundación Mutua Madrileña | Aviso legal | Política de privacidad | Política de cookies"
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<footer class="footer">
  <div class="footer-main">
    <div class="footer-col footer-col--brand">
      <a href="/" class="footer-logo"><picture>...</picture></a>
      <a href="/" class="footer-logo"><picture>...</picture></a>
      <p class="footer-col-title">Contacto</p>
      <ul class="footer-contact-list">
        <li><a href="mailto:premios@fundacionmutua.es"><img src="..." alt="" aria-hidden="true" /> premios@fundacionmutua.es</a></li>
        <li><a href="tel:911718215"><img src="..." alt="" aria-hidden="true" /> 91 171 82 15</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Los Premios</p>
      <ul class="footer-nav-list">
        <li><a href="...">Conócenos</a></li>
        <li><a href="...">Compromiso de la Fundación Mutua</a></li>
        <li><a href="...">Ediciones anteriores</a></li>
        <li><a href="...">Universidad y voluntariado</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Ganadores</p>
      <p class="footer-col-title">Blog</p>
    </div>
    <div class="footer-col">
      <p class="footer-col-title">Participa</p>
      <ul class="footer-nav-list">
        <li><a href="...">Requisitos</a></li>
        <li><a href="...">Premios</a></li>
        <li><a href="...">Cómo participar</a></li>
        <li><a href="...">Inscripción</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-social">
    <ul class="footer-social-list">
      <li><a href="..." aria-label="Twitter"><img src="..." alt="" /></a></li>
      <li><a href="..." aria-label="Instagram"><img src="..." alt="" /></a></li>
      <li><a href="..." aria-label="Facebook"><img src="..." alt="" /></a></li>
      <li><a href="..." aria-label="YouTube"><img src="..." alt="" /></a></li>
    </ul>
  </div>
  <div class="footer-legal">
    <p>© 2025 Fundación Mutua Madrileña</p>
    <nav class="footer-legal-nav" aria-label="Enlaces legales">
      <a href="...">Aviso legal</a>
      <a href="...">Política de privacidad</a>
      <a href="...">Política de cookies</a>
    </nav>
  </div>
</footer>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

**Campos del contenedor raíz** (`id: footer`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Logo 1 | `logo1` | `reference` | `string` | sí |
| Logo 2 | `logo2` | `reference` | `string` | sí |
| Texto copyright | `copyright` | `text` | `string` | sí |

**Campos de columna de navegación** (`id: footer-nav-column`):

| Campo | `name` | `component` | `valueType` | ¿Requerido? |
|---|---|---|---|---|
| Título de columna | `columnTitle` | `text` | `string` | sí |
| Links (richtext con lista) | `links` | `richtext` | `string` | sí |

---

## 5. Estilos

```css
.footer {
  background: var(--color-bg-light); /* #f7f9f8 */
  border-top: 12px solid var(--color-primary-light); /* #46bded */
  padding-top: var(--spacing-sm);
}
.footer-main {
  display: flex;
  justify-content: space-between;
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: var(--spacing-4xl) var(--spacing-2xl);
}
.footer-col {
  width: 200px;
  padding: 0 var(--spacing-lg);
  border-right: 4px solid white;
}
.footer-col:last-child { border-right: none; }
.footer-col--brand { width: 200px; padding-left: 0; }
.footer-col-title {
  font: var(--font-weight-medium) 14px/23px var(--font-family-heading);
  color: var(--color-primary-dark);
  margin-bottom: var(--spacing-md);
}
.footer-nav-list {
  list-style: none; padding: 0;
  display: flex; flex-direction: column; gap: var(--spacing-lg);
}
.footer-nav-list a {
  font: var(--font-weight-regular) 13px/20px var(--font-family-heading);
  color: var(--color-primary-link); /* #177db1 */
  text-decoration: none;
}
.footer-nav-list a:hover { text-decoration: underline; }
.footer-contact-list { list-style: none; padding: 0; }
.footer-contact-list a {
  font: var(--font-weight-medium) 11px/11px var(--font-family-heading);
  color: var(--color-primary-link);
  display: flex; align-items: center; gap: 6px;
  padding: 11px 0;
}
.footer-contact-list img { width: 20px; height: 20px; }
.footer-social {
  border-top: 1px solid var(--color-bg-divider);
  padding: var(--spacing-lg) var(--spacing-2xl);
  max-width: var(--container-max-width);
  margin: 0 auto;
}
.footer-social-list {
  display: flex; justify-content: center; gap: var(--spacing-xl);
  list-style: none; padding: 0;
}
.footer-social-list img { width: 24px; height: 24px; }
.footer-legal {
  background: var(--color-primary-dark);
  padding: var(--spacing-md) var(--spacing-2xl);
  display: flex; justify-content: space-between; align-items: center;
  max-width: 100%;
}
.footer-legal p {
  font: var(--font-weight-regular) 12px/16px var(--font-family-heading);
  color: white;
}
.footer-legal-nav a {
  font: var(--font-weight-regular) 12px/16px var(--font-family-heading);
  color: white; text-decoration: none; margin-left: var(--spacing-lg);
}

@media (max-width: 767px) {
  .footer-main { flex-direction: column; gap: var(--spacing-xl); }
  .footer-col { width: 100%; border-right: none; border-bottom: 1px solid var(--color-bg-divider); padding-bottom: var(--spacing-lg); }
  .footer-legal { flex-direction: column; text-align: center; gap: var(--spacing-sm); }
}
```

---

## 6. Accesibilidad

- ♿ `<nav aria-label="Enlaces legales">` en barra legal.
- ♿ `aria-label` en cada icono de red social.
- ♿ `role="contentinfo"` implícito con `<footer>`.
- ♿ Iconos de contacto (mail/phone) con `aria-hidden="true"` ya que el texto acompaña.
- ♿ Logos con `alt` descriptivo.

---

## 7. Rendimiento

- Todas las imágenes: `loading="lazy"` — al final de la página.
- Iconos SVG: preferiblemente inline para evitar requests.
- Sin JS.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Logo Fundación Mutua | celda del bloque → `<picture>` | No (footer) | SVG/PNG | 160×54 |
| Logo Premios | celda del bloque → `<picture>` | No | SVG/PNG | 160×66 |
| icoMail.svg | celda del bloque (dentro de `<a>`) | No | SVG | 20×20 |
| icoPhone.svg | celda del bloque (dentro de `<a>`) | No | SVG | 20×20 |
| Iconos redes sociales | celda del bloque | No | SVG | 24×24 |

---

## 9. Notas Adicionales

- El borde superior azul de 12px (`border-top: 12px solid #46bded`) es un elemento distintivo del brand.
- Las columnas de navegación están separadas por bordes blancos verticales de 4px — solo visibles en desktop.
- En desktop la altura total del footer es ~376px.
- Los títulos de columna ("Los Premios", "Ganadores", "Participa") son `font-weight: 500` (Medium) y funcionan como headings visuales dentro del footer.
- ⚠️ En mobile, el footer se simplifica considerablemente: una fila de redes sociales, un logo centrado y la barra legal. Las columnas de navegación podrían colapsar en un acordeón o simplemente apilarse.
