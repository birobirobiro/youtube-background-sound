tailwind.config = {
  daisyui: {
    themes: ["dracula"],
  },
}

let player
let forestSound,
  fireplaceSound,
  oceanSound,
  keyboardSound,
  stormRainSound,
  cityRainSound,
  underwaterSound,
  birdsSound,
  snowSound,
  coffeeShopSound

const tag = document.createElement("script")
tag.src = "https://www.youtube.com/iframe_api"
const firstScriptTag = document.getElementsByTagName("script")[0]
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

function initializeAudios() {
  forestSound = document.getElementById("forestSound")
  fireplaceSound = document.getElementById("fireplaceSound")
  oceanSound = document.getElementById("oceanSound")
  keyboardSound = document.getElementById("keyboardSound")
  stormRainSound = document.getElementById("stormRainSound")
  cityRainSound = document.getElementById("cityRainSound")
  snowSound = document.getElementById("snowSound")
  birdsSound = document.getElementById("birdsSound")
  coffeeShopSound = document.getElementById("coffeeShopSound")
  underwaterSound = document.getElementById("underwaterSound")
}

function setInitialVolumeForAudios(volume) {
  ;[
    forestSound,
    fireplaceSound,
    oceanSound,
    keyboardSound,
    stormRainSound,
    cityRainSound,
    snowSound,
    birdsSound,
    coffeeShopSound,
    underwaterSound,
  ].forEach((sound) => {
    sound.volume = volume / 100
  })
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId: "S0zv1GMBRtE",
    playerVars: {
      controls: 0,
      showinfo: 0,
      modestbranding: 1,
      loop: 1,
      playlist: "S0zv1GMBRtE",
      fs: 0,
      cc_load_policy: 0,
      iv_load_policy: 3,
      autohide: 0,
      autoplay: 1,
    },
    events: {
      onReady: onPlayerReady,
    },
  })
}

function onPlayerReady(event) {
  event.target.setVolume(5)
  setInitialVolumeForAudios(5)
}

function loadVideo() {
  const videoURL = document.getElementById("videoURL").value
  const videoID = extractVideoID(videoURL)

  if (player && videoID) {
    player.loadVideoById(videoID)
  }

  document.getElementById("my_modal_2").close()
}

function changeVolume(target) {
  if (target === "player") {
    if (player) {
      const volume = document.getElementById("playerVolumeSlider").value
      player.setVolume(volume)
    }
  } else if (target === "sound") {
    const soundVolume = document.getElementById("soundVolumeSlider").value / 100
    setInitialVolumeForAudios(soundVolume * 100)
  }
}

const soundVolume = document.getElementById("soundVolumeSlider")
const playerVolume = document.getElementById("playerVolumeSlider")

soundVolume.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    e.target.valueAsNumber += 1
  } else {
    e.target.value -= 1
  }

  let volume = soundVolume.value / 100
  setInitialVolumeForAudios(volume * 100)
})

playerVolume.addEventListener("wheel", (e) => {
  if (e.deltaY < 0) {
    e.target.valueAsNumber += 1
  } else {
    e.target.value -= 1
  }
  const volume = document.getElementById("playerVolumeSlider").value

  player.setVolume(volume)
})

function extractVideoID(url) {
  const regExp =
    /(?:\?v=|\/embed\/|\/v\/|youtu\.be\/|\/watch\?v=|\/watch\?feature=player_embed&v=|\/videos\/|embed\/|watch\?v=|v=|\/embed\/)([a-zA-Z0-9_-]{11})/
  const match = url.match(regExp)
  return (match && match[1]) || null
}

let isVideoPlaying = false

function playPauseMedia(mediaId) {
  if (mediaId === "video") {
    if (player) {
      if (isVideoPlaying) {
        player.pauseVideo()
        isVideoPlaying = false
      } else {
        player.playVideo()
        isVideoPlaying = true
      }
    }
  } else {
    const sound = document.getElementById(mediaId)
    if (sound) {
      if (sound.paused) {
        sound.play()
      } else {
        sound.pause()
      }
    }
  }
}

function FitScreen() {
  let player = document.getElementById('player');
  if (player) {
    if (player.classList.contains('scale-125')) {
      player.classList.remove('scale-125');
    } else {
      player.classList.add('scale-125');
    }
  } else {
    console.error("Player element not found!");
  }
}

function showAmbientSounds() {
  AmbientSounds = document.getElementById("ambientSounds")
  if (AmbientSounds) {
    AmbientSounds.classList.toggle("hidden");
  } else {
    console.error("Player element not found!");
  }
}

function showVolumeControls() {
  VolumeControls = document.getElementById("volumeControls")
  if (VolumeControls) {
    VolumeControls.classList.toggle("hidden");
  } else {
    console.error("Player element not found!");
  }
}

function StopAllSounds() {
  player.pauseVideo()
  forestSound.pause()
  fireplaceSound.pause()
  oceanSound.pause()
  keyboardSound.pause()
  stormRainSound.pause()
  cityRainSound.pause()
  snowSound.pause()
  birdsSound.pause()
  coffeeShopSound.pause()
  underwaterSound.pause()
}

let isFullScreen = false;

function toggleFullScreen() {
  const elem = document.documentElement;
  if (!isFullScreen) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE/Edge */
      document.msExitFullscreen();
    }
  }
}

// Event listener for the full screen toggle
document.addEventListener("fullscreenchange", () => {
  isFullScreen = !isFullScreen;
});

document.addEventListener("mozfullscreenchange", () => {
  isFullScreen = !isFullScreen;
});

document.addEventListener("webkitfullscreenchange", () => {
  isFullScreen = !isFullScreen;
});

document.addEventListener("msfullscreenchange", () => {
  isFullScreen = !isFullScreen;
});

initializeAudios()
