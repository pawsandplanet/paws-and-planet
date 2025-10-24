
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

//Highlights
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".highlight-grid");
  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container"); // style with .dots-container or reuse .highlight-dots
  grid.insertAdjacentElement("afterend", dotsContainer);

  // Optional: create prev/next buttons (wire to .highlight-controls in your markup or create them here)
  const controls = document.createElement("div");
  controls.className = "highlight-controls";
  controls.innerHTML = `
    <button class="prev-btn" aria-label="Previous">‹</button>
    <div class="highlight-dots" aria-hidden="true"></div>
    <button class="next-btn" aria-label="Next">›</button>
  `;
  dotsContainer.appendChild(controls);
  const dotsWrapper = controls.querySelector(".highlight-dots");
  const prevBtn = controls.querySelector(".prev-btn");
  const nextBtn = controls.querySelector(".next-btn");

  const batchSize = 3; // how many show at once
  let currentBatch = 0;
  let interval;
  let highlights = [];
  let dots = [];
  let totalBatches = 0;
  const rotationDelay = 5000; // ms

  fetch("js/highlights.json")
    .then(response => {
      if (!response.ok) throw new Error("Network response was not ok");
      return response.json();
    })
    .then(data => {
      // ensure data is an array (in case JSON wrapped it in an object)
      highlights = Array.isArray(data) ? shuffleArray(data) : (data.items || []);
      totalBatches = Math.max(1, Math.ceil(highlights.length / batchSize));
      // if no items, show friendly message and stop
      if (highlights.length === 0) {
        grid.innerHTML = "<p>No highlights available right now.</p>";
        return;
      }
      renderBatch();
      createDots();
      startRotation();

      // Add hover pause
      grid.addEventListener("mouseenter", stopRotation);
      grid.addEventListener("mouseleave", startRotation);

      // Buttons
      prevBtn.addEventListener("click", () => {
        currentBatch = (currentBatch - 1 + totalBatches) % totalBatches;
        renderBatch();
        resetRotation();
      });
      nextBtn.addEventListener("click", () => {
        currentBatch = (currentBatch + 1) % totalBatches;
        renderBatch();
        resetRotation();
      });
    })
    .catch(error => {
      console.error("Error loading highlights:", error);
      grid.innerHTML = "<p>Unable to load highlights at the moment.</p>";
    });

  function shuffleArray(array) {
  return array
    .map(item => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
  }

  function renderBatch() {
    // clamp currentBatch into range
    if (totalBatches === 0) return;
    currentBatch = ((currentBatch % totalBatches) + totalBatches) % totalBatches;

    const start = currentBatch * batchSize;
    const slice = highlights.slice(start, start + batchSize);

    // if slice is empty (shouldn't happen when currentBatch is clamped), fallback to first batch
    if (slice.length === 0) {
      currentBatch = 0;
      return renderBatch();
    }

    // Smooth transition approach:
    // 1) add 'hidden' to existing items to let them animate out
    const oldItems = Array.from(grid.querySelectorAll(".highlight-item"));
    oldItems.forEach(it => it.classList.add("hidden"));

    // 2) after the CSS transition duration, replace the items and animate in new ones
    //    Use a timeout slightly larger than your CSS transition (e.g., 450ms for 400ms CSS)
    const TRANS_MS = 450;
    setTimeout(() => {
      grid.innerHTML = ""; // remove old items after they had time to animate out

      slice.forEach(item => {
        const div = document.createElement("div");
        div.className = "highlight-item hidden"; // start hidden so we can animate in
        // only include img tag if image exists to avoid broken imgs
        const imgHtml = item.img ? `<img src="${item.img}" alt="${escapeHtml(item.title || '')}">` : "";
        const titleHtml = item.title ? `<h3>${escapeHtml(item.title)}</h3>` : "";
        const descHtml = item.desc ? `<p><em>${escapeHtml(item.desc)}</em></p>` : "";
        // default link text
        const linkText = item.linkText || "Learn more";
        const linkHtml = item.link ? `<a href="${item.link}" target="_blank" class="btn btn-arrow">${escapeHtml(linkText)} <span>→</span></a>` : "";

        div.innerHTML = `
          ${imgHtml}
          ${titleHtml}
          ${descHtml}
          ${linkHtml}
        `;

        grid.appendChild(div);

        // Allow next frame to remove hidden - triggers CSS transition
        requestAnimationFrame(() => {
          div.classList.remove("hidden");
        });
      });

      updateDots();
    }, TRANS_MS);
  }

  function createDots() {
    // build dots inside the dotsWrapper we created in controls
    dotsWrapper.innerHTML = "";
    totalBatches = Math.max(1, Math.ceil(highlights.length / batchSize));

    for (let i = 0; i < totalBatches; i++) {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      if (i === currentBatch) dot.classList.add("active");
      dot.addEventListener("click", () => {
        currentBatch = i;
        renderBatch();
        resetRotation();
      });
      // make dots keyboard accessible
      dot.tabIndex = 0;
      dot.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          currentBatch = i;
          renderBatch();
          resetRotation();
        }
      });
      dotsWrapper.appendChild(dot);
    }

    // refresh dots NodeList
    dots = Array.from(dotsWrapper.querySelectorAll(".dot"));
  }

  function updateDots() {
    if (!dots || dots.length === 0) {
      // Try re-querying in case dots weren't created yet
      dots = Array.from(dotsWrapper.querySelectorAll(".dot"));
    }
    dots.forEach(dot => dot.classList.remove("active"));
    if (dots[currentBatch]) dots[currentBatch].classList.add("active");
  }

  function startRotation() {
    stopRotation();
    interval = setInterval(() => {
      currentBatch = (currentBatch + 1) % Math.max(1, Math.ceil(highlights.length / batchSize));
      renderBatch();
    }, rotationDelay);
  }

  function stopRotation() {
    clearInterval(interval);
  }

  function resetRotation() {
    stopRotation();
    startRotation();
  }

  // tiny helper to avoid XSS if any titles/descriptions come from external sources
  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
});
