# Instrucciones de Bloque: header
> Generado por: Figma Analyst
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)
> Nodo(s) de referencia: 1:680 (desktop), 1:283 (mobile)
> Complejidad: Media
> Requiere JS: sí
> Modelo UE: xwalk

---

## 1. Descripción y Propósito

Header principal del sitio con dos logos institucionales (Premios al Voluntariado + Fundación Mutua Madrileña), barra de redes sociales y menú hamburguesa en mobile. Ocupa la parte superior fija de la página.

---

## 2. Variantes Detectadas

- **Default (desktop):** Dos logos a los lados + fila de iconos sociales centrados debajo.
- **Mobile:** Dos logos + icono hamburguesa + barra de búsqueda compacta. Iconos sociales en una fila.

---

## 3. Estructura DOM

### ENTRADA — Matriz EDS (lo que decorate recibe):

```
block
  └── div (fila 1)
        ├── div (col A)
        │     └── <picture> ← logo Premios al Voluntariado
        └── div (col B)
              └── <picture> ← logo Fundación Mutua Madrileña
  └── div (fila 2)
        └── div (col A)
              └── <ul>
                    ├── <li><a href="..."><picture> ← icono Twitter/X</a></li>
                    ├── <li><a href="..."><picture> ← icono Instagram</a></li>
                    ├── <li><a href="..."><picture> ← icono Facebook</a></li>
                    └── <li><a href="..."><picture> ← icono YouTube</a></li>
```

### SALIDA — DOM decorado (lo que decorate produce):

```html
<header class="header">
  <div class="header-logos">
    <a href="/" class="header-logo header-logo--main" aria-label="Premios al Voluntariado Universitario">
      <picture>...</picture>
    </a>
    <a href="https://fundacionmutua.es" class="header-logo header-logo--partner" aria-label="Fundación Mutua Madrileña">
      <picture>...</picture>
    </a>
  </div>
  <nav class="header-social" aria-label="Redes sociales">
    <ul class="header-social-list">
      <li><a href="..." aria-label="Twitter"><img .../></a></li>
      <li><a href="..." aria-label="Instagram"><img .../></a></li>
      <li><a href="..." aria-label="Facebook"><img .../></a></li>
      <li><a href="..." aria-label="YouTube"><img .../></a></li>
    </ul>
  </nav>
  <!-- mobile only -->
  <button class="header-menu-toggle" aria-label="Abrir menú" aria-expanded="false">
    <span class="header-menu-icon"></span>
  </button>
</header>
```

---

## 4. Campos Editables para Universal Editor (xwalk)

| Campo | `name` | `component` | `valueType` | `value` | ¿Requerido? |
|---|---|---|---|---|---|
| Logo principal | `logoMain` | `reference` | `string` | (imagen) | sí |
| Logo partner | `logoPartner` | `reference` | `string` | (imagen) | sí |
| URL logo principal | `logoMainUrl` | `text` | `string` | `/` | sí |
| URL logo partner | `logoPartnerUrl` | `text` | `string` | URL externa | sí |

**Campos de cada item** (redes sociales — `id: header-social-item`):

| Campo | `name` | `component` | `valueType` | `value` | ¿Requerido? |
|---|---|---|---|---|---|
| Icono red social | `icon` | `reference` | `string` | (imagen SVG) | sí |
| URL red social | `url` | `text` | `string` | URL | sí |
| Nombre red social | `label` | `text` | `string` | (aria-label) | sí |

---

## 5. Estilos

```css
.header {
  background: var(--color-bg-white);
  padding: 0 var(--spacing-2xl);
  max-width: var(--container-max-width);
}
.header-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88px; /* desktop */
}
.header-logo--main img { height: 74px; width: auto; }
.header-logo--partner img { height: 66px; width: auto; }
.header-social-list {
  display: flex;
  justify-content: center;
  gap: var(--spacing-3xl);
  list-style: none;
  padding: 0;
}
.header-social-list img { width: 20px; height: 20px; }

@media (max-width: 767px) {
  .header-logos { height: 60px; }
  .header-logo--main img { height: 42px; }
  .header-logo--partner img { height: 60px; }
}
```

---

## 6. Accesibilidad

- ♿ `aria-label` en cada enlace de red social (no tienen texto visible).
- ♿ `aria-label` en logos con `role="img"` o alt text descriptivo.
- ♿ Botón hamburguesa con `aria-expanded` y `aria-controls`.

---

## 7. Rendimiento

- Logos: `loading="eager"` — están en viewport inmediato.
- Iconos sociales SVG: pueden ser inline SVG para evitar requests adicionales.
- ⚠️ POSICIÓN LCP NO CONFIRMADA — los logos podrían competir con la imagen del hero como LCP.

---

## 8. Gestión de Imágenes

| Imagen | Origen | LCP | Formato | Proporciones |
|---|---|---|---|---|
| Logo Premios | celda del bloque → `<picture>` ya en DOM | No (no es la mayor) | SVG/PNG | ~220×74 |
| Logo Fundación | celda del bloque → `<picture>` ya en DOM | No | SVG/PNG | ~160×66 |
| Iconos sociales | celda del bloque (dentro de `<ul>`) | No | SVG | 20×20 |

---

## 9. Notas Adicionales

- En mobile se detecta un campo de búsqueda (`Input` nodo 1:322) y un botón hamburguesa (3 líneas). Requiere JS para toggle del menú mobile.
- La barra de iconos sociales se reposiciona entre desktop (debajo de logos, centrada) y mobile (fila horizontal, parte superior o inferior del header dependiendo del viewport).
