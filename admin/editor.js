/* Talim AI — Visual Edit Mode
   Loaded on any page via ?edit=1. Lets the admin click text to edit it,
   click images to replace them, and Save → commits to GitHub via the Worker.
   Saving is gated by the admin password (checked by the Worker). */
(function () {
  if (window.__taeLoaded) return; window.__taeLoaded = true;
  var API = "https://talimai.tech/api";
  var KEY = sessionStorage.getItem("talim_admin_key") || "";
  if (!KEY) {
    KEY = prompt("Enter your admin password to edit this page:") || "";
    if (!KEY) { alert("Edit mode cancelled."); return; }
    sessionStorage.setItem("talim_admin_key", KEY);
  }

  var imageChanges = [];

  // ---- styles ----
  var css = document.createElement("style");
  css.textContent =
    ".tae-editable{outline:1px dashed rgba(196,154,76,.7);outline-offset:2px;cursor:text;transition:background .15s;}" +
    ".tae-editable:hover{background:rgba(196,154,76,.12);}" +
    ".tae-editable:focus{outline:2px solid #C49A4C;background:rgba(196,154,76,.15);}" +
    ".tae-img{outline:2px dashed #1A5C40;outline-offset:2px;cursor:pointer;position:relative;}" +
    ".tae-img:hover{outline-color:#C49A4C;filter:brightness(.92);}" +
    "#tae-bar{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;background:#0E3B2A;color:#F5F1E8;" +
      "display:flex;align-items:center;gap:12px;padding:10px 16px;font-family:-apple-system,Segoe UI,Roboto,sans-serif;font-size:14px;box-shadow:0 -4px 20px rgba(0,0,0,.25);}" +
    "#tae-bar b{font-weight:700;}" +
    "#tae-bar .tae-msg{flex:1;opacity:.9;font-size:13px;}" +
    "#tae-bar button{font-family:inherit;font-weight:600;font-size:13px;border:none;border-radius:999px;padding:8px 16px;cursor:pointer;}" +
    "#tae-save{background:#C49A4C;color:#072017;}#tae-save:hover{background:#D9B679;}" +
    "#tae-exit{background:transparent;color:#F5F1E8;border:1px solid rgba(255,255,255,.35)!important;}" +
    ".tae-hint{position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:2147483000;background:#072017;color:#F5F1E8;padding:8px 16px;border-radius:999px;font-family:sans-serif;font-size:13px;opacity:.95;}";
  document.head.appendChild(css);

  // ---- toolbar ----
  var bar = document.createElement("div");
  bar.id = "tae-bar";
  bar.innerHTML =
    '<b>✏️ Edit Mode</b><span class="tae-msg" id="tae-msg">Click any text to edit. Click an image to replace it.</span>' +
    '<button id="tae-save">Save changes</button><button id="tae-exit">Exit</button>';
  document.body.appendChild(bar);

  var hint = document.createElement("div");
  hint.className = "tae-hint";
  hint.textContent = "You are editing your live site";
  document.body.appendChild(hint);
  setTimeout(function () { hint.style.display = "none"; }, 3500);

  function msg(t) { document.getElementById("tae-msg").textContent = t; }

  // ---- make text editable (leaf text elements only = safe) ----
  var SEL = "h1,h2,h3,h4,h5,h6,p,li,a,button,span,blockquote,figcaption,td,th,strong,em,div";
  var nodes = document.querySelectorAll(SEL);
  nodes.forEach(function (el) {
    if (el.closest("#tae-bar")) return;
    if (el.children.length !== 0) return;                 // only pure-text elements (no inner tags) → safe replace
    var txt = el.textContent.trim();
    if (!txt) return;
    if (el.isContentEditable) return;
    el.dataset.taeOrig = el.innerHTML;
    el.classList.add("tae-editable");
    el.setAttribute("contenteditable", "true");
    // paste as plain text (avoid messy markup)
    el.addEventListener("paste", function (e) {
      e.preventDefault();
      var t = (e.clipboardData || window.clipboardData).getData("text");
      document.execCommand("insertText", false, t);
    });
  });

  // ---- block navigation while editing ----
  document.addEventListener("click", function (e) {
    var a = e.target.closest("a,button");
    if (a && !a.closest("#tae-bar")) { e.preventDefault(); }
  }, true);

  // ---- images: click to replace ----
  document.querySelectorAll("img").forEach(function (img) {
    if (img.closest("#tae-bar")) return;
    img.classList.add("tae-img");
    img.dataset.taeSrc = img.getAttribute("src") || "";
    img.addEventListener("click", function (e) {
      e.preventDefault(); e.stopPropagation();
      replaceImage(img);
    });
  });

  function replaceImage(img) {
    var input = document.createElement("input");
    input.type = "file"; input.accept = "image/*";
    input.onchange = function () {
      var file = input.files[0]; if (!file) return;
      if (file.size > 4 * 1024 * 1024) { alert("Image too large (max 4 MB). Please compress it first."); return; }
      msg("Uploading image…");
      var reader = new FileReader();
      reader.onload = function () {
        var b64 = String(reader.result).split(",")[1];
        var ext = (file.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g, "");
        var path = "images/" + Date.now() + "." + ext;
        fetch(API + "/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-Admin-Key": KEY },
          body: JSON.stringify({ path: path, contentBase64: b64 })
        }).then(function (r) { return r.json(); }).then(function (d) {
          if (!d.ok) { msg("Upload failed: " + (d.error || "")); return; }
          var oldSrc = img.dataset.taeSrc;
          var newSrc = "/" + path;
          img.src = newSrc + "?t=" + Date.now();
          img.dataset.taeSrc = newSrc;
          imageChanges.push({ old: oldSrc, new: newSrc });
          msg("Image replaced (not saved yet). Click Save changes.");
        }).catch(function () { msg("Upload failed."); });
      };
      reader.readAsDataURL(file);
    };
    input.click();
  }

  // ---- save ----
  document.getElementById("tae-save").addEventListener("click", function () {
    var changes = [];
    document.querySelectorAll(".tae-editable").forEach(function (el) {
      if (el.innerHTML !== el.dataset.taeOrig) {
        changes.push({ old: el.dataset.taeOrig, new: el.innerHTML });
      }
    });
    if (!changes.length && !imageChanges.length) { msg("No changes to save."); return; }
    var btn = document.getElementById("tae-save");
    btn.disabled = true; btn.textContent = "Saving…";
    fetch(API + "/admin/save-regions", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Admin-Key": KEY },
      body: JSON.stringify({ path: location.pathname, changes: changes, imageChanges: imageChanges })
    }).then(function (r) {
      if (r.status === 401) throw new Error("Wrong password — exit and log in again.");
      return r.json();
    }).then(function (d) {
      if (!d.ok) throw new Error(d.error || "Save failed");
      // commit applied edits to baseline so re-saving works
      document.querySelectorAll(".tae-editable").forEach(function (el) { el.dataset.taeOrig = el.innerHTML; });
      imageChanges = [];
      var extra = d.skipped && d.skipped.length ? (" · " + d.skipped.length + " skipped (text appears more than once — edit those via Pages & Files)") : "";
      msg("✓ Saved " + d.applied + " change(s). Live in ~1 min." + extra);
    }).catch(function (e) { msg("✗ " + e.message); })
      .finally(function () { btn.disabled = false; btn.textContent = "Save changes"; });
  });

  // ---- exit ----
  document.getElementById("tae-exit").addEventListener("click", function () {
    location.href = location.pathname; // drop ?edit=1 and reload clean
  });
})();
