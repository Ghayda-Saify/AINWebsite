(function(){
  function fixPaths(fragment){
    var links = fragment.querySelectorAll('link[rel="stylesheet"]');
    links.forEach(function(l){
      if (/assets\/css\/footer\.css$/.test(l.getAttribute('href')) === false) {
        l.setAttribute('href','assets/css/footer.css');
      }
    });
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

  function enhance(fragment){
    var y = fragment.getElementById ? fragment.getElementById('year') : null;
    if (!y) y = document.getElementById('year');
    if (y) { y.textContent = new Date().getFullYear(); }
  }

  function loadFooter(){
    var mount = document.getElementById('site-footer');
    if(!mount) return;
    fetch('components/footer.html', {cache:'no-cache'}).then(function(r){return r.text();}).then(function(html){
      var tpl = document.createElement('template');
      tpl.innerHTML = html.trim();
      var fragment = tpl.content;
      fixPaths(fragment);
      // Extract the footer content and mount into existing footer element
      var footerEl = fragment.querySelector('footer.site-footer');
      if (footerEl){
        // ensure mount has the required class for sticky behavior
        if (!mount.classList.contains('site-footer')) {
          mount.classList.add('site-footer');
        }
        mount.innerHTML = footerEl.innerHTML;
      } else {
        mount.innerHTML = '';
        mount.appendChild(fragment);
      }
      enhance(document);
    }).catch(function(e){ console.error('Footer load failed:', e); });
  }

  document.addEventListener('DOMContentLoaded', loadFooter);
})();
