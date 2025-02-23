document.addEventListener("DOMContentLoaded", function () {
  userRadios.forEach((radio) => (radio.checked = false));
});

window.onload = function () {
  let radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => (radio.checked = false));
};

const numConfetti = window.innerWidth < 600 ? 30 : 50; // Reduce confetti on small screens

function createConfetti() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * 120 + "vw";
  confetti.style.top = Math.random() * 10 + "vh";
  confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
  confetti.style.animationDuration = Math.random() * 3 + 1 + "s";
  document.body.appendChild(confetti);
  setTimeout(() => confetti.remove(), 3000);
}
setInterval(createConfetti, 350);

const userRadios         = document.querySelectorAll('input[name="user"]');
const animatedBackground = document.getElementById("animated-bg")
const homepage           = document.getElementById('HomePage');
const doorButton         = document.getElementById("door-button");
const whitedoor          = document.getElementById("Whitedoor");
const pic                = document.getElementById("pic");
const selection1         = document.getElementById('Selection-1');
const proceedButton      = document.getElementById('B-2');
const questions          = document.getElementById('Questions');
const Q1                 = document.getElementById('Q1');
const Q2                 = document.getElementById('Q2');
const Q3                 = document.getElementById('Q3');
const yesQ1              = document.getElementById('B-3');
const noQ1               = document.getElementById('B-4');
const yesQ2              = document.getElementById('B-5');
const noQ2               = document.getElementById('B-6');
const yesQ3              = document.getElementById('B-7');
const yesQ33             = document.getElementById('B-8');
const finalSelection     = document.getElementById('Selection-2');
const cbx5               = document.getElementById('cbx5');
const confirmFinalButton = document.getElementById('B-9');
const congratsPage       = document.getElementById("CongratsPage");
const yayyButton         = document.getElementById("B-10");
const securityBox        = document.getElementById("SecurityBox");
const doNothingButton    = document.getElementById("B-11");
const continueButton     = document.getElementById("B-12");
const GameBG             = document.getElementById("GameBG");
const gameBoard          = document.getElementById("gameBoard");



let audioContext;
let typingSoundSource = null;

function loadAudio() {
  fetch("data/sounds/omori.mp3")
    .then((response) => response.arrayBuffer())
    .then((data) => audioContext.decodeAudioData(data))
    .then((buffer) => {
      typingSoundBuffer = buffer;
    });
}

function initAudio() {
  audioContext = new (window.AudioContext || window.AudioContext)();
  loadAudio();
}

function playTypingSound() {
  if (!typingSoundBuffer) return;

  typingSoundSource = audioContext.createBufferSource();
  typingSoundSource.buffer = typingSoundBuffer;
  typingSoundSource.loop = true;
  typingSoundSource.connect(audioContext.destination);
  typingSoundSource.start();
}

function stopTypingSound() {
  if (typingSoundSource) {
    typingSoundSource.stop();
    typingSoundSource.disconnect();
  }
}

initAudio();

let openPopups = 0;

// Remove the global typingSoundSource variable
let typingSoundBuffer = null;

function stopTypingSound() {
  // This function is no longer needed as each popup manages its own sound
}

function createPopupMessage(
  message,
  buttons,
  speed,
  pauseAtChar,
  pauseDuration
) {
  openPopups++;
  if (openPopups === 1) {
    document.body.classList.add("disable-interaction");
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  const popup = document.createElement("div");
  popup.classList.add("alert-box");
  popup.innerHTML = `
    <p><span id="popup-text"></span></p>
    <div>
      ${buttons
        .map((button) => `<button id="${button.id}">${button.text}</button>`)
        .join("")}
    </div>
  `;
  document.body.appendChild(popup);

  const textElement = popup.querySelector("#popup-text");
  let i = 0;

  popup.querySelectorAll("button").forEach((button) => {
    button.style.opacity = "0";
    button.style.transition = "opacity 0.5s ease-in-out";
  });

  let currentSoundSource = null;

  function startSound() {
    if (!typingSoundBuffer) return;
    if (currentSoundSource) {
      currentSoundSource.stop();
      currentSoundSource.disconnect();
    }
    currentSoundSource = audioContext.createBufferSource();
    currentSoundSource.buffer = typingSoundBuffer;
    currentSoundSource.loop = true;
    currentSoundSource.connect(audioContext.destination);
    currentSoundSource.start();
  }

  function stopSound() {
    if (currentSoundSource) {
      currentSoundSource.stop();
      currentSoundSource.disconnect();
      currentSoundSource = null;
    }
  }

  startSound();

  function type() {
    if (i < message.length) {
      textElement.textContent += message.charAt(i);
      i++;

      if (i === pauseAtChar) {
        stopSound();
        setTimeout(() => {
          startSound();
          type();
        }, pauseDuration);
      } else {
        setTimeout(type, speed);
      }
    } else {
      stopSound();
      popup.querySelectorAll("button").forEach((button) => {
        button.style.opacity = "1";
      });
    }
  }

  type();

  buttons.forEach((button) => {
    const btnElement = popup.querySelector(`#${button.id}`);
    btnElement.addEventListener("click", () => {
      stopSound();
      popup.remove();
      openPopups--;

      if (openPopups === 0) {
        document.body.classList.remove("disable-interaction");
      }

      if (typeof button.action === "function") {
        button.action();
      }
    });
  });
}

document.addEventListener("click", initAudio, { once: true });

function switchPage(currentPage, nextPage) {
  currentPage.classList.add("fade-out");
  setTimeout(() => {
    currentPage.classList.add("hidden");
    currentPage.classList.remove("fade-out");
    nextPage.classList.remove("hidden");
    nextPage.classList.add("fade-in");
    setTimeout(() => {
      nextPage.classList.remove("fade-in");
    }, 500);
  }, 500);
}

doorButton.addEventListener("click", () => {
  createPopupMessage(
    "A white door casts a faint shadow. \nWhat would you like to do?",
    [
      {
        id: "J1",
        text: "DO NOTHING",
        action: () => {
          
          
        
        },
      },
      { id: "J2", text: "DO NOTHING", action: () => {} },
    ],
    40
  ); // Speed set to 40ms
});

userRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Nehir") {
      proceedButton.textContent = "Click here, four eyes";
    } else {
      proceedButton.textContent = "Proceed";
      proceedButton.style.transition = "transform 0.3s ease";
      proceedButton.style.transform = "translate(0, 0)";
      clickCount = 0;
    }
  });
});

let clickCount = 0;
let animationFrameId = null;

proceedButton.addEventListener("click", () => {
  const selectedUser = document.querySelector('input[name="user"]:checked');
  if (selectedUser.value === "Nehir") {
    clickCount++;

    if (clickCount === 1 || clickCount === 2 || clickCount === 3) {
      const moveX = Math.random() * 350 - 250;
      const moveY = Math.random() * 350 - 250;
      proceedButton.style.transition = "transform 0.5s ease";
      proceedButton.style.transform = `translate(${moveX}px, ${moveY}px)`;

      if (clickCount === 3) {
        createPopupMessage(
          "Nehir.. do you have your glasses on?",
          [
            {
              id: "J7",
              text: "NO",
              action: () => {
                createPopupMessage(
                  "...Just click the button.",
                  [{ id: "J4", text: "Continue", action: () => {} }],
                  40,
                  3,
                  2000
                );
              },
            },
            {
              id: "J8",
              text: "YES",
              action: () => {
                createPopupMessage(
                  "...Maybe it's finally time to wear 2 glasses.",
                  [{ id: "J4", text: "Continue", action: () => {} }],
                  40,
                  3,
                  2000
                );
              },
            },
          ],
          60,
          7,
          2000
        );
      }
    }
  }
  if (selectedUser && selectedUser.value === "Nehir" && clickCount === 4) {
    switchPage(selection1, questions);
  }
});

yesQ1.addEventListener("click", () => {
  switchPage(Q1, Q2);
});
noQ1.addEventListener("click", () => {
  createPopupMessage(
    "You’re still welcome ♡.",
    [
      {
        id: "J3",
        text: "Okay!",
        action: () => {
          createPopupMessage(
            "NOW GO BACK AND CLICK YOUR NAME.",
            [
              {
                id: "J4",
                text: "Go back",
                action: () => {
                  switchPage(questions, selection1);
                  userRadios.forEach((radio) => (radio.checked = false));
                  proceedButton.style.transition = "none";
                  proceedButton.style.transform = "translate(0, 0)";
                  clickCount = 0;
                  proceedButton.textContent = "Proceed";
                },
              },
            ],
            40
          ); // Speed
        },
      },
    ],
    40
  ); // Speed
});

yesQ2.addEventListener("click", () => {
  switchPage(Q2, Q3);
});

noQ2.addEventListener("click", () => {
  createPopupMessage(
    "You’re still welcome ♡.",
    [
      {
        id: "J5",
        text: "Okay!",
        action: () => {
          createPopupMessage(
            "NOW GO BACk AND CLICK YOUR NAME.",
            [
              {
                id: "J6",
                text: "Go back",
                action: () => {
                  switchPage(questions, selection1);
                  userRadios.forEach((radio) => (radio.checked = false));
                  proceedButton.style.transition = "none";
                  proceedButton.style.transform = "translate(0, 0)";
                  clickCount = 0;
                  proceedButton.textContent = "Proceed";
                },
              },
            ],
            40
          );
        },
      },
    ],
    40
  );
});

yesQ3.addEventListener("click", () => {
  createPopupMessage(
    "I'm still not sure you're Nehir.",
    [{ id: "J6", text: "Continue", action: () => {} }],
    40
  );
  userRadios.forEach((radio) => (radio.checked = false));
  switchPage(Q3, finalSelection);
});

yesQ33.addEventListener("click", () => {
  createPopupMessage(
    "I'm still not sure you're Nehir.",
    [{ id: "J6", text: "Continue", action: () => {} }],
    40
  );
  userRadios.forEach((radio) => (radio.checked = false));
  switchPage(Q3, finalSelection);
});

let wrongAttempts = 0;

confirmFinalButton.addEventListener("click", () => {
  const selectedChoice = document.querySelector(
    'input[name="final-choice"]:checked'
  );

  if (!selectedChoice) {
    createPopupMessage(
      "Umm.. you choosed nothing.",
      [{ id: "J20", text: "Okay", action: () => {} }],
      40
    );
    return;
  }

  if (wrongAttempts === 2) {
    wrongAttempts++;
    createPopupMessage(
      "What are you trying to do? \nThe real Nehir would have known from the first glance.",
      [
        {
          id: "J13",
          text: "Continue",
          action: () => {
            createPopupMessage(
              "Is that you, Nehir?",
              [
                { id: "J14", text: "YES.", action: () => {} },
                { id: "J15", text: "Of-Course I'm N-Nehir.", action: () => {} },
              ],
              40
            );
            return;
          },
        },
      ],
      40,
      26,
      1500
    );
    return;
  }

  if (selectedChoice.id == "cbx5") {
    wrongAttempts = 0;
    switchPage(finalSelection, congratsPage);
    createPopupMessage(
      "WElcome, Nehir.",
      [{ id: "J21", text: "Continue", action: () => {} }],
      140
    );
  }

  if (selectedChoice.id !== "cbx5") {
    wrongAttempts++;

    switch (selectedChoice.id) {
      case "cbx2":
        createPopupMessage(
          "What Ronaldo?",
          [{ id: "J16", text: "Continue", action: () => {} }],
          40
        );
        break;
      case "cbx4":
        createPopupMessage(
          "Nani? That's Japanese for 'what?'... which is what I'm saying!?",
          [{ id: "J17", text: "Continue", action: () => {} }],
          40
        );
        break;
      case "cbx1":
        createPopupMessage(
          "Arigato means thanks...\nbut no thanks for wrong answers.",
          [{ id: "J18", text: "Continue", action: () => {} }],
          40
        );
        break;
      case "cbx3":
        createPopupMessage(
          "Please don't try again. We have an unbreakable security system.",
          [{ id: "J19", text: "Continue", action: () => {} }],
          40
        );
        break;
    }
  }
});

yayyButton.addEventListener("click", () => {
  switchPage(congratsPage, securityBox);
});

doNothingButton.addEventListener("click", () => {
  createPopupMessage(
    "You did 'Nothing'.",
    [{ id: "J20", text: "Okay", action: () => {} }],
    40
  );
  return;
})

continueButton.addEventListener("click", () => {
  createPopupMessage(
    "Finally, you came this far.",
    [
      {
        id: "J21",
        text: "Continue",
        action: () => {
          createPopupMessage(
            "It's best if you play this stage on a laptop. \nIf you're on mobile, turn your phone sideways.",
            [
              {
                id: "J22",
                text: "Okay",
                action: () => {
                  window.location.href = "Game-demo/game.html";
                },
              },
            ],
            40
          );
        },
      },
    ],
    40
  );
});

