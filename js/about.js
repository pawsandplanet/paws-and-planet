// =========================
// Volunteer Carousel (scroll-snap + arrows that show only when needed)
// =========================
document.querySelectorAll(".volunteer-slider-wrapper").forEach(wrapper => {
  const track = wrapper.querySelector(".volunteer-slider");
  const items = wrapper.querySelectorAll(".volunteer-card");
  const prev = wrapper.querySelector(".volunteer-arrow.left");
  const next = wrapper.querySelector(".volunteer-arrow.right");

  const cardWidth = items[0].offsetWidth + 16; // card + gap

  // Arrow click scroll
  next.addEventListener("click", () => {
    track.scrollBy({ left: cardWidth, behavior: "smooth" });
  });

  prev.addEventListener("click", () => {
    track.scrollBy({ left: -cardWidth, behavior: "smooth" });
  });

  // Show/hide arrows depending on scroll position
  function updateArrows() {
    const maxScrollLeft = track.scrollWidth - track.clientWidth;

    if (track.scrollLeft <= 0) {
      prev.style.display = "none";
    } else {
      prev.style.display = "block";
    }

    if (track.scrollLeft >= maxScrollLeft - 1) {
      next.style.display = "none";
    } else {
      next.style.display = "block";
    }
  }

  // Listen to scroll and on load
  track.addEventListener("scroll", updateArrows);
  window.addEventListener("resize", updateArrows);
  updateArrows(); // initial state
});
