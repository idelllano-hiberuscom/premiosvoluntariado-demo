/**
 * Vidas Cruzadas Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM (container):
 *   Row 0 (config): 4 cells [picture logo], [richtext description], [cta <a>], [picture decoration]
 *   Rows 1+ (items): 3 cells [picture], [title text], [url text]
 *
 * @param {Element} block - Root element of the block
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // --- Row 0: Config header ---
  const headerRow = rows[0];
  const headerCols = [...headerRow.children];

  // Cell 0: logo
  const logoCell = headerCols[0];
  if (logoCell) logoCell.classList.add('vidas-cruzadas-logo');

  // Cell 1: description (richtext)
  const descCell = headerCols[1];
  if (descCell) descCell.classList.add('vidas-cruzadas-text');

  // Cell 2: CTA link (collapsed ctaText+cta)
  const ctaCell = headerCols[2];
  if (ctaCell) {
    ctaCell.classList.add('vidas-cruzadas-cta-wrapper');
    const ctaLink = ctaCell.querySelector('a');
    if (ctaLink) ctaLink.classList.add('vidas-cruzadas-cta');
  }

  // Cell 3: decoration image
  const decoCell = headerCols[3];
  if (decoCell) decoCell.classList.add('vidas-cruzadas-decoration');

  // --- Build layout: logo banner + body (sidebar + stories) ---

  // Logo banner (white card)
  const logoBanner = document.createElement('div');
  logoBanner.classList.add('vidas-cruzadas-banner');
  if (logoCell) logoBanner.append(logoCell);

  // Body: two columns — sidebar (text + cta) | stories
  const body = document.createElement('div');
  body.classList.add('vidas-cruzadas-body');

  // Sidebar (text + cta)
  const sidebar = document.createElement('div');
  sidebar.classList.add('vidas-cruzadas-sidebar');
  if (descCell) sidebar.append(descCell);
  if (ctaCell) sidebar.append(ctaCell);

  // --- Rows 1+: Story items ---
  const storiesList = document.createElement('ul');
  storiesList.classList.add('vidas-cruzadas-stories');

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const cols = [...row.children];
    const li = document.createElement('li');
    li.classList.add('vidas-cruzadas-story');
    moveInstrumentation(row, li);

    // Cell 0: image
    if (cols[0]) {
      cols[0].classList.add('vidas-cruzadas-story-image');
      li.append(cols[0]);
    }

    // Cell 1: title
    if (cols[1]) {
      cols[1].classList.add('vidas-cruzadas-story-title');
      li.append(cols[1]);
    }

    // Cell 2: url (hidden metadata, used for link)
    if (cols[2]) {
      cols[2].classList.add('vidas-cruzadas-story-url');
      cols[2].hidden = true;
      li.append(cols[2]);

      // Wrap entire li in a link if url provided
      const urlText = cols[2].textContent.trim();
      if (urlText) {
        const link = document.createElement('a');
        link.href = urlText;
        link.classList.add('vidas-cruzadas-story-link');
        link.setAttribute('aria-label', cols[1] ? cols[1].textContent.trim() : '');
        while (li.firstChild) link.append(li.firstChild);
        li.append(link);
      }
    }

    storiesList.append(li);
    row.remove();
  }

  body.append(sidebar, storiesList);

  // Decoration (position absolute or hidden)
  if (decoCell) body.append(decoCell);

  // Replace original header row content
  headerRow.remove();
  block.append(logoBanner, body);

  // Lazy images
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // --- UE instrumentation (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'vidas-cruzadas';
  block.dataset.aueLabel = 'Vidas Cruzadas';

  if (logoCell) {
    logoCell.dataset.aueProp = 'logo';
    logoCell.dataset.aueType = 'media';
    logoCell.dataset.aueLabel = 'Logo';
  }
  if (descCell) {
    descCell.dataset.aueProp = 'description';
    descCell.dataset.aueType = 'richtext';
    descCell.dataset.aueLabel = 'Descripción';
  }
  if (ctaCell) {
    ctaCell.dataset.aueProp = 'ctaText';
    ctaCell.dataset.aueType = 'text';
    ctaCell.dataset.aueLabel = 'CTA';
  }
  if (decoCell) {
    decoCell.dataset.aueProp = 'decorationImage';
    decoCell.dataset.aueType = 'media';
    decoCell.dataset.aueLabel = 'Imagen decorativa';
  }

  // Stories container
  if (block.dataset.aueResource) {
    storiesList.dataset.aueResource = block.dataset.aueResource;
  }
  storiesList.dataset.aueType = 'container';
  storiesList.dataset.aueFilter = 'vidas-cruzadas-item-filter';
  storiesList.dataset.aueLabel = 'Historias';
  storiesList.dataset.aueBehavior = 'component';

  storiesList.querySelectorAll('.vidas-cruzadas-story').forEach((li, index) => {
    li.dataset.aueType = 'component';
    li.dataset.aueModel = 'vidas-cruzadas-item';
    li.dataset.aueLabel = `Historia ${index + 1}`;

    const imgCell = li.querySelector('.vidas-cruzadas-story-image');
    if (imgCell) {
      imgCell.dataset.aueProp = 'image';
      imgCell.dataset.aueType = 'media';
      imgCell.dataset.aueLabel = 'Imagen';
    }
    const titleCellEl = li.querySelector('.vidas-cruzadas-story-title');
    if (titleCellEl) {
      titleCellEl.dataset.aueProp = 'title';
      titleCellEl.dataset.aueType = 'text';
      titleCellEl.dataset.aueLabel = 'Título';
    }
  });
}
