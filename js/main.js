(function () {
  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  if (menuToggle && mobileMenu) {
    var iconOpen = menuToggle.querySelector('.menu-toggle-icon-open');
    var iconClose = menuToggle.querySelector('.menu-toggle-icon-close');
    function setMenuIcons(menuIsOpen) {
      if (iconOpen) iconOpen.classList.toggle('hidden', menuIsOpen);
      if (iconClose) iconClose.classList.toggle('hidden', !menuIsOpen);
      menuToggle.setAttribute('aria-label', menuIsOpen ? 'إغلاق القائمة' : 'فتح القائمة');
    }
    menuToggle.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('hidden') === false;
      mobileMenu.hidden = !open;
      menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      setMenuIcons(open);
    });
    mobileMenu.querySelectorAll('a.mobile-nav').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.add('hidden');
        mobileMenu.hidden = true;
        menuToggle.setAttribute('aria-expanded', 'false');
        setMenuIcons(false);
      });
    });
  }

  document.querySelectorAll('.faq-trigger').forEach(function (btn) {
    var panelId = btn.getAttribute('aria-controls');
    var panel = panelId ? document.getElementById(panelId) : null;
    var item = btn.closest('.faq-item');
    if (!panel || !item) return;

    function setOpen(open) {
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.hidden = !open;
      item.classList.toggle('is-open', open);
    }

    btn.addEventListener('click', function () {
      var willOpen = btn.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.faq-item').forEach(function (other) {
        if (other === item) return;
        var ob = other.querySelector('.faq-trigger');
        var op = ob && ob.getAttribute('aria-controls') ? document.getElementById(ob.getAttribute('aria-controls')) : null;
        if (ob && op) {
          ob.setAttribute('aria-expanded', 'false');
          op.hidden = true;
          other.classList.remove('is-open');
        }
      });
      setOpen(willOpen);
    });
  });

  var sections = ['home', 'products', 'rewards', 'faq'];
  var navLinks = document.querySelectorAll('.nav-link');
  function updateActiveNav() {
    var y = window.scrollY + 120;
    var current = 'home';
    sections.forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.offsetTop <= y) current = id;
    });
    navLinks.forEach(function (a) {
      var sec = a.getAttribute('data-section');
      var active = sec === current;
      if (active) {
        a.classList.add('text-[#FFC107]', 'font-bold', 'border-[#FFC107]');
        a.classList.remove('text-[#FFE4AF]/70', 'font-medium', 'border-transparent');
      } else {
        a.classList.remove('text-[#FFC107]', 'font-bold', 'border-[#FFC107]');
        a.classList.add('text-[#FFE4AF]/70', 'font-medium', 'border-transparent');
      }
    });
  }
  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();
})();
