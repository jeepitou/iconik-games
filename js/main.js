/**
 * Main JavaScript for Iconik Games Website
 * Handles UI interactions and language toggle
 */

// Wait for DOM and i18n to be ready
document.addEventListener('DOMContentLoaded', () => {
  initLanguageToggle();
  initMobileMenu();
  initScrollEffects();
  initSmoothScroll();
});

/**
 * Initialize language toggle functionality
 */
function initLanguageToggle() {
  const langToggle = document.getElementById('langToggle');
  if (!langToggle) return;

  const langOptions = langToggle.querySelectorAll('.lang-option');

  // Set initial active state based on current language
  const updateActiveState = (lang) => {
    langOptions.forEach(option => {
      if (option.dataset.lang === lang) {
        option.classList.add('active');
      } else {
        option.classList.remove('active');
      }
    });
  };

  // Update on page load
  if (window.i18n) {
    updateActiveState(window.i18n.getCurrentLanguage());
  }

  // Handle language option clicks
  langOptions.forEach(option => {
    option.addEventListener('click', async () => {
      const lang = option.dataset.lang;

      if (window.i18n && window.i18n.getCurrentLanguage() !== lang) {
        await window.i18n.changeLanguage(lang);
        updateActiveState(lang);
      }
    });
  });

  // Listen for language changes from other sources
  window.addEventListener('languageChanged', (e) => {
    updateActiveState(e.detail.lang);
  });
}

/**
 * Initialize mobile menu toggle
 */
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const navMenu = document.querySelector('.nav-menu');

  if (!mobileMenuToggle || !navMenu) return;

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Close menu when clicking on a nav link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });
}

/**
 * Initialize scroll effects (navbar background, scroll indicator)
 */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  if (!navbar) return;

  // Check if user has scrolled before
  const hasScrolled = localStorage.getItem('hasScrolled') === 'true';

  // Hide scroll indicator permanently if user has already scrolled
  if (hasScrolled && scrollIndicator) {
    scrollIndicator.style.display = 'none';
  }

  window.addEventListener('scroll', () => {
    // Add background to navbar when scrolled
    if (window.scrollY > 100) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Hide scroll indicator after scrolling and save to localStorage
    if (scrollIndicator && window.scrollY > 200 && !hasScrolled) {
      scrollIndicator.style.opacity = '0';
      // Wait for fade animation to complete, then hide permanently
      setTimeout(() => {
        scrollIndicator.style.display = 'none';
        localStorage.setItem('hasScrolled', 'true');
      }, 500);
    }
  });
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Skip if it's just "#"
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const navbarHeight = document.querySelector('.navbar')?.offsetHeight || 0;
        const targetPosition = target.offsetTop - navbarHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Intersection Observer for fade-in animations
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.feature-card, .guild-card, .gameplay-card, .team-member');
  animatedElements.forEach(el => observer.observe(el));
});
