// Toggle Dark Mode
const themeCheckbox = document.getElementById('theme-checkbox');
const body = document.body;

themeCheckbox.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
});
