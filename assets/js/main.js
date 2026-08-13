document.addEventListener("DOMContentLoaded", function() {
  var btn = document.querySelector("#mobileMenuToggle");
  var nav = document.querySelector("#mobileMenu");
  if (btn && nav) {
    btn.addEventListener("click", function() {
      var open = nav.classList.toggle("open");
      btn.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
      nav.setAttribute("aria-hidden", !open);
    });
    nav.querySelectorAll("a").forEach(function(a) {
      a.addEventListener("click", function() {
        nav.classList.remove("open");
        btn.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        nav.setAttribute("aria-hidden", "true");
      });
    });
  }

  var header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", function() {
      header.classList.toggle("scrolled", window.scrollY > 50);
    });
  }

  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); }
    });
  }, {threshold: 0.1});
  document.querySelectorAll(".anim").forEach(function(el) { obs.observe(el); });

  document.querySelectorAll(".faq-question").forEach(function(btn) {
    btn.addEventListener("click", function() {
      var item = this.closest(".faq-item");
      var answer = item.querySelector(".faq-answer");
      var isOpen = answer.classList.contains("open");
      document.querySelectorAll(".faq-answer.open").forEach(function(a) {
        a.classList.remove("open");
        a.previousElementSibling.setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        answer.classList.add("open");
        this.setAttribute("aria-expanded", "true");
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(function(a) {
    a.addEventListener("click", function(e) {
      var t = document.querySelector(this.getAttribute("href"));
      if (t) { e.preventDefault(); t.scrollIntoView({behavior:"smooth"}); }
    });
  });

  var rateToggle = document.getElementById("rateToggle");
  if (rateToggle) {
    var showMonthly = false;
    setInterval(function() {
      showMonthly = !showMonthly;
      rateToggle.textContent = showMonthly ? "R$4.500/mes" : "R$25/h";
    }, 3000);
  }

  var calcPeople = document.getElementById("calcPeople");
  var calcHours = document.getElementById("calcHours");
  function updateCalc() {
    if (!calcPeople || !calcHours) return;
    var p = parseInt(calcPeople.value);
    var h = parseInt(calcHours.value);
    var hourly = p * h * 2.5;
    var monthly = hourly * 30;
    var yearly = monthly * 12;
    var fmt = function(v) { return "R$" + v.toLocaleString("pt-BR", {minimumFractionDigits:2, maximumFractionDigits:2}); };
    document.getElementById("calcPeopleValue").textContent = p;
    document.getElementById("calcHoursValue").textContent = h + "h";
    document.getElementById("calcHourly").textContent = fmt(hourly);
    document.getElementById("calcMonthly").textContent = fmt(monthly);
    document.getElementById("calcYearly").textContent = fmt(yearly);
  }
  if (calcPeople) calcPeople.addEventListener("input", updateCalc);
  if (calcHours) calcHours.addEventListener("input", updateCalc);
  updateCalc();

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
  document.querySelectorAll(".cat-btn").forEach(function(catBtn) {
    catBtn.addEventListener("click", function() {
      document.querySelectorAll(".cat-btn").forEach(function(b) { b.classList.remove("active"); });
      this.classList.add("active");
      var cat = this.dataset.cat;
      if (cards) cards.forEach(function(c) {
        c.style.display = (cat === "all" || c.dataset.cat === cat) ? "" : "none";
      });
    });
  });

  var pb = document.querySelector(".reading-bar");
  if (pb) window.addEventListener("scroll", function() {
    pb.style.width = ((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100) + "%";
  });

  document.querySelectorAll(".share-btn").forEach(function(b) {
    b.addEventListener("click", function() {
      var url = window.location.href, act = this.dataset.share;
      if (act === "copy") navigator.clipboard.writeText(url);
      else if (act === "whatsapp") window.open("https://wa.me/?text=" + encodeURIComponent(document.title + " " + url));
      else if (act === "twitter") window.open("https://twitter.com/intent/tweet?url=" + encodeURIComponent(url));
    });
  });
});
