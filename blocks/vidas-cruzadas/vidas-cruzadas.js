/**
 * Vidas Cruzadas Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * Container fields (delivered as individual rows, 1 cell each):
 *   logo (picture), description (richtext), ctaText, cta (url), decorationImage (picture)
 * Item rows (2-3 cells): [picture image], [title text], [url text]
 *
 * @param {Element} block - Root element of the block
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // --- Separate container fields from item rows ---
  // Items have 2+ cells (image + title, or image + title + url)
  // Container fields have 1 cell each
  const containerRows = [];
  const itemRows = [];

  rows.forEach((row) => {
    if (row.children.length >= 2) {
      itemRows.push(row);
    } else {
      containerRows.push(row);
    }
  });

  // --- Classify container fields by content ---
  // Model field order: logo, description, ctaText, cta, decorationImage
  let logoCell = null;
  let descCell = null;
  let ctaTextCell = null;
  let ctaUrlCell = null;
  let decoCell = null;

  const pictures = [];
  const texts = [];

  containerRows.forEach((row) => {
    const cell = row.children[0] || row;
    if (cell.querySelector('picture')) {
      pictures.push(cell);
    } else if (cell.textContent.trim()) {
      texts.push(cell);
    }
  });

  // First picture = logo, last picture = decoration (if 2+ pictures)
  if (pictures.length >= 1) [logoCell] = pictures;
  if (pictures.length >= 2) decoCell = pictures[pictures.length - 1];

  // Texts: description is the longest, ctaText contains <a> or is short
  texts.forEach((cell) => {
    const hasLink = cell.querySelector('a');
    const textLen = cell.textContent.trim().length;
    if (hasLink || (!descCell && !ctaTextCell && textLen <= 40)) {
      if (!ctaTextCell) ctaTextCell = cell;
      else if (!ctaUrlCell) ctaUrlCell = cell;
    } else if (!descCell) {
      descCell = cell;
    } else if (!ctaTextCell) {
      ctaTextCell = cell;
    } else if (!ctaUrlCell) {
      ctaUrlCell = cell;
    }
  });

  // --- Build layout ---

  // Logo banner (white card)
  const logoBanner = document.createElement('div');
  logoBanner.classList.add('vidas-cruzadas-banner');
  if (logoCell) logoBanner.append(logoCell);

  // Body: sidebar (text + cta) | stories
  const body = document.createElement('div');
  body.classList.add('vidas-cruzadas-body');

  // Sidebar
  const sidebar = document.createElement('div');
  sidebar.classList.add('vidas-cruzadas-sidebar');
  if (descCell) {
    descCell.classList.add('vidas-cruzadas-text');
    sidebar.append(descCell);
  }
  if (ctaTextCell) {
    ctaTextCell.classList.add('vidas-cruzadas-cta-wrapper');
    const ctaLink = ctaTextCell.querySelector('a');
    if (ctaLink) {
      ctaLink.classList.add('vidas-cruzadas-cta');
    } else if (ctaUrlCell) {
      // Build link from text + url cells
      const a = document.createElement('a');
      a.href = ctaUrlCell.textContent.trim();
      a.textContent = ctaTextCell.textContent.trim();
      a.classList.add('vidas-cruzadas-cta');
      ctaTextCell.textContent = '';
      ctaTextCell.append(a);
    }
    sidebar.append(ctaTextCell);
  }

  // Stories list
  const storiesList = document.createElement('ul');
  storiesList.classList.add('vidas-cruzadas-stories');

  itemRows.forEach((row) => {
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

    // Cell 2: url (hidden, used for link wrapping)
    if (cols[2]) {
      cols[2].hidden = true;
      li.append(cols[2]);
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
  });

  body.append(sidebar, storiesList);

  // Decoration (position absolute)
  if (decoCell) {
    decoCell.classList.add('vidas-cruzadas-decoration');
    body.append(decoCell);
  }

  // Clear and rebuild
  block.textContent = '';
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
  if (ctaTextCell) {
    ctaTextCell.dataset.aueProp = 'ctaText';
    ctaTextCell.dataset.aueType = 'text';
    ctaTextCell.dataset.aueLabel = 'CTA';
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
