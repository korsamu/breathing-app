const circle = document.getElementById("circle");
const text = document.getElementById("text");
const countdown = document.getElementById("countdown");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const stopBtn = document.getElementById("stopBtn");
const toggleThemeBtn = document.getElementById("toggleThemeBtn");

const inhaleInput = document.getElementById("inhaleInput");
const holdInput = document.getElementById("holdInput");
const exhaleInput = document.getElementById("exhaleInput");

let interval;
let timeoutId;
let isPaused = false;
let isStopped = false;

// Countdown function
function startCountdown(seconds) {
  clearInterval(interval);
  countdown.innerText = seconds > 0 ? seconds : "";
  if (seconds <= 0) return;

  interval = setInterval(() => {
    if (!isPaused) {
      seconds--;
      countdown.innerText = seconds > 0 ? seconds : "";
      if (seconds <= 0) clearInterval(interval);
    }
  }, 1000);
}

// Animate circle and text
function breathePhase(label, duration, scale) {
  if (isStopped || duration <= 0) return;
  const displayLabel = label.includes("Hold") ? "Hold" : label;
  text.innerText = displayLabel;
  circle.style.transition = `transform ${duration}s ease-in-out, box-shadow ${duration}s ease-in-out`;
  circle.style.transform = `scale(${scale})`;
  circle.style.boxShadow = `0 0 ${scale * 15}px rgba(56,189,248,${scale / 1.5})`;
  startCountdown(duration);
}

// Scheduler for phases
function runCycle() {
  if (isStopped) return;

  const inhaleSec = parseInt(inhaleInput.value) || 0;
  const holdSec = parseInt(holdInput.value) || 0;
  const exhaleSec = parseInt(exhaleInput.value) || 0;

  const phases = [
    { label: "Inhale", duration: inhaleSec, scale: 1.5 },
    { label: "Hold1", duration: holdSec, scale: 1.5 },
    { label: "Exhale", duration: exhaleSec, scale: 1 },
   // { label: "Hold2", duration: holdSec, scale: 1.5 },
  ];

  let index = 0;

  function nextPhase() {
    if (isStopped) return;

    // Find the next phase with duration > 0
    while (index < phases.length && phases[index].duration <= 0) {
      index++;
    }

    if (index >= phases.length) {
      // Restart the cycle
      index = 0;
      nextPhase();
      return;
    }

    const phase = phases[index];
    breathePhase(phase.label, phase.duration, phase.scale);
    index++;
    timeoutId = setTimeout(nextPhase, phase.duration * 1000);
  }

  nextPhase();
}

// Controls
startBtn.addEventListener("click", () => {
  isPaused = false;
  isStopped = false;
  clearInterval(interval);
  clearTimeout(timeoutId);
  runCycle();
});

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.innerText = isPaused ? "Resume" : "Pause";
});

stopBtn.addEventListener("click", () => {
  isStopped = true;
  clearInterval(interval);
  clearTimeout(timeoutId);
  countdown.innerText = "";
  text.innerText = "Ready?";
  circle.style.transform = "scale(1)";
  circle.style.boxShadow = "0 0 20px rgba(56,189,248,0.5)";
});

// Dark / Light toggle
let isDark = true;
toggleThemeBtn.addEventListener("click", () => {
  isDark = !isDark;
  if (isDark) {
    document.body.style.background = "#0f172a";
    document.body.style.color = "#e5e7eb";
  } else {
    document.body.style.background = "#f3f4f6";
    document.body.style.color = "#111827";
  }
});
