// main.js — mobile menu toggle + smooth scrolling
document.addEventListener("DOMContentLoaded", function () {

  // =============================
  // MOBILE NAVIGATION TOGGLE
  // =============================
  document.querySelectorAll(".nav-toggle").forEach((btn) => {
    btn.addEventListener("click", () => {
      const nav = btn.nextElementSibling;

      if (!nav || !nav.classList.contains("nav")) return;

      const isOpen = nav.classList.contains("show");
      nav.classList.toggle("show");

      btn.setAttribute("aria-expanded", String(!isOpen));


      // simple observer to add .visible to .fade-in elements
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add('visible');
  });
},{threshold: 0.12});

document.querySelectorAll('.fade-in').forEach(el=> io.observe(el));

    });
  });

  // =============================
  // SMOOTH SCROLL FOR ANCHORS
  // =============================
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

});
