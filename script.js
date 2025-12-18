<script>
/* =========================
   BREATHING PHASE CONFIG
========================= */
const phases = [
  { name: "Inhale", duration: 4000 },
  { name: "Hold (After Inhale)", duration: 4000 },
  { name: "Exhale", duration: 6000 },
  { name: "Hold (After Exhale)", duration: 2000 }
];

/* =========================
   STATE
========================= */
let phaseIndex = 0;
let timer = null;
let isRunning = false;

/* =========================
   ELEMENTS
========================= */
const textEl = document.getElementById("breathingText");
const startBtn = document.getElementById("startBtn");

/* =========================
   CORE LOGIC
========================= */
function startBreathing() {
  if (isRunning) return; // prevent multiple starts

  isRunning = true;
  phaseIndex = 0;
  runPhase();
}

function runPhase() {
  if (!isRunning) return;

  const phase = phases[phaseIndex];

  // Force repaint even if text were ever identical
  textEl.textContent = "";
  requestAnimationFrame(() => {
    textEl.textContent = phase.name;
  });

  timer = setTimeout(() => {
    phaseIndex = (phaseIndex + 1) % phases.length;
    runPhase();
  }, phase.duration);
}

/* =========================
   OPTIONAL RESET (safe)
========================= */
function stopBreathing() {
  isRunning = false;
  clearTimeout(timer);
  timer = null;
  textEl.textContent = "Ready";
}

/* =========================
   EVENTS
========================= */
startBtn.addEventListener("click", startBreathing);
</script>
