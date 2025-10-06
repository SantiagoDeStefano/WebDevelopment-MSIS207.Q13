// map letters to sound file names
const soundMap = {
  w: "tom-1.mp3",
  a: "tom-2.mp3",
  s: "tom-3.mp3",
  d: "tom-4.mp3",
  j: "snare.mp3",
  k: "crash.mp3",
  l: "kick-bass.mp3"
};

// play sound when button clicked
document.querySelectorAll(".drum-pad").forEach((pad) => {
  pad.addEventListener("click", () => {
    const key = pad.querySelector("p").textContent.toLowerCase();
    playSound(key);
  });
});

// play sound when key pressed
document.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (soundMap[key]) playSound(key);
});

// reusable play function
function playSound(key) {
  const audio = new Audio(soundMap[key]);
  audio.currentTime = 0;
  audio.play();
}
