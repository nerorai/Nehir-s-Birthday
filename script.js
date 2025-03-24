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


doorButton.addEventListener("click", () => {
  createPopupMessage(
    "doorMessage",
    [
      {
        id: "J1",
        textKey: "doNothing?",
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

  if (wrongAttempts == 3) {
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
  window.location.href = "cake.html";
});
