/* =============================================================
   AMA — Akshay Maheshwari & Associates
   gallery.js  |  Gallery Rendering & Lightbox
   ============================================================= */

(function () {
  'use strict';

  var currentIndex = 0;
  var activeImages = [];
  var renderToken = 0;

  /* ---------------------------------------------------------
     Build gallery grid from galleryImages (gallery-data.js)
  --------------------------------------------------------- */
  function renderGallery(filter) {
    var grid = document.getElementById('galleryGrid');
    var filtersWrap = document.getElementById('galleryFilters');
    if (!grid || typeof galleryImages === 'undefined') return;

    filter = filter || 'all';
    var selectedImages = filter === 'all'
      ? galleryImages
      : galleryImages.filter(function (img) { return img.category === filter; });
    var token = ++renderToken;

    if (!Array.isArray(selectedImages) || selectedImages.length === 0) {
      activeImages = [];
      grid.innerHTML = '';
      if (filtersWrap) filtersWrap.style.display = 'none';
      return;
    }

    if (filtersWrap) filtersWrap.style.display = '';

    var loadedImages = [];
    var pending = selectedImages.length;

    function finalizeRender() {
      if (token !== renderToken) return;
      activeImages = loadedImages;

      if (activeImages.length === 0) {
        grid.innerHTML = '';
        if (filtersWrap) filtersWrap.style.display = 'none';
        return;
      }

      grid.innerHTML = activeImages.map(function (item, idx) {
        return (
          '<div class="gallery-item fade-up" data-idx="' + idx + '" role="button" ' +
               'aria-label="View ' + escHtml(item.caption || 'photo') + '" tabindex="0">' +
            '<img src="assets/gallery/' + escHtml(item.file) + '" ' +
                 'alt="' + escHtml(item.caption || 'Gallery photo') + '" loading="lazy">' +
            '<div class="gallery-overlay">' +
              '<i class="fas fa-expand-alt gallery-zoom"></i>' +
              '<span class="g-caption">' + escHtml(item.caption || '') + '</span>' +
            '</div>' +
          '</div>'
        );
      }).join('');

      /* Attach events */
      grid.querySelectorAll('.gallery-item').forEach(function (el) {
        el.addEventListener('click', function () {
          openLightbox(parseInt(this.getAttribute('data-idx'), 10));
        });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openLightbox(parseInt(this.getAttribute('data-idx'), 10));
          }
        });
      });

      /* Re-trigger fade-up observer on new elements */
      if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
          });
        }, { threshold: 0.1 });
        grid.querySelectorAll('.fade-up').forEach(function (el) { obs.observe(el); });
      } else {
        grid.querySelectorAll('.fade-up').forEach(function (el) { el.classList.add('visible'); });
      }
    }

    selectedImages.forEach(function (item) {
      var probe = new Image();
      probe.onload = function () {
        if (token !== renderToken) return;
        loadedImages.push(item);
        pending -= 1;
        if (pending === 0) finalizeRender();
      };
      probe.onerror = function () {
        if (token !== renderToken) return;
        pending -= 1;
        if (pending === 0) finalizeRender();
      };
      probe.src = 'assets/gallery/' + item.file;
    });
  }

  /* ---------------------------------------------------------
     Lightbox
  --------------------------------------------------------- */
  function openLightbox(index) {
    var overlay = document.getElementById('lightboxOverlay');
    if (!overlay || activeImages.length === 0) return;
    currentIndex = (index + activeImages.length) % activeImages.length;
    updateLightboxImage();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    var overlay = document.getElementById('lightboxOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function updateLightboxImage() {
    var img     = document.getElementById('lbImg');
    var caption = document.getElementById('lbCaption');
    var counter = document.getElementById('lbCounter');
    if (!img) return;
    var item = activeImages[currentIndex];
    img.src = 'assets/gallery/' + item.file;
    img.alt = item.caption || '';
    if (caption) caption.textContent = item.caption || '';
    if (counter) counter.textContent = (currentIndex + 1) + ' / ' + activeImages.length;
  }

  /* ---------------------------------------------------------
     Filter buttons
  --------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    renderGallery('all');

    /* Filter click */
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.filter-btn').forEach(function (b) { b.classList.remove('active'); });
        this.classList.add('active');
        renderGallery(this.getAttribute('data-filter'));
      });
    });

    /* Lightbox nav */
    var lbPrev = document.getElementById('lbPrev');
    var lbNext = document.getElementById('lbNext');
    var lbClose = document.getElementById('lbClose');
    var overlay = document.getElementById('lightboxOverlay');

    if (lbPrev) lbPrev.addEventListener('click', function () {
      currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length;
      updateLightboxImage();
    });
    if (lbNext) lbNext.addEventListener('click', function () {
      currentIndex = (currentIndex + 1) % activeImages.length;
      updateLightboxImage();
    });
    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (overlay) overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeLightbox();
    });

    /* Keyboard */
    document.addEventListener('keydown', function (e) {
      var o = document.getElementById('lightboxOverlay');
      if (!o || !o.classList.contains('active')) return;
      if (e.key === 'Escape')     closeLightbox();
      if (e.key === 'ArrowLeft')  { currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length; updateLightboxImage(); }
      if (e.key === 'ArrowRight') { currentIndex = (currentIndex + 1) % activeImages.length; updateLightboxImage(); }
    });
  });

  /* ---------------------------------------------------------
     Helper: escape HTML to prevent XSS
  --------------------------------------------------------- */
  function escHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

})();
