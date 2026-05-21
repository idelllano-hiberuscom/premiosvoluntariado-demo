/**
 * Contact Bar Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Añadida instrumentación UE (data-aue-*) para edición en Universal Editor
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const row1 = rows[0];
  const row2 = rows[1];

  const heading = row1.querySelector('h2');
  const bodyText = [...row1.querySelectorAll('p')].find((p) => !p.querySelector('a'));
  const phoneLink = row1.querySelector('a');
  const emailLink = row2 ? row2.querySelector('a') : null;

  if (heading) heading.classList.add('contact-bar-title');
  if (bodyText) bodyText.classList.add('contact-bar-text');
  if (phoneLink) phoneLink.classList.add('contact-bar-cta');
  if (emailLink) emailLink.classList.add('contact-bar-cta');

  const container = document.createElement('div');
  container.classList.add('contact-bar-container');

  const headingWrapper = document.createElement('div');
  headingWrapper.classList.add('contact-bar-heading');
  if (heading) headingWrapper.append(heading);

  const bodyWrapper = document.createElement('div');
  bodyWrapper.classList.add('contact-bar-body');
  if (bodyText) bodyWrapper.append(bodyText);

  const actionsWrapper = document.createElement('div');
  actionsWrapper.classList.add('contact-bar-actions');
  if (phoneLink) actionsWrapper.append(phoneLink);
  if (emailLink) actionsWrapper.append(emailLink);

  container.append(headingWrapper, bodyWrapper, actionsWrapper);
  rows.forEach((row) => row.remove());
  block.append(container);

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Bloque raíz
  if (block.dataset.aueResource) {
    block.dataset.aueType = 'component';
    block.dataset.aueModel = 'contact-bar';
    block.dataset.aueLabel = 'Barra de contacto';
  }

  // Título
  if (heading) {
    heading.dataset.aueProp = 'title';
    heading.dataset.aueType = 'text';
    heading.dataset.aueLabel = 'Título';
  }

  // Descripción
  if (bodyText) {
    bodyText.dataset.aueProp = 'description';
    bodyText.dataset.aueType = 'text';
    bodyText.dataset.aueLabel = 'Descripción';
  }

  // CTA teléfono
  if (phoneLink) {
    phoneLink.dataset.aueProp = 'phoneText';
    phoneLink.dataset.aueType = 'text';
    phoneLink.dataset.aueLabel = 'Teléfono';
  }

  // CTA email
  if (emailLink) {
    emailLink.dataset.aueProp = 'emailText';
    emailLink.dataset.aueType = 'text';
    emailLink.dataset.aueLabel = 'Email';
  }
}
