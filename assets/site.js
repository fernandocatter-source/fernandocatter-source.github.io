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

  // Reveal on arrival. The hidden state lives in CSS behind (scripting:enabled),
  // so if this file never loads the page still renders complete and still.
  // Each element is unobserved after its first reveal: it is an entrance, not
  // a thing that replays every time you scroll past.
  var reveal = document.querySelectorAll(
    '.featured__intro,.see-all,.how,.contact,.group-intro,.sec,.row-2,' +
    '.chapter,.scope,.related,.foot-cta'
  );
  if (!('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(reveal, function(el){ el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    Array.prototype.forEach.call(reveal, function(el){ io.observe(el); });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-copy]'), function(btn){
    var timer;
    var status = document.getElementById(btn.getAttribute('data-status') || '');
    function done(){
      clearTimeout(timer);
      btn.setAttribute('data-done', '');
      if (status) status.textContent = btn.getAttribute('data-copied') || 'Copied';
      timer = setTimeout(function(){
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
