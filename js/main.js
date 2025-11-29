// js/main.js — stable, defensive, ready

document.addEventListener("DOMContentLoaded", () => {

  /* -------------------------
     SLIDING MOBILE MENU
  --------------------------*/
  const toggles = document.querySelectorAll(".nav-toggle");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("aria-controls");
      const nav = document.getElementById(id);
      if (!nav) return;
      nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", nav.classList.contains("open"));
    });
  });

  // ESC closes all menus + lightbox
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      document.querySelectorAll(".nav.open")
        .forEach(n => n.classList.remove("open"));
      const lb = document.querySelector(".lightbox");
      if (lb) lb.remove();
    }
  });

  /* -------------------------
     DARK MODE
  --------------------------*/
  const darkBtn = document.getElementById("dark-toggle");
  if (darkBtn) {
    const saved = localStorage.getItem("gw:dark");
    if (saved === "1") {
      document.body.classList.add("dark");
      darkBtn.textContent = "☀️";
    }
    darkBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      darkBtn.textContent = isDark ? "☀️" : "🌙";
      localStorage.setItem("gw:dark", isDark ? "1" : "0");
    });
  }

  /* -------------------------
     LIGHTBOX FOR GALLERY
  --------------------------*/
  const galleryImages = document.querySelectorAll(".image-gallery img");
  if (galleryImages.length) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => openLightbox(img.src, img.alt));
    });
  }

  function openLightbox(src, alt) {
    const lbNow = document.querySelector(".lightbox");
    if (lbNow) lbNow.remove();

    const overlay = document.createElement("div");
    overlay.className = "lightbox";
    overlay.innerHTML = `
      <button class="lightbox-close">✕</button>
      <img src="${src}" alt="${alt}">
    `;
    overlay.addEventListener("click", e => {
      if (e.target === overlay) overlay.remove();
    });
    overlay.querySelector(".lightbox-close")
      .addEventListener("click", () => overlay.remove());

    Object.assign(overlay.style, {
      position: "fixed",
      inset: "0",
      background: "rgba(0,0,0,0.85)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "9999",
      padding: "20px"
    });

    document.body.appendChild(overlay);
  }

  /* -------------------------
     FADE-IN OBSERVER
  --------------------------*/
  const fades = document.querySelectorAll(".fade-in");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    fades.forEach(el => io.observe(el));
  } else {
    fades.forEach(el => el.classList.add("visible"));
  }

});
