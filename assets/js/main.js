/**
 * GLASSBLOWING STUDIO — CORE JAVASCRIPT ARCHITECTURE
 * Handblown Glass Art / Hot Shop / Bespoke Commissions
 */

(function () {
  'use strict';

  // State Management
  const STORAGE_THEME_KEY = 'glass_studio_theme';
  const STORAGE_DIR_KEY = 'glass_studio_direction';

  /**
   * 1. Theme Management (Deep Mauve #18131F Dark Mode)
   */
  function initTheme() {
    const savedTheme = localStorage.getItem(STORAGE_THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    updateThemeToggleIcons();
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(STORAGE_THEME_KEY, isDark ? 'dark' : 'light');
    updateThemeToggleIcons();
  }

  function updateThemeToggleIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    const themeButtons = document.querySelectorAll('.theme-toggle-btn');
    themeButtons.forEach(btn => {
      const sunIcon = btn.querySelector('.theme-icon-sun');
      const moonIcon = btn.querySelector('.theme-icon-moon');
      const textSpan = btn.querySelector('.theme-text');
      
      if (isDark) {
        if (sunIcon) sunIcon.classList.remove('hidden');
        if (moonIcon) moonIcon.classList.add('hidden');
        btn.classList.add('is-dark-active');
        btn.setAttribute('aria-label', 'Dark mode active. Click to switch to light mode.');
        btn.setAttribute('title', 'Dark Mode Active (Click for Light Mode)');
      } else {
        if (sunIcon) sunIcon.classList.add('hidden');
        if (moonIcon) moonIcon.classList.remove('hidden');
        btn.classList.remove('is-dark-active');
        btn.setAttribute('aria-label', 'Light mode active. Click to switch to dark mode.');
        btn.setAttribute('title', 'Light Mode Active (Click for Dark Mode)');
      }
      if (textSpan) {
        textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
      }
    });
  }

  /**
   * 2. Bidirectional Document Direction (RTL / LTR)
   */
  function initDirection() {
    const savedDir = localStorage.getItem(STORAGE_DIR_KEY) || 'ltr';
    document.documentElement.dir = savedDir;
    document.documentElement.setAttribute('lang', savedDir === 'rtl' ? 'ar' : 'en');
    updateDirectionToggleButtons(savedDir);
  }

  function toggleDirection() {
    const currentDir = document.documentElement.dir || 'ltr';
    const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    document.documentElement.dir = newDir;
    document.documentElement.setAttribute('lang', newDir === 'rtl' ? 'ar' : 'en');
    localStorage.setItem(STORAGE_DIR_KEY, newDir);
    updateDirectionToggleButtons(newDir);
  }

  function updateDirectionToggleButtons(dir) {
    const isRtl = dir === 'rtl';
    const dirButtons = document.querySelectorAll('.dir-toggle-btn');
    dirButtons.forEach(btn => {
      const label = btn.querySelector('.dir-label');
      if (label) {
        label.textContent = isRtl ? 'RTL' : 'LTR';
      }
      if (isRtl) {
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        btn.setAttribute('aria-label', 'RTL text direction active. Click to switch to LTR.');
        btn.setAttribute('title', 'RTL Active (Click for LTR)');
      } else {
        btn.classList.remove('is-active');
        btn.setAttribute('aria-pressed', 'false');
        btn.setAttribute('aria-label', 'LTR text direction active. Click to switch to RTL.');
        btn.setAttribute('title', 'LTR Active (Click for RTL)');
      }
    });
  }

  /**
   * 3. Desktop Home Dropdown (Dual Hover + Click Support with Grace Timeout)
   */
  function initDesktopHomeDropdown() {
    const dropdownBtn = document.getElementById('home-dropdown-btn');
    const dropdownMenu = document.getElementById('home-dropdown-menu');
    if (!dropdownBtn || !dropdownMenu) return;

    const dropdownContainer = dropdownBtn.closest('.relative') || dropdownBtn.parentElement;
    const chevron = dropdownBtn.querySelector('svg');
    let closeTimer = null;

    function openDropdown() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      dropdownBtn.setAttribute('aria-expanded', 'true');
      dropdownMenu.classList.remove('hidden');
      dropdownMenu.classList.add('opacity-100');
      if (chevron) chevron.classList.add('rotate-180');
    }

    function closeDropdown(immediate = false) {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }

      if (immediate) {
        dropdownBtn.setAttribute('aria-expanded', 'false');
        dropdownMenu.classList.add('hidden');
        dropdownMenu.classList.remove('opacity-100');
        if (chevron) chevron.classList.remove('rotate-180');
      } else {
        closeTimer = setTimeout(() => {
          dropdownBtn.setAttribute('aria-expanded', 'false');
          dropdownMenu.classList.add('hidden');
          dropdownMenu.classList.remove('opacity-100');
          if (chevron) chevron.classList.remove('rotate-180');
          closeTimer = null;
        }, 200);
      }
    }

    // Hover events on the container (covers button + menu)
    if (dropdownContainer) {
      dropdownContainer.addEventListener('mouseenter', () => {
        openDropdown();
      });

      dropdownContainer.addEventListener('mouseleave', () => {
        closeDropdown(false);
      });
    }

    // Click toggle on the button
    dropdownBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = dropdownBtn.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDropdown(true);
      } else {
        openDropdown();
      }
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (!dropdownBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        closeDropdown(true);
      }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeDropdown(true);
      }
    });
  }

  /**
   * 4. Dedicated Mobile Navigation Drawer & Accordion
   */
  function initMobileMenu() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileCloseBtn = document.getElementById('mobile-menu-close-btn');
    const mobileBackdrop = document.getElementById('mobile-drawer-backdrop');
    const accordionBtn = document.getElementById('mobile-home-accordion-btn');
    const accordionMenu = document.getElementById('mobile-home-accordion-menu');
    const accordionChevron = document.getElementById('mobile-home-chevron');

    function closeAccordion() {
      if (accordionMenu) {
        accordionMenu.classList.add('hidden');
      }
      if (accordionChevron) {
        accordionChevron.classList.remove('rotate-180');
      }
      if (accordionBtn) {
        accordionBtn.setAttribute('aria-expanded', 'false');
      }
    }

    function toggleAccordion(e) {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (!accordionMenu) return;
      const isCurrentlyOpen = !accordionMenu.classList.contains('hidden');
      if (isCurrentlyOpen) {
        closeAccordion();
      } else {
        accordionMenu.classList.remove('hidden');
        if (accordionChevron) {
          accordionChevron.classList.add('rotate-180');
        }
        if (accordionBtn) {
          accordionBtn.setAttribute('aria-expanded', 'true');
        }
      }
    }

    function openDrawer() {
      if (!mobileDrawer) return;
      // Ensure accordion is strictly closed by default on drawer open
      closeAccordion();
      mobileDrawer.classList.add('is-open');
      if (mobileBackdrop) {
        mobileBackdrop.classList.add('is-open');
        mobileBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.add('opacity-100');
      }
      document.body.style.overflow = 'hidden';
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      if (!mobileDrawer) return;
      // Always reset accordion to closed state when drawer closes
      closeAccordion();
      mobileDrawer.classList.remove('is-open');
      if (mobileBackdrop) {
        mobileBackdrop.classList.remove('is-open');
        mobileBackdrop.classList.add('opacity-0', 'pointer-events-none');
        mobileBackdrop.classList.remove('opacity-100');
      }
      document.body.style.overflow = '';
      if (mobileBtn) mobileBtn.setAttribute('aria-expanded', 'false');
    }

    // Auto-close mobile drawer if window resized to true desktop (> 1380px)
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1380) {
        closeDrawer();
      }
    });

    if (mobileBtn) mobileBtn.addEventListener('click', openDrawer);
    if (mobileCloseBtn) mobileCloseBtn.addEventListener('click', closeDrawer);
    if (mobileBackdrop) mobileBackdrop.addEventListener('click', closeDrawer);

    // Ensure accordion is initially closed on page load
    closeAccordion();

    // Mobile Home Submenu Accordion: ONLY open when HOME button is clicked
    if (accordionBtn && accordionMenu) {
      accordionBtn.setAttribute('type', 'button');
      accordionBtn.addEventListener('click', toggleAccordion);
    }

    // Auto-close accordion if clicking anywhere else in the mobile drawer
    if (mobileDrawer) {
      mobileDrawer.addEventListener('click', (e) => {
        if (!e.target.closest('#mobile-home-accordion-btn') && !e.target.closest('#mobile-home-accordion-menu')) {
          closeAccordion();
        }
      });

      // Close mobile drawer when clicking any link inside
      const drawerLinks = mobileDrawer.querySelectorAll('a');
      drawerLinks.forEach(link => {
        link.addEventListener('click', closeDrawer);
      });
    }
  }

  /**
   * 5. Active Navigation Identifier (Strict Home 1 & Home 2 + All Subpages Active Highlight)
   */
  function initActiveNavigation() {
    let rawPath = window.location.pathname;
    // Extract file name from pathname or default to index.html
    let currentPath = rawPath.substring(rawPath.lastIndexOf('/') + 1).split('?')[0].split('#')[0];
    
    // Normalize root / empty path to index.html
    if (!currentPath || currentPath === '' || currentPath === '/') {
      currentPath = 'index.html';
    }

    // Clear all existing active states
    document.querySelectorAll('.nav-link, #mobile-drawer a, #home-dropdown-menu a, #mobile-home-accordion-btn').forEach(el => {
      el.classList.remove('is-active', 'active');
      el.removeAttribute('aria-current');
    });

    const homeTrigger = document.getElementById('home-dropdown-btn');
    const mobileHomeAccordionBtn = document.getElementById('mobile-home-accordion-btn');
    const isHome = (currentPath === 'index.html' || currentPath === 'home-2.html');

    if (isHome) {
      // 1. Activate HOME trigger in Desktop Header
      if (homeTrigger) {
        homeTrigger.classList.add('is-active', 'active');
        homeTrigger.setAttribute('aria-current', 'page');
      }

      // 2. Activate HOME in Mobile Drawer
      if (mobileHomeAccordionBtn) {
        mobileHomeAccordionBtn.classList.add('is-active', 'active');
      }

      // 3. Highlight specific active Home sub-link in dropdown & accordion
      document.querySelectorAll(`a[href="${currentPath}"], a[href="./${currentPath}"]`).forEach(link => {
        if (link.closest('#home-dropdown-menu') || link.closest('#mobile-home-accordion-menu')) {
          link.classList.add('is-active', 'active');
          link.setAttribute('aria-current', 'page');
        }
      });
    } else {
      // Highlight matching desktop nav links
      document.querySelectorAll(`header nav a[href="${currentPath}"], header nav a[href="./${currentPath}"]`).forEach(link => {
        link.classList.add('is-active', 'active');
        link.setAttribute('aria-current', 'page');
      });

      // Highlight matching mobile drawer links
      document.querySelectorAll(`#mobile-drawer a[href="${currentPath}"], #mobile-drawer a[href="./${currentPath}"]`).forEach(link => {
        link.classList.add('is-active', 'active');
        link.setAttribute('aria-current', 'page');
      });
    }
  }

  /**
   * 6. Branded Molten Page Loader
   */
  function initPageLoader() {
    const loader = document.getElementById('page-loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('loaded');
      }, 200);
    });

    // Fallback in case load event already fired
    setTimeout(() => {
      if (loader && !loader.classList.contains('loaded')) {
        loader.classList.add('loaded');
      }
    }, 600);
  }

  /**
   * 7. Scroll to Top Engine
   */
  function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    if (!scrollBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 350) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    }, { passive: true });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /**
   * 8. Intersection Observer Animations ([data-anim])
   */
  function initIntersectionAnimations() {
    const animElements = document.querySelectorAll('[data-anim]');
    if (!animElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    animElements.forEach(el => observer.observe(el));
  }

  /**
   * 9. Animated Metric Counters
   */
  function initCounters() {
    const counters = document.querySelectorAll('.metric-counter');
    if (!counters.length) return;

    const counterObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-target') || '0', 10);
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 1600;
          const start = performance.now();

          function updateCount(timestamp) {
            const progress = Math.min((timestamp - start) / duration, 1);
            // Ease out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOut * target);
            el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
            }
          }

          requestAnimationFrame(updateCount);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  }

  /**
   * 10. Desktop 3D Mousemove Tilt Interaction
   */
  function init3DInteractions() {
    // Only enable on desktop pointer devices
    const isDesktopPointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isDesktopPointer || prefersReducedMotion) return;

    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      let isHovered = false;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      function onMouseMove(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const maxRotate = parseFloat(card.getAttribute('data-tilt-max') || '10');
        targetX = -((y - centerY) / centerY) * maxRotate;
        targetY = ((x - centerX) / centerX) * maxRotate;
      }

      function updateTilt() {
        if (!isHovered) {
          currentX += (0 - currentX) * 0.1;
          currentY += (0 - currentY) * 0.1;
          card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
          if (Math.abs(currentX) > 0.01 || Math.abs(currentY) > 0.01) {
            requestAnimationFrame(updateTilt);
          } else {
            card.style.transform = 'none';
          }
          return;
        }

        currentX += (targetX - currentX) * 0.12;
        currentY += (targetY - currentY) * 0.12;
        card.style.transform = `perspective(1000px) rotateX(${currentX.toFixed(2)}deg) rotateY(${currentY.toFixed(2)}deg)`;
        requestAnimationFrame(updateTilt);
      }

      card.addEventListener('mouseenter', () => {
        isHovered = true;
        requestAnimationFrame(updateTilt);
      });

      card.addEventListener('mousemove', onMouseMove);

      card.addEventListener('mouseleave', () => {
        isHovered = false;
      });
    });
  }

  /**
   * Global Event Bindings
   */
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDirection();
    initDesktopHomeDropdown();
    initMobileMenu();
    initActiveNavigation();
    initPageLoader();
    initScrollToTop();
    initIntersectionAnimations();
    initCounters();
    init3DInteractions();

    // Attach Toggle Listeners
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleTheme);
    });

    document.querySelectorAll('.dir-toggle-btn').forEach(btn => {
      btn.addEventListener('click', toggleDirection);
    });
  });

  // Expose helpers globally if needed
  window.GlassStudio = {
    toggleTheme,
    toggleDirection
  };

})();



// <!-- ====================================================================
//      SECTION 02 — JAVASCRIPT
//      ==================================================================== -->

  document.addEventListener("DOMContentLoaded", () => {

    const intro = document.querySelector("[data-s02-intro]");
    const list = document.querySelector("[data-s02-list]");
    const items = document.querySelectorAll("[data-s02-item]");
    const footer = document.querySelector("[data-s02-footer]");

    const targets = [
      intro,
      list,
      ...items,
      footer
    ].filter(Boolean);


    /* ================================================================
       INTERSECTION OBSERVER
       ================================================================ */

    const observer = new IntersectionObserver(
      (entries, obs) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          const target = entry.target;

          if (target.matches("[data-s02-item]")) {

            const index = [...items].indexOf(target);

            setTimeout(() => {
              target.classList.add("s02-visible");
            }, index * 100);

          } else {

            target.classList.add("s02-visible");

          }

          obs.unobserve(target);

        });

      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
      }
    );


    targets.forEach((element) => {
      observer.observe(element);
    });

  });

