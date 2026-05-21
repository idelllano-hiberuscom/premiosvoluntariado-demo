/**
 * Contact Bar Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * Handles multiple possible DOM structures:
 *   - 1 cell with all content (h2 + p elements, some with <a>)
 *   - Multiple cells (one per model field)
 *   - Multiple rows
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  // Gather all content elements from the block
  const heading = block.querySelector('h2, h3');
  const allLinks = [...block.querySelectorAll('a')];
  const allParagraphs = [...block.querySelectorAll(':scope p')];

  // Separate paragraphs: those with links vs plain text
  const textParas = allParagraphs.filter((p) => !p.querySelector('a') && p.textContent.trim());

  // Identify description: the longest plain paragraph (or first non-title one)
  const descPara = textParas.find((p) => p.textContent.trim().length > 20)
    || textParas.find((p) => p !== heading);

  // Build semantic layout
  const container = document.createElement('div');
  container.classList.add('contact-bar-container');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('contact-bar-heading');
  if (heading) {
    heading.classList.add('contact-bar-title');
    headingWrapper.append(heading);
  }

  // Body (description)
  const bodyWrapper = document.createElement('div');
  bodyWrapper.classList.add('contact-bar-body');
  if (descPara) {
    descPara.classList.add('contact-bar-text');
    bodyWrapper.append(descPara);
  }

  // Actions — use existing <a> links or build from remaining text
  const actionsWrapper = document.createElement('div');
  actionsWrapper.classList.add('contact-bar-actions');

  if (allLinks.length > 0) {
    // Use actual links from the content
    allLinks.forEach((a) => {
      a.classList.remove('button');
      a.classList.add('contact-bar-cta');
      actionsWrapper.append(a);
    });
  } else {
    // No links found — build from remaining text paragraphs
    const ctaTexts = textParas.filter((p) => p !== descPara && p.textContent.trim());
    ctaTexts.forEach((p) => {
      const a = document.createElement('a');
      a.classList.add('contact-bar-cta');
      a.textContent = p.textContent.trim();
      const text = p.textContent.trim();
      if (text.includes('@')) {
        a.href = `mailto:${text}`;
      } else if (/\d{2,}/.test(text)) {
        a.href = `tel:${text.replace(/[^\d+]/g, '')}`;
      } else {
        a.href = '#';
      }
      actionsWrapper.append(a);
    });
  }

  container.append(headingWrapper, bodyWrapper, actionsWrapper);

  // Clear block and append new structure
  block.textContent = '';
  block.append(container);
}
