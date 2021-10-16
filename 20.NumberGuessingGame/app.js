const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();
console.log('Number: ', randomNum);


window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

// Capture user speak
function onSpeak(e) {
  const msg = e.results[0][0].transcript
  writeMessage(msg)
  checkNumber(msg)
}

// Write what user speaks
function writeMessage(msg) {
  msgEl.innerHTML = `
    <div>You said:</div>
      <span class="box">${msg}</span>
    <div>GO HIGHER</div>
  `;
}

// Check msg against number
function checkNumber(msg) {
  const num = +num;

  // Check if valid number
  if (Number.isNaN(num)) {
    msgEl.innerHTML 
  }

}

// Generate random number
function getRandomNumber() {
  return Math.floor(Math.random() * 100) + 1
}


// Speak result 
recognition.addEventListener('result', onSpeak);


