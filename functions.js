document.addEventListener("DOMContentLoaded", function () {
  userRadios.forEach((radio) => (radio.checked = false));
});

window.onload = function () {
  let radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach((radio) => (radio.checked = false));
};

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

const spcontainer = document.getElementById('sp-container');
const openButton = document.querySelector('.toggle-btn');


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
