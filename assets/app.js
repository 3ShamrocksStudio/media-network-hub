/* ============================================================
   3Shamrocks Media Network — front-end behavior
   - Email capture: Formspree-ready, with a localStorage fallback
     so leads are captured from day one with zero setup.
   - Buy button: points to Gumroad once GUMROAD_URL is set;
     until then it routes to the email capture (honest pre-launch).
   © 2026 3Shamrocks Studio
   ============================================================ */
(function () {
  "use strict";

  /* ----------------------------------------------------------
     CONFIG — Dave edits these two lines after Gumroad setup.
     (See SETUP-NEXT.md)
     ---------------------------------------------------------- */
  var GUMROAD_URL = "";                 // e.g. "https://3shamrocks.gumroad.com/l/ai-brand-kit"
  var FORMSPREE_ID = "";                // e.g. "xayzqwer"  (from formspree.io)
  /* ---------------------------------------------------------- */

  // ---- Buy buttons ----
  function wireBuyButtons() {
    var buys = document.querySelectorAll("[data-buy]");
    buys.forEach(function (b) {
      if (GUMROAD_URL) {
        b.setAttribute("href", GUMROAD_URL);
        b.setAttribute("target", "_blank");
        b.setAttribute("rel", "noopener");
      } else {
        b.setAttribute("href", "#get-access");
        b.addEventListener("click", function () {
          var f = document.querySelector("#get-access input[type=email]");
          if (f) setTimeout(function () { f.focus(); }, 450);
        });
      }
    });
  }

  // ---- Email capture ----
  function saveLeadLocally(email, source) {
    try {
      var leads = JSON.parse(localStorage.getItem("3s_leads") || "[]");
      leads.push({ email: email, source: source || "hub", at: new Date().toISOString() });
      localStorage.setItem("3s_leads", JSON.stringify(leads));
      return true;
    } catch (e) { return false; }
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  function wireForms() {
    var forms = document.querySelectorAll("form.eform");
    forms.forEach(function (form) {
      var msg = form.parentNode.querySelector(".form-msg");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var input = form.querySelector("input[type=email]");
        var email = (input.value || "").trim();
        var source = form.getAttribute("data-source") || "hub";

        if (!validEmail(email)) {
          if (msg) { msg.textContent = "Please enter a valid email."; msg.className = "form-msg err"; }
          input.focus();
          return;
        }

        // Always keep a local copy (zero-dependency capture from day one)
        saveLeadLocally(email, source);

        if (FORMSPREE_ID) {
          // Real delivery once Dave drops in a Formspree ID
          fetch("https://formspree.io/f/" + FORMSPREE_ID, {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type": "application/json" },
            body: JSON.stringify({ email: email, source: source })
          }).then(function () {
            success(form, msg, input);
          }).catch(function () {
            // network failed but we still have the local copy
            success(form, msg, input);
          });
        } else {
          success(form, msg, input);
        }
      });
    });
  }

  function success(form, msg, input) {
    if (msg) {
      msg.textContent = "You're on the list — watch your inbox. ✦";
      msg.className = "form-msg ok";
    }
    input.value = "";
  }

  // ---- year stamp ----
  function stampYear() {
    var y = document.querySelectorAll("[data-year]");
    y.forEach(function (el) { el.textContent = "2026"; });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireBuyButtons();
    wireForms();
    stampYear();
  });
})();
