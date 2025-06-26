document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".releases__carousel--track");
  let cards = Array.from(track.querySelectorAll(".releases__card"));
  const prevBtn = document.querySelector(".left").closest(".releases__button");
  const nextBtn = document.querySelector(".right").closest(".releases__button");

  let currentIndex = 1;

  function renderCarousel() {
    track.innerHTML = "";

    const total = cards.length;

    const prev = cards[(currentIndex - 1 + total) % total];
    const center = cards[currentIndex % total];
    const next = cards[(currentIndex + 1) % total];

    const displayCards = [prev, center, next];

    displayCards.forEach((card, index) => {
      const clone = card.cloneNode(true);
      clone.classList.remove("center__card");
      clone.style.opacity = "0.9";
      clone.style.transform = "scale(0.85)";
      clone.style.zIndex = "1";

      if (index === 0) {
        clone.style.transform += " translateX(30px)";
      } else if (index === 2) {
        clone.style.transform += " translateX(-30px)";
      }

      if (index === 1) {
        clone.classList.add("center__card");
        clone.style.opacity = "1";
        clone.style.transform = "scale(1)";
        clone.style.zIndex = "3";
      }

      track.appendChild(clone);

      if (index === 0) track.appendChild(prevBtn);
      if (index === 1) track.appendChild(nextBtn);
    });
  }

  function previousSlide() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    renderCarousel();
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    renderCarousel();
  }

  function handleResponsive() {
    const width = window.innerWidth;
    if (width <= 480) {
      document.querySelectorAll(".releases__card").forEach(card => {
        card.style.transform = "scale(1)";
      });
    } else {
      renderCarousel();
    }
  }

  prevBtn.addEventListener("click", previousSlide);
  nextBtn.addEventListener("click", nextSlide);
  window.addEventListener("resize", handleResponsive);

  renderCarousel();
});


function contact(event) {
    event.preventDefault();

    const message = document.getElementById('message');

    emailjs
        .sendForm(
            'service_5nufpuf',
            'template_q56h19q',
            event.target,
            '5A7nE4A9eKeospPJF'
        )
        .then(() => {
            message.textContent = "Message sent successfully!";
            message.style.display = "block";
            message.style.color = "green";
            event.target.reset();
        })
        .catch(() => {
            message.textContent = "Email service unavailable. Please contact us at archersnetwork@dlsu.edu.ph";
            message.style.display = "block";
            message.style.color = "red";
        });
}
