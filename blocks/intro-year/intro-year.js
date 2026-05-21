/**
 * Intro Year Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * Container fields (delivered as individual rows, 1 cell each):
 *   logo (picture), year (short text), description (richtext/long text)
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // --- Detect structure: 1 row with 3+ cells OR individual rows ---
  let mediaCell = null;
  let yearCell = null;
  let descCell = null;

  if (rows.length === 1 && rows[0].children.length >= 3) {
    // Single row with multiple cells
    const cols = [...rows[0].children];
    [mediaCell, yearCell, descCell] = cols;
  } else {
    // Individual rows (1 cell per field) — classify by content
    rows.forEach((row) => {
      const cell = row.children[0] || row;
      if (!mediaCell && cell.querySelector('picture')) {
        mediaCell = cell;
      } else if (!yearCell && cell.textContent.trim().length <= 10) {
        yearCell = cell;
      } else if (!descCell && cell.textContent.trim().length > 10) {
        descCell = cell;
      }
    });
  }

  // Apply classes
  if (mediaCell) mediaCell.classList.add('intro-year-media');
  if (yearCell) yearCell.classList.add('intro-year-year');
  if (descCell) descCell.classList.add('intro-year-description');

  // Build single-row flex layout
  const content = document.createElement('div');
  content.classList.add('intro-year-content');
  if (mediaCell) content.append(mediaCell);
  if (yearCell) content.append(yearCell);
  if (descCell) content.append(descCell);

  block.textContent = '';
  block.append(content);

  // Lazy-load images
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // --- UE instrumentation (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'intro-year';
  block.dataset.aueLabel = 'Intro Año';

  if (mediaCell) {
    mediaCell.dataset.aueProp = 'image';
    mediaCell.dataset.aueType = 'media';
    mediaCell.dataset.aueLabel = 'Logo';
  }
  if (yearCell) {
    yearCell.dataset.aueProp = 'year';
    yearCell.dataset.aueType = 'text';
    yearCell.dataset.aueLabel = 'Año';
  }
  if (descCell) {
    descCell.dataset.aueProp = 'description';
    descCell.dataset.aueType = 'richtext';
    descCell.dataset.aueLabel = 'Descripción';
  }
}
