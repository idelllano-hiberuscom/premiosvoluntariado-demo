/**
 * Vidas Cruzadas Block — AEM Edge Delivery Services
 *
 * Figma reference: 1:549 (desktop), 1:230 (mobile)
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Added moveInstrumentation import for cards pattern (new <li> elements)
 * - Added UE data-aue-* instrumentation for all editable fields
 *
 * @param {Element} block - Root element of the block
 */
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  const rows = [...block.children];

  // — Fila 1: Header con logo —
  const headerRow = rows[0];
  headerRow.classList.add('vidas-cruzadas-header');

  const logoPicture = headerRow.querySelector('picture');
  const logoImg = logoPicture?.querySelector('img');
  if (logoImg) {
    logoImg.classList.add('vidas-cruzadas-logo');
    logoImg.setAttribute('loading', 'lazy');
    logoImg.setAttribute('decoding', 'async');
    logoImg.setAttribute('width', '300');
    logoImg.setAttribute('height', '66');
  }

  // — Fila 2: Texto descriptivo + CTA —
  const contentRow = rows[1];
  const textCol = contentRow.children[0];
  const paragraphs = [...textCol.querySelectorAll('p')];

  // Separar párrafos de texto y el párrafo con CTA
  const ctaParagraph = paragraphs.find((p) => p.querySelector('a'));
  const textParagraphs = paragraphs.filter((p) => !p.querySelector('a'));

  // Crear wrapper de texto (elemento nuevo)
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('vidas-cruzadas-text');

  // Mover párrafos de texto al wrapper
  textParagraphs.forEach((p) => textWrapper.append(p));

  // CTA: extraer el <a>, añadir clase, mover el párrafo al wrapper
  let ctaLink = null;
  if (ctaParagraph) {
    ctaLink = ctaParagraph.querySelector('a');
    if (ctaLink) {
      ctaLink.classList.add('vidas-cruzadas-cta');
    }
    textWrapper.append(ctaParagraph);
  }

  // — Filas 3-N: Stories —
  const storyRows = rows.slice(2);
  const storiesList = document.createElement('ul');
  storiesList.classList.add('vidas-cruzadas-stories');

  storyRows.forEach((row) => {
    const cols = [...row.children];
    const li = document.createElement('li');
    li.classList.add('vidas-cruzadas-story');

    // Transfer AEM resource attributes from original row to new <li>
    moveInstrumentation(row, li);

    // Col A: picture (mover nodo existente)
    const picture = cols[0]?.querySelector('picture');
    if (picture) {
      const imgWrapper = document.createElement('div');
      imgWrapper.classList.add('vidas-cruzadas-story-image');
      imgWrapper.append(picture);
      li.append(imgWrapper);

      const img = picture.querySelector('img');
      if (img) {
        img.setAttribute('loading', 'lazy');
        img.setAttribute('decoding', 'async');
      }
    }

    // Col B: h3 (mover nodo existente)
    const heading = cols[1]?.querySelector('h3');
    if (heading) {
      heading.classList.add('vidas-cruzadas-story-title');
      li.append(heading);
    }

    storiesList.append(li);
  });

  // — Construir body (elemento nuevo) —
  const body = document.createElement('div');
  body.classList.add('vidas-cruzadas-body');
  body.append(textWrapper);
  body.append(storiesList);

  // Append body al bloque
  block.append(body);

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Contenedor raíz
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'vidas-cruzadas';
  block.dataset.aueLabel = 'Vidas Cruzadas';

  // Logo (picture en headerRow)
  if (logoPicture) {
    logoPicture.dataset.aueProp = 'logo';
    logoPicture.dataset.aueType = 'media';
    logoPicture.dataset.aueLabel = 'Logo';
  }

  // Texto descriptivo (richtext wrapper)
  textWrapper.dataset.aueProp = 'description';
  textWrapper.dataset.aueType = 'richtext';
  textWrapper.dataset.aueLabel = 'Descripción';

  // CTA link
  if (ctaLink) {
    ctaLink.dataset.aueProp = 'ctaText';
    ctaLink.dataset.aueType = 'text';
    ctaLink.dataset.aueLabel = 'Texto CTA';
  }

  // Stories container
  if (block.dataset.aueResource) {
    storiesList.dataset.aueResource = block.dataset.aueResource;
  }
  storiesList.dataset.aueType = 'container';
  storiesList.dataset.aueFilter = 'vidas-cruzadas-item-filter';
  storiesList.dataset.aueLabel = 'Historias';
  storiesList.dataset.aueBehavior = 'component';

  // Items individuales
  const storyItems = storiesList.querySelectorAll('.vidas-cruzadas-story');
  storyItems.forEach((li, index) => {
    li.dataset.aueType = 'component';
    li.dataset.aueModel = 'vidas-cruzadas-item';
    li.dataset.aueLabel = `Historia ${index + 1}`;

    const pic = li.querySelector('picture');
    if (pic) {
      pic.dataset.aueProp = 'image';
      pic.dataset.aueType = 'media';
      pic.dataset.aueLabel = 'Imagen';
    }

    const h3 = li.querySelector('h3');
    if (h3) {
      h3.dataset.aueProp = 'title';
      h3.dataset.aueType = 'text';
      h3.dataset.aueLabel = 'Título';
    }
  });
}
