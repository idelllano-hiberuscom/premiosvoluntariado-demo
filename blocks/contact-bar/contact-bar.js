/**
 * Contact Bar Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM (ENTRADA):
 *   Row 0: [col A: <h2>title</h2>] [col B: <p>desc</p><p><a phone>...</a></p>]
 *   Row 1: [col A: <p><a email>...</a></p>]
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  // Collect all cells across all rows
  const allCells = [...block.querySelectorAll(':scope > div > div')];

  // Find title: look for h2/h3 or the cell containing one
  let titleEl = null;
  let titleCell = null;
  allCells.forEach((cell) => {
    const heading = cell.querySelector('h2, h3');
    if (heading && !titleEl) {
      titleEl = heading;
      titleCell = cell;
    }
  });

  // Find all links (phone/email CTAs)
  const links = [];
  allCells.forEach((cell) => {
    cell.querySelectorAll('a').forEach((a) => {
      links.push(a);
    });
  });

  // Find description: paragraphs that are NOT inside a link's parent and not in title cell
  let descText = null;
  allCells.forEach((cell) => {
    if (cell === titleCell) return;
    [...cell.querySelectorAll('p')].forEach((p) => {
      if (!p.querySelector('a') && p.textContent.trim() && !descText) {
        descText = p;
      }
    });
  });

  // Build semantic layout
  const container = document.createElement('div');
  container.classList.add('contact-bar-container');

  // Heading wrapper
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('contact-bar-heading');
  if (titleEl) {
    titleEl.classList.add('contact-bar-title');
    headingWrapper.append(titleEl);
  }

  // Body wrapper
  const bodyWrapper = document.createElement('div');
  bodyWrapper.classList.add('contact-bar-body');
  if (descText) {
    descText.classList.add('contact-bar-text');
    bodyWrapper.append(descText);
  }

  // Actions wrapper
  const actionsWrapper = document.createElement('div');
  actionsWrapper.classList.add('contact-bar-actions');
  links.forEach((a) => {
    a.classList.add('contact-bar-cta');
    actionsWrapper.append(a);
  });

  container.append(headingWrapper, bodyWrapper, actionsWrapper);

  // Remove original rows
  [...block.querySelectorAll(':scope > div')].forEach((row) => row.remove());
  block.append(container);
}
