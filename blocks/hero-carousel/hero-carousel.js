/**
 * Hero Carousel Block — AEM Edge Delivery Services
 *
 * Figma reference: 1:325 (desktop), 1:3 (mobile)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Añadida instrumentación UE xwalk completa
 * - Restaurado data-aue-filter en track tras append de slides
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Fila 0 = configuración (editionLabel), filas 1+ = slides
  const configRow = rows[0];
  const slideRows = rows.slice(1);
  const totalSlides = slideRows.length;

  // Clasificar config row (oculta visualmente, preservada para UE)
  configRow.classList.add('hero-carousel-config');

  // Crear viewport y track (elementos NUEVOS)
  const viewport = document.createElement('div');
  viewport.classList.add('hero-carousel-viewport');

  const track = document.createElement('div');
  track.classList.add('hero-carousel-track');

  // Procesar cada slide — mover nodos existentes al track
  slideRows.forEach((row, index) => {
    row.classList.add('hero-carousel-slide');
    row.setAttribute('role', 'tabpanel');
    row.setAttribute('aria-label', `Slide ${index + 1} de ${totalSlides}`);

    if (index === 0) {
      row.classList.add('hero-carousel-slide--active');
      row.setAttribute('aria-hidden', 'false');
    } else {
      row.setAttribute('aria-hidden', 'true');
    }

    const cols = [...row.children];

    // Col 0 = media (picture ya en DOM)
    if (cols[0]) {
      cols[0].classList.add('hero-carousel-media');
      const img = cols[0].querySelector('picture img');
      if (img) {
        if (index === 0) {
          img.setAttribute('loading', 'eager');
          img.setAttribute('fetchpriority', 'high');
        } else {
          img.setAttribute('loading', 'lazy');
          img.setAttribute('decoding', 'async');
        }
      }
    }

    // Col 1 = content (título + CTA)
    if (cols[1]) {
      cols[1].classList.add('hero-carousel-content');
      const heading = cols[1].querySelector('h2');
      if (heading) heading.classList.add('hero-carousel-title');
      const link = cols[1].querySelector('a');
      if (link) link.classList.add('hero-carousel-cta');
    }

    // Mover slide existente al track (no destruye, reordena)
    track.append(row);
  });

  viewport.append(track);

  // Crear controles (elementos NUEVOS — no existen en DOM original)
  const controls = document.createElement('div');
  controls.classList.add('hero-carousel-controls');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('hero-carousel-prev');
  prevBtn.setAttribute('aria-label', 'Slide anterior');
  prevBtn.textContent = '\u2039';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('hero-carousel-next');
  nextBtn.setAttribute('aria-label', 'Slide siguiente');
  nextBtn.textContent = '\u203A';

  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('hero-carousel-dots');
  dotsContainer.setAttribute('role', 'tablist');

  for (let i = 0; i < totalSlides; i += 1) {
    const dot = document.createElement('button');
    dot.classList.add('hero-carousel-dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
    if (i === 0) {
      dot.classList.add('hero-carousel-dot--active');
      dot.setAttribute('aria-selected', 'true');
    } else {
      dot.setAttribute('aria-selected', 'false');
    }
    dotsContainer.append(dot);
  }

  controls.append(prevBtn, dotsContainer, nextBtn);

  // Insertar nuevas estructuras en el bloque (después del config row)
  block.append(viewport, controls);

  // Accesibilidad del contenedor
  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Hero carousel');

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Bloque raíz — AEM ya inyecta data-aue-resource en block
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'hero-carousel';
  block.dataset.aueLabel = 'Hero Carousel';

  // Config row — editionLabel editable desde panel UE
  const configText = configRow.querySelector('p');
  if (configText) {
    configText.dataset.aueProp = 'editionLabel';
    configText.dataset.aueType = 'text';
    configText.dataset.aueLabel = 'Edición (ej: XIII, 2025)';
  }

  // Track como contenedor de slides repetibles
  if (block.dataset.aueResource) {
    track.dataset.aueResource = block.dataset.aueResource;
  }
  track.dataset.aueType = 'container';
  track.dataset.aueFilter = 'hero-carousel-item';
  track.dataset.aueBehavior = 'component';

  // Slides: los nodos movidos con append conservan data-aue-resource de AEM.
  slideRows.forEach((row, slideIndex) => {
    row.dataset.aueType = 'component';
    row.dataset.aueModel = 'hero-carousel-item';
    row.dataset.aueLabel = `Slide ${slideIndex + 1}`;

    const cols = [...row.children];

    // Imagen
    if (cols[0]) {
      const picture = cols[0].querySelector('picture');
      if (picture) {
        picture.dataset.aueProp = 'image';
        picture.dataset.aueType = 'media';
        picture.dataset.aueLabel = 'Imagen del slide';
      }
    }

    // Título + CTA
    if (cols[1]) {
      const heading = cols[1].querySelector('h2');
      if (heading) {
        heading.dataset.aueProp = 'title';
        heading.dataset.aueType = 'text';
        heading.dataset.aueLabel = 'Título del slide';
      }
      const link = cols[1].querySelector('a');
      if (link) {
        link.dataset.aueProp = 'ctaText';
        link.dataset.aueType = 'text';
        link.dataset.aueLabel = 'Texto del CTA';
      }
    }
  });

  // — Lógica de navegación —
  let currentIndex = 0;

  function goTo(index) {
    const newIndex = (index + totalSlides) % totalSlides;

    // Actualizar slides
    slideRows[currentIndex].classList.remove('hero-carousel-slide--active');
    slideRows[currentIndex].setAttribute('aria-hidden', 'true');
    slideRows[newIndex].classList.add('hero-carousel-slide--active');
    slideRows[newIndex].setAttribute('aria-hidden', 'false');

    // Actualizar dots
    const dots = dotsContainer.children;
    dots[currentIndex].classList.remove('hero-carousel-dot--active');
    dots[currentIndex].setAttribute('aria-selected', 'false');
    dots[newIndex].classList.add('hero-carousel-dot--active');
    dots[newIndex].setAttribute('aria-selected', 'true');

    // Mover track con transform
    track.style.transform = `translateX(-${newIndex * 100}%)`;

    currentIndex = newIndex;
  }

  // Delegación de eventos en controles
  controls.addEventListener('click', (e) => {
    if (e.target.closest('.hero-carousel-prev')) {
      goTo(currentIndex - 1);
    } else if (e.target.closest('.hero-carousel-next')) {
      goTo(currentIndex + 1);
    } else {
      const dot = e.target.closest('.hero-carousel-dot');
      if (dot) {
        const dotIndex = [...dotsContainer.children].indexOf(dot);
        if (dotIndex >= 0) goTo(dotIndex);
      }
    }
  });

  // Navegación por teclado
  controls.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });
}
