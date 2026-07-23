/* ============================================================
   Talim AI — sitewide search (self-contained, no dependencies)
   Loads on any page: injects a search icon into the header,
   opens an overlay, and filters a built-in index of the site.
   Add to any page with:  <script src="/search.js" defer></script>
   ============================================================ */
(function () {
  "use strict";

  // ---- Site index: every page worth finding. Edit here to add pages. ----
  var INDEX = [
    { t: "Free CV Analyzer", u: "/#cv-analyzer", d: "Upload your CV (PDF, Word or image) for an AI score, strengths, gaps, salary estimates and a 90-day action plan.", k: "cv resume analyzer analyse score salary job roles ats upload free check review" },
    { t: "All Opportunities", u: "/opportunities/", d: "Browse every scholarship, loan, skills programme and youth opportunity in one place.", k: "opportunities hub all guides browse scholarships loans skills jobs" },
    { t: "CSC Chinese Government Scholarship 2026", u: "/opportunities/csc-chinese-government-scholarship/", d: "Fully funded scholarship to study in China — stipend, Type A/B/C categories, documents and how to apply.", k: "csc china chinese government scholarship cgs fully funded stipend study abroad masters phd" },
    { t: "QS World University Rankings 2026 (Pakistan)", u: "/opportunities/qs-world-university-rankings-pakistan/", d: "Where Pakistan's universities rank globally — QAU, NUST, LUMS — plus the global top 10 and QS methodology.", k: "qs ranking rankings university universities pakistan qau nust lums punjab comsats mit world top best" },
    { t: "HEC Need-Based Scholarship 2026", u: "/opportunities/hec-need-based-scholarship/", d: "Tuition plus a monthly stipend for undergraduates from low-income families in Pakistan.", k: "hec need based scholarship undergraduate tuition stipend financial aid low income" },
    { t: "PM Youth Business & Agriculture Loan (Kamyab Jawan) 2026", u: "/opportunities/kamyab-jawan-business-loan/", d: "Loans from PKR 0.5M to 7.5M for young entrepreneurs and farmers, with a 0% markup tier.", k: "kamyab jawan loan business agriculture pmyp entrepreneur farmer youth finance markup" },
    { t: "PM Youth Laptop Scheme 2026", u: "/opportunities/pmyp-laptop-scheme/", d: "Merit-based free laptops for enrolled students — eligibility, merit criteria and how to apply.", k: "laptop scheme pmyp youth free students merit apply hec" },
    { t: "NAVTTC Free Courses 2026", u: "/opportunities/navttc-free-courses/", d: "Free IT and vocational training with a monthly stipend, toolkit and recognised certificate.", k: "navttc free courses skills it freelancing training stipend pmysdp vocational technical certificate" },
    { t: "International Youth Opportunities 2026", u: "/opportunities/international-youth-opportunities/", d: "Scholarships, fellowships, exchanges, competitions, conferences and internships — and how to find and apply.", k: "youth opportunities fellowship exchange competition conference internship workshop volunteer scholarships fully funded international" },
    { t: "About Talim AI & Founder", u: "/about/", d: "About Talim AI and its founder, Syed Mushtaq Ur Rehman Shah Bukhari.", k: "about founder mushtaq shah bukhari company team mission contact who" },
    { t: "Home", u: "/", d: "Talim AI — AI-powered accreditation for universities, plus free tools for students.", k: "home talim ai accreditation nbeac aacsb hec universities students main" }
  ];

  // ---- Inject styles ----
  var css = ''
    + '.tai-search-btn{display:inline-flex;align-items:center;justify-content:center;width:38px;height:38px;border-radius:50%;border:1px solid rgba(26,31,26,.18);background:transparent;color:inherit;cursor:pointer;padding:0;transition:background .15s,border-color .15s;flex:0 0 auto;}'
    + '.tai-search-btn:hover{background:rgba(196,154,76,.15);border-color:#C49A4C;}'
    + '.tai-search-btn svg{width:18px;height:18px;display:block;}'
    + '.tai-search-overlay{position:fixed;inset:0;z-index:99999;display:none;background:rgba(7,32,23,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);padding:11vh 16px 16px;box-sizing:border-box;}'
    + '.tai-search-overlay.open{display:block;}'
    + '.tai-search-panel{max-width:640px;margin:0 auto;background:#F9F5EC;border:1px solid rgba(26,31,26,.12);border-radius:16px;box-shadow:0 24px 60px rgba(7,32,23,.35);overflow:hidden;font-family:Manrope,system-ui,-apple-system,Segoe UI,Roboto,sans-serif;}'
    + '.tai-search-inputrow{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid rgba(26,31,26,.1);}'
    + '.tai-search-inputrow svg{width:20px;height:20px;color:#0E3B2A;flex:0 0 auto;}'
    + '.tai-search-input{flex:1;border:0;outline:0;background:transparent;font-size:1.05rem;color:#1A1F1A;font-family:inherit;}'
    + '.tai-search-input::placeholder{color:#6B6F6B;}'
    + '.tai-search-close{border:0;background:transparent;color:#6B6F6B;font-size:.8rem;cursor:pointer;padding:4px 8px;border-radius:6px;}'
    + '.tai-search-close:hover{background:rgba(26,31,26,.07);color:#1A1F1A;}'
    + '.tai-search-results{list-style:none;margin:0;padding:6px;max-height:58vh;overflow-y:auto;}'
    + '.tai-search-results li{margin:0;}'
    + '.tai-search-results a{display:block;text-decoration:none;color:inherit;padding:11px 12px;border-radius:10px;}'
    + '.tai-search-results a:hover,.tai-search-results a.tai-active{background:#EEE7D6;}'
    + '.tai-r-title{font-family:Fraunces,Georgia,serif;font-weight:600;color:#0E3B2A;font-size:1rem;}'
    + '.tai-r-desc{font-size:.86rem;color:#3A3F3A;margin-top:2px;line-height:1.4;}'
    + '.tai-search-empty{padding:22px 16px;text-align:center;color:#6B6F6B;font-size:.92rem;}'
    + '.tai-search-hint{padding:8px 14px;font-size:.74rem;color:#6B6F6B;border-top:1px solid rgba(26,31,26,.08);display:flex;gap:14px;flex-wrap:wrap;}'
    + '.tai-search-hint b{color:#3A3F3A;font-weight:600;}'
    + '@media(max-width:520px){.tai-search-overlay{padding:7vh 10px 10px;}.tai-search-hint{display:none;}}';
  var style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  var SEARCH_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>';

  // ---- Build the overlay ----
  var overlay = document.createElement("div");
  overlay.className = "tai-search-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.setAttribute("aria-label", "Search Talim AI");
  overlay.innerHTML =
    '<div class="tai-search-panel">'
    + '<div class="tai-search-inputrow">' + SEARCH_SVG
    + '<input type="text" class="tai-search-input" placeholder="Search Talim AI — scholarships, CV, loans, skills…" aria-label="Search query" autocomplete="off" spellcheck="false">'
    + '<button type="button" class="tai-search-close" aria-label="Close search">Esc</button>'
    + '</div>'
    + '<ul class="tai-search-results" role="listbox"></ul>'
    + '<div class="tai-search-hint"><span><b>↑ ↓</b> to navigate</span><span><b>↵</b> to open</span><span><b>esc</b> to close</span></div>'
    + '</div>';
  document.body.appendChild(overlay);

  var input = overlay.querySelector(".tai-search-input");
  var resultsEl = overlay.querySelector(".tai-search-results");
  var panel = overlay.querySelector(".tai-search-panel");
  var activeIdx = -1;
  var current = [];

  // ---- Search logic ----
  function search(q) {
    q = (q || "").trim().toLowerCase();
    if (!q) {
      // default suggestions
      return [INDEX[0], INDEX[1], INDEX[2], INDEX[8]];
    }
    var tokens = q.split(/\s+/);
    var scored = [];
    INDEX.forEach(function (item) {
      var hay = (item.t + " " + item.d + " " + item.k).toLowerCase();
      var score = 0;
      tokens.forEach(function (tok) {
        if (hay.indexOf(tok) !== -1) score += 1;
        if (item.t.toLowerCase().indexOf(tok) !== -1) score += 2; // title match boosts
      });
      if (item.t.toLowerCase().indexOf(q) !== -1) score += 3; // full phrase in title
      if (score > 0) scored.push({ item: item, score: score });
    });
    scored.sort(function (a, b) { return b.score - a.score; });
    return scored.map(function (s) { return s.item; });
  }

  function render(list) {
    current = list || [];
    activeIdx = current.length ? 0 : -1;
    if (!current.length) {
      resultsEl.innerHTML = '<li><div class="tai-search-empty">No matches. Try “scholarship”, “CV”, “loan”, or “skills”.</div></li>';
      return;
    }
    var html = "";
    current.forEach(function (item, i) {
      html += '<li role="option">'
        + '<a href="' + item.u + '" data-i="' + i + '" class="' + (i === 0 ? "tai-active" : "") + '">'
        + '<div class="tai-r-title">' + esc(item.t) + '</div>'
        + '<div class="tai-r-desc">' + esc(item.d) + '</div>'
        + '</a></li>';
    });
    resultsEl.innerHTML = html;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function setActive(i) {
    var links = resultsEl.querySelectorAll("a");
    if (!links.length) return;
    if (i < 0) i = links.length - 1;
    if (i >= links.length) i = 0;
    activeIdx = i;
    links.forEach(function (a) { a.classList.remove("tai-active"); });
    links[i].classList.add("tai-active");
    links[i].scrollIntoView({ block: "nearest" });
  }

  function go() {
    var links = resultsEl.querySelectorAll("a");
    if (links.length && activeIdx >= 0) {
      window.location.href = links[activeIdx].getAttribute("href");
    }
  }

  function open() {
    overlay.classList.add("open");
    document.documentElement.style.overflow = "hidden";
    input.value = "";
    render(search(""));
    setTimeout(function () { input.focus(); }, 30);
  }
  function close() {
    overlay.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  // ---- Events ----
  input.addEventListener("input", function () { render(search(input.value)); });
  input.addEventListener("keydown", function (e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(activeIdx + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(activeIdx - 1); }
    else if (e.key === "Enter") { e.preventDefault(); go(); }
  });
  overlay.querySelector(".tai-search-close").addEventListener("click", close);
  overlay.addEventListener("mousedown", function (e) { if (e.target === overlay) close(); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("open")) { close(); }
    // "/" opens search when not typing in a field
    var tag = (document.activeElement && document.activeElement.tagName) || "";
    var typing = tag === "INPUT" || tag === "TEXTAREA" || (document.activeElement && document.activeElement.isContentEditable);
    if (e.key === "/" && !typing && !overlay.classList.contains("open")) { e.preventDefault(); open(); }
  });

  // ---- Inject the search button into the header ----
  function makeBtn() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tai-search-btn nav-cta"; // nav-cta class keeps it visible on the homepage's mobile nav
    btn.setAttribute("aria-label", "Search");
    btn.setAttribute("title", "Search (press /)");
    btn.innerHTML = SEARCH_SVG;
    btn.addEventListener("click", open);
    return btn;
  }

  function placeButton() {
    var host = document.querySelector(".header-nav")   // guide pages, about, hub
            || document.querySelector(".nav-links")     // homepage
            || document.querySelector("header nav")     // generic fallback
            || document.querySelector("header .wrap");
    if (host) {
      host.appendChild(makeBtn());
    } else {
      // last-resort floating button
      var fb = makeBtn();
      fb.style.position = "fixed";
      fb.style.top = "14px";
      fb.style.right = "14px";
      fb.style.zIndex = "9998";
      fb.style.background = "#0E3B2A";
      fb.style.color = "#F9F5EC";
      document.body.appendChild(fb);
    }
  }

  // ---- If we landed on /#cv-analyzer, open the analyzer SPA page (homepage) ----
  function handleHash() {
    if (location.hash === "#cv-analyzer" && typeof window.showPage === "function") {
      try { window.showPage("analyzer"); } catch (e) {}
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { placeButton(); handleHash(); });
  } else {
    placeButton(); handleHash();
  }
})();
