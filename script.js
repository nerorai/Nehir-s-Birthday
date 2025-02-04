document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("input"); // New toggle button ID
  const body = document.body;

  // Load saved theme from localStorage
  if (localStorage.getItem("darkTheme") === "true") {
    toggle.checked = true;
    body.classList.add("dark-mode");
  }

  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      body.classList.add("dark-mode");
      localStorage.setItem("darkTheme", "true");
    } else {
      body.classList.remove("dark-mode");
      localStorage.setItem("darkTheme", "false");
    }
  });
});

// Uncheck all radio buttons when the page loads
window.onload = () => {
  userRadios.forEach(radio => (radio.checked = false));
};


// Get elements
const clickMeButton = document.querySelector('button');
const selectionPage = document.getElementById('selection-page');
const proceedButton = document.getElementById('proceed-button');
const userRadios = document.querySelectorAll('input[name="user"]');

let clickCount = 0;

// Show the selection page when "Click Me" is clicked
clickMeButton.addEventListener('click', () => {
  document.querySelector('.container').classList.add('hidden'); // Hide homepage
  selectionPage.classList.remove('hidden'); // Show selection page
});

// Update button text and reset position when user changes
userRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'Nehir') {
      proceedButton.textContent = 'Click here, four eyes';
    } else {
      proceedButton.textContent = 'Proceed';
      // Reset button position and transform
      proceedButton.style.transition = 'transform 0.3s ease';
      proceedButton.style.transform = 'translate(0, 0)';
      clickCount = 0; // Reset click count
    }
  });
});

// Handle proceed button click
proceedButton.addEventListener('click', () => {
  const selectedUser = document.querySelector('input[name="user"]:checked');
  if (!selectedUser) {
    alert('Please select an option before proceeding.');
    return;
  }

  if (selectedUser.value === 'Nehir') {
    clickCount++;

    // Move the button on first and second clicks
    if (clickCount === 1 || clickCount === 2) {
      const moveX = (Math.random() * 100 - 50); // Move more (between -50px and 50px)
      const moveY = (Math.random() * 100 - 50); // Move more (between -50px and 50px)
      proceedButton.style.transition = 'transform 0.5s ease'; // Smooth animation
      proceedButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
    // Proceed on the third click
    if (clickCount === 3) {
      alert('Proceeding to the next thing...'); // Replace with your next action
      clickCount = 0; // Reset click count
      proceedButton.style.transform = 'translate(0, 0)'; // Reset position
    }
  } else {
    // Proceed immediately for other users
    alert(`You selected: ${selectedUser.value}`);
  }
});