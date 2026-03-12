/* ========================
   Icons
   ======================== */
const ICONS = {
  spotify: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>`,
  appleMusic: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3v12.27c0 .93-.36 1.72-1.06 2.28-.65.51-1.49.76-2.34.76-.85 0-1.58-.21-2.13-.62-.55-.41-.85-.98-.85-1.69s.3-1.28.85-1.69c.55-.41 1.28-.62 2.13-.62.5 0 .96.08 1.38.25V7.15L9 9.59v8.14c0 .93-.36 1.72-1.06 2.28-.65.51-1.49.76-2.34.76-.85 0-1.58-.21-2.13-.62C2.92 19.74 2.62 19.17 2.62 18.46s.3-1.28.85-1.69c.55-.41 1.28-.62 2.13-.62.5 0 .96.08 1.38.25V5.42c0-.4.16-.76.44-1.02.28-.26.64-.42 1.04-.5L18.1 1.06c.2-.04.39-.06.56-.06.41 0 .76.14 1.02.4.27.27.32.62.32 1.02V3z"/></svg>`,
  youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
};

const LINK_LABELS = {
  spotify: 'Spotify',
  appleMusic: 'Apple Music',
  youtube: 'YouTube',
  instagram: 'Instagram',
  tiktok: 'TikTok'
};

/* ========================
   Load & Render
   ======================== */
let artists = [];

async function init() {
  const res = await fetch('artists.json');
  artists = await res.json();
  renderMarquee();
  renderGrid();
  setupObserver();
  setupNav();
  setupCursor();
}

function renderMarquee() {
  const track = document.getElementById('marquee-track');
  const names = artists.map(a => a.name).join('');
  // Duplicate for seamless loop
  for (let i = 0; i < 2; i++) {
    artists.forEach(a => {
      const item = document.createElement('span');
      item.className = 'marquee-item';
      item.textContent = a.name;
      track.appendChild(item);
    });
  }
}

function renderGrid() {
  const grid = document.getElementById('roster-grid');
  grid.innerHTML = '';

  artists.forEach((artist) => {
    const card = document.createElement('div');
    card.className = 'artist-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <img class="artist-card-img" src="${artist.profileImage}" alt="${artist.name}" loading="lazy">
      <div class="artist-card-overlay">
        <h3 class="artist-card-name">${artist.name}</h3>
        <span class="artist-card-cta">
          View
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </span>
      </div>
    `;
    card.addEventListener('click', () => openExpand(artist));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openExpand(artist);
      }
    });
    grid.appendChild(card);
  });
}

/* ========================
   Intersection Observer (scroll reveal)
   ======================== */
function setupObserver() {
  const cards = document.querySelectorAll('.artist-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  cards.forEach(card => observer.observe(card));
}

/* ========================
   Nav scroll effect
   ======================== */
function setupNav() {
  const nav = document.getElementById('nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ========================
   Cursor glow (desktop)
   ======================== */
function setupCursor() {
  const glow = document.getElementById('cursor-glow');
  if (!matchMedia('(hover: hover)').matches) return;

  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
    if (!glow.classList.contains('active')) glow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    glow.classList.remove('active');
  });
}

/* ========================
   Expand (Modal)
   ======================== */
function openExpand(artist) {
  const el = document.getElementById('artist-expand');
  document.getElementById('expand-wide').style.backgroundImage = `url('${artist.wideImage}')`;
  document.getElementById('expand-profile').src = artist.profileImage;
  document.getElementById('expand-profile').alt = artist.name;
  document.getElementById('expand-name').textContent = artist.name;

  const linksEl = document.getElementById('expand-links');
  linksEl.innerHTML = '';

  Object.entries(artist.links).forEach(([key, url]) => {
    if (!url) return;
    const a = document.createElement('a');
    a.className = 'expand-link';
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener';
    a.innerHTML = `${ICONS[key] || ''}${LINK_LABELS[key] || key}`;
    linksEl.appendChild(a);
  });

  el.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeExpand() {
  document.getElementById('artist-expand').classList.remove('active');
  document.body.style.overflow = '';
}

document.getElementById('expand-backdrop').addEventListener('click', closeExpand);
document.getElementById('expand-close').addEventListener('click', closeExpand);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeExpand();
});

/* ========================
   Init
   ======================== */
init();
