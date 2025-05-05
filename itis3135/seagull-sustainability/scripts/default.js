document.addEventListener("DOMContentLoaded", () => {
  const includeElements = document.querySelectorAll("[data-include]");

  includeElements.forEach((el) => {
    const file = el.getAttribute("data-include");

    fetch(file)
      .then((response) => {
        if (!response.ok) throw new Error(`Could not fetch ${file}`);
        return response.text();
      })
      .then((data) => {
        el.innerHTML = data;
      })
      .catch((error) => {
        console.error("Include error:", error);
        el.innerHTML = "<p>Failed to load content.</p>";
      });
  });

  // Swiper setup for product cards
  new Swiper(".card-swiper", {
    loop: true,
    spaceBetween: 24,
    grabCursor: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    breakpoints: {
      600: {
        slidesPerView: 1
      },
      768: {
        slidesPerView: 2
      },
      1024: {
        slidesPerView: 3
      }
    }
  });
});
