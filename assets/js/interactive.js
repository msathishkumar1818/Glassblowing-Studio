/**
 * GLASSBLOWING STUDIO — INTERACTIVE SPECIALTY TOOLS
 * Bespoke Configurators, Gallery Filters, Workshop Schedulers, and Thermal Simulators
 * Strictly Styled with Lavender, Deep Mauve, Soft Purple, Dusty Rose & Blush Pink Palette
 */

document.addEventListener('DOMContentLoaded', () => {

  /**
   * 1. Home 1: Thermal Transformation Interactive Slider (Section 02)
   */
  const thermalContainer = document.getElementById('thermal-slider-container');
  const thermalHandle = document.getElementById('thermal-slider-handle');
  const thermalAfter = document.getElementById('thermal-after-layer');
  const thermalTempBadge = document.getElementById('thermal-temp-display');
  const dynamicEyebrow = document.getElementById('thermal-badge-eyebrow');
  const dynamicTitle = document.getElementById('thermal-badge-title');
  const dynamicDot = document.getElementById('thermal-badge-dot');

  if (thermalContainer && thermalHandle && thermalAfter) {
    let isDragging = false;

    function setSliderPosition(x) {
      const rect = thermalContainer.getBoundingClientRect();
      let offsetX = x - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      thermalHandle.style.left = `${percentage}%`;
      thermalAfter.style.clipPath = `polygon(${percentage}% 0, 100% 0, 100% 100%, ${percentage}% 100%)`;

      // Calculate dynamic temperature from 20°C up to 1,150°C
      // When percentage is 100% (all raw silica visible), moltenRatio is 0, temp is 20°C
      // When percentage is 0% (all molten glass visible), moltenRatio is 1, temp is 1,150°C
      const moltenRatio = (100 - percentage) / 100;
      const temp = Math.round(20 + moltenRatio * 1130);
      const tempF = Math.round(temp * 1.8 + 32);

      if (percentage <= 50) {
        // When slider moves to the left (< 50%), molten glass gather fills the screen
        if (dynamicEyebrow) {
          dynamicEyebrow.textContent = 'State 02: Fluid Viscosity';
          dynamicEyebrow.style.color = '#FFD4EC';
        }
        if (dynamicTitle) {
          dynamicTitle.textContent = 'Radiant Molten Gather';
        }
        if (thermalTempBadge) {
          thermalTempBadge.textContent = `Glory Hole: ${temp.toLocaleString()}°C / ${tempF.toLocaleString()}°F`;
        }
        if (dynamicDot) {
          dynamicDot.style.backgroundColor = '#FFD4EC';
        }
      } else {
        // When slider moves to the right (> 50%), raw silica sand is dominant
        if (dynamicEyebrow) {
          dynamicEyebrow.textContent = 'State 01: Inert';
          dynamicEyebrow.style.color = '#C4BAFA';
        }
        if (dynamicTitle) {
          dynamicTitle.textContent = 'Raw Silica & Soda Ash';
        }
        if (thermalTempBadge) {
          thermalTempBadge.textContent = `Ambient: ${temp.toLocaleString()}°C / ${tempF.toLocaleString()}°F`;
        }
        if (dynamicDot) {
          dynamicDot.style.backgroundColor = '#C4BAFA';
        }
      }
    }

    thermalContainer.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    thermalContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /**
   * 2. Home 2: Optical Refraction Spectrum Chamber (Section 04)
   */
  const spectrumButtons = document.querySelectorAll('.spectrum-btn');
  const spectrumStage = document.getElementById('spectrum-display-stage');
  const spectrumLabel = document.getElementById('spectrum-active-label');
  const spectrumDesc = document.getElementById('spectrum-active-desc');

  if (spectrumButtons.length && spectrumStage) {
    spectrumButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        spectrumButtons.forEach(b => {
          b.classList.remove('active', 'border-[#9B91CA]', 'text-[#9B91CA]', 'bg-[#9B91CA]/15', 'shadow-md');
          b.classList.add('border-neutral-300', 'dark:border-white/10');
        });

        btn.classList.add('active', 'border-[#9B91CA]', 'text-[#9B91CA]', 'bg-[#9B91CA]/15', 'shadow-md');
        btn.classList.remove('border-neutral-300', 'dark:border-white/10');

        const filterMode = btn.getAttribute('data-spectrum');
        const labelText = btn.getAttribute('data-label');
        const descText = btn.getAttribute('data-desc');

        if (spectrumLabel) spectrumLabel.textContent = labelText;
        if (spectrumDesc) spectrumDesc.textContent = descText;

        spectrumStage.className = 'w-full h-full object-cover transition-all duration-700 ease-in-out ' + filterMode;
      });
    });
  }

  /**
   * 3. Gallery: Live Category Filter & Lightbox (Section 01 & 08)
   */
  const filterPills = document.querySelectorAll('.gallery-filter-pill');
  const galleryItems = document.querySelectorAll('.gallery-item-card');
  const galleryCountBadge = document.getElementById('gallery-count-badge');

  if (filterPills.length && galleryItems.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => {
          p.classList.remove('bg-[#9B91CA]', 'text-[#F3E9F1]', 'text-white', 'border-[#9B91CA]', 'shadow-md');
          p.classList.add('bg-transparent', 'border-neutral-300', 'dark:border-white/15');
        });

        pill.classList.add('bg-[#9B91CA]', 'text-white', 'border-[#9B91CA]', 'shadow-md');
        pill.classList.remove('bg-transparent', 'border-neutral-300', 'dark:border-white/15');

        const category = pill.getAttribute('data-filter');
        let visibleCount = 0;

        galleryItems.forEach(item => {
          const itemCat = item.getAttribute('data-category');
          if (category === 'all' || itemCat === category) {
            item.classList.remove('hidden');
            visibleCount++;
          } else {
            item.classList.add('hidden');
          }
        });

        if (galleryCountBadge) {
          galleryCountBadge.textContent = `${visibleCount} Works Displayed`;
        }
      });
    });
  }

  // Lightbox Modal
  const lightboxModal = document.getElementById('gallery-lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-image');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxClose = document.getElementById('lightbox-close-btn');

  if (lightboxModal && lightboxImg) {
    document.querySelectorAll('.open-lightbox-trigger').forEach(trigger => {
      trigger.addEventListener('click', () => {
        const src = trigger.getAttribute('data-full-img');
        const title = trigger.getAttribute('data-title') || 'Master Glass Artwork';
        const desc = trigger.getAttribute('data-desc') || 'Handblown studio crystal with hand-tooled pontil mark.';

        lightboxImg.src = src;
        if (lightboxTitle) lightboxTitle.textContent = title;
        if (lightboxDesc) lightboxDesc.textContent = desc;

        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightboxModal.classList.add('hidden');
      lightboxModal.classList.remove('flex');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
        closeLightbox();
      }
    });
  }

  /**
   * 4. Custom Commissions: Interactive Live Configurator (Section 04)
   */
  const configType = document.getElementById('commission-type-select');
  const configPalette = document.getElementById('commission-palette-select');
  const configScale = document.getElementById('commission-scale-select');
  const priceDisplay = document.getElementById('commission-estimated-price');
  const leadDisplay = document.getElementById('commission-estimated-lead');
  const briefBtn = document.getElementById('commission-generate-brief-btn');
  const briefOutput = document.getElementById('commission-brief-output');

  function updateCommissionEstimate() {
    if (!configType || !configScale || !priceDisplay) return;

    const basePrices = {
      chandelier: 4800,
      sculpture: 2200,
      vessel: 1400,
      atrium: 8500
    };

    const scaleMultipliers = {
      small: 1.0,
      medium: 1.6,
      monumental: 2.8
    };

    const leadTimes = {
      small: '3–4 Weeks',
      medium: '5–7 Weeks',
      monumental: '8–12 Weeks'
    };

    const currentType = configType.value || 'sculpture';
    const currentScale = configScale.value || 'medium';

    const base = basePrices[currentType] || 2000;
    const mult = scaleMultipliers[currentScale] || 1.5;
    const estimatedTotal = Math.round(base * mult);

    priceDisplay.textContent = `$${estimatedTotal.toLocaleString()}`;
    if (leadDisplay) leadDisplay.textContent = leadTimes[currentScale] || '4–6 Weeks';
  }

  if (configType && configScale) {
    configType.addEventListener('change', updateCommissionEstimate);
    if (configPalette) configPalette.addEventListener('change', updateCommissionEstimate);
    configScale.addEventListener('change', updateCommissionEstimate);
    updateCommissionEstimate();
  }

  if (briefBtn && briefOutput) {
    briefBtn.addEventListener('click', () => {
      const typeText = configType ? configType.options[configType.selectedIndex].text : 'Sculptural Vessel';
      const paletteText = configPalette ? configPalette.options[configPalette.selectedIndex].text : 'Lavender & Mauve Crystal';
      const scaleText = configScale ? configScale.options[configScale.selectedIndex].text : 'Medium Studio Scale';
      const priceText = priceDisplay ? priceDisplay.textContent : '$3,500';
      const leadText = leadDisplay ? leadDisplay.textContent : '5–7 Weeks';

      briefOutput.innerHTML = `
        <div class="p-5 bg-white dark:bg-[#221B2B] rounded-xl border border-[#7A6986]/25 dark:border-[#9B91CA]/40 text-left font-sans text-sm space-y-2.5 shadow-lg">
          <div class="flex justify-between border-b border-[#7A6986]/20 dark:border-[#9B91CA]/20 pb-2">
            <strong class="text-[#4D2E5C] dark:text-[#C4BAFA] uppercase tracking-wider text-xs font-bold">Bespoke Glass Brief</strong>
            <span class="text-xs text-[#7A6986] dark:text-[#FFD4EC] font-mono font-bold">ID: #GLS-${Math.floor(1000 + Math.random() * 9000)}</span>
          </div>
          <p class="text-[#18131F] dark:text-white"><strong class="text-[#7A6986] dark:text-[#FFD4EC]">Typology:</strong> ${typeText}</p>
          <p class="text-[#18131F] dark:text-white"><strong class="text-[#7A6986] dark:text-[#FFD4EC]">Chromatic Harmony:</strong> ${paletteText}</p>
          <p class="text-[#18131F] dark:text-white"><strong class="text-[#7A6986] dark:text-[#FFD4EC]">Dimensional Scale:</strong> ${scaleText}</p>
          <p class="text-[#18131F] dark:text-white"><strong class="text-[#7A6986] dark:text-[#FFD4EC]">Estimated Investment:</strong> <span class="text-[#4D2E5C] dark:text-[#C4BAFA] font-bold text-lg">${priceText}</span></p>
          <p class="text-[#18131F] dark:text-white"><strong class="text-[#7A6986] dark:text-[#FFD4EC]">Studio Annealing & Lead Time:</strong> <span class="text-[#18131F] dark:text-white font-bold">${leadText}</span></p>
          <p class="text-xs text-[#7A6986] dark:text-[#F3E9F1] pt-2 border-t border-[#7A6986]/20 dark:border-[#9B91CA]/20">Ready to finalize? Submit this brief in the Consultation form below for priority scheduling.</p>
        </div>
      `;
      briefOutput.classList.remove('hidden');
    });
  }

  /**
   * 5. Classes & Workshops: Date & Seat Calculator (Section 08)
   */
  const workshopSelect = document.getElementById('workshop-tier-select');
  const seatInput = document.getElementById('workshop-seat-count');
  const workshopTotalDisplay = document.getElementById('workshop-total-price');
  const workshopDepositDisplay = document.getElementById('workshop-deposit-price');

  function updateWorkshopPricing() {
    if (!workshopSelect || !seatInput || !workshopTotalDisplay) return;

    const tierPrices = {
      intro: 195,
      intermediate: 420,
      master: 850
    };

    const selectedTier = workshopSelect.value || 'intro';
    const seats = parseInt(seatInput.value || '1', 10);
    const perSeat = tierPrices[selectedTier] || 195;
    const total = perSeat * seats;
    const deposit = Math.round(total * 0.5);

    workshopTotalDisplay.textContent = `$${total.toLocaleString()}`;
    if (workshopDepositDisplay) {
      workshopDepositDisplay.textContent = `$${deposit.toLocaleString()}`;
    }
  }

  if (workshopSelect && seatInput) {
    workshopSelect.addEventListener('change', updateWorkshopPricing);
    seatInput.addEventListener('input', updateWorkshopPricing);
    updateWorkshopPricing();
  }

  /**
   * 6. Studio: Venetian Kinetic Louver Arena (Section 03)
   */
  const louverSlates = document.querySelectorAll('.tool-louver-slate');
  if (louverSlates.length) {
    louverSlates.forEach(slate => {
      slate.addEventListener('click', () => {
        louverSlates.forEach(s => s.classList.remove('active'));
        slate.classList.add('active');
      });

      slate.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
          louverSlates.forEach(s => s.classList.remove('active'));
          slate.classList.add('active');
        }
      });
    });
  }

  /**
   * 7. Interactive Forms Submission & FAQ Accordion
   */
  const interactiveForms = document.querySelectorAll('.studio-interactive-form');
  interactiveForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <svg class="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Transmitting to Hot Shop...
        `;
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<svg class="w-4 h-4 inline-block -mt-0.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/></svg> Enquiry Received by Gaffer';
          submitBtn.classList.add('bg-[#7A6986]', 'text-white', 'border-[#AB95CF]');
        }

        const alertBox = document.createElement('div');
        alertBox.className = 'mt-4 p-4 rounded bg-[#2D2338] border border-[#9B91CA] text-white text-sm animate-fade-in shadow-xl';
        alertBox.innerHTML = '<strong class="text-[#FFD4EC] font-bold">Thank you!</strong> Elena Vance and our studio team have received your request. We will review furnace schedules and respond within 24 business hours.';
        form.appendChild(alertBox);

        setTimeout(() => {
          form.reset();
          if (submitBtn) {
            submitBtn.innerHTML = originalText;
            submitBtn.classList.remove('bg-[#7A6986]');
          }
        }, 5000);
      }, 1200);
    });
  });

  // Accessible FAQ Exclusive Accordion (Opens one at a time, closes all others)
  const faqToggles = document.querySelectorAll('.faq-toggle-btn');
  faqToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const chevron = toggle.querySelector('.faq-chevron');
      const isCurrentlyExpanded = toggle.getAttribute('aria-expanded') === 'true';

      // 1. Close all other open FAQ accordion items
      faqToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.setAttribute('aria-expanded', 'false');
          const otherContent = otherToggle.nextElementSibling;
          const otherChevron = otherToggle.querySelector('.faq-chevron');
          if (otherContent) {
            otherContent.classList.add('hidden');
          }
          if (otherChevron) {
            otherChevron.classList.remove('rotate-180');
          }
        }
      });

      // 2. Toggle the clicked FAQ item
      if (isCurrentlyExpanded) {
        toggle.setAttribute('aria-expanded', 'false');
        if (content) content.classList.add('hidden');
        if (chevron) chevron.classList.remove('rotate-180');
      } else {
        toggle.setAttribute('aria-expanded', 'true');
        if (content) content.classList.remove('hidden');
        if (chevron) chevron.classList.add('rotate-180');
      }
    });
  });


  /**
   * 4. Interactive Floating Orb Chamber & Levitation Stage (Gallery Section 03)
   */
  const orbSelectors = document.querySelectorAll('.orb-selector-card');
  const mainFloatingImg = document.getElementById('main-floating-orb-img');
  const mainOrbTitle = document.getElementById('main-orb-title');
  const mainOrbBadge = document.getElementById('main-orb-badge');
  const mainOrbDesc = document.getElementById('main-orb-desc');
  const mainOrbScale = document.getElementById('main-orb-scale');
  const mainOrbPrice = document.getElementById('main-orb-price');
  const mainOrbRefract = document.getElementById('main-orb-refract');
  const mainOrbTone = document.getElementById('main-orb-tone');
  const orbAmbienceButtons = document.querySelectorAll('.orb-ambience-btn');
  const orbStageHalo = document.getElementById('orb-stage-halo');

  if (orbSelectors.length && mainFloatingImg) {
    orbSelectors.forEach(selector => {
      selector.addEventListener('click', () => {
        orbSelectors.forEach(s => {
          s.classList.remove('border-[#9B91CA]', 'bg-[#9B91CA]/15', 'shadow-lg', 'active-orb-card');
          s.classList.add('border-[#9B91CA]/20', 'bg-[#221B2B]');
        });

        selector.classList.add('border-[#9B91CA]', 'bg-[#9B91CA]/15', 'shadow-lg', 'active-orb-card');
        selector.classList.remove('border-[#9B91CA]/20', 'bg-[#221B2B]');

        const imgSrc = selector.getAttribute('data-img');
        const title = selector.getAttribute('data-title');
        const badge = selector.getAttribute('data-badge');
        const desc = selector.getAttribute('data-desc');
        const scale = selector.getAttribute('data-scale');
        const price = selector.getAttribute('data-price');
        const refract = selector.getAttribute('data-refract');
        const tone = selector.getAttribute('data-tone');

        // Smooth cross-fade animation
        mainFloatingImg.style.opacity = '0';
        mainFloatingImg.style.transform = 'scale(0.92) translateY(10px)';

        setTimeout(() => {
          mainFloatingImg.src = imgSrc;
          if (mainOrbTitle) mainOrbTitle.textContent = title;
          if (mainOrbBadge) mainOrbBadge.textContent = badge;
          if (mainOrbDesc) mainOrbDesc.textContent = desc;
          if (mainOrbScale) mainOrbScale.textContent = scale;
          if (mainOrbPrice) mainOrbPrice.textContent = price;
          if (mainOrbRefract) mainOrbRefract.textContent = refract;
          if (mainOrbTone) mainOrbTone.textContent = tone;

          mainFloatingImg.style.opacity = '1';
          mainFloatingImg.style.transform = 'scale(1) translateY(0px)';
        }, 220);
      });
    });
  }

  // Ambience Lighting Mode Switcher for Floating Orb Stage
  if (orbAmbienceButtons.length && mainFloatingImg) {
    orbAmbienceButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        orbAmbienceButtons.forEach(b => {
          b.classList.remove('bg-[#9B91CA]', 'text-white', 'border-[#9B91CA]', 'shadow-md');
          b.classList.add('bg-[#18131F]', 'text-[#C4BAFA]', 'border-[#9B91CA]/25');
        });

        btn.classList.add('bg-[#9B91CA]', 'text-white', 'border-[#9B91CA]', 'shadow-md');
        btn.classList.remove('bg-[#18131F]', 'text-[#C4BAFA]', 'border-[#9B91CA]/25');

        const mode = btn.getAttribute('data-mode');
        if (mode === 'daylight') {
          mainFloatingImg.style.filter = 'brightness(1.15) contrast(1.05) saturate(1.2)';
          if (orbStageHalo) orbStageHalo.style.background = 'radial-gradient(circle, rgba(195, 169, 208, 0.45) 0%, rgba(155, 145, 202, 0.15) 50%, transparent 70%)';
        } else if (mode === 'sunset') {
          mainFloatingImg.style.filter = 'brightness(1.05) contrast(1.1) hue-rotate(-20deg) saturate(1.4)';
          if (orbStageHalo) orbStageHalo.style.background = 'radial-gradient(circle, rgba(255, 212, 236, 0.5) 0%, rgba(185, 146, 165, 0.2) 50%, transparent 70%)';
        } else if (mode === 'uv') {
          mainFloatingImg.style.filter = 'brightness(1.2) contrast(1.3) hue-rotate(220deg) saturate(1.8)';
          if (orbStageHalo) orbStageHalo.style.background = 'radial-gradient(circle, rgba(171, 149, 207, 0.6) 0%, rgba(122, 105, 134, 0.25) 50%, transparent 70%)';
        }
      });
    });
  }

  /**
   * 5. Interactive Micro-Optics & Textural Inspector Laboratory (Gallery Section 05)
   */
  const macroTabs = document.querySelectorAll('.macro-texture-tab');
  const mainMacroImg = document.getElementById('main-macro-img');
  const macroTitle = document.getElementById('macro-specimen-title');
  const macroSubtitle = document.getElementById('macro-specimen-subtitle');
  const macroDesc = document.getElementById('macro-specimen-desc');
  const macroChem = document.getElementById('macro-specimen-chem');
  const macroDensity = document.getElementById('macro-specimen-density');
  const macroAnneal = document.getElementById('macro-specimen-anneal');
  const macroZoomBtns = document.querySelectorAll('.macro-zoom-btn');
  const macroLaserLine = document.getElementById('macro-laser-line');
  const macroGridOverlay = document.getElementById('macro-grid-overlay');
  const macroHudToggle = document.getElementById('macro-hud-toggle');

  let currentZoom = 1;

  if (macroTabs.length && mainMacroImg) {
    macroTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        macroTabs.forEach(t => {
          t.classList.remove('bg-[#9B91CA]', 'text-white', 'border-[#9B91CA]', 'shadow-lg');
          t.classList.add('bg-[#18131F]', 'text-[#C4BAFA]', 'border-[#9B91CA]/25');
        });

        tab.classList.add('bg-[#9B91CA]', 'text-white', 'border-[#9B91CA]', 'shadow-lg');
        tab.classList.remove('bg-[#18131F]', 'text-[#C4BAFA]', 'border-[#9B91CA]/25');

        const imgSrc = tab.getAttribute('data-img');
        const title = tab.getAttribute('data-title');
        const subtitle = tab.getAttribute('data-subtitle');
        const desc = tab.getAttribute('data-desc');
        const chem = tab.getAttribute('data-chem');
        const density = tab.getAttribute('data-density');
        const anneal = tab.getAttribute('data-anneal');

        // Smooth cross-fade transition
        mainMacroImg.style.opacity = '0';
        mainMacroImg.style.filter = 'blur(4px)';

        setTimeout(() => {
          mainMacroImg.src = imgSrc;
          if (macroTitle) macroTitle.textContent = title;
          if (macroSubtitle) macroSubtitle.textContent = subtitle;
          if (macroDesc) macroDesc.textContent = desc;
          if (macroChem) macroChem.textContent = chem;
          if (macroDensity) macroDensity.textContent = density;
          if (macroAnneal) macroAnneal.textContent = anneal;

          mainMacroImg.style.opacity = '1';
          mainMacroImg.style.filter = 'blur(0px)';
        }, 200);
      });
    });
  }

  // Magnification Zoom Buttons
  if (macroZoomBtns.length && mainMacroImg) {
    macroZoomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        macroZoomBtns.forEach(b => {
          b.classList.remove('bg-[#FFD4EC]', 'text-[#18131F]', 'font-bold');
          b.classList.add('bg-[#18131F]/80', 'text-[#C4BAFA]');
        });

        btn.classList.add('bg-[#FFD4EC]', 'text-[#18131F]', 'font-bold');
        btn.classList.remove('bg-[#18131F]/80', 'text-[#C4BAFA]');

        const zoomFactor = parseFloat(btn.getAttribute('data-zoom') || '1');
        currentZoom = zoomFactor;
        mainMacroImg.style.transform = `scale(${zoomFactor})`;
      });
    });
  }

  // Toggle HUD Overlay
  if (macroHudToggle && macroGridOverlay && macroLaserLine) {
    macroHudToggle.addEventListener('click', () => {
      const isVisible = !macroGridOverlay.classList.contains('hidden');
      if (isVisible) {
        macroGridOverlay.classList.add('hidden');
        macroLaserLine.classList.add('hidden');
        macroHudToggle.classList.remove('bg-[#9B91CA]', 'text-white');
        macroHudToggle.classList.add('bg-[#18131F]/80', 'text-[#C4BAFA]');
      } else {
        macroGridOverlay.classList.remove('hidden');
        macroLaserLine.classList.remove('hidden');
        macroHudToggle.classList.add('bg-[#9B91CA]', 'text-white');
        macroHudToggle.classList.remove('bg-[#18131F]/80', 'text-[#C4BAFA]');
      }
    });
  }

  /**
   * 12. Studio Hero: Live Thermal Chamber Matrix & Command Viewport (Section 01)
   */
  const studioChamberBtns = document.querySelectorAll('.studio-chamber-tab-btn');
  const studioHeroImg = document.getElementById('studio-hero-viewport-img');
  const studioChamberName = document.getElementById('studio-chamber-name');
  const studioChamberTemp = document.getElementById('studio-chamber-temp');
  const studioChamberDesc = document.getElementById('studio-chamber-desc');
  const studioChamberAtm = document.getElementById('studio-chamber-atm');
  const studioChamberVolume = document.getElementById('studio-chamber-volume');
  const studioThermalGlow = document.getElementById('studio-thermal-glow');

  if (studioChamberBtns.length && studioHeroImg) {
    studioChamberBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        studioChamberBtns.forEach(b => {
          b.classList.remove('active', 'bg-[#9B91CA]', 'text-[#18131F]', 'shadow-lg', 'border-[#FFD4EC]');
          b.classList.add('bg-[#18131F]/80', 'text-[#C4BAFA]', 'border-[#9B91CA]/30');
        });

        btn.classList.add('active', 'bg-[#9B91CA]', 'text-[#18131F]', 'shadow-lg', 'border-[#FFD4EC]');
        btn.classList.remove('bg-[#18131F]/80', 'text-[#C4BAFA]', 'border-[#9B91CA]/30');

        const img = btn.getAttribute('data-img');
        const name = btn.getAttribute('data-name');
        const temp = btn.getAttribute('data-temp');
        const desc = btn.getAttribute('data-desc');
        const atm = btn.getAttribute('data-atm');
        const volume = btn.getAttribute('data-volume');
        const glowColor = btn.getAttribute('data-glow') || 'rgba(155, 145, 202, 0.4)';

        studioHeroImg.style.opacity = '0';
        studioHeroImg.style.transform = 'scale(0.97)';

        setTimeout(() => {
          studioHeroImg.src = img;
          if (studioChamberName) studioChamberName.textContent = name;
          if (studioChamberTemp) studioChamberTemp.textContent = temp;
          if (studioChamberDesc) studioChamberDesc.textContent = desc;
          if (studioChamberAtm) studioChamberAtm.textContent = atm;
          if (studioChamberVolume) studioChamberVolume.textContent = volume;
          if (studioThermalGlow) studioThermalGlow.style.boxShadow = `0 0 45px ${glowColor}`;

          studioHeroImg.style.opacity = '1';
          studioHeroImg.style.transform = 'scale(1)';
        }, 200);
      });
    });
  }

  /**
   * 13. Studio Section 02: 4-Stage Thermal Equilibrium Workbench Explorer
   */
  const furnaceCards = document.querySelectorAll('.furnace-select-card');
  const furnaceMainImg = document.getElementById('furnace-main-img');
  const furnaceStageTag = document.getElementById('furnace-stage-tag');
  const furnaceTempPill = document.getElementById('furnace-temp-pill');
  const furnaceItalianName = document.getElementById('furnace-italian-name');
  const furnaceCapacityBadge = document.getElementById('furnace-capacity-badge');
  const furnaceLiveDesc = document.getElementById('furnace-live-desc');
  const furnaceSpecAtm = document.getElementById('furnace-spec-atm');
  const furnaceSpecRefractory = document.getElementById('furnace-spec-refractory');
  const furnaceSpecDensity = document.getElementById('furnace-spec-density');

  if (furnaceCards.length && furnaceMainImg) {
    furnaceCards.forEach(card => {
      card.addEventListener('click', () => {
        furnaceCards.forEach(c => {
          c.classList.remove('active', 'border-2', 'border-[#BE185D]', 'dark:border-[#FFD4EC]', 'shadow-xl');
          c.classList.add('border', 'border-[#7A6986]/20', 'dark:border-[#9B91CA]/20', 'shadow-md');
          const numSpan = c.querySelector('.furnace-num');
          const chevron = c.querySelector('.furnace-chevron');
          if (numSpan) {
            numSpan.className = 'furnace-num w-10 h-10 rounded-xl bg-[#7A6986]/10 dark:bg-[#9B91CA]/20 text-[#18131F] dark:text-white flex items-center justify-center font-mono font-bold text-sm shrink-0';
          }
          if (chevron) {
            chevron.className = 'furnace-chevron w-5 h-5 text-[#7A6986] dark:text-[#C4BAFA] rtl-flip shrink-0';
          }
        });

        card.classList.add('active', 'border-2', 'border-[#BE185D]', 'dark:border-[#FFD4EC]', 'shadow-xl');
        card.classList.remove('border', 'border-[#7A6986]/20', 'dark:border-[#9B91CA]/20', 'shadow-md');
        
        const activeNum = card.querySelector('.furnace-num');
        const activeChevron = card.querySelector('.furnace-chevron');
        if (activeNum) {
          activeNum.className = 'furnace-num w-10 h-10 rounded-xl bg-[#BE185D] dark:bg-[#FFD4EC] text-white dark:text-[#18131F] flex items-center justify-center font-mono font-bold text-sm shrink-0 shadow-md';
        }
        if (activeChevron) {
          activeChevron.className = 'furnace-chevron w-5 h-5 text-[#BE185D] dark:text-[#FFD4EC] rtl-flip shrink-0';
        }

        const tag = card.getAttribute('data-tag');
        const italian = card.getAttribute('data-italian');
        const temp = card.getAttribute('data-temp');
        const desc = card.getAttribute('data-desc');
        const img = card.getAttribute('data-img');
        const capacity = card.getAttribute('data-capacity');
        const atm = card.getAttribute('data-atm');
        const refractory = card.getAttribute('data-refractory');
        const density = card.getAttribute('data-density');

        furnaceMainImg.style.opacity = '0';
        furnaceMainImg.style.transform = 'scale(0.97)';

        setTimeout(() => {
          furnaceMainImg.src = img;
          if (furnaceStageTag) furnaceStageTag.textContent = tag;
          if (furnaceTempPill) furnaceTempPill.textContent = temp;
          if (furnaceItalianName) furnaceItalianName.textContent = italian;
          if (furnaceCapacityBadge) furnaceCapacityBadge.textContent = capacity;
          if (furnaceLiveDesc) furnaceLiveDesc.textContent = desc;
          if (furnaceSpecAtm) furnaceSpecAtm.textContent = atm;
          if (furnaceSpecRefractory) furnaceSpecRefractory.textContent = refractory;
          if (furnaceSpecDensity) furnaceSpecDensity.textContent = density;

          furnaceMainImg.style.opacity = '1';
          furnaceMainImg.style.transform = 'scale(1)';
        }, 200);
      });
    });
  }

  /**
   * 15. Index: Kinetic Spatial Pathways Terminal (Section 07)
   */
  const pathwayButtons = document.querySelectorAll('.pathway-selector-btn');
  const pathwayDisplay = document.getElementById('pathway-display-content');
  const pathwayActiveTag = document.getElementById('pathway-active-tag');
  const pathwayTempPill = document.getElementById('pathway-temp-pill');
  const pathwayHugeNum = document.getElementById('pathway-huge-num');
  const pathwayMoniker = document.getElementById('pathway-moniker');
  const pathwayTitle = document.getElementById('pathway-title');
  const pathwayDesc = document.getElementById('pathway-desc');
  const pathwayStat1 = document.getElementById('pathway-stat1');
  const pathwayStat2 = document.getElementById('pathway-stat2');
  const pathwayStat3 = document.getElementById('pathway-stat3');
  const pathwayStatusLabel = document.getElementById('pathway-status-label');
  const pathwayCtaBtn = document.getElementById('pathway-cta-btn');
  const pathwayCtaText = document.getElementById('pathway-cta-text');

  if (pathwayButtons.length && pathwayDisplay) {
    pathwayButtons.forEach(btn => {
      const activatePathway = () => {
        pathwayButtons.forEach(b => {
          b.classList.remove('active', 'border-2', 'border-[#FFD4EC]', 'shadow-xl');
          b.classList.add('border', 'border-[#9B91CA]/25', 'shadow-md');
          const badge = b.querySelector('.pathway-num-badge');
          const arrow = b.querySelector('.pathway-arrow');
          if (badge) {
            badge.className = 'pathway-num-badge w-10 h-10 rounded-xl bg-[#9B91CA]/20 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0 transition-colors';
          }
          if (arrow) {
            arrow.className = 'pathway-arrow text-[#C4BAFA] font-bold text-lg rtl-flip transition-transform group-hover:translate-x-1';
          }
        });

        btn.classList.add('active', 'border-2', 'border-[#FFD4EC]', 'shadow-xl');
        btn.classList.remove('border', 'border-[#9B91CA]/25', 'shadow-md');

        const activeBadge = btn.querySelector('.pathway-num-badge');
        const activeArrow = btn.querySelector('.pathway-arrow');
        if (activeBadge) {
          activeBadge.className = 'pathway-num-badge w-10 h-10 rounded-xl bg-[#FFD4EC] text-[#18131F] font-mono font-bold text-sm flex items-center justify-center shrink-0 shadow-md transition-colors';
        }
        if (activeArrow) {
          activeArrow.className = 'pathway-arrow text-[#FFD4EC] font-bold text-lg rtl-flip transition-transform group-hover:translate-x-1';
        }

        const tag = btn.getAttribute('data-tag');
        const temp = btn.getAttribute('data-temp');
        const huge = btn.getAttribute('data-huge');
        const moniker = btn.getAttribute('data-moniker');
        const title = btn.getAttribute('data-title');
        const desc = btn.getAttribute('data-desc');
        const stat1 = btn.getAttribute('data-stat1');
        const stat2 = btn.getAttribute('data-stat2');
        const stat3 = btn.getAttribute('data-stat3');
        const status = btn.getAttribute('data-status');
        const ctaText = btn.getAttribute('data-cta-text');
        const ctaHref = btn.getAttribute('data-cta-href');

        pathwayDisplay.style.opacity = '0';
        pathwayDisplay.style.transform = 'translateY(6px)';

        setTimeout(() => {
          if (pathwayActiveTag) pathwayActiveTag.textContent = tag;
          if (pathwayTempPill) pathwayTempPill.textContent = temp;
          if (pathwayHugeNum) pathwayHugeNum.textContent = huge;
          if (pathwayMoniker) pathwayMoniker.textContent = moniker;
          if (pathwayTitle) pathwayTitle.innerHTML = title;
          if (pathwayDesc) pathwayDesc.textContent = desc;
          if (pathwayStat1) pathwayStat1.textContent = stat1;
          if (pathwayStat2) pathwayStat2.textContent = stat2;
          if (pathwayStat3) pathwayStat3.textContent = stat3;
          if (pathwayStatusLabel) pathwayStatusLabel.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-[#FFD4EC]"></span> ${status}`;
          if (pathwayCtaBtn) pathwayCtaBtn.setAttribute('href', ctaHref);
          if (pathwayCtaText) pathwayCtaText.textContent = ctaText;

          pathwayDisplay.style.opacity = '1';
          pathwayDisplay.style.transform = 'translateY(0)';
        }, 150);
      };

      btn.addEventListener('click', activatePathway);
      btn.addEventListener('mouseenter', () => {
        if (window.innerWidth >= 1024) {
          activatePathway();
        }
      });
    });
  }

  /**
   * 15. Home 2: Archive of Numbered Editions (Section 05) Filter Tabs & Interactive Badges
   */
  const editionFilterTabs = document.querySelectorAll('.edition-filter-tab');
  const monographCards = document.querySelectorAll('.monograph-edition-card');

  if (editionFilterTabs.length && monographCards.length) {
    editionFilterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        // Reset tab styles
        editionFilterTabs.forEach(t => t.classList.remove('active'));

        // Activate clicked tab
        tab.classList.add('active');

        const filter = tab.getAttribute('data-edition-filter');

        monographCards.forEach(card => {
          const categoryAttr = (card.getAttribute('data-edition-category') || '').trim();
          const categories = categoryAttr.split(/\s+/);
          if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '0';
            card.style.transform = 'translateY(12px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

});


