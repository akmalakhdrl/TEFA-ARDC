// ARDC Company Profile - script.js
// Handles: loader, smooth scroll, navbar on scroll, reveal animations, counters, parallax, i18n

let currentLang = localStorage.getItem('ardc-lang') || 'id';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('ardc-lang', lang);
  document.documentElement.lang = lang;
  const dict = translations[lang];
  if (!dict) return;
  // Update text content
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key] !== undefined) el.innerHTML = dict[key];
  });
  // Update placeholders
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (dict[key] !== undefined) el.placeholder = dict[key];
  });
  // Update toggle button label
  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    toggle.querySelector('.lang-label').textContent = lang.toUpperCase();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.style.display = 'none'; }, 700);

  // Language toggle
  const langToggle = document.getElementById('lang-toggle');
  if (langToggle) {
    langToggle.addEventListener('click', () => {
      const newLang = currentLang === 'id' ? 'en' : 'id';
      applyLanguage(newLang);
    });
  }
  // Apply saved language on load
  applyLanguage(currentLang);

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Navbar change on scroll
  const header = document.getElementById('site-header');
  const heroBg = document.querySelector('.hero-bg');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) header.classList.add('scrolled'); else header.classList.remove('scrolled');

    // parallax simple
    if (heroBg) heroBg.style.transform = `translateY(${window.scrollY * 0.08}px)`;
  });

  // Mobile menu toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  mobileToggle && mobileToggle.addEventListener('click', () => {
    document.querySelector('.nav ul').classList.toggle('open');
  });

  // Reveal on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('reveal-active');
    });
  }, {threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Counter animation
  const counters = document.querySelectorAll('.num');
  const startCounters = () => {
    counters.forEach(counter => {
      const target = +counter.dataset.target || 0;
      let current = 0;
      const step = Math.max(1, Math.floor(target / 120));
      const timer = setInterval(() => {
        current += step;
        if (current >= target) { counter.innerText = target; clearInterval(timer); }
        else counter.innerText = current;
      }, 12);
    });
  };
  // start counters when stats visible
  const statsEl = document.getElementById('stats');
  if (statsEl) {
    const stObs = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { startCounters(); obs.disconnect(); } });
    }, {threshold:0.35});
    stObs.observe(statsEl);
  }

  // Contact form (placeholder)
  const contactForm = document.getElementById('contactForm');
  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Terima kasih! Pesan Anda telah terkirim.');
    contactForm.reset();
  });

  // WhatsApp CTA
  const wa = document.getElementById('whatsapp-cta');
  const waQuick = document.getElementById('whatsapp-quick');
  const phone = '6281234567890';
  const waUrl = (text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  wa && wa.addEventListener('click', (e) => { e.preventDefault(); window.open(waUrl('Halo ARDC, saya tertarik...'), '_blank'); });
  waQuick && waQuick.addEventListener('click', (e) => { e.preventDefault(); window.open(waUrl('Halo ARDC, saya ingin konsultasi...'), '_blank'); });

  // Brand Partner Tooltip
  const tooltip = document.getElementById('partner-tooltip');
  const partnerCards = document.querySelectorAll('.partner-card');
  if (tooltip && partnerCards.length) {
    partnerCards.forEach(card => {
      card.addEventListener('mouseenter', (e) => {
        const name = card.dataset.partner || '';
        const desc = card.dataset.desc || '';
        tooltip.innerHTML = `<span class="tt-name">${name}</span><span class="tt-desc">${desc}</span>`;
        tooltip.classList.add('active');
      });
      card.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 16) + 'px';
        tooltip.style.top = (e.clientY - 50) + 'px';
      });
      card.addEventListener('mouseleave', () => {
        tooltip.classList.remove('active');
      });
    });
  }
  // Brand Selector Dropdown
  const brandSelectorWrap = document.querySelector('.brand-selector-wrap');
  const brandSelector = document.getElementById('brand-selector');
  const brandDropdown = document.getElementById('brand-dropdown');
  const brandOptions = document.querySelectorAll('.brand-option');
  const brandNameEl = document.getElementById('brand-selector-name');
  const prodSubtitle = document.getElementById('prod-subtitle');

  if (brandSelector && brandDropdown) {
    brandSelector.addEventListener('click', (e) => {
      e.stopPropagation();
      brandSelectorWrap.classList.toggle('open');
    });
    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
      brandSelectorWrap.classList.remove('open');
    });
    brandDropdown.addEventListener('click', (e) => e.stopPropagation());

    brandOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const brand = opt.dataset.brand;
        const brandName = opt.querySelector('span').textContent;
        // Update active state
        brandOptions.forEach(o => o.classList.remove('active'));
        opt.classList.add('active');
        // Update title
        brandNameEl.textContent = brandName;
        // Update subtitle
        const lang = currentLang || 'id';
        if (lang === 'id') {
          prodSubtitle.textContent = `Solusi otomasi industri terpercaya dari ${brandName}`;
        } else {
          prodSubtitle.textContent = `Trusted industrial automation solutions from ${brandName}`;
        }
        // Close dropdown
        brandSelectorWrap.classList.remove('open');
        // Show/hide product cards based on brand (currently only wecon has products)
        const allCards = document.querySelectorAll('.product-card');
        if (brand === 'wecon') {
          allCards.forEach(c => c.classList.remove('hidden'));
          document.querySelector('.product-tabs').style.display = 'flex';
        } else {
          allCards.forEach(c => c.classList.add('hidden'));
          document.querySelector('.product-tabs').style.display = 'none';
          // Show coming soon message if not exists
          let comingSoon = document.getElementById('coming-soon-msg');
          if (!comingSoon) {
            comingSoon = document.createElement('div');
            comingSoon.id = 'coming-soon-msg';
            comingSoon.className = 'coming-soon glass';
            document.querySelector('.products-grid').before(comingSoon);
          }
          const csText = lang === 'id' ? 'Produk segera hadir' : 'Products coming soon';
          comingSoon.innerHTML = `<p>🔜 ${csText} — <strong>${brandName}</strong></p>`;
          comingSoon.style.display = 'block';
        }
        // Remove coming soon if wecon
        if (brand === 'wecon') {
          const cs = document.getElementById('coming-soon-msg');
          if (cs) cs.style.display = 'none';
        }
      });
    });
  }

  // Product Filter Tabs
  const productTabs = document.querySelectorAll('.product-tab');
  const productCards = document.querySelectorAll('.product-card');
  if (productTabs.length && productCards.length) {
    productTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Update active tab
        productTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.dataset.filter;
        productCards.forEach(card => {
          if (filter === 'all' || card.dataset.category === filter) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // Product WhatsApp CTA
  const productBtns = document.querySelectorAll('.btn-product');
  productBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = btn.dataset.wa || 'Halo, saya tertarik dengan produk Wecon';
      window.open(waUrl(msg), '_blank');
    });
  });

});
