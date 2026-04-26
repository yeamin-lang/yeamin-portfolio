/* =============================================
   YEAMIN — DATA ENTRY SPECIALIST SCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ===== DOM REFS =====
  const cursor       = document.getElementById('cursor');
  const cursorRing   = document.getElementById('cursorRing');
  const loader       = document.getElementById('loader');
  const loaderBar    = document.getElementById('loaderBar');
  const loaderPct    = document.getElementById('loaderPct');
  const navbar       = document.getElementById('navbar');
  const burger       = document.getElementById('burger');
  const drawer       = document.getElementById('drawer');
  const drawerMask   = document.getElementById('drawerMask');
  const themeBtn     = document.getElementById('themeBtn');
  const themeIcon    = document.getElementById('themeIcon');
  const html         = document.documentElement;
  const typedEl      = document.getElementById('typedText');
  const aboutBtn     = document.getElementById('aboutBtn');
  const cvBtn        = document.getElementById('cvBtn');
  const socBtn       = document.getElementById('socBtn');
  const cvOverlay    = document.getElementById('cvOverlay');
  const cvPopup      = document.getElementById('cvPopup');
  const cvClose      = document.getElementById('cvClose');
  const socOverlay   = document.getElementById('socOverlay');
  const socModal     = document.getElementById('socModal');
  const socClose     = document.getElementById('socClose');
  const lightbox     = document.getElementById('lightbox');
  const lbImg        = document.getElementById('lbImg');
  const lbTitle      = document.getElementById('lbTitle');
  const lbDesc       = document.getElementById('lbDesc');
  const lbClose      = document.getElementById('lbClose');
  const lbPrev       = document.getElementById('lbPrev');
  const lbNext       = document.getElementById('lbNext');
  const lbDots       = document.getElementById('lbDots');
  const musicPill    = document.getElementById('musicPill');
  const musicPanel   = document.getElementById('musicPanel');
  const musicFab     = document.getElementById('musicFab');
  const pillPlay     = document.getElementById('pillPlay');
  const pillPrev     = document.getElementById('pillPrev');
  const pillNext     = document.getElementById('pillNext');
  const pillExpand   = document.getElementById('pillExpand');
  const mpPlay       = document.getElementById('mpPlay');
  const mpPrev       = document.getElementById('mpPrev');
  const mpNext       = document.getElementById('mpNext');
  const mpClose      = document.getElementById('mpClose');
  const mpFill       = document.getElementById('mpFill');
  const mpProgressBar = document.getElementById('mpProgressBar');
  const mpCurrent    = document.getElementById('mpCurrent');
  const mpTotal      = document.getElementById('mpTotal');
  const volSlider    = document.getElementById('volSlider');
  const pillTitle    = document.getElementById('pillTitle');
  const pillArtist   = document.getElementById('pillArtist');
  const pillArt      = document.getElementById('pillArt');
  const mpTitle      = document.getElementById('mpTitle');
  const mpArtist     = document.getElementById('mpArtist');
  const mpArt        = document.getElementById('mpArt');

  // ===== CURSOR =====
  if (cursor && cursorRing && window.innerWidth > 768) {
    let mx = 0, my = 0, fx = 0, fy = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top  = my + 'px';
    });
    function animateRing() {
      fx += (mx - fx) * 0.11;
      fy += (my - fy) * 0.11;
      cursorRing.style.left = fx + 'px';
      cursorRing.style.top  = fy + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    const hoverTargets = document.querySelectorAll(
      'a, button, .proj-card, .svc-card, .j-card, .mp-track, .lb-dot'
    );
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorRing.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorRing.classList.remove('hover');
      });
    });
  }

  // ===== LOADER =====
  if (loader && loaderBar && loaderPct) {
    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.floor(Math.random() * 12) + 4;
      if (pct > 100) pct = 100;
      loaderBar.style.width = pct + '%';
      loaderPct.textContent = pct + '%';
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loader.style.opacity = '0';
          loader.style.visibility = 'hidden';
          setTimeout(() => loader.style.display = 'none', 500);
        }, 350);
      }
    }, 120);
  }

  // ===== THEME =====
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn?.addEventListener('click', () => {
    const isDark = html.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
  }

  // ===== TYPED TEXT =====
  const roles = [
    'Data Entry Specialist',
    'Dashboard Designer',
    'Lead Generation Expert',
    'Data Cleaning Pro',
    'Business Progress Tracker',
    'Fast. Accurate. Reliable.'
  ];
  let roleIdx = 0, charIdx = 0, deleting = false, typingTimer;

  function type() {
    if (!typedEl) return;
    const current = roles[roleIdx];
    if (!deleting) {
      typedEl.textContent = current.slice(0, ++charIdx);
      if (charIdx === current.length) {
        deleting = true;
        typingTimer = setTimeout(type, 2000);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    typingTimer = setTimeout(type, deleting ? 40 : 80);
  }
  setTimeout(type, 600);

  // ===== NAVBAR SCROLL =====
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
    setActiveNav();
    setActiveMobileNav();
  }, { passive: true });

  // ===== SMOOTH SCROLL =====
  function smoothScroll(targetId) {
    const el = document.querySelector(targetId);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  }

  document.querySelectorAll('.nav-lnk, .drw-lnk, .mn-lnk').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        smoothScroll(href);
        closeDrawer();
      }
    });
  });

  // ===== ACTIVE NAV =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-lnk');
  const mnLinks   = document.querySelectorAll('.mn-lnk');

  function setActiveNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    navLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }
  function setActiveMobileNav() {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 140) current = s.id;
    });
    mnLinks.forEach(l => {
      l.classList.toggle('active', l.getAttribute('href') === '#' + current);
    });
  }

  // ===== DRAWER =====
  function toggleDrawer(open) {
    burger?.classList.toggle('open', open);
    drawer?.classList.toggle('open', open);
    drawerMask?.classList.toggle('show', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  function closeDrawer() { toggleDrawer(false); }

  burger?.addEventListener('click', () => toggleDrawer(!drawer?.classList.contains('open')));
  drawerMask?.addEventListener('click', closeDrawer);

  // ===== BUTTONS =====
  aboutBtn?.addEventListener('click', e => { e.preventDefault(); smoothScroll('#about'); });
  cvBtn?.addEventListener('click', e => { e.preventDefault(); openCvPopup(); });
  socBtn?.addEventListener('click', e => { e.preventDefault(); openSocModal(); });

  // ===== CV POPUP =====
  function openCvPopup() {
    cvOverlay?.classList.add('show');
    cvPopup?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeCvPopup() {
    cvOverlay?.classList.remove('show');
    cvPopup?.classList.remove('show');
    document.body.style.overflow = '';
  }
  cvClose?.addEventListener('click', closeCvPopup);
  cvOverlay?.addEventListener('click', e => { if (e.target === cvOverlay) closeCvPopup(); });

  // ===== SOCIAL MODAL =====
  function openSocModal() {
    socOverlay?.classList.add('show');
    socModal?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeSocModal() {
    socOverlay?.classList.remove('show');
    socModal?.classList.remove('show');
    document.body.style.overflow = '';
  }
  socClose?.addEventListener('click', closeSocModal);
  socOverlay?.addEventListener('click', e => { if (e.target === socOverlay) closeSocModal(); });

  // ===== LIGHTBOX =====
  const projectImages = [
    {
      title: 'Monthly Sales Tracker',
      images: [
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
      ],
      desc: 'Complete dashboard tracking monthly revenue, units sold, and sales rep performance with automated charts.'
    },
    {
      title: 'Website Traffic Analysis',
      images: [
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=900&q=80',
      ],
      desc: 'Dashboard analyzing page views, bounce rates, traffic sources and conversion trends with weekly and monthly breakdowns.'
    },
    {
      title: 'Customer Database Cleanup',
      images: [
        'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=900&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
      ],
      desc: 'Cleaned and standardized 5,000+ customer records — removed duplicates, fixed formats, verified contacts.'
    },
    {
      title: 'B2B Lead Generation Sheet',
      images: [
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80',
      ],
      desc: 'Verified list of 300+ B2B leads from LinkedIn and directories — names, emails, company info, and URLs.'
    },
    {
      title: 'Business KPI Dashboard',
      images: [
        'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&q=80',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
        'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=900&q=80',
      ],
      desc: 'Quarterly tracker with revenue vs target charts, expense breakdown, and milestone completion for a growing startup.'
    },
  ];

  let currentProject = 0;
  let currentImgIdx = 0;

  function openLightbox(projectIdx) {
    currentProject = projectIdx;
    currentImgIdx = 0;
    showLightboxImg();
    buildDots();
    lightbox?.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox() {
    lightbox?.classList.remove('show');
    document.body.style.overflow = '';
  }
  function showLightboxImg() {
    const proj = projectImages[currentProject];
    if (lbImg) lbImg.src = proj.images[currentImgIdx];
    if (lbTitle) lbTitle.textContent = proj.title;
    if (lbDesc) lbDesc.textContent = proj.desc;
    document.querySelectorAll('.lb-dot').forEach((d, i) => {
      d.classList.toggle('active', i === currentImgIdx);
    });
  }
  function buildDots() {
    if (!lbDots) return;
    const proj = projectImages[currentProject];
    lbDots.innerHTML = proj.images
      .map((_, i) => `<div class="lb-dot${i === 0 ? ' active' : ''}"></div>`)
      .join('');
    lbDots.querySelectorAll('.lb-dot').forEach((dot, i) => {
      dot.addEventListener('click', () => {
        currentImgIdx = i;
        showLightboxImg();
      });
    });
  }

  document.querySelectorAll('.view-gal').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const idx = parseInt(btn.dataset.project);
      openLightbox(idx);
    });
  });

  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  lbNext?.addEventListener('click', () => {
    currentImgIdx = (currentImgIdx + 1) % projectImages[currentProject].images.length;
    showLightboxImg();
  });
  lbPrev?.addEventListener('click', () => {
    currentImgIdx = (currentImgIdx - 1 + projectImages[currentProject].images.length) %
                    projectImages[currentProject].images.length;
    showLightboxImg();
  });

  // ===== MUSIC PLAYER =====
  const musicData = [
    {
      title: 'Focus Flow',
      artist: 'Ambient Study',
      src: '',
      image: 'https://images.unsplash.com/photo-1446057032654-9d8885db76c6?w=80&q=80',
      duration: '∞',
    },
    {
      title: 'Deep Work',
      artist: 'Lo-Fi Calm',
      src: '',
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=80&q=80',
      duration: '∞',
    },
    {
      title: 'Data Dreams',
      artist: 'Soft Instrumental',
      src: '',
      image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=80&q=80',
      duration: '∞',
    },
  ];

  const audio = new Audio();
  let currentIdx = 0;
  let isPlaying = false;
  audio.volume = 0.4;

  function loadSong(idx) {
    currentIdx = idx;
    const song = musicData[idx];
    audio.src = song.src;
    if (pillTitle) pillTitle.textContent = song.title;
    if (pillArtist) pillArtist.textContent = song.artist;
    if (pillArt && song.image) pillArt.src = song.image;
    if (mpTitle) mpTitle.textContent = song.title;
    if (mpArtist) mpArtist.textContent = song.artist;
    if (mpArt && song.image) mpArt.src = song.image;
    document.querySelectorAll('.mp-track').forEach((item, i) => {
      item.classList.toggle('active', i === idx);
    });
    if (isPlaying && song.src) {
      audio.play().catch(() => {});
    }
  }

  function playMusic() {
    if (!musicData[currentIdx].src) {
      // No actual audio file — simulate playing state
      isPlaying = true;
      updatePlayIcons();
      musicPill?.classList.add('playing');
      return;
    }
    audio.play().then(() => {
      isPlaying = true;
      updatePlayIcons();
      musicPill?.classList.add('playing');
    }).catch(() => {});
  }

  function pauseMusic() {
    audio.pause();
    isPlaying = false;
    updatePlayIcons();
    musicPill?.classList.remove('playing');
  }

  function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
  }

  function updatePlayIcons() {
    const playIcon = isPlaying ? 'fa-pause' : 'fa-play';
    if (pillPlay) pillPlay.innerHTML = `<i class="fas ${playIcon}"></i>`;
    if (mpPlay) mpPlay.innerHTML = `<i class="fas ${playIcon}"></i>`;
  }

  function fmtTime(s) {
    if (isNaN(s)) return '0:00';
    return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  }

  audio.addEventListener('timeupdate', () => {
    if (!audio.duration || !mpFill || !mpCurrent) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    mpFill.style.width = pct + '%';
    mpCurrent.textContent = fmtTime(audio.currentTime);
  });

  audio.addEventListener('loadedmetadata', () => {
    if (mpTotal) mpTotal.textContent = fmtTime(audio.duration);
  });

  audio.addEventListener('ended', () => {
    currentIdx = (currentIdx + 1) % musicData.length;
    loadSong(currentIdx);
    if (isPlaying) playMusic();
  });

  mpProgressBar?.addEventListener('click', e => {
    if (!audio.duration) return;
    const pct = e.offsetX / mpProgressBar.clientWidth;
    audio.currentTime = pct * audio.duration;
  });

  volSlider?.addEventListener('input', () => {
    audio.volume = volSlider.value / 100;
  });

  pillPlay?.addEventListener('click', togglePlay);
  mpPlay?.addEventListener('click', togglePlay);
  pillPrev?.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + musicData.length) % musicData.length;
    loadSong(currentIdx);
    if (isPlaying) playMusic();
  });
  pillNext?.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % musicData.length;
    loadSong(currentIdx);
    if (isPlaying) playMusic();
  });
  mpPrev?.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + musicData.length) % musicData.length;
    loadSong(currentIdx);
    if (isPlaying) playMusic();
  });
  mpNext?.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % musicData.length;
    loadSong(currentIdx);
    if (isPlaying) playMusic();
  });

  document.querySelectorAll('.mp-track').forEach((item, i) => {
    item.addEventListener('click', () => {
      loadSong(i);
      playMusic();
    });
  });

  musicFab?.addEventListener('click', () => {
    const pillVisible = musicPill?.classList.toggle('visible');
    if (!pillVisible) musicPanel?.classList.remove('open');
    // Hide fab when pill is visible, show when hidden
    if (pillVisible) {
      musicFab?.classList.add('hidden');
    } else {
      musicFab?.classList.remove('hidden');
    }
  });

  pillExpand?.addEventListener('click', () => {
    musicPanel?.classList.toggle('open');
  });
  mpClose?.addEventListener('click', () => {
    musicPanel?.classList.remove('open');
  });

  loadSong(0);

  // Show music pill after a short delay
  setTimeout(() => {
    musicPill?.classList.add('visible');
    musicFab?.classList.add('hidden');
  }, 2500);

  // ===== SCROLL ANIMATIONS =====
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.id === 'about') animateSkills();
        sectionObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.sec').forEach(el => sectionObserver.observe(el));

  // Cards staggered animation
  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || 0);
        setTimeout(() => entry.target.classList.add('visible'), delay);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document
    .querySelectorAll('.svc-card, .proj-card, .j-card')
    .forEach(el => cardObserver.observe(el));

  // ===== SKILL BARS =====
  function animateSkills() {
    document.querySelectorAll('.sk-fill').forEach((bar, i) => {
      setTimeout(() => {
        const w = bar.dataset.w;
        if (w) bar.style.width = w + '%';
      }, i * 140);
    });
  }

  // ===== STATS COUNTER =====
  const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const statNums = entry.target.querySelectorAll('.stat-num');
        statNums.forEach(num => {
          const target = parseInt(num.dataset.target);
          animateCount(num, target);
        });
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  const statsRow = document.querySelector('.stats-row');
  if (statsRow) statObserver.observe(statsRow);

  function animateCount(el, target) {
    const start = parseInt(el.textContent) || 0;
    const duration = 1600;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }
    requestAnimationFrame(update);
  }

  // ===== KEYBOARD ESC =====
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeCvPopup();
      closeSocModal();
      closeDrawer();
      closeLightbox();
      musicPanel?.classList.remove('open');
    }
    if (e.key === 'ArrowRight' && lightbox?.classList.contains('show')) {
      currentImgIdx = (currentImgIdx + 1) % projectImages[currentProject].images.length;
      showLightboxImg();
    }
    if (e.key === 'ArrowLeft' && lightbox?.classList.contains('show')) {
      currentImgIdx =
        (currentImgIdx - 1 + projectImages[currentProject].images.length) %
        projectImages[currentProject].images.length;
      showLightboxImg();
    }
  });

  // ===== INIT =====
  setActiveNav();
  setActiveMobileNav();
  navbar?.classList.toggle('scrolled', window.scrollY > 20);
});
