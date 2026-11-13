// Keeps the header social icons the same colour as the menu links,
// including when the header changes colour on scroll.
(function () {
  var socials = document.querySelector('.vo-socials');
  if (!socials) return;
  function sync() {
    var link = document.querySelector('header .navigation-item:not(.navigation-selected)') ||
      document.querySelector('header .navigation-mobile-icon');
    if (!link) return;
    var style = getComputedStyle(link);
    socials.style.setProperty('--vo-social-color', link.matches('svg') ? style.fill : style.color);
  }
  var queued = false;
  function onChange() {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; sync(); });
  }
  sync();
  window.addEventListener('load', sync);
  window.addEventListener('scroll', onChange, { passive: true });
  window.addEventListener('resize', onChange);
})();
