/* Orison Project — interactions */
(function () {
  var doc = document.documentElement;
  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- sticky nav ---- */
  var nav = document.querySelector('.nav');
  function onScroll() { if (nav) nav.classList.toggle('solid', window.scrollY > 16); }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- mobile drawer ---- */
  var burger = document.querySelector('.burger');
  var drawer = document.querySelector('.drawer');
  if (burger && drawer) {
    burger.addEventListener('click', function () {
      var open = drawer.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    drawer.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        drawer.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---- reveal on scroll ---- */
  var items = document.querySelectorAll('.rv, .rl, .imgwrap, .step, .bridge');
  if (!('IntersectionObserver' in window) || reduce) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        if (!el.style.getPropertyValue('--d')) {
          var p = el.parentElement;
          var sibs = p ? Array.prototype.filter.call(p.children, function (c) {
            return c.classList && (c.classList.contains('rv') || c.classList.contains('rl'));
          }) : [];
          var i = sibs.indexOf(el);
          if (i > 0) el.style.setProperty('--d', i * 90 + 'ms');
        }
        el.classList.add('in');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- flow path lengths for the bridge diagram ---- */
  document.querySelectorAll('.bridge .flow').forEach(function (p) {
    try {
      var L = Math.ceil(p.getTotalLength());
      p.style.setProperty('--len', L);
      p.style.strokeDasharray = L;
      if (!reduce) p.style.strokeDashoffset = L;
    } catch (e) {}
  });

  /* ---- services accordion ---- */
  document.querySelectorAll('.svc-item').forEach(function (item, idx) {
    var head = item.querySelector('.svc-head');
    var body = item.querySelector('.svc-body');
    if (!head || !body) return;
    var id = 'svc-body-' + idx;
    body.id = id;
    head.setAttribute('aria-expanded', 'false');
    head.setAttribute('aria-controls', id);
    head.addEventListener('click', function () {
      var open = item.classList.contains('open');
      document.querySelectorAll('.svc-item.open').forEach(function (o) {
        if (o === item) return;
        o.classList.remove('open');
        o.querySelector('.svc-body').style.height = '0px';
        o.querySelector('.svc-head').setAttribute('aria-expanded', 'false');
      });
      if (open) {
        body.style.height = '0px';
        item.classList.remove('open');
        head.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        head.setAttribute('aria-expanded', 'true');
        body.style.height = body.firstElementChild.offsetHeight + 'px';
      }
    });
  });
  window.addEventListener('resize', function () {
    document.querySelectorAll('.svc-item.open .svc-body').forEach(function (b) {
      b.style.height = b.firstElementChild.offsetHeight + 'px';
    });
  });

  /* ---- subtle parallax on bleed images ---- */
  if (!reduce) {
    var bleeds = document.querySelectorAll('.bleed img');
    if (bleeds.length) {
      var ticking = false;
      window.addEventListener('scroll', function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(function () {
          bleeds.forEach(function (img) {
            var r = img.parentElement.getBoundingClientRect();
            if (r.bottom < 0 || r.top > window.innerHeight) return;
            var p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
            img.style.transform = 'scale(1.12) translateY(' + (p * -26).toFixed(2) + 'px)';
          });
          ticking = false;
        });
      }, { passive: true });
    }
  }
})();
