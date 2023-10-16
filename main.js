let player;
let forestSound = document.getElementById('forestSound');
let fireplaceSound = document.getElementById('fireplaceSound');
let oceanSound = document.getElementById('oceanSound');
let keyboardSound = document.getElementById('keyboardSound');
let rainSound = document.getElementById('rainSound');
let cityRainSound = document.getElementById('cityRainSound');

// Load the YouTube IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '360',
    width: '640',
    playerVars: {
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      playlist: 'VIDEO_ID',
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0
    }
  });
}

function loadVideo() {
  const videoURL = document.getElementById('videoURL').value;
  const videoID = extractVideoID(videoURL);

  if (player && videoID) {
    player.loadVideoById(videoID);
    document.getElementById('playerVolumeSlider').value = 5; // Resetting the volume to 5
    changeVolume('player');
  }
}

function playVideo() {
  if (player) {
    player.playVideo();
    forestSound.play();
    fireplaceSound.play();
    oceanSound.play();
    keyboardSound.play();
    rainSound.play();
    cityRainSound.play();
  }
}

function pauseVideo() {
  if (player) {
    player.pauseVideo();
    forestSound.pause();
    fireplaceSound.pause();
    oceanSound.pause();
    keyboardSound.pause();
    rainSound.pause();
    cityRainSound.pause();
  }
}

function changeVolume(target) {
  if (target === 'player') {
    if (player) {
      const volume = document.getElementById('playerVolumeSlider').value;
      player.setVolume(volume);
    }
  } else if (target === 'sound') {
    const soundVolume = document.getElementById('soundVolumeSlider').value / 100;
    forestSound.volume = soundVolume;
    fireplaceSound.volume = soundVolume;
    oceanSound.volume = soundVolume;
    keyboardSound.volume = soundVolume;
    rainSound.volume = soundVolume;
    cityRainSound.volume = soundVolume;
  }
}

function extractVideoID(url) {
  const regExp = /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?feature=player_embed&v=|\/videos\/|embed\/|watch\?v=|v=|\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) || null;
}

function playSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) {
    sound.play();
  }
}

function pauseSound(soundId) {
  const sound = document.getElementById(soundId);
  if (sound) {
    sound.pause();
  }
}

function changeVolume(target) {
  if (target === 'player') {
    if (player) {
      const volume = document.getElementById('playerVolumeSlider').value;
      player.setVolume(volume);
    }
  } else if (target === 'sound') {
    const soundVolume = document.getElementById('soundVolumeSlider').value / 100;
    forestSound.volume = soundVolume;
    fireplaceSound.volume = soundVolume;
    oceanSound.volume = soundVolume;
    keyboardSound.volume = soundVolume;
    rainSound.volume = soundVolume;
    cityRainSound.volume = soundVolume;
  }
}