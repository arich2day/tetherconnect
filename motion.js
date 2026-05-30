/* ── TETHER CONNECT · MOTION LAYER ──────────────────────────────────────
   Scroll reveal · mouse tilt · flowing wave canvas · aurora drift · counters
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
      function onEnter() { el.style.transition = 'transform 120ms linear'; }
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

  /* ─── 3 · Flowing wave field + aurora layer ───────────────────────── */
  function injectAurora(canvas) {
    var parent = canvas.parentNode;
    if (!parent || parent.querySelector('.aurora-layer')) return;
    var aurora = document.createElement('div');
    aurora.className = 'aurora-layer';
    aurora.setAttribute('aria-hidden', 'true');
    aurora.innerHTML =
      '<div class="aurora-blob a"></div>' +
      '<div class="aurora-blob b"></div>' +
      '<div class="aurora-blob c"></div>' +
      '<div class="aurora-grain"></div>';
    parent.insertBefore(aurora, canvas);
  }

  function initWaves() {
    var canvases = document.querySelectorAll('canvas[data-waves]');
    if (!canvases.length) return;

    canvases.forEach(function (canvas) {
      injectAurora(canvas);
      if (REDUCE) return;

      var ctx = canvas.getContext && canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      // Brand palette wave bands
      var WAVES = [
        { amp: 22, freq: 0.0068, speed: 0.012, yPct: 0.30, color: '154,144,136', alpha: 0.22, lw: 1.1, phase: 0.0, harm: 1.7 },
        { amp: 36, freq: 0.0050, speed: 0.008, yPct: 0.50, color: '154,144,136', alpha: 0.18, lw: 1.4, phase: 1.4, harm: 1.3 },
        { amp: 28, freq: 0.0075, speed: 0.014, yPct: 0.68, color: '200,0,30',    alpha: 0.20, lw: 1.0, phase: 2.6, harm: 1.9 },
        { amp: 50, freq: 0.0038, speed: 0.006, yPct: 0.86, color: '108,98,89',   alpha: 0.13, lw: 1.6, phase: 0.7, harm: 1.1 }
      ];

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var W = 0, H = 0;
      var t = 0;
      var mouse = { x: -9999, y: -9999, active: false };
      var running = false, rafId = null;

      function size() {
        var r = canvas.getBoundingClientRect();
        W = r.width; H = r.height;
        canvas.width = Math.max(1, Math.floor(W * dpr));
        canvas.height = Math.max(1, Math.floor(H * dpr));
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function draw() {
        if (!running) { rafId = null; return; }
        ctx.clearRect(0, 0, W, H);

        for (var w = 0; w < WAVES.length; w++) {
          var def = WAVES[w];
          ctx.strokeStyle = 'rgba(' + def.color + ',' + def.alpha + ')';
          ctx.lineWidth = def.lw;
          ctx.beginPath();
          var baseY = H * def.yPct;
          var step = 5;
          for (var x = 0; x <= W; x += step) {
            var arg = x * def.freq + t * def.speed + def.phase;
            // Local mouse deformation — gentle upward pull
            var dent = 0;
            if (mouse.active) {
              var dx = x - mouse.x;
              var dy = baseY - mouse.y;
              var d = Math.sqrt(dx * dx + dy * dy);
              if (d < 220) dent = -((1 - d / 220) * 26);
            }
            var y = baseY
                  + Math.sin(arg) * def.amp
                  + Math.sin(arg * def.harm) * def.amp * 0.28
                  + dent;
            if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }

        // Mouse glow — soft red halo where the cursor hovers
        if (mouse.active) {
          var grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 70);
          grad.addColorStop(0, 'rgba(200,0,30,0.22)');
          grad.addColorStop(0.6, 'rgba(200,0,30,0.05)');
          grad.addColorStop(1, 'rgba(200,0,30,0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 70, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = 'rgba(200,0,30,0.55)';
          ctx.beginPath();
          ctx.arc(mouse.x, mouse.y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }

        t += 1;
        rafId = requestAnimationFrame(draw);
      }

      function start() {
        if (running) return;
        running = true;
        if (!rafId) rafId = requestAnimationFrame(draw);
      }
      function stop() { running = false; }

      function onMove(e) {
        var r = canvas.getBoundingClientRect();
        mouse.x = e.clientX - r.left;
        mouse.y = e.clientY - r.top;
        mouse.active = mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H;
      }
      function onOut() { mouse.active = false; }

      size();
      window.addEventListener('resize', function () {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        size();
      });
      window.addEventListener('mousemove', onMove, { passive: true });
      window.addEventListener('mouseout', onOut);

      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { en.isIntersecting ? start() : stop(); });
        }, { threshold: 0 });
        io.observe(canvas);
      } else {
        start();
      }
      document.addEventListener('visibilitychange', function () {
        if (document.hidden) stop(); else start();
      });
    });
  }

  /* ─── 4 · Number counter ──────────────────────────────────────────── */
  function initCounters() {
    var els = document.querySelectorAll('[data-counter]');
    if (!els.length) return;
    if (REDUCE || !('IntersectionObserver' in window)) {
      els.forEach(function (el) {
        el.textContent = el.getAttribute('data-counter');
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var to = parseFloat(el.getAttribute('data-counter')) || 0;
        var dur = parseInt(el.getAttribute('data-counter-dur') || '1400', 10);
        var start = performance.now();
        function step(now) {
          var p = Math.min(1, (now - start) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(to * eased);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(function (el) { io.observe(el); });
  }

  function boot() {
    initReveal();
    initTilt();
    initWaves();
    initCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
