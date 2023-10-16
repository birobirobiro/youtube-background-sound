let player;
let forestSound, fireplaceSound, oceanSound, keyboardSound, rainSound, cityRainSound;

// Load the YouTube IFrame Player API code asynchronously.
const tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

function initializeAudios() {
  forestSound = document.getElementById('forestSound');
  fireplaceSound = document.getElementById('fireplaceSound');
  oceanSound = document.getElementById('oceanSound');
  keyboardSound = document.getElementById('keyboardSound');
  rainSound = document.getElementById('rainSound');
  cityRainSound = document.getElementById('cityRainSound');
}

function setInitialVolumeForAudios(volume) {
  [forestSound, fireplaceSound, oceanSound, keyboardSound, rainSound, cityRainSound].forEach(sound => {
    sound.volume = volume / 100;
  });
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: 'ir96UnkKIgA', // Replace VIDEO_ID with the desired YouTube video ID
    playerVars: {
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      playlist: 'ir96UnkKIgA', // Replace VIDEO_ID with the desired YouTube video ID
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      autoplay: 1 // Enable autoplay
    },
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  event.target.setVolume(5); // Set the YouTube player volume to 5 when the player is ready
  setInitialVolumeForAudios(5); // Set the initial volume for the external audio elements
}

function loadVideo() {
  const videoURL = document.getElementById('videoURL').value;
  const videoID = extractVideoID(videoURL);

  if (player && videoID) {
    player.loadVideoById(videoID);
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
    setInitialVolumeForAudios(soundVolume * 100);
  }
}

function extractVideoID(url) {
  const regExp = /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?feature=player_embed&v=|\/videos\/|embed\/|watch\?v=|v=|\/embed\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return (match && match[1]) || null;
}

let isVideoPlaying = false;

function playPauseMedia(mediaId) {
  if (mediaId === 'video') {
    if (player) {
      if (isVideoPlaying) {
        player.pauseVideo();
        isVideoPlaying = false;
      } else {
        player.playVideo();
        isVideoPlaying = true;
      }
    }
  } else {
    const sound = document.getElementById(mediaId);
    if (sound) {
      if (sound.paused) {
        sound.play();
      } else {
        sound.pause();
      }
    }
  }
}

initializeAudios();
