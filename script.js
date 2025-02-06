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

// Get elements
const clickMeButton = document.querySelector('button');
const selectionPage = document.getElementById('selection-page');
const proceedButton = document.getElementById('proceed-button');
const userRadios = document.querySelectorAll('input[name="user"]');
const confirmationPage = document.getElementById('confirmation-page');
const q1 = document.getElementById('q1');
const q2 = document.getElementById('q2');
const q3 = document.getElementById('q3');
const finalSelection = document.getElementById('final-selection');
const yesQ1 = document.getElementById('yes-q1');
const noQ1 = document.getElementById('no-q1');
const yesQ2 = document.getElementById('yes-q2');
const noQ2 = document.getElementById('no-q2');
const yesQ3 = document.getElementById('yes-q3');
const yes2Q3 = document.getElementById('yes2-q3');
const confirmFinalButton = document.getElementById('confirm-final');
const cbx5 = document.getElementById('cbx5');

// Uncheck all radio buttons when the page loads
window.onload = () => {
  userRadios.forEach(radio => (radio.checked = false)); // Uncheck radio buttons
};
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
  if (selectedUser.value === 'Nehir') {
    clickCount++;

    // Move the button on first and second clicks
    if (clickCount === 1 || clickCount === 2) {
      const moveX = (Math.random() * 100 - 50); // Move more (between -50px and 50px)
      const moveY = (Math.random() * 100 - 50); // Move more (between -50px and 50px)
      proceedButton.style.transition = 'transform 0.5s ease'; // Smooth animation
      proceedButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
    }
  } 
});

// Show confirmation page when Nehir is chosen
proceedButton.addEventListener('click', () => {
  const selectedUser = document.querySelector('input[name="user"]:checked');
  if (selectedUser && selectedUser.value === 'Nehir' && clickCount === 3) {
    selectionPage.classList.add('hidden');
    confirmationPage.classList.remove('hidden');
    q1.classList.remove('hidden');
  }
});

// Handle Q1: Are you Sure?
yesQ1.addEventListener('click', () => {
  q1.classList.add('hidden');
  q2.classList.remove('hidden');
});

noQ1.addEventListener('click', () => {
  confirmationPage.classList.add('hidden');
  selectionPage.classList.remove('hidden');
});

// Handle Q2: Are you really sure?
yesQ2.addEventListener('click', () => {
  q2.classList.add('hidden');
  q3.classList.remove('hidden');
});

noQ2.addEventListener('click', () => {
  confirmationPage.classList.add('hidden');
  selectionPage.classList.remove('hidden');
});

// Handle Q3: Like.. are you really Nehir?
yesQ3.addEventListener('click', () => {
  q3.classList.add('hidden');
  finalSelection.classList.remove('hidden');
});

yes2Q3.addEventListener('click', () => {
  q3.classList.add('hidden');
  finalSelection.classList.remove('hidden');
});

// Handle "No" button in "Are you Sure?" section
noQ1.addEventListener('click', () => {
  createPopupMessage("You’re still welcome ♡.", [
    { id: "okay-button", text: "Okay", action: () => {
      document.querySelector('.message-box').remove();
      createPopupMessage("NOW GO AND CLICK YOUR NAME.", [
        { id: "okay-button", text: "Okay", action: () => {
          document.querySelector('.message-box').remove();
          confirmationPage.classList.add('hidden'); // Hide confirmation page
          selectionPage.classList.remove('hidden'); // Show selection page
        }}
      ]);
    }}
  ]);
});

// Handle "No" button in "Are you really sure?" section
noQ2.addEventListener('click', () => {
  createPopupMessage("You’re still welcome ♡.", [
    { id: "okay-button", text: "Okay", action: () => {
      document.querySelector('.message-box').remove();
      createPopupMessage("NOW GO AND CLICK YOUR NAME.", [
        { id: "okay-button", text: "Okay", action: () => {
          document.querySelector('.message-box').remove();
          confirmationPage.classList.add('hidden'); // Hide confirmation page
          selectionPage.classList.remove('hidden'); // Show selection page
        }}
      ]);
    }}
  ]);
});

// the falling animations
const numConfetti = 30;

function createConfetti() {
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        document.body.appendChild(confetti);
    }
}

window.onload = createConfetti;

// Handle confirmation button click
confirmFinalButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="final-choice"]:checked');

  // Only proceed if "Soya" is selected
  if (selectedOption && selectedOption.id === 'cbx5') {
    // Hide the final selection page
    finalSelection.classList.add('hidden');

    // Create a new page for the "Congratulation" message
    const congratsPage = document.createElement('div');
    congratsPage.innerHTML = `
      <div class="message-box">
        <h2>Congratulation dostum, you passed the security system</h2>
        <button id="yayy-button">Yayy</button>
      </div>
    `;
    document.body.appendChild(congratsPage);

    // Handle "Yayy" button click
    const yayyButton = document.getElementById('yayy-button');
    yayyButton.addEventListener('click', () => {
      // Remove the "Congratulation" message box
      congratsPage.remove();

      // Create a new message box for the security system explanation
      const securityMessageBox = document.createElement('div');
      securityMessageBox.innerHTML = `
        <div class="message-box">
          <p>Why all this you say? This is our super intelligent most advanced security system, merely to ensure that you’re the real Nehir.</p>
          <button id="continue-button">Continue</button>
          <button id="do-nothing-button">Do nothing</button>
        </div>
      `;
      document.body.appendChild(securityMessageBox);

      // Handle "Do nothing" button click
      const doNothingButton = document.getElementById('do-nothing-button');
      doNothingButton.addEventListener('click', () => {
        // Create a floating message
        const floatingMessage = document.createElement('div');
        floatingMessage.classList.add('floating-message');
        floatingMessage.innerHTML = `
          <p>You did nothing</p>
          <button>...</button>
        `;
        document.body.appendChild(floatingMessage);

        // Close the floating message when the "..." button is clicked
        const closeButton = floatingMessage.querySelector('button');
        closeButton.addEventListener('click', () => {
          floatingMessage.remove();
        });
      });
    });
  }
});

let wrongAttempts = 0;

// Function to create a popup message
function createPopupMessage(message, buttons) {
  // Disable interaction with the rest of the page
  document.body.classList.add('disable-interaction');

  const popup = document.createElement('div');
  popup.classList.add('message-box');
  popup.innerHTML = `
    <p>${message}</p>
    <div>
      ${buttons.map(button => `<button id="${button.id}">${button.text}</button>`).join('')}
    </div>
  `;
  document.body.appendChild(popup);

  // Handle button clicks
  buttons.forEach(button => {
    const btnElement = document.getElementById(button.id);
    btnElement.addEventListener('click', () => {
      button.action(); // Run the button's action
      document.body.classList.remove('disable-interaction'); // Re-enable interaction
      popup.remove(); // Remove the message box
    });
  });
}

// Function to handle wrong attempts
function handleWrongAttempt() {
  wrongAttempts++;
  if (wrongAttempts === 3) {
    createPopupMessage("What are you trying to do? The real Nehir would have known from the first glance.", [
      { id: "okay-button", text: "Okay", action: () => {
        createPopupMessage("Is that you Nehir?", [
          { id: "yes-button", text: "Yes", action: () => {
            // Handle "Yes" action if needed
          }},
          { id: "ofcourse-button", text: "O-Ofcourse I'm N-Nehir", action: () => {
            // Handle "Ofcourse" action if needed
          }}
        ]);
      }}
    ]);
    return true; // Return true to indicate the popup was triggered
  }

  if (wrongAttempts === 7) {
    createPopupMessage("Trying to test something?", [
      { id: "okay-button", text: "Okay", action: () => {
        // Handle "Okay" action if needed
      }}
    ]);
    return true; // Return true to indicate the popup was triggered
  }

  return false; // Return false if no popup was triggered
}


// Handle final selection button click
confirmFinalButton.addEventListener('click', () => {
  const selectedOption = document.querySelector('input[name="final-choice"]:checked');

  if (selectedOption) {
    // Check if the wrong attempts popup was triggered
    const wrongAttemptsPopupTriggered = handleWrongAttempt();

    // If the wrong attempts popup was triggered, do not show the specific choice popup
    if (wrongAttemptsPopupTriggered) {
      return; // Exit the function early
    }

    switch (selectedOption.id) {
      case 'cbx1': // Arigato
      case 'cbx3': // Soywa
      case 'cbx4': // Nani
        createPopupMessage("Please don't try again. We have an unbreakable security system.", [
          { id: "okay-button", text: "Okay", action: () => {
            document.querySelector('.message-box').remove();
          }}
        ]);
        break;
      case 'cbx2': // Ronaldo
        createPopupMessage("What Ronaldo?", [
          { id: "okay-button", text: "Okay", action: () => {
            document.querySelector('.message-box').remove();
          }}
        ]);
        break;
      case 'cbx5': // Soya
        // Do nothing, as per your request
        break;
    }
  }
});