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

let currentLang = "en";
let langData = {};

function loadLanguage(lang) {
  fetch("lang.json")
    .then((response) => response.json())
    .then((data) => {
      currentLang = lang;
      langData = data[lang];
      updateTextContent(langData);
    });
}

document.getElementById("language-selector").addEventListener("change", (e) => {
  loadLanguage(e.target.value);
});

function updateTextContent(langData) {
  document.querySelectorAll("[data-lang-key]").forEach((element) => {
    const key = element.getAttribute("data-lang-key");
    element.textContent = langData[key];
  });
}

loadLanguage(currentLang);

function getTranslation(key) {
  return langData[key] || langData["en"][key];
}

document.addEventListener("DOMContentLoaded", function () {
  const languageSelector = new Choices("#language-selector", {
    searchEnabled: false, 
    itemSelectText: "",
  });

  languageSelector.setChoiceByValue("en");

  loadLanguage("en");

  languageSelector.passedElement.element.addEventListener("change", function (event) {
    const selectedLanguage = event.detail.value;
    loadLanguage(selectedLanguage);
  });
});

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
const languageSelector   = document.getElementById("language-selector-container")
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

let typingSoundBuffer = null;

function createPopupMessage(
  messageKey,
  buttons,
  speed,
  pauseAtChar,
  pauseDuration
) {
  const message = getTranslation(messageKey);
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
        .map(
          (button) =>
            `<button id="${button.id}">${getTranslation(
              button.textKey
            )}</button>`
        )
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
    "doorMessage",
    [
      {
        id: "J1",
        textKey: "openDoor",
        action: () => {
        },
      },
      { id: "J2", textKey: "doNothing", action: () => {} },
    ],
    40
  );
});

userRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Nehir") {
      proceedButton.textContent = getTranslation("clickHereFourEyes");
    } else {
      proceedButton.textContent = getTranslation("proceed");
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
      const moveX = Math.random() * 350 - 350;
      const moveY = Math.random() * 350 - 350;
      proceedButton.style.transition = "transform 0.5s ease";
      proceedButton.style.transform = `translate(${moveX}px, ${moveY}px)`;

      if (clickCount === 3) {
        createPopupMessage(
          "glassesQuestion",
          [
            {
              id: "J7",
              textKey: "no",
              action: () => {
                createPopupMessage(
                  "justClickButton",
                  [{ id: "J4", textKey: "continue", action: () => {} }],
                  40,
                  3,
                  2000
                );
              },
            },
            {
              id: "J8",
              textKey: "yes",
              action: () => {
                createPopupMessage(
                  "wearTwoGlasses",
                  [{ id: "J4", textKey: "continue", action: () => {} }],
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
    "stillWelcome",
    [
      {
        id: "J3",
        textKey: "okay",
        action: () => {
          createPopupMessage(
            "goBackAndClickName",
            [
              {
                id: "J4",
                textKey: "goBack",
                action: () => {
                  switchPage(questions, selection1);
                  userRadios.forEach((radio) => (radio.checked = false));
                  proceedButton.style.transition = "none";
                  proceedButton.style.transform = "translate(0, 0)";
                  clickCount = 0;
                  proceedButton.textContent = getTranslation("proceed");
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

yesQ2.addEventListener("click", () => {
  switchPage(Q2, Q3);
});

noQ2.addEventListener("click", () => {
  createPopupMessage(
    "stillWelcome",
    [
      {
        id: "J5",
        textKey: "okay",
        action: () => {
          createPopupMessage(
            "goBackAndClickName",
            [
              {
                id: "J6",
                textKey: "goBack",
                action: () => {
                  switchPage(questions, selection1);
                  userRadios.forEach((radio) => (radio.checked = false));
                  proceedButton.style.transition = "none";
                  proceedButton.style.transform = "translate(0, 0)";
                  clickCount = 0;
                  proceedButton.textContent = getTranslation("proceed");
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
    "notSureNehir",
    [{ id: "J6", textKey: "continue", action: () => {} }],
    40
  );
  userRadios.forEach((radio) => (radio.checked = false));
  switchPage(Q3, finalSelection);
});

yesQ33.addEventListener("click", () => {
  createPopupMessage(
    "notSureNehir",
    [{ id: "J6", textKey: "continue", action: () => {} }],
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
      "chooseNothing",
      [{ id: "J20", textKey: "okay", action: () => {} }],
      40
    );
    return;
  }

  if (wrongAttempts === 2) {
    wrongAttempts++;
    createPopupMessage(
      "thirdWrongAttempt",
      [
        {
          id: "J25",
          textKey: "continue",
          action: () => {
            createPopupMessage(
              "realNehirWouldKnow",
              [
                {
                  id: "J13",
                  textKey: "continue",
                  action: () => {
                    createPopupMessage(
                      "isThatYouNehir",
                      [
                        { id: "J14", textKey: "yes", action: () => {} },
                        {
                          id: "J15",
                          textKey: "ofCourseNehir",
                          action: () => {
                            createPopupMessage(
                              "gettingSuspicious",
                              [
                                {
                                  id: "J26",
                                  textKey: "continue",
                                  action: () => {},
                                },
                              ],
                              40
                            );
                            return;
                          },
                        },
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
          },
        },
      ],
      40
    );
    return;
  }

  if (selectedChoice.id == "cbx5") {
    wrongAttempts = 0;
    switchPage(finalSelection, congratsPage);
    createPopupMessage(
      "welcomeNehir",
      [{ id: "J21", textKey: "continue", action: () => {} }],
      140
    );
    return;
  }

  if (selectedChoice.id !== "cbx5") {
    wrongAttempts++;

    switch (selectedChoice.id) {
      case "cbx2":
        createPopupMessage(
          "whatRonaldo",
          [{ id: "J16", textKey: "continue", action: () => {} }],
          40
        );
        break;
      case "cbx4":
        createPopupMessage(
          "naniWhat",
          [{ id: "J17", textKey: "continue", action: () => {} }],
          40
        );
        break;
      case "cbx1":
        createPopupMessage(
          "arigatoThanks",
          [{ id: "J18", textKey: "continue", action: () => {} }],
          40
        );
        break;
      case "cbx3":
        createPopupMessage(
          "dontTryAgain",
          [{ id: "J19", textKey: "continue", action: () => {} }],
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
    "youDidNothing",
    [{ id: "J20", textKey: "okay", action: () => {} }],
    40
  );
  return;
});

continueButton.addEventListener("click", () => {
  createPopupMessage(
    "finallyCameThisFar",
    [
      {
        id: "J21",
        textKey: "continue",
        action: () => {
          createPopupMessage(
            "playOnLaptop",
            [
              {
                id: "J22",
                textKey: "okay",
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
