/* Rhonda's Lil' Store — theme JS */
(function () {
  'use strict';

  /* Mobile menu toggle */
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest('[data-menu-toggle]');
    if (toggle) {
      var nav = document.querySelector('[data-site-nav]');
      if (nav) {
        var open = nav.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      }
    }
  });

  /* Product gallery thumbnails */
  document.addEventListener('click', function (e) {
    var thumb = e.target.closest('[data-thumb]');
    if (!thumb) return;
    var gallery = thumb.closest('[data-gallery]');
    var main = gallery && gallery.querySelector('[data-main-image]');
    if (main) {
      main.src = thumb.getAttribute('data-src');
      main.srcset = '';
      gallery.querySelectorAll('[data-thumb]').forEach(function (b) {
        b.classList.toggle('is-active', b === thumb);
      });
    }
  });

  /* Variant selection -> update price, availability, hidden id input */
  document.querySelectorAll('[data-product-form]').forEach(function (wrapper) {
    var dataEl = wrapper.querySelector('[data-product-json]');
    if (!dataEl) return;
    var product;
    try { product = JSON.parse(dataEl.textContent); } catch (err) { return; }

    var selects = wrapper.querySelectorAll('[data-option-select]');
    var idInput = wrapper.querySelector('input[name="id"]');
    var priceEl = wrapper.querySelector('[data-price]');
    var comparePriceEl = wrapper.querySelector('[data-compare-price]');
    var addBtn = wrapper.querySelector('[data-add-to-cart]');

    function formatMoney(cents) {
      return '$' + (cents / 100).toFixed(2);
    }

    function currentVariant() {
      var chosen = Array.prototype.map.call(selects, function (s) { return s.value; });
      return product.variants.find(function (v) {
        return v.options.every(function (opt, i) { return opt === chosen[i]; });
      });
    }

    function update() {
      var variant = currentVariant();
      if (!variant) {
        if (addBtn) { addBtn.disabled = true; addBtn.textContent = addBtn.getAttribute('data-text-unavailable') || 'Unavailable'; }
        return;
      }
      if (idInput) idInput.value = variant.id;
      if (priceEl) priceEl.textContent = formatMoney(variant.price);
      if (comparePriceEl) {
        if (variant.compare_at_price && variant.compare_at_price > variant.price) {
          comparePriceEl.textContent = formatMoney(variant.compare_at_price);
          comparePriceEl.hidden = false;
        } else {
          comparePriceEl.hidden = true;
        }
      }
      if (addBtn) {
        if (variant.available) {
          addBtn.disabled = false;
          addBtn.textContent = addBtn.getAttribute('data-text-add') || 'Add to cart';
        } else {
          addBtn.disabled = true;
          addBtn.textContent = addBtn.getAttribute('data-text-soldout') || 'Sold out';
        }
      }
      if (variant.featured_image) {
        var main = wrapper.closest('.product-page');
        var mainImg = main && main.querySelector('[data-main-image]');
        if (mainImg) { mainImg.src = variant.featured_image.src; mainImg.srcset = ''; }
      }
    }

    selects.forEach(function (s) { s.addEventListener('change', update); });
    update();
  });

  /* Collection sort */
  var sortSelect = document.querySelector('[data-sort-by]');
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      var url = new URL(window.location.href);
      url.searchParams.set('sort_by', this.value);
      window.location.href = url.toString();
    });
  }
})();
