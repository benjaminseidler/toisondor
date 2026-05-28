// ── PROGRESS ─────────────────────────────────────────
const STORAGE_KEY = 'rally_progress';

function loadProgress() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return { completedStations: [], startedAt: null };
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function resetProgress() {
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// ── SCREEN MANAGEMENT ────────────────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

// ── STATION SHEET ────────────────────────────────────
let activeStationId = null;

function openStation(id) {
  const station = STATIONS.find(s => s.id === id);
  if (!station) return;
  activeStationId = id;

  const progress = loadProgress();
  const done = progress.completedStations.includes(id);

  const sheet = document.getElementById('station-sheet');
  document.getElementById('sheet-number').textContent = `Station ${id} von ${STATIONS.length}`;
  document.getElementById('sheet-emoji').textContent = station.emoji;
  document.getElementById('sheet-name').textContent = station.name;
  document.getElementById('sheet-task').textContent = station.task;

  const doneBtn = document.getElementById('btn-done');
  if (done) {
    doneBtn.textContent = '✓ Schon erledigt!';
    doneBtn.classList.add('already-done');
    doneBtn.classList.remove('finish-btn');
  } else if (station.type === 'finish') {
    doneBtn.textContent = '🎉 Ziel erreicht!';
    doneBtn.classList.remove('already-done');
    doneBtn.classList.add('finish-btn');
  } else {
    doneBtn.textContent = '✅ Aufgabe erledigt!';
    doneBtn.classList.remove('already-done', 'finish-btn');
  }

  sheet.style.display = 'block';
  requestAnimationFrame(() => sheet.classList.add('open'));

  panToStation(id);
}

function closeSheet() {
  const sheet = document.getElementById('station-sheet');
  sheet.classList.remove('open');
  setTimeout(() => { sheet.style.display = 'none'; }, 350);
  activeStationId = null;
}

function markDone() {
  if (!activeStationId) return;

  const progress = loadProgress();
  const done = progress.completedStations.includes(activeStationId);
  if (done) { closeSheet(); return; }

  progress.completedStations.push(activeStationId);
  if (!progress.startedAt) progress.startedAt = Date.now();
  saveProgress(progress);

  updateMarker(activeStationId);
  updateProgressBar();
  burstStar();

  const isFinish = STATIONS.find(s => s.id === activeStationId)?.type === 'finish';
  closeSheet();

  if (isFinish || progress.completedStations.length >= STATIONS.length) {
    setTimeout(() => showFinishScreen(), 700);
  }
}

// ── PROGRESS BAR ─────────────────────────────────────
function updateProgressBar() {
  const progress = loadProgress();
  const count = progress.completedStations.length;
  const total = STATIONS.length;
  const pct = (count / total) * 100;

  document.getElementById('progress-fill').style.width = pct + '%';
  document.getElementById('progress-text').textContent =
    `⭐ ${count} von ${total} Aufgaben`;
}

// ── STAR BURST ANIMATION ─────────────────────────────
function burstStar() {
  const star = document.createElement('div');
  star.className = 'star-burst';
  star.textContent = '⭐';
  star.style.left = (Math.random() * 60 + 20) + '%';
  star.style.bottom = '120px';
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 1000);
}

// ── TOAST ─────────────────────────────────────────────
function showToast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  setTimeout(() => el.classList.remove('show'), 2800);
}

// ── FINISH SCREEN ─────────────────────────────────────
function showFinishScreen() {
  showScreen('screen-finish');
  startConfetti();
}

// ── CONFETTI ──────────────────────────────────────────
function startConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#9B59B6', '#FF9F43'];
  const pieces = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    w: Math.random() * 12 + 6,
    h: Math.random() * 6 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    angle: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.2,
    vx: (Math.random() - 0.5) * 3,
    vy: Math.random() * 4 + 2
  }));

  let running = true;
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.angle += p.spin;
      if (p.y > canvas.height) { p.y = -p.h; p.x = Math.random() * canvas.width; }
      ctx.save();
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate(p.angle);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    requestAnimationFrame(frame);
  }
  frame();
  setTimeout(() => { running = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }, 6000);
}

// ── LONG PRESS RESET (for adults) ─────────────────────
function setupLongPressReset() {
  let timer;
  const logo = document.getElementById('start-logo');
  if (!logo) return;
  logo.addEventListener('touchstart', () => {
    timer = setTimeout(() => {
      if (confirm('Rallye zurücksetzen? Alle Fortschritte werden gelöscht.')) {
        resetProgress();
      }
    }, 3000);
  });
  logo.addEventListener('touchend', () => clearTimeout(timer));
  logo.addEventListener('mousedown', () => {
    timer = setTimeout(() => {
      if (confirm('Rallye zurücksetzen? Alle Fortschritte werden gelöscht.')) {
        resetProgress();
      }
    }, 3000);
  });
  logo.addEventListener('mouseup', () => clearTimeout(timer));
}

// ── PWA INSTALL ───────────────────────────────────────
let installPrompt = null;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  installPrompt = e;
  document.getElementById('btn-install').style.display = 'block';
});

window.addEventListener('appinstalled', () => {
  installPrompt = null;
  document.getElementById('btn-install').style.display = 'none';
});

// ── FULLSCREEN ────────────────────────────────────────
function toggleFullscreen() {
  const el = document.documentElement;
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  } else {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
}

function syncFullscreenBtn() {
  const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
  document.getElementById('fs-enter').style.display = isFs ? 'none' : '';
  document.getElementById('fs-exit').style.display = isFs ? '' : 'none';
}

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-start').addEventListener('click', startRally);
  document.getElementById('btn-install').addEventListener('click', async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      installPrompt = null;
      document.getElementById('btn-install').style.display = 'none';
    }
  });
  document.getElementById('btn-fullscreen').addEventListener('click', toggleFullscreen);
  document.addEventListener('fullscreenchange', syncFullscreenBtn);
  document.addEventListener('webkitfullscreenchange', syncFullscreenBtn);
  document.getElementById('btn-gps').addEventListener('click', panToGPS);
  document.getElementById('btn-done').addEventListener('click', markDone);
  document.getElementById('btn-photo').addEventListener('click', () => {
    document.getElementById('photo-input').click();
  });
  document.getElementById('photo-input').addEventListener('change', e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    const station = STATIONS.find(s => s.id === activeStationId);
    a.href = url;
    a.download = `rallye-station-${activeStationId || 'foto'}-${station ? station.name.replace(/\s+/g, '-') : ''}.jpg`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    e.target.value = '';
  });
  document.getElementById('btn-close-sheet').addEventListener('click', closeSheet);
  document.getElementById('btn-restart').addEventListener('click', () => {
    if (confirm('Neue Rallye starten? Alle Fortschritte werden gelöscht.')) resetProgress();
  });

  setupLongPressReset();

  // Close sheet by tapping backdrop (map area)
  document.getElementById('map').addEventListener('click', e => {
    if (!e.target.closest('.station-marker') && document.getElementById('station-sheet').classList.contains('open')) {
      closeSheet();
    }
  });
});

function startRally() {
  showScreen('screen-map');

  if (!map) {
    // Wait one frame so the map container has computed dimensions before Leaflet initializes
    requestAnimationFrame(() => {
      initMap();
      startGPS();
    });
  }
  updateProgressBar();
}
