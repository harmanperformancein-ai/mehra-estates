(function () {
  'use strict';
  var WA = '919817651360';
  var U = function (id, w) { return 'https://images.unsplash.com/photo-' + id + '?auto=format&fit=crop&w=' + w + '&q=70'; };
  var waLink = function (t) { return 'https://wa.me/' + WA + '?text=' + encodeURIComponent(t); };
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* DEMO listings only. Replace with real properties before launch. */
  var CAT = { plot: 'Residential Plot', commercial: 'Commercial', house: 'Residential House', agri: 'Agricultural Land' };
  var props = [
    { c: 'plot', n: 'Demo Plot, Sector Corner', l: 'Kurukshetra, Haryana', p: '₹ 45 Lakh (demo)', a: '200 sq yd', i: '1605276374104-dee2a0ed3cd6', d: 'Sample listing showing how a corner plot would be presented, with road access and utility details.' },
    { c: 'plot', n: 'Demo Plot, Park Facing', l: 'Kurukshetra, Haryana', p: '₹ 62 Lakh (demo)', a: '300 sq yd', i: '1500382017468-9049fed747ef', d: 'Sample listing for a park-facing residential plot in a developed sector.' },
    { c: 'commercial', n: 'Demo Showroom Space', l: 'Kurukshetra, Haryana', p: '₹ 1.8 Crore (demo)', a: '1,200 sq ft', i: '1486406146926-c627a92ad1ab', d: 'Sample listing for a ground-floor showroom on a main road.' },
    { c: 'commercial', n: 'Demo Office Floor', l: 'Kurukshetra, Haryana', p: '₹ 95 Lakh (demo)', a: '900 sq ft', i: '1497366216548-37526070297c', d: 'Sample listing for an office floor with parking and lift access.' },
    { c: 'house', n: 'Demo 4 BHK Villa', l: 'Kurukshetra, Haryana', p: '₹ 2.4 Crore (demo)', a: '2,400 sq ft', i: '1512917774080-9991f1c4c750', d: 'Sample listing for a modern villa with garden and covered parking.' },
    { c: 'house', n: 'Demo 3 BHK Family Home', l: 'Kurukshetra, Haryana', p: '₹ 1.2 Crore (demo)', a: '1,800 sq ft', i: '1564013799919-ab600027ffc6', d: 'Sample listing for a family home in a quiet residential area.' },
    { c: 'agri', n: 'Demo Farm Land', l: 'Near Kurukshetra, Haryana', p: '₹ 35 Lakh / acre (demo)', a: '4 acres', i: '1416879595882-3373a0480b5b', d: 'Sample listing for irrigated agricultural land with road connectivity.' },
    { c: 'agri', n: 'Demo Orchard Land', l: 'Near Kurukshetra, Haryana', p: '₹ 28 Lakh / acre (demo)', a: '6 acres', i: '1523217582562-09d0def993a6', d: 'Sample listing for open agricultural land suited to farming or orchards.' }
  ];
  var gallery = [
    ['1600596542815-ffad4c1539a9', 'Residential', 'Modern family home with a landscaped front garden'],
    ['1600585154340-be6161a56a0c', 'Luxury', 'Luxury house exterior with a swimming pool'],
    ['1545324418-cc1a3fa10c00', 'Commercial', 'Glass commercial building facade'],
    ['1570129477492-45c003edd2be', 'Residential', 'Brick house with a large lawn'],
    ['1580587771525-78b9dba3b914', 'Luxury', 'Large luxury villa with columns and driveway'],
    ['1600607687939-ce8a6c25118c', 'Residential', 'Contemporary home living area with natural light']
  ];

  var PH = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#13305a"/><path d="M200 250l100-80 100 80v50H200z" fill="none" stroke="#c9a24b" stroke-width="6" stroke-linejoin="round"/><text x="300" y="345" fill="#c9a24b" font-family="sans-serif" font-size="20" text-anchor="middle">Mehra Estates</text></svg>');
  window.__ph = PH;
  function safe(im) { im.onerror = function () { im.onerror = null; im.removeAttribute('srcset'); im.src = PH; }; return im; }
  function img(id, alt, w, h) {
    var im = new Image();
    im.alt = alt; im.loading = 'lazy'; im.decoding = 'async'; im.width = w || 600; im.height = h || 400;
    im.sizes = '(max-width: 600px) 92vw, (max-width: 1000px) 45vw, 290px';
    im.srcset = U(id, 480) + ' 480w, ' + U(id, 800) + ' 800w';
    im.src = U(id, 800);
    return safe(im);
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  /* WhatsApp links */
  $$('[data-wa]').forEach(function (a) { a.href = waLink(a.getAttribute('data-wa')); });

  /* Property cards */
  var grid = $('#grid');
  function enquiry(p) { return 'Hello Mehra Estates, I am interested in "' + p.n + '" (' + CAT[p.c] + ', ' + p.a + '). Please share more details.'; }
  props.forEach(function (p, idx) {
    var card = el('article', 'card'); card.dataset.cat = p.c;
    var top = el('div', 'card-img');
    top.appendChild(img(p.i, p.n + ' - ' + CAT[p.c] + ' in Kurukshetra (demo image)'));
    top.appendChild(el('span', 'type', CAT[p.c]));
    top.appendChild(el('span', 'demo-tag', 'Demo'));
    var body = el('div', 'card-body');
    body.appendChild(el('h3', '', p.n));
    body.appendChild(el('p', 'loc', p.l));
    body.appendChild(el('div', 'meta', '<span class="price">' + p.p + '</span><span class="area">' + p.a + '</span>'));
    var btns = el('div', 'card-btns');
    var v = el('button', 'btn btn-navy', 'View Details'); v.type = 'button'; v.addEventListener('click', function () { openModal(p); });
    var w = el('a', 'btn btn-wa', 'WhatsApp'); w.href = waLink(enquiry(p)); w.target = '_blank'; w.rel = 'noopener';
    btns.appendChild(v); btns.appendChild(w); body.appendChild(btns);
    card.appendChild(top); card.appendChild(body); grid.appendChild(card);
  });

  /* Filters */
  $$('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      $$('.chip').forEach(function (c) { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
      chip.classList.add('active'); chip.setAttribute('aria-pressed', 'true');
      var f = chip.dataset.filter, n = 0;
      $$('.card', grid).forEach(function (c) {
        var show = f === 'all' || c.dataset.cat === f;
        c.hidden = !show; if (show) n++;
        if (show) { c.style.animation = 'none'; void c.offsetWidth; c.style.animation = ''; }
      });
      $('#empty').hidden = n > 0;
    });
  });

  /* Modal */
  var modal = $('#modal'), lastFocus;
  function openModal(p) {
    lastFocus = document.activeElement;
    var im = safe($('#m-img')); im.src = U(p.i, 1000); im.alt = p.n + ' (demo image)';
    $('#m-title').textContent = p.n; $('#m-loc').textContent = p.l; $('#m-desc').textContent = p.d + ' This is demo content, not an available listing.';
    $('#m-facts').innerHTML = '<div><dt>Type</dt><dd>' + CAT[p.c] + '</dd></div><div><dt>Area</dt><dd>' + p.a + '</dd></div><div><dt>Price</dt><dd>' + p.p + '</dd></div>';
    $('#m-wa').href = waLink(enquiry(p));
    modal.hidden = false; document.body.style.overflow = 'hidden'; $('#modal-x').focus();
  }
  function closeModal() { modal.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  $('#modal-x').addEventListener('click', closeModal);
  modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });

  /* Gallery + lightbox */
  var gg = $('#gallery-grid'), lb = $('#lightbox');
  gallery.forEach(function (g) {
    var b = el('button', 'g'); b.type = 'button'; b.setAttribute('aria-label', 'View larger: ' + g[2]);
    b.appendChild(img(g[0], g[2] + ' (illustrative image)'));
    b.appendChild(el('span', '', g[1]));
    b.addEventListener('click', function () { var i = safe($('#lb-img')); i.src = U(g[0], 1600); i.alt = g[2]; lb.hidden = false; document.body.style.overflow = 'hidden'; });
    gg.appendChild(b);
  });
  function closeLb() { lb.hidden = true; document.body.style.overflow = ''; }
  $('#lb-x').addEventListener('click', closeLb);
  lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab' && !modal.hidden) {
      var f = $$('a[href], button', modal), a = f[0], z = f[f.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
    if (e.key === 'Escape') { if (!modal.hidden) closeModal(); if (!lb.hidden) closeLb(); closeMenu(); } });

  /* Mobile menu */
  var burger = $('#burger'), menu = $('#menu');
  function closeMenu() { menu.classList.remove('open'); burger.setAttribute('aria-expanded', 'false'); }
  burger.addEventListener('click', function () { var o = menu.classList.toggle('open'); burger.setAttribute('aria-expanded', o); });
  $$('a', menu).forEach(function (a) { a.addEventListener('click', closeMenu); });
  document.addEventListener('click', function (e) { if (!menu.contains(e.target) && !burger.contains(e.target)) closeMenu(); });

  /* Scroll: header, back-to-top, active link */
  var header = $('#header'), toTop = $('#to-top');
  var secs = $$('main section[id]'), links = $$('a', menu);
  function onScroll() {
    var y = window.scrollY;
    header.classList.toggle('solid', y > 40);
    toTop.classList.toggle('show', y > 600);
    var cur = '';
    secs.forEach(function (s) { if (y + 120 >= s.offsetTop) cur = s.id; });
    links.forEach(function (a) { a.classList.toggle('on', a.getAttribute('href') === '#' + cur); });
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });

  /* Reveal on scroll (about, why, contact) */
  var rv = $$('.about > *, .why article, .contact > *');
  rv.forEach(function (e) { e.classList.add('rv'); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) { en.forEach(function (x) { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold: .12 });
    rv.forEach(function (e) { io.observe(e); });
  } else { rv.forEach(function (e) { e.classList.add('in'); }); }

  /* Contact form validation, then send via WhatsApp */
  var form = $('#form'), note = $('#form-note');
  function setErr(input, msg) { input.classList.toggle('bad', !!msg); input.setAttribute('aria-invalid', !!msg); input.parentNode.querySelector('.err').textContent = msg || ''; return !msg; }
  var rules = {
    name: function (v) { return /^\p{L}[\p{L}\p{M} .'-]{1,59}$/u.test(v) ? '' : 'Enter your name using letters only (at least 2).'; },
    phone: function (v) { return /^(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(v) ? '' : 'Enter a valid 10-digit Indian mobile number.'; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email, like name@example.com.'; },
    message: function (v) { return v.length >= 10 ? '' : 'Write at least 10 characters so we know how to help.'; }
  };
  Object.keys(rules).forEach(function (k) {
    var i = $('#' + k);
    i.addEventListener('blur', function () { setErr(i, rules[k](i.value.trim())); });
    i.addEventListener('input', function () { if (i.classList.contains('bad')) setErr(i, rules[k](i.value.trim())); });
  });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, first = null;
    Object.keys(rules).forEach(function (k) { var i = $('#' + k); var good = setErr(i, rules[k](i.value.trim())); if (!good && !first) first = i; ok = ok && good; });
    if (!ok) { first.focus(); note.className = 'note'; note.textContent = 'Please fix the highlighted fields.'; return; }
    var t = 'Hello Mehra Estates,\nName: ' + $('#name').value.trim() + '\nPhone: ' + $('#phone').value.trim() + '\nEmail: ' + $('#email').value.trim() + '\nMessage: ' + $('#message').value.trim();
    if (!window.open(waLink(t), '_blank', 'noopener')) { window.location.href = waLink(t); }
    note.className = 'note ok'; note.textContent = 'Opening WhatsApp. Press send there to deliver your message.';
    form.reset();
  });
})();
