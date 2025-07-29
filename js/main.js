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

  // 🔢 Counter animation
  const counters = document.querySelectorAll(".counter-number");

  const runCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const duration = 1500;
    const stepTime = Math.max(Math.floor(duration / target), 10);
    let current = 0;

    const update = () => {
      current += Math.ceil(target / (duration / stepTime));
      if (current < target) {
        counter.innerText = current.toLocaleString();
        setTimeout(update, stepTime);
      } else {
        counter.innerText = target.toLocaleString() + '+';
      }
    };

    update();
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
});

document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});
