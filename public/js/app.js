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
  console.log('🔍 Initializing form handler...');

  var form = document.getElementById('enquiryForm');
  var success = document.getElementById('formSuccess');

  console.log('📋 Form found:', !!form);
  console.log('✅ Success element found:', !!success);

  if (form) {
    form.addEventListener('submit', function (e) {
      console.log('📤 Form submit event triggered');
      e.preventDefault();

      var ok = true;
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalBtnText = submitBtn.innerHTML;

      console.log('🔍 Validating required fields...');

      // Validate required fields
      ['f-name', 'f-email', 'f-msg'].forEach(function (id) {
        var f = document.getElementById(id);
        var isEmpty = !f.value.trim();
        var isInvalidEmail = f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value);

        if (isEmpty || isInvalidEmail) {
          console.log('❌ Field invalid:', id, '- Empty:', isEmpty, '- Bad email:', isInvalidEmail);
          f.style.borderColor = '#8B0000'; // Red color
          ok = false;
        } else {
          console.log('✅ Field valid:', id);
          f.style.borderColor = '';
        }
      });

      if (!ok) {
        console.log('❌ Validation failed - please fill all required fields');
        alert('Please fill all required fields with valid data');
        return;
      }

      console.log('✅ Validation passed');

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

      console.log('📨 Sending form data:', formData);

      // Send to backend API
      fetch('/api/enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(function (response) {
        console.log('📨 Response received, status:', response.status);
        if (!response.ok) {
          throw new Error('Server returned status ' + response.status);
        }
        return response.json();
      })
      .then(function (data) {
        console.log('✅ Server response:', data);
        if (data.success) {
          console.log('🎉 Form submitted successfully!');
          console.log('📧 Check email and WhatsApp for notification');

          // Hide form and show success message
          form.style.display = 'none';
          if (success) {
            success.style.display = 'block';
            success.classList.add('show');
          }

          // Reset form for future use
          form.reset();

          // Optional: Scroll to success message
          setTimeout(function() {
            success.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      })
      .catch(function (error) {
        console.error('❌ Error:', error);
        console.error('Error message:', error.message);

        var errorMsg = 'Error submitting form: ' + error.message + '\n\nPlease check your internet connection and try again.';
        alert(errorMsg);

        // Reset button state
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      });
    });
  } else {
    console.warn('⚠️ Enquiry form not found on this page');
  }
})();
