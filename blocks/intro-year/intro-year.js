/**
 * Intro Year Block — AEM Edge Delivery Services
 *
 * Figma reference: Sección año de edición actual
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Añadida instrumentación UE xwalk (data-aue-*)
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    row.classList.add('intro-year-row');
    const cols = [...row.children];

    cols.forEach((col, colIndex) => {
      if (colIndex === 0) {
        col.classList.add('intro-year-media');
      } else {
        col.classList.add('intro-year-content');
      }
    });
  });

  // Images — below-the-fold, lazy loading
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // Classify text elements
  block.querySelectorAll('.intro-year-content h2').forEach((h) => {
    h.classList.add('intro-year-heading');
  });

  block.querySelectorAll('.intro-year-content p').forEach((p) => {
    p.classList.add('intro-year-body');
  });

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'intro-year';
  block.dataset.aueLabel = 'Intro Año';

  const picture = block.querySelector('.intro-year-media picture');
  if (picture) {
    picture.dataset.aueProp = 'image';
    picture.dataset.aueType = 'media';
    picture.dataset.aueLabel = 'Logo';
  }

  const heading = block.querySelector('.intro-year-heading');
  if (heading) {
    heading.dataset.aueProp = 'year';
    heading.dataset.aueType = 'text';
    heading.dataset.aueLabel = 'Año';
  }

  const body = block.querySelector('.intro-year-body');
  if (body) {
    body.dataset.aueProp = 'description';
    body.dataset.aueType = 'richtext';
    body.dataset.aueLabel = 'Descripción';
  }
}
