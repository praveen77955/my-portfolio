/* ==========================================================================
   DIGITAL CONTROL ROOM PORTFOLIO INTERACTION ENGINE — SEERAMREDDI PRAVEEN
   Handles dynamic rendering, interactive HUD canvas, custom cursor, modals,
   scrollSpy, form validation, and animations.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Ensure PORTFOLIO_DATA is loaded
  const data = typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : null;
  if (!data) {
    console.error('PORTFOLIO_DATA object is missing.');
    return;
  }

  /* --------------------------------------------------------------------------
     01. INITIALIZE & RENDER DYNAMIC CONTENT FROM DATA.JS
     -------------------------------------------------------------------------- */
  renderAboutMetadata(data.about);
  renderSkills(data.skills);
  renderFeaturedProject(data.projects.find(p => p.featured) || data.projects[0]);
  renderProjectsList(data.projects);
  renderTimeline(data.timeline);
  renderNowBoard(data.currently);

  /* --------------------------------------------------------------------------
     02. HERO ROTATING DESCRIPTOR & LIVE CLOCK
     -------------------------------------------------------------------------- */
  const rotatingTextEl = document.getElementById('rotating-text');
  const descriptors = data.personal.descriptors || ["BUILDING", "DESIGNING", "EXPERIMENTING", "CREATING"];
  let descriptorIdx = 0;

  setInterval(() => {
    descriptorIdx = (descriptorIdx + 1) % descriptors.length;
    if (rotatingTextEl) {
      rotatingTextEl.style.opacity = '0';
      rotatingTextEl.style.transform = 'translateY(8px)';
      setTimeout(() => {
        rotatingTextEl.textContent = descriptors[descriptorIdx];
        rotatingTextEl.style.opacity = '1';
        rotatingTextEl.style.transform = 'translateY(0)';
      }, 200);
    }
  }, 2800);

  // Live Updating Time Clock
  const clockEl = document.getElementById('hud-clock');
  function updateLiveClock() {
    if (!clockEl) return;
    const now = new Date();
    // Convert to IST (Asia/Kolkata)
    const options = {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    const timeStr = new Intl.DateTimeFormat('en-GB', options).format(now);
    clockEl.textContent = `Visakhapatnam, IN (${timeStr} IST)`;
  }
  updateLiveClock();
  setInterval(updateLiveClock, 1000);

  /* --------------------------------------------------------------------------
     03. HUD CARD MOUSE 3D TILT EFFECT
     -------------------------------------------------------------------------- */
  const hudCard = document.getElementById('hud-card');
  if (hudCard && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const rect = hudCard.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      // Constrain rotation to a subtle 4deg max
      const rawX = (e.clientY - cardCenterY) / 80;
      const rawY = (cardCenterX - e.clientX) / 80;

      const angleX = Math.max(-4, Math.min(4, rawX));
      const angleY = Math.max(-4, Math.min(4, rawY));

      hudCard.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
  }

  /* --------------------------------------------------------------------------
     04. CUSTOM 2-PIECE CURSOR ENGINE
     -------------------------------------------------------------------------- */
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const cursorBadge = document.getElementById('cursor-badge');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (dot) {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;
    }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (ring) {
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;
    }
    requestAnimationFrame(animateCursor);
  }
  requestAnimationFrame(animateCursor);

  // Bind interactive elements for cursor hover states
  function setupCursorListeners() {
    const interactiveSelectors = 'a, button, input, textarea, .filter-btn, .skill-card, .now-card';
    const interactiveEls = document.querySelectorAll(interactiveSelectors);

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });

    const projectEls = document.querySelectorAll('.project-row, .featured-visual-box, .open-case-study-btn');
    projectEls.forEach((el) => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-view-mode'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-view-mode'));
    });
  }
  setupCursorListeners();

  /* --------------------------------------------------------------------------
     05. INTERACTIVE BACKGROUND CANVAS (FLOATING PARTICLES & NETWORKING)
     -------------------------------------------------------------------------- */
  const bgCanvas = document.getElementById('bg-canvas');
  if (bgCanvas) {
    const ctx = bgCanvas.getContext('2d');
    let width = (bgCanvas.width = window.innerWidth);
    let height = (bgCanvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = bgCanvas.width = window.innerWidth;
      height = bgCanvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 25), 45);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.5 + 0.8
      });
    }

    function renderBgCanvas() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(192, 88, 0, 0.4)';
        ctx.fill();

        // Connect close particles
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(192, 88, 0, ${0.15 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderBgCanvas);
    }
    requestAnimationFrame(renderBgCanvas);
  }

  /* --------------------------------------------------------------------------
     06. HUD COMMAND CENTER INTERACTIVE CANVAS
     -------------------------------------------------------------------------- */
  const hudCanvas = document.getElementById('hud-canvas');
  if (hudCanvas) {
    const hctx = hudCanvas.getContext('2d');
    let hw = (hudCanvas.width = 400);
    let hh = (hudCanvas.height = 120);

    let phase = 0;
    function drawHudCanvas() {
      hctx.clearRect(0, 0, hw, hh);
      phase += 0.04;

      // Draw frequency audio bars
      const barCount = 32;
      const barWidth = hw / barCount;

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.abs(Math.sin(phase + i * 0.2) * 45) + Math.cos(phase * 0.5 + i) * 15 + 10;
        const x = i * barWidth;
        const y = hh - barHeight;

        const isPeak = i % 4 === 0;
        hctx.fillStyle = isPeak ? 'rgba(253, 251, 212, 0.85)' : 'rgba(192, 88, 0, 0.6)';
        hctx.fillRect(x + 2, y, barWidth - 4, barHeight);
      }

      // Draw mathematical sine wave overlay
      hctx.beginPath();
      for (let x = 0; x < hw; x += 5) {
        const y = hh / 2 + Math.sin(x * 0.03 + phase) * 20;
        if (x === 0) hctx.moveTo(x, y);
        else hctx.lineTo(x, y);
      }
      hctx.strokeStyle = 'rgba(253, 251, 212, 0.7)';
      hctx.lineWidth = 1.2;
      hctx.stroke();

      requestAnimationFrame(drawHudCanvas);
    }
    requestAnimationFrame(drawHudCanvas);
  }

  /* --------------------------------------------------------------------------
     07. NAVIGATION FROST & SCROLLSPY
     -------------------------------------------------------------------------- */
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // ScrollSpy active link detection
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  /* --------------------------------------------------------------------------
     08. MOBILE MENU TOGGLE
     -------------------------------------------------------------------------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    mobileNav.classList.add('active');
    mobileNav.setAttribute('aria-hidden', 'false');
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileNav.classList.remove('active');
    mobileNav.setAttribute('aria-hidden', 'true');
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileNav) {
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) closeMobileMenu();
    });
  }
  mobileLinks.forEach(link => link.addEventListener('click', closeMobileMenu));

  /* --------------------------------------------------------------------------
     09. SKILLS RENDERING & FILTERING
     -------------------------------------------------------------------------- */
  function renderSkills(skillsData) {
    const container = document.getElementById('skills-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (!container) return;

    function displayCategory(cat) {
      container.innerHTML = '';

      skillsData.forEach(catGroup => {
        if (cat === 'ALL' || catGroup.category === cat) {
          catGroup.items.forEach(skill => {
            const card = document.createElement('div');
            card.className = 'skill-card';
            card.innerHTML = `
              <div class="skill-card-top">
                <h3 class="skill-name">${skill.name}</h3>
                <span class="skill-cat">${catGroup.category}</span>
              </div>
              <p class="skill-desc">${skill.desc}</p>
            `;
            container.appendChild(card);
          });
        }
      });
      setupCursorListeners();
    }

    displayCategory('ALL');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const selectedCat = btn.getAttribute('data-category');
        displayCategory(selectedCat);
      });
    });
  }

  /* --------------------------------------------------------------------------
     10. ABOUT METADATA RENDERING
     -------------------------------------------------------------------------- */
  function renderAboutMetadata(aboutData) {
    const grid = document.getElementById('about-metadata');
    if (!grid || !aboutData.metadata) return;

    grid.innerHTML = aboutData.metadata.map(item => `
      <div class="meta-block">
        <span class="meta-label">${item.label}</span>
        <span class="meta-val">${item.value}</span>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     11. FEATURED PROJECT RENDERING
     -------------------------------------------------------------------------- */
  function renderFeaturedProject(proj) {
    if (!proj) return;
    const catEl = document.getElementById('featured-category');
    const titleEl = document.getElementById('featured-title');
    const descEl = document.getElementById('featured-desc');
    const techEl = document.getElementById('featured-tech');

    if (catEl) catEl.textContent = proj.category;
    if (titleEl) titleEl.textContent = proj.title;
    if (descEl) descEl.textContent = proj.description;

    if (techEl && proj.technologies) {
      techEl.innerHTML = proj.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('');
    }
  }

  /* --------------------------------------------------------------------------
     12. EDITORIAL PROJECTS SHOWCASE RENDERING
     -------------------------------------------------------------------------- */
  function renderProjectsList(projects) {
    const listEl = document.getElementById('projects-list');
    if (!listEl) return;

    listEl.innerHTML = projects.map(p => `
      <div class="project-row open-case-study-btn" data-project-id="${p.id}">
        <span class="row-num">${p.number}</span>
        <div class="row-title-block">
          <h3 class="row-title">${p.title}</h3>
          <p class="row-desc">${p.description}</p>
        </div>
        <div class="row-tech-tags">
          ${p.technologies.slice(0, 3).map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <span class="row-year">${p.year}</span>
        <span class="row-arrow">↗</span>
      </div>
    `).join('');

    // Bind Modal triggers
    document.querySelectorAll('.open-case-study-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-project-id');
        openCaseStudyModal(id);
      });
    });
  }

  /* --------------------------------------------------------------------------
     13. TIMELINE RENDERING
     -------------------------------------------------------------------------- */
  function renderTimeline(timelineData) {
    const container = document.getElementById('timeline-container');
    if (!container || !timelineData) return;

    container.innerHTML = `
      <div class="timeline-line"></div>
      ${timelineData.map(item => `
        <div class="timeline-item">
          <div class="timeline-node"></div>
          <div class="timeline-card">
            <div class="timeline-year">${item.year}</div>
            <h3 class="timeline-role">${item.role}</h3>
            <div class="timeline-org">${item.organization}</div>
            <p class="timeline-desc">${item.description}</p>
            <div class="timeline-tech">
              ${item.technologies.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
      `).join('')}
    `;
  }

  /* --------------------------------------------------------------------------
     14. PERSONAL "NOW" SECTION RENDERING
     -------------------------------------------------------------------------- */
  function renderNowBoard(nowData) {
    const board = document.getElementById('now-board');
    if (!board || !nowData || !nowData.items) return;

    board.innerHTML = nowData.items.map(item => `
      <div class="now-card">
        <span class="now-tag">// ${item.label}</span>
        <p class="now-val">${item.value}</p>
      </div>
    `).join('');
  }

  /* --------------------------------------------------------------------------
     15. PROJECT CASE STUDY MODAL ENGINE
     -------------------------------------------------------------------------- */
  const modal = document.getElementById('case-study-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalNum = document.getElementById('modal-num');
  const modalBody = document.getElementById('modal-body');

  function openCaseStudyModal(projectId) {
    const proj = data.projects.find(p => p.id === projectId);
    if (!proj || !modal) return;

    modalNum.textContent = proj.number;
    modalTitle.textContent = proj.title;

    const caseData = proj.caseStudy || {};
    const metricsHtml = (caseData.metrics || []).map(m => `
      <div class="modal-metric-item">
        <span class="modal-metric-val">${m.value}</span>
        <span class="modal-metric-lbl">${m.label}</span>
      </div>
    `).join('');

    const processHtml = (caseData.process || []).map(p => `
      <div class="modal-process-item">
        <span class="modal-process-bullet">→</span>
        <span>${p}</span>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <div class="modal-metrics-bar">
        ${metricsHtml}
      </div>

      <div>
        <h4 class="modal-section-title">// OVERVIEW</h4>
        <p class="modal-text">${caseData.overview || proj.description}</p>
      </div>

      <div>
        <h4 class="modal-section-title">// PROBLEM STATEMENT</h4>
        <p class="modal-text">${caseData.problem || 'N/A'}</p>
      </div>

      <div>
        <h4 class="modal-section-title">// ENGINEERED SOLUTION</h4>
        <p class="modal-text">${caseData.solution || 'N/A'}</p>
      </div>

      <div>
        <h4 class="modal-section-title">// DEVELOPMENT PROCESS</h4>
        <div class="modal-process-list">
          ${processHtml}
        </div>
      </div>

      <div class="modal-actions">
        <a href="${proj.liveUrl || '#'}" target="_blank" rel="noopener" class="btn btn-primary">
          <span>LIVE DEMO</span>
          <span class="btn-icon">↗</span>
        </a>
        <a href="${proj.githubUrl || '#'}" target="_blank" rel="noopener" class="btn btn-secondary">
          <span>VIEW REPOSITORY</span>
          <span class="btn-icon">↗</span>
        </a>
      </div>
    `;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCaseStudyModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = 'auto';
  }

  if (modalClose) modalClose.addEventListener('click', closeCaseStudyModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeCaseStudyModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCaseStudyModal();
      closeMobileMenu();
    }
  });

  /* --------------------------------------------------------------------------
     16. REAL CONTACT FORM VALIDATION & FEEDBACK
     -------------------------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('form-name');
  const emailInput = document.getElementById('form-email');
  const messageInput = document.getElementById('form-message');
  const feedbackEl = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let isValid = true;

      // Clear previous error styles
      [nameInput, emailInput, messageInput].forEach(inp => inp.classList.remove('invalid'));
      document.getElementById('name-error').textContent = '';
      document.getElementById('email-error').textContent = '';
      document.getElementById('message-error').textContent = '';
      feedbackEl.className = 'form-feedback';
      feedbackEl.style.display = 'none';

      if (!nameInput.value.trim()) {
        nameInput.classList.add('invalid');
        document.getElementById('name-error').textContent = 'Please enter your name.';
        isValid = false;
      }

      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('invalid');
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('invalid');
        document.getElementById('message-error').textContent = 'Please enter a message (at least 10 characters).';
        isValid = false;
      }

      if (!isValid) return;

      // Simulate real asynchronous form submission state
      const btnText = submitBtn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      btnText.textContent = 'TRANSMITTING...';
      submitBtn.disabled = true;

      setTimeout(() => {
        btnText.textContent = originalText;
        submitBtn.disabled = false;

        feedbackEl.className = 'form-feedback success';
        feedbackEl.innerHTML = '✓ TRANSMISSION RECEIVED! Thank you for reaching out, Praveen will respond within 24 hours.';
        feedbackEl.style.display = 'block';

        contactForm.reset();
      }, 1200);
    });
  }

  /* --------------------------------------------------------------------------
     17. SCROLL REVEAL OBSERVER
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Trigger reveal check immediately on load
  setTimeout(() => {
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('active');
      }
    });
  }, 100);
});
