// ====== Breathing Phases ======
const phases = [
  { name: "Inhale", duration: 4000 },
  { name: "Hold", duration: 4000 },
  { name: "Exhale", duration: 6000 },
  
];

// ====== State ======
let phaseIndex = 0;
let timer = null;
let isRunning = false;

// ====== DOM Elements ======
const textEl = document.getElementById("breathingText");
const startBtn = document.getElementById("startBtn");

// ====== Core Logic ======
function startBreathing() {
  if (isRunning) return; // prevent multiple starts
  isRunning = true;
  phaseIndex = 0;
  runPhase();
}

function runPhase() {
  if (!isRunning) return;

  const phase = phases[phaseIndex];
  textEl.textContent = phase.name;

  timer = setTimeout(() => {
    phaseIndex = (phaseIndex + 1) % phases.length;
    runPhase();
  }, phase.duration);
}

// ====== Optional Stop / Reset ======
function stopBreathing() {
  isRunning = false;
  clearTimeout(timer);
  timer = null;
  textEl.textContent = "Ready";
}

// ====== Event Listener ======
startBtn.addEventListener("click", startBreathing);
