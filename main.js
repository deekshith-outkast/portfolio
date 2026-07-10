/**
 * ============================================================
 *  DEEKSHITH PORTFOLIO — Premium Interactive JavaScript
 *  Complete, production-ready implementation
 * ============================================================
 *
 *  Features:
 *    1.  Preloader
 *    2.  Custom Cursor
 *    3.  Mouse Glow / Spotlight
 *    4.  Scroll Progress Bar
 *    5.  Navbar (scroll, active links, hamburger)
 *    6.  Smooth Scrolling
 *    7.  Theme Toggle (Dark / Light)
 *    8.  Typing Animation
 *    9.  Scroll Reveal Animations
 *   10.  Animated Counters
 *   11.  Skill Bars Animation
 *   12.  Skills Category Filter
 *   13.  Project Filtering
 *   14.  Project Card Tilt Effect
 *   15.  Project Modal
 *   16.  Floating Hero Particles (Canvas)
 *   17.  Floating Background Blobs Parallax
 *   18.  Mouse Parallax
 *   19.  Testimonials Slider
 *   20.  Contact Form Validation
 *   21.  Copy Email Button
 *   22.  Toast Notifications
 *   23.  Magnetic Buttons
 *   24.  Button Ripple Effect
 *   25.  Back to Top Button
 *   26.  Scroll Indicator
 *   27.  Image Lazy Loading
 *   28.  Floating Geometric Shapes
 *   29.  Animated Gradient Borders
 *   30.  Resize Handler
 *   31.  Keyboard Navigation
 *   32.  Performance Utilities
 *
 *  Author : Deekshith
 *  Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================
   *  SECTION 0 — HELPER / UTILITY FUNCTIONS
   * ========================================================== */

  /**
   * Debounce — delays invocation until after `delay` ms of silence.
   * @param {Function} fn   Callback
   * @param {number}   delay Milliseconds
   * @returns {Function}
   */
  const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  };

  /**
   * Throttle — allows at most one invocation per `limit` ms.
   * @param {Function} fn    Callback
   * @param {number}   limit Milliseconds
   * @returns {Function}
   */
  const throttle = (fn, limit) => {
    let inThrottle = false;
    return (...args) => {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => { inThrottle = false; }, limit);
      }
    };
  };

  /**
   * Linear interpolation between two values.
   * @param {number} start  Start value
   * @param {number} end    End value
   * @param {number} factor Interpolation factor (0 – 1)
   * @returns {number}
   */
  const lerp = (start, end, factor) => start + (end - start) * factor;

  /**
   * Clamp a value between min and max.
   * @param {number} value
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  /**
   * Return current scroll percentage (0 – 100).
   * @returns {number}
   */
  const getScrollPercent = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  };

  /**
   * Check whether an element is currently inside the viewport.
   * @param {HTMLElement} el
   * @returns {boolean}
   */
  const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0
    );
  };

  /**
   * Return a random number between min and max (inclusive‑ish for floats).
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  const randomBetween = (min, max) => Math.random() * (max - min) + min;

  /**
   * Ease-out exponential curve — fast start, slow end.
   * @param {number} t Progress (0 – 1)
   * @returns {number}
   */
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

  /**
   * Detect mobile / small-screen devices.
   * @returns {boolean}
   */
  const isMobile = () => window.innerWidth < 768;

  /* ==========================================================
   *  SECTION 1 — PRELOADER
   * ========================================================== */

  const initPreloader = () => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
          document.body.style.overflow = 'visible';
        }, 500);
      }, 1500);
    });

    /* Safety net — remove even if `load` already fired */
    if (document.readyState === 'complete') {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        setTimeout(() => {
          preloader.remove();
          document.body.style.overflow = 'visible';
        }, 500);
      }, 1500);
    }
  };

  /* ==========================================================
   *  SECTION 2 — CUSTOM CURSOR
   * ========================================================== */

  const initCustomCursor = () => {
    if (isMobile()) return;

    /* Create cursor elements */
    const dot = document.createElement('div');
    dot.className = 'cursor-dot';
    const outline = document.createElement('div');
    outline.className = 'cursor-outline';
    document.body.appendChild(dot);
    document.body.appendChild(outline);

    /* Inline base styles (CSS should handle most, but ensure essentials) */
    Object.assign(dot.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: 'var(--accent, #00d4ff)',
      pointerEvents: 'none',
      zIndex: '10001',
      transition: 'transform 0.15s ease',
      transform: 'translate(-50%, -50%)'
    });
    Object.assign(outline.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      border: '2px solid var(--accent, #00d4ff)',
      pointerEvents: 'none',
      zIndex: '10000',
      transition: 'transform 0.15s ease, width 0.3s ease, height 0.3s ease, border-color 0.3s ease',
      transform: 'translate(-50%, -50%)',
      opacity: '0.6'
    });

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    const lerpFactor = 0.15;

    /**
     * RAF loop — dot tracks instantly, outline follows with lag.
     */
    const animateCursor = () => {
      outlineX = lerp(outlineX, mouseX, lerpFactor);
      outlineY = lerp(outlineY, mouseY, lerpFactor);

      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      outline.style.left = `${outlineX}px`;
      outline.style.top = `${outlineY}px`;

      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    /* Track mouse position */
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    /* Scale up on interactive elements */
    const hoverTargets = 'a, button, .magnetic-btn, .project-card, input, textarea, .filter-btn, .category-btn, .slider-arrow, .slider-dot, .back-to-top, .theme-toggle, .hamburger, .copy-email-btn';

    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.width = '60px';
        outline.style.height = '60px';
        outline.style.borderColor = 'var(--accent-secondary, #7c3aed)';
      });
      el.addEventListener('mouseleave', () => {
        dot.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.width = '40px';
        outline.style.height = '40px';
        outline.style.borderColor = 'var(--accent, #00d4ff)';
      });
    });

    /* Observe DOM for future interactive elements (MutationObserver) */
    const cursorObserver = new MutationObserver((mutations) => {
      mutations.forEach((m) => {
        m.addedNodes.forEach((node) => {
          if (node.nodeType !== 1) return;
          const targets = node.matches && node.matches(hoverTargets) ? [node] : [];
          if (node.querySelectorAll) {
            targets.push(...node.querySelectorAll(hoverTargets));
          }
          targets.forEach((el) => {
            el.addEventListener('mouseenter', () => {
              dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
              outline.style.width = '60px';
              outline.style.height = '60px';
              outline.style.borderColor = 'var(--accent-secondary, #7c3aed)';
            });
            el.addEventListener('mouseleave', () => {
              dot.style.transform = 'translate(-50%, -50%) scale(1)';
              outline.style.width = '40px';
              outline.style.height = '40px';
              outline.style.borderColor = 'var(--accent, #00d4ff)';
            });
          });
        });
      });
    });
    cursorObserver.observe(document.body, { childList: true, subtree: true });

    /* Hide native cursor */
    document.body.style.cursor = 'none';
    document.querySelectorAll(hoverTargets).forEach((el) => {
      el.style.cursor = 'none';
    });

    /* Store references for resize handler */
    window.__cursorElements = { dot, outline };
  };

  /* ==========================================================
   *  SECTION 3 — MOUSE GLOW / SPOTLIGHT
   * ========================================================== */

  const initMouseGlow = () => {
    const glow = document.querySelector('.mouse-glow');
    const hero = document.getElementById('hero') || document.querySelector('.hero');
    if (!glow || !hero) return;

    const handleGlow = throttle((e) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      glow.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 212, 255, 0.06), transparent 60%)`;
    }, 16);

    hero.addEventListener('mousemove', handleGlow, { passive: true });

    /* Fade out when mouse leaves hero */
    hero.addEventListener('mouseleave', () => {
      glow.style.background = 'transparent';
    }, { passive: true });
  };

  /* ==========================================================
   *  SECTION 4 — SCROLL PROGRESS BAR
   * ========================================================== */

  const initScrollProgress = () => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;

    const updateProgress = () => {
      const percent = getScrollPercent();
      bar.style.width = `${percent}%`;
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateProgress);
    }, { passive: true });
  };

  /* ==========================================================
   *  SECTION 5 — NAVBAR
   * ========================================================== */

  const initNavbar = () => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    let lastScroll = 0;
    const navLinks = navbar.querySelectorAll('a[href^="#"]');
    const hamburger = navbar.querySelector('.hamburger');
    const mobileMenu = navbar.querySelector('.mobile-menu');

    /* --- Scroll behaviour: solid bg + show/hide --- */
    const onScroll = () => {
      const currentScroll = window.scrollY;

      /* Solid background */
      if (currentScroll > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      /* Hide on scroll down, show on scroll up */
      if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(onScroll);
    }, { passive: true });

    /* --- Active link highlighting --- */
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
      const scrollY = window.scrollY + navbar.offsetHeight + 100;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', debounce(highlightNav, 50), { passive: true });
    highlightNav(); /* Initial call */

    /* --- Nav link smooth scroll --- */
    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });

          /* Close mobile menu on click */
          if (hamburger && mobileMenu) {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      });
    });

    /* --- Hamburger toggle --- */
    if (hamburger && mobileMenu) {
      hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
      });

      /* Close mobile menu on link click */
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        });
      });

      /* Close on click outside */
      document.addEventListener('click', (e) => {
        if (
          mobileMenu.classList.contains('active') &&
          !mobileMenu.contains(e.target) &&
          !hamburger.contains(e.target)
        ) {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  };

  /* ==========================================================
   *  SECTION 6 — SMOOTH SCROLLING (Global)
   * ========================================================== */

  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        const target = document.querySelector(href);
        if (!target) return;

        e.preventDefault();
        const navbar = document.getElementById('navbar');
        const offset = navbar ? navbar.offsetHeight : 0;

        const targetPos = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      });
    });
  };

  /* ==========================================================
   *  SECTION 7 — THEME TOGGLE (Dark / Light)
   * ========================================================== */

  const initThemeToggle = () => {
    const toggleBtn = document.querySelector('.theme-toggle');
    if (!toggleBtn) return;

    const STORAGE_KEY = 'theme';

    /**
     * Apply theme and update toggle icon.
     * @param {'dark'|'light'} theme
     */
    const applyTheme = (theme) => {
      if (theme === 'light') {
        document.body.classList.add('light-mode');
        toggleBtn.innerHTML = '☀️';
        toggleBtn.setAttribute('aria-label', 'Switch to dark mode');
      } else {
        document.body.classList.remove('light-mode');
        toggleBtn.innerHTML = '🌙';
        toggleBtn.setAttribute('aria-label', 'Switch to light mode');
      }
    };

    /* Load saved preference */
    const savedTheme = localStorage.getItem(STORAGE_KEY) || 'dark';
    applyTheme(savedTheme);

    /* Toggle handler */
    toggleBtn.addEventListener('click', () => {
      const isLight = document.body.classList.contains('light-mode');
      const newTheme = isLight ? 'dark' : 'light';
      applyTheme(newTheme);
      localStorage.setItem(STORAGE_KEY, newTheme);
    });
  };

  /* ==========================================================
   *  SECTION 8 — TYPING ANIMATION
   * ========================================================== */

  const initTypingAnimation = () => {
    const typingEl = document.querySelector('.typing-text');
    if (!typingEl) return;

    const roles = [
      'Creative Developer',
      'AI Enthusiast',
      'Frontend Developer',
      'Problem Solver',
      'Tech Explorer'
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;
    let deleteDelay = 50;
    let pauseDelay = 2000;

    /**
     * Core typing loop — types, pauses, deletes, then moves to next role.
     */
    const type = () => {
      const currentRole = roles[roleIndex];

      if (!isDeleting) {
        /* Typing */
        typingEl.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentRole.length) {
          /* Finished typing — pause then delete */
          isDeleting = true;
          setTimeout(type, pauseDelay);
          return;
        }
        setTimeout(type, typeDelay);
      } else {
        /* Deleting */
        typingEl.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
          setTimeout(type, 400); /* Small pause before next word */
          return;
        }
        setTimeout(type, deleteDelay);
      }
    };

    /* Start after a brief delay */
    setTimeout(type, 500);
  };

  /* ==========================================================
   *  SECTION 9 — SCROLL REVEAL ANIMATIONS
   * ========================================================== */

  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale'
    );
    if (revealElements.length === 0) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.dataset.delay || 0;
            setTimeout(() => {
              el.classList.add('active');
            }, Number(delay));

            /* Stagger children if present */
            const children = el.querySelectorAll('[data-delay]');
            children.forEach((child) => {
              const childDelay = Number(child.dataset.delay) || 0;
              setTimeout(() => {
                child.classList.add('active');
              }, childDelay);
            });

            revealObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  };

  /* ==========================================================
   *  SECTION 10 — ANIMATED COUNTERS
   * ========================================================== */

  const initCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    if (counters.length === 0) return;

    /**
     * Animate a single counter element.
     * @param {HTMLElement} el
     */
    const animateCounter = (el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const start = performance.now();

      const update = (now) => {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutExpo(progress);
        const current = Math.floor(easedProgress * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      };

      requestAnimationFrame(update);
    };

    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    counters.forEach((el) => counterObserver.observe(el));
  };

  /* ==========================================================
   *  SECTION 11 — SKILL BARS ANIMATION
   * ========================================================== */

  const initSkillBars = () => {
    const bars = document.querySelectorAll('.skill-progress');
    if (bars.length === 0) return;

    const barObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const barsInParent = entry.target.closest('.skills-grid, .skills-container, section')
              ?.querySelectorAll('.skill-progress') || [entry.target];

            barsInParent.forEach((bar, i) => {
              setTimeout(() => {
                const width = bar.dataset.width || '0';
                bar.style.width = `${width}%`;
              }, i * 100);
            });

            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    /* Only observe the first bar to trigger group animation */
    if (bars.length > 0) {
      barObserver.observe(bars[0]);
    }

    /* Also observe individually as fallback */
    bars.forEach((bar) => {
      const individualObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const width = entry.target.dataset.width || '0';
              entry.target.style.width = `${width}%`;
              individualObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );
      individualObserver.observe(bar);
    });
  };

  /* ==========================================================
   *  SECTION 12 — SKILLS CATEGORY FILTER
   * ========================================================== */

  const initSkillsFilter = () => {
    const categoryBtns = document.querySelectorAll('.category-btn');
    const skillCards = document.querySelectorAll('.skill-card');
    if (categoryBtns.length === 0 || skillCards.length === 0) return;

    categoryBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        /* Update active button */
        categoryBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter || 'all';

        skillCards.forEach((card, index) => {
          const category = card.dataset.category;
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
              card.style.display = '';
            }, index * 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  };

  /* ==========================================================
   *  SECTION 13 — PROJECT FILTERING
   * ========================================================== */

  const initProjectFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    if (filterBtns.length === 0 || projectCards.length === 0) return;

    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        /* Update active state */
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter || 'all';

        projectCards.forEach((card, index) => {
          const category = card.dataset.category;
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            setTimeout(() => {
              card.classList.remove('hidden');
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, index * 80);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9) translateY(20px)';
            setTimeout(() => {
              card.classList.add('hidden');
            }, 350);
          }
        });
      });
    });
  };

  /* ==========================================================
   *  SECTION 14 — PROJECT CARD TILT EFFECT
   * ========================================================== */

  const initProjectTilt = () => {
    const cards = document.querySelectorAll('.project-card');
    if (cards.length === 0) return;

    cards.forEach((card) => {
      /* Create glare overlay */
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      Object.assign(glare.style, {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        borderRadius: 'inherit',
        pointerEvents: 'none',
        zIndex: '2',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 60%)'
      });
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.appendChild(glare);

      const handleMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 5;  /* ±5 deg */
        const rotateX = ((centerY - y) / centerY) * 5;   /* ±5 deg */

        card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.transition = 'transform 0.1s ease';

        /* Glare follows mouse */
        const glareX = (x / rect.width) * 100;
        const glareY = (y / rect.height) * 100;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.12) 0%, transparent 60%)`;
        glare.style.opacity = '1';
      };

      const handleLeave = () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        card.style.transition = 'transform 0.5s ease';
        glare.style.opacity = '0';
      };

      card.addEventListener('mousemove', handleMove, { passive: true });
      card.addEventListener('mouseleave', handleLeave, { passive: true });
    });
  };

  /* ==========================================================
   *  SECTION 15 — PROJECT MODAL
   * ========================================================== */

  const initProjectModal = () => {
    const modal = document.querySelector('.project-modal');
    if (!modal) return;

    const closeBtn = modal.querySelector('.modal-close');
    const modalOverlay = modal.querySelector('.modal-overlay') || modal;
    const modalContent = modal.querySelector('.modal-content');

    /* Project data — can be extended or fetched */
    const projectData = {};

    /* Collect project cards with data attributes */
    document.querySelectorAll('[data-project-id]').forEach((card) => {
      const id = card.dataset.projectId;
      projectData[id] = {
        title: card.querySelector('.project-title, h3')?.textContent || 'Project',
        description: card.querySelector('.project-description, p')?.textContent || '',
        image: card.querySelector('img')?.src || '',
        tags: card.dataset.tags || '',
        link: card.dataset.link || '#',
        github: card.dataset.github || '#'
      };
    });

    /**
     * Open modal with project data.
     * @param {string} projectId
     */
    const openModal = (projectId) => {
      const data = projectData[projectId];
      if (!data) return;

      /* Populate modal */
      const titleEl = modal.querySelector('.modal-title, .modal-content h2');
      const descEl = modal.querySelector('.modal-description, .modal-content p');
      const imgEl = modal.querySelector('.modal-image, .modal-content img');
      const tagsEl = modal.querySelector('.modal-tags');
      const liveLink = modal.querySelector('.modal-live-link');
      const githubLink = modal.querySelector('.modal-github-link');

      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.description;
      if (imgEl) imgEl.src = data.image;
      if (tagsEl) tagsEl.innerHTML = data.tags
        .split(',')
        .map((t) => `<span class="modal-tag">${t.trim()}</span>`)
        .join('');
      if (liveLink) liveLink.href = data.link;
      if (githubLink) githubLink.href = data.github;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    };

    /* Trigger open */
    document.querySelectorAll('[data-project-id]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        /* Don't open modal if clicked on an anchor inside the card */
        if (e.target.closest('a')) return;
        openModal(trigger.dataset.projectId);
      });
    });

    /* Close events */
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    /* Expose globally for keyboard nav */
    window.__closeProjectModal = closeModal;
  };

  /* ==========================================================
   *  SECTION 16 — FLOATING HERO PARTICLES (Canvas)
   * ========================================================== */

  const initParticles = () => {
    const hero = document.getElementById('hero') || document.querySelector('.hero');
    if (!hero) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'particles-canvas';
    Object.assign(canvas.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: '1'
    });
    hero.style.position = 'relative';
    hero.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId = null;
    let mouseX = null;
    let mouseY = null;

    /* Sizing */
    const resize = () => {
      canvas.width = hero.offsetWidth;
      canvas.height = hero.offsetHeight;
    };
    resize();

    /* Particle count scales with screen size */
    const getParticleCount = () => {
      if (isMobile()) return 30;
      return Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    };

    /**
     * @typedef {Object} Particle
     * @property {number} x
     * @property {number} y
     * @property {number} size
     * @property {number} opacity
     * @property {number} vx
     * @property {number} vy
     * @property {number} baseOpacity
     */

    /** Create a single particle. */
    const createParticle = () => ({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      size: randomBetween(2, 6),
      opacity: randomBetween(0.1, 0.5),
      baseOpacity: 0,
      vx: randomBetween(-0.3, 0.3),
      vy: randomBetween(-0.3, 0.3)
    });

    /** Populate particle array. */
    const initParticleArray = () => {
      particles = [];
      const count = getParticleCount();
      for (let i = 0; i < count; i++) {
        const p = createParticle();
        p.baseOpacity = p.opacity;
        particles.push(p);
      }
    };
    initParticleArray();

    /** Distance between two points. */
    const dist = (x1, y1, x2, y2) => Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

    /** Draw a single frame. */
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim() || '#00d4ff';

      /* Parse accent into RGB */
      let r = 0, g = 212, b = 255;
      if (accentColor.startsWith('#') && accentColor.length === 7) {
        r = parseInt(accentColor.slice(1, 3), 16);
        g = parseInt(accentColor.slice(3, 5), 16);
        b = parseInt(accentColor.slice(5, 7), 16);
      }

      /* Update & draw particles */
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        /* Wrap around edges */
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        /* Mouse interaction — slight repulsion */
        if (mouseX !== null && mouseY !== null) {
          const d = dist(p.x, p.y, mouseX, mouseY);
          if (d < 120) {
            const angle = Math.atan2(p.y - mouseY, p.x - mouseX);
            p.x += Math.cos(angle) * 0.5;
            p.y += Math.sin(angle) * 0.5;
          }
        }

        /* Draw dot */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.baseOpacity})`;
        ctx.fill();
      }

      /* Connect nearby particles with lines */
      if (!isMobile()) {
        const connectionDist = 120;
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const d = dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            if (d < connectionDist) {
              const lineOpacity = (1 - d / connectionDist) * 0.15;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacity})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    /* Mouse tracking on hero */
    hero.addEventListener('mousemove', throttle((e) => {
      const rect = hero.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }, 16), { passive: true });

    hero.addEventListener('mouseleave', () => {
      mouseX = null;
      mouseY = null;
    }, { passive: true });

    /* Store for resize handler */
    window.__particlesResize = () => {
      resize();
      initParticleArray();
    };
  };

  /* ==========================================================
   *  SECTION 17 — FLOATING BACKGROUND BLOBS (Parallax)
   * ========================================================== */

  const initBlobParallax = () => {
    const blobs = document.querySelectorAll('.hero-bg-blob');
    if (blobs.length === 0) return;

    const hero = document.getElementById('hero') || document.querySelector('.hero');
    if (!hero) return;

    hero.addEventListener('mousemove', throttle((e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;   /* -0.5 to 0.5 */
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 15; /* Different speed per blob */
        blob.style.transform = `translate(${-x * factor}px, ${-y * factor}px)`;
      });
    }, 16), { passive: true });
  };

  /* ==========================================================
   *  SECTION 18 — MOUSE PARALLAX (Hero Elements)
   * ========================================================== */

  const initMouseParallax = () => {
    const hero = document.getElementById('hero') || document.querySelector('.hero');
    if (!hero) return;

    const parallaxElements = hero.querySelectorAll(
      '.hero-bg-blob, .floating-shape, [data-parallax]'
    );
    if (parallaxElements.length === 0) return;

    hero.addEventListener('mousemove', throttle((e) => {
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      parallaxElements.forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || randomBetween(10, 30);
        const moveX = -x * speed;
        const moveY = -y * speed;
        el.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    }, 16), { passive: true });
  };

  /* ==========================================================
   *  SECTION 19 — TESTIMONIALS SLIDER
   * ========================================================== */

  const initTestimonialsSlider = () => {
    const track = document.querySelector('.testimonials-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.slider-arrow.prev, .slider-arrow-prev, .slider-arrow:first-of-type');
    const nextBtn = document.querySelector('.slider-arrow.next, .slider-arrow-next, .slider-arrow:last-of-type');
    const dots = document.querySelectorAll('.slider-dot');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let autoSlideTimer = null;
    let touchStartX = 0;
    let touchEndX = 0;
    let isDragging = false;

    /**
     * Update slider position & active dot.
     * @param {number} index
     */
    const goToSlide = (index) => {
      /* Loop logic */
      if (index < 0) index = cards.length - 1;
      if (index >= cards.length) index = 0;

      currentIndex = index;
      const translateVal = -(currentIndex * 100);
      track.style.transform = `translateX(${translateVal}%)`;
      track.style.transition = 'transform 0.5s ease';

      /* Update dots */
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
      });

      /* Update cards active state */
      cards.forEach((card, i) => {
        card.classList.toggle('active', i === currentIndex);
      });
    };

    /* Initial position */
    goToSlide(0);

    /* Arrow navigation */
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
        resetAutoSlide();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
        resetAutoSlide();
      });
    }

    /* Dot navigation */
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        goToSlide(i);
        resetAutoSlide();
      });
    });

    /* Auto-slide */
    const startAutoSlide = () => {
      autoSlideTimer = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    };

    const stopAutoSlide = () => {
      clearInterval(autoSlideTimer);
    };

    const resetAutoSlide = () => {
      stopAutoSlide();
      startAutoSlide();
    };

    startAutoSlide();

    /* Pause on hover */
    const sliderContainer = track.closest('.testimonials-slider, .testimonials-container, .testimonials');
    if (sliderContainer) {
      sliderContainer.addEventListener('mouseenter', stopAutoSlide, { passive: true });
      sliderContainer.addEventListener('mouseleave', startAutoSlide, { passive: true });
    }

    /* Touch support */
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      isDragging = true;
      stopAutoSlide();
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchEndX = e.changedTouches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      const diff = touchStartX - touchEndX;
      const threshold = 50;

      if (diff > threshold) {
        goToSlide(currentIndex + 1); /* Swipe left → next */
      } else if (diff < -threshold) {
        goToSlide(currentIndex - 1); /* Swipe right → prev */
      }
      startAutoSlide();
    }, { passive: true });
  };

  /* ==========================================================
   *  SECTION 20 — CONTACT FORM VALIDATION
   * ========================================================== */

  const initContactForm = () => {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    const fields = {
      name: form.querySelector('input[name="name"], #name'),
      email: form.querySelector('input[name="email"], #email'),
      subject: form.querySelector('input[name="subject"], #subject'),
      message: form.querySelector('textarea[name="message"], #message')
    };

    /**
     * Show inline error for a field.
     * @param {HTMLElement} field
     * @param {string}      message
     */
    const showError = (field, message) => {
      if (!field) return;
      const group = field.closest('.form-group') || field.parentElement;
      group.classList.add('error');
      let errorEl = group.querySelector('.error-message');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'error-message';
        Object.assign(errorEl.style, {
          color: '#ef4444',
          fontSize: '0.8rem',
          marginTop: '4px',
          display: 'block'
        });
        group.appendChild(errorEl);
      }
      errorEl.textContent = message;
    };

    /**
     * Clear error for a field.
     * @param {HTMLElement} field
     */
    const clearError = (field) => {
      if (!field) return;
      const group = field.closest('.form-group') || field.parentElement;
      group.classList.remove('error');
      const errorEl = group.querySelector('.error-message');
      if (errorEl) errorEl.remove();
    };

    /**
     * Validate all fields.
     * @returns {boolean} true if all valid
     */
    const validate = () => {
      let isValid = true;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      /* Name */
      if (fields.name) {
        clearError(fields.name);
        if (!fields.name.value.trim() || fields.name.value.trim().length < 2) {
          showError(fields.name, 'Name must be at least 2 characters.');
          isValid = false;
        }
      }

      /* Email */
      if (fields.email) {
        clearError(fields.email);
        if (!emailRegex.test(fields.email.value.trim())) {
          showError(fields.email, 'Please enter a valid email address.');
          isValid = false;
        }
      }

      /* Subject */
      if (fields.subject) {
        clearError(fields.subject);
        if (!fields.subject.value.trim()) {
          showError(fields.subject, 'Subject is required.');
          isValid = false;
        }
      }

      /* Message */
      if (fields.message) {
        clearError(fields.message);
        if (!fields.message.value.trim() || fields.message.value.trim().length < 10) {
          showError(fields.message, 'Message must be at least 10 characters.');
          isValid = false;
        }
      }

      return isValid;
    };

    /* Form submit */
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (validate()) {
        showToast('Message sent successfully! ✨', 'success');
        form.reset();

        /* Remove focused classes */
        form.querySelectorAll('.form-group').forEach((g) => g.classList.remove('focused'));
      } else {
        showToast('Please fix the errors above.', 'error');
      }
    });

    /* Focus / blur effects */
    const allInputs = form.querySelectorAll('input, textarea');
    allInputs.forEach((input) => {
      input.addEventListener('focus', () => {
        const group = input.closest('.form-group') || input.parentElement;
        group.classList.add('focused');
      });
      input.addEventListener('blur', () => {
        const group = input.closest('.form-group') || input.parentElement;
        if (!input.value.trim()) {
          group.classList.remove('focused');
        }
      });
      /* Clear error on input */
      input.addEventListener('input', () => {
        clearError(input);
      });
    });
  };

  /* ==========================================================
   *  SECTION 21 — COPY EMAIL BUTTON
   * ========================================================== */

  const initCopyEmail = () => {
    const btn = document.querySelector('.copy-email-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const email = btn.dataset.email || btn.textContent.trim();

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard! 📋', 'success');
        }).catch(() => {
          /* Fallback */
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });

    /**
     * Fallback copy using a temporary textarea.
     * @param {string} text
     */
    const fallbackCopy = (text) => {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast('Email copied to clipboard! 📋', 'success');
      } catch (err) {
        showToast('Failed to copy email.', 'error');
      }
      document.body.removeChild(textarea);
    };
  };

  /* ==========================================================
   *  SECTION 22 — TOAST NOTIFICATIONS
   * ========================================================== */

  /**
   * Show a toast notification.
   * @param {string} message  Text to display
   * @param {'success'|'error'|'info'} type  Toast type
   */
  const showToast = (message, type = 'success') => {
    /* Ensure container exists */
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      Object.assign(container.style, {
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: '99999',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        pointerEvents: 'none'
      });
      document.body.appendChild(container);
    }

    /* Colour map */
    const colors = {
      success: { bg: '#10b981', icon: '✅' },
      error:   { bg: '#ef4444', icon: '❌' },
      info:    { bg: '#00d4ff', icon: 'ℹ️' }
    };
    const colorSet = colors[type] || colors.success;

    /* Create toast element */
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    Object.assign(toast.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '14px 20px',
      borderRadius: '12px',
      backgroundColor: colorSet.bg,
      color: '#fff',
      fontFamily: 'inherit',
      fontSize: '0.9rem',
      fontWeight: '500',
      boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
      transform: 'translateX(120%)',
      transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease',
      pointerEvents: 'auto',
      cursor: 'pointer',
      maxWidth: '380px',
      wordBreak: 'break-word'
    });
    toast.innerHTML = `
      <span style="font-size:1.2rem">${colorSet.icon}</span>
      <span>${message}</span>
      <button class="toast-close" style="
        background:none; border:none; color:#fff; font-size:1.2rem;
        cursor:pointer; margin-left:auto; padding:0 4px; opacity:0.7;
      ">&times;</button>
    `;

    container.appendChild(toast);

    /* Animate in */
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.style.transform = 'translateX(0)';
      });
    });

    /* Auto dismiss */
    const dismissTimeout = setTimeout(() => dismissToast(toast), 3000);

    /* Close on click */
    toast.querySelector('.toast-close').addEventListener('click', () => {
      clearTimeout(dismissTimeout);
      dismissToast(toast);
    });

    toast.addEventListener('click', (e) => {
      if (!e.target.closest('.toast-close')) {
        clearTimeout(dismissTimeout);
        dismissToast(toast);
      }
    });
  };

  /**
   * Remove a toast with animation.
   * @param {HTMLElement} toast
   */
  const dismissToast = (toast) => {
    toast.style.transform = 'translateX(120%)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  };

  /* Make showToast globally accessible for other modules */
  window.showToast = showToast;

  /* ==========================================================
   *  SECTION 23 — MAGNETIC BUTTONS
   * ========================================================== */

  const initMagneticButtons = () => {
    const buttons = document.querySelectorAll('.magnetic-btn');
    if (buttons.length === 0) return;

    buttons.forEach((btn) => {
      let animFrame = null;

      btn.addEventListener('mousemove', (e) => {
        cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(() => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          const maxMove = 8;
          const moveX = clamp(x * 0.25, -maxMove, maxMove);
          const moveY = clamp(y * 0.25, -maxMove, maxMove);

          btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
          btn.style.transition = 'transform 0.2s ease';
        });
      });

      btn.addEventListener('mouseleave', () => {
        cancelAnimationFrame(animFrame);
        btn.style.transform = 'translate(0, 0)';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      });
    });
  };

  /* ==========================================================
   *  SECTION 24 — BUTTON RIPPLE EFFECT
   * ========================================================== */

  const initRippleEffect = () => {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-submit');
    if (buttons.length === 0) return;

    buttons.forEach((btn) => {
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';

      btn.addEventListener('click', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';

        const size = Math.max(rect.width, rect.height) * 2;

        Object.assign(ripple.style, {
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          left: `${x - size / 2}px`,
          top: `${y - size / 2}px`,
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          transform: 'scale(0)',
          animation: 'ripple-expand 0.6s ease-out forwards',
          pointerEvents: 'none',
          zIndex: '0'
        });

        btn.appendChild(ripple);

        /* Remove after animation */
        setTimeout(() => ripple.remove(), 600);
      });
    });

    /* Inject ripple keyframes if not already present */
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple-expand {
          0%   { transform: scale(0); opacity: 1; }
          100% { transform: scale(4); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  };

  /* ==========================================================
   *  SECTION 25 — BACK TO TOP BUTTON
   * ========================================================== */

  const initBackToTop = () => {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;

    /* Show / hide based on scroll position */
    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        if (window.scrollY > 500) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
      });
    }, { passive: true });

    /* Scroll to top on click */
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  /* ==========================================================
   *  SECTION 26 — SCROLL INDICATOR (Hero)
   * ========================================================== */

  const initScrollIndicator = () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    const hero = document.getElementById('hero') || document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      requestAnimationFrame(() => {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollY = window.scrollY;

        if (scrollY > heroBottom * 0.3) {
          indicator.style.opacity = '0';
          indicator.style.pointerEvents = 'none';
        } else {
          indicator.style.opacity = '1';
          indicator.style.pointerEvents = 'auto';
        }
      });
    }, { passive: true });
  };

  /* ==========================================================
   *  SECTION 27 — IMAGE LAZY LOADING
   * ========================================================== */

  const initLazyLoad = () => {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');

            img.addEventListener('load', () => {
              img.classList.add('loaded');
            }, { once: true });

            /* Handle already-cached images */
            if (img.complete) {
              img.classList.add('loaded');
            }

            lazyObserver.unobserve(img);
          }
        });
      },
      { rootMargin: '100px' }
    );

    images.forEach((img) => lazyObserver.observe(img));
  };

  /* ==========================================================
   *  SECTION 28 — FLOATING GEOMETRIC SHAPES
   * ========================================================== */

  const initFloatingShapes = () => {
    const hero = document.getElementById('hero') || document.querySelector('.hero');
    if (!hero) return;

    /* Don't create if mobile to save perf */
    if (isMobile()) return;

    const shapeTypes = ['circle', 'triangle', 'square'];
    const count = Math.floor(randomBetween(8, 12));
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < count; i++) {
      const shape = document.createElement('div');
      const type = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      const size = randomBetween(20, 60);
      const opacity = randomBetween(0.03, 0.08);
      const duration = randomBetween(15, 35);
      const delay = randomBetween(0, 10);
      const left = randomBetween(0, 100);
      const top = randomBetween(0, 100);
      const rotation = randomBetween(0, 360);

      shape.className = `floating-shape floating-shape-${type}`;

      Object.assign(shape.style, {
        position: 'absolute',
        left: `${left}%`,
        top: `${top}%`,
        width: `${size}px`,
        height: `${size}px`,
        opacity: opacity.toString(),
        pointerEvents: 'none',
        zIndex: '0',
        animation: `floatShape${i % 4} ${duration}s ${delay}s ease-in-out infinite alternate`,
        transform: `rotate(${rotation}deg)`
      });

      const accentColor = 'var(--accent, #00d4ff)';

      if (type === 'circle') {
        shape.style.borderRadius = '50%';
        shape.style.border = `1px solid ${accentColor}`;
      } else if (type === 'square') {
        shape.style.borderRadius = '4px';
        shape.style.border = `1px solid ${accentColor}`;
        shape.style.transform += ' rotate(45deg)';
      } else if (type === 'triangle') {
        shape.style.width = '0';
        shape.style.height = '0';
        shape.style.borderLeft = `${size / 2}px solid transparent`;
        shape.style.borderRight = `${size / 2}px solid transparent`;
        shape.style.borderBottom = `${size}px solid ${accentColor}`;
        shape.style.border = 'none';
        shape.style.borderLeft = `${size / 2}px solid transparent`;
        shape.style.borderRight = `${size / 2}px solid transparent`;
        shape.style.borderBottom = `${size * 0.866}px solid rgba(0, 212, 255, ${opacity})`;
      }

      fragment.appendChild(shape);
    }

    hero.appendChild(fragment);

    /* Inject keyframes for floating shapes */
    if (!document.getElementById('floating-shape-keyframes')) {
      const style = document.createElement('style');
      style.id = 'floating-shape-keyframes';
      style.textContent = `
        @keyframes floatShape0 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(30px, -20px) rotate(120deg); }
        }
        @keyframes floatShape1 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-20px, 30px) rotate(-90deg); }
        }
        @keyframes floatShape2 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(20px, 20px) rotate(180deg); }
        }
        @keyframes floatShape3 {
          0%   { transform: translate(0, 0) rotate(0deg); }
          100% { transform: translate(-30px, -15px) rotate(90deg); }
        }
      `;
      document.head.appendChild(style);
    }
  };

  /* ==========================================================
   *  SECTION 29 — ANIMATED GRADIENT BORDERS
   * ========================================================== */

  const initGradientBorders = () => {
    const elements = document.querySelectorAll('.gradient-border');
    if (elements.length === 0) return;

    let angle = 0;
    let animFrame = null;

    const animate = () => {
      angle = (angle + 0.5) % 360;
      elements.forEach((el) => {
        el.style.setProperty('--angle', `${angle}deg`);
      });
      animFrame = requestAnimationFrame(animate);
    };

    /* Only run when at least one element is in viewport (perf) */
    const gradientObserver = new IntersectionObserver(
      (entries) => {
        const anyVisible = entries.some((e) => e.isIntersecting);
        if (anyVisible && !animFrame) {
          animate();
        } else if (!anyVisible && animFrame) {
          cancelAnimationFrame(animFrame);
          animFrame = null;
        }
      },
      { threshold: 0 }
    );

    elements.forEach((el) => gradientObserver.observe(el));
  };

  /* ==========================================================
   *  SECTION 30 — RESIZE HANDLER
   * ========================================================== */

  const initResizeHandler = () => {
    const handleResize = debounce(() => {
      /* Particles */
      if (typeof window.__particlesResize === 'function') {
        window.__particlesResize();
      }

      /* Cursor visibility */
      const cursorEls = window.__cursorElements;
      if (cursorEls) {
        const shouldHide = isMobile();
        cursorEls.dot.style.display = shouldHide ? 'none' : '';
        cursorEls.outline.style.display = shouldHide ? 'none' : '';
        if (shouldHide) {
          document.body.style.cursor = '';
        } else {
          document.body.style.cursor = 'none';
        }
      }

      /* Slider reset — go to current slide to fix width */
      const track = document.querySelector('.testimonials-track');
      if (track) {
        /* Force reflow */
        track.style.transition = 'none';
        requestAnimationFrame(() => {
          track.style.transition = '';
        });
      }
    }, 250);

    window.addEventListener('resize', handleResize, { passive: true });
  };

  /* ==========================================================
   *  SECTION 31 — KEYBOARD NAVIGATION
   * ========================================================== */

  const initKeyboardNav = () => {
    document.addEventListener('keydown', (e) => {
      /* Escape — close modal, mobile menu */
      if (e.key === 'Escape') {
        /* Close project modal */
        const modal = document.querySelector('.project-modal.active');
        if (modal) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }

        /* Close mobile menu */
        const hamburger = document.querySelector('.hamburger.active');
        const mobileMenu = document.querySelector('.mobile-menu.active');
        if (hamburger && mobileMenu) {
          hamburger.classList.remove('active');
          mobileMenu.classList.remove('active');
          document.body.style.overflow = '';
        }
      }

      /* Enter / Space on buttons and interactive elements */
      if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (
          focused &&
          (focused.classList.contains('filter-btn') ||
            focused.classList.contains('category-btn') ||
            focused.classList.contains('slider-dot') ||
            focused.classList.contains('magnetic-btn'))
        ) {
          e.preventDefault();
          focused.click();
        }
      }
    });

    /* Ensure interactive elements are focusable */
    document
      .querySelectorAll('.filter-btn, .category-btn, .slider-dot, .slider-arrow, .magnetic-btn')
      .forEach((el) => {
        if (!el.getAttribute('tabindex')) {
          el.setAttribute('tabindex', '0');
        }
        el.setAttribute('role', 'button');
      });
  };

  /* ==========================================================
   *  SECTION 32 — PERFORMANCE OPTIMIZATIONS
   * ========================================================== */

  const initPerformanceOptimizations = () => {
    /* Add will-change hints for animated elements */
    const hintElements = document.querySelectorAll(
      '.project-card, .testimonial-card, .back-to-top, .navbar, .cursor-dot, .cursor-outline'
    );
    hintElements.forEach((el) => {
      el.style.willChange = 'transform';
    });

    /* Remove will-change after initial animations settle (3s) */
    setTimeout(() => {
      hintElements.forEach((el) => {
        /* Keep will-change only for continuously animated elements */
        if (!el.classList.contains('cursor-dot') && !el.classList.contains('cursor-outline')) {
          el.style.willChange = 'auto';
        }
      });
    }, 3000);

    /* Prefer reduced motion */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) {
      document.documentElement.classList.add('reduced-motion');
    }
    prefersReducedMotion.addEventListener('change', (e) => {
      document.documentElement.classList.toggle('reduced-motion', e.matches);
    });
  };

  /* ==========================================================
   *  INITIALIZATION — Boot all features
   * ========================================================== */

  const init = () => {
    /* 01 */ initPreloader();
    /* 02 */ initCustomCursor();
    /* 03 */ initMouseGlow();
    /* 04 */ initScrollProgress();
    /* 05 */ initNavbar();
    /* 06 */ initSmoothScroll();
    /* 07 */ initThemeToggle();
    /* 08 */ initTypingAnimation();
    /* 09 */ initScrollReveal();
    /* 10 */ initCounters();
    /* 11 */ initSkillBars();
    /* 12 */ initSkillsFilter();
    /* 13 */ initProjectFilter();
    /* 14 */ initProjectTilt();
    /* 15 */ initProjectModal();
    /* 16 */ initParticles();
    /* 17 */ initBlobParallax();
    /* 18 */ initMouseParallax();
    /* 19 */ initTestimonialsSlider();
    /* 20 */ initContactForm();
    /* 21 */ initCopyEmail();
    /* 22 */ /* Toast is a global function, no init needed */
    /* 23 */ initMagneticButtons();
    /* 24 */ initRippleEffect();
    /* 25 */ initBackToTop();
    /* 26 */ initScrollIndicator();
    /* 27 */ initLazyLoad();
    /* 28 */ initFloatingShapes();
    /* 29 */ initGradientBorders();
    /* 30 */ initResizeHandler();
    /* 31 */ initKeyboardNav();
    /* 32 */ initPerformanceOptimizations();

    console.log('%c✦ Portfolio loaded — all systems go!', 'color:#00d4ff;font-size:14px;font-weight:bold;');
  };

  init();
});
