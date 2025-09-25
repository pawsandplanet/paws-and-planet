//FAQ
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});


//mail
const form = document.getElementById("contact-form");
const responseEl = document.getElementById("form-response");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("/.netlify/functions/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        responseEl.textContent = "Thanks! Your message was sent.";
        responseEl.style.display = "block";
        form.reset();
      } else {
        responseEl.textContent = "Oops! Something went wrong.";
        responseEl.style.display = "block";
      }
    } catch (err) {
      responseEl.textContent = "Network error. Please try again.";
      responseEl.style.display = "block";
    }
  });
}
