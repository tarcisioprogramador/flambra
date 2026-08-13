document.addEventListener("DOMContentLoaded", function() {
  // Mobile menu
  var btn = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".mobile-nav");
  if (btn && nav) {
    btn.addEventListener("click", function() {
      nav.classList.toggle("open");
      btn.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        nav.classList.remove("open");
        btn.classList.remove("open");
      });
    });
  }
  // Header scroll
  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function() {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }
  // Scroll animations
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, {threshold: 0.1});
  document.querySelectorAll(".anim").forEach(function(el) { obs.observe(el); });
  // FAQ toggle
  document.querySelectorAll(".faq-item summary").forEach(function(s) {
    s.addEventListener("click", function() {
      var item = this.parentElement;
      document.querySelectorAll(".faq-item[open]").forEach(function(o) {
        if (o !== item) o.removeAttribute("open");
      });
    });
  });
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      var t = document.querySelector(this.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({behavior:"smooth"}); }
    });
  });
  // Rate toggle
  var rateEl = document.querySelector(".rate-display");
  if (rateEl) setInterval(function() { rateEl.classList.toggle("show-monthly"); }, 3000);
  // Calculator
  var ps = document.querySelector(".calc-people"), hs = document.querySelector(".calc-hours"), rv = document.querySelector(".calc-result");
  function updateCalc() {
    if (!ps || !hs || !rv) return;
    var m = parseInt(ps.value) * parseInt(hs.value) * 30 * 2.5;
    rv.textContent = "R$ " + m.toLocaleString("pt-BR");
    document.querySelector(".calc-people-val").textContent = ps.value;
    document.querySelector(".calc-hours-val").textContent = hs.value + "h/dia";
    document.querySelector(".calc-formula").textContent = ps.value + " x " + hs.value + "h/dia x 30 dias";
  }
  if (ps) ps.addEventListener("input", updateCalc);
  if (hs) hs.addEventListener("input", updateCalc);
  updateCalc();
  // Earn calculator
  var es = document.querySelector(".earn-hours"), ev = document.querySelector(".earn-result"), ed = document.querySelector(".earn-daily");
  function updateEarn() {
    if (!es) return;
    var h = parseInt(es.value), d = h * 25, m = d * 30;
    if (ev) ev.textContent = "R$ " + m.toLocaleString("pt-BR") + " / mês";
    if (ed) ed.textContent = h + " horas por dia — até R$ " + d + "/dia aprovado";
    var hl = document.querySelector(".earn-hours-val");
    if (hl) hl.textContent = h + "h";
  }
  if (es) es.addEventListener("input", updateEarn);
  updateEarn();
  // Blog search
  var si = document.querySelector(".blog-search"), cards = document.querySelectorAll(".article-card");
  if (si && cards.length) {
    si.addEventListener("input", function() {
      var q = this.value.toLowerCase();
      cards.forEach(function(c) {
        var t = (c.querySelector(".card-title") || {}).textContent || "";
        var x = (c.querySelector(".card-excerpt") || {}).textContent || "";
        c.style.display = (t.toLowerCase().indexOf(q) > -1 || x.toLowerCase().indexOf(q) > -1) ? "" : "none";
      });
    });
  }
  // Category filter
  document.querySelectorAll(".cat-btn").forEach(function(btn) {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".cat-btn").forEach(function(b) { b.classList.remove("active"); });
      this.classList.add("active");
      var cat = this.dataset.cat;
      cards.forEach(function(c) {
        c.style.display = (cat === "all" || c.dataset.cat === cat) ? "" : "none";
      });
    });
  });
  // Reading progress
  var pb = document.querySelector(".reading-bar");
  if (pb) window.addEventListener("scroll", function() {
    pb.style.width = ((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) + "%";
  });
  // Share
  document.querySelectorAll(".share-btn").forEach(function(b) {
    b.addEventListener("click", function() {
      var url = window.location.href, act = this.dataset.share;
      if (act === "copy") navigator.clipboard.writeText(url);
      else if (act === "whatsapp") window.open("https://wa.me/?text=" + encodeURIComponent(document.title + " " + url));
      else if (act === "twitter") window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url));
    });
  });
});
