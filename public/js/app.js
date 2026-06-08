/* Elevating Nations — interactions */
(function () {
  'use strict';

  // ---- Hero headline render (supports *italic* accent, shared with Tweaks) ----
  window.EN = window.EN || {};
  window.EN.DEFAULT_HEADLINE = 'Safe homes. Real support. *Fresh starts.*';
  window.EN.renderHeadline = function (str) {
    var el = document.getElementById('heroHeadline');
    if (!el) return;
    var html = String(str || '')
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/\.\s+/g, '.<br>'); /* stack sentences onto their own lines */
    el.innerHTML = html;
  };
  window.EN.renderHeadline(window.EN.DEFAULT_HEADLINE);

  // ---- Sticky nav state ----
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 20) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  var menu = document.getElementById('mobileMenu');
  var toggle = document.getElementById('navToggle');
  var close = document.getElementById('mobileClose');
  function setMenu(open) {
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  }
  if (toggle) toggle.addEventListener('click', function () { setMenu(true); });
  if (close) close.addEventListener('click', function () { setMenu(false); });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  // ---- Reveal handled by pure CSS animation (no JS dependency) ----

  // ---- Enquiry form ----
  var form = document.getElementById('enquiryForm');
  var success = document.getElementById('formSuccess');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var ok = true;
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.innerHTML;

      ['f-name', 'f-email', 'f-msg'].forEach(function (id) {
        var f = document.getElementById(id);
        if (!f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value))) {
          f.style.borderColor = 'var(--accent-deep)';
          ok = false;
        } else {
          f.style.borderColor = '';
        }
      });
      if (!ok) return;

      // Disable button and show loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Prepare form data
      var formData = {
        name: document.getElementById('f-name').value.trim(),
        email: document.getElementById('f-email').value.trim(),
        org: document.getElementById('f-org').value.trim(),
        phone: document.getElementById('f-phone').value.trim(),
        type: document.getElementById('f-type').value.trim(),
        message: document.getElementById('f-msg').value.trim()
      };

      // Send to backend API
      fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(function (response) {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(function (data) {
        if (data.success) {
          form.style.display = 'none';
          success.classList.add('show');
          // Reset form for future use
          form.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
        alert('Error submitting form. Please try again or email us directly.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    });
  }
})();
