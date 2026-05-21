/**
 * Blog Cards Block — AEM Edge Delivery Services
 *
 * Figma reference: 1:496 (desktop), 1:192 (mobile)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Añadida instrumentación UE completa (xwalk)
 * - Import moveInstrumentation para copiar attrs AEM en items
 *
 * @param {Element} block - Root element of the block
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // --- Row 0: Header (logo + intro) ---
  const headerRow = rows[0];
  headerRow.classList.add('blog-cards-header');
  const [logoCol, introCol] = [...headerRow.children];
  logoCol.classList.add('blog-cards-logo');

  // UE: logo
  const logoPicture = logoCol.querySelector('picture');
  if (logoPicture) {
    logoPicture.dataset.aueProp = 'logo';
    logoPicture.dataset.aueType = 'media';
    logoPicture.dataset.aueLabel = 'Logo blog';
  }

  if (introCol) {
    introCol.classList.add('blog-cards-intro');
    const titleEl = introCol.querySelector('h2');
    if (titleEl) {
      titleEl.classList.add('blog-cards-title');
      titleEl.dataset.aueProp = 'title';
      titleEl.dataset.aueType = 'text';
      titleEl.dataset.aueLabel = 'Título blog';
    }
    const subtitleEl = introCol.querySelector('p');
    if (subtitleEl) {
      subtitleEl.classList.add('blog-cards-subtitle');
      subtitleEl.dataset.aueProp = 'subtitle';
      subtitleEl.dataset.aueType = 'text';
      subtitleEl.dataset.aueLabel = 'Subtítulo';
    }
  }

  // --- Row 1: Section title ---
  const sectionRow = rows[1];
  sectionRow.classList.add('blog-cards-section-title');
  const sectionH3 = sectionRow.querySelector('h3');
  if (sectionH3) {
    sectionH3.dataset.aueProp = 'sectionTitle';
    sectionH3.dataset.aueType = 'text';
    sectionH3.dataset.aueLabel = 'Título sección';
  }

  // --- Rows 2+: Post items → new <ul> + <li> structure ---
  const grid = document.createElement('ul');
  grid.classList.add('blog-cards-grid');
  grid.setAttribute('aria-label', 'Últimos artículos del blog');

  // UE: grid container (copy block resource for container editing)
  if (block.dataset.aueResource) {
    grid.dataset.aueResource = block.dataset.aueResource;
  }
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'blog-cards-item-filter';
  grid.dataset.aueLabel = 'Posts';
  grid.dataset.aueBehavior = 'component';

  for (let i = 2; i < rows.length; i += 1) {
    const row = rows[i];
    const cols = [...row.children];
    const li = document.createElement('li');
    li.classList.add('blog-cards-item');

    // UE: copy AEM-injected instrumentation from original row to new li
    moveInstrumentation(row, li);
    li.dataset.aueType = 'component';
    li.dataset.aueModel = 'blog-cards-item';
    li.dataset.aueLabel = `Post ${i - 1}`;

    // Col 0: image
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('blog-cards-image');
    const picture = cols[0] && cols[0].querySelector('picture');
    if (picture) {
      picture.dataset.aueProp = 'image';
      picture.dataset.aueType = 'media';
      picture.dataset.aueLabel = 'Imagen';
      imageWrapper.appendChild(picture);
    }
    li.appendChild(imageWrapper);

    // Col 1: h4 + date (first p) + excerpt (second p)
    if (cols[1]) {
      const heading = cols[1].querySelector('h4');
      if (heading) {
        heading.classList.add('blog-cards-item-title');
        heading.dataset.aueProp = 'postTitle';
        heading.dataset.aueType = 'text';
        heading.dataset.aueLabel = 'Título post';
        li.appendChild(heading);
      }

      const paragraphs = cols[1].querySelectorAll('p');
      if (paragraphs[0]) {
        paragraphs[0].classList.add('blog-cards-date');
        paragraphs[0].dataset.aueProp = 'date';
        paragraphs[0].dataset.aueType = 'text';
        paragraphs[0].dataset.aueLabel = 'Fecha';
        li.appendChild(paragraphs[0]);
      }
      if (paragraphs[1]) {
        paragraphs[1].classList.add('blog-cards-excerpt');
        paragraphs[1].dataset.aueProp = 'excerpt';
        paragraphs[1].dataset.aueType = 'text';
        paragraphs[1].dataset.aueLabel = 'Extracto';
        li.appendChild(paragraphs[1]);
      }
    }

    grid.appendChild(li);
    row.remove();
  }

  block.appendChild(grid);

  // UE: block-level component instrumentation
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'blog-cards';
  block.dataset.aueLabel = 'Blog Cards';

  // All images lazy (block is below-the-fold)
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });
}
