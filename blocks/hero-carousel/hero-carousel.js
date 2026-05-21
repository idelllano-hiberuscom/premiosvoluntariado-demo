/**
 * Hero Carousel Block — AEM Edge Delivery Services
 *
 * Model: xwalk (EDS + Universal Editor)
 * xwalk DOM:
 *   Container field rows (1 cell): editionLabel
 *   Item rows (2+ cells): [image], [title], [videoUrl], [ctaText], [cta]
 *
 * @param {Element} block - Root element of the block
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Adaptive detection: single-cell = container field, multi-cell = item
  const configFields = [];
  const slideRows = [];

  rows.forEach((row) => {
    if (row.children.length >= 2) {
      slideRows.push(row);
    } else {
      configFields.push(row);
    }
  });

  const totalSlides = slideRows.length;

  // Extract edition label from container fields
  let editionLabel = '';
  configFields.forEach((row) => {
    const text = row.textContent.trim();
    if (text && !editionLabel) editionLabel = text;
    row.classList.add('hero-carousel-config');
  });

  // Viewport and track
  const viewport = document.createElement('div');
  viewport.classList.add('hero-carousel-viewport');

  const track = document.createElement('div');
  track.classList.add('hero-carousel-track');

  // Process slides
  slideRows.forEach((row, index) => {
    row.classList.add('hero-carousel-slide');
    row.setAttribute('role', 'tabpanel');
    row.setAttribute('aria-label', `Slide ${index + 1} de ${totalSlides}`);

    if (index === 0) {
      row.classList.add('hero-carousel-slide--active');
      row.setAttribute('aria-hidden', 'false');
    } else {
      row.setAttribute('aria-hidden', 'true');
    }

    const cols = [...row.children];
    // Cell 0: picture
    if (cols[0]) {
      cols[0].classList.add('hero-carousel-media');
      const img = cols[0].querySelector('picture img');
      if (img) {
        if (index === 0) {
          img.setAttribute('loading', 'eager');
          img.setAttribute('fetchpriority', 'high');
        } else {
          img.setAttribute('loading', 'lazy');
          img.setAttribute('decoding', 'async');
        }
      }
    }

    // Cell 1: title text — displayed in the white card
    if (cols[1]) {
      cols[1].classList.add('hero-carousel-content');
    }

    // Cell 2: videoUrl (hidden metadata)
    if (cols[2]) {
      cols[2].classList.add('hero-carousel-video-meta');
      cols[2].hidden = true;
    }

    // Cell 3: CTA text (hidden in slide, shown in card if needed)
    if (cols[3]) {
      cols[3].classList.add('hero-carousel-cta-wrapper');
      cols[3].hidden = true;
    }

    // Cell 4: CTA url (hidden metadata)
    if (cols[4]) {
      cols[4].hidden = true;
    }

    track.append(row);
  });

  viewport.append(track);

  // Controls
  const controls = document.createElement('div');
  controls.classList.add('hero-carousel-controls');

  const prevBtn = document.createElement('button');
  prevBtn.classList.add('hero-carousel-prev');
  prevBtn.setAttribute('aria-label', 'Slide anterior');
  prevBtn.textContent = '\u2039';

  const nextBtn = document.createElement('button');
  nextBtn.classList.add('hero-carousel-next');
  nextBtn.setAttribute('aria-label', 'Slide siguiente');
  nextBtn.textContent = '\u203A';

  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('hero-carousel-dots');
  dotsContainer.setAttribute('role', 'tablist');

  for (let i = 0; i < totalSlides; i += 1) {
    const dot = document.createElement('button');
    dot.classList.add('hero-carousel-dot');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir a slide ${i + 1}`);
    if (i === 0) {
      dot.classList.add('hero-carousel-dot--active');
      dot.setAttribute('aria-selected', 'true');
    } else {
      dot.setAttribute('aria-selected', 'false');
    }
    dotsContainer.append(dot);
  }

  controls.append(prevBtn, dotsContainer, nextBtn);

  // Edition bar below controls
  const editionBar = document.createElement('div');
  editionBar.classList.add('hero-carousel-edition-bar');

  if (editionLabel) {
    const labelSpan = document.createElement('span');
    labelSpan.classList.add('edition-label');
    labelSpan.textContent = editionLabel;
    editionBar.append(labelSpan);

    // Separator + active slide title
    const sep = document.createElement('span');
    sep.classList.add('edition-separator');
    editionBar.append(sep);
  }

  const slideTitleSpan = document.createElement('span');
  slideTitleSpan.classList.add('edition-slide-title');
  if (slideRows[0]) {
    const firstContent = slideRows[0].querySelector('.hero-carousel-content');
    if (firstContent) slideTitleSpan.textContent = firstContent.textContent.trim();
  }
  editionBar.append(slideTitleSpan);

  block.textContent = '';
  block.append(viewport, controls, editionBar);

  block.setAttribute('role', 'region');
  block.setAttribute('aria-label', 'Hero carousel');

  // --- UE instrumentation (xwalk) ---
  block.dataset.aueType = 'component';
  block.dataset.aueModel = 'hero-carousel';
  block.dataset.aueLabel = 'Hero Carousel';

  // Config fields UE instrumentation
  configFields.forEach((row) => {
    const cell = row.children[0];
    if (cell) {
      cell.dataset.aueProp = 'editionLabel';
      cell.dataset.aueType = 'text';
      cell.dataset.aueLabel = 'Edición';
    }
  });

  // Track as container
  if (block.dataset.aueResource) {
    track.dataset.aueResource = block.dataset.aueResource;
  }
  track.dataset.aueType = 'container';
  track.dataset.aueFilter = 'hero-carousel-item';
  track.dataset.aueBehavior = 'component';

  // Slides (moved nodes preserve AEM-injected attrs)
  slideRows.forEach((row, i) => {
    row.dataset.aueType = 'component';
    row.dataset.aueModel = 'hero-carousel-item';
    row.dataset.aueLabel = `Slide ${i + 1}`;

    const cols = [...row.children];
    if (cols[0]) {
      cols[0].dataset.aueProp = 'image';
      cols[0].dataset.aueType = 'media';
      cols[0].dataset.aueLabel = 'Imagen';
    }
    if (cols[1]) {
      cols[1].dataset.aueProp = 'title';
      cols[1].dataset.aueType = 'richtext';
      cols[1].dataset.aueLabel = 'Contenido card';
    }
    if (cols[3]) {
      cols[3].dataset.aueProp = 'ctaText';
      cols[3].dataset.aueType = 'text';
      cols[3].dataset.aueLabel = 'CTA';
    }
  });

  // --- Navigation logic ---
  let currentIndex = 0;

  function goTo(index) {
    const newIndex = (index + totalSlides) % totalSlides;
    slideRows[currentIndex].classList.remove('hero-carousel-slide--active');
    slideRows[currentIndex].setAttribute('aria-hidden', 'true');
    slideRows[newIndex].classList.add('hero-carousel-slide--active');
    slideRows[newIndex].setAttribute('aria-hidden', 'false');

    const dots = dotsContainer.children;
    dots[currentIndex].classList.remove('hero-carousel-dot--active');
    dots[currentIndex].setAttribute('aria-selected', 'false');
    dots[newIndex].classList.add('hero-carousel-dot--active');
    dots[newIndex].setAttribute('aria-selected', 'true');

    track.style.transform = `translateX(-${newIndex * 100}%)`;

    // Update edition bar slide title
    const newContent = slideRows[newIndex].querySelector('.hero-carousel-content');
    if (newContent) slideTitleSpan.textContent = newContent.textContent.trim();

    currentIndex = newIndex;
  }

  controls.addEventListener('click', (e) => {
    if (e.target.closest('.hero-carousel-prev')) {
      goTo(currentIndex - 1);
    } else if (e.target.closest('.hero-carousel-next')) {
      goTo(currentIndex + 1);
    } else {
      const dot = e.target.closest('.hero-carousel-dot');
      if (dot) {
        const dotIndex = [...dotsContainer.children].indexOf(dot);
        if (dotIndex >= 0) goTo(dotIndex);
      }
    }
  });

  controls.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });
}
