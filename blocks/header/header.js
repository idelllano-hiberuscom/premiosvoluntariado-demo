/**
 * Header Block — AEM Edge Delivery Services
 *
 * Figma reference: Header principal Premios al Voluntariado
 * Model: xwalk (EDS + Universal Editor)
 * UE instrumentation: ✅ Completado (Fase 3)
 * QA audit: ✅ Validado
 *
 * QA Changes:
 * - Añadido alt="" en iconos sociales (decorativos dentro de link con aria-label)
 * - Instrumentación UE xwalk completa
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const [logosRow, socialRow] = rows;

  // --- LOGOS ROW ---
  if (logosRow) {
    logosRow.classList.add('header-logos');
    const logoCols = [...logosRow.children];

    if (logoCols[0]) {
      logoCols[0].classList.add('header-logo', 'header-logo--main');
      const mainLink = document.createElement('a');
      mainLink.href = '/';
      mainLink.setAttribute('aria-label', 'Premios al Voluntariado Universitario');
      const mainPicture = logoCols[0].querySelector('picture');
      if (mainPicture) {
        mainLink.append(mainPicture);
        logoCols[0].append(mainLink);
        // LCP — logos in immediate viewport
        const mainImg = mainPicture.querySelector('img');
        if (mainImg) {
          mainImg.setAttribute('loading', 'eager');
          mainImg.setAttribute('fetchpriority', 'high');
        }
      }
    }

    if (logoCols[1]) {
      logoCols[1].classList.add('header-logo', 'header-logo--partner');
      const partnerLink = document.createElement('a');
      partnerLink.href = 'https://fundacionmutua.es';
      partnerLink.setAttribute('aria-label', 'Fundacion Mutua Madrilena');
      partnerLink.setAttribute('target', '_blank');
      partnerLink.setAttribute('rel', 'noopener');
      const partnerPicture = logoCols[1].querySelector('picture');
      if (partnerPicture) {
        partnerLink.append(partnerPicture);
        logoCols[1].append(partnerLink);
        const partnerImg = partnerPicture.querySelector('img');
        if (partnerImg) {
          partnerImg.setAttribute('loading', 'eager');
        }
      }
    }
  }

  // --- SOCIAL ROW ---
  if (socialRow) {
    socialRow.classList.add('header-social');
    socialRow.setAttribute('role', 'navigation');
    socialRow.setAttribute('aria-label', 'Redes sociales');

    const socialCol = socialRow.children[0];
    if (socialCol) {
      const ul = socialCol.querySelector('ul');
      if (ul) {
        ul.classList.add('header-social-list');

        // Set aria-labels on social links based on href
        ul.querySelectorAll('li').forEach((li) => {
          const link = li.querySelector('a');
          if (link) {
            link.classList.add('header-social-link');
            const href = link.getAttribute('href') || '';
            let label = 'Red social';
            if (href.includes('twitter') || href.includes('x.com')) label = 'Twitter';
            else if (href.includes('instagram')) label = 'Instagram';
            else if (href.includes('facebook')) label = 'Facebook';
            else if (href.includes('youtube')) label = 'YouTube';

            if (!link.getAttribute('aria-label')) {
              link.setAttribute('aria-label', label);
            }
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener');
          }

          // Social icons: lazy, small SVGs (alt="" = decorative, link has aria-label)
          li.querySelectorAll('img').forEach((img) => {
            img.setAttribute('loading', 'lazy');
            img.setAttribute('decoding', 'async');
            img.setAttribute('width', '20');
            img.setAttribute('height', '20');
            img.setAttribute('alt', '');
          });
        });
      }
    }
  }

  // --- HAMBURGER BUTTON (new UI element — not in original DOM) ---
  const menuToggle = document.createElement('button');
  menuToggle.classList.add('header-menu-toggle');
  menuToggle.setAttribute('type', 'button');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.innerHTML = '<span class="header-menu-icon"></span>';
  block.append(menuToggle);

  // Toggle mobile menu
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    menuToggle.setAttribute('aria-label', expanded ? 'Abrir menu' : 'Cerrar menu');
    block.classList.toggle('header--menu-open', !expanded);
  });

  // --- INSTRUMENTACIÓN UE (xwalk) ---

  // Bloque raíz — AEM inyecta data-aue-resource; añadimos type/model/label
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'header';
  block.dataset.aueLabel = 'Header';

  // Logo principal (picture)
  const mainPictureEl = block.querySelector('.header-logo--main picture');
  if (mainPictureEl) {
    mainPictureEl.dataset.aueProp = 'logoMain';
    mainPictureEl.dataset.aueType = 'media';
    mainPictureEl.dataset.aueLabel = 'Logo principal';
  }

  // URL logo principal (link)
  const mainLinkEl = block.querySelector('.header-logo--main a');
  if (mainLinkEl) {
    mainLinkEl.dataset.aueProp = 'logoMainUrl';
    mainLinkEl.dataset.aueType = 'text';
    mainLinkEl.dataset.aueLabel = 'URL logo principal';
  }

  // Logo partner (picture)
  const partnerPictureEl = block.querySelector('.header-logo--partner picture');
  if (partnerPictureEl) {
    partnerPictureEl.dataset.aueProp = 'logoPartner';
    partnerPictureEl.dataset.aueType = 'media';
    partnerPictureEl.dataset.aueLabel = 'Logo partner';
  }

  // URL logo partner (link)
  const partnerLinkEl = block.querySelector('.header-logo--partner a');
  if (partnerLinkEl) {
    partnerLinkEl.dataset.aueProp = 'logoPartnerUrl';
    partnerLinkEl.dataset.aueType = 'text';
    partnerLinkEl.dataset.aueLabel = 'URL logo partner';
  }

  // Contenedor social — items repetibles
  const socialContainer = block.querySelector('.header-social');
  if (socialContainer) {
    if (block.dataset.aueResource) {
      socialContainer.dataset.aueResource = block.dataset.aueResource;
    }
    socialContainer.dataset.aueType = 'container';
    socialContainer.dataset.aueFilter = 'header';
    socialContainer.dataset.aueLabel = 'Redes sociales';
    socialContainer.dataset.aueBehavior = 'component';

    // Items individuales (li) — nodos originales del DOM EDS
    const socialItems = socialContainer.querySelectorAll('.header-social-list li');
    socialItems.forEach((li, index) => {
      li.dataset.aueType = 'component';
      li.dataset.aueModel = 'header-social-item';
      li.dataset.aueLabel = `Enlace social ${index + 1}`;

      // Prop: icono (picture/img dentro del link)
      const iconPicture = li.querySelector('picture');
      if (iconPicture) {
        iconPicture.dataset.aueProp = 'icon';
        iconPicture.dataset.aueType = 'media';
        iconPicture.dataset.aueLabel = 'Icono red social';
      }

      // Prop: url (el enlace)
      const socialLink = li.querySelector('a');
      if (socialLink) {
        socialLink.dataset.aueProp = 'url';
        socialLink.dataset.aueType = 'text';
        socialLink.dataset.aueLabel = 'URL red social';
      }
    });
  }
}
