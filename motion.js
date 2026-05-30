/* ── TETHER CONNECT · MOTION LAYER ──────────────────────────────────────
   Scroll reveal · mouse tilt · interactive particle network.
   All effects are additive, opt-in via data-attributes, and respect
   prefers-reduced-motion. No copy, color, or font changes.
   ─────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── 1 · Scroll reveal ───────────────────────────────────────────── */
  function initReveal() {
    var els = document.querySelectorAll('[data-reveal], [data-reveal-group]');
    if (!els.length) return;
    if (REDUCE || !('IntersectionObserver' in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add('is-visible');
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        var en = entries[i];
        if (en.isIntersecting) {
          en.target.classList.add('is-visible');
          io.unobserve(en.target);
        }
      }
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    for (var j = 0; j < els.length; j++) io.observe(els[j]);
  }

  /* ─── 2 · Mouse tilt / parallax ────────────────────────────────────── */
  function initTilt() {
    if (REDUCE) return;
    var els = document.querySelectorAll('[data-tilt]');
    if (!els.length) return;
    // Skip on touch / coarse pointers
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    els.forEach(function (el) {
      var raf = null;
      var max = parseFloat(el.getAttribute('data-tilt-max') || '5');
      var glare = el.querySelector('[data-tilt-glare]');

      function onMove(e) {
        var r = el.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
        var dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(function () {
          el.style.transform =
            'perspective(1400px) rotateX(' + (-dy * max).toFixed(2) +
            'deg) rotateY(' + (dx * max).toFixed(2) +
            'deg) translate3d(0,' + (-dy * 4).toFixed(2) + 'px, 0)';
          if (glare) {
            glare.style.opacity = '1';
            glare.style.transform =
              'translate3d(' + (dx * 30).toFixed(1) + '%, ' +
              (dy * 30).toFixed(1) + '%, 0)';
          }
        });
      }
      function onEnter() {
        el.style.transition = 'transform 120ms linear';
      }
      function onLeave() {
        el.style.transition = 'transform 600ms cubic-bezier(.2,.7,.2,1)';
        el.style.transform = '';
        if (glare) { glare.style.opacity = '0'; glare.style.transform = ''; }
      }
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mousemove', onMove);
      el.addEventListener('mouseleave', onLeave);
    });
  }

  /* ─── 3 · Particle network background ──────────────────────────────── */
  function initParticles() {
    if (REDUCE) return;
    var canvases = document.querySelectorAll('canvas[data-particles]');
    if (!canvases.length) return;

    canvases.forEach(function (canvas) {
      var ctx = canvas.getContext && canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      // brand palette (rgba components) — never recolored from theme
      var NODE = '154, 144, 136';   // border-dk
      var LINK = '154, 144, 136';
      var ACCENT = '200, 0, 30';    // brand red

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = 0, H = 0;
      var nodes = [];
      var mouse = { x: -9999, y: -9999, in: false };
      var running = false;
      var rafId = null;

      function size() {
        var r = canvas.getBoundingClientRect();
        W = r.width; H = r.height;
        canvas.width = Math.max(1, Math.floor(W * dpr));
        canvas.height = Math.max(1, Math.floor(H * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }
      function seed() {
        var density = parseFloat(canvas.getAttribute('data-density') || '14000');
        var target = Math.min(90, Math.max(24, Math.floor((W * H) / density)));
        nodes = [];
        for (var i = 0; i < target; i++) {
          nodes.push({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.20,
            vy: (Math.random() - 0.5) * 0.20,
            r: 1.0 + Math.random() * 0.9,
            a: 0.30 + Math.random() * 0.25
          });
        }
      }
      function frame() {
        if (!running) { rafId = null; return; }
        ctx.clearRect(0, 0, W, H);
        var linkDist = 130;

        // node-to-node links
        for (var i = 0; i < nodes.length; i++) {
          var a = nodes[i];
          for (var j = i + 1; j < nodes.length; j++) {
            var b = nodes[j];
            var dx = a.x - b.x, dy = a.y - b.y;
            var d = Math.sqrt(dx * dx + dy * dy);
            if (d < linkDist) {
              var al = (1 - d / linkDist) * 0.16;
              ctx.strokeStyle = 'rgba(' + LINK + ',' + al + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }

        // mouse links (red accent, gentle pull)
        if (mouse.in) {
          var mRadius = 170;
          for (var k = 0; k < nodes.length; k++) {
            var n = nodes[k];
            var mx = n.x - mouse.x, my = n.y - mouse.y;
            var md = Math.sqrt(mx * mx + my * my);
            if (md < mRadius) {
              var ma = (1 - md / mRadius) * 0.42;
              ctx.strokeStyle = 'rgba(' + ACCENT + ',' + ma + ')';
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.stroke();
              // gentle attraction
              var pull = 0.0009 * (1 - md / mRadius);
              n.vx += -mx * pull;
              n.vy += -my * pull;
            }
          }
        }

        // nodes
        for (var p = 0; p < nodes.length; p++) {
          var nd = nodes[p];
          nd.x += nd.vx;
          nd.y += nd.vy;
          nd.vx *= 0.985; nd.vy *= 0.985;
          // small organic drift
          if (Math.abs(nd.vx) < 0.04) nd.vx += (Math.random() - 0.5) * 0.02;
          if (Math.abs(nd.vy) < 0.04) nd.vy += (Math.random() - 0.5) * 0.02;
          // soft bounds
          if (nd.x < 0) { nd.x = 0; nd.vx *= -1; }
          if (nd.x > W) { nd.x = W; nd.vx *= -1; }
          if (nd.y < 0) { nd.y = 0; nd.vy *= -1; }
          if (nd.y > H) { nd.y = H; nd.vy *= -1; }
          ctx.fillStyle = 'rgba(' + NODE + ',' + nd.a + ')';
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, nd.r, 0, Math.PI * 2);
          ctx.fill();
        }

        rafId = requestAnimationFrame(frame);
      }

      function start() {
        if (running) return;
        running = true;
        if (!rafId) rafId = requestAnimationFrame(frame);
      }
      function stop() { running = false; }

      function onMove(e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.in = mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H;
      }
      function onLeave() { mouse.in = false; }

      size(); seed();
      window.addEventListener('resize', function () {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        size(); seed();
      });
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseout', onLeave);

      // Only animate when the canvas is in the viewport
      if ('IntersectionObserver' in window) {
        var visIo = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
        }, { threshold: 0 });
        visIo.observe(canvas);
      } else {
        start();
      }
      // Pause when tab is hidden
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
    });
  }

  function boot() {
    initReveal();
    initTilt();
    initParticles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
