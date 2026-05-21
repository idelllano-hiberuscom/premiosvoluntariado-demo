/**
 * Contact Bar Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM: 1 row, 4 cells: [title], [description], [phone <a>], [email <a>]
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const row = block.children[0];
  if (!row) return;

  const cols = [...row.children];
  const titleCell = cols[0]; // <p>title</p>
  const descCell = cols[1]; // <p>description</p>
  const phoneCell = cols[2]; // <p><a href="tel:...">text</a></p>
  const emailCell = cols[3]; // <p><a href="mailto:...">text</a></p>

  // Build semantic layout
  const container = document.createElement('div');
  container.classList.add('contact-bar-container');

  // Heading wrapper
  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('contact-bar-heading');
  if (titleCell) {
    titleCell.classList.add('contact-bar-title');
    headingWrapper.append(titleCell);
  }

  // Body wrapper
  const bodyWrapper = document.createElement('div');
  bodyWrapper.classList.add('contact-bar-body');
  if (descCell) {
    descCell.classList.add('contact-bar-text');
    bodyWrapper.append(descCell);
  }

  // Actions wrapper
  const actionsWrapper = document.createElement('div');
  actionsWrapper.classList.add('contact-bar-actions');

  if (phoneCell) {
    const phoneLink = phoneCell.querySelector('a');
    if (phoneLink) phoneLink.classList.add('contact-bar-cta');
    phoneCell.classList.add('contact-bar-phone');
    actionsWrapper.append(phoneCell);
  }
  if (emailCell) {
    const emailLink = emailCell.querySelector('a');
    if (emailLink) emailLink.classList.add('contact-bar-cta');
    emailCell.classList.add('contact-bar-email');
    actionsWrapper.append(emailCell);
  }

  container.append(headingWrapper, bodyWrapper, actionsWrapper);
  row.remove();
  block.append(container);

  // --- UE instrumentation (xwalk) ---
  if (block.dataset.aueResource) {
    block.dataset.aueType = 'component';
    block.dataset.aueModel = 'contact-bar';
    block.dataset.aueLabel = 'Barra de contacto';
  }

  if (titleCell) {
    titleCell.dataset.aueProp = 'title';
    titleCell.dataset.aueType = 'text';
    titleCell.dataset.aueLabel = 'Título';
  }
  if (descCell) {
    descCell.dataset.aueProp = 'description';
    descCell.dataset.aueType = 'text';
    descCell.dataset.aueLabel = 'Descripción';
  }
  if (phoneCell) {
    phoneCell.dataset.aueProp = 'phoneText';
    phoneCell.dataset.aueType = 'text';
    phoneCell.dataset.aueLabel = 'Teléfono';
  }
  if (emailCell) {
    emailCell.dataset.aueProp = 'emailText';
    emailCell.dataset.aueType = 'text';
    emailCell.dataset.aueLabel = 'Email';
  }
}
