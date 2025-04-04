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

let isTurkishFirstTime = true;
document.getElementById("language-selector").addEventListener("change", (e) => {
  const selectedLanguage = e.target.value;
  localStorage.setItem('selectedLanguage', selectedLanguage);

  if (selectedLanguage === "tr" && isTurkishFirstTime) {
    isTurkishFirstTime = false; 

    createPopupMessage(
      "tr_choosed", 
      [
        { id: "J28", textKey: "born_in",},
        { id: "J29", textKey: "nervous_okay",}
      ],
      40
    );
  }
  loadLanguage(selectedLanguage);
});

doorButton.addEventListener("click", () => {
  createPopupMessage(
    "door_open_prompt",
    [
      {
        id: "J1",
        textKey: "door_open",
        action: () => {
          doorButton.classList.add("hidden");
          languageSelector.classList.add("hidden");
          switchPage(homepage, selection1);
          animatedBackground.classList.remove("hidden");
        },
      },
      { id: "J2", textKey: "door_ignore", action: () => {} },
    ],
    40
  );
});

userRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "Nehir") {
      proceedButton.textContent = getTranslation("four_eyes_button");
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
          "glasses_question",
          [
            {
              id: "J7",
              textKey: "no",
              action: () => {
                createPopupMessage(
                  "four_eyes_button_click",
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
                  "glasses_double",
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
  if (selectedUser && selectedUser.value === "Emir") {
    createPopupMessage(
      "emir_choosed", 
      [
        {
          id: "J34",
          textKey: "hi1",
          action: () => {
          },
        },
        {
          id: "J35",
          textKey: "hi2",
          action: () => {
          },
        },
      ],
      40
    );
  }
  if (selectedUser && selectedUser.value === "Suna") {
    createPopupMessage(
      "suna_choosed", 
      [
        {
          id: "J34",
          textKey: "hi1",
          action: () => {
          },
        },
        {
          id: "J35",
          textKey: "hi2",
          action: () => {
          },
        },
      ],
      40
    );
  }
  if (selectedUser && selectedUser.value === "Ece") {
    createPopupMessage(
      "ece_choosed",
      [
        {
          id: "J34",
          textKey: "hi1",
          action: () => {
            createPopupMessage(
              "ece_hi_reply", 
              [
                {
                  id: "J34",
                  textKey: "continue",
                  action: () => {
                  },
                },
              ],
              70
            );
          },
        },
        {
          id: "J35",
          textKey: "hi2",
          action: () => {
            createPopupMessage(
              "ece_hi_reply", 
              [
                {
                  id: "J34",
                  textKey: "continue",
                  action: () => {
                  },
                },
              ],
              70
            );
          },
        },
      ],
      40
    );
  }
});

yesQ1.addEventListener("click", () => {
  switchPage(Q1, Q2);
});
noQ1.addEventListener("click", () => {
  createPopupMessage(
    "still_welcome",
    [
      {
        id: "J3",
        textKey: "okay",
        action: () => {
          createPopupMessage(
            "go_Back&Click",
            [
              {
                id: "J4",
                textKey: "go_Back",
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
    "still_welcome",
    [
      {
        id: "J5",
        textKey: "okay",
        action: () => {
          createPopupMessage(
            "go_Back&Click",
            [
              {
                id: "J6",
                textKey: "go_Back",
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
    "not_Sure",
    [{ id: "J6", textKey: "continue", action: () => {} }],
    40
  );
  userRadios.forEach((radio) => (radio.checked = false));
  switchPage(Q3, finalSelection);
});

yesQ33.addEventListener("click", () => {
  createPopupMessage(
    "not_Sure",
    [{ id: "J6", textKey: "continue", action: () => {} }],
    40
  );
  userRadios.forEach((radio) => (radio.checked = false));
  switchPage(Q3, finalSelection);
});

let wrongAttempts = 0;
let triggeredWrongAttempt = false;

confirmFinalButton.addEventListener("click", () => {
  const selectedChoice = document.querySelector(
    'input[name="final-choice"]:checked'
  );

  if (!selectedChoice) {
    createPopupMessage(
      "nothing_choosed",
      [{ id: "J20", textKey: "okay", action: () => {} }],
      40
    );
    return;
  }

  if (selectedChoice.id == "cbx5") {
    wrongAttempts = 0;
    triggeredWrongAttempt = false; // Reset the flag when the correct answer is chosen
    switchPage(finalSelection, congratsPage);
    createPopupMessage(
      "nehir_welcome",
      [{ id: "J21", textKey: "continue", action: () => {} }],
      140
    );
    return;
  }

  if (wrongAttempts == 2 && !triggeredWrongAttempt) {
    triggeredWrongAttempt = true; // Prevent it from triggering again
    createPopupMessage(
      "third_wrong_attempt",
      [
        {
          id: "J25",
          textKey: "continue",
          action: () => {
            createPopupMessage(
              "real_Nehir",
              [
                {
                  id: "J13",
                  textKey: "continue",
                  action: () => {
                    createPopupMessage(
                      "is_that_you",
                      [
                        { id: "J14", textKey: "yes", action: () => {} },
                        {
                          id: "J15",
                          textKey: "ofcourse_Nehir",
                          action: () => {
                            createPopupMessage(
                              "suspicious",
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

  if (selectedChoice.id !== "cbx5") {
    wrongAttempts++;

    switch (selectedChoice.id) {
      case "cbx2":
        createPopupMessage(
          "Ronaldo_message",
          [{ id: "J16", textKey: "continue", action: () => {} }],
          40
        );
        break;
      case "cbx4":
        createPopupMessage(
          "nani_message",
          [{ id: "J17", textKey: "continue", action: () => {} }],
          40
        );
        break;
      case "cbx1":
        createPopupMessage(
          "arigato_message",
          [{ id: "J18", textKey: "continue", action: () => {} }],
          40
        );
        break;
      case "cbx3":
        createPopupMessage(
          "soywa_message",
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
    "Did_Nothing",
    [{ id: "J20", textKey: "okay", action: () => {} }],
    40
  );
  return;
});

continueButton.addEventListener("click", () => {
  switchPage(securityBox, spcontainer);
  createPopupMessage(
    "city&soya_gift",
    [
      { id: "J28", textKey: "city", action: () => expandSide('left') },
      { id: "J29", textKey: "suna", action: () => expandSide('right') }
    ],
    40
  );
});

function expandSide(side) {
  const container = document.getElementById('sp-container');
  
  if (side === 'left') {
    container.classList.add('sp-active-left');
    container.classList.remove('sp-active-right');
    
    setTimeout(() => {
      container.classList.add('sp-hidden');
      window.location.href = "city_gift.html";
    }, 1600);
  } else {
    container.classList.add('sp-active-right');
    container.classList.remove('sp-active-left');
    
    setTimeout(() => {
      container.classList.add('sp-hidden');
      window.location.href = "suna_gift.html";
    }, 1600);
  }
}

document.querySelector('.pic').addEventListener('click', function() {
  const overlay = document.querySelector('.black-overlay');
  overlay.classList.toggle('active');
});

document.querySelector('.black-overlay').addEventListener('click', function() {               
  const overlay = this;
  this.style.pointerEvents = 'none';  
  createPopupMessage(
    "dark",
       [
      {
        id: "J31",
        textKey: "continue",
        action: () => {
          this.style.pointerEvents = '';
        },
      },
      { id: "J32", textKey: "quit", action: () => {
        this.style.pointerEvents = '';
        overlay.classList.remove('active');
      } },
    ],
    40
  );
});