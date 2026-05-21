/**
 * Contact Bar Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * Model fields (6): title, description, phoneText, phone, emailText, email
 * xwalk delivery: 1 row, 6 cells (one per model field, in order)
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cells = [...row.children];
  // Positional access matching component-models.json field order
  const titleCell = cells[0]; // title
  const descCell = cells[1]; // description
  const phoneTextCell = cells[2]; // phoneText (display label)
  const phoneUrlCell = cells[3]; // phone (URL like tel:...)
  const emailTextCell = cells[4]; // emailText (display label)
  const emailUrlCell = cells[5]; // email (URL like mailto:...)

  // Build semantic layout
  const container = document.createElement('div');
  container.classList.add('contact-bar-container');

  // Heading
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('contact-bar-heading');
  if (titleCell) {
    const titleContent = titleCell.querySelector('h2, h3, p') || titleCell;
    titleContent.classList.add('contact-bar-title');
    headingWrapper.append(titleContent);
  }

  // Body (description)
  const bodyWrapper = document.createElement('div');
  bodyWrapper.classList.add('contact-bar-body');
  if (descCell) {
    const descContent = descCell.querySelector('p') || descCell;
    descContent.classList.add('contact-bar-text');
    bodyWrapper.append(descContent);
  }

  // Actions — build <a> links from text+url pairs
  const actionsWrapper = document.createElement('div');
  actionsWrapper.classList.add('contact-bar-actions');

  // Phone CTA
  const phoneText = phoneTextCell ? phoneTextCell.textContent.trim() : '';
  const phoneUrl = phoneUrlCell ? phoneUrlCell.textContent.trim() : '';
  if (phoneText) {
    const phoneLink = document.createElement('a');
    phoneLink.classList.add('contact-bar-cta');
    phoneLink.textContent = phoneText;
    phoneLink.href = phoneUrl || '#';
    actionsWrapper.append(phoneLink);
  }

  // Email CTA
  const emailText = emailTextCell ? emailTextCell.textContent.trim() : '';
  const emailUrl = emailUrlCell ? emailUrlCell.textContent.trim() : '';
  if (emailText) {
    const emailLink = document.createElement('a');
    emailLink.classList.add('contact-bar-cta');
    emailLink.textContent = emailText;
    emailLink.href = emailUrl || '#';
    actionsWrapper.append(emailLink);
  }

  container.append(headingWrapper, bodyWrapper, actionsWrapper);

  // Replace original content
  row.remove();
  block.append(container);
}
