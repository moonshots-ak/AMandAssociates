/* =============================================================
   AMA — Akshay Maheshwari & Associates
   main.js  |  Core JavaScript
   ============================================================= */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------------
       1. Active Nav Link
    --------------------------------------------------------- */
    var page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar-ama .nav-link').forEach(function (link) {
      var href = link.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        link.classList.add('active-page');
      }
    });

    /* ---------------------------------------------------------
       2. Navbar scroll shadow
    --------------------------------------------------------- */
    var navbar = document.querySelector('.navbar-ama');
    if (navbar) {
      function updateNavbar() {
        navbar.classList.toggle('scrolled', window.scrollY > 20);
      }
      window.addEventListener('scroll', updateNavbar, { passive: true });
      updateNavbar();
    }

    /* ---------------------------------------------------------
       3. Scroll-to-top button
    --------------------------------------------------------- */
    var scrollBtn = document.getElementById('scrollTop');
    if (scrollBtn) {
      window.addEventListener('scroll', function () {
        scrollBtn.classList.toggle('visible', window.scrollY > 450);
      }, { passive: true });
      scrollBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* ---------------------------------------------------------
       4. Stats counter (IntersectionObserver)
    --------------------------------------------------------- */
    var counters = document.querySelectorAll('[data-count]');
    if (counters.length && 'IntersectionObserver' in window) {
      var countObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { countObserver.observe(el); });
    }

    function animateCount(el) {
      var target   = parseInt(el.getAttribute('data-count'), 10);
      var suffix   = el.getAttribute('data-suffix') || '';
      var duration = 1800;
      var frameMs  = 16;
      var steps    = duration / frameMs;
      var increment = target / steps;
      var current  = 0;

      var timer = setInterval(function () {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, frameMs);
    }

    /* ---------------------------------------------------------
       5. Fade-up on scroll
    --------------------------------------------------------- */
    var fadeEls = document.querySelectorAll('.fade-up');
    if (fadeEls.length && 'IntersectionObserver' in window) {
      var fadeObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      fadeEls.forEach(function (el) { fadeObserver.observe(el); });
    } else {
      /* Fallback: show all immediately if observer not supported */
      fadeEls.forEach(function (el) { el.classList.add('visible'); });
    }

    /* ---------------------------------------------------------
       6. Contact form — client-side validation feedback
    --------------------------------------------------------- */
    var contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        /* Formspree handles submission; just give feedback */
        var btn = contactForm.querySelector('[type="submit"]');
        if (btn) {
          btn.textContent = 'Sending…';
          btn.disabled = true;
        }
      });
    }

  });

})();
