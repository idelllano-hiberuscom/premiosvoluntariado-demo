/**
 * Requirements Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM (container, no config fields):
 *   Each item row: 4 cells [title text], [subtitle text], [variant text], [content richtext]
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  const grid = document.createElement('div');
  grid.classList.add('requirements-grid');

  rows.forEach((row, rowIndex) => {
    const cols = [...row.children];

    // Cell 0: title
    const titleCell = cols[0];
    // Cell 1: subtitle
    const subtitleCell = cols[1];
    // Cell 2: variant (checklist/links) — metadata, hide it
    const variantCell = cols[2];
    // Cell 3: content (richtext list)
    const contentCell = cols[3];

    // Read variant value before hiding
    let variant = 'checklist';
    if (variantCell) {
      variant = variantCell.textContent.trim().toLowerCase();
    } else if (rowIndex > 0) {
      variant = 'links';
    }

    // Classify row as card
    row.classList.add('requirements-card', `requirements-card--${variant}`);

    // Header area (title + subtitle)
    if (titleCell) titleCell.classList.add('requirements-card-header');
    if (subtitleCell) {
      subtitleCell.classList.add('requirements-card-subtitle');
      titleCell.append(subtitleCell);
    }

    // Hide variant cell (metadata only)
    if (variantCell) {
      variantCell.hidden = true;
      variantCell.classList.add('requirements-card-variant');
    }

    // Body content
    if (contentCell) {
      contentCell.classList.add('requirements-card-body');
      if (variant === 'checklist') {
        const ul = contentCell.querySelector('ul');
        if (ul) {
          ul.classList.add('requirements-list');
          ul.querySelectorAll('li').forEach((li) => {
            li.classList.add('requirements-list-item');
            const icon = document.createElement('span');
            icon.classList.add('requirements-check-icon');
            icon.setAttribute('aria-hidden', 'true');
            li.prepend(icon);
          });
        }
      } else {
        const ul = contentCell.querySelector('ul');
        if (ul) {
          ul.classList.add('requirements-links');
          ul.querySelectorAll('li').forEach((li) => {
            li.classList.add('requirements-link-item');
          });
          ul.querySelectorAll('a').forEach((a) => {
            a.classList.add('requirements-link');
          });
        }
      }
    }

    // Accessibility
    const titleId = `requirements-card-title-${rowIndex}`;
    if (titleCell) titleCell.id = titleId;
    row.setAttribute('role', 'region');
    row.setAttribute('aria-labelledby', titleId);

    grid.append(row);
  });

  block.append(grid);

  // --- UE instrumentation (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'requirements';
  block.dataset.aueLabel = 'Requisitos';

  if (block.dataset.aueResource) {
    grid.dataset.aueResource = block.dataset.aueResource;
  }
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'requirements-card';
  grid.dataset.aueBehavior = 'component';

  const cards = grid.querySelectorAll('.requirements-card');
  cards.forEach((card, index) => {
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'requirements-card';
    card.dataset.aueLabel = `Tarjeta ${index + 1}`;

    const header = card.querySelector('.requirements-card-header');
    if (header) {
      header.dataset.aueProp = 'title';
      header.dataset.aueType = 'text';
      header.dataset.aueLabel = 'Título';
    }

    const subtitle = card.querySelector('.requirements-card-subtitle');
    if (subtitle) {
      subtitle.dataset.aueProp = 'subtitle';
      subtitle.dataset.aueType = 'text';
      subtitle.dataset.aueLabel = 'Subtítulo';
    }

    const body = card.querySelector('.requirements-card-body');
    if (body) {
      body.dataset.aueProp = 'content';
      body.dataset.aueType = 'richtext';
      body.dataset.aueLabel = 'Contenido';
    }
  });
}
