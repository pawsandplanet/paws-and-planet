Paws and Planet Website
This is the official website for Paws and Planet, a non-profit animal welfare organization dedicated to rescuing, protecting, and advocating for animals. The site is designed to share our story, showcase our projects, attract volunteers, and collect donations.

Table of Contents
Features

Technologies Used

Project Structure

Setup and Usage

Key Functionality

Features
Fully Responsive Design: The layout adapts seamlessly to all screen sizes, from mobile phones to desktop monitors.

Engaging Animations: Subtle scroll animations powered by the AOS library to enhance user experience.

Interactive Components: Includes custom carousels, animated number counters, and accordions for FAQs.

Dynamic Content System: A client-side "CMS" loads articles and project details dynamically from a JavaScript object, eliminating the need for a backend.

Functional Contact Form: A working contact form that uses Netlify Functions for secure email submission.

Comprehensive Sections: Dedicated pages for our mission, news, ways to get involved, and donation information.

Technologies Used
HTML5: For the core structure and content.

CSS3: For all styling, layouts (Flexbox/Grid), and animations.

JavaScript (ES6): For all interactivity, dynamic content loading, and form handling.

AOS (Animate On Scroll) Library: For scroll-triggered animations.

Netlify: The contact form is configured to work with Netlify Functions.

Project Structure
The project is organized into a clean and maintainable structure:

/
├── css/              # All CSS stylesheets
│   ├── global.css
│   ├── navbar.css
│   ├── footer.css
│   └── ... (page-specific styles)
├── js/               # All JavaScript files
│   ├── global.js
│   ├── main.js
│   ├── articles.js   # Client-side "database" for articles
│   └── ... (page-specific scripts)
├── assets/           # All images, logos, and icons
└── *.html            # All HTML pages (main.html, about.html, etc.)
Setup and Usage
This is a static website and requires no complex setup. To run it locally:

Clone or download the repository.

Open the project folder in your code editor.

Use a live server extension (like "Live Server" in VS Code) to launch the main.html file in your browser.

Key Functionality
Article/Project Pages: The article-project-detail.html page is a template. The article-project-details.js script reads the id from the URL (e.g., ?id=abc-bishnupur), finds the matching content in the articles.js file, and populates the page.

Contact Form: The form in contact-section.html is handled by contact.js, which sends the data to a Netlify serverless function located at /.netlify/functions/sendmail.