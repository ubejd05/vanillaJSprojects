const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ['hey', 'summer', 'ukulele'];

let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex])

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');
  
  if(isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
})

// Change song 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);


// Time/song update
audio.addEventListener('timeupdate', updateProgress)

// Click on progressbar
progressContainer.addEventListener('click', setProgress)

// Song ends
audio.addEventListener('ended', nextSong)


// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.setAttribute('src', `music/${song}.mp3`)
  cover.setAttribute('src', `img/${song}.jpg`)
}

// Play song 
function playSong() {
  musicContainer.classList.add('play')
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song 
function pauseSong() {
  musicContainer.classList.remove('play')
  playBtn.querySelector('i.fas').classList.remove('fa-pause');
  playBtn.querySelector('i.fas').classList.add('fa-play');

  audio.pause();
}

// Previous song 
function prevSong() {
  songIndex--;

  if(songIndex < 0) {
    songIndex = songs.length-1;
  }

  loadSong(songs[songIndex])

  playSong();
}

// Next song 
function nextSong() {
  songIndex++;

  if(songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex])

  playSong();
}

// Update progress bar 
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  // console.log(duration, currentTime);
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`;
  console.log(progress.style.width);
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}








