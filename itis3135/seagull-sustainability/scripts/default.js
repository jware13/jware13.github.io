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
});
