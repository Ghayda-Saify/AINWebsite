(function () {
  function initNavToggle(scope) {
    var header = (scope && scope.querySelector) ? scope.querySelector('header.site-header') : document.querySelector('header.site-header');
    if (!header) return;
    var btn = header.querySelector('.nav-toggle');
    var nav = header.querySelector('#site-nav');
    if (!btn || !nav) return;

    function setOpen(open) {
      if (open) {
        nav.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      } else {
        nav.setAttribute('hidden', '');
        btn.setAttribute('aria-expanded', 'false');
      }
    }

    function initByViewport() {
      var isSmall = window.matchMedia('(max-width: 880px)').matches;
      if (isSmall) {
        setOpen(false);
      } else {
        nav.removeAttribute('hidden');
        btn.setAttribute('aria-expanded', 'true');
      }
    }

    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      setOpen(!open);
    });
    window.addEventListener('resize', initByViewport);
    initByViewport();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    var y = document.getElementById('year');
    if (y) { y.textContent = new Date().getFullYear(); }
  });

  window.AIN = window.AIN || {};
  window.AIN.initNavToggle = initNavToggle;
})();


