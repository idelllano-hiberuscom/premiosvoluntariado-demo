/**
 * Blog Cards Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM (container):
 *   Row 0 (config): 4 cells [picture logo], [title text], [subtitle text], [heading text]
 *   Rows 1+ (items): 4 cells [picture], [<a> linkText+link], [date text], [excerpt text]
 *
 * @param {Element} block - Root element of the block
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // --- Row 0: Config/Header ---
  const headerRow = rows[0];
  headerRow.classList.add('blog-cards-header');
  const headerCols = [...headerRow.children];

  // Cell 0: logo picture
  const logoCell = headerCols[0];
  if (logoCell) logoCell.classList.add('blog-cards-logo');

  // Cell 1: blog title
  const titleCell = headerCols[1];
  if (titleCell) titleCell.classList.add('blog-cards-title');

  // Cell 2: subtitle
  const subtitleCell = headerCols[2];
  if (subtitleCell) subtitleCell.classList.add('blog-cards-subtitle');

  // Cell 3: section heading — move OUTSIDE header row
  const headingCell = headerCols[3];
  if (headingCell) {
    headingCell.classList.add('blog-cards-section-heading');
    headerRow.after(headingCell);
  }

  // --- Rows 1+: Post items ---
  const grid = document.createElement('ul');
  grid.classList.add('blog-cards-grid');
  grid.setAttribute('aria-label', 'Últimos artículos del blog');

  for (let i = 1; i < rows.length; i += 1) {
    const row = rows[i];
    const cols = [...row.children];
    const li = document.createElement('li');
    li.classList.add('blog-cards-item');
    moveInstrumentation(row, li);

    // Cell 0: image
    if (cols[0]) {
      cols[0].classList.add('blog-cards-image');
      li.append(cols[0]);
    }

    // Cell 1: link (title + href collapsed)
    if (cols[1]) {
      cols[1].classList.add('blog-cards-item-title');
      li.append(cols[1]);
    }

    // Cell 2: date
    if (cols[2]) {
      cols[2].classList.add('blog-cards-date');
      li.append(cols[2]);
    }

    // Cell 3: excerpt
    if (cols[3]) {
      cols[3].classList.add('blog-cards-excerpt');
      li.append(cols[3]);
    }

    grid.append(li);
    row.remove();
  }

  block.append(grid);

  // Lazy images
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // --- UE instrumentation (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'blog-cards';
  block.dataset.aueLabel = 'Blog Cards';

  // Config cells
  if (logoCell) {
    logoCell.dataset.aueProp = 'logo';
    logoCell.dataset.aueType = 'media';
    logoCell.dataset.aueLabel = 'Logo';
  }
  if (titleCell) {
    titleCell.dataset.aueProp = 'title';
    titleCell.dataset.aueType = 'text';
    titleCell.dataset.aueLabel = 'Título blog';
  }
  if (subtitleCell) {
    subtitleCell.dataset.aueProp = 'subtitle';
    subtitleCell.dataset.aueType = 'text';
    subtitleCell.dataset.aueLabel = 'Subtítulo';
  }
  if (headingCell) {
    headingCell.dataset.aueProp = 'heading';
    headingCell.dataset.aueType = 'text';
    headingCell.dataset.aueLabel = 'Título sección';
  }

  // Grid container
  if (block.dataset.aueResource) {
    grid.dataset.aueResource = block.dataset.aueResource;
  }
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'blog-cards-item-filter';
  grid.dataset.aueLabel = 'Posts';
  grid.dataset.aueBehavior = 'component';

  // Items
  grid.querySelectorAll('.blog-cards-item').forEach((li, index) => {
    li.dataset.aueType = 'component';
    li.dataset.aueModel = 'blog-cards-item';
    li.dataset.aueLabel = `Post ${index + 1}`;

    const imgCell = li.querySelector('.blog-cards-image');
    if (imgCell) {
      imgCell.dataset.aueProp = 'image';
      imgCell.dataset.aueType = 'media';
      imgCell.dataset.aueLabel = 'Imagen';
    }
    const linkCell = li.querySelector('.blog-cards-item-title');
    if (linkCell) {
      linkCell.dataset.aueProp = 'linkText';
      linkCell.dataset.aueType = 'text';
      linkCell.dataset.aueLabel = 'Título post';
    }
    const dateCell = li.querySelector('.blog-cards-date');
    if (dateCell) {
      dateCell.dataset.aueProp = 'date';
      dateCell.dataset.aueType = 'text';
      dateCell.dataset.aueLabel = 'Fecha';
    }
    const excerptCell = li.querySelector('.blog-cards-excerpt');
    if (excerptCell) {
      excerptCell.dataset.aueProp = 'excerpt';
      excerptCell.dataset.aueType = 'text';
      excerptCell.dataset.aueLabel = 'Extracto';
    }
  });
}
