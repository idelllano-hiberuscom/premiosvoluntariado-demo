/**
 * Intro Year Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM: 1 row, 3 cells: [picture(logo)], [year text], [richtext description]
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cols = [...row.children];
  const mediaCell = cols[0]; // <picture>
  const yearCell = cols[1]; // <p>2025</p>
  const descCell = cols[2]; // richtext paragraphs

  // Classify cells
  if (mediaCell) mediaCell.classList.add('intro-year-media');
  if (yearCell) yearCell.classList.add('intro-year-year');
  if (descCell) descCell.classList.add('intro-year-description');

  // Wrap row for layout
  row.classList.add('intro-year-content');

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
