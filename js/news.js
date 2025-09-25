
//Sticky Scroll
const newsNav = document.querySelector('.news-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    newsNav.classList.add('sticky');
  } else {
    newsNav.classList.remove('sticky');
  }
});
//Scroll Spy
// Select all navbar links and page sections
const navLinks = document.querySelectorAll('.news-nav a');
const sections = document.querySelectorAll('main section, .news-hero');

// Function to update active link
function updateActiveNav() {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120; // offset for navbar height
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

// Initial update
updateActiveNav();

// Listen for scroll
window.addEventListener('scroll', updateActiveNav);

//Donate-button-on-scroll
  window.addEventListener('scroll', function() {
    const donorLink = document.getElementById('donate-link');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // Show the link after scrolling 200px (adjust as needed)
    if (scrollPosition > 200) {
      donorLink.style.display = 'inline';
    } else {
      donorLink.style.display = 'none';
    }
  });