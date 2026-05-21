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
  const allLinks = [...block.querySelectorAll('a')];
  const allParagraphs = [...block.querySelectorAll(':scope p')];

  // Separate paragraphs: those with links vs plain text
  const textParas = allParagraphs.filter((p) => !p.querySelector('a') && p.textContent.trim());

  // Identify title: explicit h2/h3, or the short text that isn't phone/email
  let titleEl = block.querySelector('h2, h3');
  if (!titleEl) {
    titleEl = textParas.find((p) => {
      const t = p.textContent.trim();
      return t.length < 20 && !t.includes('@') && !/\d{2,}/.test(t);
    });
  }

  // Identify description: the longest plain paragraph (excluding title)
  const descPara = textParas.find((p) => p !== titleEl && p.textContent.trim().length > 20);

  // Build semantic layout
  const container = document.createElement('div');
  container.classList.add('contact-bar-container');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('contact-bar-heading');
  if (titleEl) {
    titleEl.classList.add('contact-bar-title');
    headingWrapper.append(titleEl);
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
    // No links found — build CTAs from phone/email paragraphs only
    const ctaTexts = textParas.filter((p) => {
      if (p === titleEl || p === descPara) return false;
      const t = p.textContent.trim();
      return t.includes('@') || /\d{2,}/.test(t);
    });
    ctaTexts.forEach((p) => {
      const a = document.createElement('a');
      a.classList.add('contact-bar-cta');
      a.textContent = p.textContent.trim();
      const text = p.textContent.trim();
      if (text.includes('@')) {
        a.href = `mailto:${text}`;
      } else {
        a.href = `tel:${text.replace(/[^\d+]/g, '')}`;
      }
      actionsWrapper.append(a);
    });
  }

  container.append(headingWrapper, bodyWrapper, actionsWrapper);

  // Clear block and append new structure
  block.textContent = '';
  block.append(container);
}
