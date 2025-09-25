
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


//Carousel
function initCarouselArrows(selector) {
  const container = document.querySelector(selector);
  if (!container) return;

  const track = container.querySelector(".carousel-track");
  const items = container.querySelectorAll(".carousel-item");
  const prevBtn = container.querySelector(".carousel-arrow.left");
  const nextBtn = container.querySelector(".carousel-arrow.right");

  if (!track || items.length === 0) return;

  const gap = parseInt(getComputedStyle(track).gap) || 0;
  const itemWidth = items[0].offsetWidth + gap;

  // Arrow navigation
  nextBtn?.addEventListener("click", () => {
    track.scrollBy({ left: itemWidth, behavior: "smooth" });
  });

  prevBtn?.addEventListener("click", () => {
    track.scrollBy({ left: -itemWidth, behavior: "smooth" });
  });
}

// Example: init homepage carousel
document.addEventListener("DOMContentLoaded", () => {
  initCarouselArrows(".carousel-container");
});

