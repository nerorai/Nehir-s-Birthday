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

// Get elements
const userRadios       = document.querySelectorAll('input[name="user"]');
const homepage         = document.getElementById('HomePage');
const selection1       = document.getElementById('Selection-1');
const proceedButton    = document.getElementById('B-2');
const questions        = document.getElementById('Questions');
const Q1               = document.getElementById('Q1');
const Q2               = document.getElementById('Q2');
const Q3               = document.getElementById('Q3');
const yesQ1            = document.getElementById('B-3');
const noQ1             = document.getElementById('B-4');
const yesQ2            = document.getElementById('B-5');
const noQ2             = document.getElementById('B-6');
const yesQ3            = document.getElementById('B-7');
const yesQ33           = document.getElementById('B-8');
const finalSelection   = document.getElementById('Selection-2');
const cbx5             = document.getElementById('cbx5');
const confirmFinalButton = document.getElementById('B-9');
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
let typingSoundSource = null;

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

    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

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

    stopTypingSound();
    typingSoundSource = audioContext.createBufferSource();
    typingSoundSource.buffer = typingSoundBuffer;
    typingSoundSource.loop = true;
    typingSoundSource.connect(audioContext.destination);
    typingSoundSource.start();

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
            stopTypingSound();
            button.action();
            document.body.classList.remove('disable-interaction'); // Re-enable interactions
            popup.remove(); 

            if (button.action.toString().includes("createPopupMessage")) {
                document.body.classList.add('disable-interaction');
            }
        });
    });
}
document.addEventListener('click', initAudio, { once: true });

function switchPage(currentPage, nextPage) {
    currentPage.classList.add('fade-out');
      setTimeout(() => {
      currentPage.classList.add('hidden');
      currentPage.classList.remove('fade-out');
      nextPage.classList.remove('hidden');
      nextPage.classList.add('fade-in');
      setTimeout(() => {
        nextPage.classList.remove('fade-in');
      }, 500); 
    }, 500);
  }

doorButton.addEventListener('click', () => {
    createPopupMessage("A white door casts a faint shadow. \nWhat would you like to do?", [
    { id: "J1", text: "OPEN THE DOOR", action: () => {
        doorButton.classList.add('hidden')
        switchPage(homepage, selection1);
    }},
    { id: "J2", text: "DO NOTHING", action: () => {} }
  ], 40); // Speed set to 40ms
});

userRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'Nehir') {
        proceedButton.textContent = 'Click here, four eyes';
      } else {
        proceedButton.textContent = 'Proceed';
        proceedButton.style.transition = 'transform 0.3s ease';
        proceedButton.style.transform = 'translate(0, 0)';
        clickCount = 0; 
      }
    });
  });

let clickCount = 0;
proceedButton.addEventListener('click', () => {
    const selectedUser = document.querySelector('input[name="user"]:checked');
    if (selectedUser.value === 'Nehir') {
        clickCount++;
    
        if (clickCount === 1 || clickCount === 2) {
          const moveX = (Math.random() * 500 - 250); 
          const moveY = (Math.random() * 500 - 250); 
          proceedButton.style.transition = 'transform 0.5s ease'; 
          proceedButton.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
      } 
    if (selectedUser && selectedUser.value === 'Nehir' && clickCount === 3) {
        switchPage(selection1, questions);
    }
});

yesQ1.addEventListener('click', () => {
    switchPage(Q1, Q2);
});
noQ1.addEventListener('click', () => {
    createPopupMessage("You’re still welcome ♡.", [
        { id: "J3", text: "Okay!", action: () => {
            createPopupMessage("NOW GO AND CLICK YOUR NAME.", [
                { id: "J4", text: "Go back", action: () => {
                    switchPage(questions, selection1);
                    userRadios.forEach(radio => (radio.checked = false));
                    proceedButton.style.transition = 'none';
                    proceedButton.style.transform = 'translate(0, 0)';
                    clickCount = 0;
                    proceedButton.textContent = 'Proceed';              
                }}
            ], 40); // Speed
        }}
    ], 40); // Speed
 });

yesQ2.addEventListener('click', () => {
    switchPage(Q2, Q3);
});

noQ2.addEventListener('click', () => {
    createPopupMessage("You’re still welcome ♡.", [
        { id: "J5", text: "Okay!", action: () => {
            createPopupMessage("NOW GO AND CLICK YOUR NAME.", [
                { id: "J6", text: "Go back", action: () => {
                    switchPage(questions, selection1);
                    userRadios.forEach(radio => (radio.checked = false));
                    proceedButton.style.transition = 'none';
                    proceedButton.style.transform = 'translate(0, 0)';
                    clickCount = 0;
                    proceedButton.textContent = 'Proceed';              
                }}
            ], 40); // Speed
        }}
    ], 40); // Speed
 });

