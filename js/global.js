// Navbar shrink on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Hamburger toggle
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".navbar-links a");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });

  // Page transition
  const transitionEl = document.querySelector(".page-transition");
  if (transitionEl) {
    window.onload = () => {
      transitionEl.classList.add("fade-out");
    };
  }
});

//Accordion
    const items = document.querySelectorAll(".accordion-item");

    items.forEach(item => {
      const button = item.querySelector(".accordion-question");
      button.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
