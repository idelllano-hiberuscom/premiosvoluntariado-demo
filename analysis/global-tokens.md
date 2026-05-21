# Design Tokens Globales
> Para implementar en: /styles/styles.css y /styles/fonts.css
> Modelo de proyecto: xwalk (EDS + Universal Editor)
> Archivo Figma: demo-premios-voluntariado (CHwY6HQTzkvkOkX4TUOox2)

---

## Colores

```css
/* === Primarios === */
--color-primary-dark: #0a5182;       /* Azul marino oscuro — fondos principales, headings */
--color-primary: #008ec7;            /* Azul medio — links activos, indicadores, botones */
--color-primary-light: #46bded;      /* Azul claro — fondos accent, bordes superiores */
--color-primary-lighter: #d2f2ff;    /* Azul muy claro — fondos secundarios, badges */
--color-primary-link: #177db1;       /* Azul intermedio — enlaces, subtítulos */

/* === Neutrales === */
--color-text-dark: #26446d;          /* Azul oscuro — headings sobre fondo claro */
--color-text-body: #65747c;          /* Gris oscuro — texto body principal */
--color-text-muted: #899296;         /* Gris medio — texto secundario, metadatos */
--color-text-light: #6c828d;         /* Gris azulado — extractos, descripciones */

/* === Fondos === */
--color-bg-white: #ffffff;           /* Fondo base */
--color-bg-light: #f7f9f8;          /* Fondo casi blanco — secciones alternas */
--color-bg-grey: #eff3f8;           /* Gris claro — secciones, headers de tarjetas */
--color-bg-divider: #e5e5e5;        /* Gris medio — separadores, subfondos */

/* === Sombras === */
--shadow-card: 0px 4px 4px rgba(38, 68, 109, 0.1);  /* Sombra de tarjetas */
--shadow-image: 15px 15px 0px 0px rgba(165, 165, 165, 0.2); /* Sombra desplazada imágenes */
```

---

## Tipografías

```css
/* === Familias === */
--font-family-heading: 'Rubik', sans-serif;
--font-family-body: 'Barlow Semi Condensed', sans-serif;
--font-family-cta: 'Barlow', sans-serif;

/* === Pesos === */
--font-weight-light: 300;
--font-weight-regular: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;

/* === Tamaños — Headings (Rubik) === */
--font-size-h1: 40px;          /* line-height: 40px — Rubik Light */
--font-size-h2: 32px;          /* line-height: 40px — Rubik Regular */
--font-size-h3: 26px;          /* line-height: 40px — Rubik Light */
--font-size-h4: 20px;          /* line-height: 28px — Rubik Medium */
--font-size-subtitle: 24px;    /* line-height: 30px — Rubik Regular */
--font-size-subtitle-sm: 20px; /* line-height: 30px — Rubik Regular/Light */

/* === Tamaños — Body (Barlow Semi Condensed) === */
--font-size-body: 16px;        /* line-height: 24px — tracking: -0.2px */
--font-size-body-lg: 18px;     /* line-height: 30px — Rubik Regular */
--font-size-caption: 14px;     /* line-height: 20px — Rubik Regular */
--font-size-small: 13px;       /* line-height: 20px — links footer */
--font-size-micro: 11px;       /* line-height: 11px — datos contacto footer */

/* === CTA / Buttons (Barlow Bold) === */
--font-size-cta: 24px;         /* line-height: 24px — tracking: 1px */

/* === Line-Heights === */
--line-height-tight: 1;
--line-height-normal: 1.5;
--line-height-heading: 1.2;
```

---

## Espaciados

```css
/* === Spacing scale (extraída de paddings/gaps Figma) === */
--spacing-xs: 4px;
--spacing-sm: 10px;
--spacing-md: 16px;
--spacing-lg: 20px;
--spacing-xl: 30px;
--spacing-2xl: 32px;
--spacing-3xl: 40px;
--spacing-4xl: 50px;

/* === Gaps repetidos === */
--gap-items: 16px;
--gap-sections: 30px;
--gap-cards: 20px;

/* === Border-radius === */
--radius-pill: 2px;         /* indicadores del carousel */
--radius-none: 0px;         /* tarjetas y contenedores (esquinas rectas) */
```

---

## Breakpoints

```css
/* Detectados en los frames Figma */
--breakpoint-mobile: 390px;     /* Frame mobile */
--breakpoint-desktop: 1265px;   /* Frame desktop (1264.67px) */

/* Propuesta de implementación */
/* Mobile-first: base ≤ 767px */
/* Tablet: 768px – 1023px (interpolado — no existe frame explícito en Figma) */
/* Desktop: ≥ 1024px */
```

---

## Contenedor máximo

```css
--container-max-width: 1280px;  /* max-width detectado en Container del desktop */
--container-padding: 32px;      /* padding lateral de contenedores principales */
```

---

## Notas de implementación

1. **@font-face:** Registrar Rubik (300, 400, 500) y Barlow Semi Condensed (400) + Barlow (600, 700) en `/styles/fonts.css`.
2. **Gradientes:** Se detectan gradientes lineales en varias secciones (from `#0a4f80` to white en hero, from `#46bded` to `#008ec7` en requisitos). Implementar como `background: linear-gradient(...)` en los bloques específicos.
3. **Sombras:** La sombra de tarjetas `--shadow-card` es uniforme en todo el diseño. Aplicar con `box-shadow`.
4. **Sin variables Figma:** El archivo no define Figma Variables/Tokens — todos los valores se extrajeron directamente de las propiedades de los nodos.
5. **Border-top accent:** El footer tiene un `border-top: 12px solid var(--color-primary-light)` que actúa como separador visual.
