(function(){
  function fixPaths(fragment){
    // Fix CSS link to point from page root
    var links = fragment.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(function(l){
      if (/assets\/css\/header\.css$/.test(l.getAttribute('href')) === false) {
        l.setAttribute('href','assets/css/header.css');
      }
    });
    // Fix logo path
    var logo = fragment.querySelector('.logo img');
    if (logo){
      var src = logo.getAttribute('src') || '';
      if (src.indexOf('../assets/images/') === 0) {
        logo.setAttribute('src', src.replace('../',''));
      } else if (src.indexOf('assets/images/') !== 0) {
        logo.setAttribute('src','assets/images/AINLogo-2.png');
      }
    }
  }

  function initNavToggle(root){
    var header = root.querySelector('header.site-header');
    if (!header) return;
    var btn = header.querySelector('.nav-toggle');
    var nav = header.querySelector('#site-nav');
    if (!btn || !nav) return;
    function setOpen(open){
      if(open){ nav.removeAttribute('hidden'); btn.setAttribute('aria-expanded','true'); }
      else { nav.setAttribute('hidden',''); btn.setAttribute('aria-expanded','false'); }
    }
    function initByViewport(){
      var isSmall = window.matchMedia('(max-width: 880px)').matches;
      if (isSmall) setOpen(false); else { nav.removeAttribute('hidden'); btn.setAttribute('aria-expanded','true'); }
    }
    btn.addEventListener('click', function(){ setOpen(btn.getAttribute('aria-expanded') !== 'true'); });
    window.addEventListener('resize', initByViewport);
    initByViewport();
  }

  function loadHeader(){
    var mount = document.getElementById('site-header');
    if(!mount) return;
    fetch('components/header.html', {cache:'no-cache'}).then(function(r){return r.text();}).then(function(html){
      var tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      var fragment = tpl.content;
      fixPaths(fragment);
      mount.innerHTML = '';
      mount.appendChild(fragment);
      initNavToggle(mount);
    }).catch(function(e){ console.error('Header load failed:', e); });
  }

  document.addEventListener('DOMContentLoaded', loadHeader);
})();

// header.js

document.getElementById("site-header").innerHTML = `
  <div class="container">
    <a href="/" class="logo" aria-label="Arab Innovation Network home">
      <img src="/image/AINLogo-2.png" alt="AIN" />
    </a>
    <nav class="main-nav">
      <ul>
        <li><a href="/about.html">About</a></li>
        <li><a href="/activities.html">Activities</a></li>
        <li><a href="/societies.html">Societies</a></li>
        <li><a href="/sponsorship.html">Sponsorship</a></li>
        <li><a href="/gallery.html">Gallery</a></li>
        <li><a href="/contact.html">Contact</a></li>
      </ul>
    </nav>
  </div>
`;
