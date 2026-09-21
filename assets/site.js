(function(){
  var body = document.body;
  var burger = document.querySelector('[data-menu-open]');
  function open(){ body.classList.add('menu-open'); if(burger) burger.setAttribute('aria-expanded','true');
    var f = document.querySelector('.panel__close'); if (f) f.focus(); }
  function close(){ body.classList.remove('menu-open'); if(burger){ burger.setAttribute('aria-expanded','false'); burger.focus(); } }
  if (burger) burger.addEventListener('click', open);
  Array.prototype.forEach.call(document.querySelectorAll('[data-menu-close]'), function(el){
    el.addEventListener('click', close);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && body.classList.contains('menu-open')) close();
  });
  Array.prototype.forEach.call(document.querySelectorAll('.cover__art img'), function(img){
    img.addEventListener('error', function(){ if(img.parentNode) img.parentNode.style.display = 'none'; });
  });

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function(btn){
    var label = btn.textContent, timer;
    var status = document.getElementById(btn.getAttribute('data-status') || '');
    function done(){
      clearTimeout(timer);
      btn.textContent = 'Copied';
      btn.setAttribute('data-done', '');
      if (status) status.textContent = btn.getAttribute('data-copied') || 'Copied';
      timer = setTimeout(function(){
        btn.textContent = label;
        btn.removeAttribute('data-done');
        if (status) status.textContent = '';
      }, 2200);
    }
    function legacy(){
      var ta = document.createElement('textarea');
      ta.value = btn.getAttribute('data-copy');
      ta.setAttribute('readonly', '');
      ta.style.position = 'absolute'; ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      try { if (document.execCommand('copy')) done(); } catch (e) {}
      document.body.removeChild(ta);
    }
    btn.addEventListener('click', function(){
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(btn.getAttribute('data-copy')).then(done, legacy);
      } else { legacy(); }
    });
  });
})();
