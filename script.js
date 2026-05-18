// ARDC Company Profile - script.js
// Handles: loader, smooth scroll, navbar on scroll, reveal animations, counters, parallax, i18n

let currentLang = localStorage.getItem('ardc-lang') || 'id';

function preserveScrollPosition(mutator) {
  const scrollY = window.scrollY;
  mutator();
  requestAnimationFrame(() => {
    window.scrollTo(0, scrollY);
  });
}

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

  // WhatsApp URL generator (used by multiple features)
  const phone = '6281234567890';
  const waUrl = (text) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  // Promo Modal
  const promoModal = document.getElementById('promo-modal');
  const promoClose = document.getElementById('promo-close');
  const promoOverlay = document.querySelector('.promo-overlay');
  const promoForm = document.getElementById('promo-form');
  const promoNameInput = document.getElementById('promo-name');

  const showPromoModal = () => {
    if (promoModal) {
      promoModal.classList.add('active');
      if (promoNameInput) promoNameInput.focus();
    }
  };

  const closePromoModal = () => {
    if (promoModal) {
      promoModal.classList.remove('active');
    }
  };

  // Close modal on X button
  promoClose && promoClose.addEventListener('click', closePromoModal);
  
  // Close modal on overlay click
  promoOverlay && promoOverlay.addEventListener('click', closePromoModal);

  // Promo form submit
  promoForm && promoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = promoNameInput.value.trim();
    if (!name) return;
    
    const msg = `Halo, saya ${name}. Saya tertarik dengan promo dan konsultasi layanan otomasi industri ARDEC.`;
    window.open(waUrl(msg), '_blank');
    closePromoModal();
    promoForm.reset();
  });

  // Show promo modal after 1.5 seconds (after loader disappears)
  setTimeout(() => {
    const modalShown = sessionStorage.getItem('ardc-promo-shown');
    if (!modalShown) {
      showPromoModal();
      sessionStorage.setItem('ardc-promo-shown', 'true');
    }
  }, 1500);

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
        preserveScrollPosition(() => {
          brandOptions.forEach(o => o.classList.remove('active'));
          opt.classList.add('active');
          brandNameEl.textContent = brandName;

          const lang = currentLang || 'id';
          if (lang === 'id') {
            prodSubtitle.textContent = `Solusi otomasi industri terpercaya dari ${brandName}`;
          } else {
            prodSubtitle.textContent = `Trusted industrial automation solutions from ${brandName}`;
          }

          brandSelectorWrap.classList.remove('open');

          const allCards = document.querySelectorAll('.product-card');
          if (brand === 'wecon') {
            allCards.forEach(c => c.classList.remove('hidden'));
            document.querySelector('.product-tabs').style.display = 'flex';
          } else {
            allCards.forEach(c => c.classList.add('hidden'));
            document.querySelector('.product-tabs').style.display = 'none';

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

          if (brand === 'wecon') {
            const cs = document.getElementById('coming-soon-msg');
            if (cs) cs.style.display = 'none';
          }
        });
      });
    });
  }

  // Product Filter Tabs
  const productTabs = document.querySelectorAll('.product-tab');
  const productCards = document.querySelectorAll('.product-card');
  if (productTabs.length && productCards.length) {
    productTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        preserveScrollPosition(() => {
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

  // Beranda Interactive Ad Carousel
  const adCarouselTrack = document.getElementById('ad-carousel-track');
  const adCarouselPrev = document.getElementById('ad-carousel-prev');
  const adCarouselNext = document.getElementById('ad-carousel-next');
  const adCarouselDots = document.getElementById('ad-carousel-dots');

  const adProducts = [
    {
      name: 'Wecon PI3070ig',
      desc: 'HMI Touchscreen 7" dengan respon cepat dan tampilan jernih untuk lini produksi.',
      tag: 'HMI',
      img: 'assets/images/product_hmi.png',
      wa: 'Halo, saya tertarik dengan produk Wecon PI3070ig HMI',
      specs: [
        { label: 'Layar', val: '7" TFT 800x480' },
        { label: 'Komunikasi', val: 'Ethernet, RS232/485' },
        { label: 'Memori', val: '128MB Flash' }
      ]
    },
    {
      name: 'Wecon PI3102ig',
      desc: 'HMI 10.2" untuk monitoring multi-line dengan konektivitas industri lengkap.',
      tag: 'HMI',
      img: 'assets/images/product_hmi.png',
      wa: 'Halo, saya tertarik dengan produk Wecon PI3102ig HMI',
      specs: [
        { label: 'Layar', val: '10.2" TFT 1024x600' },
        { label: 'Komunikasi', val: 'Ethernet, RS232/485' },
        { label: 'Memori', val: '256MB Flash' }
      ]
    },
    {
      name: 'Wecon LX3V-1412MR',
      desc: 'PLC compact kompatibel Mitsubishi FX, cocok untuk otomasi mesin cepat.',
      tag: 'PLC',
      img: 'assets/images/product_plc.png',
      wa: 'Halo, saya tertarik dengan produk Wecon LX3V-1412MR PLC',
      specs: [
        { label: 'I/O', val: '14 DI / 12 DO' },
        { label: 'Komunikasi', val: 'RS232, RS485' },
        { label: 'Program', val: '16K Steps' }
      ]
    },
    {
      name: 'Wecon LX3VP-2424MR',
      desc: 'PLC performa tinggi 24 input / 24 output dengan dukungan analog dan high-speed counter.',
      tag: 'PLC',
      img: 'assets/images/product_plc.png',
      wa: 'Halo, saya tertarik dengan produk Wecon LX3VP-2424MR PLC',
      specs: [
        { label: 'I/O', val: '24 DI / 24 DO' },
        { label: 'Komunikasi', val: 'Ethernet, RS485' },
        { label: 'Program', val: '32K Steps' }
      ]
    },
    {
      name: 'Wecon VD100',
      desc: 'VFD single phase 220V untuk kontrol kecepatan motor industri stabil.',
      tag: 'VFD',
      img: 'assets/images/product_vfd.png',
      wa: 'Halo, saya tertarik dengan produk Wecon VD100 VFD',
      specs: [
        { label: 'Daya', val: '0.75 - 2.2 kW' },
        { label: 'Input', val: '1 Phase 220V' },
        { label: 'Frekuensi', val: '0 - 400 Hz' }
      ]
    },
    {
      name: 'Wecon VD300A',
      desc: 'VFD 3 phase 380V heavy-duty untuk aplikasi conveyor, pompa, dan fan industri.',
      tag: 'VFD',
      img: 'assets/images/product_vfd.png',
      wa: 'Halo, saya tertarik dengan produk Wecon VD300A VFD',
      specs: [
        { label: 'Daya', val: '1.5 - 15 kW' },
        { label: 'Input', val: '3 Phase 380V' },
        { label: 'Frekuensi', val: '0 - 600 Hz' }
      ]
    }
  ];

  const renderAdCarousel = () => {
    if (!adCarouselTrack) return;
    adCarouselTrack.innerHTML = '';
    adCarouselDots.innerHTML = '';

    adProducts.forEach((prod, idx) => {
      // Create slide
      const slide = document.createElement('div');
      slide.className = 'ad-carousel-slide';
      const specsHtml = prod.specs.map(s => `<span class="ad-spec-item"><strong>${s.label}:</strong> ${s.val}</span>`).join('');
      slide.innerHTML = `
        <div class="ad-slide-content">
          <h3 class="ad-slide-title">${prod.name}</h3>
          <p class="ad-slide-desc">${prod.desc}</p>
          <div class="ad-slide-specs">${specsHtml}</div>
          <div class="ad-slide-actions">
            <button class="btn btn-primary btn-sm ad-slide-cta" data-wa="${prod.wa}">💬 Tanyakan Harga</button>
            <a href="#products" class="btn btn-ghost btn-sm">Lihat Detail</a>
          </div>
        </div>
        <div class="ad-slide-visual">
          <span class="ad-slide-tag">${prod.tag}</span>
          <img src="${prod.img}" alt="${prod.name}" class="ad-slide-img">
          <div class="ad-slide-name">${prod.name}</div>
          <div class="ad-slide-note">Ready stock • Garansi resmi</div>
        </div>
      `;
      adCarouselTrack.appendChild(slide);

      // Create dot
      const dot = document.createElement('button');
      dot.className = `ad-carousel-dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener('click', () => scrollToSlide(idx));
      adCarouselDots.appendChild(dot);

      // CTA handler
      slide.querySelector('.ad-slide-cta').addEventListener('click', (e) => {
        e.preventDefault();
        const msg = e.target.dataset.wa;
        window.open(waUrl(msg), '_blank');
      });
    });
  };

  const scrollToSlide = (idx) => {
    if (!adCarouselTrack) return;
    const slide = adCarouselTrack.children[idx];
    if (slide) {
      adCarouselTrack.scrollTo({
        left: slide.offsetLeft,
        behavior: 'smooth'
      });
      updateActiveDot(idx);
    }
  };

  const updateActiveDot = (idx) => {
    if (!adCarouselDots) return;
    Array.from(adCarouselDots.children).forEach((dot, i) => {
      dot.classList.toggle('active', i === idx);
    });
  };

  let adCarouselTimer;
  let adCurrentSlide = 0;

  const startAdAutoScroll = () => {
    if (adCarouselTimer) clearInterval(adCarouselTimer);
  };

  const setupAdCarouselNav = () => {
    if (adCarouselPrev) {
      adCarouselPrev.addEventListener('click', () => {
        adCurrentSlide = (adCurrentSlide - 1 + adProducts.length) % adProducts.length;
        scrollToSlide(adCurrentSlide);
        startAdAutoScroll();
      });
    }
    if (adCarouselNext) {
      adCarouselNext.addEventListener('click', () => {
        adCurrentSlide = (adCurrentSlide + 1) % adProducts.length;
        scrollToSlide(adCurrentSlide);
        startAdAutoScroll();
      });
    }
  };

  // Initialize carousel
  if (adCarouselTrack) {
    renderAdCarousel();
    setupAdCarouselNav();
  }


});
