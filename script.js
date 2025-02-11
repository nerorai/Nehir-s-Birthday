document.addEventListener("DOMContentLoaded", function () {
  userRadios.forEach(radio => (radio.checked = false));
});

const numConfetti = window.innerWidth < 600 ? 30 : 50; // Reduce confetti on small screens

function createConfetti() {
    for (let i = 0; i < numConfetti; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.animationDuration = `${Math.random() * 2 + 2}s`;
        document.body.appendChild(confetti);
        confetti.addEventListener("animationend", () => {
            confetti.remove();
        });
    }
}
window.onload = createConfetti;

// Run confetti effect after the page loads
window.onload = createConfetti;

// Get elements
const homepage = document.getElementById('HomePage');
const clickMeButton = document.querySelector('button');
const selectionPage = document.getElementById('selection-page');
const proceedButton = document.getElementById('proceed-button');
const userRadios = document.querySelectorAll('input[name="user"]');
const confirmationPage = document.getElementById('confirmation-page');
const Q1 = document.getElementById('Q1');
const Q2 = document.getElementById('Q2');
const Q3 = document.getElementById('Q3');
const finalSelection = document.getElementById('final-selection');
const yesQ1 = document.getElementById('yes-q1');
const noQ1 = document.getElementById('no-q1');
const yesQ2 = document.getElementById('yes-q2');
const noQ2 = document.getElementById('no-q2');
const yesQ3 = document.getElementById('yes-q3');
const yes2Q3 = document.getElementById('yes2-q3');
const confirmFinalButton = document.getElementById('confirm-final');
const cbx5 = document.getElementById('cbx5');
const congratsPage = document.getElementById("congratsPage");
const securityBox = document.getElementById("securityBox");
const continueButton = document.getElementById("continue-button");
const doNothingButton = document.getElementById("do-nothing-button");
const yayyButton = document.getElementById("yayy-button");
const doorButton = document.getElementById("door-button");
const whitedoortext = document.getElementById("text-1");
const whitedoor = document.getElementById("Whitedoor");
const pic = document.getElementById("pic");

let audioContext;
let typingSoundBuffer;
let typingSoundSource;

function loadAudio() {
    fetch('sounds/omori.mp3')
        .then(response => response.arrayBuffer())
        .then(data => audioContext.decodeAudioData(data))
        .then(buffer => {
            typingSoundBuffer = buffer;
        });
}

function initAudio() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
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

function createPopupMessage(message, buttons, speed = 50) {
    document.body.classList.add('disable-interaction');

    const popup = document.createElement('div');
    popup.classList.add('alert-box');
    popup.innerHTML = `
      <p><span id="popup-text"></span></p>
      <div>
        ${buttons.map(button => `<button id="${button.id}">${button.text}</button>`).join('')}
      </div>
    `;
    document.body.appendChild(popup);

    const textElement = popup.querySelector('#popup-text');
    let i = 0;

    playTypingSound();

    // Typewriter effect function
    function type() {
        if (i < message.length) {
            textElement.textContent += message.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            stopTypingSound();
        }
    }
    type();
    buttons.forEach(button => {
        const btnElement = popup.querySelector(`#${button.id}`);
        btnElement.addEventListener('click', () => {
            button.action();
            document.body.classList.remove('disable-interaction');
            popup.remove();
            stopTypingSound(); 
        });
    });
}

// Ensure audio initializes only on user interaction
document.addEventListener('click', initAudio, { once: true });

doorButton.addEventListener('click', () => {
  createPopupMessage("A white door casts a faint shadow. \nWhat would you like to do?", [
    { id: "J1", text: "OPEN THE DOOR", action: () => {
      document.querySelector('.pic').classList.add('hidden');
      homepage.classList.add('hidden');
    }},
    { id: "J2", text: "DO NOTHING", action: () => {} }
  ], 40); // Speed set to 40ms
});