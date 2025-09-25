// js/detail-page.js

// Get the 'id' from query parameters, e.g., article-project-detail.html?id=abc-bishnupur
const urlParams = new URLSearchParams(window.location.search);
const contentId = urlParams.get('id');

if (contentId && contentData[contentId]) {
    const content = contentData[contentId];
    document.getElementById('detail-title').innerText = content.title;
    document.getElementById('detail-subtitle').innerText = content.subtitle;
    document.getElementById('detail-date').innerText = content.date;
    document.getElementById('detail-category').innerText = content.category;
    document.getElementById('detail-image').src = content.image;
    document.getElementById('detail-image').alt = content.title;
    document.getElementById('detail-body').innerHTML = content.body;
} else {
    document.getElementById('detail-title').innerText = "Content not found";
    document.getElementById('detail-body').innerHTML = "<p>Sorry, the requested article or project does not exist.</p>";
}
