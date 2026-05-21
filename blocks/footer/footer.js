/**
 * Footer Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Sin cambios necesarios al código del Developer
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [row1, row2, row3, row4] = rows;

  // --- FILA 1 + FILA 2: Crear wrapper .footer-main con 4 columnas ---
  const footerMain = document.createElement('div');
  footerMain.classList.add('footer-main');

  if (row1) {
    const cols1 = [...row1.children];
    // Col A de fila 1: brand (logos + contacto)
    if (cols1[0]) {
      cols1[0].classList.add('footer-col', 'footer-col--brand');
      const paragraphs = cols1[0].querySelectorAll('p');
      paragraphs.forEach((p) => {
        if (p.querySelector('strong')) {
          p.classList.add('footer-col-title');
        }
      });
      const ul = cols1[0].querySelector('ul');
      if (ul) ul.classList.add('footer-contact-list');
      footerMain.appendChild(cols1[0]);
    }
    // Col B de fila 1: nav "Los Premios"
    if (cols1[1]) {
      cols1[1].classList.add('footer-col');
      const titleP = cols1[1].querySelector('p');
      if (titleP && titleP.querySelector('strong')) {
        titleP.classList.add('footer-col-title');
      }
      const ul = cols1[1].querySelector('ul');
      if (ul) ul.classList.add('footer-nav-list');
      footerMain.appendChild(cols1[1]);
    }
  }

  if (row2) {
    const cols2 = [...row2.children];
    // Col A de fila 2: "Ganadores" + "Blog" titles
    if (cols2[0]) {
      cols2[0].classList.add('footer-col');
      cols2[0].querySelectorAll('p').forEach((p) => {
        if (p.querySelector('strong')) {
          p.classList.add('footer-col-title');
        }
      });
      footerMain.appendChild(cols2[0]);
    }
    // Col B de fila 2: "Participa" nav
    if (cols2[1]) {
      cols2[1].classList.add('footer-col');
      const titleP = cols2[1].querySelector('p');
      if (titleP && titleP.querySelector('strong')) {
        titleP.classList.add('footer-col-title');
      }
      const ul = cols2[1].querySelector('ul');
      if (ul) ul.classList.add('footer-nav-list');
      footerMain.appendChild(cols2[1]);
    }
  }

  // Insert footerMain before any remaining rows
  block.prepend(footerMain);

  // Remove empty row shells (row1 and row2 are now empty since cols were moved)
  if (row1 && row1.children.length === 0) row1.remove();
  if (row2 && row2.children.length === 0) row2.remove();

  // --- FILA 3: Redes sociales ---
  if (row3) {
    row3.classList.add('footer-social');
    const ul = row3.querySelector('ul');
    if (ul) ul.classList.add('footer-social-list');
  }

  // --- FILA 4: Barra legal ---
  if (row4) {
    row4.classList.add('footer-legal');
  }

  // --- Imágenes: todas lazy (footer is below-fold) ---
  block.querySelectorAll('picture img').forEach((img) => {
    img.setAttribute('loading', 'lazy');
    img.setAttribute('decoding', 'async');
  });

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Bloque raíz
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'footer';
  block.dataset.aueLabel = 'Footer';

  // footerMain como contenedor de columnas de navegación
  footerMain.dataset.aueType = 'container';
  footerMain.dataset.aueFilter = 'footer-nav-column-filter';
  footerMain.dataset.aueLabel = 'Columnas de navegación';
  footerMain.dataset.aueBehavior = 'component';
  if (block.dataset.aueResource) {
    footerMain.dataset.aueResource = block.dataset.aueResource;
  }

  // Logo 1 y Logo 2 en col--brand
  const brandCol = block.querySelector('.footer-col--brand');
  if (brandCol) {
    const pictures = brandCol.querySelectorAll('picture');
    if (pictures[0]) {
      pictures[0].dataset.aueProp = 'logo1';
      pictures[0].dataset.aueType = 'media';
      pictures[0].dataset.aueLabel = 'Logo Fundación';
    }
    if (pictures[1]) {
      pictures[1].dataset.aueProp = 'logo2';
      pictures[1].dataset.aueType = 'media';
      pictures[1].dataset.aueLabel = 'Logo Premios';
    }
  }

  // Copyright en barra legal
  const legalBar = block.querySelector('.footer-legal');
  if (legalBar) {
    const copyrightP = legalBar.querySelector('p');
    if (copyrightP) {
      copyrightP.dataset.aueProp = 'copyright';
      copyrightP.dataset.aueType = 'text';
      copyrightP.dataset.aueLabel = 'Copyright';
    }
  }

  // Columnas de navegación (moved nodes — already have AEM-injected data-aue-resource)
  const navCols = footerMain.querySelectorAll('.footer-col:not(.footer-col--brand)');
  navCols.forEach((col) => {
    col.dataset.aueType = 'component';
    col.dataset.aueModel = 'footer-nav-column';
    const titleEl = col.querySelector('.footer-col-title');
    const titleText = titleEl ? titleEl.textContent.trim() : 'Navegación';
    col.dataset.aueLabel = `Columna ${titleText}`;

    // Título de la columna
    if (titleEl) {
      titleEl.dataset.aueProp = 'columnTitle';
      titleEl.dataset.aueType = 'text';
      titleEl.dataset.aueLabel = 'Título columna';
    }

    // Lista de enlaces
    const navList = col.querySelector('.footer-nav-list');
    if (navList) {
      navList.dataset.aueProp = 'links';
      navList.dataset.aueType = 'richtext';
      navList.dataset.aueLabel = 'Enlaces';
    }
  });
}
