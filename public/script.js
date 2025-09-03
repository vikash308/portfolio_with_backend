const toggleBtn = document.getElementById("theme-toggle");
const icon = toggleBtn.querySelector("i");

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  icon.classList.toggle("fa-moon");
  icon.classList.toggle("fa-sun");
});
