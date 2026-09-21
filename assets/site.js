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
})();
