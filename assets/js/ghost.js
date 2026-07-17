/* Ghost parallax (§3.4) — translateY only, GPU-composited, reduced-motion safe.
   Each .ghost / .gmark drifts at data-par (0.10–0.16). No scroll-jacking. */
(function () {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var ghosts = Array.prototype.slice.call(document.querySelectorAll('.ghost,.gmark'));
  if (!ghosts.length) return;
  var tick = false;
  function move() {
    var vh = window.innerHeight;
    for (var i = 0; i < ghosts.length; i++) {
      var g = ghosts[i], r = g.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) continue;
      var p = (vh - r.top) / (vh + r.height);
      var par = parseFloat(g.getAttribute('data-par')) || 0.12;
      g.style.transform = 'translate3d(0,' + ((p - 0.5) * 100 * par * -1).toFixed(1) + 'px,0)';
    }
    tick = false;
  }
  window.addEventListener('scroll', function () {
    if (!tick) { requestAnimationFrame(move); tick = true; }
  }, { passive: true });
  window.addEventListener('resize', move, { passive: true });
  move();
})();
