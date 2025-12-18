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

let timerInterval;
let isPaused = false;
let isStopped = false;

// Phases
let phases = [];
let currentPhaseIndex = 0;
let phaseRemaining = 0;

function startBreathing() {
  isPaused = false;
  isStopped = false;

  const inhaleSec = parseInt(inhaleInput.value) || 0;
  const holdSec = parseInt(holdInput.value) || 0;
  const exhaleSec = parseInt(exhaleInput.value) || 0;

  phases = [
    { label: "Inhale", duration: inhaleSec, scale: 1.5 },
    { label: "Hold", duration: holdSec, scale: 1.5 },
    { label: "Exhale", duration: exhaleSec, scale: 1 },
    { label: "Hold", duration: holdSec, scale: 1.5 }
  ];

  phases = phases.filter(p => p.duration >= 0);

  if (phases.length === 0) {
    text.innerText = "Ready?";
    countdown.innerText = "";
    circle.style.transform = "scale(1)";
    circle.style.boxShadow = "0 0 20px rgba(56,189,248,0.5)";
    return;
  }

  currentPhaseIndex = 0;
  phaseRemaining = phases[currentPhaseIndex].duration;

  updatePhaseVisual(phases[currentPhaseIndex]);

  clearInterval(timerInterval);
  timerInterval = setInterval(tick, 1000);
}

function tick() {
  if (isPaused || isStopped) return;

  if (phaseRemaining > 0) {
    phaseRemaining--;
    countdown.innerText = phaseRemaining > 0 ? phaseRemaining : "";
  }

  if (phaseRemaining <= 0) {
    currentPhaseIndex++;
    if (currentPhaseIndex >= phases.length) {
      currentPhaseIndex = 0;
    }
    phaseRemaining = phases[currentPhaseIndex].duration;

    if (phaseRemaining > 0) {
      updatePhaseVisual(phases[currentPhaseIndex]);
    } else {
      tick(); // skip zero-duration phase
    }
  }
}

function updatePhaseVisual(phase) {
  text.innerText = phase.label;
  circle.style.transition = `transform ${phase.duration}s ease-in-out, box-shadow ${phase.duration}s ease-in-out`;
  circle.style.transform = `scale(${phase.scale})`;
  circle.style.boxShadow = `0 0 ${phase.scale * 15}px rgba(56,189,248,${phase.scale/1.5})`;
  countdown.innerText = phase.duration;
}

// Controls
startBtn.addEventListener("click", startBreathing);

pauseBtn.addEventListener("click", () => {
  isPaused = !isPaused;
  pauseBtn.innerText = isPaused ? "Resume" : "Pause";
});

stopBtn.addEventListener("click", () => {
  isStopped = true;
  clearInterval(timerInterval);
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
