/* ==========================
   1. HELPERS
========================== */
const $  = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

/* ==========================
   2. PAGE LOAD STAGGER
   (Extended for Report Page)
========================== */
window.addEventListener("load", () => {
  const animated = [
    ".erp-navbar",
    ".erp-sidebar",
    ".erp-topbar",
    ".erp-page-header",
    ".erp-tools",
    ".table-container",
    ".form-container",
    ".form-section",
    ".button-container"
    
  ];

  animated.forEach((selector, i) => {
    const el = $(selector);
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    el.style.transition = "all 0.6s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, i * 120);
  });
});

/* ==========================
   3. SIDEBAR HOVER PHYSICS
========================== */
$$(".sidebar-menu li").forEach(item => {
  item.addEventListener("mousemove", e => {
    const rect = item.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 10;
    const y = (e.clientY - rect.top - rect.height / 2) / 10;

    item.style.transform = `translate(${x}px, ${y}px)`;
  });

  item.addEventListener("mouseleave", () => {
    item.style.transform = "translate(0,0)";
  });
});

/* ==========================
   4. MAGNETIC BUTTONS
   (Extended)
========================== */
$$(
  ".btn-create, .filter-btn, .btn-apply, .btn-reset, .action-btn"
).forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

/* ==========================
   5. TABLE & CARD REVEAL
========================== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

/* Tables (old pages) */
$$(".table tbody tr").forEach((row, i) => {
  row.style.opacity = "0";
  row.style.transform = "translateY(15px)";
  row.style.transition = `all 0.4s ease ${i * 0.05}s`;
  observer.observe(row);
});

/* Cards (new report page) */
$$(".card-custom").forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = `all 0.5s ease ${i * 0.1}s`;
  observer.observe(card);
});

/* ==========================
   6. ACTION ICON FEEDBACK
========================== */
$$(
  ".action-icons i, .graph-actions button i"
).forEach(icon => {
  icon.addEventListener("click", () => {
    icon.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.3)" },
        { transform: "scale(1)" }
      ],
      { duration: 300, easing: "ease-out" }
    );
  });
});

/* ==========================
   7. MODAL CINEMATIC
========================== */
$$(".modal").forEach(modal => {
  modal.addEventListener("show.bs.modal", () => {
    const content = $(".modal-content", modal);
    if (!content) return;

    content.animate(
      [
        { transform: "scale(0.9)", opacity: 0 },
        { transform: "scale(1)", opacity: 1 }
      ],
      { duration: 400, easing: "cubic-bezier(.25,.8,.25,1)" }
    );
  });
});

/* ==========================
   8. NAV ICON PULSE
========================== */
$$(".nav-icons i").forEach(icon => {
  setInterval(() => {
    icon.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.15)" },
        { transform: "scale(1)" }
      ],
      { duration: 600 }
    );
  }, 6000);
});

/* ==========================
   9. SMOOTH HEADER SCROLL
========================== */
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const current = window.scrollY;
  const delta = current - lastScroll;
  lastScroll = current;

  const header = $(".erp-navbar");
  if (!header) return;

  header.style.transform = `translateY(${Math.min(delta * -0.4, 0)}px)`;
});

