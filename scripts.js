const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileNav = document.getElementById("mobile-nav");

mobileMenuButton.addEventListener("click", () => {
  mobileNav.classList.toggle("hidden");
});

// Brand header - same animation as other page headings
const brandTitle = document.querySelector(".brand-title");
if (brandTitle && !brandTitle.dataset.prepared) {
  brandTitle.classList.remove('logo-grown'); // Prevent override
  const words = brandTitle.textContent.trim().split(/\s+/);
  brandTitle.innerHTML = words.map(word => `<span>${word}</span>`).join(' ');
  
  brandTitle.querySelectorAll('span').forEach((span, idx) => {
    span.style.transitionDelay = `${idx * 0.165}s`;
  });
  
  brandTitle.dataset.prepared = 'true';
  
  // Trigger on load (like hero fade-up)
  setTimeout(() => brandTitle.classList.add('in'), 500);
  
  // Add logo-grown for final styling
  setTimeout(() => brandTitle.classList.add('logo-grown'), 1200);
}





const dropdownWrappers = document.querySelectorAll(".nav-dropdown");
let navHoverTimeout;

dropdownWrappers.forEach((wrapper) => {
  const menu = wrapper.querySelector(".dropdown-menu");
  const btn = wrapper.querySelector(".dropdown-btn");

  if (!menu || !btn) return;

  const closeAll = () => {
    dropdownWrappers.forEach((other) => {
      if (other === wrapper) return;
      const otherMenu = other.querySelector(".dropdown-menu");
      const otherBtn = other.querySelector(".dropdown-btn");
      other.classList.remove("open");
      if (otherMenu) otherMenu.style.display = "none";
      if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
    });
  };

  const showMenu = () => {
    if (navHoverTimeout) clearTimeout(navHoverTimeout);
    closeAll();
    wrapper.classList.add("open");
    menu.style.display = "block";
    btn.setAttribute("aria-expanded", "true");
  };

  const hideMenu = () => {
    navHoverTimeout = setTimeout(() => {
      wrapper.classList.remove("open");
      menu.style.display = "none";
      btn.setAttribute("aria-expanded", "false");
    }, 350); // Increased delay to prevent premature close
  };

  wrapper.addEventListener("mouseenter", showMenu);
  wrapper.addEventListener("mouseleave", hideMenu);

  menu.addEventListener("mouseenter", () => {
    if (navHoverTimeout) clearTimeout(navHoverTimeout);
  });

  menu.addEventListener("mouseleave", hideMenu);

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    if (wrapper.classList.contains("open")) {
      wrapper.classList.remove("open");
      menu.style.display = "none";
      btn.setAttribute("aria-expanded", "false");
    } else {
      showMenu();
    }
  });
});

const newsletterForm = document.getElementById("newsletter-form");
const newsletterMsg = document.getElementById("newsletter-msg");

newsletterForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailInput = document.getElementById("email");
  const emailValue = emailInput.value.trim();

  if (!emailValue) {
    newsletterMsg.textContent = "Please enter a valid email address.";
    newsletterMsg.style.color = "#b91c1c";
    return;
  }

  newsletterMsg.textContent = "Thanks for subscribing! You will hear from us soon.";
  newsletterMsg.style.color = "#166534";
  emailInput.value = "";
});

const remoteDataFallback = {
  heroTitle: "Engineering, Manufacturing and Project Delivery Expertise",
  heroText: "",
  businessAreas: [
    { title: "Technological & General Structure", desc: "Structures for Sugar, Ethanol, Pharma, Power, Food and Cement industries." },
    { title: "PEB (Pre-Engineering Buildings)", desc: "Warehouses, cold storages and commercial buildings, delivered fast and robust." },
    { title: "Process Equipments", desc: "Process vessels, boilers, columns, reactors, evaporators and separators." },
    { title: "Machining Products", desc: "Manholes, flanges, pipe fittings, templates, dampers and precision components." },
    { title: "Erection & Commissioning", desc: "On-site assembly and start-up for distillery, sugar and chemical plants." },
    { title: "Civil Work", desc: "Turnkey civil construction including foundation, structural and finishing work." }
  ]
};

// Disabled problematic fetch - no dynamic content needed for hero
function populateFromBalajiProjects() {
  // Removed fetch causing "Engineering..." overlay
}

function applyFallbackContent(data) {
  document.querySelector(".hero-content h1").textContent = data.heroTitle;
  document.querySelector(".hero-content p").textContent = data.heroText;

  const grid = document.querySelector(".product-grid");
  if (grid) {
    grid.innerHTML = "";
    data.businessAreas.forEach((area) => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `
        <div class="product-photo" style="background-image: linear-gradient(135deg, #7dd5ff 0%, #4f9cff 100%);"></div>
        <h3>${area.title}</h3>
        <p>${area.desc}</p>
      `;
      grid.appendChild(card);
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo({ top: 0, left: 0 });
  populateFromBalajiProjects();

  // Counter animation for hero stats
  function animateCounters() {
    const counters = document.querySelectorAll('.hero-stat .num[data-target]');
    counters.forEach(counter => {
      const target = parseInt(counter.dataset.target);
      const rawText = counter.textContent;
      const suffix = rawText.replace(/[0-9,.\s]/g, '');
      const hadLeadingSpace = /^\s+/.test(rawText);
      let current = 0;
      const duration = 2000; // 2s
      const increment = target / (duration / 16); // ~60fps
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
counter.textContent = target.toLocaleString('en-US') + (hadLeadingSpace ? ' ' : '') + suffix;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString('en-IN') + (hadLeadingSpace ? ' ' : '') + suffix;
        }
      }, 16);
    });
  }

  // Trigger counters on page load (after 1s delay for slide anim)
  setTimeout(animateCounters, 1200);

  // Heading animation on-view (not on page load)
  const animatedHeadings = document.querySelectorAll('.bv-title, .clients-title, .newsletter .fade-heading');
  animatedHeadings.forEach((heading) => {
    if (heading.dataset.wordsPrepared === 'true') return;
    const words = heading.textContent.trim().split(/\s+/);
    heading.innerHTML = words.map((word) => `<span>${word}</span>`).join(' ');
    heading.querySelectorAll('span').forEach((span) => {
      span.style.opacity = '0';
      span.style.transform = 'translateY(10px)';
      span.style.display = 'inline-block';
      span.style.transition = 'opacity 0.58s ease, transform 0.58s ease';
    });
    heading.dataset.wordsPrepared = 'true';
  });

  const headingInViewObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const spans = entry.target.querySelectorAll('span');
      spans.forEach((span, idx) => {
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.transform = 'translateY(0)';
        }, idx * 165);
      });
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.35 });

  animatedHeadings.forEach((heading) => headingInViewObserver.observe(heading));

// Footer Social Scroll Animation (orange text trigger)
const footerShell = document.querySelector('.footer-shell');
const footerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-footer');
      footerObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

if (footerShell) {
  footerObserver.observe(footerShell);
}

// Existing reveal animation for features/products - extended to product cards
  const revealTargets = document.querySelectorAll('.features .section-subtitle, .features .feature-card, .products .section-subtitle, .products .product-card');
  revealTargets.forEach((element, idx) => {
    element.classList.add('reveal-hidden');
    element.style.transitionDelay = `${idx * 0.08}s`;
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        entry.target.classList.remove('reveal-hidden');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  revealTargets.forEach((element) => observer.observe(element));


  // New fade-heading scroll trigger
  const fadeHeadings = document.querySelectorAll('.fade-heading');
  const headingObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, idx) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade');
      }
    });
  }, { threshold: 0.3 });

  fadeHeadings.forEach(heading => headingObserver.observe(heading));

  // === GET QUOTE MODAL FUNCTIONALITY ===
  const modal = document.getElementById('quote-modal');
  const quoteForm = document.getElementById('quote-form');
  const openModalButtons = document.querySelectorAll('[data-open-modal]');
  const closeModalButton = document.querySelector('.modal-close');
  const modalOverlay = document.querySelector('.modal-overlay');
  // No file handle needed for localStorage

  // Open modal
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      const nameField = document.getElementById('full-name');
      if (nameField) nameField.focus();
    });
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    quoteForm.reset();
  };

  closeModalButton.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

  // Form validation helper
  const validateForm = (formData) => {
    const requiredFields = ['fullName', 'phone', 'email', 'requirement'];
    for (const field of requiredFields) {
      if (!formData.get(field)?.trim()) {
        return { valid: false, error: `Please fill ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}` };
      }
    }
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(formData.get('phone').replace(/\D/g, ''))) {
      return { valid: false, error: 'Please enter a valid phone number' };
    }
    return { valid: true };
  };

  // Quote form submit -> backend API
  quoteForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(quoteForm);
    const validation = validateForm(formData);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    const quoteData = {
      fullName: formData.get('fullName'),
      companyName: formData.get('companyName') || '',
      phone: formData.get('phone'),
      email: formData.get('email'),
      requirement: formData.get('requirement')
    };

    try {
      const response = await fetch('http://localhost:5000/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(quoteData)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to submit quote');
      }

      alert('✅ Quote submitted successfully!');
      closeModal();
    } catch (error) {
      console.error('Quote submit error:', error);
      alert('❌ Quote submit failed. Please try again.');
    }
  });
});



