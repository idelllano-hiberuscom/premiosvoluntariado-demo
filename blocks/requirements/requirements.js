/**
 * Requirements Block — AEM Edge Delivery Services
 *
 * Figma reference: 1:396 (desktop), 1:118 (mobile)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Añadida instrumentación UE xwalk completa
 * - Añadido role="region" + aria-labelledby a las tarjetas
 *
 * DOM de entrada (matriz EDS):
 *   block
 *     └── div (fila 0) → tarjeta "Requisitos"
 *           ├── div (col 0) → h2 + p (encabezado)
 *           └── div (col 1) → ul > li (lista requisitos)
 *     └── div (fila 1) → tarjeta "Empieza por aquí"
 *           ├── div (col 0) → h2 (encabezado)
 *           └── div (col 1) → ul > li > a (enlaces descarga)
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create grid wrapper (new element — safe to append existing rows into it)
  const grid = document.createElement('div');
  grid.classList.add('requirements-grid');

  rows.forEach((row, rowIndex) => {
    const cols = [...row.children];

    // Classify row as card
    row.classList.add('requirements-card');
    row.classList.add(rowIndex === 0 ? 'requirements-card--checklist' : 'requirements-card--links');

    // Col 0 = card header
    if (cols[0]) {
      cols[0].classList.add('requirements-card-header');
      cols[0].querySelectorAll('h2, h3, h4').forEach((h) => {
        h.classList.add('requirements-card-title');
      });
      cols[0].querySelectorAll('p').forEach((p) => {
        p.classList.add('requirements-card-subtitle');
      });
    }

    // Col 1 = card body content
    if (cols[1]) {
      cols[1].classList.add('requirements-card-body');
      if (rowIndex === 0) {
        // Checklist card — classify list and prepend check icons
        const ul = cols[1].querySelector('ul');
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
        // Links card — classify list and links
        const ul = cols[1].querySelector('ul');
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

    // Accessibility: card as region
    const title = cols[0] && cols[0].querySelector('.requirements-card-title');
    if (title) {
      const titleId = `requirements-card-title-${rowIndex}`;
      title.id = titleId;
      row.setAttribute('role', 'region');
      row.setAttribute('aria-labelledby', titleId);
    }

    // Move row into grid wrapper (safe DOM move — preserves AEM-injected attrs)
    grid.append(row);
  });

  block.append(grid);

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Bloque raíz — AEM ya inyecta data-aue-resource en block
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'requirements';
  block.dataset.aueLabel = 'Requisitos';

  // Grid como contenedor de tarjetas repetibles
  if (block.dataset.aueResource) {
    grid.dataset.aueResource = block.dataset.aueResource;
  }
  grid.dataset.aueType = 'container';
  grid.dataset.aueFilter = 'requirements-card';
  grid.dataset.aueBehavior = 'component';

  // Tarjetas: los nodos movidos con append conservan data-aue-resource de AEM.
  // Solo anotamos data-aue-prop en elementos editables inline.
  const cards = grid.querySelectorAll('.requirements-card');
  cards.forEach((card, index) => {
    card.dataset.aueType = 'component';
    card.dataset.aueModel = 'requirements-card';
    card.dataset.aueLabel = `Tarjeta ${index + 1}`;

    // Título (inline editable)
    const cardTitle = card.querySelector('.requirements-card-title');
    if (cardTitle) {
      cardTitle.dataset.aueProp = 'title';
      cardTitle.dataset.aueType = 'text';
      cardTitle.dataset.aueLabel = 'Título de la tarjeta';
    }

    // Subtítulo (inline editable)
    const cardSubtitle = card.querySelector('.requirements-card-subtitle');
    if (cardSubtitle) {
      cardSubtitle.dataset.aueProp = 'subtitle';
      cardSubtitle.dataset.aueType = 'text';
      cardSubtitle.dataset.aueLabel = 'Subtítulo';
    }

    // Contenido (col body — richtext)
    const cardBody = card.querySelector('.requirements-card-body');
    if (cardBody) {
      cardBody.dataset.aueProp = 'content';
      cardBody.dataset.aueType = 'richtext';
      cardBody.dataset.aueLabel = 'Contenido (lista)';
    }
  });
}
