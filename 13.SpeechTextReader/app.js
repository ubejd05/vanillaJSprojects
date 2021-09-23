const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textarea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');


data.forEach(createBox);
// Init speech synthesis
const message = new SpeechSynthesisUtterance();


//Voices changed
speechSynthesis.addEventListener('voiceschanged', getVoices)

// Toggle text box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle('show'));

// Close text box
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove('show'));

// Change voice
voicesSelect.addEventListener('change', setVoice)

// Read text button
readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
})


// Create speech boxes
function createBox(item) {
  const box = document.createElement('div');
  
  const { image, text} = item;
  
  box.classList.add('box')
  box.innerHTML = `
  <img src="${image}" alt="${text}">
  <p class="info">${text}</p>
  `;
  
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    
    // Add active effect
    box.classList.add('active');
    setTimeout(function() {
      box.classList.remove('active');
    }, 800);
  })
  
  main.appendChild(box)
}



let voices = [];
// Store voices 
function getVoices() {
  voices = speechSynthesis.getVoices();
  
  voices.forEach((voice) => {
    const option = document.createElement('option');
    
    option.setAttribute('value', voice.name);
    option.innerText = `${voice.name} ${voice.lang}`;
    
    voicesSelect.appendChild(option)
  })
}

// Set text
function setTextMessage(text) {
  message.text = text;
}

// Speak text
function speakText() {
  speechSynthesis.speak(message)
}

// Set voice 
function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value)
  // console.log(e.target);
}


getVoices();
