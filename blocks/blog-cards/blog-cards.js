/**
 * Blog Cards Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM structure (container block):
 *   - Header fields may arrive as: one row with 4 cells, OR individual rows (1 cell each)
 *   - Item rows: multiple cells [picture, linkText, date, excerpt, link]
 *   - Detection: rows with 1 child = header field, rows with 2+ children = item
 *
 * @param {Element} block - Root element of the block
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // --- Separate header fields from item rows ---
  // Header fields: rows with 1 child cell. Items: rows with multiple cells.
  const headerRows = [];
  const itemRows = [];
  rows.forEach((row) => {
    if (row.children.length <= 1) {
      headerRows.push(row);
    } else {
      itemRows.push(row);
    }
  });

  // If first row has 4+ cells, all header is in row 0 (alternative structure)
  if (rows.length > 0 && rows[0].children.length >= 4) {
    const headerCols = [...rows[0].children];
    headerRows.length = 0;
    headerRows.push(
      ...headerCols.map((cell) => {
        const wrapper = document.createElement('div');
        wrapper.append(cell);
        return wrapper;
      }),
    );
    itemRows.length = 0;
    for (let i = 1; i < rows.length; i += 1) {
      itemRows.push(rows[i]);
    }
    rows[0].remove();
  }

  // Classify header cells by content type
  let logoCell = null;
  let titleCell = null;
  let subtitleCell = null;
  let headingCell = null;

  headerRows.forEach((row) => {
    const cell = row.children[0] || row;
    if (!logoCell && cell.querySelector('picture')) {
      logoCell = cell;
    } else if (!titleCell && cell.textContent.trim()) {
      titleCell = cell;
    } else if (!subtitleCell && cell.textContent.trim()) {
      subtitleCell = cell;
    } else if (!headingCell && cell.textContent.trim()) {
      headingCell = cell;
    }
  });

  // Build header: logo left + text group centered
  const headerContent = document.createElement('div');
  headerContent.classList.add('blog-cards-header');

  if (logoCell) {
    logoCell.classList.add('blog-cards-logo');
    headerContent.append(logoCell);
  }

  const textGroup = document.createElement('div');
  textGroup.classList.add('blog-cards-header-text');
  if (titleCell) {
    titleCell.classList.add('blog-cards-title');
    textGroup.append(titleCell);
  }
  if (subtitleCell) {
    subtitleCell.classList.add('blog-cards-subtitle');
    textGroup.append(subtitleCell);
  }
  headerContent.append(textGroup);

  // Section heading — separate element below header
  let headingEl = null;
  if (headingCell) {
    headingCell.classList.add('blog-cards-section-heading');
    headingEl = headingCell;
  }

  // --- Item rows: Post items ---
  const grid = document.createElement('ul');
  grid.classList.add('blog-cards-grid');
  grid.setAttribute('aria-label', 'Últimos artículos del blog');

  itemRows.forEach((row) => {
    const cols = [...row.children];
    const li = document.createElement('li');
    li.classList.add('blog-cards-item');
    moveInstrumentation(row, li);

    // Cell 0: image
    if (cols[0]) {
      cols[0].classList.add('blog-cards-image');
      li.append(cols[0]);
    }

    // Cell 1: linkText (post title)
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

    // Cell 4: link URL — combine with title cell to create an anchor
    if (cols[4] && cols[1]) {
      const url = cols[4].textContent.trim();
      if (url) {
        const titleP = cols[1].querySelector('p, a');
        if (titleP && titleP.tagName === 'P' && !titleP.querySelector('a')) {
          const a = document.createElement('a');
          a.href = url;
          a.textContent = titleP.textContent;
          titleP.textContent = '';
          titleP.append(a);
        }
      }
    }

    grid.append(li);
  });

  // Clear block and rebuild
  block.textContent = '';
  block.append(headerContent);
  if (headingEl) block.append(headingEl);
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
  if (headingEl) {
    headingEl.dataset.aueProp = 'heading';
    headingEl.dataset.aueType = 'text';
    headingEl.dataset.aueLabel = 'Título sección';
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
